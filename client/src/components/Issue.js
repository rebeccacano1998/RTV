import React,{useContext} from 'react'
import Axios from 'axios'
import { UserContext } from '../context/UserProvider'
import CommentsForm from './CommentsForm'
import Comments from './Comments'
import CommentsList from './CommentsList'




export default function Issue(props){
  const UsersContext=useContext(UserContext)

  const {title, description,_id}=props
   
  console.log(props)

  




  return (
    <div>
      
    
      <h1>{title}</h1>
      <h3>{description}</h3>
    

    <div>
    
    <button onClick={()=>UsersContext.deleteIssue(_id)}>
          Delete
      </button>

      {/*update issue function*/}
    <button onClick={()=>UsersContext.openUpdate(_id)}>
          Edit
    </button>
    
    <br/>
    <br/>

    <CommentsForm/>
    <CommentsList/>
    <h1>---------------------------------------------------------</h1>
      
      </div> 



    </div>
  )}

  