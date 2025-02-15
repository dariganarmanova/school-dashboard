package com.example.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Courses;

public interface CourseRepository extends JpaRepository<Courses,Long>{
    List<Courses> findByGrade(String grade);
}
