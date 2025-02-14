package com.example.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Grade;

public interface GradeRepository extends JpaRepository<Grade,Long>{
    List<Grade> findByUserId(Integer user_id);
}
