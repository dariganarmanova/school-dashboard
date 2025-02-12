package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Courses;

public interface CourseRepository extends JpaRepository<Courses,Long>{
    Optional<Courses> findByGrade(String grade);
}
