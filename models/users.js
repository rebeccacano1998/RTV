const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcrypt')

const userSchema=new Schema({

username:{
    type:String,
    required:true,
    lowercase:true,
    unique:true
},

password:{
    type:String,
    required:true
},

memberSince:{
    type:Date,
    default: Date.now
},

isAdmin:{
    type:Boolean,
    default:false
}

})

//pre-save hook to encrypt user password on signup
//right before you save the user run the following
//signup
userSchema.pre("save", function(next){
    const user=this
    //if not a user return next
        if(!user.isModified("password")) 
            return next()
    //take password and hash it 
    bcrypt.hash(user.password,10,(err,hash)=>{
        if(err) 
            return next(err)
                user.password=hash
                next()

    })
})

//method to check encrypted password on login

//password attempt (req.body.password) and  allback function
userSchema.methods.checkPassword=function(passwordAttempt,callback){
    //compare will take hashed password and plain text passwird to see if they match
    //password atttempt and the encrypted password
    //will return error or boolean
    bcrypt.compare(passwordAttempt,this.password, (err, isMatch)=>{
        if(err) 
        //pass error as the first argument
            return callback(err)

        //if no error return callback with null passed in as first argument and isMatch boolean as the second
            return callback(null,isMatch)
    })
}

//method to remove users password for token /sending response to the front end
//better security measure. saved in data base but no in front end
userSchema.methods.withoutPassword=function(){
    const user=this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model ("User" ,userSchema)





