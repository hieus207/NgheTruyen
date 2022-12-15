import express from 'express';
import {getCategories, createCategory, updateCategory, deleteCategory, getCategoryStories} from '../controllers/category.js'
const router = express.Router();

router.get('/', getCategories)
router.get('/:id', getCategoryStories)

router.post('/', createCategory)
router.put('/', updateCategory)
router.delete('/:id', deleteCategory)
export default router