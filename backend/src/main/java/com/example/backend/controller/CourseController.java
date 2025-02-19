package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.CourseRequest;
import com.example.backend.model.CourseResponse;
import com.example.backend.service.CourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;
    @GetMapping("/api/courses")
    public ResponseEntity<List<CourseResponse>> getCourses(@AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(courseService.getCourse(userDetails));
    }
    @PostMapping("/api/coursesCreate")
    //@PreAuthorize("hasAuthority('TEACHER')")
    public ResponseEntity<CourseResponse> createCourses(@RequestBody CourseRequest request) {
        return ResponseEntity.ok(courseService.createCourse(request));
    }
}
