import React from 'react'
import { Route, Navigate } from 'react-router-dom'

export default function ProtectedRoute(props){
    //We can use Navigate to redirect an unauthenticated user back to the login page using the “to” prop. 
    //However, if the user is authenticated and does in fact have a token, we can render the protected 
    //component which we have access to through props.children
    
  const { token, redirectTo, children } = props
  return token ? children : <Navigate to={redirectTo}/> 
}