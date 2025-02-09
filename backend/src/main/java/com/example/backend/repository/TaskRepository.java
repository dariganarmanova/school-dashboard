package com.example.backend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{
    Optional<Task> findByUser_Id(Integer userId);
    List<Task> findByUser_Email(String email);
    Optional<Task> findByTaskNameAndUser_Id(String taskName, Integer userId);
}
