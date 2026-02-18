import SharePanel from "./components/ShareBox";
import RetrievePanel from "./components/RetrieveBox";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#fbfbff] to-[#f9f3ff] flex flex-col items-center px-4 sm:px-6">

      {/* Toast */}
      <Toaster position="top-center" />

      {/* Hero Section */}
      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 sm:mt-16 text-center w-full max-w-2xl"
      >
        {/* Logo */}
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-slate-900">
          Qtext
          <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            .online
          </span>
        </h1>

        {/* Main Tagline */}
        <p className="mt-5 sm:mt-6 text-lg sm:text-xl font-medium text-slate-700 px-2">
          Share anything you want — text, photos, videos, or any files instantly.
        </p>

        {/* Sub Tagline */}
        <p className="mt-3 text-sm sm:text-lg text-slate-500 leading-relaxed px-3">
          Upload or paste content, get a secure retrieval code, and access it
          anywhere. No accounts. No links. Just simple code-based sharing.
        </p>

        {/* Feature Badges */}
        <div className="mt-6 sm:mt-8 flex justify-center gap-2 sm:gap-3 flex-wrap px-2">
          <span className="px-3 py-2 rounded-full bg-white/80 border text-xs sm:text-sm text-slate-600 shadow-sm">
            ⚡ Instant Sharing
          </span>

          <span className="px-3 py-2 rounded-full bg-white/80 border text-xs sm:text-sm text-slate-600 shadow-sm">
            🔒 Secure Codes
          </span>

          <span className="px-3 py-2 rounded-full bg-white/80 border text-xs sm:text-sm text-slate-600 shadow-sm">
            📁 Any File Type
          </span>

          <span className="px-3 py-2 rounded-full bg-white/80 border text-xs sm:text-sm text-slate-600 shadow-sm">
            ⏳ Auto Expiry Ready
          </span>
        </div>
      </motion.header>

      {/* Share Panel */}
      <motion.main
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-10 sm:mt-16 w-full flex justify-center"
      >
        <div className="w-full max-w-xl px-2">
          <SharePanel />
        </div>
      </motion.main>

      {/* Retrieve Panel */}
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-8 sm:mt-12 w-full flex justify-center pb-16 sm:pb-24"
      >
        <div className="w-full max-w-xl px-2">
          <RetrievePanel />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-slate-400 text-xs sm:text-sm pb-6 text-center px-2">
        © {new Date().getFullYear()} Qtext.online — Share Instantly With Codes
      </footer>
    </div>
  );
}
