import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeuralBackground from "@/components/ui/flow-field-background";

export default function LiquidBackdrop({ activeCategory }) {
  const particleColor =
    activeCategory === "student"
      ? "#38bdf8" // Cyan-Blue for Student
      : activeCategory === "farmer"
      ? "#10b981" // Emerald for Farmer
      : "#f59e0b"; // Amber-Gold for Senior

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* 1. Interactive Neural Flow Field Background */}
      <div className="absolute inset-0 opacity-85">
        <NeuralBackground
          color={particleColor}
          trailOpacity={0.12}
          particleCount={650}
          speed={0.9}
        />
      </div>

      {/* 2. Soft Vignette Overlay for Glass Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(3,5,10,0.85)_95%)] pointer-events-none" />

      {/* 3. Rich Scenic Character & Machinery Animations */}
      <div className="absolute right-[3%] bottom-[6%] w-[340px] h-[340px] md:w-[500px] md:h-[500px] opacity-45 pointer-events-none">
        <AnimatePresence mode="wait">
          {/* STUDENT: Graduate in Robe Tossing Square Mortarboard Cap */}
          {activeCategory === "student" && (
            <motion.svg
              key="student-scene"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              viewBox="0 0 300 300"
              className="w-full h-full text-cyan-300 stroke-current fill-none"
            >
              {/* Floating Open Textbooks */}
              <motion.g
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <path d="M35,190 Q60,180 85,190 Q110,180 135,190 L135,205 Q110,195 85,205 Q60,195 35,205 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="2" />
                <line x1="85" y1="190" x2="85" y2="205" strokeWidth="2" />
              </motion.g>

              {/* Graduate Head & Academic Gown/Stole */}
              <circle cx="180" cy="145" r="18" fill="currentColor" fillOpacity="0.3" strokeWidth="2.5" />
              {/* Flowing Graduation Robe & V-Stole */}
              <path d="M150,170 L135,265 H225 L210,170 Q180,180 150,170 Z" fill="currentColor" fillOpacity="0.22" strokeWidth="2.5" />
              <path d="M165,170 L180,210 L195,170" strokeWidth="3" className="text-sky-200" />
              {/* Left Arm holding Rolled Degree Scroll */}
              <path d="M150,175 L125,205 L145,212" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="115" y="198" width="26" height="8" rx="3" transform="rotate(-25 115 198)" fill="currentColor" />
              {/* Right Arm Throwing Cap Up */}
              <motion.path
                d="M210,175 L235,130"
                strokeWidth="4.5"
                strokeLinecap="round"
                animate={{ d: ["M210,175 L230,150", "M210,175 L240,120", "M210,175 L230,150"] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              />

              {/* Square Black Mortarboard Cap Tossed High */}
              <motion.g
                animate={{
                  y: [0, -65, 0],
                  x: [0, 12, 0],
                  rotate: [0, -180, -360],
                }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                style={{ transformOrigin: "215px 95px" }}
              >
                <polygon points="215,75 250,88 215,101 180,88" fill="#0f172a" stroke="currentColor" strokeWidth="2.5" />
                <path d="M200,94 V105 Q215,112 230,105 V94" fill="currentColor" fillOpacity="0.4" strokeWidth="2" />
                {/* Hanging Tassel */}
                <path d="M215,88 L242,96 L245,112" strokeWidth="2" className="text-amber-300" />
              </motion.g>
            </motion.svg>
          )}

          {/* FARMER: Rolling Tractor & Multi-Stage Growing Wheat Crops */}
          {activeCategory === "farmer" && (
            <motion.svg
              key="farmer-scene"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              viewBox="0 0 320 300"
              className="w-full h-full text-emerald-400 stroke-current fill-none"
            >
              {/* Furrowed Farmland Horizon */}
              <path d="M10,245 Q160,235 310,245" strokeWidth="3" strokeLinecap="round" />
              <path d="M25,262 Q160,252 295,262" strokeWidth="2" strokeDasharray="8 6" className="opacity-60" />

              {/* Growing Golden-Green Wheat Stalks */}
              {[40, 70, 100, 130].map((xPos, idx) => (
                <motion.g
                  key={xPos}
                  animate={{ scaleY: [0.35, 1.08, 0.35] }}
                  transition={{ repeat: Infinity, duration: 3.6, delay: idx * 0.3, ease: "easeInOut" }}
                  style={{ transformOrigin: `${xPos}px 245px` }}
                >
                  <line x1={xPos} y1="245" x2={xPos} y2="165" strokeWidth="2.5" />
                  <path d={`M${xPos},220 Q${xPos - 14},205 ${xPos - 18},195`} strokeWidth="2" />
                  <path d={`M${xPos},205 Q${xPos + 14},190 ${xPos + 18},180`} strokeWidth="2" />
                  <ellipse cx={xPos} cy="160" rx="5" ry="12" fill="currentColor" fillOpacity="0.35" />
                </motion.g>
              ))}

              {/* Animated Tractor with Cabin, Smokestack & Rotating Treads */}
              <motion.g
                animate={{ x: [-25, 45, -25] }}
                transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
              >
                {/* Cabin & Chassis */}
                <path d="M165,165 H205 L212,195 H160 Z" fill="currentColor" fillOpacity="0.18" strokeWidth="2.5" />
                <rect x="160" y="195" width="85" height="28" rx="5" fill="currentColor" fillOpacity="0.3" strokeWidth="2.5" />
                {/* Exhaust Pipe & Smoke Puffs */}
                <path d="M232,195 V170 L238,165" strokeWidth="3" strokeLinecap="round" />
                <motion.circle
                  cx="240"
                  cy="155"
                  r="6"
                  fill="currentColor"
                  animate={{ y: [0, -25], opacity: [0.7, 0], scale: [0.8, 1.8] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                />
                {/* Heavy Rear Wheel */}
                <circle cx="178" cy="225" r="22" fill="#05070c" stroke="currentColor" strokeWidth="4" />
                <circle cx="178" cy="225" r="9" fill="currentColor" fillOpacity="0.5" />
                {/* Front Steer Wheel */}
                <circle cx="235" cy="231" r="15" fill="#05070c" stroke="currentColor" strokeWidth="3.5" />
                <circle cx="235" cy="231" r="6" fill="currentColor" />
              </motion.g>
            </motion.svg>
          )}

          {/* SENIOR: Elderly Person Walking with Cane & Protective Pulse */}
          {activeCategory === "senior" && (
            <motion.svg
              key="senior-scene"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              viewBox="0 0 300 300"
              className="w-full h-full text-amber-300 stroke-current fill-none"
            >
              {/* Ground Walkway */}
              <line x1="40" y1="250" x2="260" y2="250" strokeWidth="3" strokeLinecap="round" />

              {/* Walking Senior Citizen Figure */}
              <motion.g
                animate={{ x: [-15, 20, -15], y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              >
                {/* Head & Glasses */}
                <circle cx="155" cy="115" r="15" fill="currentColor" fillOpacity="0.25" strokeWidth="2.5" />
                <circle cx="163" cy="114" r="4" strokeWidth="1.5" />
                {/* Slightly Arched Back / Kurta Torso */}
                <path d="M148,132 Q138,165 142,200 H168 Q166,165 158,132 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="2.5" />

                {/* Arm Holding Curved Walking Stick */}
                <path d="M155,142 L182,168 L195,172" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Curved Handle Walking Cane */}
                <path d="M190,172 Q202,165 202,176 L206,250" strokeWidth="3" strokeLinecap="round" />

                {/* Alternating Walking Legs */}
                <motion.line
                  x1="148"
                  y1="200"
                  x2="132"
                  y2="250"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{ x2: [132, 165, 132] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
                <motion.line
                  x1="160"
                  y1="200"
                  x2="172"
                  y2="250"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{ x2: [172, 138, 172] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
              </motion.g>
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}