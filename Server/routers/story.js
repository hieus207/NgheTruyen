import express from 'express';
import {getStories, createStory, updateStory} from '../controllers/story.js'
const router = express.Router();

router.get('/',getStories)

router.post('/',createStory)

router.put('/',updateStory)



export default router