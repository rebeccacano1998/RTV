const mongoose=require('mongoose')
const Schema=mongoose.Schema

const commentsSchema=new Schema({

description:{
    type:String,
    required:true,
},

date: {
    type: Date,
    default: Date.now
},

user:{
type:Schema.Types.ObjectId,
ref:"User"

},
issue:{
    type:Schema.Types.ObjectId,
    ref:"Issues"
}


})

module.exports = mongoose.model ("Comments" ,commentsSchema)
