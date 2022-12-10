import mongoose from "mongoose"

const schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        birthDay: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true,
            default: "https://secure.gravatar.com/avatar/36a7abced5c929ba7572c5ad29a6eff7?s=128&d=mm&r=g"
        },
},{timestamps: true})

export const TellerModel = mongoose.model('Teller',schema);