import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, CheckCircle } from "lucide-react";

export default function InstructionGuide() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-40 liquid-glass p-3 rounded-full text-cyan-300 hover:text-white shadow-xl flex items-center gap-2 text-xs font-medium"
      >
        <Info className="w-4 h-4" />
        <span>Quick Guide</span>
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-5 left-5 z-40 max-w-sm liquid-glass rounded-3xl p-5 border-cyan-500/30 shadow-2xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>How to use BureaucratBot</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ul className="space-y-2 text-xs text-slate-300 font-medium">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><b>Select Profile:</b> Choose your domain category & location on login.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><b>PDF Analyzer:</b> Upload notification PDFs to verify scheme eligibility.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span><b>AI Guidance:</b> Ask questions via voice; it speaks back in your language.</span>
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}