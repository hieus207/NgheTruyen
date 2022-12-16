import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()


const schema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        default: Date.now()
    }
})
schema.index({ expireAt: 1 }, { expireAfterSeconds: process.env.REFRESH_TOKEN_EXPIRE_TIME||3600 });

export const RefreshTokenModel = mongoose.model('RefreshToken',schema);