import React,{useContext} from 'react'
import Issue from './Issue.js'
import { UserContext } from '../context/UserProvider'


export default function IssueList(props){
  const UsersContext=useContext(UserContext)
  
  //return our issue and spread in all properties of current issue
  //map through items so they continue to get re-rendered
  return (
    <div className="issue-list">

      {UsersContext.issue.map(issue=><Issue {...issue} key={issue._id}/>)}
    </div>
  )
}