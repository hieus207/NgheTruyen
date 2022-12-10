import { CategoryModel } from "../models/CategoryModel.js"
import path from 'path';

const __dirname = path.resolve();
export const getCategories = async (req,res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const createCategory = async (req,res) => {
    try {
        let img;
        let uploadImgPath;
        let imgPath = "";
        // name chapter img author teller
       
        if (!req.files || Object.keys(req.files).length === 0) {
            // console.log("K co file")
        }
        else{
            img = req.files.img;
            uploadImgPath = __dirname + '/img/' + img.name
            img.mv(uploadImgPath)
            imgPath = "http://localhost:5000/img/"+img.name
            req.body.img = imgPath
        }
        // The name of the input field (i.e. "img") is used to retrieve the uploaded file
        
    //    console.log(req.body)
        const category = new CategoryModel(req.body)
        await category.save()
        res.status(200).json(category)

    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const updateStory = async (req,res) => {
    // try {
    //     const story = await StoryModel.findOneAndUpdate({_id: req.body.id}, req.body, {new: true})

    //     res.status(200).json(story)
    // } catch (err) {
    //     res.status(500).json({error: err})
    // }
}

