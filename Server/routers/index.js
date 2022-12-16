import express from 'express';
import story from './story.js'
import category from './category.js'
import teller from './teller.js'
import author from './author.js'
import comment from './comment.js'
import auth from './auth.js'
import { authenToken } from '../middleware/authUser.js';
const router = express.Router();

router.use('/auth', auth)
router.use('/comments', comment)
router.use('/', authenToken)
router.use('/stories', story)
router.use('/tellers', teller)
router.use('/authors', author)
router.use('/categories', category)




export default router