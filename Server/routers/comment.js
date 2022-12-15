import express from 'express';
import {} from '../controllers/author.js'
import { createComment, createSubComment, getAllComment } from '../controllers/comment.js';
const router = express.Router();


router.get('/:id', getAllComment)

router.post('/', createComment)
router.post('/reply', createSubComment)


export default router