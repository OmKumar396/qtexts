import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function RetrievePanel() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const retrieve = async () => {
    if (!code.trim()) return;

    try {
      if (code.startsWith("T")) {
        const res = await axios.get(
          `https://q-ej0o.onrender.com/api/get-text/${code}`
        );
        setOutput(res.data.text);
        toast.success("Text retrieved.");
      }

      if (code.startsWith("F")) {
        window.open(`https://q-ej0o.onrender.com/api/get-file/${code}`);
        toast.success("File download started.");
      }
    } catch {
      toast.error("Invalid or expired code.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="w-full max-w-4xl rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_12px_50px_rgba(80,70,200,0.12)] p-10"
    >
      <h2 className="text-lg font-semibold text-slate-800">
        Retrieve Shared Content
      </h2>

      {/* Input */}
      <div className="flex gap-4 mt-6">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter code..."
          className="flex-1 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <button
          onClick={retrieve}
          className="rounded-2xl px-8 py-4 text-white font-medium bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-200/40 hover:from-indigo-600 hover:to-violet-600 transition"
        >
          Retrieve
        </button>
      </div>

      {/* Output */}
      {output && (
        <div className="mt-6 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-6 py-5 text-slate-700 whitespace-pre-wrap shadow-sm">
          {output}
        </div>
      )}
    </motion.div>
  );
}

