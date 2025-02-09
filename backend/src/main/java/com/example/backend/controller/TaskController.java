package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.TaskRequest;
import com.example.backend.service.TaskService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    @PostMapping("/api/taskCreate")
    public ResponseEntity<?> createTask(@RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.createTask(request));
    }
    @GetMapping("/api/taskGet")
    public ResponseEntity<?> getTask(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(taskService.getTask(userDetails));
    }
    @PutMapping("/api/taskUpdate/{taskId}")
    public ResponseEntity<?> updateTask(@RequestBody TaskRequest request, @PathVariable Long taskId) {
        return ResponseEntity.ok(taskService.updateTask(request, taskId));
    }
    @DeleteMapping("/api/taskDelete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task was deleted");
    }
}
