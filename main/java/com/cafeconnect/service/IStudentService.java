package com.cafeconnect.service;

import com.cafeconnect.exception.StudentNotFoundException;
import com.cafeconnect.model.Student;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IStudentService {
    //to register student
    Student regStudent(Student student) throws StudentNotFoundException;

    //to register student with photo
    Student regStudent(Student student, MultipartFile file) throws StudentNotFoundException;

    //to update student
    Student updateStudent(Student student) throws StudentNotFoundException;

    //to update student
    Student updateStudentWithPhoto(Student student,MultipartFile file ) throws StudentNotFoundException;

    //to get student by id
    Optional<Student> getStudentById(Long id ) throws StudentNotFoundException;

    //delete student by id
    void deleteStudentById(Long id) throws StudentNotFoundException;

    //get list of students
    List<Student> getAllStudents() throws StudentNotFoundException;

    //to check is  same name email already exist or not
    Student getStudentByEmail(String email);

    //to login student
    Student findStudentByEmailAndPassword(String email, String password);
}
