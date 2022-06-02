const express=require("express")
const commentsRoutes=express.Router()
const Comments=require('../models/comments.js')
const Issues=require('../models/issues.js')
const app=express()



//Get All comments
commentsRoutes.get("/",(req,res,next)=>{
    Comments.find((err,comments)=>{
        if(err){
            res.status(500)
            return next (err)
        }
        return res.status(200).send(comments)
    })
})

//get comments by user id
commentsRoutes.get("/user",(req,res,next)=>{
    Comments.find({user:req.auth._id},(err,comments)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

//get comments by issueId
commentsRoutes.get("/:issuesId",(req,res,next)=>{
    console.log(req)
    Comments.find({issues:req.params.issuesId},(err,comments)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})







//add new comment 

commentsRoutes.post("/:issuesId",(req,res,next)=>{
  
    const newComments= new Comments(req.body)
    req.body.user=req.auth._id
    //associates comments with issue
   req.body.issues=req.params.issuesId,
   
     newComments.save((err,savedComments)=>{

         if(err){
             res.status(500)
             return next(err)
         }
         return res.status(201).send(savedComments)
     })
 })




 



 //Delete issue
commentsRoutes.delete("/:commentsId",(req,res,next)=>{
    Comments.findOneAndDelete(
        {_id:req.params.commentsId, user:req.auth._id},
        (err,deletedComments)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`successfully deleted comments ${deletedComments}`)
        }
    )
})

//Update issue
commentsRoutes.put("/:commentsId",(req,res,next)=>{
    Comments.findOneAndUpdate(
        {_id:req.params.commentsId, user:req.auth._id},
        req.body,
        {new:true},
        (err,updatedComments)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComments)
        }
    )
})

module.exports=commentsRoutes
