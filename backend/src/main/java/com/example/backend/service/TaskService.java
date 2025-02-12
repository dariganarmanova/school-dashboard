package com.example.backend.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import com.example.backend.model.Task;
import com.example.backend.model.TaskRequest;
import com.example.backend.model.User;
import com.example.backend.repository.TaskRepository;
import com.example.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    //private final JwtService jwtService;
    private final UserRepository userRepository;

    private User getCurrentUserId() {
        UserDetails userDetails = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        String username = userDetails.getUsername();
        User currentUser = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("Username was not found"));
        return currentUser;
    }
    public TaskRequest createTask(TaskRequest request) {
        Task task = new Task();
        task.setCompleted(request.getCompleted());
        task.setDeadline(request.getDeadline());
        task.setTaskName(request.getTaskName());
        task.setUser(getCurrentUserId());
        taskRepository.save(task);
        TaskRequest taskRequest = new TaskRequest();
        taskRequest.setCompleted(task.getCompleted());
        taskRequest.setDeadline(task.getDeadline());
        taskRequest.setTaskName(task.getTaskName());
        return taskRequest;
    }
    public List<Task> getTask(UserDetails userDetails) {
        String email = userDetails.getUsername();
        return taskRepository.findByUser_Email(email);
    }
    public TaskRequest updateTask(TaskRequest request, Long taskId) {
        User user = getCurrentUserId();
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Cannot be found"));
        task.setTaskName(request.getTaskName());
        task.setCompleted(request.getCompleted());
        task.setDeadline(request.getDeadline());
        taskRepository.save(task);
        TaskRequest response = new TaskRequest();
        response.setTaskName(task.getTaskName());
        response.setCompleted(task.getCompleted());
        response.setDeadline(task.getDeadline());
        return response;
        }
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
            .orElseThrow(() -> new RuntimeException("Task cannot be found"));
        taskRepository.delete(task);
    }
}
