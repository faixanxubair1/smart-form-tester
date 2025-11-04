import express from 'express';
import multer from 'multer';
import { submitForm, healthCheck } from '../controllers/formController.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const valid = allowedTypes.test(file.mimetype);
    cb(valid ? null : new Error('Invalid file type'), valid);
  }
});

router.post('/submit-form', upload.single('image'), submitForm);
router.get('/health', healthCheck);

export default router;