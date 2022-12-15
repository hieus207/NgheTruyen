import { CategoryModel } from "../models/CategoryModel.js"
import { StoryModel } from "../models/StoryModel.js"
import path from 'path';

const __dirname = path.resolve();

export const getCategoryStories = async (req,res) => {
    try {
        const stories = await StoryModel.find({categoryId:req.params.id});
        res.status(200).json(stories)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

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

export const updateCategory = async (req,res) => {
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

        const category = await CategoryModel.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})

        res.status(200).json(category)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await CategoryModel.findById(req.params.id);
        console.log("K LOI")
        const stories = await StoryModel.find({categoryId: category._id})
        console.log("K LOI 2")
        stories.forEach(story=>story.delete())
        console.log("LOI")
        category.delete()
        
        res.status(200).json()
    } catch (error) {
        res.status(500).json({error})
    }
}

