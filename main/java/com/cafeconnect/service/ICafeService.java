package com.cafeconnect.service;

import com.cafeconnect.exception.CafeNotFoundException;
import com.cafeconnect.model.Cafe;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ICafeService {

    //to add Cafe
    Cafe addCafeWithPhoto(Cafe cafe, MultipartFile image);

    Cafe addCafe(Cafe cafe);

    //to update cafe
    Cafe updateCafe(Cafe cafe) throws CafeNotFoundException;

    //to update cafe with photo
    Cafe updateCafeWithPhoto(Cafe cafe, MultipartFile file);

    //get cafe by id
    Optional<Cafe> getCafeById(Long id) throws CafeNotFoundException;

    //delete cafe by id
    void deleteCafeById(Long id) throws CafeNotFoundException;

    //get all cafes
    List<Cafe> getAllCafes() throws CafeNotFoundException;


    //to login cafe
    Cafe getCafeByEmailAndPassword(String email, String password) throws CafeNotFoundException;


    //to check whether this name email cafe is already exist
    Cafe getCafeByEmail(String email);


}
