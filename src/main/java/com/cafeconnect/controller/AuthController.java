package com.cafeconnect.controller;

import com.cafeconnect.dto.Login;
import com.cafeconnect.repository.ICafeRepository;
import com.cafeconnect.service.impl.CafeServiceImpl;
import com.cafeconnect.service.impl.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@CrossOrigin(originPatterns = "*")
public class AuthController {

    @Autowired
    private StudentServiceImpl studentService;

    @Autowired
    private CafeServiceImpl cafeService;

    //to login admin
    @PostMapping("/adminLogin")
    private ResponseEntity<?> adminLogin(@RequestBody Login login) {
        HashMap<String,String> res=new HashMap<>();
        try{
            if(login.getEmail().equals("admin@gmail.com") && login.getPassword().equals("admin")){
                return new ResponseEntity<>(login, HttpStatus.OK);
            }
            return new ResponseEntity<>("Invalid Credentials",HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //to login
    @PostMapping("/studentLogin")
    private ResponseEntity<?> studentLogin(@RequestBody Login login)
    {
        HashMap<String,String> res=new HashMap<>();
        try
        {
            if(studentService.findStudentByEmailAndPassword(login.getEmail(),login.getPassword()) !=null)
            {
                res.put("message","success");
                return new ResponseEntity<>(login,HttpStatus.OK);
            }
            else
            {
                res.put("error","fail");
                return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //to cafe login

    @PostMapping("/cafeLogin")
    private ResponseEntity<?> cafeLogin(@RequestBody Login login)
    {
        HashMap<String,String> res=new HashMap<>();
        try
        {
            if(cafeService.getCafeByEmailAndPassword(login.getEmail(),login.getPassword()) !=null)
            {
                res.put("message","success");
                return new ResponseEntity<>(login,HttpStatus.OK);
            }
            else
            {
                res.put("error","fail");
                return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
