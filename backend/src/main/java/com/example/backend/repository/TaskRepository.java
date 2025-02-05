package com.example.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{
    Optional<Task> findByUser_Id(Long userId);
}
