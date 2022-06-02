const express=require("express")
const app=express()
const morgan = require('morgan')
const mongoose=require('mongoose')
//const cors=require('cors')
var { expressjwt: jwt } = require("express-jwt");


require('dotenv').config()

app.use(
  express.urlencoded({ extended: true })
);

app.use(express.json())//looks for request bdoy and turns it into req.body
app.use(morgan('dev'))//logs request to console
//app.use(cors()) //helps connect the front and the back end

process.env.SECRET

//connect to db
mongoose.connect("mongodb://localhost:27017/userdb", () => console.log('connected to database'))

//routes
app.use('/auth', require('./routes/authRoutes.js'))
app.use("/api", jwt({ secret:process.env.SECRET, algorithms: ["HS256"] })); //req.user info
app.use('/api/issues',require('./routes/issuesRoutes.js'))
app.use('/api/comments',require('./routes/commentRoutes.js'))

//errorHandler
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
  })
  

app.listen(9000,()=>{
    console.log("The server is running Port 9000")
})