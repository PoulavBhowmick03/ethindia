const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    chat:{type:String},
    date:{type:Date,default:new Date(Date.now())},
    pincode:{type:String}
})
const model=mongoose.model('Chat',schema)
module.exports=model
