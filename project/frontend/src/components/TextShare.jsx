import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function TextDrop() {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");

  const generate = async () => {
    if (!text.trim()) {
      toast.error("Enter some text first.");
      return;
    }

    const res = await axios.post("http://localhost:5000/api/share-text", {
      text,
    });

    setCode(res.data.code);
    toast.success("Text code generated.");
  };

  return (
    <motion.div
      key="text"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Text Area */}
      <textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-44 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      {/* Button */}
      <button
        onClick={generate}
        className="w-full mt-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 py-4 text-white font-medium shadow-lg shadow-indigo-200/40 hover:from-indigo-600 hover:to-violet-600 transition"
      >
        Generate Code
      </button>

      {/* Output */}
      {code && (
        <div className="mt-7 flex justify-between items-center rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-6 py-4 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {code}
          </h2>

          <button
            onClick={() => {
              navigator.clipboard.writeText(code);
              toast.success("Code copied.");
            }}
            className="text-sm font-semibold text-indigo-600 hover:text-violet-600 transition"
          >
            Copy
          </button>
        </div>
      )}
    </motion.div>
  );
}
