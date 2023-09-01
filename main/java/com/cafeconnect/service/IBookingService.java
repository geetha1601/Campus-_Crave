package com.cafeconnect.service;

import com.cafeconnect.model.Booking;

import java.util.List;

public interface IBookingService {
    //to add booking
    Booking add_booking(Booking booking);

    //to delete booking
    void delete_booking(Long id);

    //to get all bookings
    List<Booking> getAllBooking();

    //to booking by id
    Booking getBookingById(Long id);
}
