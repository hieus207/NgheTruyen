import { AuthorModel } from "../models/AuthorModel.js"
import { StoryModel } from "../models/StoryModel.js"
import path from 'path';

const __dirname = path.resolve();

export const getAuthorStories = async (req,res) => {
    try {
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }
        const stories = await StoryModel.find({authorId: req.params.id}).skip((page-1)*process.env.AUTHOR_STORIES_PER_PAGE).limit(process.env.AUTHOR_STORIES_PER_PAGE)
        const docCount = await StoryModel.countDocuments({authorId: req.params.id}).exec();
        const lastestPage = docCount % process.env.AUTHOR_STORIES_PER_PAGE === 0 ? docCount / process.env.AUTHOR_STORIES_PER_PAGE : Math.floor(docCount / process.env.AUTHOR_STORIES_PER_PAGE) + 1

        res.status(200).json({data: stories, lastestPage})
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const getAuthors = async (req,res) => {
    try {
        let page = 1
        if(parseInt(req.query.page)){
            page = parseInt(req.query.page)
        }
        if(req.query.all){
            const authors = await AuthorModel.find({})
            return  res.status(200).json(authors)
        }

        const authors = await AuthorModel.find().skip((page-1)*process.env.AUTHORS_PER_PAGE).limit(process.env.AUTHORS_PER_PAGE)
        const docCount = await AuthorModel.countDocuments({}).exec();
        const lastestPage = docCount % process.env.AUTHORS_PER_PAGE === 0 ? docCount / process.env.AUTHORS_PER_PAGE : Math.floor(docCount / process.env.AUTHORS_PER_PAGE) + 1

        res.status(200).json({data: authors, lastestPage})
        
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const createAuthor = async (req,res) => {
    try {
        let img;
        let uploadImgPath;
        let imgPath = "";

        // name chapter img author author
       
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
        const author = new AuthorModel(req.body)
        await author.save()
        res.status(200).json(author)

    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const updateAuthor = async (req,res) => {
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
            uploadImgPath = __dirname + '/public/img/'+ prefix + img.name;
            img.mv(uploadImgPath)
            imgPath = process.env.PATH_SAVE_IMG+"/" + prefix + img.name||"http://localhost:5000/img/"+img.name
            req.body.img = imgPath
        }

        const author = await AuthorModel.findOneAndUpdate({_id: req.body._id}, req.body, {new: true})

        res.status(200).json(author)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const deleteAuthor = async (req, res) => {
    try {
        const author = await AuthorModel.findById(req.params.id);
        const stories = await StoryModel.find({authorId: author._id})
        stories.forEach(story=>story.delete())
        author.delete()
        res.status(200).json()
    } catch (error) {
        res.status(500).json({error})
    }
}
