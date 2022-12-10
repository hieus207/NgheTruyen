import express from 'express';
import {getTellers, createTeller} from '../controllers/teller.js'
const router = express.Router();

router.get('/', getTellers)

router.post('/', createTeller)

export default router