import React,{useContext} from 'react'
import {Route,Routes,Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import { UserContext } from './context/UserProvider.js'
import ProtectedRoute from './components/ProtectedRoute.js'

export default function App(){
  const {token,logout}=useContext(UserContext)
  return (
    //if there a token render nav bar

    <div className="app">
      
      <Navbar logout={logout} token={token}/>
      <Routes>
        
        <Route 
          exact path="/" 
          element={ token ? <Navigate to="/profile"/> : <Auth /> }
        />

      
      <Route 
          exact path="/profile"
          element={ <Profile />}
        />
        <Route 
          exact path="/public"
          element={ <Public />}
        />
         
      </Routes>
 
    </div>
  )
}