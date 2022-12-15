import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import story from './routers/story.js'
import category from './routers/category.js'
import teller from './routers/teller.js'
import author from './routers/author.js'
import comment from './routers/comment.js'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload'
import path from 'path';

const app = express()
const PORT = process.env.port || 5000
const URI = 'mongodb://localhost:27017/nghetruyen'

const __dirname = path.resolve();

console.log("DIRNAME:" + __dirname)


app.use(bodyParser.json({limit:'50mb'}));

app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use(fileUpload());

app.use(cors());
app.use('/stories', story)
app.use('/tellers', teller)
app.use('/authors', author)
app.use('/categories', category)
app.use('/comments', comment)

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
