package com.cafeconnect.service.impl;

import com.cafeconnect.model.Booking;
import com.cafeconnect.repository.IBookingRepository;
import com.cafeconnect.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl  implements IBookingService {

    @Autowired
    private IBookingRepository bookingRepository;

    @Override
    public Booking add_booking(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public void delete_booking(Long id) {
   bookingRepository.deleteById(id);
    }

    @Override
    public List<Booking> getAllBooking() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).get();
    }
}
