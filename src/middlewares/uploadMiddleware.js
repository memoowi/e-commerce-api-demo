import multer from "multer";

// Configure multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware to handle file uploads (single file named 'img')
export const uploadMiddleware = upload.single("img");