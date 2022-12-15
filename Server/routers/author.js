import express from 'express';
import {getAuthors, createAuthor, updateAuthor, deleteAuthor, getAuthorStories} from '../controllers/author.js'
const router = express.Router();

router.get('/', getAuthors)
router.get('/:id', getAuthorStories)

router.post('/', createAuthor)
router.put('/', updateAuthor)
router.delete('/:id', deleteAuthor)

export default router