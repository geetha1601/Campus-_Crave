import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import AdminLogin from "./components/admin/AdminLogin";
import StudentLogin from "./components/student/StudentLogin";
import CafeLogin from "./components/cafe/CafeLogin";
import AdminNav from "./components/admin/AdminNav";
import CafeNav from "./components/cafe/CafeNav";
import StudentNav from "./components/student/StudentNav";
import AddCafe from "./pages/admin/AddCafe";
import ViewCafe from "./pages/admin/ViewCafe";
import EditCafe from "./pages/admin/EditCafe";
import AddFood from "./pages/cafe/AddFood";
import SViewCafe from "./pages/student/SViewCafe";
import EditFood from "./pages/cafe/EditFood";
import CViewFood from "./pages/cafe/CViewFood";
import Srequested from "./pages/student/SRequested";
import SViewFood from "./pages/student/SViewFood";
import Order from "./pages/cafe/Order";
import CAccept from "./pages/cafe/CAccept";
import Saccept from "./pages/student/Saccept";
import Payment from "./pages/student/Payment";
import Mybooking from "./pages/student/MyBooking";
import CBooking from "./pages/cafe/CBooking";
import MyCart from "./pages/student/MyCart";
import UpdateRequest from "./pages/student/UpdateRequest";
import RequestDetail from "./pages/student/RequestDetail";
import ViewStudents from "./pages/admin/ViewStudents";
import StudentPhoto from "./components/student/StudentPhoto";
import UpdateCart from "./pages/student/UpdateCart";
import SBookingDetail from "./pages/student/SBookingDetail";
import CafeRegister from "./components/cafe/CafeRegister";



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
            


          <Route exact path="/header" element={<Header />}/>
            

          <Route exact path="/adminnav" element={<AdminNav />}/>
            

          <Route exact path="/cafenav" element={<CafeNav />}/>
  
          <Route exact path="/studentnav" element={<StudentNav />}/>
 


          <Route exact path="/adminlogin" element={<AdminLogin />}/>

 
          <Route exact path="/cafelogin" element={<CafeLogin />}/>
   
          <Route exact path="/studentlogin" element={<StudentLogin />}/>
  
        
     

          {/* Admin*/}
          <Route exact path="/addcafe" element={<AddCafe />}/>
            
          <Route exact path="/aviewcafe" element={<ViewCafe />}/>
            
          <Route exact path="/aeditcafe/:id" element={<EditCafe />}/>
          <Route exact path="/aviewstudents" element={<ViewStudents />}/>
       
      
          {/* Cafe owner*/}
          <Route exact path="/caddfood" element={<AddFood />}/>
          <Route exact path="/ceditfood/:id" element={<EditFood />}/>
          <Route exact path="/cviewfood" element={<CViewFood />}/> 
          <Route exact path="/vieworder" element={<Order />}/>
          <Route exact path="/caccept" element={<CAccept/>}/>
          <Route exact path="/cviewbooking" element={<CBooking />}/>
          <Route exact path="/caferegister" element={<CafeRegister />}/>

          {/* Student*/}
          <Route exact path="/sviewcafe/:mail" element={<SViewCafe />}/>
          <Route exact path="/srequested" element={<Srequested />}/>
          <Route exact path="/updaterequest/:mail" element={<UpdateRequest />}/>
          <Route exact path="/sviewfood/:mail" element={<SViewFood />}/>
          <Route exact path="/ask/:id/:cmail" element={<RequestDetail />}/>
          <Route exact path="/sacceptorder" element={<Saccept />}/>
          <Route exact path="/payment/:id" element={<Payment />}/>
          <Route exact path="/sviewbooking" element={<Mybooking />}/>
          <Route exact path="/smycart" element={<MyCart />}/>
          <Route exact path="/studentregister" element={<StudentPhoto />}/>
          <Route exact path="/updatecart" element={<UpdateCart />}/>
          <Route exact path="/sbookingdetails/:id" element={<SBookingDetail />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
