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
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }
        
        const stories = await StoryModel.find(req.query.name===undefined?{}:{$text: {$search:req.query.name}}).skip((page-1)*process.env.STORIES_PER_PAGE).limit(process.env.STORIES_PER_PAGE);
        const docCount = await StoryModel.countDocuments(req.query.name===undefined?{}:{$text: {$search:req.query.name}}).exec();
 

        const lastestPage = docCount % process.env.STORIES_PER_PAGE === 0 ? docCount / process.env.STORIES_PER_PAGE : Math.floor(docCount / process.env.STORIES_PER_PAGE) + 1

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

        res.status(200).json({data: rs, lastestPage})
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getStoriesRandom = async (req,res) => {
    try {
        let limit = process.env.STORIES_PER_PAGE
        if(parseInt(req.query.limit)){
            limit = parseInt(req.query.limit)
        }
        
        const stories = await StoryModel.aggregate([{ $sample: { size: parseInt(limit)} }])
        let rs = await Promise.all(stories.map(async (story) => {
            let author = await AuthorModel.findById(story.authorId)     
            let teller = await TellerModel.findById(story.tellerId)
            let category = await CategoryModel.findById(story.categoryId)
            return {
                ...story,
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

export const getStoriesMostView = async (req,res) => {
    try {
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }
        let limit = process.env.STORIES_PER_PAGE
        if(parseInt(req.query.limit)){
            limit = parseInt(req.query.limit)
        }
        const stories = await StoryModel.find().sort({"view":-1}).skip((page-1)*limit).limit(limit);
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
        const docCount = await StoryModel.countDocuments().exec();

        const lastestPage = docCount % limit === 0 ? docCount / limit : Math.floor(docCount / limit) + 1

        res.status(200).json({data: rs, lastestPage})
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getStoriesRecent = async (req,res) => {
    try {
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }
        let limit = process.env.STORIES_PER_PAGE
        if(parseInt(req.query.limit)){
            limit = parseInt(req.query.limit)
        }
        const stories = await StoryModel.find().sort({"createdAt":-1}).skip((page-1)*limit).limit(limit);
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
        const docCount = await StoryModel.countDocuments().exec();

        const lastestPage = docCount % limit === 0 ? docCount / limit : Math.floor(docCount / limit) + 1
        res.status(200).json({data: rs, lastestPage})
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
                let prefix = Date.now().toString().slice(-6)
                img = req.files.img;
                uploadImgPath = __dirname + '/public/img/' + prefix + img.name;
                img.mv(uploadImgPath)
                imgPath = process.env.PATH_SAVE_IMG + "/" + prefix + img.name||"http://localhost:5000/img/"+img.name
                
            }else{
                imgPath = "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
            }
                
            
            if(req.files.chapter){
                chapter = [].concat(req.files.chapter);
                chapter.forEach(chap => {
                    let prefix = Date.now().toString().slice(-6)
                    uploadAudioPath = __dirname + '/public/audio/' + prefix + chap.name;
                    chap.mv(uploadAudioPath)
                    audioPath.push(process.env.PATH_SAVE_AUDIO+"/"+prefix + chap.name||"http://localhost:5000/audio/"+chap.name);
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
            let prefix = Date.now().toString().slice(-6)
            img = req.files.img;
            uploadImgPath = __dirname + '/public/img/' + prefix + img.name;
            img.mv(uploadImgPath)
            imgPath = process.env.PATH_SAVE_IMG+"/" + prefix + img.name||"http://localhost:5000/img/"+img.name
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

export const addChapter = async (req, res) => {
    try {
        let chapter;
        let uploadAudioPath;
        let audioPath = []

        if (!req.files || Object.keys(req.files).length === 0) {
            // console.log("K co file")
        }
        else{           
            if(req.files.chapter){
                chapter = [].concat(req.files.chapter);
                chapter.forEach(chap => {
                    let prefix = Date.now().toString().slice(-6)
                    uploadAudioPath = __dirname + '/public/audio/'+ prefix + chap.name;
                    chap.mv(uploadAudioPath)
                    audioPath.push(process.env.PATH_SAVE_AUDIO+"/"+ prefix + chap.name||"http://localhost:5000/audio/"+chap.name);
                })
            }
        }
        const story = await StoryModel.findById(req.body._id)
        req.body.chapter = [...story.chapter,...audioPath]
        req.body.chap = story.chapter.length + audioPath.length
        const new_story = await StoryModel.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})
        return res.status(200).json(new_story)
    } catch (error) {
        return res.status(500).json({error})
    }
}

export const editChapter = async (req, res) => {
    try {
        let chapter;
        let uploadAudioPath;
        let audioPath = []

        if (!req.files || Object.keys(req.files).length === 0) {
            // console.log("K co file")
        }
        else{           
            if(req.files.chapter){
                chapter = [].concat(req.files.chapter);
                chapter.forEach(chap => {
                    let prefix = Date.now().toString().slice(-6)
                    uploadAudioPath = __dirname + '/public/audio/' + prefix + chap.name;
                    chap.mv(uploadAudioPath)
                    
                    audioPath.push(process.env.PATH_SAVE_AUDIO+"/"+ prefix + chap.name||"http://localhost:5000/audio/"+chap.name);
                })
            }
        }
        const story = await StoryModel.findById(req.body._id)
        story.chapter[req.body.chapterIndex] = audioPath[0]

        await story.save()
        res.status(200).json(story)
    } catch (error) {
        res.status(500).json({error})
    }
}

export const deleteChapter = async (req, res) => {
    try {
        const story = await StoryModel.findById(req.params.id);
        if(story.chap===1){
            return res.status(500).json({error: 'Minium chapter reached'})
        }
 
        story.chapter.splice(req.params.chapterIndex,1)
        story.chap--

        await story.save()
        res.status(200).json(story)
    } catch (error) {
        return res.status(500).json({error})
    }
}