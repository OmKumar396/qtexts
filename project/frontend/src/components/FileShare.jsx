import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function FileDrop() {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState("");

  const upload = async () => {
    if (!file) {
      toast.error("Select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "http://localhost:5000/api/upload-file",
      formData
    );

    setCode(res.data.code);
    toast.success("File uploaded successfully.");
  };

  return (
    <motion.div
      key="file"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Upload Box */}
      <label className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-violet-300 bg-gradient-to-br from-violet-50 to-indigo-50 px-10 py-14 cursor-pointer hover:scale-[1.01] transition">
        <input
          type="file"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />

        <p className="text-slate-700 font-semibold">
          Click to upload a file
        </p>

        {file && (
          <p className="mt-3 text-sm text-slate-500">{file.name}</p>
        )}
      </label>

      {/* Button */}
      <button
        onClick={upload}
        className="w-full mt-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 py-4 text-white font-medium shadow-lg shadow-indigo-200/40 hover:from-indigo-600 hover:to-violet-600 transition"
      >
        Generate Code
      </button>

      {/* Output */}
      {code && (
        <div className="mt-7 rounded-2xl border border-violet-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-6 py-4 text-center shadow-sm">
          <h2 className="text-2xl font-semibold tracking-wide bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {code}
          </h2>
        </div>
      )}
    </motion.div>
  );
}
