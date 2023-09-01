import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'

const StudentNav = () => {
    return (
        <div>
        <Header/>
        <div className="lead bg-secondary my-3 container form-control">
          <nav className="navbar navbar-expand-lg">
          <i className="material-icons fs-1 text-info mx-2">account_circle</i>
            <h2 className="text-white ">  Student</h2>
            <Link className="p-4 text-white navbar-brand" to="/">
              Home
            </Link>


            <Link className=" text-white nav-link" to="/sviewcafe/:email">
            Cafe
          </Link>

  
            <Link className=" text-white nav-link" to="/srequested">
              Requested
            </Link>
  
            <Link className=" p-4 text-white nav-link" to="/sacceptorder">
              Accepted
            </Link>

            <Link className=" p-4 text-white nav-link" to="/smycart">
            MyCart
          </Link>
            
            <Link className=" p-4 text-white nav-link" to="/sviewbooking">
              Booking
            </Link>
        
  
            <div className="container mb-3">
              <div className="row"></div>
              <Link className=" text-white nav-link " to="/">
                Log Out
              </Link>
            </div>
          </nav>
        </div>
      </div>
  
    )
}



export default StudentNav

