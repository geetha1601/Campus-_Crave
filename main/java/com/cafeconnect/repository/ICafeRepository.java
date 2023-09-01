package com.cafeconnect.repository;

import com.cafeconnect.exception.StudentNotFoundException;
import com.cafeconnect.model.Cafe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICafeRepository  extends JpaRepository<Cafe,Long> {

    //to login cafe
    Cafe getCafeByEmailAndPassword(String email,String password) throws StudentNotFoundException;

    //to check whether this name email is already exist'
    Cafe getCafeByEmail( String email);

}
