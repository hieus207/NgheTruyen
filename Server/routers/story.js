import express from 'express';

import {getStories, createStory, updateStory, deleteStory, getStory, getStoriesRandom, getStoriesMostView, getStoriesRecent, addChapter, editChapter, deleteChapter} from '../controllers/story.js'

const router = express.Router();

router.get('/', getStories)
router.get('/random', getStoriesRandom)
router.get('/mostview', getStoriesMostView)
router.get('/recent', getStoriesRecent)
router.get('/:id', getStory)

router.post('/', createStory)
router.post('/chapter', addChapter)
router.put('/chapter', editChapter)

router.put('/', updateStory)
router.delete('/:id', deleteStory)
router.delete('/:id/chapter/:chapterIndex', deleteChapter)



export default router