import express from 'express';
import {getTellers, createTeller, updateTeller, deleteTeller, getTellerStories} from '../controllers/teller.js'
const router = express.Router();

router.get('/', getTellers)
router.get('/:id', getTellerStories)

router.post('/', createTeller)
router.put('/', updateTeller)
router.delete('/:id', deleteTeller)

export default router