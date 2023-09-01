package com.cafeconnect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;
    private String quantity;
    private String price;
    private String category;
    private String image;

    private String onDate;

    private String orderTime;
    private  String requestTime;
    private  String acceptTime;

    private String bookingDate;

    private String cardNumber;
    private String cvv;
    private String   expiryDate;

    private String totalAmount;

    private String cafeEmail;

    private String studentEmail;

    private boolean isAccepted=false;

}
