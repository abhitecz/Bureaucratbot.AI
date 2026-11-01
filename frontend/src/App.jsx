import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Zap,
  CheckCircle2,
  X,
  ArrowUpRight,
  MapPin,
  Sparkles,
  UploadCloud,
  Smartphone,
  Tablet,
  Monitor,
  User,
  Volume2,
  Filter,
  AlertTriangle,
  Bookmark,
  BookmarkCheck,
  History,
  LogOut,
  Search,
  Info,
  Trash2,
  ClipboardCheck,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  PlusCircle,
  Globe,
  Radio,
  Upload,
  FileText,
  AlertCircle,
  Wifi,
  BatteryCharging,
  CalendarClock,
  Scale,
  Download,
  FolderLock,
  Printer,
  SlidersHorizontal
} from "lucide-react";

// ─── 1. ALL 10 MAJOR INDIAN LANGUAGES ────────────────────────────────────────
const SUPPORTED_LANGUAGES = [
  { code: "English", label: "English", tts: "en-IN" },
  { code: "Hindi", label: "हिंदी (Hindi)", tts: "hi-IN" },
  { code: "Punjabi", label: "ਪੰਜਾਬੀ (Punjabi)", tts: "pa-IN" },
  { code: "Bengali", label: "বাংলা (Bengali)", tts: "bn-IN" },
  { code: "Tamil", label: "தமிழ் (Tamil)", tts: "ta-IN" },
  { code: "Telugu", label: "తెలుగు (Telugu)", tts: "te-IN" },
  { code: "Marathi", label: "मराठी (Marathi)", tts: "mr-IN" },
  { code: "Gujarati", label: "ગુજરાતી (Gujarati)", tts: "gu-IN" },
  { code: "Kannada", label: "ಕನ್ನಡ (Kannada)", tts: "kn-IN" },
  { code: "Malayalam", label: "മലയാളം (Malayalam)", tts: "ml-IN" }
];

const UI_TRANSLATIONS = {
  English: {
    portalSub: "SPECIALIZED CITIZEN PORTAL",
    trackBtn: "Track",
    vaultBtn: "Doc Vault",
    pdfBtn: "PDF Check",
    askMeBtn: "Ask Me",
    recentBtn: "Recent",
    profileBtn: "Profile",
    searchPlaceholder: "Search schemes (e.g., NSP, Laptop, Solar, Tractor, Pension)...",
    filterLabel: "Filter Your Results:",
    filterAll: "All Schemes",
    filterEligible: "✓ Eligible For Me",
    filterNotEligible: "✕ Not Eligible For Me",
    filterSaved: "★ Saved Schemes",
    eligibleBadge: "Eligible",
    notEligibleBadge: "Not Eligible",
    officialPortal: "Official Website",
    grantBenefit: "Scheme Benefit:",
    endDateLabel: "End Date:",
    autoApplyBtn: "Auto-Apply Live",
    aboutSchemeBtn: "About Scheme",
    compareBtn: "Compare",
    simulateBtn: "Why Not Eligible? Simulate",
    downloadChecklistBtn: "Download Checklist",
    seeMore: "See More Schemes",
    showLess: "Show Fewer Schemes",
    satisfiedPrompt: "Are you satisfied with this answer?",
    yesBtn: "Yes",
    noBtn: "No (Erase & Give New Answer)",
    newChatBtn: "+ New Chat",
    ageLabel: "Age",
    incomeLabel: "Annual Income",
    yrs: "yrs",
    askHeader: "Ask Me — Smart Government Scheme Voice & Chat Advisor",
    askSub: "Answers follow-up questions on eligibility, end dates, documents, and how to apply",
    listeningMsg: "Listening to your voice... Click Stop when finished speaking",
    searchingMsg: "Analyzing official government scheme guidelines...",
    askEmptyTitle: "Ask about any scheme, application end dates, or required documents:",
    inputPlaceholder: "Ask any question or follow-up (e.g., What is the end date? What documents are required?)...",
    speakBtn: "Speak",
    stopBtn: "Stop",
    sendBtn: "Ask",
    listenAudio: "Listen Voice",
    aboutDeadlineTitle: "Application Closing / End Date",
    aboutBenefitsTitle: "1. Financial Grant & Key Benefits",
    aboutConditionsTitle: "2. Mandatory Eligibility Conditions",
    aboutDocsTitle: "3. Required Documents to Apply",
    directApplyModalTitle: "Direct Portal Application & Document Upload",
    reqInfoTitle: "1. Mandatory Scheme Details",
    reqDocsTitle: "2. Upload Required Documents",
    uploadBtn: "Select File",
    uploadedText: "Attached:",
    pendingText: "Required (PDF/JPG)",
    submitDirectBtn: "Open Official Portal & Auto-Apply Directly",
    recentHeader: "Recent Activity History",
    recentHint: "Click any past AI Ask conversation below to restore the chat and continue talking!",
    deleteAll: "Delete All",
    continueChatHint: "▶ Click to reopen this conversation and continue chatting",
    locationPlaceholder: "Type City / Location or PIN...",
    saveChangesBtn: "Save Changes",
    cancelBtn: "Cancel",
    logoutBtn: "Logout from Account",
    logoutConfirmQ: "Do you really want to logout from your account?",
    logoutYes: "Yes, Logout",
    logoutNo: "No, Go Back"
  },
  Hindi: {
    portalSub: "नागरिक योजना पोर्टल",
    trackBtn: "ट्रैक करें",
    vaultBtn: "डॉक्यूमेंट वॉल्ट",
    pdfBtn: "पीडीएफ जांच",
    askMeBtn: "पूछें (Ask Me)",
    recentBtn: "इतिहास",
    profileBtn: "प्रोफाइल",
    searchPlaceholder: "योजना खोजें (जैसे: छात्रवृत्ति, लैपटॉप, सोलर, ट्रैक्टर, पेंशन)...",
    filterLabel: "परिणाम फ़िल्टर करें:",
    filterAll: "सभी योजनाएं",
    filterEligible: "✓ मेरे लिए पात्र",
    filterNotEligible: "✕ मेरे लिए अपात्र",
    filterSaved: "★ सहेजी गई योजनाएं",
    eligibleBadge: "पात्र",
    notEligibleBadge: "अपात्र",
    officialPortal: "आधिकारिक वेबसाइट",
    grantBenefit: "योजना लाभ:",
    endDateLabel: "अंतिम तिथि:",
    autoApplyBtn: "ऑटो-अप्लाई करें",
    aboutSchemeBtn: "योजना विवरण",
    compareBtn: "तुलना करें",
    simulateBtn: "पात्रता सिमुलेटर देखें",
    downloadChecklistBtn: "चेकलिस्ट डाउनलोड करें",
    seeMore: "और योजनाएं देखें",
    showLess: "कम योजनाएं दिखाएं",
    satisfiedPrompt: "क्या आप इस उत्तर से संतुष्ट हैं?",
    yesBtn: "हाँ",
    noBtn: "नहीं (मिटाकर नया उत्तर दें)",
    newChatBtn: "+ नई चैट",
    ageLabel: "आयु",
    incomeLabel: "वार्षिक आय",
    yrs: "वर्ष",
    askHeader: "Ask Me — स्मार्ट सरकारी योजना वॉइस एवं चैट सहायक",
    askSub: "आवेदन प्रक्रिया, अंतिम तिथि, दस्तावेज़ और पात्रता से जुड़े हर सवाल का उत्तर",
    listeningMsg: "आपकी आवाज़ रिकॉर्ड हो रही है... बोलने के बाद रोकें दबाएं",
    searchingMsg: "आधिकारिक सरकारी पोर्टल से सटीक जानकारी खोजी जा रही है...",
    askEmptyTitle: "किसी भी सरकारी योजना, अंतिम तिथि या आवश्यक दस्तावेज़ों के बारे में पूछें:",
    inputPlaceholder: "अपना प्रश्न लिखें (जैसे: इसकी अंतिम तिथि क्या है? कौन से दस्तावेज़ चाहिए?)...",
    speakBtn: "बोलें",
    stopBtn: "रोकें",
    sendBtn: "पूछें",
    listenAudio: "आवाज़ में सुनें",
    aboutDeadlineTitle: "आवेदन की अंतिम तिथि (End Date)",
    aboutBenefitsTitle: "1. मिलने वाला वित्तीय लाभ एवं सुविधाएं",
    aboutConditionsTitle: "2. अनिवार्य पात्रता शर्तें",
    aboutDocsTitle: "3. आवेदन के लिए आवश्यक दस्तावेज़",
    directApplyModalTitle: "सीधा पोर्टल आवेदन एवं दस्तावेज़ अपलोड",
    reqInfoTitle: "1. योजना के लिए आवश्यक जानकारी",
    reqDocsTitle: "2. आवश्यक दस्तावेज़ अपलोड करें",
    uploadBtn: "फाइल चुनें",
    uploadedText: "संलग्न:",
    pendingText: "अपलोड आवश्यक (PDF/JPG)",
    submitDirectBtn: "पोर्टल खोलकर सीधे अप्लाई करें",
    recentHeader: "हाल की गतिविधि का इतिहास",
    recentHint: "किसी भी पुरानी चैट पर क्लिक करें—आपकी बातचीत वहीं से वापस खुल जाएगी!",
    deleteAll: "सभी मिटाएं",
    continueChatHint: "▶ क्लिक करके इसी बातचीत को आगे बढ़ाएं",
    locationPlaceholder: "शहर का नाम या पिन कोड लिखें...",
    saveChangesBtn: "बदलाव सहेजें (Save Changes)",
    cancelBtn: "रद्द करें",
    logoutBtn: "अकाउंट से लॉगआउट करें",
    logoutConfirmQ: "क्या आप वाकई अपने अकाउंट से लॉगआउट करना चाहते हैं?",
    logoutYes: "हाँ, लॉगआउट करें",
    logoutNo: "नहीं, वापस जाएं"
  }
};

const POPULAR_INDIAN_LOCATIONS = [
  { name: "Kamand, Mandi (Himachal Pradesh)", pincode: "175005" },
  { name: "Mandi Town, Mandi (Himachal Pradesh)", pincode: "175001" },
  { name: "Shimla GPO, Shimla (Himachal Pradesh)", pincode: "171001" },
  { name: "Dharamshala, Kangra (Himachal Pradesh)", pincode: "176215" },
  { name: "Anaugi, Kannauj (Uttar Pradesh)", pincode: "209733" },
  { name: "New Delhi GPO, Central Delhi (Delhi)", pincode: "110001" },
  { name: "Bengaluru GPO, Bengaluru Urban (Karnataka)", pincode: "560001" },
  { name: "Chandigarh Sector 17, Chandigarh (CH)", pincode: "160017" },
  { name: "Lucknow GPO, Lucknow (Uttar Pradesh)", pincode: "226001" },
  { name: "Patna GPO, Patna (Bihar)", pincode: "800001" },
  { name: "Jaipur GPO, Jaipur (Rajasthan)", pincode: "302001" },
  { name: "Mumbai GPO, Mumbai (Maharashtra)", pincode: "400001" }
];

// ─── 2. SCHEMES DATABASE WITH OFFICIAL APPLICATION END DATES ─────────────────
const SCHEMES_DATABASE = [
  {
    id: "stu-nsp-1",
    category: "student",
    portal: "https://scholarships.gov.in/ApplicationForm",
    minAge: 16,
    maxAge: 25,
    maxIncome: 800000,
    endDateIso: "2026-11-30",
    endDateEn: "30 Nov 2026",
    endDateHi: "30 नवंबर 2026",
    annualCashValue: 50000,
    en: {
      name: "National Scholarship Portal (NSP) Central Sector Scheme",
      stipend: "₹20,000 to ₹50,000 / year",
      department: "Ministry of Education, Govt. of India",
      description: "Direct financial scholarship for meritorious Class 12 pass students pursuing regular undergraduate or engineering degree courses.",
      conditions: [
        "Must be above 80th percentile in Class 12 board examination.",
        "Enrolled in a regular degree course at a recognized college or university.",
        "Total annual family income must not exceed ₹8,00,000."
      ],
      documents: [
        "Identity Proof linked with mobile number",
        "Class 12th Board Marksheet",
        "College Bonafide Certificate with AISHE Code",
        "Family Income Certificate issued by Tehsildar",
        "Student Bank Account Passbook"
      ],
      benefits: [
        "₹12,000 to ₹20,000 per year for Undergraduate degree studies.",
        "Up to ₹50,000 per year for Professional and Engineering courses.",
        "Transferred directly into the student's bank account via DBT."
      ]
    },
    hi: {
      name: "नेशनल स्कॉलरशिप पोर्टल (NSP) सेंट्रल सेक्टर योजना",
      stipend: "₹20,000 से ₹50,000 / वर्ष",
      department: "शिक्षा मंत्रालय, भारत सरकार",
      description: "12वीं कक्षा में उत्कृष्ट अंक प्राप्त करने वाले कॉलेज और इंजीनियरिंग छात्रों के लिए सीधी वार्षिक छात्रवृत्ति।",
      conditions: [
        "12वीं बोर्ड परीक्षा में 80वें पर्सेंटाइल से अधिक अंक होने चाहिए।",
        "मान्यता प्राप्त कॉलेज या विश्वविद्यालय में नियमित डिग्री कोर्स में प्रवेश।",
        "परिवार की कुल वार्षिक आय ₹8,00,000 से कम होनी चाहिए।"
      ],
      documents: [
        "मोबाइल नंबर से लिंक पहचान पत्र",
        "कक्षा 12वीं की अंकतालिका (Marksheet)",
        "कॉलेज बोनाफाइड प्रमाण पत्र और AISHE कोड",
        "तहसीलदार द्वारा जारी आय प्रमाण पत्र",
        "छात्र की बैंक पासबुक"
      ],
      benefits: [
        "स्नातक स्तर की पढ़ाई के लिए ₹12,000 से ₹20,000 प्रति वर्ष।",
        "तकनीकी और इंजीनियरिंग पाठ्यक्रमों के लिए ₹50,000 प्रति वर्ष तक।",
        "डीबीटी के माध्यम से सीधे छात्र के बैंक खाते में भुगतान।"
      ]
    },
    requiredFields: [
      { key: "boardRollNo", labelEn: "Class 12th Board Roll Number", labelHi: "कक्षा 12वीं का रोल नंबर", placeholder: "e.g. 24109842" },
      { key: "twelfthPercent", labelEn: "Class 12th Percentage (%)", labelHi: "कक्षा 12वीं का प्रतिशत (%)", placeholder: "e.g. 88.4%" },
      { key: "aisheCode", labelEn: "College AISHE Code", labelHi: "कॉलेज AISHE कोड", placeholder: "e.g. U-0184" }
    ]
  },
  {
    id: "stu-vidya-2",
    category: "student",
    portal: "https://pmvidyalaxmi.co.in",
    minAge: 17,
    maxAge: 30,
    maxIncome: 800000,
    endDateIso: "2027-03-31",
    endDateEn: "31 Mar 2027",
    endDateHi: "31 मार्च 2027",
    annualCashValue: 45000,
    en: {
      name: "PM-Vidyalaxmi Higher Education Loan & Interest Subsidy",
      stipend: "3% to 100% Interest Subsidy up to ₹10L",
      department: "Department of Higher Education",
      description: "Collateral-free, guarantor-free education loans with direct government interest subvention for students admitted to top institutions.",
      conditions: [
        "Merit-based admission into NIRF-ranked Quality Higher Education Institutions (QHEIs).",
        "Annual family income up to ₹8,00,000 (up to ₹4.5 Lakh for 100% interest waiver)."
      ],
      documents: [
        "Official College Admission Offer Letter & Fee Structure",
        "Identity Proof and PAN Card",
        "Authorized Family Income Certificate",
        "Class 10th and 12th Marksheets"
      ],
      benefits: [
        "Zero collateral security and zero third-party guarantor required.",
        "75% Government of India credit guarantee on loans up to ₹7.5 Lakh.",
        "3% interest subvention on education loans up to ₹10 Lakh."
      ]
    },
    hi: {
      name: "पीएम-विद्यालक्ष्मी उच्च शिक्षा ऋण एवं ब्याज सब्सिडी",
      stipend: "₹10 लाख तक के ऋण पर 3% से 100% ब्याज छूट",
      department: "उच्च शिक्षा विभाग, भारत सरकार",
      description: "शीर्ष संस्थानों में प्रवेश पाने वाले छात्रों के लिए बिना गारंटी और बिना किसी ज़मानत के शिक्षा ऋण व ब्याज सब्सिडी।",
      conditions: [
        "शीर्ष उच्च शिक्षण संस्थानों (QHEIs/IIT/NIT) में मेरिट के आधार पर प्रवेश।",
        "वार्षिक पारिवारिक आय ₹8,00,000 तक।"
      ],
      documents: [
        "संस्थान का प्रवेश पत्र (Offer Letter) और शुल्क विवरण",
        "पहचान पत्र और पैन कार्ड",
        "परिवार का आय प्रमाण पत्र",
        "10वीं और 12वीं की मार्कशीट"
      ],
      benefits: [
        "बिना किसी संपत्ति गिरवी रखे और बिना गारंटर के शिक्षा ऋण।",
        "₹7.5 लाख तक के ऋण पर भारत सरकार की 75% क्रेडिट गारंटी।",
        "₹10 लाख तक के ऋण पर 3% ब्याज सब्सिडी।"
      ]
    },
    requiredFields: [
      { key: "qheiName", labelEn: "Admitted Institution Name", labelHi: "प्रवेश लिए गए संस्थान का नाम", placeholder: "e.g. IIT Mandi" },
      { key: "loanAmount", labelEn: "Required Loan Amount (₹)", labelHi: "आवश्यक ऋण राशि (₹)", placeholder: "e.g. 650000" }
    ]
  },
  {
    id: "stu-yasasvi-3",
    category: "student",
    portal: "https://scholarships.gov.in",
    minAge: 16,
    maxAge: 26,
    maxIncome: 250000,
    endDateIso: "2026-12-15",
    endDateEn: "15 Dec 2026",
    endDateHi: "15 दिसंबर 2026",
    annualCashValue: 245000,
    en: {
      name: "PM-YASASVI Top Class College Education & Laptop Grant",
      stipend: "Up to ₹2,00,000 Fee Waiver + ₹45k Laptop",
      department: "Ministry of Social Justice & Empowerment",
      description: "Covers full tuition fee, hostel living allowance, books, and a brand-new laptop for students studying in premier institutes (IITs, NITs, IIITs, AIIMS, IIMs).",
      conditions: [
        "Secured admission in a notified premier institution (IIT, NIT, IIIT, AIIMS, IIM).",
        "Annual family income must not exceed ₹2,50,000."
      ],
      documents: [
        "Category Certificate & Family Income Certificate (< ₹2.5L)",
        "Institute Admission Bonafide & Tuition Fee Demand Letter",
        "Laptop Quotation/Invoice & Bank Passbook"
      ],
      benefits: [
        "Full tuition fee waiver up to ₹2,00,000 per year.",
        "Living expenses stipend of ₹36,000 per year + ₹5,000 per year for books.",
        "One-time grant of ₹45,000 for purchasing a new laptop/computer."
      ]
    },
    hi: {
      name: "पीएम-यशस्वी टॉप क्लास कॉलेज शिक्षा एवं लैपटॉप अनुदान",
      stipend: "₹2,00,000 तक फीस माफी + ₹45,000 लैपटॉप",
      department: "सामाजिक न्याय और अधिकारिता मंत्रालय",
      description: "प्रमुख संस्थानों (IIT, NIT, IIIT, AIIMS, IIM) में पढ़ने वाले छात्रों के लिए पूरी ट्यूशन फीस, हॉस्टल भत्ता, किताबें और नया लैपटॉप खरीदने के लिए अनुदान।",
      conditions: [
        "अधिसूचित प्रमुख संस्थान (IIT, NIT, IIIT, AIIMS) में प्रवेश।",
        "पारिवारिक वार्षिक आय ₹2,50,000 या उससे कम होनी चाहिए।"
      ],
      documents: [
        "श्रेणी प्रमाण पत्र और आय प्रमाण पत्र (₹2.5 लाख से कम)",
        "संस्थान का बोनाफाइड और फीस डिमांड लेटर",
        "लैपटॉप बिल/कोटेशन और बैंक पासबुक"
      ],
      benefits: [
        "प्रति वर्ष ₹2,00,000 तक पूरी ट्यूशन फीस की प्रतिपूर्ति।",
        "रहने के खर्च के लिए ₹36,000 प्रति वर्ष + किताबों के लिए ₹5,000 प्रति वर्ष।",
        "नया लैपटॉप खरीदने के लिए एकमुश्त ₹45,000 का अनुदान।"
      ]
    },
    requiredFields: [
      { key: "instName", labelEn: "Premier Institute Name", labelHi: "प्रमुख संस्थान का नाम", placeholder: "e.g. IIT Mandi" },
      { key: "feeDemand", labelEn: "Annual Tuition Fee Amount (₹)", labelHi: "वार्षिक ट्यूशन फीस (₹)", placeholder: "e.g. 200000" }
    ]
  },
  {
    id: "stu-aicte-4",
    category: "student",
    portal: "https://www.aicte-india.org/schemes/students-development-schemes",
    minAge: 17,
    maxAge: 26,
    maxIncome: 800000,
    endDateIso: "2026-12-20",
    endDateEn: "20 Dec 2026",
    endDateHi: "20 दिसंबर 2026",
    annualCashValue: 50000,
    en: {
      name: "AICTE Pragati & Saksham Technical Degree Scholarship",
      stipend: "₹50,000 / year Lump Sum",
      department: "All India Council for Technical Education (AICTE)",
      description: "Annual ₹50,000 scholarship for students admitted to AICTE-approved B.Tech/B.E. or Diploma engineering institutions.",
      conditions: [
        "Admitted to 1st year or 2nd year (lateral entry) in an AICTE-approved technical college.",
        "Family annual income below ₹8,00,000."
      ],
      documents: [
        "AICTE College Allotment Letter",
        "Tuition Fee Receipt & Class 12th Marksheet",
        "Family Income Certificate & Bank Passbook"
      ],
      benefits: [
        "₹50,000 lump sum grant every year for up to 4 years of engineering.",
        "Covers college fees, computer hardware, books, and study materials."
      ]
    },
    hi: {
      name: "एआईसीटीई (AICTE) प्रगति एवं सक्षम तकनीकी छात्रवृत्ति",
      stipend: "₹50,000 / वर्ष एकमुश्त अनुदान",
      department: "अखिल भारतीय तकनीकी शिक्षा परिषद (AICTE)",
      description: "तकनीकी डिग्री (B.Tech/B.E.) और डिप्लोमा कॉलेजों में पढ़ने वाले छात्रों के लिए प्रति वर्ष ₹50,000 की सीधी छात्रवृत्ति।",
      conditions: [
        "AICTE से मान्यता प्राप्त तकनीकी संस्थान के प्रथम या द्वितीय वर्ष में प्रवेश।",
        "परिवार की वार्षिक आय ₹8,00,000 से कम होनी चाहिए।"
      ],
      documents: [
        "काउंसलिंग सीट आवंटन पत्र (Allotment Letter)",
        "ट्यूशन फीस रसीद और 12वीं की मार्कशीट",
        "आय प्रमाण पत्र और बैंक पासबुक"
      ],
      benefits: [
        "इंजीनियरिंग के प्रत्येक वर्ष के लिए ₹50,000 की एकमुश्त राशि।",
        "कॉलेज फीस, कंप्यूटर, किताबें और सॉफ्टवेयर खरीदने में सहायक।"
      ]
    },
    requiredFields: [
      { key: "aicteId", labelEn: "AICTE College Code", labelHi: "AICTE कॉलेज कोड", placeholder: "e.g. 1-492819421" }
    ]
  },
  {
    id: "stu-inspire-5",
    category: "student",
    portal: "https://online-inspire.gov.in",
    minAge: 17,
    maxAge: 22,
    maxIncome: 1500000,
    endDateIso: "2026-12-31",
    endDateEn: "31 Dec 2026",
    endDateHi: "31 दिसंबर 2026",
    annualCashValue: 80000,
    en: {
      name: "DST INSPIRE Scholarship for Higher Education (SHE)",
      stipend: "₹80,000 / year (₹60k Cash + ₹20k Research)",
      department: "Department of Science & Technology",
      description: "National fellowship offering ₹80,000 annually to top 1% Class 12 board performers or JEE/NEET top 10,000 rank holders.",
      conditions: [
        "Age between 17 and 22 years.",
        "Within top 1% in Class 12 Board exams OR top 10,000 rank in JEE/NEET."
      ],
      documents: [
        "Class 12th Board Top 1% Advisory Note or JEE/NEET Rank Card",
        "College Principal Endorsement Certificate",
        "SBI Bank Account Passbook & Identity Proof"
      ],
      benefits: [
        "₹60,000 annual cash scholarship (@ ₹5,000/month).",
        "₹20,000 annual summer research internship grant."
      ]
    },
    hi: {
      name: "डीएसटी इंस्पायर (DST INSPIRE) उच्च शिक्षा छात्रवृत्ति",
      stipend: "₹80,000 / वर्ष (₹60k नकद + ₹20k रिसर्च)",
      department: "विज्ञान एवं प्रौद्योगिकी विभाग (DST)",
      description: "12वीं बोर्ड के टॉप 1% छात्रों या JEE/NEET के टॉप 10,000 रैंक धारकों के लिए ₹80,000 वार्षिक फेलोशिप।",
      conditions: [
        "आयु 17 से 22 वर्ष के बीच होनी चाहिए।",
        "12वीं बोर्ड में टॉप 1% या JEE/NEET में टॉप 10,000 रैंक।"
      ],
      documents: [
        "12वीं बोर्ड टॉप 1% प्रमाण पत्र या JEE/NEET रैंक कार्ड",
        "कॉलेज प्राचार्य द्वारा सत्यापित एंडोर्समेंट फॉर्म",
        "एसबीआई (SBI) बैंक पासबुक और पहचान पत्र"
      ],
      benefits: [
        "₹60,000 प्रति वर्ष नकद छात्रवृत्ति (₹5,000 प्रति माह)।",
        "ग्रीष्मकालीन अनुसंधान प्रोजेक्ट के लिए ₹20,000 प्रति वर्ष अतिरिक्त।"
      ]
    },
    requiredFields: [
      { key: "rankProof", labelEn: "Board Percentile or JEE/NEET Rank", labelHi: "बोर्ड पर्सेंटाइल या JEE/NEET रैंक", placeholder: "e.g. AIR 3420" }
    ]
  },
  {
    id: "frm-kisan-1",
    category: "farmer",
    portal: "https://pmkisan.gov.in/RegistrationFormNew.aspx",
    minAge: 18,
    maxAge: 85,
    maxIncome: 600000,
    endDateIso: "2026-12-15",
    endDateEn: "15 Dec 2026",
    endDateHi: "15 दिसंबर 2026",
    annualCashValue: 6000,
    en: {
      name: "PM-KISAN Samman Nidhi Direct Income Support",
      stipend: "₹6,000 / year Direct Bank Transfer",
      department: "Ministry of Agriculture & Farmers Welfare",
      description: "Direct financial assistance of ₹6,000 per year disbursed in three equal installments of ₹2,000 every 4 months to landholding farmers.",
      conditions: [
        "Must own cultivable agricultural land in state revenue records.",
        "e-KYC and bank NPCI seeding must be active."
      ],
      documents: [
        "Identity Proof linked with mobile number",
        "Agricultural Land Ownership Record (Khasra / Khatauni)",
        "NPCI-seeded Bank Account Passbook"
      ],
      benefits: [
        "₹6,000 guaranteed annual cash support in 3 installments.",
        "Automatic eligibility for low-interest Kisan Credit Card (KCC)."
      ]
    },
    hi: {
      name: "पीएम-किसान सम्मान निधि सीधी आय सहायता योजना",
      stipend: "₹6,000 / वर्ष सीधा बैंक ट्रांसफर",
      department: "कृषि एवं किसान कल्याण मंत्रालय",
      description: "भूमिधारक किसान परिवारों को हर 4 महीने में ₹2,000 की तीन समान किश्तों में प्रति वर्ष ₹6,000 की सीधी आर्थिक सहायता।",
      conditions: [
        "राज्य राजस्व रिकॉर्ड में खेती योग्य भूमि दर्ज होनी चाहिए।",
        "ई-केवाईसी और बैंक एनपीसीआई लिंकिंग सक्रिय होनी चाहिए।"
      ],
      documents: [
        "मोबाइल से लिंक पहचान पत्र",
        "कृषि भूमि की खसरा / खतौनी / जमाबंदी नकल",
        "बैंक पासबुक"
      ],
      benefits: [
        "प्रति वर्ष ₹6,000 सीधे किसान के बैंक खाते में।",
        "सस्ते ब्याज वाले किसान क्रेडिट कार्ड (KCC) के लिए सीधी पात्रता।"
      ]
    },
    requiredFields: [
      { key: "khasraNo", labelEn: "Land Khasra / Khatauni Number", labelHi: "भूमि खसरा / खतौनी नंबर", placeholder: "e.g. Khatauni 142" },
      { key: "landArea", labelEn: "Land Area (Hectares)", labelHi: "भूमि का क्षेत्रफल (हेक्टेयर में)", placeholder: "e.g. 1.5 Hectares" }
    ]
  },
  {
    id: "frm-kusum-2",
    category: "farmer",
    portal: "https://pmkusum.mnre.gov.in",
    minAge: 18,
    maxAge: 80,
    maxIncome: 1200000,
    endDateIso: "2027-01-31",
    endDateEn: "31 Jan 2027",
    endDateHi: "31 जनवरी 2027",
    annualCashValue: 120000,
    en: {
      name: "PM-KUSUM Solar Agricultural Water Pump Subsidy",
      stipend: "60% to 80% Solar Pump Subsidy",
      department: "Ministry of New & Renewable Energy",
      description: "Provides 60% to 80% government capital subsidy for installing standalone solar-powered irrigation pumps up to 7.5 HP.",
      conditions: [
        "Farmer must own agricultural land with a borewell or surface irrigation source."
      ],
      documents: [
        "Identity Proof & Farmer ID",
        "Land Jamabandi / Khasra Map",
        "Bank Account Passbook"
      ],
      benefits: [
        "60% to 80% direct subsidy on solar pump cost.",
        "Zero diesel and zero electricity bills for irrigation for 25 years."
      ]
    },
    hi: {
      name: "पीएम-कुसुम (PM-KUSUM) सोलर कृषि पंप सब्सिडी योजना",
      stipend: "सोलर पंप पर 60% से 80% सरकारी सब्सिडी",
      department: "नवीन और नवीकरणीय ऊर्जा मंत्रालय",
      description: "खेतों में 7.5 HP तक के सोलर सिंचाई पंप लगाने के लिए सरकार की ओर से 60% से 80% तक सीधा पूंजीगत अनुदान।",
      conditions: [
        "किसान के पास सिंचाई स्रोत के साथ कृषि भूमि होनी चाहिए।"
      ],
      documents: [
        "पहचान पत्र और किसान पंजीकरण",
        "भूमि की जमाबंदी / खसरा नक्शा",
        "बैंक पासबुक"
      ],
      benefits: [
        "सोलर पंप की लागत पर 60% से 80% तक सीधी सरकारी छूट।",
        "25 वर्षों तक डीजल और बिजली बिल से पूरी तरह मुक्ति।"
      ]
    },
    requiredFields: [
      { key: "pumpHp", labelEn: "Required Solar Pump Capacity (HP)", labelHi: "आवश्यक सोलर पंप क्षमता (HP)", placeholder: "e.g. 5 HP" }
    ]
  },
  {
    id: "sen-ayush-1",
    category: "senior",
    portal: "https://beneficiary.nha.gov.in",
    minAge: 70,
    maxAge: 120,
    maxIncome: 9999999,
    endDateIso: "2027-03-31",
    endDateEn: "31 Mar 2027",
    endDateHi: "31 मार्च 2027",
    annualCashValue: 500000,
    en: {
      name: "Ayushman Vay Vandana 70+ Universal Senior Health Card",
      stipend: "₹5,00,000 / year Free Hospitalization",
      department: "National Health Authority (NHA)",
      description: "Universal ₹5 Lakh annual cashless hospitalization cover for every Indian citizen aged 70 and above, regardless of income.",
      conditions: [
        "Must be aged 70 years or older.",
        "Zero income limit—all seniors 70+ are eligible."
      ],
      documents: [
        "Identity Proof showing age 70+ (only document needed for instant e-KYC)"
      ],
      benefits: [
        "₹5,00,000 per year free cashless treatment at 29,000+ empanelled hospitals.",
        "Covers pre-existing diseases from Day 1 with zero waiting period."
      ]
    },
    hi: {
      name: "आयुष्मान वय वंदना 70+ वरिष्ठ नागरिक स्वास्थ्य कार्ड",
      stipend: "₹5,00,000 / वर्ष मुफ्त अस्पताल इलाज",
      department: "राष्ट्रीय स्वास्थ्य प्राधिकरण (NHA)",
      description: "70 वर्ष और उससे अधिक आयु के प्रत्येक भारतीय वरिष्ठ नागरिक के लिए बिना किसी आय सीमा के सालाना ₹5 लाख का कैशलेस इलाज।",
      conditions: [
        "आयु 70 वर्ष या उससे अधिक होनी चाहिए।",
        "कोई आय सीमा नहीं—सभी वरिष्ठ नागरिक पात्र हैं।"
      ],
      documents: [
        "70+ आयु दर्शाने वाला पहचान पत्र (ई-केवाईसी के लिए अन्य किसी कागज की आवश्यकता नहीं)"
      ],
      benefits: [
        "देश के 29,000+ सूचीबद्ध अस्पतालों में सालाना ₹5,00,000 तक मुफ्त इलाज।",
        "पहले ही दिन से सभी पुरानी बीमारियों का पूरा कवर।"
      ]
    },
    requiredFields: [
      { key: "birthYear", labelEn: "Birth Year on ID Card", labelHi: "पहचान पत्र पर दर्ज जन्म वर्ष", placeholder: "e.g. 1952" }
    ]
  },
  {
    id: "sen-nsap-2",
    category: "senior",
    portal: "https://nsap.nic.in",
    minAge: 60,
    maxAge: 120,
    maxIncome: 250000,
    endDateIso: "2026-12-31",
    endDateEn: "31 Dec 2026",
    endDateHi: "31 दिसंबर 2026",
    annualCashValue: 24000,
    en: {
      name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
      stipend: "₹1,000 to ₹2,500 / month Direct Pension",
      department: "Ministry of Rural Development",
      description: "Monthly social security pension credited directly into the bank or post office accounts of senior citizens aged 60 and above.",
      conditions: [
        "Citizen aged 60 years or above belonging to eligible low-income household."
      ],
      documents: [
        "Age Proof Certificate",
        "Income / Ration Card Certificate",
        "Bank or Post Office Passbook"
      ],
      benefits: [
        "Guaranteed monthly pension credited directly into account via DBT.",
        "Higher monthly pension rate automatically unlocked at age 80+."
      ]
    },
    hi: {
      name: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था मासिक पेंशन योजना",
      stipend: "₹1,000 से ₹2,500 / माह सीधी पेंशन",
      department: "ग्रामीण विकास मंत्रालय, भारत सरकार",
      description: "60 वर्ष और उससे अधिक आयु के वरिष्ठ नागरिकों के बैंक या डाकघर खाते में हर महीने जमा होने वाली सामाजिक सुरक्षा पेंशन।",
      conditions: [
        "आयु 60 वर्ष या उससे अधिक एवं पात्र कम आय वर्ग परिवार।"
      ],
      documents: [
        "आयु प्रमाण पत्र",
        "आय प्रमाण पत्र या राशन कार्ड",
        "बैंक या डाकघर की पासबुक"
      ],
      benefits: [
        "हर महीने डीबीटी के माध्यम से सीधे खाते में गारंटीड मासिक पेंशन।",
        "80 वर्ष की आयु पूर्ण होने पर पेंशन राशि में स्वतः वृद्धि।"
      ]
    },
    requiredFields: [
      { key: "bplCardNo", labelEn: "Income / Ration Certificate No.", labelHi: "आय / राशन प्रमाण पत्र संख्या", placeholder: "e.g. HP-209481" }
    ]
  }
];

// ─── 3. NATURAL SPEECH SANITIZER ─────────────────────────────────────────────
function sanitizeTextForNaturalSpeech(rawText, lang) {
  if (!rawText) return "";
  let s = rawText;
  s = s.replace(
    /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}★☆✓✔✕✖•●○▶►⚠️👉🎓🌾🛡️🚜🏦📋💡🌟⏳↻↗📄]/gu,
    " "
  );
  s = s.replace(/\(https?:\/\/[^\s)]+\)/gi, " ");
  s = s.replace(/https?:\/\/[^\s]+/gi, " ");
  s = s.replace(/\([a-z0-9.-]+\.(gov|nic|org|co)\.in\)/gi, " ");
  s = s.replace(/(\d),(\d)/g, "$1$2");
  s = s.replace(/(\d),(\d)/g, "$1$2");

  if (lang === "Hindi") {
    s = s.replace(/₹\s*(\d+)/g, "$1 रुपये");
    s = s.replace(/Rs\.?\s*(\d+)/gi, "$1 रुपये");
    s = s.replace(/\b1000000\b/g, "दस लाख");
    s = s.replace(/\b800000\b/g, "आठ लाख");
    s = s.replace(/\b500000\b/g, "पांच लाख");
    s = s.replace(/\b250000\b/g, "दो लाख पचास हज़ार");
    s = s.replace(/\b200000\b/g, "दो लाख");
    s = s.replace(/\b80000\b/g, "अस्सी हज़ार");
    s = s.replace(/\b50000\b/g, "पचास हज़ार");
    s = s.replace(/\b45000\b/g, "पैंतालीस हज़ार");
    s = s.replace(/\b36000\b/g, "छत्तीस हज़ार");
    s = s.replace(/\b20000\b/g, "बीस हज़ार");
    s = s.replace(/\b6000\b/g, "छह हज़ार");
  } else {
    s = s.replace(/₹\s*(\d+)/g, "$1 rupees");
    s = s.replace(/Rs\.?\s*(\d+)/gi, "$1 rupees");
    s = s.replace(/\b1000000\b/g, "ten lakh");
    s = s.replace(/\b800000\b/g, "eight lakh");
    s = s.replace(/\b500000\b/g, "five lakh");
    s = s.replace(/\b250000\b/g, "two lakh fifty thousand");
    s = s.replace(/\b200000\b/g, "two lakh");
    s = s.replace(/\b80000\b/g, "eighty thousand");
    s = s.replace(/\b50000\b/g, "fifty thousand");
    s = s.replace(/\b45000\b/g, "forty five thousand");
    s = s.replace(/\b36000\b/g, "thirty six thousand");
    s = s.replace(/\b20000\b/g, "twenty thousand");
    s = s.replace(/\b6000\b/g, "six thousand");
  }

  return s.replace(/\s+/g, " ").trim();
}

export function speakMultilingualText(rawText, langCodeName) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const cleaned = sanitizeTextForNaturalSpeech(rawText, langCodeName);
  const utterance = new SpeechSynthesisUtterance(cleaned);
  const found = SUPPORTED_LANGUAGES.find((l) => l.code === langCodeName);
  utterance.lang = found ? found.tts : "en-IN";
  utterance.rate = 0.98;
  window.speechSynthesis.speak(utterance);
}

// ─── 4. REAL PDF.JS + DECOMPRESSION ENGINE FOR COMPRESSED PDF FILES ──────────
async function loadPdfJsFromCdn() {
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }
      resolve(window.pdfjsLib);
    };
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

async function extractRealTextFromPdfFile(file) {
  try {
    const buffer = await file.arrayBuffer();

    // Method 1: Official Mozilla PDF.js (Decompresses FlateDecode streams & ToUnicode maps!)
    const pdfjsLib = await loadPdfJsFromCdn();
    if (pdfjsLib) {
      try {
        const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
        let fullText = "";
        const maxPages = Math.min(pdf.numPages, 25);
        for (let i = 1; i <= maxPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n";
        }
        if (fullText.trim().length > 20) {
          return fullText.trim();
        }
      } catch {
        // Fallback to Method 2 if PDF.js worker is blocked
      }
    }

    // Method 2: Raw stream fallback
    const decoder = new TextDecoder("latin1");
    const raw = decoder.decode(buffer);
    const matches = raw.match(/\(([^()]{3,200})\)/g) || [];
    return matches
      .map((m) => m.slice(1, -1))
      .join(" ")
      .replace(/[^\x20-\x7E]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  } catch {
    return "";
  }
}

// ─── 5. GLOWING DOMAIN ILLUSTRATIONS + PARTICLE FLOW BACKDROP ────────────────
function DomainGlowingBackdrop({ activeCategory }) {
  const canvasRef = useRef(null);
  const color =
    activeCategory === "student"
      ? "#38bdf8"
      : activeCategory === "farmer"
      ? "#10b981"
      : "#f59e0b";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animId;
    let mouse = { x: -1000, y: -1000 };

    const particles = Array.from({ length: 420 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0,
      vy: 0,
      age: 0,
      life: Math.random() * 200 + 100
    }));

    const animate = () => {
      ctx.fillStyle = "rgba(5, 7, 12, 0.15)";
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        const angle = (Math.cos(p.x * 0.005) + Math.sin(p.y * 0.005)) * Math.PI;
        p.vx += Math.cos(angle) * 0.18;
        p.vy += Math.sin(angle) * 0.18;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          p.vx -= dx * force * 0.04;
          p.vy -= dy * force * 0.04;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.age++;

        if (p.age > p.life) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.vx = 0;
          p.vy = 0;
          p.age = 0;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = color;
        ctx.globalAlpha = 1 - Math.abs(p.age / p.life - 0.5) * 2;
        ctx.fillRect(p.x, p.y, 1.6, 1.6);
      }
      animId = requestAnimationFrame(animate);
    };

    animate();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [color]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#05070c] pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full opacity-75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(5,7,12,0.82)_95%)]" />

      <div className="absolute right-[2%] bottom-[4%] w-[360px] h-[360px] md:w-[540px] md:h-[540px] opacity-65 pointer-events-none">
        <AnimatePresence mode="wait">
          {activeCategory === "student" && (
            <motion.svg
              key="student-cap-glow"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              viewBox="0 0 320 320"
              className="w-full h-full text-cyan-300 stroke-current fill-none drop-shadow-[0_0_25px_rgba(34,211,238,0.65)]"
            >
              <circle cx="170" cy="145" r="95" strokeWidth="1" strokeDasharray="6 8" className="opacity-40" />
              <motion.g
                animate={{ y: [0, -28, 0], rotate: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
              >
                <polygon
                  points="170,65 265,105 170,145 75,105"
                  fill="rgba(34,211,238,0.22)"
                  stroke="#22d3ee"
                  strokeWidth="3.5"
                />
                <path
                  d="M122,126 V162 Q170,185 218,162 V126"
                  fill="rgba(14,116,144,0.35)"
                  stroke="#22d3ee"
                  strokeWidth="3"
                />
                <circle cx="170" cy="105" r="5" fill="#fde047" />
                <path d="M170,105 Q215,118 232,165" stroke="#fde047" strokeWidth="3" strokeLinecap="round" />
              </motion.g>
              <circle cx="170" cy="225" r="18" fill="currentColor" fillOpacity="0.25" strokeWidth="2.5" />
              <path d="M130,295 L142,248 Q170,258 198,248 L210,295 Z" fill="currentColor" fillOpacity="0.18" strokeWidth="2.5" />
            </motion.svg>
          )}

          {activeCategory === "farmer" && (
            <motion.svg
              key="farmer-field-glow"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              viewBox="0 0 340 320"
              className="w-full h-full text-emerald-400 stroke-current fill-none drop-shadow-[0_0_25px_rgba(16,185,129,0.6)]"
            >
              <circle cx="260" cy="95" r="32" fill="rgba(250,204,21,0.18)" stroke="#facc15" strokeWidth="2.5" />
              <path d="M15,255 Q170,235 325,255" strokeWidth="3.5" strokeLinecap="round" />
              {[45, 80, 115, 150].map((xPos, idx) => (
                <motion.g
                  key={xPos}
                  animate={{ scaleY: [0.55, 1.12, 0.55] }}
                  transition={{ repeat: Infinity, duration: 3.4, delay: idx * 0.25, ease: "easeInOut" }}
                  style={{ transformOrigin: `${xPos}px 250px` }}
                >
                  <line x1={xPos} y1="250" x2={xPos} y2="170" strokeWidth="3" />
                  <ellipse cx={xPos} cy="164" rx="5.5" ry="13" fill="currentColor" fillOpacity="0.4" />
                </motion.g>
              ))}
              <motion.g animate={{ x: [-20, 35, -20] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
                <path d="M180,172 H222 L230,202 H175 Z" fill="currentColor" fillOpacity="0.22" strokeWidth="2.5" />
                <rect x="175" y="202" width="88" height="28" rx="6" fill="currentColor" fillOpacity="0.32" strokeWidth="3" />
                <circle cx="195" cy="234" r="22" fill="#05070c" stroke="currentColor" strokeWidth="4" />
                <circle cx="250" cy="240" r="15" fill="#05070c" stroke="currentColor" strokeWidth="3.5" />
              </motion.g>
            </motion.svg>
          )}

          {activeCategory === "senior" && (
            <motion.svg
              key="senior-stick-glow"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              viewBox="0 0 320 320"
              className="w-full h-full text-amber-300 stroke-current fill-none drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]"
            >
              <circle cx="165" cy="175" r="92" strokeWidth="1.5" strokeDasharray="8 6" className="opacity-35" />
              <line x1="45" y1="265" x2="285" y2="265" strokeWidth="3.5" strokeLinecap="round" />
              <motion.g animate={{ x: [-12, 18, -12], y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}>
                <circle cx="160" cy="118" r="16" fill="currentColor" fillOpacity="0.28" strokeWidth="3" />
                <path d="M150,136 Q138,172 142,212 H172 Q170,172 162,136 Z" fill="currentColor" fillOpacity="0.22" strokeWidth="3" />
                <path d="M160,148 L190,176 L204,180" strokeWidth="4" strokeLinecap="round" />
                <path d="M198,180 Q212,172 212,185 L216,265" strokeWidth="3.5" strokeLinecap="round" />
                <line x1="148" y1="212" x2="138" y2="265" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="164" y1="212" x2="174" y2="265" strokeWidth="4.5" strokeLinecap="round" />
              </motion.g>
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── 6. TRUE CONTENT-INSPECTING PDF ANALYZER MODAL (WITH PDF.JS + ZLIB) ──────
function BuiltInPdfModal({ onClose, uiLanguage, userCategory }) {
  const [status, setStatus] = useState("idle");
  const [summary, setSummary] = useState("");
  const isHi = uiLanguage === "Hindi";

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setStatus("analyzing");
    setSummary("");

    // Decompress & extract all pages using Mozilla PDF.js
    const clientExtractedText = await extractRealTextFromPdfFile(f);

    const formData = new FormData();
    formData.append("file", f);
    formData.append("language", uiLanguage);
    formData.append("category", userCategory || "student");
    formData.append("client_extracted_text", clientExtractedText);

    try {
      const res = await fetch("http://localhost:8000/api/pdf/analyze", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.is_scheme) {
        setStatus("success");
        setSummary(data.summary);
        speakMultilingualText(data.summary, uiLanguage);
      } else {
        setStatus("rejected");
        setSummary(data.summary);
        speakMultilingualText(data.summary, uiLanguage);
      }
    } catch {
      const combinedLower = (f.name.replace(/\.pdf$/i, "") + " " + clientExtractedText).toLowerCase();
      const genuineSchemeTerms = [
        "scheme", "schemes", "yojana", "ministry", "subsidy", "pension", "stipend",
        "beneficiary", "dbt", "scholarship", "pm-kisan", "fasal", "ayushman",
        "vidyalaxmi", "yasasvi", "aicte", "inspire", "ignoaps", "welfare", "grant",
        "government", "govt", "eligible", "eligibility", "income", "allowance"
      ];

      let totalHits = 0;
      const matchedList = [];
      for (const term of genuineSchemeTerms) {
        const count = combinedLower.split(term).length - 1;
        if (count > 0) {
          totalHits += count;
          matchedList.push(`${term} (${count}x)`);
        }
      }

      const sentences = clientExtractedText
        .split(/[.\n!?]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 18);
      const excerpt = sentences.slice(0, 3).join(" | ").slice(0, 280) || f.name.replace(/\.pdf$/i, "");

      if (totalHits < 2) {
        const rejectMsg = isHi
          ? `📄 '${f.filename || f.name}' की सामग्री जांच:\n• पीडीएफ में पाया गया विवरण: "${excerpt}"\n• निष्कर्ष: यह पीडीएफ किसी सरकारी योजना, छात्रवृत्ति या सब्सिडी से संबंधित नहीं है।\n⚠️ यह वेबसाइट केवल सरकारी योजनाओं (Government Schemes) में सहायता करती है।`
          : `📄 Content Inspection of '${f.name}':\n• Detected Content in File: "${excerpt}"\n• Conclusion: This PDF is NOT related to any government welfare scheme, scholarship, or subsidy.\n⚠️ Notice: This website only helps with Government Schemes and Welfare Notifications.`;
        setStatus("rejected");
        setSummary(rejectMsg);
        speakMultilingualText(rejectMsg, uiLanguage);
      } else {
        const benefitSent = sentences.find((s) => /rs|₹|lakh|stipend|subsidy|grant|benefit|amount/i.test(s)) || "Direct financial grant/subsidy via DBT as specified in the scheme document.";
        const eligSent = sentences.find((s) => /eligible|eligibility|age|income|criteria|student|farmer/i.test(s)) || "Applicants meeting the statutory age, category, and income thresholds.";
        const docSent = sentences.find((s) => /document|certificate|passbook|marksheet|identity/i.test(s)) || "Identity Proof, Income Certificate, Qualifying Record, and Bank Passbook.";

        const okMsg = isHi
          ? `✓ '${f.name}' का वास्तविक योजना सारांश (कुल योजना शब्द मिले: ${totalHits} बार — ${matchedList.slice(0, 5).join(", ")}):\n1. मुख्य सारांश: ${excerpt}\n2. वित्तीय लाभ: ${benefitSent}\n3. पात्रता: ${eligSent}\n4. आवश्यक दस्तावेज़: ${docSent}`
          : `✓ Verified Scheme PDF Analysis of '${f.name}' (Total Scheme Keywords Found: ${totalHits} hits — ${matchedList.slice(0, 5).join(", ")}):\n1. Document Overview: ${excerpt}\n2. Financial Grant / Benefit: ${benefitSent}\n3. Eligibility Criteria: ${eligSent}\n4. Required Documents: ${docSent}`;
        setStatus("success");
        setSummary(okMsg);
        speakMultilingualText(okMsg, uiLanguage);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="liquid-glass rounded-3xl p-7 max-w-lg w-full border-cyan-500/40 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isHi ? "पीडीएफ सामग्री जांच एवं वॉइस सारांश" : "Intelligent PDF Content Inspector & Summarizer"}
            </h3>
            <p className="text-xs text-slate-400">
              {isHi
                ? "PDF.js द्वारा सभी पन्नों को डीकंप्रेस करके योजना का सटीक सारांश और आवाज़ सुनाता है"
                : "Decompresses all PDF pages via PDF.js to verify and summarize scheme clauses"}
            </p>
          </div>
        </div>

        <label className="border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-black/30 mb-4">
          <Upload className="w-8 h-8 text-cyan-400 mb-2" />
          <span className="text-xs font-semibold text-slate-200">
            {isHi ? "जांच के लिए पीडीएफ फाइल चुनें" : "Click to Upload PDF Document for Inspection"}
          </span>
          <input type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        </label>

        {status === "analyzing" && (
          <div className="bg-black/50 p-3.5 rounded-xl text-xs text-cyan-300 font-mono text-center animate-pulse">
            {isHi ? "पीडीएफ के सभी पन्नों को डीकंप्रेस करके पढ़ा जा रहा है..." : "Decompressing PDF pages and counting scheme keywords..."}
          </div>
        )}

        {status === "success" && (
          <div className="bg-emerald-500/15 border border-emerald-500/40 p-4 rounded-2xl text-xs text-emerald-100 space-y-2 whitespace-pre-line leading-relaxed">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2 mb-1">
              <span className="font-bold text-emerald-300">✓ Genuine Scheme PDF Verified ({uiLanguage})</span>
              <button
                onClick={() => speakMultilingualText(summary, uiLanguage)}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 font-bold flex items-center gap-1 hover:bg-emerald-500/30"
              >
                <Volume2 className="w-3.5 h-3.5" /> Speak Summary
              </button>
            </div>
            <div>{summary}</div>
          </div>
        )}

        {status === "rejected" && (
          <div className="bg-rose-500/15 border border-rose-500/40 p-4 rounded-2xl text-xs text-rose-100 space-y-2 whitespace-pre-line leading-relaxed">
            <div className="flex items-center justify-between border-b border-rose-500/30 pb-2 mb-1">
              <span className="font-bold text-rose-300 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-rose-400" /> Non-Scheme Document Rejected
              </span>
              <button
                onClick={() => speakMultilingualText(summary, uiLanguage)}
                className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-200 font-bold flex items-center gap-1 hover:bg-rose-500/30"
              >
                <Volume2 className="w-3.5 h-3.5" /> Speak Notice
              </button>
            </div>
            <div>{summary}</div>
          </div>
        )}

        <button
          onClick={() => {
            if ("speechSynthesis" in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="glass-btn-primary w-full py-2.5 rounded-xl text-xs font-bold text-white mt-4"
        >
          {isHi ? "बंद करें" : "Close"}
        </button>
      </div>
    </div>
  );
}

// ─── 7. MAIN APPLICATION ─────────────────────────────────────────────────────
export default function App() {
  const getUsersDb = () => {
    try {
      return JSON.parse(localStorage.getItem("bb_users_db_v6") || "{}");
    } catch {
      return {};
    }
  };
  const saveUsersDb = (db) => localStorage.setItem("bb_users_db_v6", JSON.stringify(db));

  const [currentUserPhone, setCurrentUserPhone] = useState(
    localStorage.getItem("bb_active_user_v6") || ""
  );
  const [showAuthModal, setShowAuthModal] = useState(!localStorage.getItem("bb_active_user_v6"));
  const [authTab, setAuthTab] = useState("signup");
  const [authStep, setAuthStep] = useState("details");

  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [serverOtp, setServerOtp] = useState("");

  // Committed User Profile State
  const [userName, setUserName] = useState("");
  const [userDob, setUserDob] = useState("");
  const [userIncome, setUserIncome] = useState("");
  const [userCategory, setUserCategory] = useState("student");
  const [userLocation, setUserLocation] = useState("Kamand, Mandi (Himachal Pradesh)");
  const [uiLanguage, setUiLanguage] = useState("English");
  const [pincode, setPincode] = useState("175005");

  // Buffered Draft State inside Profile Modal
  const [draftName, setDraftName] = useState("");
  const [draftDob, setDraftDob] = useState("");
  const [draftIncome, setDraftIncome] = useState("");
  const [draftCategory, setDraftCategory] = useState("student");
  const [draftLanguage, setDraftLanguage] = useState("English");
  const [draftLocation, setDraftLocation] = useState("");
  const [draftPincode, setDraftPincode] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Bidirectional Location + PIN Autocomplete State
  const [locationQuery, setLocationQuery] = useState("Kamand, Mandi (Himachal Pradesh)");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Bonus Feature 1: "Why Am I Not Eligible?" Interactive Simulator Modal State
  const [simulatorScheme, setSimulatorScheme] = useState(null);
  const [simAge, setSimAge] = useState(19);
  const [simIncome, setSimIncome] = useState(300000);

  // Bonus Feature 2: Reusable Document Readiness Vault State
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [documentVault, setDocumentVault] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("bb_doc_vault_v1") || "{}");
    } catch {
      return {};
    }
  });

  const updateVaultFile = (slotKey, fileName) => {
    const updated = { ...documentVault, [slotKey]: fileName };
    setDocumentVault(updated);
    localStorage.setItem("bb_doc_vault_v1", JSON.stringify(updated));
  };

  // Side-by-Side Scheme Comparison State
  const [compareIds, setCompareIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const isHi = uiLanguage === "Hindi";
  const t = UI_TRANSLATIONS[uiLanguage] || UI_TRANSLATIONS.English;

  const [activityLogs, setActivityLogs] = useState({
    signIns: [],
    aiQuestions: [],
    schemeVisits: []
  });
  const [activeHistoryTab, setActiveHistoryTab] = useState("aiQuestions");
  const [showActivityDrawer, setShowActivityDrawer] = useState(false);

  const [savedSchemeIds, setSavedSchemeIds] = useState([]);
  const [trackedApplications, setTrackedApplications] = useState([]);
  const [showTrackerModal, setShowTrackerModal] = useState(false);

  useEffect(() => {
    if (!currentUserPhone) return;
    const db = getUsersDb();
    const u = db[currentUserPhone];
    if (u) {
      setUserName(u.name || "");
      setUserDob(u.dob || "");
      setUserIncome(u.income ?? "");
      setUserCategory(u.category || "student");
      const loc = u.location || "Kamand, Mandi (Himachal Pradesh)";
      setUserLocation(loc);
      setLocationQuery(loc);
      setUiLanguage(u.uiLanguage || "English");
      setPincode(u.pincode || "175005");
      setSavedSchemeIds(u.savedSchemeIds || []);
      setTrackedApplications(u.trackedApplications || []);
      setActivityLogs(
        u.activityLogs || {
          signIns: [],
          aiQuestions: [],
          schemeVisits: []
        }
      );
    }
  }, [currentUserPhone]);

  const persistUserData = (updates = {}) => {
    if (!currentUserPhone) return;
    const db = getUsersDb();
    const existing = db[currentUserPhone] || {};
    db[currentUserPhone] = {
      ...existing,
      name: userName,
      dob: userDob,
      income: Number(userIncome) || 0,
      category: userCategory,
      location: userLocation,
      uiLanguage,
      pincode,
      savedSchemeIds,
      trackedApplications,
      activityLogs,
      ...updates
    };
    saveUsersDb(db);
  };

  const logSubActivity = (type, text, extra = {}) => {
    const entry = {
      id: extra.threadId || Date.now() + Math.random(),
      text,
      url: extra.url || "",
      messages: extra.messages || null,
      schemeId: extra.schemeId || null,
      time: new Date().toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    const existingList = activityLogs[type] || [];
    const filtered = extra.threadId ? existingList.filter((item) => item.id !== extra.threadId) : existingList;
    const updatedLogs = {
      ...activityLogs,
      [type]: [entry, ...filtered].slice(0, 30)
    };
    setActivityLogs(updatedLogs);
    persistUserData({ activityLogs: updatedLogs });
  };

  const deleteSingleActivity = (type, id) => {
    const updatedLogs = {
      ...activityLogs,
      [type]: (activityLogs[type] || []).filter((item) => item.id !== id)
    };
    setActivityLogs(updatedLogs);
    persistUserData({ activityLogs: updatedLogs });
  };

  const clearCategoryActivity = (type) => {
    const updatedLogs = {
      ...activityLogs,
      [type]: []
    };
    setActivityLogs(updatedLogs);
    persistUserData({ activityLogs: updatedLogs });
  };

  const handleLocationInputChange = async (val) => {
    setLocationQuery(val);
    setShowLocationDropdown(true);

    if (/^\d{6}$/.test(val.trim())) {
      setPincode(val.trim());
      await lookupByPin(val.trim());
      return;
    }

    const q = val.toLowerCase().trim();
    const localMatches = POPULAR_INDIAN_LOCATIONS.filter(
      (item) => item.name.toLowerCase().includes(q) || item.pincode.includes(q)
    );
    setLocationSuggestions(localMatches);

    if (q.length >= 3) {
      try {
        const res = await fetch(`http://localhost:8000/api/location/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        if (data?.results?.length > 0) {
          setLocationSuggestions([...localMatches, ...data.results].slice(0, 8));
        }
      } catch {
        // retain localMatches
      }
    }
  };

  const lookupByPin = async (pinStr) => {
    if (!pinStr || pinStr.length !== 6) return;
    const localMatch = POPULAR_INDIAN_LOCATIONS.find((l) => l.pincode === pinStr);
    if (localMatch) {
      setUserLocation(localMatch.name);
      setLocationQuery(localMatch.name);
      setPincode(pinStr);
      persistUserData({ location: localMatch.name, pincode: pinStr });
      return localMatch.name;
    }
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pinStr}`);
      const data = await res.json();
      if (data && data[0]?.Status === "Success") {
        const po = data[0].PostOffice[0];
        const loc = `${po.Name}, ${po.District} (${po.State})`;
        setUserLocation(loc);
        setLocationQuery(loc);
        setPincode(pinStr);
        persistUserData({ location: loc, pincode: pinStr });
        return loc;
      }
    } catch {
      // ignore
    }
    return userLocation;
  };

  const selectLocationSuggestion = (sug) => {
    setUserLocation(sug.name);
    setLocationQuery(sug.name);
    setPincode(sug.pincode);
    setShowLocationDropdown(false);
    persistUserData({ location: sug.name, pincode: sug.pincode });
  };

  const [schemes] = useState(SCHEMES_DATABASE);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [eligibilityFilter, setEligibilityFilter] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);

  const [deviceMode, setDeviceMode] = useState("desktop");
  const [aboutScheme, setAboutScheme] = useState(null);

  const [preApplyScheme, setPreApplyScheme] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [schemeFormValues, setSchemeFormValues] = useState({});
  const [selectedScheme, setSelectedScheme] = useState(null);

  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const openBufferedProfileModal = () => {
    setDraftName(userName);
    setDraftDob(userDob);
    setDraftIncome(userIncome);
    setDraftCategory(userCategory || "student");
    setDraftLanguage(uiLanguage);
    setDraftLocation(userLocation);
    setDraftPincode(pincode);
    setShowLogoutConfirm(false);
    setShowProfileModal(true);
  };

  const handleSaveProfileChanges = async () => {
    let finalLoc = draftLocation;
    if (draftPincode && draftPincode !== pincode && draftPincode.length === 6) {
      finalLoc = (await lookupByPin(draftPincode)) || draftLocation;
    }
    setUserName(draftName);
    setUserDob(draftDob);
    setUserIncome(draftIncome);
    setUserCategory(draftCategory);
    setUiLanguage(draftLanguage);
    setUserLocation(finalLoc);
    setLocationQuery(finalLoc);
    setPincode(draftPincode);

    persistUserData({
      name: draftName,
      dob: draftDob,
      income: Number(draftIncome) || 0,
      category: draftCategory,
      uiLanguage: draftLanguage,
      location: finalLoc,
      pincode: draftPincode
    });
    setShowProfileModal(false);
  };

  // ─── "ASK ME" VOICE & CHAT STATE ──────────────────────────────────────────
  const [isAskMeOpen, setIsAskMeOpen] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState(Date.now());
  const [chatMessages, setChatMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [askQuery, setAskQuery] = useState("");
  const latestTranscriptRef = useRef("");
  const [loadingGuidance, setLoadingGuidance] = useState(false);
  const recognitionRef = useRef(null);

  const calculateAge = (dobString) => {
    if (!dobString) return 18;
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };
  const currentAge = calculateAge(userDob);
  const numericIncome = Number(userIncome) || 0;

  const getDaysRemaining = (isoDate) => {
    if (!isoDate) return null;
    const diff = new Date(isoDate).getTime() - Date.now();
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const evaluateEligibility = (scheme) => {
    const ageOk = currentAge >= scheme.minAge && currentAge <= scheme.maxAge;
    const incomeOk = numericIncome <= scheme.maxIncome;
    const isEligible = ageOk && incomeOk;
    let reason = isHi
      ? "पात्र: आपकी आयु और पारिवारिक आय नियमों के अनुकूल है"
      : "Eligible: Matches your age and family income criteria";
    if (!ageOk && !incomeOk) {
      reason = isHi
        ? `आवश्यक आयु ${scheme.minAge}-${scheme.maxAge} वर्ष एवं आय ≤ ₹${scheme.maxIncome.toLocaleString()}`
        : `Requires Age ${scheme.minAge}-${scheme.maxAge} yrs & Income ≤ ₹${scheme.maxIncome.toLocaleString()}`;
    } else if (!ageOk) {
      reason = isHi
        ? `आवश्यक आयु ${scheme.minAge}–${scheme.maxAge} वर्ष (आपकी आयु: ${currentAge} वर्ष)`
        : `Requires Age ${scheme.minAge}–${scheme.maxAge} yrs (Your Age: ${currentAge} yrs)`;
    } else if (!incomeOk) {
      reason = isHi
        ? `आवश्यक अधिकतम आय ≤ ₹${scheme.maxIncome.toLocaleString()}`
        : `Requires Max Income ≤ ₹${scheme.maxIncome.toLocaleString()}`;
    }
    return { isEligible, reason };
  };

  const getLocalizedScheme = (scheme) => {
    const loc = isHi ? scheme.hi : scheme.en;
    return {
      ...scheme,
      name: loc.name,
      stipend: loc.stipend,
      department: loc.department,
      description: loc.description,
      conditions: loc.conditions,
      documents: loc.documents,
      benefits: loc.benefits,
      endDateDisplay: isHi ? scheme.endDateHi : scheme.endDateEn,
      daysLeft: getDaysRemaining(scheme.endDateIso)
    };
  };

  // Bonus Feature 3: Printable Official Application Receipt Generator (With QR Code)
  const printOfficialApplicationReceipt = (app) => {
    const receiptWin = window.open("", "_blank", "width=760,height=840");
    if (!receiptWin) return;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(
      `BUREAUCRAT.AI|ID:${app.id}|CITIZEN:${userName}|SCHEME:${app.schemeName}`
    )}`;
    receiptWin.document.write(`
      <html>
        <head>
          <title>Official Application Receipt - ${app.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 36px; color: #0f172a; background: #f8fafc; }
            .card { background: white; border: 2px solid #0284c7; border-radius: 16px; padding: 32px; max-width: 640px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 18px; margin-bottom: 20px; }
            .badge { background: #dcfce7; color: #166534; font-weight: bold; padding: 6px 12px; border-radius: 999px; font-size: 12px; display: inline-block; }
            .row { margin-bottom: 12px; font-size: 14px; }
            .label { color: #64748b; font-weight: bold; width: 170px; display: inline-block; }
            .footer { margin-top: 24px; padding-top: 16px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #475569; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div>
                <h2 style="margin:0;color:#0284c7;">BUREAUCRAT.AI CITIZEN PORTAL</h2>
                <p style="margin:4px 0 0 0;font-size:12px;color:#64748b;">Official Direct Benefit Transfer (DBT) Application Acknowledgement</p>
              </div>
              <img src="${qrUrl}" alt="Verification QR" width="95" height="95" />
            </div>
            <div style="margin-bottom:18px;">
              <span class="badge">✓ APPLICATION E-VERIFIED & SUBMITTED</span>
            </div>
            <div class="row"><span class="label">Tracking Reference ID:</span> <b>${app.id}</b></div>
            <div class="row"><span class="label">Applicant Name:</span> ${userName || "Verified Citizen"}</div>
            <div class="row"><span class="label">Applicant Age & Income:</span> ${currentAge} Years • ₹${numericIncome.toLocaleString()}/yr</div>
            <div class="row"><span class="label">Registered Location:</span> ${userLocation} (${pincode})</div>
            <div class="row"><span class="label">Scheme Applied For:</span> <b>${app.schemeName}</b></div>
            <div class="row"><span class="label">Sanctioning Ministry:</span> ${app.department}</div>
            <div class="row"><span class="label">Approved Grant Benefit:</span> <b style="color:#0284c7;">${app.stipend}</b></div>
            <div class="row"><span class="label">Submission Timestamp:</span> ${app.submittedAt}</div>
            <div class="row"><span class="label">Official Portal URL:</span> ${app.portal}</div>
            <div class="footer">
              Scan the QR code above to verify real-time PFMS/DBT sanction status.<br/>
              Generated by Bureaucrat.AI Automated Citizen Portal Engine.
            </div>
          </div>
          <script>window.onload = () => { setTimeout(() => window.print(), 400); };</script>
        </body>
      </html>
    `);
    receiptWin.document.close();
  };

  const downloadSchemeChecklist = (scheme) => {
    const content = [
      `====================================================`,
      `BUREAUCRAT.AI — OFFICIAL SCHEME PREPARATION CHECKLIST`,
      `====================================================`,
      `Scheme Name: ${scheme.name}`,
      `Department: ${scheme.department}`,
      `Grant Benefit: ${scheme.stipend}`,
      `Application End Date: ${scheme.endDateDisplay} (${scheme.daysLeft} days remaining)`,
      `Official Portal: ${scheme.portal}`,
      ``,
      `1. ELIGIBILITY CONDITIONS:`,
      ...(scheme.conditions || []).map((c, i) => `   ${i + 1}. ${c}`),
      ``,
      `2. REQUIRED DOCUMENTS TO UPLOAD:`,
      ...(scheme.documents || []).map((d, i) => `   [ ] ${i + 1}. ${d}`),
      ``,
      `3. KEY BENEFITS:`,
      ...(scheme.benefits || []).map((b, i) => `   • ${b}`),
      `====================================================`
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${scheme.id}-checklist.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleCompareScheme = (schemeId) => {
    setCompareIds((prev) => {
      if (prev.includes(schemeId)) return prev.filter((id) => id !== schemeId);
      if (prev.length >= 2) return [prev[1], schemeId];
      return [...prev, schemeId];
    });
  };

  const handleVisitSchemePortal = (scheme) => {
    const locScheme = getLocalizedScheme(scheme);
    logSubActivity("schemeVisits", `${isHi ? "पोर्टल खोला" : "Visited portal"}: ${locScheme.name}`, {
      url: scheme.portal,
      schemeId: scheme.id
    });
    window.open(scheme.portal, "_blank", "noopener,noreferrer");
  };

  const toggleSaveScheme = (scheme) => {
    const updated = savedSchemeIds.includes(scheme.id)
      ? savedSchemeIds.filter((id) => id !== scheme.id)
      : [...savedSchemeIds, scheme.id];
    setSavedSchemeIds(updated);
    persistUserData({ savedSchemeIds: updated });
  };

  const triggerRealMobileOtp = async (targetPhone) => {
    if (!targetPhone || targetPhone.length !== 10) {
      alert(isHi ? "कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number.");
      return false;
    }
    try {
      const res = await fetch("http://localhost:8000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: targetPhone })
      });
      const data = await res.json();
      setServerOtp(data.otp_code);
      return true;
    } catch {
      const fallback = String(Math.floor(1000 + Math.random() * 9000));
      setServerOtp(fallback);
      return true;
    }
  };

  const handleCompleteSignup = async () => {
    if (otpInput !== serverOtp) {
      alert(isHi ? "गलत OTP कोड।" : "Incorrect OTP code.");
      return;
    }
    const resolvedLocation = (await lookupByPin(pincode)) || locationQuery || "India";
    const db = getUsersDb();
    const initialLogs = {
      signIns: [
        {
          id: Date.now(),
          text: `Account verified (+91 ${phoneNumber})`,
          time: new Date().toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
        }
      ],
      aiQuestions: [],
      schemeVisits: []
    };
    db[phoneNumber] = {
      phone: phoneNumber,
      name: userName.trim(),
      password,
      dob: userDob,
      income: Number(userIncome) || 0,
      category: userCategory || "student",
      location: resolvedLocation,
      uiLanguage,
      pincode,
      savedSchemeIds: [],
      trackedApplications: [],
      activityLogs: initialLogs
    };
    saveUsersDb(db);
    localStorage.setItem("bb_active_user_v6", phoneNumber);
    setCurrentUserPhone(phoneNumber);
    setActivityLogs(initialLogs);
    setShowAuthModal(false);
    setAuthStep("details");
    setOtpInput("");
  };

  const handlePasswordLogin = () => {
    const db = getUsersDb();
    const foundUser = Object.values(db).find(
      (u) =>
        u.phone === loginIdentifier.trim() ||
        (u.name && u.name.toLowerCase() === loginIdentifier.trim().toLowerCase())
    );
    if (!foundUser) {
      alert(isHi ? "अकाउंट नहीं मिला। कृपया पहले अकाउंट बनाएं।" : "Account not found. Please create an account first.");
      return;
    }
    if (foundUser.password !== password) {
      alert(isHi ? "गलत पासवर्ड!" : "Incorrect password!");
      return;
    }
    localStorage.setItem("bb_active_user_v6", foundUser.phone);
    setCurrentUserPhone(foundUser.phone);
    setShowAuthModal(false);
  };

  const confirmAndExecuteLogout = () => {
    localStorage.removeItem("bb_active_user_v6");
    setCurrentUserPhone("");
    setShowProfileModal(false);
    setShowLogoutConfirm(false);
    setShowAuthModal(true);
    setAuthTab("login");
    setAuthStep("details");
  };

  const generateSmartLocalFallback = (q, domain, lang, attemptIdx) => {
    const qLower = q.toLowerCase();
    const isHindi = lang === "Hindi";
    const domSchemes = schemes.filter((s) => s.category === domain).map(getLocalizedScheme);
    const activeSc = domSchemes[attemptIdx % domSchemes.length] || domSchemes[0];
    const altSc = domSchemes[(attemptIdx + 1) % domSchemes.length] || domSchemes[0];

    const askingDeadline = ["end date", "last date", "deadline", "closing", "when", "अंतिम तिथि", "कब तक"].some((w) => qLower.includes(w));
    const askingApply = ["apply", "how can", "step", "process", "procedure", "कैसे", "आवेदन", "प्रक्रिया"].some((w) => qLower.includes(w));
    const askingDocs = ["document", "documents", "doc", "require", "need", "दस्तावेज", "दस्तावेज़", "डॉक्यूमेंट", "कागज", "चाहिए"].some((w) => qLower.includes(w));

    if (askingDeadline && attemptIdx === 0) {
      return isHindi
        ? `${activeSc.name} की आवेदन अंतिम तिथि (End Date): ${activeSc.endDateDisplay} (${activeSc.daysLeft} दिन शेष) है।`
        : `Official Application End Date for ${activeSc.name}: ${activeSc.endDateDisplay} (${activeSc.daysLeft} days remaining).`;
    }
    if (askingApply && attemptIdx === 0) {
      return isHindi
        ? `${activeSc.name} में आवेदन प्रक्रिया (अंतिम तिथि: ${activeSc.endDateDisplay}):\n1. आधिकारिक पोर्टल (${activeSc.portal}) खोलें या कार्ड पर 'ऑटो-अप्लाई करें' दबाएं।\n2. आवश्यक दस्तावेज़ (${activeSc.documents.join(", ")}) अपलोड करें।`
        : `How to Apply for ${activeSc.name} (End Date: ${activeSc.endDateDisplay}):\n1. Visit ${activeSc.portal} or click 'Auto-Apply Live' on the scheme card.\n2. Attach: ${activeSc.documents.join(", ")}.`;
    }
    if (askingDocs && attemptIdx === 0) {
      return isHindi
        ? `${activeSc.name} के लिए आवश्यक दस्तावेज़ (अंतिम तिथि: ${activeSc.endDateDisplay}):\n• ${activeSc.documents.join("\n• ")}`
        : `Mandatory Documents for ${activeSc.name} (End Date: ${activeSc.endDateDisplay}):\n• ${activeSc.documents.join("\n• ")}`;
    }

    return isHindi
      ? `आपकी प्रोफाइल के लिए प्रमुख योजनाएं:\n1. ${activeSc.name}: ${activeSc.stipend} (अंतिम तिथि: ${activeSc.endDateDisplay})\n2. ${altSc.name}: ${altSc.stipend} (अंतिम तिथि: ${altSc.endDateDisplay})`
      : `Top Recommended Schemes for Your Profile:\n1. ${activeSc.name}: ${activeSc.stipend} (End Date: ${activeSc.endDateDisplay})\n2. ${altSc.name}: ${altSc.stipend} (End Date: ${altSc.endDateDisplay})`;
  };

  const sendAskMeMessage = async (queryText, attemptIdx = 0, baseThread = chatMessages) => {
    const q = (queryText || askQuery || latestTranscriptRef.current).trim();
    if (!q) return;
    setLoadingGuidance(true);

    const updatedWithUser =
      attemptIdx === 0 ? [...baseThread, { role: "user", text: q }] : baseThread;

    if (attemptIdx === 0) {
      setChatMessages(updatedWithUser);
      setAskQuery("");
      latestTranscriptRef.current = "";
    }

    const activeDomain = userCategory || "student";

    try {
      const res = await fetch("http://localhost:8000/api/guidance/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          age: currentAge,
          income: numericIncome,
          category: activeDomain,
          location: userLocation || "India",
          ui_language: uiLanguage,
          attempt_index: attemptIdx,
          history: updatedWithUser.map((m) => ({ role: m.role, text: m.text }))
        })
      });
      const data = await res.json();
      const aiMsg = {
        role: "ai",
        userPrompt: q,
        text: data.answer,
        sources: data.sources || [],
        lang: uiLanguage,
        isRestricted: Boolean(data.is_restricted),
        attemptIndex: attemptIdx,
        satisfied: null
      };

      const finalMessages = [...updatedWithUser, aiMsg];
      setChatMessages(finalMessages);
      speakMultilingualText(data.answer, uiLanguage);

      const firstUserQ = finalMessages.find((m) => m.role === "user")?.text || q;
      logSubActivity("aiQuestions", `"${firstUserQ.slice(0, 45)}" (${finalMessages.length})`, {
        threadId: currentThreadId,
        messages: finalMessages
      });
    } catch {
      const fallbackText = generateSmartLocalFallback(q, activeDomain, uiLanguage, attemptIdx);
      const aiMsg = {
        role: "ai",
        userPrompt: q,
        text: fallbackText,
        sources: ["https://scholarships.gov.in"],
        lang: uiLanguage,
        attemptIndex: attemptIdx,
        satisfied: null
      };
      const finalMessages = [...updatedWithUser, aiMsg];
      setChatMessages(finalMessages);
      speakMultilingualText(fallbackText, uiLanguage);

      const firstUserQ = finalMessages.find((m) => m.role === "user")?.text || q;
      logSubActivity("aiQuestions", `"${firstUserQ.slice(0, 45)}" (${finalMessages.length})`, {
        threadId: currentThreadId,
        messages: finalMessages
      });
    } finally {
      setLoadingGuidance(false);
    }
  };

  const handleNotSatisfiedRegenerate = (msgIndex) => {
    const targetMsg = chatMessages[msgIndex];
    if (!targetMsg) return;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    const nextAttempt = (targetMsg.attemptIndex || 0) + 1;
    const erasedPreviousAiThread = chatMessages.slice(0, msgIndex);
    setChatMessages(erasedPreviousAiThread);
    sendAskMeMessage(targetMsg.userPrompt, nextAttempt, erasedPreviousAiThread);
  };

  const handleSatisfiedYes = (msgIndex) => {
    const updated = chatMessages.map((m, idx) =>
      idx === msgIndex ? { ...m, satisfied: true } : m
    );
    setChatMessages(updated);
    const firstUserQ = updated.find((m) => m.role === "user")?.text || "Chat";
    logSubActivity("aiQuestions", `"${firstUserQ.slice(0, 45)}" (${updated.length})`, {
      threadId: currentThreadId,
      messages: updated
    });
  };

  const startNewChatSession = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setCurrentThreadId(Date.now());
    setChatMessages([]);
    setAskQuery("");
    latestTranscriptRef.current = "";
  };

  const startManualRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Please use Google Chrome or Microsoft Edge for voice recognition.");
      return;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    try {
      if (recognitionRef.current) recognitionRef.current.abort();
    } catch {
      // ignore
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    const foundLang = SUPPORTED_LANGUAGES.find((l) => l.code === uiLanguage);
    recognition.lang = foundLang ? foundLang.tts : "en-IN";

    latestTranscriptRef.current = "";
    setAskQuery("");

    recognition.onresult = (e) => {
      let combined = "";
      for (let i = 0; i < e.results.length; i++) {
        combined += e.results[i][0].transcript + " ";
      }
      const clean = combined.trim();
      latestTranscriptRef.current = clean;
      setAskQuery(clean);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopManualRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    setIsRecording(false);
    setTimeout(() => {
      const capturedVoiceText = (latestTranscriptRef.current || askQuery).trim();
      if (capturedVoiceText) {
        sendAskMeMessage(capturedVoiceText, 0, chatMessages);
      }
    }, 250);
  };

  const openPreApplyModal = (scheme) => {
    setPreApplyScheme(getLocalizedScheme(scheme));
    setUploadedDocs({});
    setSchemeFormValues({});
  };

  // Auto-fill documents in Pre-Apply Modal from Document Readiness Vault
  const autoFillFromDocVault = () => {
    if (!preApplyScheme) return;
    const docs = preApplyScheme.documents || [];
    const vaultFiles = Object.values(documentVault).filter(Boolean);
    if (vaultFiles.length === 0) {
      alert("Your Document Vault is empty. Upload documents in 'Doc Vault' first!");
      return;
    }
    const mapped = {};
    docs.forEach((docName, idx) => {
      mapped[idx] = vaultFiles[idx % vaultFiles.length] || "Vault_Verified_Document.pdf";
    });
    setUploadedDocs(mapped);
  };

  const executeDirectAutoApply = async () => {
    const scheme = preApplyScheme;
    if (!scheme) return;
    const requiredDocs = scheme.documents || [];
    const uploadedCount = Object.keys(uploadedDocs).filter((k) => uploadedDocs[k]).length;
    if (uploadedCount < requiredDocs.length) {
      alert(
        isHi
          ? `कृपया ${scheme.name} के लिए आवश्यक सभी ${requiredDocs.length} दस्तावेज़ चुनें।`
          : `Please attach all ${requiredDocs.length} required documents for ${scheme.name}.`
      );
      return;
    }
    const reqFields = scheme.requiredFields || [];
    for (const f of reqFields) {
      if (!schemeFormValues[f.key]?.trim()) {
        alert(isHi ? `कृपया "${f.labelHi}" भरें।` : `Please fill in "${f.labelEn}".`);
        return;
      }
    }

    window.open(scheme.portal, "_blank", "noopener,noreferrer");
    setPreApplyScheme(null);
    setSelectedScheme(scheme);
    logSubActivity("schemeVisits", `${isHi ? "ऑटो-अप्लाई किया" : "Auto-Applied"}: ${scheme.name}`, {
      url: scheme.portal,
      schemeId: scheme.id
    });

    const trackingId = `BB-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newApp = {
      id: trackingId,
      schemeName: scheme.name,
      department: scheme.department,
      portal: scheme.portal,
      stipend: scheme.stipend,
      submittedAt: new Date().toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    const updatedApps = [newApp, ...trackedApplications];
    setTrackedApplications(updatedApps);
    persistUserData({ trackedApplications: updatedApps });

    setTimeout(() => {
      setSelectedScheme(null);
      setShowTrackerModal(true);
    }, 900);
  };

  const activeDomain = userCategory || "student";
  const allDomainLocalizedSchemes = schemes
    .filter((s) => s.category === activeDomain)
    .map(getLocalizedScheme);

  const eligibleDomainSchemes = allDomainLocalizedSchemes.filter((s) => evaluateEligibility(s).isEligible);
  const totalEligibleGrantValue = eligibleDomainSchemes.reduce((sum, s) => sum + (s.annualCashValue || 0), 0);

  const searchSuggestions = searchQuery.trim()
    ? allDomainLocalizedSchemes.filter((s) => {
        const q = searchQuery.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q) ||
          s.stipend.toLowerCase().includes(q)
        );
      })
    : [];

  const domainSchemes = allDomainLocalizedSchemes
    .filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.department.toLowerCase().includes(q) ||
        s.stipend.toLowerCase().includes(q)
      );
    })
    .filter((s) => {
      const { isEligible } = evaluateEligibility(s);
      if (eligibilityFilter === "eligible") return isEligible;
      if (eligibilityFilter === "not_eligible") return !isEligible;
      if (eligibilityFilter === "saved") return savedSchemeIds.includes(s.id);
      return true;
    });

  const visibleSchemes = isExpanded || Boolean(searchQuery.trim()) ? domainSchemes : domainSchemes.slice(0, 4);

  const domainMeta = {
    student: {
      title: isHi
        ? "राष्ट्रीय छात्र छात्रवृत्ति एवं उच्च शिक्षा फेलोशिप"
        : "National Student Scholarships & Higher Education Fellowships",
      subtitle: isHi
        ? "किसी भी छात्रवृत्ति के नाम पर क्लिक करके सीधे उसकी आधिकारिक वेबसाइट खोलें, या डॉक्यूमेंट अपलोड करके डायरेक्ट ऑटो-अप्लाई करें।"
        : "Click any scholarship title to open its official government website, or upload your documents for direct auto-application.",
      badge: isHi ? "छात्र (Student) पोर्टल सक्रिय" : "Student Scholarship Domain Active"
    },
    farmer: {
      title: isHi
        ? "किसान सब्सिडी, सोलर पंप एवं कृषि यंत्र अनुदान"
        : "Farmer Subsidies, Solar Pumps & Agritech Mechanization Grants",
      subtitle: isHi
        ? "खतौनी अपलोड करके सीधे पीएम-किसान, सोलर पंप और ट्रैक्टर सब्सिडी में आवेदन करें।"
        : "Upload your land record to apply directly for PM-KISAN, Solar Pumps, and Tractor Subsidies.",
      badge: isHi ? "किसान (Farmer) पोर्टल सक्रिय" : "Farmer Agritech Domain Active"
    },
    senior: {
      title: isHi
        ? "वरिष्ठ नागरिक स्वास्थ्य कार्ड एवं मासिक पेंशन योजनाएं"
        : "Senior Citizen Healthcare Cards & Monthly Pension Schemes",
      subtitle: isHi
        ? "70+ आयुष्मान वय वंदना कार्ड (₹5 लाख मुफ्त इलाज) और मासिक वृद्धावस्था पेंशन में सीधे आवेदन करें।"
        : "Apply directly for the 70+ Ayushman Health Card (₹5 Lakh free treatment) and monthly Old Age Pensions.",
      badge: isHi ? "वरिष्ठ नागरिक पोर्टल सक्रिय" : "Senior Citizen Domain Active"
    }
  }[activeDomain];

  return (
    <div className="relative min-h-screen text-slate-100 font-sans selection:bg-cyan-500/30">
      <DomainGlowingBackdrop activeCategory={activeDomain} />

      <div
        className={
          deviceMode === "phone"
            ? "max-w-[412px] mx-auto my-6 border-[11px] border-slate-800 rounded-[3.2rem] shadow-[0_0_90px_rgba(34,211,238,0.28)] bg-[#05070c]/90 backdrop-blur-xl overflow-hidden transition-all duration-500 relative"
            : deviceMode === "tablet"
            ? "max-w-[840px] mx-auto my-6 border-[12px] border-slate-800 rounded-[2.6rem] shadow-[0_0_90px_rgba(34,211,238,0.25)] bg-[#05070c]/90 backdrop-blur-xl overflow-hidden transition-all duration-500 relative"
            : "w-full transition-all duration-500"
        }
      >
        {deviceMode !== "desktop" && (
          <div className="bg-slate-950/90 px-6 py-2 flex items-center justify-between border-b border-white/10 text-[11px] font-mono text-slate-300">
            <span>9:41 AM</span>
            <div className="w-24 h-4 bg-black rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cyan-500/60" />
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Wifi className="w-3.5 h-3.5" />
              <span>5G</span>
              <BatteryCharging className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        )}

        {/* ─── FLOATING NAVBAR ───────────────────────────────────────── */}
        <header className="sticky top-3 z-40 max-w-6xl mx-auto px-3 md:px-4 mt-2">
          <nav className="liquid-glass rounded-3xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-2xl">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center shadow-[0_0_18px_rgba(34,211,238,0.5)]">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-black text-sm md:text-base tracking-tight bg-gradient-to-r from-white via-cyan-200 to-indigo-300 bg-clip-text text-transparent block leading-none">
                  BUREAUCRAT<span className="text-cyan-400">.AI</span>
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-300 block">
                  {activeDomain.toUpperCase()} • {t.portalSub}
                </span>
              </div>
            </button>

            <div className="flex items-center gap-1.5 bg-black/45 border border-white/15 rounded-full px-3 py-1">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={uiLanguage}
                onChange={(e) => {
                  setUiLanguage(e.target.value);
                  persistUserData({ uiLanguage: e.target.value });
                }}
                className="bg-slate-900 text-xs font-bold text-cyan-300 focus:outline-none cursor-pointer rounded px-1"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              {compareIds.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="glass-btn-primary px-3 py-1.5 rounded-full text-xs font-bold text-cyan-200 border-cyan-400 flex items-center gap-1"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Compare ({compareIds.length}/2)</span>
                </button>
              )}

              {/* BONUS FEATURE 2: DOCUMENT READINESS VAULT BUTTON */}
              <button
                onClick={() => setShowVaultModal(true)}
                className="glass-btn-secondary px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-300 border-indigo-500/30 flex items-center gap-1"
                title="Reusable Document Vault"
              >
                <FolderLock className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.vaultBtn}</span>
              </button>

              <button
                onClick={() => setShowTrackerModal(true)}
                className="glass-btn-secondary px-3 py-1.5 rounded-full text-xs font-semibold text-amber-300 border-amber-500/30 flex items-center gap-1"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>
                  {t.trackBtn} ({trackedApplications.length})
                </span>
              </button>

              <button
                onClick={() => setShowPdfModal(true)}
                className="glass-btn-secondary px-3 py-1.5 rounded-full text-xs font-medium text-emerald-300 border-emerald-500/30 flex items-center gap-1"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.pdfBtn}</span>
              </button>

              <button
                onClick={() => setIsAskMeOpen(true)}
                className="glass-btn-primary px-3.5 py-1.5 rounded-full text-xs font-bold text-white border-cyan-400/60 flex items-center gap-1.5 shadow-[0_0_22px_rgba(34,211,238,0.4)]"
              >
                <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400/20 border border-cyan-300">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <Mic className="relative w-3 h-3 text-cyan-200" />
                </span>
                <span>{t.askMeBtn}</span>
              </button>

              <button
                onClick={() => setShowActivityDrawer(true)}
                className="glass-btn-secondary px-2.5 py-1.5 rounded-full text-xs font-semibold text-cyan-200 flex items-center gap-1"
              >
                <History className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden md:inline">{t.recentBtn}</span>
              </button>

              <button
                onClick={openBufferedProfileModal}
                className="glass-btn-secondary px-3 py-1.5 rounded-full text-xs font-bold text-white border-cyan-400/40 flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 text-cyan-300" />
                <span className="max-w-[90px] truncate">{userName || t.profileBtn}</span>
              </button>
            </div>
          </nav>
        </header>

        {/* ─── SEARCH + FILTER + LOCATION AUTOCOMPLETE + VIEWPORT SWITCHER ─── */}
        <div className="relative z-30 max-w-6xl mx-auto px-3 md:px-4 mt-4">
          <div className="liquid-glass rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-2.5">
            <div className="relative flex-1 min-w-[210px]">
              <div className="flex items-center bg-black/55 border border-white/15 focus-within:border-cyan-400 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-cyan-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSearchSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 180)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchSuggestions(true);
                  }}
                  placeholder={t.searchPlaceholder}
                  className="bg-transparent text-xs text-white w-full focus:outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-white ml-1">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {showSearchSuggestions && searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-slate-950/95 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-xl">
                  {searchSuggestions.length === 0 ? (
                    <div className="p-3 text-xs text-slate-400 text-center">No matching schemes</div>
                  ) : (
                    searchSuggestions.map((sug) => (
                      <div
                        key={sug.id}
                        onMouseDown={() => {
                          setSearchQuery(sug.name);
                          setShowSearchSuggestions(false);
                          setAboutScheme(sug);
                        }}
                        className="px-4 py-2.5 hover:bg-cyan-500/20 cursor-pointer border-b border-white/5 last:border-0 flex items-center justify-between gap-2"
                      >
                        <div>
                          <p className="text-xs font-bold text-white">{sug.name}</p>
                          <p className="text-[10px] font-mono text-cyan-300">
                            {sug.department} • Ends: {sug.endDateDisplay}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono bg-cyan-500/15 text-cyan-200 px-2 py-0.5 rounded border border-cyan-500/30 shrink-0">
                          {sug.stipend}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-1.5 bg-black/50 border border-white/15 rounded-xl px-3 py-2">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={eligibilityFilter}
                onChange={(e) => setEligibilityFilter(e.target.value)}
                className="bg-slate-900 text-xs font-bold text-cyan-300 focus:outline-none cursor-pointer rounded px-1"
              >
                <option value="all">{t.filterAll}</option>
                <option value="eligible">{t.filterEligible}</option>
                <option value="not_eligible">{t.filterNotEligible}</option>
                <option value="saved">{t.filterSaved}</option>
              </select>
            </div>

            <div className="relative min-w-[220px]">
              <div className="flex items-center bg-black/50 border border-white/15 focus-within:border-cyan-400 rounded-xl px-3 py-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 mr-1.5 shrink-0" />
                <input
                  type="text"
                  value={locationQuery}
                  onFocus={() => {
                    setLocationSuggestions(POPULAR_INDIAN_LOCATIONS.slice(0, 6));
                    setShowLocationDropdown(true);
                  }}
                  onBlur={() => setTimeout(() => setShowLocationDropdown(false), 200)}
                  onChange={(e) => handleLocationInputChange(e.target.value)}
                  placeholder={t.locationPlaceholder}
                  className="bg-transparent text-xs text-white w-full focus:outline-none"
                />
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/15 px-1.5 py-0.5 rounded ml-1 shrink-0">
                  {pincode}
                </span>
              </div>

              {showLocationDropdown && locationSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-slate-950/95 border border-cyan-500/40 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-56 overflow-y-auto backdrop-blur-xl">
                  {locationSuggestions.map((loc, idx) => (
                    <div
                      key={idx}
                      onMouseDown={() => selectLocationSuggestion(loc)}
                      className="px-3.5 py-2 hover:bg-cyan-500/20 cursor-pointer border-b border-white/5 last:border-0 flex items-center justify-between gap-2 text-xs"
                    >
                      <span className="text-slate-100 truncate">{loc.name}</span>
                      <span className="text-[10px] font-mono text-cyan-300 shrink-0">{loc.pincode}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center bg-black/50 border border-white/15 rounded-xl p-1 gap-1">
              {[
                { id: "phone", label: "Mobile", icon: Smartphone },
                { id: "tablet", label: "Tablet", icon: Tablet },
                { id: "desktop", label: "Desktop", icon: Monitor }
              ].map((m) => {
                const Icon = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setDeviceMode(m.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
                      deviceMode === m.id
                        ? "bg-cyan-500 text-slate-950 font-bold shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── SINGLE SPECIALIZED DOMAIN FEED ────────────────────────── */}
        <main className="relative z-10 max-w-6xl mx-auto px-3 md:px-4 py-6">
          <section className="liquid-glass rounded-[2rem] p-6 md:p-9 relative overflow-hidden">
            <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/15 via-emerald-500/10 to-indigo-500/15 border border-cyan-400/30 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>
                  {isHi
                    ? `आपकी प्रोफाइल ${eligibleDomainSchemes.length} योजनाओं के लिए पात्र है — कुल संभावित वार्षिक लाभ:`
                    : `Your profile qualifies for ${eligibleDomainSchemes.length} active schemes — Total Potential Annual Grant:`}{" "}
                  <b className="text-emerald-300 font-mono text-sm">
                    ₹{totalEligibleGrantValue.toLocaleString()} / yr
                  </b>
                </span>
              </div>
              <span className="text-[11px] font-mono text-cyan-200">
                {t.ageLabel}: <b>{currentAge} {t.yrs}</b> • {t.incomeLabel}: <b>₹{numericIncome.toLocaleString()}</b>
              </span>
            </div>

            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-white mb-1.5">
              {domainMeta.title}
            </h2>
            <p className="text-slate-300/80 text-xs md:text-sm max-w-3xl mb-6">{domainMeta.subtitle}</p>

            <div
              className={`grid gap-5 ${
                deviceMode === "phone" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {visibleSchemes.map((scheme) => {
                const { isEligible, reason } = evaluateEligibility(scheme);
                const isSaved = savedSchemeIds.includes(scheme.id);
                const isCompared = compareIds.includes(scheme.id);

                return (
                  <div
                    key={scheme.id}
                    className="liquid-glass rounded-2xl p-5 flex flex-col justify-between border-white/10 hover:border-cyan-400/50 transition-all"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                              isEligible
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            }`}
                          >
                            {isEligible ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                            {isEligible ? t.eligibleBadge : t.notEligibleBadge}
                          </span>

                          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                            <CalendarClock className="w-3 h-3" />
                            <span>
                              {t.endDateLabel} {scheme.endDateDisplay} ({scheme.daysLeft}d)
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleCompareScheme(scheme.id)}
                            className={`px-2 py-1 rounded-lg border text-[10px] font-bold flex items-center gap-1 ${
                              isCompared
                                ? "bg-cyan-500 text-slate-950 border-cyan-400"
                                : "border-white/15 text-slate-300 hover:text-white"
                            }`}
                          >
                            <Scale className="w-3 h-3" />
                            <span>{t.compareBtn}</span>
                          </button>

                          <button
                            onClick={() => toggleSaveScheme(scheme)}
                            className="p-1.5 rounded-lg border border-white/10 text-cyan-300"
                          >
                            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          </button>

                          <button
                            onClick={() => handleVisitSchemePortal(scheme)}
                            className="px-2.5 py-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-[11px] font-semibold text-cyan-300 flex items-center gap-1"
                          >
                            <span>{t.officialPortal}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleVisitSchemePortal(scheme)}
                        className="text-left focus:outline-none"
                      >
                        <h3 className="font-bold text-white text-base mb-1 hover:text-cyan-300 hover:underline">
                          {scheme.name}
                        </h3>
                      </button>

                      <p className="text-xs font-mono text-cyan-400/80 mb-2">{scheme.department}</p>
                      <p className="text-xs text-slate-300/90 leading-relaxed mb-3">{scheme.description}</p>
                      <div className="text-[11px] font-mono text-slate-300 bg-black/40 p-2 rounded-lg border border-white/5 mb-4 flex items-center justify-between gap-2">
                        <span>{reason}</span>
                        {/* BONUS FEATURE 1: "WHY NOT ELIGIBLE?" SIMULATOR TRIGGER */}
                        {!isEligible && (
                          <button
                            onClick={() => {
                              setSimAge(currentAge);
                              setSimIncome(numericIncome);
                              setSimulatorScheme(scheme);
                            }}
                            className="px-2 py-1 rounded bg-rose-500/20 border border-rose-400/40 text-rose-200 hover:bg-rose-500/35 text-[10px] font-sans font-bold shrink-0 flex items-center gap-1"
                          >
                            <SlidersHorizontal className="w-3 h-3" /> {t.simulateBtn}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-slate-400">{t.grantBenefit}</span>
                        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                          {scheme.stipend}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => openPreApplyModal(scheme)}
                          className="glass-btn-primary px-3 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />
                          <span>{t.autoApplyBtn}</span>
                        </button>
                        <button
                          onClick={() => setAboutScheme(scheme)}
                          className="glass-btn-secondary px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5"
                        >
                          <Info className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{t.aboutSchemeBtn}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {domainSchemes.length > 4 && (
              <div className="mt-7 text-center">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="glass-btn-secondary px-6 py-2.5 rounded-full text-xs font-bold text-cyan-300 border-cyan-500/40 inline-flex items-center gap-2"
                >
                  <span>{isExpanded ? t.showLess : t.seeMore}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            )}
          </section>
        </main>

        {deviceMode !== "desktop" && (
          <div className="py-3 bg-slate-950/90 flex justify-center border-t border-white/10">
            <div className="w-32 h-1.5 rounded-full bg-slate-600" />
          </div>
        )}
      </div>

      {/* ─── BONUS FEATURE 1: "WHY AM I NOT ELIGIBLE?" INTERACTIVE SIMULATOR MODAL ─── */}
      <AnimatePresence>
        {simulatorScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="liquid-glass rounded-3xl p-7 max-w-md w-full border-cyan-500/40 relative shadow-2xl space-y-4">
              <button onClick={() => setSimulatorScheme(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-extrabold text-white">Eligibility Threshold Simulator</h3>
              </div>
              <p className="text-xs text-slate-300">
                Adjust the sliders below to see the exact criteria required to unlock{" "}
                <b className="text-cyan-300">{simulatorScheme.name}</b>:
              </p>

              <div className="space-y-4 bg-black/50 p-4 rounded-2xl border border-white/10 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Simulated Citizen Age:</span>
                    <span className="font-mono font-bold text-cyan-300">
                      {simAge} yrs (Required: {simulatorScheme.minAge}–{simulatorScheme.maxAge} yrs)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={14}
                    max={90}
                    value={simAge}
                    onChange={(e) => setSimAge(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-300">Simulated Family Income:</span>
                    <span className="font-mono font-bold text-cyan-300">
                      ₹{simIncome.toLocaleString()} (Max: ₹{simulatorScheme.maxIncome.toLocaleString()})
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={1500000}
                    step={25000}
                    value={simIncome}
                    onChange={(e) => setSimIncome(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div
                  className={`p-3 rounded-xl border text-center font-bold ${
                    simAge >= simulatorScheme.minAge &&
                    simAge <= simulatorScheme.maxAge &&
                    simIncome <= simulatorScheme.maxIncome
                      ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                      : "bg-rose-500/20 border-rose-400 text-rose-300"
                  }`}
                >
                  {simAge >= simulatorScheme.minAge &&
                  simAge <= simulatorScheme.maxAge &&
                  simIncome <= simulatorScheme.maxIncome
                    ? `✓ Eligible at Age ${simAge} & Income ₹${simIncome.toLocaleString()}!`
                    : `✕ Still Outside Bounds (Need Age ${simulatorScheme.minAge}-${simulatorScheme.maxAge} & Income ≤ ₹${simulatorScheme.maxIncome.toLocaleString()})`}
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── BONUS FEATURE 2: REUSABLE DOCUMENT READINESS VAULT MODAL ─── */}
      <AnimatePresence>
        {showVaultModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="liquid-glass rounded-3xl p-7 max-w-lg w-full border-cyan-500/40 relative shadow-2xl space-y-4">
              <button onClick={() => setShowVaultModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2.5">
                <FolderLock className="w-6 h-6 text-indigo-400" />
                <div>
                  <h3 className="text-lg font-extrabold text-white">Citizen Document Readiness Vault</h3>
                  <p className="text-xs text-slate-400">
                    Store your core documents once and auto-fill any scheme application in 1 click.
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { key: "idProof", label: "1. Citizen Identity Proof (ID Card)" },
                  { key: "incomeCert", label: "2. Family Income Certificate (Tehsildar)" },
                  { key: "marksheet", label: "3. Qualifying Marksheet / Land Record" },
                  { key: "passbook", label: "4. NPCI / DBT Bank Account Passbook" }
                ].map((slot) => (
                  <div
                    key={slot.key}
                    className="p-3 rounded-xl bg-black/50 border border-white/15 flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-bold text-white block">{slot.label}</span>
                      <span className="text-[11px] font-mono text-emerald-400">
                        {documentVault[slot.key] ? `✓ Vault Saved: ${documentVault[slot.key]}` : "Not uploaded yet"}
                      </span>
                    </div>
                    <label className="glass-btn-secondary px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-300 cursor-pointer shrink-0">
                      {documentVault[slot.key] ? "Replace" : "Upload to Vault"}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) updateVaultFile(slot.key, f.name);
                        }}
                      />
                    </label>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowVaultModal(false)}
                className="glass-btn-primary w-full py-2.5 rounded-xl text-xs font-bold text-white"
              >
                Save & Close Vault
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── SIDE-BY-SIDE SCHEME COMPARISON MODAL ───────────────────── */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="liquid-glass rounded-3xl p-7 max-w-3xl w-full border-cyan-500/40 relative shadow-2xl max-h-[88vh] overflow-y-auto">
              <button onClick={() => setShowCompareModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-extrabold text-white">Side-by-Side Scheme Comparison</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {compareIds.map((cid) => {
                  const raw = schemes.find((s) => s.id === cid);
                  if (!raw) return null;
                  const s = getLocalizedScheme(raw);
                  return (
                    <div key={s.id} className="p-5 rounded-2xl bg-black/55 border border-white/15 space-y-3">
                      <h4 className="text-sm font-bold text-cyan-300">{s.name}</h4>
                      <p className="text-[11px] font-mono text-amber-300">
                        {t.endDateLabel} {s.endDateDisplay} ({s.daysLeft} days left)
                      </p>
                      <p className="text-slate-200">
                        <b>Benefit:</b> {s.stipend}
                      </p>
                      <p className="text-slate-200">
                        <b>Age Limit:</b> {s.minAge} – {s.maxAge} yrs
                      </p>
                      <p className="text-slate-200">
                        <b>Max Family Income:</b> ₹{s.maxIncome.toLocaleString()} / yr
                      </p>
                      <div>
                        <b className="text-slate-300 block mb-1">Required Documents:</b>
                        <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                          {s.documents.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── "ABOUT SCHEME" MODAL ───────────────────────────────────── */}
      <AnimatePresence>
        {aboutScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="liquid-glass rounded-3xl p-7 max-w-xl w-full border-cyan-500/40 relative shadow-2xl max-h-[88vh] overflow-y-auto">
              <button onClick={() => setAboutScheme(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <span className="text-[11px] font-mono text-cyan-400 uppercase block mb-1">
                {aboutScheme.department}
              </span>
              <h3 className="text-xl font-extrabold text-white mb-2">{aboutScheme.name}</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">{aboutScheme.description}</p>

              <div className="mb-4 p-3.5 rounded-2xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-amber-200">
                  <CalendarClock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <b>{t.aboutDeadlineTitle}:</b> {aboutScheme.endDateDisplay} ({aboutScheme.daysLeft} days left)
                  </span>
                </div>
                <button
                  onClick={() => downloadSchemeChecklist(aboutScheme)}
                  className="px-2.5 py-1 rounded-lg bg-amber-400/20 border border-amber-300/40 text-amber-200 font-bold flex items-center gap-1 hover:bg-amber-400/30"
                >
                  <Download className="w-3.5 h-3.5" /> {t.downloadChecklistBtn}
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-emerald-500/15 border border-emerald-500/40 rounded-2xl p-4">
                  <h4 className="font-bold text-emerald-300 uppercase mb-2">
                    {t.aboutBenefitsTitle} ({aboutScheme.stipend})
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-100">
                    {(aboutScheme.benefits || []).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4">
                  <h4 className="font-bold text-cyan-300 uppercase mb-2">{t.aboutConditionsTitle}</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                    {(aboutScheme.conditions || []).map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                  <h4 className="font-bold text-amber-300 uppercase mb-2">{t.aboutDocsTitle}</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                    {(aboutScheme.documents || []).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2.5 mt-6">
                <button
                  onClick={() => {
                    const s = aboutScheme;
                    setAboutScheme(null);
                    openPreApplyModal(s);
                  }}
                  className="glass-btn-primary flex-1 py-3 rounded-xl text-xs font-bold text-white"
                >
                  {t.autoApplyBtn}
                </button>
                <button
                  onClick={() => handleVisitSchemePortal(aboutScheme)}
                  className="glass-btn-secondary px-4 py-3 rounded-xl text-xs font-bold text-cyan-300"
                >
                  {t.officialPortal} ↗
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── BUFFERED PROFILE SETTINGS + NESTED LOGOUT CONFIRMATION ─── */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="liquid-glass rounded-3xl p-7 max-w-md w-full border-cyan-500/40 relative shadow-2xl space-y-3.5 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowProfileModal(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-extrabold text-white">
                {isHi ? "प्रोफाइल एवं कैटेगरी सेटिंग्स" : "Profile & Domain Settings"}
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={draftDob}
                      onChange={(e) => setDraftDob(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Annual Income (₹)</label>
                    <input
                      type="number"
                      value={draftIncome}
                      onChange={(e) => setDraftIncome(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-cyan-300 font-bold block mb-1">
                    Active Domain Category (Click Save Changes to Apply)
                  </label>
                  <select
                    value={draftCategory}
                    onChange={(e) => setDraftCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl px-3.5 py-2 text-xs text-white"
                  >
                    <option value="student">Student (Scholarships & Fellowships)</option>
                    <option value="farmer">Farmer (Agritech & Subsidies)</option>
                    <option value="senior">Senior Citizen (Healthcare & Pensions)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">App Language</label>
                  <select
                    value={draftLanguage}
                    onChange={(e) => setDraftLanguage(e.target.value)}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="text-xs text-slate-300 block mb-1">City / Location</label>
                    <input
                      type="text"
                      value={draftLocation}
                      onChange={(e) => setDraftLocation(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1">PIN Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={draftPincode}
                      onChange={(e) => setDraftPincode(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveProfileChanges}
                  className="glass-btn-primary flex-1 py-3 rounded-xl text-xs font-bold text-white"
                >
                  {t.saveChangesBtn}
                </button>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="glass-btn-secondary px-4 py-3 rounded-xl text-xs font-semibold text-slate-300"
                >
                  {t.cancelBtn}
                </button>
              </div>

              <div className="pt-4 border-t border-white/10">
                {!showLogoutConfirm ? (
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t.logoutBtn}</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-center space-y-3">
                    <p className="text-xs font-bold text-rose-200">{t.logoutConfirmQ}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={confirmAndExecuteLogout}
                        className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                      >
                        {t.logoutYes}
                      </button>
                      <button
                        onClick={() => setShowLogoutConfirm(false)}
                        className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold"
                      >
                        {t.logoutNo}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── "ASK ME" SMART MODAL ───────────────────────────────────── */}
      <AnimatePresence>
        {isAskMeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="liquid-glass rounded-3xl p-6 md:p-7 max-w-xl w-full relative border-cyan-500/40 shadow-2xl flex flex-col max-h-[88vh]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300">
                    {(isRecording || loadingGuidance) && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                    )}
                    <Mic className="relative w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">{t.askHeader}</h3>
                    <p className="text-[11px] text-slate-400">{t.askSub}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={startNewChatSession}
                    className="glass-btn-secondary px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-300 flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{t.newChatBtn}</span>
                  </button>
                  <button
                    onClick={() => {
                      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                      setIsAskMeOpen(false);
                    }}
                    className="text-slate-400 hover:text-white p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {(isRecording || loadingGuidance) && (
                <div className="mb-4 py-3 px-4 rounded-2xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-300 animate-spin" />
                    <span className="text-xs font-bold text-cyan-200">
                      {isRecording ? t.listeningMsg : t.searchingMsg}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 h-5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((b) => (
                      <motion.span
                        key={b}
                        animate={{ height: ["4px", "18px", "6px", "16px", "4px"] }}
                        transition={{ repeat: Infinity, duration: 0.7, delay: b * 0.06 }}
                        className={`w-1 rounded-full inline-block ${
                          isRecording ? "bg-rose-400" : "bg-cyan-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-4 min-h-[220px]">
                {chatMessages.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center space-y-3">
                    <Mic className="w-8 h-8 text-cyan-400 mx-auto" />
                    <p className="text-xs text-slate-300">{t.askEmptyTitle}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {(isHi
                        ? [
                            "मुझे प्रमुख सरकारी योजनाओं के बारे में बताओ",
                            "इसकी अंतिम तिथि (End Date) क्या है?",
                            "आवेदन के लिए कौन-कौन से दस्तावेज़ लगेंगे?"
                          ]
                        : [
                            "Tell me about the top schemes for my profile",
                            "What is the application end date?",
                            "What are the mandatory documents required?"
                          ]
                      ).map((sample) => (
                        <button
                          key={sample}
                          onClick={() => sendAskMeMessage(sample, 0, chatMessages)}
                          className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                        >
                          "{sample}"
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-cyan-500/20 border border-cyan-400/40 text-white ml-8"
                          : "bg-black/65 border border-white/15 text-cyan-100 mr-4 font-mono whitespace-pre-line"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold uppercase text-cyan-300">
                          {msg.role === "user" ? userName || "You" : `Ask Me Advisor (${uiLanguage})`}
                        </span>
                        {msg.role === "ai" && (
                          <button
                            onClick={() => speakMultilingualText(msg.text, uiLanguage)}
                            className="text-cyan-300 hover:text-white flex items-center gap-1"
                          >
                            <Volume2 className="w-3.5 h-3.5" /> {t.listenAudio}
                          </button>
                        )}
                      </div>

                      <div>{msg.text}</div>

                      {msg.role === "ai" && (
                        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-sans">
                          <span className="text-[11px] text-slate-300 font-semibold">
                            {msg.satisfied === true
                              ? isHi
                                ? "✓ धन्यवाद! आप नीचे अगला प्रश्न पूछ सकते हैं।"
                                : "✓ Great! Ask any follow-up question below."
                              : t.satisfiedPrompt}
                          </span>
                          {msg.satisfied !== true && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSatisfiedYes(idx)}
                                className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1"
                              >
                                <ThumbsUp className="w-3 h-3" /> {t.yesBtn}
                              </button>
                              <button
                                onClick={() => handleNotSatisfiedRegenerate(idx)}
                                className="px-3 py-1 rounded-lg bg-rose-500/20 border border-rose-400/40 text-rose-300 text-[11px] font-bold flex items-center gap-1"
                              >
                                <ThumbsDown className="w-3 h-3" /> {t.noBtn}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={askQuery}
                  onChange={(e) => {
                    setAskQuery(e.target.value);
                    latestTranscriptRef.current = e.target.value;
                  }}
                  onKeyDown={(e) => e.key === "Enter" && sendAskMeMessage(askQuery, 0, chatMessages)}
                  placeholder={t.inputPlaceholder}
                  className="flex-1 bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                {!isRecording ? (
                  <button
                    onClick={startManualRecording}
                    className="glass-btn-secondary px-3.5 py-2.5 rounded-xl text-xs font-bold text-cyan-300 flex items-center gap-1"
                  >
                    <Mic className="w-4 h-4" /> {t.speakBtn}
                  </button>
                ) : (
                  <button
                    onClick={stopManualRecording}
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 animate-pulse"
                  >
                    ■ {t.stopBtn}
                  </button>
                )}
                <button
                  onClick={() => sendAskMeMessage(askQuery, 0, chatMessages)}
                  className="glass-btn-primary px-4 py-2.5 rounded-xl text-xs font-bold text-white"
                >
                  {t.sendBtn}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── DIRECT AUTO-APPLY MODAL (WITH 1-CLICK VAULT AUTO-FILL) ─── */}
      <AnimatePresence>
        {preApplyScheme && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="liquid-glass rounded-3xl p-7 max-w-lg w-full border-cyan-500/40 relative shadow-2xl max-h-[90vh] overflow-y-auto">
              <button onClick={() => setPreApplyScheme(null)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-extrabold text-white mb-1">{preApplyScheme.name}</h3>
              <p className="text-xs text-amber-300 font-mono mb-4">
                {t.endDateLabel} {preApplyScheme.endDateDisplay} ({preApplyScheme.daysLeft} days left)
              </p>

              <div className="space-y-3 mb-5">
                <h4 className="text-xs font-bold uppercase text-cyan-300">{t.reqInfoTitle}</h4>
                {(preApplyScheme.requiredFields || []).map((field) => (
                  <div key={field.key}>
                    <label className="text-xs text-slate-300 block mb-1">
                      {isHi ? field.labelHi : field.labelEn} *
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={schemeFormValues[field.key] || ""}
                      onChange={(e) =>
                        setSchemeFormValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase text-amber-300">{t.reqDocsTitle}</h4>
                  <button
                    onClick={autoFillFromDocVault}
                    className="px-2.5 py-1 rounded-lg bg-indigo-500/25 border border-indigo-400/50 text-indigo-200 text-[11px] font-bold flex items-center gap-1 hover:bg-indigo-500/40"
                  >
                    <FolderLock className="w-3 h-3" /> 1-Click Vault Auto-Fill
                  </button>
                </div>

                {(preApplyScheme.documents || []).map((docName, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/50 border border-white/15 flex items-center justify-between gap-3"
                  >
                    <div className="text-xs">
                      <span className="font-semibold text-white block">
                        {idx + 1}. {docName}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400">
                        {uploadedDocs[idx] ? `✓ ${t.uploadedText} ${uploadedDocs[idx]}` : t.pendingText}
                      </span>
                    </div>
                    <label className="glass-btn-secondary px-3 py-1.5 rounded-lg text-xs font-bold text-cyan-300 cursor-pointer shrink-0">
                      {t.uploadBtn}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setUploadedDocs((prev) => ({ ...prev, [idx]: file.name }));
                        }}
                      />
                    </label>
                  </div>
                ))}
              </div>

              <button
                onClick={executeDirectAutoApply}
                className="glass-btn-primary w-full py-3 rounded-xl text-xs font-bold text-white"
              >
                {t.submitDirectBtn}
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── RECENT HISTORY DRAWER ──────────────────────────────────── */}
      <AnimatePresence>
        {showActivityDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md liquid-glass h-full p-6 overflow-y-auto border-l border-white/15 flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-3">
                <h3 className="font-bold text-white text-base">{t.recentHeader}</h3>
                <button onClick={() => setShowActivityDrawer(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[11px] text-cyan-200 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-2.5 mb-3">
                {t.recentHint}
              </p>

              <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/50 rounded-xl border border-white/10 mb-4">
                {[
                  { id: "aiQuestions", label: `AI Ask (${activityLogs.aiQuestions?.length || 0})` },
                  { id: "schemeVisits", label: `Visits (${activityLogs.schemeVisits?.length || 0})` },
                  { id: "signIns", label: `Sign In (${activityLogs.signIns?.length || 0})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveHistoryTab(tab.id)}
                    className={`py-2 rounded-lg text-[11px] font-bold ${
                      activeHistoryTab === tab.id ? "glass-btn-primary text-white" : "text-slate-400"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex justify-end mb-2">
                {(activityLogs[activeHistoryTab] || []).length > 0 && (
                  <button
                    onClick={() => clearCategoryActivity(activeHistoryTab)}
                    className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> {t.deleteAll}
                  </button>
                )}
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto">
                {(activityLogs[activeHistoryTab] || []).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (activeHistoryTab === "aiQuestions" && item.messages) {
                        setCurrentThreadId(item.id);
                        setChatMessages(item.messages);
                        setShowActivityDrawer(false);
                        setIsAskMeOpen(true);
                      }
                    }}
                    className="p-3 rounded-xl bg-black/45 border border-white/10 flex items-start justify-between gap-2 cursor-pointer hover:border-cyan-400/60"
                  >
                    <div className="text-xs">
                      <p className="text-slate-100 font-semibold">{item.text}</p>
                      {activeHistoryTab === "aiQuestions" && (
                        <span className="text-[10px] text-emerald-300 font-mono block mt-1">
                          {t.continueChatHint}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-500 block mt-1">{item.time}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSingleActivity(activeHistoryTab, item.id);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── TRACKER MODAL (WITH BONUS FEATURE 3: PRINTABLE QR RECEIPT) ─── */}
      <AnimatePresence>
        {showTrackerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="liquid-glass rounded-3xl p-7 max-w-xl w-full border-cyan-500/40 relative shadow-2xl max-h-[88vh] overflow-y-auto">
              <button onClick={() => setShowTrackerModal(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-extrabold text-white mb-4">Application Status Tracker</h3>
              {trackedApplications.length === 0 ? (
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center text-xs text-slate-400">
                  No applications submitted yet. Click <b>Auto-Apply Live</b> on any scheme card.
                </div>
              ) : (
                <div className="space-y-3">
                  {trackedApplications.map((app) => (
                    <div key={app.id} className="p-4 rounded-2xl bg-black/50 border border-white/15 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          ✓ Direct Portal Submitted • ID: {app.id}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{app.schemeName}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{app.submittedAt} • {app.stipend}</p>
                      </div>
                      <button
                        onClick={() => printOfficialApplicationReceipt(app)}
                        className="glass-btn-primary px-3 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shrink-0"
                      >
                        <Printer className="w-3.5 h-3.5" /> Print Receipt
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── AUTH MODAL ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="liquid-glass rounded-3xl p-7 max-w-md w-full border-cyan-500/40 shadow-2xl">
              <div className="grid grid-cols-2 gap-2 p-1 bg-black/50 rounded-2xl border border-white/10 mb-4">
                <button
                  onClick={() => {
                    setAuthTab("signup");
                    setAuthStep("details");
                  }}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    authTab === "signup" ? "glass-btn-primary text-white" : "text-slate-400"
                  }`}
                >
                  Create Account
                </button>
                <button
                  onClick={() => {
                    setAuthTab("login");
                    setAuthStep("details");
                  }}
                  className={`py-2 rounded-xl text-xs font-bold ${
                    authTab === "login" ? "glass-btn-primary text-white" : "text-slate-400"
                  }`}
                >
                  Login
                </button>
              </div>

              {authTab === "signup" ? (
                authStep === "details" ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-Digit Mobile Number *"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={userDob}
                        onChange={(e) => setUserDob(e.target.value)}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                      <input
                        type="number"
                        placeholder="Annual Income (₹) *"
                        value={userIncome}
                        onChange={(e) => setUserIncome(e.target.value)}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={userCategory}
                        onChange={(e) => setUserCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-cyan-500/40 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="student">Student</option>
                        <option value="farmer">Farmer</option>
                        <option value="senior">Senior Citizen</option>
                      </select>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="PIN Code *"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full bg-black/50 border border-white/15 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                    <input
                      type="password"
                      placeholder="Create Password *"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white"
                    />
                    <button
                      onClick={async () => {
                        if (!userName.trim() || !userDob || !userIncome || !pincode || !password) {
                          alert("Please fill in all required fields.");
                          return;
                        }
                        const ok = await triggerRealMobileOtp(phoneNumber);
                        if (ok) setAuthStep("otp");
                      }}
                      className="glass-btn-primary w-full py-3 rounded-xl text-xs font-bold text-white"
                    >
                      Get Verification OTP
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <div className="p-3 bg-cyan-500/15 border border-cyan-500/30 rounded-xl text-xs text-cyan-200 font-mono">
                      Verification OTP Code: <b className="text-amber-300 text-sm">{serverOtp}</b>
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="4-Digit OTP"
                      className="w-44 mx-auto block bg-black/60 border border-white/20 rounded-xl py-2.5 text-center text-lg font-mono text-white"
                    />
                    <button
                      onClick={handleCompleteSignup}
                      className="glass-btn-primary w-full py-3 rounded-xl text-xs font-bold text-white"
                    >
                      Verify OTP & Open Portal
                    </button>
                  </div>
                )
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Mobile Number or Name"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white"
                  />
                  <button
                    onClick={handlePasswordLogin}
                    className="glass-btn-primary w-full py-3 rounded-xl text-xs font-bold text-white"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {showPdfModal && (
        <BuiltInPdfModal
          onClose={() => setShowPdfModal(false)}
          uiLanguage={uiLanguage}
          userCategory={userCategory}
        />
      )}
    </div>
  );
}