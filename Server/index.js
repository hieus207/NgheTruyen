import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import story from './routers/story.js'
import mongoose from 'mongoose'
const app = express()
const PORT = process.env.port || 5000
const URI = 'mongodb://localhost:27017/nghetruyen'


app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(cors());
app.use('/stories', story)

mongoose.connect(URI).then(()=>{
    console.log("CONNECT SUCCESSFULL")
    

    app.listen(PORT, ()=>{
        console.log(`Running on port ${PORT}`)
    })
}).catch(()=>{
    console.log("ERR TO CONNECT DB")
})
