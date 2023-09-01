package com.cafeconnect.repository;

import com.cafeconnect.model.Accept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAcceptRepository  extends JpaRepository<Accept,Long> {
}
