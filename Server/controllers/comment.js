import { CommentModel } from "../models/CommentModel.js"
import { SubCommentModel } from "../models/SubCommentModel.js"


export const getAllComment = async (req,res) => {
    try {
        const comments = await CommentModel.find({storyId: req.params.id}).sort({"createdAt":-1})
        let rs = await Promise.all(comments.map(async(comment) => {
            let subComments = await SubCommentModel.find({commentId: comment._id})
            return {...comment._doc, subComments}
        }))
        
        res.status(200).json(rs)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const createComment = async (req,res) => {
    try {
        const comment = new CommentModel(req.body)
        comment.save()
        res.status(200).json(comment)
    } catch (err) {
        res.status(500).json({error: err})
    }
}

export const createSubComment = async (req,res) => {
    try {
        const subComment = new SubCommentModel(req.body)
        subComment.save()
        res.status(200).json(subComment)
    } catch (err) {
        res.status(500).json({error: err})
    }
}
