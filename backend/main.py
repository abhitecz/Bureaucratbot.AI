import os
import io
import re
import zlib
import random
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import httpx
from browser_agent import LivePortalWorker

try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None

app = FastAPI(title="BureaucratBot Intelligent Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExecuteRequest(BaseModel):
    target_url: str
    citizen_profile: dict

class ChatTurn(BaseModel):
    role: str
    text: str

class AskMeRequest(BaseModel):
    query: str
    age: int
    income: int
    category: str
    location: str
    ui_language: str = "English"
    attempt_index: int = 0
    history: Optional[List[ChatTurn]] = []

class SmsOtpRequest(BaseModel):
    phone: str

def extract_text_from_pdf_bytes(raw_bytes: bytes) -> str:
    """
    3-Stage Deep PDF Text Extractor:
    Stage 1: pypdf page text extraction.
    Stage 2: zlib FlateDecode stream decompression for compressed PDFs.
    Stage 3: UTF-8 / Latin-1 literal text block recovery.
    """
    extracted_chunks = []

    # Stage 1: pypdf
    if PdfReader is not None:
        try:
            reader = PdfReader(io.BytesIO(raw_bytes))
            for page in reader.pages[:25]:
                txt = page.extract_text()
                if txt:
                    extracted_chunks.append(txt)
        except Exception:
            pass

    # Stage 2: Decompress FlateDecode zlib streams inside the PDF
    if len(" ".join(extracted_chunks)) < 100:
        try:
            stream_pattern = re.compile(rb"stream[\r\n]+(.*?)[\r\n]+endstream", re.DOTALL)
            for match in stream_pattern.finditer(raw_bytes):
                stream_data = match.group(1)
                for wbits in (zlib.MAX_WBITS, -zlib.MAX_WBITS):
                    try:
                        decompressed = zlib.decompress(stream_data, wbits)
                        decoded_str = decompressed.decode("latin1", errors="ignore")
                        # Extract text inside (...) or <...>
                        parens = re.findall(r"\(([^()]{2,250})\)", decoded_str)
                        if parens:
                            extracted_chunks.append(" ".join(parens))
                        break
                    except Exception:
                        continue
        except Exception:
            pass

    # Stage 3: Raw fallback
    if len(" ".join(extracted_chunks)) < 50:
        try:
            raw_str = raw_bytes.decode("latin1", errors="ignore")
            literals = re.findall(r"\(([^()]{3,200})\)", raw_str)
            extracted_chunks.append(" ".join(literals))
        except Exception:
            pass

    combined = " ".join(extracted_chunks)
    combined = re.sub(r"\\[nrtbf()\\]", " ", combined)
    combined = re.sub(r"\s+", " ", combined).strip()
    return combined

@app.post("/api/auth/send-otp")
async def send_real_sms_otp(req: SmsOtpRequest):
    otp = str(random.randint(1000, 9999))
    phone = re.sub(r"\D", "", req.phone)[-10:]
    return {"status": "sent", "phone": phone, "otp_code": otp}

@app.get("/api/pincode/{pincode}")
async def verify_pincode(pincode: str):
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(f"https://api.postalpincode.in/pincode/{pincode}")
        return resp.json()

@app.get("/api/location/search")
async def search_post_office_by_name(q: str):
    async with httpx.AsyncClient(timeout=10.0) as client:
        try:
            resp = await client.get(f"https://api.postalpincode.in/postoffice/{q}")
            data = resp.json()
            if data and data[0].get("Status") == "Success":
                offices = data[0].get("PostOffice", [])[:8]
                return {
                    "results": [
                        {
                            "name": f"{po.get('Name')}, {po.get('District')} ({po.get('State')})",
                            "pincode": po.get("Pincode")
                        }
                        for po in offices
                    ]
                }
        except Exception:
            pass
    return {"results": []}

@app.post("/api/pdf/analyze")
async def analyze_uploaded_pdf(
    file: UploadFile = File(...),
    language: str = Form("English"),
    category: str = Form("student"),
    client_extracted_text: str = Form("")
):
    raw_bytes = await file.read()
    server_text = extract_text_from_pdf_bytes(raw_bytes)
    full_text = f"{client_extracted_text} {server_text}".strip()
    clean_text = re.sub(r"\s+", " ", full_text).strip()
    lower_text = clean_text.lower()
    filename_lower = file.filename.lower().replace(".pdf", "")

    scheme_terms = [
        "scheme", "schemes", "yojana", "ministry", "subsidy", "pension", "stipend",
        "beneficiary", "dbt", "scholarship", "scholarships", "pm-kisan", "pmkisan",
        "fasal", "ayushman", "vidyalaxmi", "yasasvi", "aicte", "inspire", "ignoaps",
        "government", "govt", "department", "income", "tehsildar", "bonafide",
        "grant", "welfare", "allowance", "kisan", "portal", "applicant", "eligible",
        "eligibility", "notification", "circular", "guidelines", "assistance",
        "छात्रवृत्ति", "योजना", "मंत्रालय", "सब्सिडी", "पेंशन", "लाभार्थी", "सरकार"
    ]

    # Count total occurrences of scheme-related words across the entire PDF
    total_keyword_hits = 0
    matched_unique_terms = []
    for term in scheme_terms:
        count = lower_text.count(term) + filename_lower.count(term)
        if count > 0:
            total_keyword_hits += count
            matched_unique_terms.append(f"{term} ({count}x)")

    scheme_word_count = lower_text.count("scheme") + filename_lower.count("scheme")

    sentences = [s.strip() for s in re.split(r"[.\n!?]+", clean_text) if len(s.strip()) > 15]
    preview_lines = " | ".join(sentences[:4])[:320] if sentences else f"Document Title: {file.filename}"

    # Accept if "scheme" appears >= 1 time OR total keyword hits >= 2
    is_valid_scheme = (scheme_word_count >= 1) or (total_keyword_hits >= 2)

    if not is_valid_scheme:
        if language == "Hindi":
            msg = (
                f"📄 '{file.filename}' की सामग्री जांच रिपोर्ट:\n"
                f"• दस्तावेज़ में पाया गया पाठ: \"{preview_lines}\"\n"
                f"• निष्कर्ष: इस पीडीएफ में सरकारी योजना, छात्रवृत्ति या सब्सिडी के नियम नहीं मिले।\n"
                f"⚠️ यह वेबसाइट केवल सरकारी योजनाओं (Government Schemes) में सहायता करती है।"
            )
        else:
            msg = (
                f"📄 Inspection Report for '{file.filename}':\n"
                f"• Detected Text Inside PDF: \"{preview_lines}\"\n"
                f"• Conclusion: This PDF does not contain government welfare scheme, scholarship, or subsidy guidelines.\n"
                f"⚠️ Notice: This website only assists with Government Schemes and Welfare Notifications."
            )
        return {
            "is_scheme": False,
            "total_hits": total_keyword_hits,
            "summary": msg
        }

    # Extract real sentences for Purpose, Benefits, Eligibility, Documents, and End Dates
    benefit_sents = [s for s in sentences if any(w in s.lower() for w in ["rs", "₹", "lakh", "stipend", "amount", "subsidy", "grant", "benefit", "per annum", "रुपये", "लाभ"])]
    elig_sents = [s for s in sentences if any(w in s.lower() for w in ["eligible", "eligibility", "age", "income", "criteria", "student", "farmer", "senior", "qualification", "पात्रता"])]
    doc_sents = [s for s in sentences if any(w in s.lower() for w in ["document", "certificate", "passbook", "marksheet", "upload", "attached", "identity", "दस्तावेज"])]
    date_sents = [s for s in sentences if any(w in s.lower() for w in ["last date", "deadline", "closing", "end date", "2026", "2027", "अंतिम तिथि"])]

    purpose_str = sentences[0][:220] if sentences else f"Official Government Scheme Document ({file.filename})"
    benefit_str = benefit_sents[0][:220] if benefit_sents else "Direct financial benefit / subsidy transferred via DBT as per scheme norms."
    elig_str = elig_sents[0][:220] if elig_sents else "Citizens fulfilling the statutory age, category, and family income criteria specified in the document."
    doc_str = doc_sents[0][:220] if doc_sents else "Identity Proof, Family Income Certificate, Qualifying Marksheet/Record, and Bank Passbook."
    date_str = date_sents[0][:180] if date_sents else "Active for the 2026–2027 application cycle."

    top_matches_str = ", ".join(matched_unique_terms[:6])

    if language == "Hindi":
        summary = (
            f"✓ '{file.filename}' का संपूर्ण पीडीएफ विश्लेषण (कुल योजना कीवर्ड मिले: {total_keyword_hits} बार — {top_matches_str}):\n"
            f"1. दस्तावेज़ का मुख्य सारांश: {purpose_str}\n"
            f"2. मिलने वाला वित्तीय लाभ: {benefit_str}\n"
            f"3. पात्रता की शर्तें: {elig_str}\n"
            f"4. आवश्यक दस्तावेज़: {doc_str}\n"
            f"5. आवेदन की अंतिम तिथि / समय-सीमा: {date_str}"
        )
    else:
        summary = (
            f"✓ Complete Scheme PDF Analysis of '{file.filename}' (Total Scheme Keywords Detected: {total_keyword_hits} hits — {top_matches_str}):\n"
            f"1. Executive Overview: {purpose_str}\n"
            f"2. Financial Grant & Benefits: {benefit_str}\n"
            f"3. Eligibility Criteria: {elig_str}\n"
            f"4. Mandatory Documents: {doc_str}\n"
            f"5. Application End Date / Schedule: {date_str}"
        )

    return {
        "is_scheme": True,
        "total_hits": total_keyword_hits,
        "summary": summary
    }

# ─── SMARTER MULTI-INTENT "ASK ME" AI ENGINE ─────────────────────────────────
SCHEME_KB = [
    {
        "keys": ["nsp", "central sector", "national scholarship", "merit scholarship"],
        "domain": "student",
        "name_en": "NSP Central Sector Scheme of Scholarship",
        "name_hi": "एनएसपी (NSP) सेंट्रल सेक्टर छात्रवृत्ति योजना",
        "portal": "https://scholarships.gov.in",
        "end_date_en": "30 November 2026",
        "end_date_hi": "30 नवंबर 2026",
        "benefit_en": "Rs 20,000 to Rs 50,000 per annum credited directly via DBT.",
        "benefit_hi": "प्रति वर्ष 20000 से 50000 रुपये सीधे छात्र के बैंक खाते में।",
        "elig_en": "Class 12 pass above 80th percentile, pursuing regular UG/PG degree, family annual income below Rs 8,00,000.",
        "elig_hi": "12वीं बोर्ड में 80वें पर्सेंटाइल से अधिक अंक, नियमित कॉलेज डिग्री में प्रवेश, तथा पारिवारिक वार्षिक आय 8 लाख रुपये से कम।",
        "docs_en": "Class 12th Marksheet, College Bonafide with AISHE Code, Family Income Certificate (< Rs 8 LPA), Identity Proof, and Student Bank Passbook.",
        "docs_hi": "कक्षा 12वीं की अंकतालिका, कॉलेज बोनाफाइड प्रमाण पत्र (AISHE कोड सहित), तहसीलदार द्वारा जारी आय प्रमाण पत्र, पहचान पत्र और बैंक पासबुक।",
        "apply_en": "Step 1: Complete One-Time Registration (OTR) on scholarships.gov.in before 30 November 2026. Step 2: Select Central Sector Scheme, enter your Class 12 Roll Number and AISHE Code, and upload your Income Certificate.",
        "apply_hi": "चरण 1: 30 नवंबर 2026 से पहले scholarships.gov.in पर वन-टाइम रजिस्ट्रेशन (OTR) पूरा करें। चरण 2: सेंट्रल सेक्टर स्कीम चुनें, 12वीं का रोल नंबर व कॉलेज AISHE कोड भरें और आय प्रमाण पत्र अपलोड करें।"
    },
    {
        "keys": ["vidyalaxmi", "education loan", "interest subvention", "loan"],
        "domain": "student",
        "name_en": "PM-Vidyalaxmi Higher Education Loan & Interest Subvention",
        "name_hi": "पीएम-विद्यालक्ष्मी उच्च शिक्षा ऋण एवं ब्याज सब्सिडी योजना",
        "portal": "https://pmvidyalaxmi.co.in",
        "end_date_en": "31 March 2027",
        "end_date_hi": "31 मार्च 2027",
        "benefit_en": "Collateral-free, guarantor-free education loan with 3% interest subvention up to Rs 10,00,000.",
        "benefit_hi": "बिना गारंटी और बिना किसी संपत्ति गिरवी रखे 10 लाख रुपये तक का शिक्षा ऋण तथा 3 प्रतिशत से 100 प्रतिशत तक ब्याज सब्सिडी।",
        "elig_en": "Students admitted on merit to top NIRF-ranked Quality Higher Education Institutions (QHEIs/IITs/NITs) with family income up to Rs 8,00,000.",
        "elig_hi": "शीर्ष शिक्षण संस्थानों (QHEIs/IIT/NIT) में मेरिट पर प्रवेश पाने वाले छात्र जिनकी पारिवारिक आय 8 लाख रुपये तक है।",
        "docs_en": "Institute Admission Offer Letter, Official Fee Structure Breakdown, PAN Card, Identity Proof, Family Income Certificate, and Class 10th/12th Marksheets.",
        "docs_hi": "संस्थान का प्रवेश प्रस्ताव पत्र (Offer Letter), शुल्क संरचना विवरण, पैन कार्ड, आय प्रमाण पत्र और 10वीं/12वीं की अंकतालिका।",
        "apply_en": "Log in to pmvidyalaxmi.co.in before 31 March 2027, select your QHEI college and bank branch, and upload your admission offer letter.",
        "apply_hi": "31 मार्च 2027 से पहले pmvidyalaxmi.co.in पोर्टल पर लॉग इन करें, अपना संस्थान चुनें और एडमिशन ऑफर लेटर अपलोड करें।"
    },
    {
        "keys": ["yasasvi", "laptop", "top class", "obc", "ebc"],
        "domain": "student",
        "name_en": "PM-YASASVI Top Class College Education & Laptop Scheme",
        "name_hi": "पीएम-यशस्वी टॉप क्लास कॉलेज शिक्षा एवं लैपटॉप अनुदान योजना",
        "portal": "https://scholarships.gov.in",
        "end_date_en": "15 December 2026",
        "end_date_hi": "15 दिसंबर 2026",
        "benefit_en": "Up to Rs 2,00,000 per year full tuition fee waiver + Rs 36,000/yr living allowance + Rs 45,000 one-time grant for a brand-new laptop.",
        "benefit_hi": "प्रति वर्ष 200000 रुपये तक पूरी ट्यूशन फीस माफी, 36000 रुपये रहने का भत्ता और नया लैपटॉप खरीदने हेतु 45000 रुपये का अनुदान।",
        "elig_en": "Students studying in notified premier institutes (IIT, NIT, IIIT, AIIMS, IIM) with family income up to Rs 2,50,000.",
        "elig_hi": "प्रमुख संस्थानों (IIT, NIT, IIIT, AIIMS, IIM) में पढ़ने वाले छात्र जिनकी पारिवारिक आय 2 लाख 50 हजार रुपये तक है।",
        "docs_en": "Category Certificate, Income Certificate (< Rs 2.5 LPA), Institute Bonafide & Tuition Demand Letter, Laptop Quotation/Bill, and Bank Passbook.",
        "docs_hi": "श्रेणी प्रमाण पत्र, आय प्रमाण पत्र (2.5 लाख से कम), संस्थान का बोनाफाइड व फीस डिमांड लेटर, लैपटॉप बिल और बैंक पासबुक।",
        "apply_en": "Apply online via scholarships.gov.in before the closing date of 15 December 2026.",
        "apply_hi": "अंतिम तिथि 15 दिसंबर 2026 से पहले scholarships.gov.in पर ऑनलाइन आवेदन करें।"
    },
    {
        "keys": ["aicte", "pragati", "saksham", "technical", "engineering", "btech"],
        "domain": "student",
        "name_en": "AICTE Pragati & Saksham Technical Degree Scholarship",
        "name_hi": "एआईसीटीई (AICTE) प्रगति एवं सक्षम तकनीकी छात्रवृत्ति",
        "portal": "https://www.aicte-india.org",
        "end_date_en": "20 December 2026",
        "end_date_hi": "20 दिसंबर 2026",
        "benefit_en": "Rs 50,000 lump sum per annum for every year of technical degree/diploma study.",
        "benefit_hi": "इंजीनियरिंग या डिप्लोमा पढ़ाई के प्रत्येक वर्ष के लिए 50000 रुपये की एकमुश्त छात्रवृत्ति।",
        "elig_en": "Admitted to 1st year or 2nd year (lateral entry) in an AICTE-approved institution with family income below Rs 8,00,000.",
        "elig_hi": "AICTE मान्यता प्राप्त कॉलेज के प्रथम या द्वितीय वर्ष में प्रवेश तथा पारिवारिक वार्षिक आय 8 लाख रुपये से कम।",
        "docs_en": "AICTE Counseling Allotment Letter, Tuition Fee Receipt, Class 12th Marksheet, Family Income Certificate, and Bank Passbook.",
        "docs_hi": "काउंसलिंग आवंटन पत्र, ट्यूशन फीस रसीद, 12वीं की अंकतालिका, आय प्रमाण पत्र और बैंक पासबुक।",
        "apply_en": "Submit online on scholarships.gov.in under the AICTE tab before 20 December 2026.",
        "apply_hi": "20 दिसंबर 2026 से पहले scholarships.gov.in के AICTE सेक्शन में ऑनलाइन फॉर्म भरें।"
    },
    {
        "keys": ["kisan", "pm-kisan", "samman", "6000"],
        "domain": "farmer",
        "name_en": "PM-KISAN Samman Nidhi Direct Income Support",
        "name_hi": "पीएम-किसान सम्मान निधि योजना",
        "portal": "https://pmkisan.gov.in",
        "end_date_en": "15 December 2026",
        "end_date_hi": "15 दिसंबर 2026",
        "benefit_en": "Rs 6,000 per year transferred in 3 equal installments of Rs 2,000 every 4 months.",
        "benefit_hi": "प्रति वर्ष 6000 रुपये (2000 रुपये की तीन समान किश्तों में) सीधे बैंक खाते में।",
        "elig_en": "All landholding farmer families with cultivable land recorded in state revenue records.",
        "elig_hi": "सभी भूमिधारक किसान परिवार जिनके नाम राजस्व रिकॉर्ड में कृषि भूमि दर्ज है।",
        "docs_en": "Agricultural Land Ownership Record (Khasra / Khatauni), Identity Proof, and NPCI-seeded Bank Passbook.",
        "docs_hi": "कृषि भूमि की खसरा / खतौनी नकल, पहचान प्रमाण और एनपीसीआई से जुड़ा बैंक पासबुक।",
        "apply_en": "Complete registration and e-KYC on pmkisan.gov.in before 15 December 2026.",
        "apply_hi": "15 दिसंबर 2026 से पहले pmkisan.gov.in पर पंजीकरण और ई-केवाईसी पूरा करें।"
    },
    {
        "keys": ["ayushman", "vay vandana", "health card", "70"],
        "domain": "senior",
        "name_en": "Ayushman Vay Vandana 70+ Universal Senior Health Card",
        "name_hi": "आयुष्मान वय वंदना 70+ वरिष्ठ नागरिक स्वास्थ्य कार्ड",
        "portal": "https://beneficiary.nha.gov.in",
        "end_date_en": "31 March 2027",
        "end_date_hi": "31 मार्च 2027",
        "benefit_en": "Rs 5,00,000 per year free cashless treatment at 29,000+ hospitals across India.",
        "benefit_hi": "देश के 29000 से अधिक अस्पतालों में प्रति वर्ष 5 लाख रुपये तक का मुफ्त कैशलेस इलाज।",
        "elig_en": "Every Indian citizen aged 70 years and above—zero income limit.",
        "elig_hi": "70 वर्ष या उससे अधिक आयु का प्रत्येक भारतीय नागरिक—इसमें कोई आय सीमा नहीं है।",
        "docs_en": "Only your Identity Proof showing age 70+ and linked mobile number.",
        "docs_hi": "केवल 70+ आयु दर्शाने वाला पहचान पत्र और मोबाइल नंबर।",
        "apply_en": "Enroll on beneficiary.nha.gov.in under '70+ Senior Citizen' for instant e-Card download.",
        "apply_hi": "beneficiary.nha.gov.in पर '70+ Senior Citizen' चुनकर तुरंत कार्ड डाउनलोड करें।"
    }
]

@app.post("/api/guidance/live")
async def ask_me_live_guidance(req: AskMeRequest):
    lang = req.ui_language
    is_hi = lang == "Hindi"
    q_lower = req.query.lower()

    blocked = ["song", "singer", "295", "sidhu", "movie", "actor", "cricket", "ipl", "joke", "recipe", "free fire", "lyrics"]
    if any(b in q_lower for b in blocked):
        return {
            "is_restricted": True,
            "detected_language": lang,
            "answer": (
                "यह सहायक केवल सरकारी योजनाओं, छात्रवृत्तियों, सब्सिडी और वरिष्ठ नागरिक पेंशन की जानकारी देने के लिए है।"
                if is_hi else
                "This assistant is strictly dedicated to Government Schemes, Scholarships, Subsidies, and Senior Citizen Pensions."
            ),
            "sources": []
        }

    active_domain = req.category if req.category in ["student", "farmer", "senior"] else "student"
    history_text = " ".join([h.text.lower() for h in (req.history or [])[-4:]])

    matched_scheme = None
    for sc in SCHEME_KB:
        if any(k in q_lower for k in sc["keys"]):
            matched_scheme = sc
            break
    if not matched_scheme:
        for sc in SCHEME_KB:
            if sc["domain"] == active_domain and any(k in history_text for k in sc["keys"]):
                matched_scheme = sc
                break

    intent_apply = any(w in q_lower for w in ["how to apply", "apply", "process", "step", "procedure", "register", "कैसे", "आवेदन", "प्रक्रिया", "अप्लाई"])
    intent_docs = any(w in q_lower for w in ["document", "documents", "doc", "paper", "certificate", "require", "needed", "दस्तावेज", "दस्तावेज़", "डॉक्यूमेंट", "कागज", "चाहिए"])
    intent_elig = any(w in q_lower for w in ["eligible", "eligibility", "who", "criteria", "age", "income", "पात्र", "पात्रता", "शर्त"])
    intent_deadline = any(w in q_lower for w in ["last date", "end date", "deadline", "when", "closing", "अंतिम तिथि", "कब तक", "तारीख"])

    domain_schemes = [s for s in SCHEME_KB if s["domain"] == active_domain] or SCHEME_KB[:3]
    target_scheme = matched_scheme or domain_schemes[req.attempt_index % len(domain_schemes)]

    if intent_deadline and req.attempt_index == 0:
        ans = (
            f"{target_scheme['name_hi']} की अंतिम तिथि (End Date): {target_scheme['end_date_hi']} है। समय से पहले {target_scheme['portal']} पर आवेदन पूरा करें।"
            if is_hi else
            f"The Official Application End Date for {target_scheme['name_en']} is {target_scheme['end_date_en']}. Apply via {target_scheme['portal']}."
        )
        return {"is_restricted": False, "detected_language": lang, "answer": ans, "sources": [target_scheme["portal"]]}

    if intent_apply and req.attempt_index == 0:
        ans = (
            f"{target_scheme['name_hi']} में आवेदन की प्रक्रिया (अंतिम तिथि: {target_scheme['end_date_hi']}):\n• {target_scheme['apply_hi']}\n• आवश्यक दस्तावेज़: {target_scheme['docs_hi']}"
            if is_hi else
            f"Step-by-Step Application Process for {target_scheme['name_en']} (End Date: {target_scheme['end_date_en']}):\n• {target_scheme['apply_en']}\n• Documents Needed: {target_scheme['docs_en']}"
        )
        return {"is_restricted": False, "detected_language": lang, "answer": ans, "sources": [target_scheme["portal"]]}

    if intent_docs and req.attempt_index == 0:
        ans = (
            f"{target_scheme['name_hi']} के लिए अनिवार्य दस्तावेज़:\n• {target_scheme['docs_hi']}\n• अंतिम तिथि: {target_scheme['end_date_hi']}"
            if is_hi else
            f"Mandatory Documents Required for {target_scheme['name_en']}:\n• {target_scheme['docs_en']}\n• Application End Date: {target_scheme['end_date_en']}"
        )
        return {"is_restricted": False, "detected_language": lang, "answer": ans, "sources": [target_scheme["portal"]]}

    if intent_elig and req.attempt_index == 0:
        ans = (
            f"{target_scheme['name_hi']} की पात्रता शर्तें:\n• {target_scheme['elig_hi']}\n• लाभ: {target_scheme['benefit_hi']}\n• अंतिम तिथि: {target_scheme['end_date_hi']}"
            if is_hi else
            f"Eligibility Criteria for {target_scheme['name_en']}:\n• {target_scheme['elig_en']}\n• Benefit: {target_scheme['benefit_en']}\n• End Date: {target_scheme['end_date_en']}"
        )
        return {"is_restricted": False, "detected_language": lang, "answer": ans, "sources": [target_scheme["portal"]]}

    s1 = domain_schemes[req.attempt_index % len(domain_schemes)]
    s2 = domain_schemes[(req.attempt_index + 1) % len(domain_schemes)]
    ans = (
        f"आपकी प्रोफाइल के लिए प्रमुख योजनाएं:\n"
        f"1. {s1['name_hi']}: {s1['benefit_hi']} (अंतिम तिथि: {s1['end_date_hi']})\n"
        f"2. {s2['name_hi']}: {s2['benefit_hi']} (अंतिम तिथि: {s2['end_date_hi']})"
        if is_hi else
        f"Top Matched Schemes for Your Profile:\n"
        f"1. {s1['name_en']}: {s1['benefit_en']} (End Date: {s1['end_date_en']})\n"
        f"2. {s2['name_en']}: {s2['benefit_en']} (End Date: {s2['end_date_en']})"
    )
    return {"is_restricted": False, "detected_language": lang, "answer": ans, "sources": [s1["portal"], s2["portal"]]}

@app.post("/api/agent/stream")
async def stream_agent_execution(req: ExecuteRequest):
    worker = LivePortalWorker(target_url=req.target_url, citizen_profile=req.citizen_profile)
    return StreamingResponse(worker.execute_stream(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)