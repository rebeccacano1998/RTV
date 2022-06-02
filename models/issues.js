const mongoose=require('mongoose')
const Schema=mongoose.Schema

const issuesSchema=new Schema({

title:{
    type:String,
    required:true,
},

description:{
    type:String,
    required:true,
},

completed:{
    type:Boolean,
    default:false
},

date: {
    type: Date,
    default: Date.now
},

user:{
type: Schema.Types.ObjectId,
ref:"User",
required:true
},

//not showing in postman
upvotes:{
    type:Number
},


downvotes:{
    type:Number
},


/*comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }],*/
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

})


module.exports = mongoose.model ("Issues" ,issuesSchema)





