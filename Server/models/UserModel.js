import mongoose from "mongoose"

const schema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
            dropDups: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true,
            default: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        },
},{timestamps: true})

export const UserModel = mongoose.model('User',schema);