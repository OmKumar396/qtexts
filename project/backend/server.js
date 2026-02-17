const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { nanoid } = require("nanoid");
const fs = require("fs-extra");

const app = express();
app.use(cors());
app.use(express.json());

/* ---------------- EXPIRY CONFIG ---------------- */
const EXPIRY_HOURS = 24;
const EXPIRY_TIME = EXPIRY_HOURS * 60 * 60 * 1000; // 24h in ms

/* ---------------- STORAGE ---------------- */
let textStorage = {};
let fileStorage = {};

/* ---------------- MULTER SETUP ---------------- */
const upload = multer({ dest: "uploads/" });

/* ---------------- AUTO CLEANUP FUNCTION ---------------- */
function autoDelete(code, type) {
  setTimeout(async () => {
    if (type === "text" && textStorage[code]) {
      delete textStorage[code];
      console.log(`🗑️ Text expired: ${code}`);
    }

    if (type === "file" && fileStorage[code]) {
      const filePath = fileStorage[code].path;

      // Delete file from folder
      await fs.remove(filePath);

      delete fileStorage[code];
      console.log(`🗑️ File expired: ${code}`);
    }
  }, EXPIRY_TIME);
}

/* ===================================================== */
/* ================= FILE UPLOAD API =================== */
/* ===================================================== */
app.post("/api/upload-file", upload.single("file"), (req, res) => {
  const code = "F" + nanoid(5).toUpperCase();

  fileStorage[code] = {
    filename: req.file.originalname,
    path: req.file.path,
    createdAt: Date.now(),
  };

  // Auto Expiry
  autoDelete(code, "file");

  res.json({
    message: "File uploaded successfully",
    code,
    expiresIn: `${EXPIRY_HOURS} hours`,
  });
});

/* ===================================================== */
/* ================= TEXT SHARE API ===================== */
/* ===================================================== */
app.post("/api/share-text", (req, res) => {
  const { text } = req.body;
  const code = "T" + nanoid(5).toUpperCase();

  textStorage[code] = {
    content: text,
    createdAt: Date.now(),
  };

  // Auto Expiry
  autoDelete(code, "text");

  res.json({
    message: "Text shared successfully",
    code,
    expiresIn: `${EXPIRY_HOURS} hours`,
  });
});

/* ===================================================== */
/* ================= RETRIEVE TEXT ====================== */
/* ===================================================== */
app.get("/api/get-text/:code", (req, res) => {
  const code = req.params.code;

  if (!textStorage[code]) {
    return res.status(404).json({
      error: "Invalid or Expired Code",
    });
  }

  res.json({
    code,
    text: textStorage[code].content,
    expiresIn: `${EXPIRY_HOURS} hours`,
  });
});

/* ===================================================== */
/* ================= RETRIEVE FILE ====================== */
/* ===================================================== */
app.get("/api/get-file/:code", (req, res) => {
  const code = req.params.code;

  if (!fileStorage[code]) {
    return res.status(404).json({
      error: "Invalid or Expired Code",
    });
  }

  res.download(fileStorage[code].path, fileStorage[code].filename);
});

/* ===================================================== */
/* ================= SERVER START ======================= */
/* ===================================================== */
app.listen(5000, () => {
  console.log("🚀 TextDrop Backend Running on Port 5000");
  console.log(`⏳ Expiry Enabled: ${EXPIRY_HOURS} Hours`);
});
