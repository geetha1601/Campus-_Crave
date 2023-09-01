package com.cafeconnect.repository;

import com.cafeconnect.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStudentRepository  extends JpaRepository<Student,Long> {

    //to login
    Student findStudentByEmailAndPassword(String email,String password);


    //to check same name email is it exist already
    Student getStudentByEmail(String email);
}
