const express = require('express')
const authRoutes = express.Router()
const User = require('../models/users.js')
const jwt = require('jsonwebtoken')

//signup
authRoutes.post("/signup",(req,res,next)=>{
    //find if the username 
    User.findOne({username:req.body.username.toLowerCase()},(err,user)=>{
    //error handling
        if(err){
        res.status(500)
        return next(err)
    }
    //if username is taken then send error message
        if(user){
            res.status(403)
            return next(new Error("That username has already been taken"))
        }
    //creating new user is successful

        const newUser= new User(req.body)
        //save the user
        newUser.save((err,savedUser)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            //if succesful we will create a token with our request for autherntication purposes
                                    //payload           //secret
            const token=jwt.sign(savedUser.withoutPassword(),process.env.SECRET)
            return res.status(201).send({token,user:savedUser.withoutPassword()})
        })


    } )
})

//Login
authRoutes.post("/login",(req,res,next)=>{
     //find username
    User.findOne({username:req.body.username.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        //if username doesnt exist
        if(!user){
            res.status(403)
            return next(new Error("username or password is incorrect"))
        }

        //if password doesnt match whats in the db send error
        user.checkPassword(req.body.password, (err,isMatch)=>{
            if(err){
                res.status(403)
                return next(new Error("Username or Password are incorrect"))
            }

            if(!isMatch){
                res.status(403)
                return next(new Error("Username or Password is incorrect"))
            }

            
        //if succesful we will create a token with our request for autherntication purposes
                                    //payload           //secret
                                    const token=jwt.sign(user.withoutPassword(),process.env.SECRET)
                                    return res.status(201).send({token,user:user.withoutPassword()})

        })
        

    })




})

module.exports = authRoutes