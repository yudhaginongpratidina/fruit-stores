const multer = require("multer");
const path = require("path");

// KONFIGURASI PENYIMPANAN
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // DESTINASI PENYIMPANAN
        cb(null, 'public/images'); 
    },
    filename: (req, file, cb) => {

        // NAMA FILE BARU
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

// Middleware upload file
const uploadImageFruit = multer({
    storage: storage,


    // LIMIT FILE SIZE
    limits: {
        fileSize: 5 * 1024 * 1024 // Batas ukuran file (dalam bytes) - disini 5MB
    },
    fileFilter: (req, file, cb) => {
        // Filter hanya untuk file gambar
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

module.exports = uploadImageFruit;
