import { CategoryModel } from "../models/CategoryModel.js"
import { StoryModel } from "../models/StoryModel.js"
import path from 'path';

const __dirname = path.resolve();

export const getCategoryStories = async (req,res) => {
    try {
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }
        const stories = await StoryModel.find({categoryId: req.params.id}).skip((page-1)*process.env.CATEGORY_STORIES_PER_PAGE).limit(process.env.CATEGORY_STORIES_PER_PAGE)
        const docCount = await StoryModel.countDocuments({categoryId: req.params.id}).exec();
        const lastestPage = docCount % process.env.CATEGORY_STORIES_PER_PAGE === 0 ? docCount / process.env.CATEGORY_STORIES_PER_PAGE : Math.floor(docCount / process.env.CATEGORY_STORIES_PER_PAGE) + 1

        res.status(200).json({data: stories, lastestPage})
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getCategories = async (req,res) => {
    try {
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }
        let limit = process.env.CATEGORIES_PER_PAGE
        if(parseInt(req.query.limit)){
            limit = parseInt(req.query.limit)
        }
        
        if(req.query.all){
            const categories = await CategoryModel.find({})
            return  res.status(200).json(categories)
        }

        const categories = await CategoryModel.find().skip((page-1)*limit).limit(limit)
        const docCount = await CategoryModel.countDocuments({}).exec();
        const lastestPage = docCount % limit === 0 ? docCount / limit : Math.floor(docCount / limit) + 1

        res.status(200).json({data: categories, lastestPage})
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
            let prefix = Date.now().toString().slice(-6)
            img = req.files.img;
            uploadImgPath = __dirname + '/public/img/' + prefix + img.name
            img.mv(uploadImgPath)
            imgPath = process.env.PATH_SAVE_IMG+"/" + prefix + img.name||"http://localhost:5000/img/"+img.name
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
            let prefix = Date.now().toString().slice(-6)
            img = req.files.img;
            uploadImgPath = __dirname + '/public/img/' + prefix + img.name;
            img.mv(uploadImgPath)
            imgPath = process.env.PATH_SAVE_IMG+"/" + prefix + img.name||"http://localhost:5000/img/"+img.name
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

