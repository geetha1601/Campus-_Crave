package com.cafeconnect.controller;

import com.cafeconnect.model.Cafe;
import com.cafeconnect.model.Item;
import com.cafeconnect.service.impl.ItemServiceImpl;

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
public class ItemController {



    @Autowired
    private ItemServiceImpl itemService;

//to add items to menu with photo
    @PostMapping("/itemPhoto")
    private ResponseEntity<?> addItemsToCart(MultipartFile image,String quantity,String price,String category,String name,String email){
        HashMap<String,String> res=new HashMap<>();
        String filePath=Paths.get("").toAbsolutePath().toString();
        Path actualFilePath=Paths.get(filePath,"src","main","resources","static","images",image.getOriginalFilename());
        try{
      image.transferTo(actualFilePath);
        Item item=Item.builder()
                .image(image.getOriginalFilename())
                .email(email)
                .name(name)
                .quantity(quantity)
                .price(price)
                .category(category)
                .build();
        System.out.println(item);
                return new ResponseEntity<>(itemService.addItems(item),HttpStatus.OK);
        }catch (Exception e){
            res.put("Error",e.getLocalizedMessage());
            return new ResponseEntity<>(res, HttpStatus.OK);
        }
    }

    // update Cafe with photo
    @PutMapping("/itemPhoto")
    private ResponseEntity<?> updateCafe(MultipartFile image, String name, String quantity, String price, String category) {
        String filepath= Paths.get("").toAbsolutePath().toString();
        Path actualFilepath=Paths.get(filepath,"src","main","resources","static","images" , image.getOriginalFilename());
        try {
             image.transferTo(actualFilepath);
              Item item = Item.builder()
                     .image(image.getOriginalFilename())
                      .name(name)
                      .quantity(quantity)
                      .price(price)
                      .category(category)
                      .build();

            System.out.println(item);
            return new ResponseEntity<>(itemService.updateItem(item),HttpStatus.OK);
        }
        catch(Exception e)
        {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //to get item by id
    @GetMapping("/item/{id}")
    private ResponseEntity<?> getItemById(@PathVariable Long id){
        HashMap<String,String> res=new HashMap<>();
        try{
            return new ResponseEntity<>(itemService.getItemById(id),HttpStatus.OK);
        }catch (Exception e){
            res.put("error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.OK);
        }
    }

    // delete  item by id
    @DeleteMapping("/item/{id}")
    private ResponseEntity<?> deleteItem(@PathVariable Long id){
        HashMap<String,String> res=new HashMap<>();
        try{
            itemService.deleteItemById(id);
            res.put("meg","item deleted successfully!");
            return new ResponseEntity<>(res,HttpStatus.OK);
        }catch (Exception e){
            res.put("error",e.getLocalizedMessage());
            return new ResponseEntity<>(res,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //to get all items
    @GetMapping("/items")
    private ResponseEntity<?> getListOfItems(){
        try{
            return new ResponseEntity<>(itemService.getAllItems(),HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e.getLocalizedMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
