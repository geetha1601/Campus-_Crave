package com.cafeconnect.repository;

import com.cafeconnect.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRequestRepository extends JpaRepository<Request,Long> {
}
