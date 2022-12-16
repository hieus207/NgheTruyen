import express from 'express';

import {getStories, createStory, updateStory, getStory, deleteStory, getStoriesRandom, getStoriesMostView, getStoriesRecent} from '../controllers/story.js'

const router = express.Router();

router.get('/', getStories)
router.get('/random', getStoriesRandom)
router.get('/mostview', getStoriesMostView)
router.get('/recent', getStoriesRecent)
router.get('/:id', getStory)

router.post('/', createStory)

router.put('/', updateStory)
router.delete('/:id', deleteStory)



export default router