import { StoryModel } from "../models/StoryModel.js"
import { AuthorModel } from "../models/AuthorModel.js"
import { TellerModel } from "../models/TellerModel.js"
import { CategoryModel } from "../models/CategoryModel.js"
import path from 'path';

const __dirname = path.resolve();

export const getStory = async (req,res) => {
    try {
        const story = await StoryModel.findById(req.params.id);
        let author = await AuthorModel.findById(story.authorId)     
        let teller = await TellerModel.findById(story.tellerId)
        let category = await CategoryModel.findById(story.categoryId)
        res.status(200).json({...story._doc, author: author.name, teller: teller.name, category: category.name})
    } catch (error) {
        res.status(500).json({error})
    }
}

export const getStories = async (req,res) => {
    try {
        const stories = await StoryModel.find(req.query.name===undefined?{}:{$text: {$search:req.query.name}});
        
        let rs = await Promise.all(stories.map(async (story) => {
            let author = await AuthorModel.findById(story.authorId)     
            let teller = await TellerModel.findById(story.tellerId)
            let category = await CategoryModel.findById(story.categoryId)
            return {
                ...story._doc,
                author: author.name,
                teller: teller.name,
                category: category.name
            }
        }))
        res.status(200).json(rs)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getStoriesRandom = async (req,res) => {
    try {
        const stories = await StoryModel.aggregate([{ $sample: { size: 20 } }])
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getStoriesMostView = async (req,res) => {
    try {
        const stories = await StoryModel.find().sort({"view":-1}).limit(3);
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getStoriesRecent = async (req,res) => {
    try {
        const stories = await StoryModel.find().sort({"createdAt":-1}).limit(3);
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
            // console.log("K co file")
        }
        else{
      
            if(req.files.img){
                img = req.files.img;
                uploadImgPath = __dirname + '/img/' + img.name;
                img.mv(uploadImgPath)
                imgPath = "http://localhost:5000/img/"+img.name
                
            }else{
                imgPath = "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
            }
                
            
            if(req.files.chapter){
                chapter = [].concat(req.files.chapter);
                chapter.forEach(chap => {
                    uploadAudioPath = __dirname + '/audio/' + chap.name;
                    chap.mv(uploadAudioPath)
                    audioPath.push("http://localhost:5000/audio/"+chap.name);
                })
            }
        
        }
        
        req.body.img = imgPath
        req.body.chapter = audioPath
        req.body.chap = chapter.length

        
        const story = new StoryModel(req.body)
        await story.save()

        res.status(200).json(story)

    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const updateStory = async (req,res) => {
    try {
        let img;
        let imgPath;
        let uploadImgPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            // console.log("K co file")
        }
        else{
            img = req.files.img;
            uploadImgPath = __dirname + '/img/' + img.name;
            img.mv(uploadImgPath)
            imgPath = "http://localhost:5000/img/"+img.name
            req.body.img = imgPath
        }

        const story = await StoryModel.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})

        res.status(200).json(story)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const deleteStory = async (req, res) => {
    try {
        const story = await StoryModel.findById(req.params.id);
        story.delete()
        res.status(200).json()
    } catch (error) {
        res.status(500).json({error})
    }
}
