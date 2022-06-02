import React, {useState,useEffect} from 'react'
import Axios from 'axios'

//allows us to use provider component in return statement
export const UserContext=React.createContext()
    
    //things to go back and fix
    //clear user inputs
    //delete and edit buttom


const userAxios=Axios.create()

//intercept request and use following configuration
userAxios.interceptors.request.use(config =>{
    const token=localStorage.getItem("token")
    config.headers.Authorization=`Bearer ${token}`
    return config
})

export default function UserProvider(props){
    //this variable will maintain user and token information on the front end
    const initState={
        
        user: JSON.parse(localStorage.getItem("user"))  || {},
        //when refreshed we want data to remain. before setting data to empty string check local stoarge and
        //if getItem token exist use that
        token:localStorage.getItem("token") || "",
        issue:[{
            title:"",
            description:"",
            id:"",
        }],

        comments:[{
            description:""
        }],
        
        errMsg:"",
    }


    const [userState,setUserState]=useState(initState)


   
    //going to recieve username and password credentials from the authentication forms
    function signup(credentials){
        Axios.post("/auth/signup",credentials)
            .then(res=>{
                //deconstruct --take user and token from state
                const {user,token}=res.data
                //save info in local storage
                localStorage.setItem("token",token)
                //objects and arrays must be turned into json
                localStorage.setItem("user",JSON.stringify(user))
                setUserState(prevUserState=>({
                    //spread in prev user state
                    ...prevUserState,
                    //update user and token for signup purposes
                    user,
                    token
                }))
            })
            .catch(err=>handleAuthErr(err.response.data.errMsg))
    }

    function login(credentials){
        Axios.post("/auth/login",credentials)
        .then(res=>{          
        //deconstruct --take user and token from state
        const {user,token}=res.data
        //save info in local storage
        localStorage.setItem("token",token)
        //objects and arrays must be turned into json
        localStorage.setItem("user",JSON.stringify(user))
        getUserIssue()
        getUserComments()
        setUserState(prevUserState=>({
            //spread in prev user state
            ...prevUserState,
            //update user and token for login purposes
            user,
            token
        }))

        })
        .catch(err=>handleAuthErr(err.response.data.errMsg))
            
    }

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem('user')
        //set user state back to blank to logout 
        setUserState({
            user:{},
            token:"",
            issue:[{
                title:"",
                description:"",
                id:""
            }],

            comments:[{
                description:""
            }],
            
        })
    }

    function handleAuthErr(errMsg){
        setUserState(prevState =>({
            ...prevState,
            errMsg
        }))


    }

    function resetAuthErr(errMsg){
        setUserState(prevState=>({
            ...prevState,
            errMsg
        }))
    }


//P
    function getUserIssue(){
        userAxios.get("/api/issues/user")
        .then(res =>{
            setUserState(prevState =>({
                ...prevState,
                //initial get request
                issue:res.data,
                comments:res.data

            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    //new issue 
    function addIssue(newIssue){
         userAxios.post("/api/issues",newIssue)
            .then(res =>{
                setUserState(prevState=>({
                    //spread in prvious state
                   ...prevState,
                   //previous state and new issues will be added 
                   issue:[...prevState.issue,res.data]
                   
                }))
            })

           

            .catch(err => console.log(err.response.data.errMsg))

           

    }
 

      //delete issue
      function deleteIssue(id){
        
        userAxios.delete("/api/issues/"+id)
        .then((res) => getUserIssue())
        .catch(err=>console.log(err))
    }

    //keeps state upon refresh
    React.useEffect(() => {
        const data = localStorage.getItem("my-issues");
        if (data) {
          setUserState(JSON.parse(data));
        }
      }, []);
    
      React.useEffect(() => {
        localStorage.setItem("my-issues", JSON.stringify(userState));
      });
    //-----------------------------------------------------------------------------------------
  

    

    const [isEditing,setIsEditing]=useState(false)
    

    const [updatedIssue, setUpdatedIssue]=useState({

        title:"",
        description:"",
        id:""
    
    })


    function openUpdate(id){
        setIsEditing(true)
        setUpdatedIssue(Input=>{
            return({
                ...Input,
                id:id
            }
         )
        })
    }
    
    
    //set is editing back to false
    function editIssue(id){
        userAxios.put("/api/issues/"+id,updatedIssue)
        .then((res) => {
            console.log(res);
            getUserIssue();
            setIsEditing(false)
          })
          .catch((err) => console.log(err));
    }
        
   
    function handleUpdate(event){
        const {name,value}=event.target
        setUpdatedIssue(prevInput=>{
            return({
                ...prevInput,
                [name]:value
            })
        })
    
    }
  
    //**********************************************************************************************************************/
    //**********************************************************************************************************************/
    //**********************************************************************************************************************/


    function getUserComments(){
        userAxios.get("/api/comments/user")
        .then(res =>{
            setUserState(prevState =>({
                ...prevState,
                //initial get request
                //issue:res.data,
                comments:res.data

            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }
    
    function addComment(newComments){
        //pass in id of issue
        userAxios.post("/api/comments/:issuesId",newComments)
           .then(res =>{
               console.log(res)
               setUserState(prevState=>({
                   //spread in prvious state
                  ...prevState,
                  //previous state and new issues will be added 
                  comments:[...prevState.comments,res.data],
                  
                  }))
           })

          
          .catch(err => console.log(err.response.data.errMsg))
           
        }
        



    
   
    
    

    
    

    
    

return(
<UserContext.Provider 
value={{
    ...userState,
    signup,
    login,
    logout,
    addIssue,
    deleteIssue,
    isEditing,
    editIssue,
    handleUpdate,
    openUpdate,
    updatedIssue,
    resetAuthErr,
   

    addComment,
    userState
   
    
    //...comments,
    


}}>

{props.children}

</UserContext.Provider>
)}

