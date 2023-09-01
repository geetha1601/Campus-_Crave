package com.cafeconnect.service.impl;

import com.cafeconnect.exception.StudentNotFoundException;
import com.cafeconnect.model.Student;
import com.cafeconnect.repository.IStudentRepository;
import com.cafeconnect.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl  implements IStudentService {

    @Autowired
    private IStudentRepository studentRepository;

    @Override
    public Student regStudent(Student student) throws StudentNotFoundException {
        return studentRepository.save(student);
    }

    @Override
    public Student regStudent(Student student, MultipartFile file) throws StudentNotFoundException {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(Student student) throws StudentNotFoundException {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudentWithPhoto(Student student, MultipartFile file) throws StudentNotFoundException {
        return studentRepository.save(student);
    }

    @Override
    public Optional<Student> getStudentById(Long id) throws StudentNotFoundException {
        return studentRepository.findById(id);
    }

    @Override
    public void deleteStudentById(Long id) throws StudentNotFoundException {
  studentRepository.deleteById(id);
    }

    @Override
    public List<Student> getAllStudents() throws StudentNotFoundException {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentByEmail(String email) {
        return studentRepository.getStudentByEmail(email);
    }

    @Override
    public Student findStudentByEmailAndPassword(String email, String password) {
        return studentRepository.findStudentByEmailAndPassword(email, password);
    }
}
