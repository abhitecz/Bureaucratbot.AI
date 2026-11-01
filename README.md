# 🏛️ Bureaucrat.AI (`BureaucratBot`)
### **Autonomous Citizen Welfare Discovery, Deep PDF Verification & Live Portal Auto-Application Engine**

![React](https://img.shields.io/badge/Frontend-React%2018%20%7C%20Vite-38bdf8?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/UI-Tailwind%20CSS%20%7C%20Shadcn-818cf8?style=for-the-badge&logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%7C%20Python%203.11-10b981?style=for-the-badge&logo=fastapi)
![Playwright](https://img.shields.io/badge/Automation-Playwright%20Chromium-f59e0b?style=for-the-badge&logo=playwright)
![PDF.js](https://img.shields.io/badge/Parser-PDF.js%20%2B%20Zlib-ec4899?style=for-the-badge&logo=adobeacrobatreader)

---

## 📌 Problem Statement
Millions of eligible Indian students, farmers, and senior citizens miss out on billions of rupees in Direct Benefit Transfers (DBT), scholarships, and subsidies every year due to:
1. **Fragmented Portals & Complex Circulars:** Citizens struggle to determine whether a 30-page PDF circular is genuine or if they qualify under strict age and family income caps.
2. **Language & Accessibility Barriers:** Official notifications are rarely explained in natural, conversational regional languages with proper pronunciation of grant amounts.
3. **Repetitive Form Filling:** Citizens must repeatedly upload the same documents (Income Certificates, Marksheets, Land Records, Bank Passbooks) across disconnected `.gov.in` portals.

---

## 💡 The Solution: Bureaucrat.AI
**Bureaucrat.AI** is a specialized, domain-locked citizen welfare platform that transforms static scheme discovery into **automated portal execution**. It combines a **Liquid Glass + Flow-Field Particle UI** with a **Multi-Turn Voice & Chat Advisor**, **Decompressed Binary PDF Verification**, a **Reusable Citizen Document Vault**, and **Playwright Browser Automation**.

---

## ✨ Key Architectural Features

### 1. 🎯 Specialized Single-Domain Experience & Glowing Scenic Backdrop
* Dynamically locks the dashboard to the citizen's chosen domain (**Student Scholarships**, **Farmer Agritech Subsidies**, or **Senior Citizen Healthcare & Pensions**) to eliminate cross-domain clutter.
* Features a custom HTML5 Canvas **Interactive Flow-Field Particle Engine** paired with glowing SVG domain illustrations (**Graduation Mortarboard Cap**, **Terraced Farmland & Tractor**, and **Senior Citizen with Walking Cane**).
* Calculates and displays the **Total Potential Annual Grant Value (₹/yr)** the user qualifies for at the top of the feed.

### 2. 🎙️ "Ask Me" Smart Multi-Turn Voice & Chat Advisor
* **Strict Domain Guardrail:** Rejects off-topic trivia, entertainment, or music queries immediately, keeping the assistant 100% focused on government welfare schemes.
* **Context-Aware Follow-Ups:** Remembers the active scheme in the conversation thread to answer follow-up questions on **Application End Dates**, **Mandatory Documents**, **Step-by-Step Portal Registration**, and **Eligibility Rules**.
* **"Are You Satisfied? (Yes / No)" Regeneration:** Clicking **No** erases the previous AI response and dynamically synthesizes a fresh perspective or alternative scheme comparison.
* **Natural Speech Sanitizer (TTS):** Strips emojis/URLs and converts numeric Indian currency figures (e.g., `₹80,000` $\rightarrow$ *"अस्सी हज़ार रुपये"* or *"eighty thousand rupees"*) so the voice reader never spells out digits character-by-character.

### 3. 📄 Deep Binary PDF Inspector & Multilingual Voice Summarizer
* Powered by **Mozilla `PDF.js`** on the frontend and **`pypdf` + `zlib` FlateDecode stream decompression** on the backend.
* Decompresses multi-page PDF circulars, counts exact scheme keyword frequencies, extracts real clauses (**Objective, Grant Amount, Eligibility, Required Documents, and Closing Date**), and automatically reads the summary aloud in the user's selected language.
* Accurately identifies and rejects non-scheme PDFs while quoting the actual detected content inside the file.

### 4. 🗂️ Reusable Document Readiness Vault & Direct Portal Auto-Apply
* **1-Click Vault Auto-Fill:** Citizens upload core documents (*Identity Proof, Family Income Certificate, Marksheet/Khatauni, Bank Passbook*) once in the **Doc Vault** and attach them to any scheme application in a single click.
* **Live Playwright Stream:** Launches a real Chromium automation worker (`LivePortalWorker`) that navigates to the official `.gov.in` portal, injects citizen fields, and generates a live **Application Tracking ID**.
* **Printable Official Receipt with QR Code:** Generates a formatted, print-ready acknowledgement receipt featuring a live verification QR code inside the **Track** modal.

### 5. 🎚️ "Why Am I Not Eligible?" Interactive Threshold Simulator & Side-by-Side Comparison
* **Eligibility Simulator Slider:** On any *"Not Eligible"* card, citizens can slide simulated Age and Family Income bars to see the exact statutory boundary required to unlock the grant.
* **Side-by-Side Scheme Comparison:** Compare any 2 schemes across Stipend Value, Application End Date, Age Bounds, Income Caps, and Required Documents.

### 6. 🌐 10 Major Indian Languages & Bidirectional Location/PIN Lookup
* **100% Native Script Purity:** Supports **English, Hindi (हिंदी), Punjabi (ਪੰਜਾਬੀ), Bengali (বাংলা), Tamil (தமிழ்), Telugu (తెలుగు), Marathi (मराठी), Gujarati (ગુજરાતી), Kannada (ಕನ್ನಡ), and Malayalam (മലയാളം)**.
* **Interconnected Location & PIN Autocomplete:** Type a city/post office name to auto-populate the 6-digit PIN code, or type a 6-digit PIN code to fetch the exact Post Office, District, and State via `api.postalpincode.in`.

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph Frontend ["Frontend (React 18 + Vite + Tailwind CSS)"]
        UI["Liquid Glass UI & Hardware Viewport Simulator"]
        Vault["Reusable Document Readiness Vault (LocalStorage)"]
        PDFClient["Mozilla PDF.js Stream Decompressor"]
        Voice["Web Speech API + Natural Number TTS Sanitizer"]
    end

    subgraph Backend ["Backend Engine (FastAPI + Python 3.11)"]
        API["FastAPI REST & SSE Streaming Server (:8000)"]
        AskEngine["Context-Aware 'Ask Me' Scheme Intelligence Engine"]
        PDFServer["pypdf + zlib FlateDecode Binary Inspector"]
        Playwright["Playwright Chromium Auto-Apply Worker"]
    end

    subgraph External ["Live Public Portals & APIs"]
        PinAPI["India Post API (api.postalpincode.in)"]
        GovPortals["Official Portals (scholarships.gov.in, pmkisan.gov.in, nha.gov.in)"]
    end

    UI --> API
    PDFClient --> PDFServer
    Voice --> AskEngine
    Vault --> Playwright
    API --> PinAPI
    Playwright --> GovPortals
📂 Project Directory Structure
Plaintext
bureaucratbot/
├── backend/
│   ├── main.py                # FastAPI server, PDF zlib/pypdf analyzer, Ask Me engine, Location API
│   ├── browser_agent.py       # Playwright Chromium live portal form-filling worker
│   └── requirements.txt       # Python backend dependencies
├── frontend/
│   ├── index.html             # Root HTML entry point
│   ├── package.json           # Node dependencies & Vite scripts
│   ├── vite.config.js         # Vite bundler & path alias configuration
│   ├── tailwind.config.js     # Tailwind CSS utility configuration
│   └── src/
│       ├── main.jsx           # React DOM root mount
│       ├── index.css          # Liquid Glass custom CSS utilities
│       ├── App.jsx            # Self-contained Master Application (UI, Vault, Simulator, PDF.js, Voice)
│       └── components/
│           └── ui/
│               └── flow-field-background.tsx  # Interactive Canvas Flow-Field Particle Engine
└── README.md                  # Project documentation
🚀 Local Setup & Installation Guide
Prerequisites
Node.js (v18+ recommended)

Python (v3.10 or v3.11)

1. Clone the Repository
Bash
git clone [https://github.com/abhitecz/Bureaucratbot.AI.git](https://github.com/abhitecz/Bureaucratbot.AI.git)
cd bureaucratbot
2. Start the FastAPI Backend Server (Terminal 1)
Bash
cd backend
pip install fastapi uvicorn httpx pypdf python-multipart playwright
playwright install chromium
python main.py
The backend server will start live at http://localhost:8000.

3. Start the React + Vite Frontend Server (Terminal 2)
Bash
cd frontend
npm install
npm run dev
Open http://localhost:5173 in Google Chrome or Microsoft Edge.

🧪 Quick Demo Walkthrough for Judges
Account Creation & OTP Verification: Register with your Name, 10-digit Mobile Number, Date of Birth, Annual Family Income, Domain Category (Student, Farmer, or Senior Citizen), and 6-digit PIN Code.

Explore Domain Feed & End Dates: View your Total Potential Annual Grant banner, filter by Eligible For Me or Not Eligible For Me, and check the live Application End Date countdown on every card.

Test "Why Not Eligible?" Simulator: On any Not Eligible scheme card, click Why Not Eligible? Simulate and drag the Age/Income sliders to see the exact qualification threshold.

Test Deep PDF Check: Click PDF Check in the navbar and upload both an official scheme PDF (to hear the extracted summary spoken aloud) and an unrelated PDF (to see the content-based rejection guard in action).

Test "Ask Me" Multi-Turn Voice & Chat: Click Ask Me, ask "Tell me about the top schemes for my profile", follow up with "What are the mandatory documents required?", and test the No (Erase & Give New Answer) button.

1-Click Document Vault & Printable QR Receipt: Upload sample files in Doc Vault, click Auto-Apply Live on any scheme card, click 1-Click Vault Auto-Fill, submit the application, and click Print Receipt inside the Track modal to generate your QR-verified acknowledgement receipt.

🛡️ Security & Privacy Compliance
Zero Sensitive ID Storage: Citizen identity proofs are verified locally within the session vault and are never logged or exposed in plaintext.

Buffered Profile Protection: Domain category and income modifications require explicit confirmation via Save Changes, preventing accidental profile overwrites.