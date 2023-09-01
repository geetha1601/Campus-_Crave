import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'

const AdminNav = () => {
    return (
        <div>
        <Header/>
        <div className="lead bg-info my-3 container form-control">
          <nav className="navbar navbar-expand-lg">
          <i className="material-icons fs-1 text-muted ">settings</i>
            <b> <h2 className="text-danger mx-4">Admin</h2></b>
           <b><Link className="p-4 text-danger navbar-brand" to="/">
           Home
         </Link> </b>  
  
           <b><Link className=" text-danger nav-link" to="/aviewcafe">
           Cafe
         </Link> </b>
  
           <b><Link className=" p-4  text-danger nav-link" to="/aviewstudents">
           Student
         </Link></b> 
        
  
            <div className="container mb-3">
              <div className="row"></div>
             <b><Link className="  text-danger nav-link " to="/">
             Log Out
           </Link> </b> 
            </div>
          </nav>
        </div>
      </div>
  
    )
}

export default AdminNav
