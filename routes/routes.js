import express from 'express';
import { getData, addData } from '../controllers/controller.js';

const router = express.Router();

router.get('/', getData); // GET /api/data
router.post('/', addData); // POST /api/data

export default router;
