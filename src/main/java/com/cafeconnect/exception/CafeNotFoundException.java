package com.cafeconnect.exception;

public class CafeNotFoundException  extends  RuntimeException   {
    public CafeNotFoundException(String message) {
        super(message);
    }

    public  CafeNotFoundException(){

    }
}
