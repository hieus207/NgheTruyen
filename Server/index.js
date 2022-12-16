import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routers from "./routers/index.js"
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import path from 'path';
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.port || 5000
const URI = 'mongodb://localhost:27017/nghetruyen'

const __dirname = path.resolve();

console.log("DIRNAME:" + __dirname)


app.use(bodyParser.json({limit:'50mb'}));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use(fileUpload());

app.use(cors());
app.use(routers)


app.use('/img', express.static(__dirname + '/img'));
app.use('/audio', express.static(__dirname + '/audio'));

mongoose.connect(URI).then(()=>{
    console.log("CONNECT SUCCESSFULL")
    

    app.listen(PORT, ()=>{
        console.log(`Running on port ${PORT}`)
    })
}).catch(()=>{
    console.log("ERR TO CONNECT DB")
})
