// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Ensure the upload directory exists
// const uploadDir = "Public/uploads/tutorials";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
//   fileFilter: (req, file, cb) => {
//     const filetypes = /mp4|mkv|avi|mov/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
    
//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error("Only video files are allowed"));
//     }
//   }
// });

// module.exports = upload; 
 
 
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the upload directory exists
const uploadDir = "Public/uploads/tutorials";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500 MB
  fileFilter: (req, file, cb) => {
    // allow videos + pdf
    const filetypes = /mp4|mkv|avi|mov|pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype.startsWith("video/") || file.mimetype === "application/pdf";

    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Only video or PDF files are allowed"));
    }
  }
});

module.exports = upload;
