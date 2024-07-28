const process=require('node:process')
const mongoose=require('mongoose')
const url=process.env.URL;
const connect=()=>{
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}
module.exports=connect