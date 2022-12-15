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
        authorId: {
            type: String,
            required: true
        },
        tellerId: {
            type: String,
            required: true
        },
        categoryId: {
            type: String,
            required: true
        },
        view: {
            type: Number,
            required: true,
            default: 1000
        },
        description: {
            type: String,
            required: true
        }
},{timestamps: true})
schema.index({name: 'text'})
export const StoryModel = mongoose.model('Story',schema);