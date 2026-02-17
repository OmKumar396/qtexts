import { useState } from "react";
import TextDrop from "./TextShare";
import FileDrop from "./FileShare";
import { motion } from "framer-motion";

export default function SharePanel() {
  const [tab, setTab] = useState("text");

  return (
    <div className="w-full max-w-4xl rounded-3xl border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_12px_50px_rgba(80,70,200,0.15)] overflow-hidden">

      {/* Tabs */}
      <div className="relative flex bg-slate-100/70 p-2 rounded-full mx-6 mt-6">

        {/* Slider */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute top-2 bottom-2 w-1/2 rounded-full 
          bg-gradient-to-r from-indigo-500 to-violet-500 shadow-md"
          style={{
            left: tab === "text" ? "0%" : "50%",
          }}
        />

        <button
          onClick={() => setTab("text")}
          className={`relative w-1/2 py-3 text-sm font-semibold z-10 transition ${
            tab === "text" ? "text-white" : "text-slate-600"
          }`}
        >
          Text Drop
        </button>

        <button
          onClick={() => setTab("file")}
          className={`relative w-1/2 py-3 text-sm font-semibold z-10 transition ${
            tab === "file" ? "text-white" : "text-slate-600"
          }`}
        >
          File Drop
        </button>
      </div>

      {/* Content */}
      <div className="p-10">
        {tab === "text" ? <TextDrop /> : <FileDrop />}
      </div>
    </div>
  );
}
