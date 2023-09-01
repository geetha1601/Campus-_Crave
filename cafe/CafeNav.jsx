import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'

const CafeNav = () => {
    return (
        <div>
        <Header/>
        <div className="lead bg-success my-3 container form-control">
          <nav className="navbar navbar-expand-lg">
          <i className="fa fa-home fs-1 text-warning mx-2"></i>
            <h2 className="text-white">Cafe</h2>
            <Link className="p-4 text-white navbar-brand" to="/">
              Home
            </Link>

            <Link className=" text-white nav-link" to="/cviewfood">
            Menu
          </Link>

  
            <Link className=" text-white nav-link" to="/vieworder">
              Order
            </Link>
  
            <Link className=" p-4 text-white nav-link" to="/caccept">
              Accepted
            </Link>
            
            <Link className=" p-4 text-white nav-link" to="/cviewbooking">
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



export default CafeNav

