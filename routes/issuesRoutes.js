const express=require("express")
const issuesRoutes=express.Router()
const Issues=require('../models/issues.js')

const app=express()


//Get All issues

issuesRoutes.get("/",(req,res,next)=>{
    Issues.find((err,issues)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })


})

//get issues by user id
issuesRoutes.get("/user",(req,res,next)=>{
    Issues.find({user:req.auth._id},(err,issues)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})



//Add new issue
issuesRoutes.post("/",(req,res,next)=>{
  
   const newIssue= new Issues(req.body)
   newIssue.user=req.auth._id
    newIssue.save((err,savedIssue)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})


//Delete issue
issuesRoutes.delete("/:issuesId",(req,res,next)=>{
    Issues.findOneAndDelete(
        {_id:req.params.issuesId, user:req.auth._id},
        (err,deletedIssue)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`successfully deleted issue ${deletedIssue}`)
        }
    )
})

//Update issue
issuesRoutes.put("/:issuesId",(req,res,next)=>{
    Issues.findOneAndUpdate(
        {_id:req.params.issuesId, user:req.auth._id},
        req.body,
        {new:true},
        (err,updatedIssue)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

module.exports=issuesRoutes