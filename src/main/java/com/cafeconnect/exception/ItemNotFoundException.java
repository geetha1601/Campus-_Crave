package com.cafeconnect.exception;

public class ItemNotFoundException extends  RuntimeException {
    public ItemNotFoundException(String message) {
            super (message);
    }

    public ItemNotFoundException() {

    }
}
