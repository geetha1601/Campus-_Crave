package com.cafeconnect.controller;


import com.cafeconnect.model.Booking;
import com.cafeconnect.model.Item;
import com.cafeconnect.model.Student;
import com.cafeconnect.service.impl.StudentServiceImpl;
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
public class StudentController {


    @Autowired
private StudentServiceImpl studentService;



    //student with photo
    @PostMapping("/studentPhoto")
    private ResponseEntity<?> registerStudentByPhoto(MultipartFile image, String firstName, String lastName, String email, String password,String contact){
        HashMap<String,String> res=new HashMap<>();
        String filePath= Paths.get("").toAbsolutePath().toString();
        Path actualFilePath=Paths.get(filePath,"src","main","resources","static","images",image.getOriginalFilename());
        try{
            image.transferTo(actualFilePath);
            Student student=Student.builder()
                    .image(image.getOriginalFilename())
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .password(password)
                    .contact(contact)
                    .build();
            System.out.println(student);
            return new ResponseEntity<>(studentService.regStudent(student),HttpStatus.OK);
        }catch (Exception e){
            res.put("Error",e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }



    //student with photo
    @PutMapping ("/studentPhoto")
    private ResponseEntity<?> updateStudentPhoto(MultipartFile image, String firstName, String lastName, String email, String password,String contact){
        HashMap<String,String> res=new HashMap<>();
        String filePath= Paths.get("").toAbsolutePath().toString();
        Path actualFilePath=Paths.get(filePath,"src","main","resources","static","images",image.getOriginalFilename());
        try{
            image.transferTo(actualFilePath);
            Student student=Student.builder()
                    .image(image.getOriginalFilename())
                    .firstName(firstName)
                    .lastName(lastName)
                    .email(email)
                    .password(password)
                    .contact(contact)
                    .build();
            System.out.println(student);
            return new ResponseEntity<>(studentService.updateStudent(student),HttpStatus.OK);
        }catch (Exception e){
            res.put("Error",e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }



    //to get cafe by id
    @GetMapping("/student/{id}")
    private ResponseEntity<?> getStudentById(@PathVariable Long id){
        HashMap<String,String> res=new HashMap<>();
        try{
            return new ResponseEntity<>(studentService.getStudentById(id), HttpStatus.OK);
        }catch (Exception e){
            res.put("error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.OK);
        }
    }

    // delete by id
    @DeleteMapping("/student/{id}")
    private ResponseEntity<?> deleteStudentById(@PathVariable Long id){
        HashMap<String,String> res=new HashMap<>();
        try{
            studentService.deleteStudentById(id);
            res.put("meg","student deleted successfully!");
            return new ResponseEntity<>(res,HttpStatus.OK);
        }catch (Exception e){
            res.put("error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //to get all cafe
    @GetMapping("/students")
    private ResponseEntity<?> getListStudents(){
        try{
            return new ResponseEntity<>(studentService.getAllStudents(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
