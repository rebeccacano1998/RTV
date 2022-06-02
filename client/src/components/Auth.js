import React, { useState, useContext } from 'react'
import AuthForm from './AuthForm.js'
import { UserContext } from '../context/UserProvider.js'

//input object
const initInputs = { username: "", password: "" }

export default function Auth(){


  //this state will hold out initial username and password
  const [inputs, setInputs] = useState(initInputs)

  //will switch between signup and login page
  const [toggle, setToggle] = useState(false)

  //CONTEXT
  const {signup, login,errMsg,resetAuthErr,}=useContext(UserContext)

  //handle inputs
  function handleChange(e){
    const {name, value} = e.target
    setInputs(prevInputs => ({
      //spread in previous inputs and 
      ...prevInputs,
      //update with the event target name and value
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    //inputs will be passed back to our credentials (user provider page) and send post request
      signup(inputs)
  }

  function handleLogin(e){
    e.preventDefault()
    // login
    login(inputs)
  }

  function toggleForm(){
    setToggle(prev => !prev)
    resetAuthErr()
  }

  //depending on toggle status we will eith render sign up page or login
  return (
    <div className="auth-container">
      <h1>Todo App</h1>
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          {/*toggle switch*/}
          <p onClick={toggleForm}>Already a member?</p>
        </>
      :
        <>
          <AuthForm 
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p onClick={toggleForm}>Not a member?</p>
        </>
      }
    </div>
  )
}