import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/MongooseConnection.js";
import {URLShortnerModel} from './Model/URLModel.js';
import { SendEmail } from "./utils/SendEmail.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://urlshortner12-ae1c0b538b3a.herokuapp.com"],
}));
config();


app.post('/api/v1/url', async (req, res) => {
    const {image} = req.body;
    let shortUrl = "";
    for(let i=0; i<5; i++){
        shortUrl += Math.floor(Math.random() * 10).toString();
        shortUrl += Math.random().toString(36).substring(2,3);
    }
    try{
        const data = await URLShortnerModel.create({
            actualString: image,
            shortenedString: shortUrl
        })
        res.status(200).json({
            status: "success",
            data
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

app.get('/api/v1/url/:shortUrl', async (req, res) => {
    try{
        const shortUrl = req.params.shortUrl;
        if(!shortUrl) throw new Error('url not found')
        const data = await URLShortnerModel.find({shortenedString : shortUrl})
        res.status(200).json({
            status: "success",
            data
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})

app.post('/api/v1/send-email', async (req, res) => {
    const {email, name, eventName, date, time, meetingUrl} = req.body;
    try{
        SendEmail(email, name, eventName, date, time, meetingUrl);
        res.status(200).json({
            status: "success",
        })
    }catch(err){
        res.status(400).json({
            status: "error",
            message: err.message
        })
    }
})
app.get('*', (req, res) => {
    res.status(404).json({
        status: "failed",
        message: "Route Not Found, Not Found"
    })
})

const PORT = process.env.PORT || 3004;

(function() {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log("Server has started on port " + PORT)
        })
    })
})()