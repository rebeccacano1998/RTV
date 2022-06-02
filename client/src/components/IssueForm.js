import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'

const initInputs = {
  title: "",
  description: "",
  
}

export default function IssueForm(props){
  const [inputs, setInputs] = useState(initInputs)
  
  function handleChange(event){
    const {name, value} = event.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSubmit(e){
    e.preventDefault()
    // add issue
    addIssue(inputs)
    setInputs(initInputs)
    
  }

  const UsersContext=useContext(UserContext)

  const { title, description } = inputs

  const {addIssue}=props
  
  


  


  


return (
    <>
    
     {/*if we are not editing*/}
      {!UsersContext.isEditing ?
      <>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"/>
      
      <button>Add Political Issue</button>
  
      

    </form> 
      </>
            :
    <>
   <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={UsersContext.updatedIssue.title} 
        onChange={UsersContext.handleUpdate} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={UsersContext.updatedIssue.description} 
        onChange={UsersContext.handleUpdate} 
        className="description"
        placeholder="Description"/>
      
        
      <button onClick={()=>UsersContext.editIssue(UsersContext.updatedIssue.id)}>
        Upload New
      </button>

      

    </form>
    </>

  }


</>
  
  )
}