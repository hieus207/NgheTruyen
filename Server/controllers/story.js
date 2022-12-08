import { StoryModel } from "../models/StoryModel.js"

export const getStories = async (req,res) => {
    try {
        const stories = await StoryModel.find();
        console.log('stories:',stories);
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const createStory = async (req,res) => {
    try {
        const story = new StoryModel(req.body)
        await story.save()
        res.status(200).json(story)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const updateStory = async (req,res) => {
    try {
        const story = await StoryModel.findOneAndUpdate({_id: req.body.id}, req.body, {new: true})

        res.status(200).json(story)
    } catch (err) {
        res.status(500).json({error: err})
    }
}