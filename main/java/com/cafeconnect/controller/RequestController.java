package com.cafeconnect.controller;

import com.cafeconnect.model.Request;
import com.cafeconnect.repository.IRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin(originPatterns = "*")
public class RequestController {

    @Autowired
    private IRequestRepository requestService;

    @PostMapping("/request")
    private ResponseEntity<?> addRequest(@RequestBody Request request) {
        return new ResponseEntity<>(requestService.save(request), HttpStatus.OK);
    }
    @PutMapping("/request/{id}")
    private ResponseEntity<?> updateRequest(@RequestBody  Request request){
        return new ResponseEntity<>(requestService.save(request), HttpStatus.OK);
    }

    @PatchMapping("/request/{isAccepted}/{id}/{acceptTime}" )
            private ResponseEntity<?> updateOrder(@PathVariable boolean  isAccepted , @PathVariable Long id,@PathVariable  String acceptTime)
    {
          try
          {
                 Request req=requestService.findById(id).get();
                  req.setAccepted(isAccepted);
                  req.setAcceptTime(acceptTime);
                  return new ResponseEntity<>(requestService.save(req),HttpStatus.OK);

          }
          catch(Exception e)
          {
              return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
          }
    }

    @GetMapping("/request/{id}")
    private ResponseEntity<?> getReq(@PathVariable Long id) {
        return new ResponseEntity<>(requestService.findById(id), HttpStatus.OK);
    }

    @GetMapping("/requests")
    private ResponseEntity<?> getAllReq() {
        return new ResponseEntity<>(requestService.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/request/{id}")
    private ResponseEntity<?> cancelReq(@PathVariable Long id) {
        HashMap<String, String> res = new HashMap<>();
        try {
            requestService.deleteById(id);
            res.put("meg", "deleted");
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getLocalizedMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
