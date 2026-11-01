export const SCHEMES_DATABASE = [
  // ─── STUDENT SCHEMES ────────────────────────────────────────────────────────
  {
    id: "stu-nsp-1",
    category: "student",
    name: "National Scholarship Portal (NSP) Central Sector Scheme",
    portal: "https://scholarships.gov.in",
    stipend: "₹20,000 to ₹50,000 / yr",
    minAge: 16,
    maxAge: 25,
    maxIncome: 800000,
    department: "Ministry of Education",
    description: "Financial support to meritorious students from low-income families pursuing undergraduate and postgraduate degree courses.",
    conditions: [
      "Must be above 80th percentile of successful candidates in Class 12 board exams.",
      "Pursuing regular degree courses in recognized colleges/institutions.",
      "Gross parental/family annual income must not exceed ₹8,00,000."
    ],
    documents: [
      "Aadhaar Card (linked with mobile number)",
      "Class 12th Marksheet & Admission Bonafide Certificate",
      "Family Income Certificate issued by Tehsildar/SDM",
      "Student Bank Account Passbook (DBT enabled)"
    ],
    benefits: [
      "₹12,000 to ₹20,000 per annum for Graduation level studies.",
      "₹20,000 to ₹50,000 per annum for Post-Graduation / Technical courses.",
      "Direct Benefit Transfer (DBT) straight into student bank account."
    ]
  },
  {
    id: "stu-vidya-2",
    category: "student",
    name: "PM-Vidyalaxmi Higher Education Loan & Interest Subvention",
    portal: "https://pmvidyalaxmi.co.in",
    stipend: "3% Interest Subvention up to ₹10L",
    minAge: 17,
    maxAge: 30,
    maxIncome: 800000,
    department: "Department of Higher Education",
    description: "Collateral-free, guarantor-free education loans with 3% interest subvention for students admitted to top Quality Higher Education Institutions (QHEIs).",
    conditions: [
      "Merit admission into NIRF-ranked Quality Higher Education Institutions (QHEIs).",
      "Annual family income up to ₹8 Lakh for 3% interest subvention (up to ₹4.5L for 100% subvention).",
      "Not availing any other central/state tuition reimbursement."
    ],
    documents: [
      "Aadhaar Card & PAN Card",
      "Official Institutional Admission Offer Letter & Fee Structure",
      "Authorized Family Income Certificate",
      "Previous Academic Marksheets (10th & 12th)"
    ],
    benefits: [
      "Zero collateral and zero third-party guarantor requirement.",
      "75% credit guarantee by the Government of India for loans up to ₹7.5 Lakh.",
      "3% interest subsidy on loans up to ₹10 Lakh during moratorium period."
    ]
  },
  {
    id: "stu-aicte-3",
    category: "student",
    name: "AICTE Saksham & Pragati Technical Degree Scholarship",
    portal: "https://www.aicte-india.org/schemes/students-development-schemes",
    stipend: "₹50,000 / annum + Contingency",
    minAge: 17,
    maxAge: 26,
    maxIncome: 800000,
    department: "All India Council for Technical Education (AICTE)",
    description: "Dedicated grant for students admitted to first year or second year (lateral entry) of AICTE-approved technical degree/diploma institutions.",
    conditions: [
      "Admitted to 1st year or 2nd year (Lateral) in an AICTE-approved institution.",
      "Family annual income from all sources must be less than ₹8,00,000.",
      "Maximum two girls per family (for Pragati) or differently-abled criteria (for Saksham)."
    ],
    documents: [
      "AICTE College Allotment Letter & Fee Receipt",
      "Aadhaar Card & Bank Passbook Copy",
      "Annual Family Income Certificate",
      "10th / 12th / Diploma Marksheet"
    ],
    benefits: [
      "₹50,000 lump sum per year for every year of study.",
      "Covers tuition fees, computer hardware, books, and software purchases.",
      "No separate exam required—selection purely on qualifying merit."
    ]
  },
  {
    id: "stu-inspire-4",
    category: "student",
    name: "DST INSPIRE Scholarship for Higher Education (SHE)",
    portal: "https://online-inspire.gov.in",
    stipend: "₹80,000 / year (₹60k Cash + ₹20k Research)",
    minAge: 17,
    maxAge: 22,
    maxIncome: 1500000,
    department: "Department of Science & Technology (DST)",
    description: "Prestigious fellowship offering ₹80,000 annually to top 1% Class 12 rankers or JEE/NEET top 10,000 rank holders pursuing Basic & Natural Sciences.",
    conditions: [
      "Age must be between 17 and 22 years.",
      "Within top 1% in Class 12 Board OR top 10,000 rank in JEE (Advanced) / NEET.",
      "Enrolled in B.Sc., B.S., or Integrated M.Sc./M.S. in Basic Sciences."
    ],
    documents: [
      "Class 12th Board Top 1% Advisory Note or JEE/NEET Rank Card",
      "College Principal Endorsement Certificate",
      "Aadhaar Card & SBI Bank Account Details",
      "Class 10th Certificate for Date of Birth Proof"
    ],
    benefits: [
      "₹60,000 per year direct scholarship (@ ₹5,000/month).",
      "₹20,000 per year mentorship grant for summer research internships.",
      "Renewable up to 5 years until completion of Masters."
    ]
  },
  {
    id: "stu-yasasvi-5",
    category: "student",
    name: "PM-YASASVI Top Class College Education Scheme",
    portal: "https://scholarships.gov.in",
    stipend: "Up to ₹3,72,000 / yr Full Waiver",
    minAge: 16,
    maxAge: 26,
    maxIncome: 250000,
    department: "Ministry of Social Justice & Empowerment",
    description: "Covers full tuition fee, living expenses, books, and a brand-new laptop for OBC, EBC, and DNT students studying in premiere notified institutions (IITs, NITs, AIIMS, IIMs).",
    conditions: [
      "Belongs to OBC, EBC, or DNT category with valid certificate.",
      "Total annual family income is ₹2,50,000 or less.",
      "Secured admission in a notified premiere institution (IIT, NIT, IIIT, AIIMS, etc.)."
    ],
    documents: [
      "OBC / EBC / DNT Category Certificate",
      "Income Certificate (below ₹2.5 LPA)",
      "Institute Admission Proof & Tuition Fee Demand Letter",
      "Aadhaar-linked Bank Account Passbook"
    ],
    benefits: [
      "Full tuition fee and non-refundable charges up to ₹2.00 Lakh/yr.",
      "Living expenses @ ₹3,000/month (₹36,000/yr) + Books @ ₹5,000/yr.",
      "₹45,000 one-time grant for purchasing a new computer/laptop."
    ]
  },
  {
    id: "stu-ishan-6",
    category: "student",
    name: "UGC Post-Matric & National Fellowship for Higher Studies",
    portal: "https://fellowship.ugc.ac.in",
    stipend: "₹37,000 / month + HRA",
    minAge: 18,
    maxAge: 30,
    maxIncome: 600000,
    department: "University Grants Commission (UGC)",
    description: "Monthly academic stipend and contingency allowance for undergraduate and postgraduate scholars pursuing higher technical and research degrees.",
    conditions: [
      "Enrolled full-time in a recognized Indian University or Institute.",
      "Annual parental income below ₹6,00,000.",
      "Minimum 60% marks in preceding qualifying examination."
    ],
    documents: [
      "University Bonafide & Verification Certificate",
      "Income & Domicile Certificate",
      "Previous Semester/Year Marksheet",
      "Aadhaar Card & Bank Mandate Form"
    ],
    benefits: [
      "Monthly maintenance allowance credited via Public Financial Management System (PFMS).",
      "Annual contingency grant of ₹10,000 to ₹25,000 for books and research.",
      "House Rent Allowance (HRA) as per city classification."
    ]
  },

  // ─── FARMER SCHEMES ─────────────────────────────────────────────────────────
  {
    id: "frm-kisan-1",
    category: "farmer",
    name: "PM-KISAN Samman Nidhi Direct Income Support",
    portal: "https://pmkisan.gov.in",
    stipend: "₹6,000 / yr (3 Installments)",
    minAge: 18,
    maxAge: 85,
    maxIncome: 600000,
    department: "Ministry of Agriculture & Farmers Welfare",
    description: "Direct income support of ₹6,000 per year in three equal installments of ₹2,000 every 4 months into Aadhaar-seeded bank accounts of landholding farmer families.",
    conditions: [
      "Must own cultivable agricultural land in official state land records (ROR/Khatauni).",
      "Must have completed PM-KISAN e-KYC via Aadhaar OTP.",
      "No family member should be an income tax payer or regular government employee."
    ],
    documents: [
      "Aadhaar Card linked with active mobile number",
      "Land Ownership Record (Khatauni / Jamabandi / Farad)",
      "NPCI/DBT Seeded Bank Account Passbook"
    ],
    benefits: [
      "₹6,000 guaranteed annual cash transfer in 3 installments.",
      "Automatic eligibility for Kisan Credit Card (KCC) with low interest.",
      "Zero middlemen—100% Aadhaar Payment Bridge transfer."
    ]
  },
  {
    id: "frm-pmfby-2",
    category: "farmer",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY) Crop Shield",
    portal: "https://pmfby.gov.in",
    stipend: "100% Insured Sum on Crop Loss",
    minAge: 18,
    maxAge: 90,
    maxIncome: 1500000,
    department: "Ministry of Agriculture & Farmers Welfare",
    description: "Comprehensive crop insurance protecting farmers against non-preventable natural risks (drought, flood, hailstorm, landslides, pests) from pre-sowing to post-harvest.",
    conditions: [
      "All farmers (including sharecroppers and tenant farmers) growing notified crops.",
      "Enrollment within cutoff date of Kharif / Rabi season.",
      "Nominal farmer premium: only 2% for Kharif, 1.5% for Rabi, 5% for Horticultural crops."
    ],
    documents: [
      "Land Possession Certificate (LPC) or Tenancy Agreement",
      "Sowing Certificate (Buwai Praman Patra) from Patwari/Sarpanch",
      "Aadhaar Card & Bank Account Passbook"
    ],
    benefits: [
      "Full sum insured payout for prevented sowing, mid-season adversity, and post-harvest losses.",
      "Remote-sensing and drone-based fast claim settlement.",
      "Government pays up to 98% of the actuarial insurance premium."
    ]
  },
  {
    id: "frm-kusum-3",
    category: "farmer",
    name: "PM-KUSUM Solar Agricultural Pump Subsidy",
    portal: "https://pmkusum.mnre.gov.in",
    stipend: "60% to 80% Solar Pump Subsidy",
    minAge: 18,
    maxAge: 80,
    maxIncome: 1200000,
    department: "Ministry of New and Renewable Energy (MNRE)",
    description: "Subsidizes installation of standalone off-grid solar-powered irrigation pumps (up to 7.5 HP) and grid-connected solar power plants on barren farmland.",
    conditions: [
      "Individual farmers, water user associations, or farmer producer organizations (FPOs).",
      "Possession of agricultural land with an existing or proposed irrigation source.",
      "Farmer contributes only 10%–40% cost (30% Central + 30–50% State subsidy)."
    ],
    documents: [
      "Aadhaar Card & Farmer Registration ID",
      "Land Ownership Jamabandi / Khasra Map",
      "Bank Account Passbook & Passport Photo",
      "Declaration of water source availability"
    ],
    benefits: [
      "Up to 60%–80% direct capital subsidy on solar pump installation.",
      "Zero diesel/electricity bills for daytime crop irrigation for 25 years.",
      "Option to sell surplus solar power back to state DISCOMs for extra income."
    ]
  },
  {
    id: "frm-kcc-4",
    category: "farmer",
    name: "Kisan Credit Card (KCC) Modified Interest Subvention",
    portal: "https://www.myscheme.gov.in/schemes/kcc",
    stipend: "Up to ₹3 Lakh Loan @ 4% Interest",
    minAge: 18,
    maxAge: 75,
    maxIncome: 1000000,
    department: "Department of Financial Services / NABARD",
    description: "Revolving credit facility for crop cultivation, post-harvest expenses, dairy, poultry, and farm equipment maintenance at an effective 4% annual interest rate.",
    conditions: [
      "Owner cultivators, tenant farmers, oral lessees, and SHGs.",
      "Age between 18 and 75 years (co-borrower required if above 60).",
      "Prompt repayment within 1 year unlocks the 3% additional interest subvention."
    ],
    documents: [
      "Aadhaar Card & Voter ID / PAN Card",
      "Land Revenue Record (Khatauni / Khasra)",
      "Two Passport Size Photographs"
    ],
    benefits: [
      "Collateral-free farm credit up to ₹1.60 Lakh (up to ₹3 Lakh with subvention).",
      "Effective interest rate of just 4% per annum on timely repayment.",
      "Includes personal accident insurance cover up to ₹50,000."
    ]
  },
  {
    id: "frm-smam-5",
    category: "farmer",
    name: "Sub-Mission on Agricultural Mechanization (SMAM Tractor Grant)",
    portal: "https://agrimachinery.nic.in",
    stipend: "50% to 80% Machinery Subsidy",
    minAge: 18,
    maxAge: 75,
    maxIncome: 1000000,
    department: "Ministry of Agriculture & Farmers Welfare",
    description: "Financial subsidy for purchasing power tillers, tractors, rotavators, harvesters, and setting up Custom Hiring Centres (CHCs) in rural and hilly regions.",
    conditions: [
      "Small, marginal, women, SC/ST, and North-East/Himalayan region farmers get highest priority.",
      "Equipment must be purchased from empanelled manufacturers on DBT portal.",
      "Should not have availed tractor subsidy under SMAM in the last 5 years."
    ],
    documents: [
      "Aadhaar Card & Caste Certificate (if applicable)",
      "Land Record (RoR) & Quotation from Empanelled Dealer",
      "Bank Passbook with IFSC Code"
    ],
    benefits: [
      "50% subsidy for individual farmers on modern farm machinery.",
      "Up to 80% subsidy for cooperative societies and Custom Hiring Centres.",
      "Special extra allowance for hilly terrains like Himachal Pradesh and Uttarakhand."
    ]
  },
  {
    id: "frm-pkvy-6",
    category: "farmer",
    name: "Paramparagat Krishi Vikas Yojana (PKVY Organic Farming)",
    portal: "https://pgsindia-ncof.gov.in",
    stipend: "₹31,500 / Hectare Direct Grant",
    minAge: 18,
    maxAge: 85,
    maxIncome: 800000,
    department: "Department of Agriculture & Cooperation",
    description: "Promotes chemical-free organic farming with direct DBT assistance for organic seeds, bio-fertilizers, PGS certification, and organic packaging.",
    conditions: [
      "Farmer must commit to chemical-free organic cultivation on up to 2 hectares.",
      "Participation in local PGS-India organic cluster or individual registration.",
      "Active Aadhaar-seeded bank account."
    ],
    documents: [
      "Aadhaar Card & Land Khasra Details",
      "Bank Account Passbook",
      "Soil Health Card (if available)"
    ],
    benefits: [
      "₹31,500 per hectare over 3 years directly transferred for organic inputs.",
      "Free PGS-India Organic Certification and testing.",
      "Marketing and branding support to sell produce at premium prices."
    ]
  },

  // ─── SENIOR CITIZEN SCHEMES ─────────────────────────────────────────────────
  {
    id: "sen-ayush-1",
    category: "senior",
    name: "Ayushman Vay Vandana 70+ Universal Senior Health Card",
    portal: "https://beneficiary.nha.gov.in",
    stipend: "₹5,00,000 / yr Free Hospitalization",
    minAge: 70,
    maxAge: 120,
    maxIncome: 9999999,
    department: "National Health Authority (NHA)",
    description: "Universal ₹5 Lakh annual cashless health insurance coverage for every Indian citizen aged 70 years and above, regardless of income or pension status.",
    conditions: [
      "Must be 70 years of age or older as per Aadhaar card.",
      "No income limit—rich, middle-class, and low-income seniors are all eligible.",
      "Covers pre-existing diseases from Day 1 without any waiting period."
    ],
    documents: [
      "Aadhaar Card (only document required for e-KYC)",
      "Active Mobile Number linked to Aadhaar for OTP"
    ],
    benefits: [
      "₹5,00,000 per year cashless treatment at 29,000+ empanelled private and govt hospitals.",
      "Separate ₹5 Lakh top-up even if family already has an Ayushman Bharat card.",
      "Covers 1,949 medical and surgical procedures including cardiology, knee replacement, and oncology."
    ]
  },
  {
    id: "sen-nsap-2",
    category: "senior",
    name: "Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
    portal: "https://nsap.nic.in",
    stipend: "₹1,000 to ₹2,500 / month Pension",
    minAge: 60,
    maxAge: 120,
    maxIncome: 250000,
    department: "Ministry of Rural Development",
    description: "Non-contributory monthly social security pension credited directly into the bank or post office accounts of senior citizens aged 60 years and above.",
    conditions: [
      "Applicant must be 60 years or older.",
      "Household annual income must fall within state/central BPL or low-income threshold.",
      "Must not be receiving any other statutory public sector pension."
    ],
    documents: [
      "Aadhaar Card & Age Proof Certificate (Voter ID / Birth Record)",
      "Income / BPL Ration Card Certificate",
      "Bank or Post Office Passbook"
    ],
    benefits: [
      "Guaranteed monthly pension (Central contribution + State top-up up to ₹2,500/mo).",
      "Automatically increases rate once citizen crosses 80 years of age.",
      "Direct doorstep delivery option via India Post Payments Bank."
    ]
  },
  {
    id: "sen-rvvy-3",
    category: "senior",
    name: "Rashtriya Vayoshri Yojana (Free Assistive Living Devices)",
    portal: "https://alimco.in",
    stipend: "Free Hearing Aids, Spectacles & Wheelchairs",
    minAge: 60,
    maxAge: 120,
    maxIncome: 180000,
    department: "Ministry of Social Justice & Empowerment",
    description: "Provides free physical aids and assisted-living devices (walking sticks, digital hearing aids, dentures, spectacles, wheelchairs, knee braces) to senior citizens.",
    conditions: [
      "Senior citizen aged 60 years or above suffering from age-related low vision, hearing impairment, or locomotor disability.",
      "Monthly income of the senior citizen should not exceed ₹15,000 (₹1.80 Lakh/yr).",
      "No disability certificate required—simple clinical assessment at camp or portal."
    ],
    documents: [
      "Aadhaar Card",
      "Self-Declaration / Income Certificate (< ₹15,000/month)",
      "Passport Size Photograph"
    ],
    benefits: [
      "100% free high-quality ISI-marked assistive devices manufactured by ALIMCO.",
      "Includes 1 year of free maintenance and battery replacement for hearing aids.",
      "Improves independent mobility and daily comfort for elderly citizens."
    ]
  },
  {
    id: "sen-scwss-4",
    category: "senior",
    name: "Senior Citizens Savings Scheme (SCSS) High-Yield Account",
    portal: "https://www.indiapost.gov.in",
    stipend: "8.2% Guaranteed Annual Interest",
    minAge: 60,
    maxAge: 120,
    maxIncome: 5000000,
    department: "Ministry of Finance / India Post",
    description: "Sovereign-backed deposit scheme offering the highest fixed return (8.2% p.a.) with quarterly interest payouts and Section 80C tax deduction for seniors.",
    conditions: [
      "Individual aged 60 years or above (55+ for retired civilian employees, 50+ for retired defence personnel).",
      "Minimum deposit ₹1,000 up to a maximum of ₹30 Lakh.",
      "5-year maturity tenure, extendable by another 3 years."
    ],
    documents: [
      "Aadhaar Card & PAN Card",
      "Age Proof (Passport / Voter ID / Senior Citizen Card)",
      "2 Passport Photographs & Bank/Post Office Account"
    ],
    benefits: [
      "Highest sovereign-guaranteed interest rate of 8.2% per annum.",
      "Regular quarterly pension-like interest payouts on 1st of April, July, October, and January.",
      "Tax deduction up to ₹1.5 Lakh under Section 80C of Income Tax Act."
    ]
  },
  {
    id: "sen-pmvvy-5",
    category: "senior",
    name: "Atal Vayo Abhyuday Yojana (AVYAY) Senior Care & Shelter",
    portal: "https://avyay.dosje.gov.in",
    stipend: "Free Geriatric Care, Shelter & Helpline 14567",
    minAge: 60,
    maxAge: 120,
    maxIncome: 300000,
    department: "Department of Social Justice & Empowerment",
    description: "Comprehensive senior welfare umbrella providing free geriatric healthcare, cataract surgeries, senior citizen homes, and Elderline 14567 legal/rescue support.",
    conditions: [
      "Senior citizens aged 60 years and above.",
      "Indigent or low-income elderly citizens prioritized for free residential care and medical camps."
    ],
    documents: [
      "Aadhaar Card",
      "Age Proof Document",
      "Income Declaration"
    ],
    benefits: [
      "Free food, clothing, recreational facilities, and medical care in Assisted Living Homes.",
      "Free cataract operations and mobile medicare units in rural districts.",
      "Instant legal, pension, and rescue assistance via National Elderline 14567."
    ]
  }
];