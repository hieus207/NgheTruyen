import mongoose from "mongoose"

const schema = new mongoose.Schema({

        name: {
            type: String,
            required: true
        },
        chap: {
            type: Number,
            required: true
        },
        chapter: {
            type: Array,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        authorId: {
            type: Number,
            required: true
        },
        teller: {
            type: String,
            required: true
        },
        tellerId: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        view: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }
},{timestamps: true})

export const StoryModel = mongoose.model('Story',schema);