package com.cafeconnect.service.impl;

import com.cafeconnect.exception.ItemNotFoundException;
import com.cafeconnect.model.Item;
import com.cafeconnect.repository.IItemRepository;
import com.cafeconnect.service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ItemServiceImpl  implements IItemService {

    @Autowired
    private IItemRepository itemRepository;

    @Override
    public Item addItems(Item item) throws ItemNotFoundException {
        return itemRepository.save(item);
    }

    @Override
    public Item addItemsToMenuWithPhoto(Item item, MultipartFile file) throws ItemNotFoundException {
        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(Item item) throws ItemNotFoundException {
        return itemRepository.save(item);
    }

    @Override
    public Item updateItemWithPhoto(Item item, MultipartFile file) throws ItemNotFoundException {
        return itemRepository.save(item);
    }

    @Override
    public Item getItemById(Long id) throws ItemNotFoundException {
        return itemRepository.findById(id).get();
    }

    @Override
    public void deleteItemById(Long id) throws ItemNotFoundException {
itemRepository.deleteById(id);
    }

    @Override
    public List<Item> getAllItems() throws ItemNotFoundException {
        return itemRepository.findAll();
    }
}
