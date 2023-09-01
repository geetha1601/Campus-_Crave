package com.cafeconnect.controller;

import com.cafeconnect.model.Cart;
import com.cafeconnect.repository.ICartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(originPatterns = "*")
public class CartController {

    @Autowired
    private ICartRepository cartRepository;

    //to add to cart
    @PostMapping("/cart")
    private ResponseEntity<?> addToCart(@RequestBody Cart cart){
        return new ResponseEntity<>(cartRepository.save(cart), HttpStatus.OK);
    }

    //to update cart
    @PutMapping("/cart")
    private  ResponseEntity<?> updateCart(@RequestBody Cart cart){
        return new ResponseEntity<>(cartRepository.save(cart),HttpStatus.OK);
    }

    //to get cart by id
    @GetMapping("/cart/{id}")
    private ResponseEntity<?> getCartById(@PathVariable Long id){
        return new ResponseEntity<>(cartRepository.findById(id),HttpStatus.OK);
    }

    //to delete cart by id
    @DeleteMapping("/cart/{id}")
    private  ResponseEntity<?> deleteCartById(@PathVariable Long id){
        HashMap<String,String> res=new HashMap<>();
    cartRepository.deleteById(id);
    res.put("meg","cart deleted!");
        return  new ResponseEntity<>(res,HttpStatus.OK);
    }

    //to get all  carts
    @GetMapping("/carts")
    private  ResponseEntity<?> getAllCarts(){
        return new ResponseEntity<>(cartRepository.findAll(),HttpStatus.OK);
    }
}
