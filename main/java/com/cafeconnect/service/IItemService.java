package com.cafeconnect.service;

import com.cafeconnect.exception.ItemNotFoundException;
import com.cafeconnect.model.Item;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface IItemService {
    //to add item to menu
    Item addItems(Item item)  throws ItemNotFoundException;

    //to add item to menu
    Item addItemsToMenuWithPhoto(Item item, MultipartFile file)  throws ItemNotFoundException;

    //to update item
    Item updateItem(Item item)  throws ItemNotFoundException;



    //to update item with photo
    Item updateItemWithPhoto(Item item, MultipartFile file)  throws ItemNotFoundException;

    //to get item by id
    Item getItemById(Long id)  throws ItemNotFoundException;

    //to delete item by id
    void deleteItemById(Long id)  throws ItemNotFoundException;

    //to get all items
    List<Item> getAllItems() throws ItemNotFoundException;
}
