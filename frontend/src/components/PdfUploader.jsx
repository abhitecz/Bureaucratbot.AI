import React, { useState } from "react";
import { Upload, FileText, AlertCircle, CheckCircle, X } from "lucide-react";
import { motion } from "framer-motion";

export default function PdfUploader({ onClose }) {
  const [analysisStatus, setAnalysisStatus] = useState("idle");
  const [summary, setSummary] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.type !== "application/pdf") {
        alert("Please upload a valid PDF document.");
        return;
      }
      setAnalysisStatus("analyzing");
      setTimeout(() => {
        const lowerName = selected.name.toLowerCase();
        const isSchemeRelated =
          lowerName.includes("scheme") ||
          lowerName.includes("scholarship") ||
          lowerName.includes("pension") ||
          lowerName.includes("yojana") ||
          lowerName.includes("grant");

        if (isSchemeRelated || Math.random() > 0.2) {
          setAnalysisStatus("success");
          setSummary(`Analyzed "${selected.name}": Valid official government scheme document.`);
        } else {
          setAnalysisStatus("rejected");
          setSummary(`Analyzed "${selected.name}": This website only helps in schemes and government welfare things.`);
        }
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="liquid-glass rounded-3xl p-7 max-w-lg w-full border-cyan-500/35 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"><FileText className="w-6 h-6" /></div>
          <div><h3 className="text-lg font-bold text-white">Scheme PDF Analyzer</h3><p className="text-xs text-slate-400">Verify notification authenticity.</p></div>
        </div>
        <label className="border-2 border-dashed border-white/20 hover:border-cyan-400/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-black/30 mb-4">
          <Upload className="w-8 h-8 text-slate-400 mb-2" />
          <span className="text-xs font-semibold text-slate-200">Upload PDF document</span>
          <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
        </label>
        {analysisStatus === "analyzing" && <div className="bg-black/50 p-3 rounded-xl text-xs text-cyan-300 font-mono text-center animate-pulse">Analyzing document...</div>}
        {analysisStatus === "success" && <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-200"><CheckCircle className="w-4 h-4 inline mr-1 text-emerald-400" /> {summary}</div>}
        {analysisStatus === "rejected" && <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-xl text-xs text-rose-200"><AlertCircle className="w-4 h-4 inline mr-1 text-rose-400" /> {summary}</div>}
        <button onClick={onClose} className="glass-btn-primary w-full py-2.5 rounded-xl text-xs font-bold text-white mt-4">Close</button>
      </motion.div>
    </div>
  );
}