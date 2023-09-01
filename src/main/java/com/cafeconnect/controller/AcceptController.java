package com.cafeconnect.controller;

import com.cafeconnect.model.Accept;
import com.cafeconnect.repository.IAcceptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(originPatterns = "*")
public class AcceptController {

    @Autowired
    private IAcceptRepository acceptService;

    @PostMapping("/accept")
    private ResponseEntity<?> addAccept(@RequestBody Accept accept){
        return new ResponseEntity<>(acceptService.save(accept), HttpStatus.OK);
    }


    @PutMapping("/accept/{id}")
    private ResponseEntity<?> updateAccept(@RequestBody Accept accept){
        return new ResponseEntity<>(acceptService.save(accept), HttpStatus.OK);
    }

    @GetMapping("/accept/{id}")
    private ResponseEntity<?> getAcceptById(@PathVariable Long id){
        return new ResponseEntity<>(acceptService.findById(id),HttpStatus.OK);
    }

    @GetMapping("/accepts")
    private ResponseEntity<?> getAllAccepts(){
        return new ResponseEntity<>(acceptService.findAll(),HttpStatus.OK);
    }

    @DeleteMapping("/accept/{id}")
    private ResponseEntity<?> cancelAcc(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            acceptService.deleteById(id);
            res.put("meg", "deleted");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
