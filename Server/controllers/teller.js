import { TellerModel } from "../models/TellerModel.js"
import { StoryModel } from "../models/StoryModel.js"
import path from 'path';

const __dirname = path.resolve();
export const getTellerStories = async (req,res) => {
    try {
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }
        const stories = await StoryModel.find({tellerId: req.params.id}).skip((page-1)*process.env.TELLER_STORIES_PER_PAGE).limit(process.env.TELLER_STORIES_PER_PAGE)
        const docCount = await StoryModel.countDocuments({tellerId: req.params.id}).exec();
        const lastestPage = docCount % process.env.TELLER_STORIES_PER_PAGE === 0 ? docCount / process.env.TELLER_STORIES_PER_PAGE : Math.floor(docCount / process.env.TELLER_STORIES_PER_PAGE) + 1

        res.status(200).json({data: stories, lastestPage})
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getTellers = async (req,res) => {
    try {
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }

        if(req.query.all){
            if(Boolean(req.query.all)===true){
                const tellers = await TellerModel.find({})
                return  res.status(200).json(tellers)
            }
        }
        const tellers = await TellerModel.find({}).skip((page-1)*process.env.TELLERS_PER_PAGE).limit(process.env.TELLERS_PER_PAGE)
        const docCount = await TellerModel.countDocuments({}).exec();
        const lastestPage = docCount % process.env.TELLERS_PER_PAGE === 0 ? docCount / process.env.TELLERS_PER_PAGE : Math.floor(docCount / process.env.TELLERS_PER_PAGE) + 1
        res.status(200).json({data: tellers, lastestPage})
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const createTeller = async (req,res) => {
    try {
        let img;
        let uploadImgPath;
        let imgPath = "";

        // name chapter img author teller
       
        if (!req.files || Object.keys(req.files).length === 0) {
            // console.log("K co file")
        }
        else{
            let prefix = Date.now().toString().slice(-6)
            img = req.files.img;
            uploadImgPath = __dirname + '/public/img/' + prefix + img.name
            img.mv(uploadImgPath)
            imgPath = process.env.PATH_SAVE_IMG+"/" + prefix + img.name||"http://localhost:5000/img/"+img.name
            req.body.img = imgPath
        }
        // The name of the input field (i.e. "img") is used to retrieve the uploaded file
        
    //    console.log(req.body)
        const teller = new TellerModel(req.body)
        await teller.save()
        res.status(200).json(teller)

    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const updateTeller = async (req,res) => {
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

        const teller = await TellerModel.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})

        res.status(200).json(teller)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const deleteTeller = async (req, res) => {
    try {
        const teller = await TellerModel.findById(req.params.id);
        const stories = await StoryModel.find({tellerId:teller._id})
        stories.forEach(story=>story.delete())
        teller.delete()
        res.status(200).json()
    } catch (error) {
        res.status(500).json({error})
    }
}