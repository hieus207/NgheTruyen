import {UserModel} from "../models/UserModel.js"
import jwt from 'jsonwebtoken'
import { RefreshTokenModel } from "../models/RefreshTokenModel.js";

export const login = async (req,res,next) => {
    const user = await UserModel.findOne(req.body)
    if(!user){
        res.sendStatus(403)
    }else{
        delete req.body.password
        const accessToken = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME+'s'||'60s'})
        const refreshToken = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET)
        await new RefreshTokenModel({token:refreshToken}).save()
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, data)=>{
            if(error){
                res.sendStatus(403)
            }
            else
            {
                delete user._doc.password
                res.json({...user._doc, exp: data.exp, accessToken, refreshToken})
            }
        })
        

    }
}

export const logout = async (req,res,next) => {    
    const refreshToken = await RefreshTokenModel.findOne(req.body)
    if(refreshToken){
        refreshToken.delete()
    }
    res.sendStatus(200)
}

export const refreshToken = async (req,res,next) => {
    const refreshToken = req.body.token
    if(!refreshToken)
        res.sendStatus(401)

    const refToken = await RefreshTokenModel.findOne({token:refreshToken})

    if(!refToken || !refToken.token)
        res.sendStatus(403)
    else{
        jwt.verify(refToken.token, process.env.REFRESH_TOKEN_SECRET, (err, data)=>{
            if(err){
                res.sendStatus(403)
            }else{
                const accessToken = jwt.sign({username:data.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME+'s'||'20s'})
                jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, data)=>{
                    if(error){
                        res.sendStatus(403)
                    }
                    else
                    {
                        res.json({accessToken, exp: data.exp})
                    }
                })
            }
        })
    }    
}

