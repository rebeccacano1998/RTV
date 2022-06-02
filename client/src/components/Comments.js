import React,{useContext} from 'react'
import Axios from 'axios'
import { UserContext } from '../context/UserProvider'
import CommentsForm from './CommentsForm'




export default function Comments(props){
  const UsersContext=useContext(UserContext)

  console.log(props,"props")

  //UNDEFINDED
  //UsersContext.userState.comments.map(comment=>console.log(comment.description))
  //const commentDescriptions=UsersContext.userState.comments.map(comment=><h1>{comment.description}</h1>)
  
  return (
    <div>
      
    <div>
      {props.description}
    </div>

    <div>
    
        <button>
            Delete
        </button>

        <button>
            Update
        </button>

    </div> 

</div>
      
)}

  