import React, { useState, useContext,useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import Axios from "axios"
import { UsersContext } from '../context/UserProvider'

//description input
const commentInputs = {
    description: "",
    
    
  }

export default function CommentsForm(props){

    const UsersContext=useContext(UserContext)

    //input state
    const [inputs, setInputs] = useState(commentInputs)

    function handleChange(event){
        const {name, value} = event.target
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }))
      }


      function handleSubmit(e){
        e.preventDefault()
        // input will be added to add comment function
        UsersContext.addComment(inputs)
        //set inputs will take in description
        setInputs(commentInputs)
        //send id of issue to backend
        
      }
    
      const {description}=inputs

     
    
   
    
   
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input
                name="description"
                placeholder="comments"
                value={description}
                onChange={handleChange}/>
              
                <button>Submit</button>
            </form>

        </div>
    )

}
  
  