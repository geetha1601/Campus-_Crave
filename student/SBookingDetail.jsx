import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StudentNav from '../../components/student/StudentNav'


const SBookingDetail = () => {

    const[vehicle,setVehicle]=useState([])
    const[isData,setIsData]=useState(false)

    const navigate=useNavigate()

    const getBookings = async()=>{
        try{
             await axios.get(`http://localhost:8080/bookings`)
             .then((res)=>{
                if(res.data.length>0){
                    setVehicle(res.data);
                    setIsData(true)
                }
             })
     
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
      getBookings()
    }, [])


  


    function BookingTable(vehicle){
        return(
            <tr  >
            <td>{vehicle.id}</td>
            <td>
            <img
            src={`http://${window.location.hostname}:8080/images/${vehicle.image}`}
            alt="cafe"
            height={100}
            width={200} 
          />
            </td>
          <td>{vehicle.name}</td>
          <td className='text-success'>{vehicle.category}</td>
            <td className='text-secondary'>{vehicle.price +" ₹" } </td>
        
            <td  className='text-primary'>{vehicle.quantity}</td>
            <td>{vehicle.requestTime}</td>
            <td>{vehicle.acceptTime}</td>
            <td>{vehicle.onDate}</td>
           <td className='text-info'>{vehicle.orderTime}</td>
           <td >{vehicle.bookingDate}   <i className='far fa-clock fs-5' ></i></td>
           <td className='text-success'>{vehicle.cardNumber }</td>
           <td className='text-danger'>{vehicle.totalAmount +" ₹"}</td>
    
     
            </tr>
        )
    }

    return (
        <div>
        <div>
       <StudentNav/>
        </div>
        <div className='form-control'>
       <h2 className='bg-info text-center text-danger' > Booking Detail's</h2>
            {isData ?(
                <table className='table table-striped table-hover'>
                <thead>
                <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                 <th>Quantity</th>
                <th>Request Time</th>
                <th>Accepted Time</th>
                <th>Wish Date</th>
                <th>Delivery Time</th>
                <th>Booking Time</th>
                <th>Card No.</th>
                <th className='text-danger '>Total Amuont(₹) </th>
           
                </tr>
                </thead>
                <tbody>{isData ? vehicle.map(BookingTable):null}</tbody>
                </table>
            ):(
                <center>
                <h4>No data found</h4>
                </center>
            )

            }
        </div>
        </div>
    )
}

export default SBookingDetail;
