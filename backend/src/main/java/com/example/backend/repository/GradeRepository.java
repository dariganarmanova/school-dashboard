package com.example.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Grade;
import com.example.backend.model.User;

public interface GradeRepository extends JpaRepository<Grade,Long>{
    List<Grade> findByUserId(Integer user_id);
    List<Grade> findByTeacherId(Integer teacherId);
    List<Grade> findByTeacher(User teacher);
    List<Grade> findByUser_Email(String email);

    
}
