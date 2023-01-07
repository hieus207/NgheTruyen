import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routers from "./routers/index.js"
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import path from 'path';
import dotenv from "dotenv"
import https from "https"
import fs from "fs"

dotenv.config()



const app = express()
const PORT = process.env.PORT || 5000
const URI = process.env.DATABASE_URI

const __dirname = path.resolve();

const options = {
    key: fs.readFileSync('certificates/key.pem'),
    cert: fs.readFileSync('certificates/cert.pem'),
};


app.use(bodyParser.json({limit:'50mb'}));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use(fileUpload());

app.use(cors());
app.use(routers)

app.use('/public', express.static(__dirname + '/public'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/audio', express.static(__dirname + '/audio'));

mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("CONNECT SUCCESSFULL")
    
    https.createServer(options,app).listen(PORT)
    // app.listen(PORT, ()=>{
    //     console.log(`Running on port ${PORT}`)
    // })
}).catch((err)=>{
    console.log("ERR TO CONNECT DB")
    console.log(err);
})
