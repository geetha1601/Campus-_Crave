package com.cafeconnect.service.impl;

import com.cafeconnect.exception.CafeNotFoundException;
import com.cafeconnect.model.Cafe;
import com.cafeconnect.repository.ICafeRepository;
import com.cafeconnect.service.ICafeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Optional;

@Service
public class CafeServiceImpl implements ICafeService {

    @Autowired
    private ICafeRepository cafeRepository;

    @Override
    public Cafe addCafeWithPhoto(Cafe cafe, MultipartFile image) {
        return cafeRepository.save(cafe);
    }

    @Override
    public Cafe addCafe(Cafe cafe) {
        return cafeRepository.save(cafe);
    }

    @Override
    public Cafe updateCafe(Cafe cafe) throws CafeNotFoundException {
        return cafeRepository.save(cafe);
    }

    @Override
    public Cafe updateCafeWithPhoto(Cafe cafe, MultipartFile file) {
        return cafeRepository.save(cafe);
    }

    @Override
    public Optional<Cafe> getCafeById(Long id) throws CafeNotFoundException {
        return cafeRepository.findById(id);
    }

    @Override
    public void deleteCafeById(Long id) throws CafeNotFoundException {
 cafeRepository.deleteById(id);
    }

    @Override
    public List<Cafe> getAllCafes() throws CafeNotFoundException {
        return cafeRepository.findAll();
    }

    @Override
    public Cafe getCafeByEmailAndPassword(String email, String password) throws CafeNotFoundException {
        return cafeRepository.getCafeByEmailAndPassword(email, password);
    }

    @Override
    public Cafe getCafeByEmail(String email) {
        return cafeRepository.getCafeByEmail(email);
    }

}
