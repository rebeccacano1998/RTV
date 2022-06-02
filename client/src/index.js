import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import App from './App.js'
import './css/styles.css'
import UserProvider from './context/UserProvider.js'

const container=document.getElementById('root')
const root = ReactDOM.createRoot(container);

root.render(
    
    <BrowserRouter>
        <UserProvider>
        <App />
        </UserProvider>
     
    </BrowserRouter>
);
