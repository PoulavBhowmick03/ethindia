const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const dotenv = require('dotenv');
dotenv.config({})
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('connected to db')
})
const ChatModel=require('./models/ChatModel')
const app=express()

const PORT=process.env.PORT || 4000
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.post('/chat/:pincode',async(req,res)=>{
    const pincode=req.params.pincode
    const {chat}=req.body
    await ChatModel.create({
        chat,
        pincode
    })
    res.json({
        error:0
    })
})
app.get('/chat/:pincode',async(req,res)=>{
    const pincode=req.params.pincode
   const chat=await ChatModel.find({pincode})
   res.json({
    data:chat
   })
})

app.listen(PORT,()=>{
    console.log('Started on server')
})
