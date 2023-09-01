import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const Home = () => {
    return (
    
        <div>
    
  
        <Header/>


      <div className='d-flex my-3'>
     
      <div className='col-md-4'></div>
      
      <div className='col-md-4'>
     
      <button className='btn btn-success'>   <Link className="text-white " to="/adminlogin">
      Admin Login
    </Link> </button>
    <button className='btn btn-danger mx-2'>   <Link className="text-white " to="/caferegister">
      Cafe Register
    </Link> </button>

    <button className="btn btn-primary mx-2 ">
    <Link className="text-white" to="/studentregister">
      Sign up
    </Link>
    
  </button>
      </div>
      
      </div>



        </div>
     
    
    
    )
}

export default Home
