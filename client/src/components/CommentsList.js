import React,{useContext} from 'react'
import Comments from './Comments.js'
//import Issue from './Issue.js'
import { UserContext } from '../context/UserProvider'


export default function CommentsList(props){
 
  const {userState:{comments}}=useContext(UserContext)

console.log(comments)
  // return: {UsersContext.userState.comments.map(comment=><Comments {...comment} key={comment._id} />)}

  //return our comments and spread in all properties of current comments
  //map through comments so they continue to get re-rendered

  return (
    <div>
        {/*{UsersContext.userState.comments.map(comment=><Comments {...comment} key={comment._id} />)}*/}
        {comments.map(comment=><Comments {...comment} key={comment._id} />)}

    </div>
  )
}
