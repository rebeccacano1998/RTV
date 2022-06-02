import React from 'react'

export default function AuthForm(props){
  //destructuring props object
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    errMsg,
    //destructuring nested object
    inputs: {
      username, 
      password,
      
    } 
  } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Username"/>
      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Password"/>
      <button>{ btnText }</button>
      <p style={{color:"red"}}>{errMsg}</p>
    </form>
  )
}
