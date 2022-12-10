import { StoryModel } from "../models/StoryModel.js"
import path from 'path';

const __dirname = path.resolve();
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
        let img;
        let chapter;
        let uploadImgPath;
        let uploadAudioPath;
        let imgPath = "";
        let audioPath = []

        // name chapter img author teller

        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }
      
        // The name of the input field (i.e. "img") is used to retrieve the uploaded file
        img = req.files.img;
        uploadImgPath = __dirname + '/img/' + img.name;

        

        img.mv(uploadImgPath)

        
        imgPath = "http://localhost:5000/img/"+img.name
        
        chapter = [].concat(req.files.chapter);
        
        chapter.forEach(chap => {
            uploadAudioPath = __dirname + '/audio/' + chap.name;
            chap.mv(uploadAudioPath)
            audioPath.push("http://localhost:5000/audio/"+chap.name);
        })
        
        
        req.body.img = imgPath
        req.body.chapter = audioPath
        req.body.chap = chapter.length
        req.body.authorId = 1
        req.body.tellerId = 1
        
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

