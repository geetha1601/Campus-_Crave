package com.cafeconnect.controller;

import com.cafeconnect.model.Booking;
import com.cafeconnect.service.impl.BookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(originPatterns = "*")
public class BookingController {

    @Autowired
    private BookingServiceImpl bookingService ;



    //to post booking
    @PostMapping("/booking")
    private ResponseEntity<?> addBooking(@RequestBody Booking booking) {
        HashMap<String, String> res = new HashMap<>();
        try {
            return new ResponseEntity<>(bookingService.add_booking(booking), HttpStatus.OK);
        } catch (Exception e) {
            res.put("Error", e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    //to delete booking by id
    @DeleteMapping("/booking/{id}")
    private ResponseEntity<?> deleteBookingById(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            bookingService.delete_booking(id);
            res.put("meg", "Deleted successfully!");
            return new ResponseEntity<>(res, HttpStatus.OK);
        }catch (Exception e){
            res.put("Error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //to get post by id
    @GetMapping("/booking/{id}")
    private ResponseEntity<?> getBookingById(@PathVariable Long id){
        HashMap<String,String> res=new HashMap<>();
        try{
            return new ResponseEntity<>(bookingService.getBookingById(id) ,HttpStatus.OK);
        }catch (Exception e){
            res.put("Error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //to get all bookings
    @GetMapping("/bookings")
    private ResponseEntity<?> getAllBookings(){
        HashMap<String,String> res=new HashMap<>();
        try{
            return new ResponseEntity<>(bookingService.getAllBooking(),HttpStatus.OK);
        }catch (Exception e){
            res.put("Error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
