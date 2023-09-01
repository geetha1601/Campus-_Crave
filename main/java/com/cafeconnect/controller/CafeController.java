package com.cafeconnect.controller;


import com.cafeconnect.model.Cafe;
import com.cafeconnect.service.impl.CafeServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;


@RestController
@CrossOrigin(originPatterns = "*")
public class CafeController {


    @Autowired
    private CafeServiceImpl cafeService;

    //Cafe with photo
    @PostMapping("/cafePhoto")
    private ResponseEntity<?> addCafe(MultipartFile image, String name, String email, String password, String document) {
        String filepath= Paths.get("").toAbsolutePath().toString();
        Path actualFilepath=Paths.get(filepath,"src","main","resources","static","images" , image.getOriginalFilename());
        try {
            image.transferTo(actualFilepath);
            Cafe cafe = Cafe.builder()
                    .image(image.getOriginalFilename())
                    .name(name)
                    .email(email)
                    .password(password)
                    .document(document)
                    .build();
            System.out.println(cafe);
   return new ResponseEntity<>(cafeService.addCafe(cafe),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // update Cafe with photo
    @PutMapping("/cafePhoto")
    private ResponseEntity<?> updateCafe(MultipartFile image, String name, String email, String password, Long id) {
        String filepath= Paths.get("").toAbsolutePath().toString();
        Path actualFilepath=Paths.get(filepath,"src","main","resources","static","images" , image.getOriginalFilename());
        try {
            image.transferTo(actualFilepath);
            Cafe cafe = Cafe.builder()
                    .image(image.getOriginalFilename())
                    .id(id)
                    .name(name)
                    .email(email)
                    .password(password)

                    .build();
            System.out.println(cafe);
            return new ResponseEntity<>(cafeService.updateCafe(cafe),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //to get cafe by id
    @GetMapping("/cafe/{id}")
    private ResponseEntity<?> getCafeById(@PathVariable Long id){
        HashMap<String,String> res=new HashMap<>();
        try{
            return new ResponseEntity<>(cafeService.getCafeById(id),HttpStatus.OK);
        }catch (Exception e){
            res.put("error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.OK);
        }
    }

    // delete by id
    @DeleteMapping("/cafe/{id}")
    private ResponseEntity<?> deleteCafeById(@PathVariable Long id){
        HashMap<String,String> res=new HashMap<>();
        try{
            cafeService.deleteCafeById(id);
            res.put("meg","Cafe deleted successfully!");
            return new ResponseEntity<>(res,HttpStatus.OK);
        }catch (Exception e){
            res.put("error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //to get all cafe
    @GetMapping("/cafes")
    private ResponseEntity<?> getListOfCafe(){
        try{
            return new ResponseEntity<>(cafeService.getAllCafes(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
