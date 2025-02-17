package com.example.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.example.backend.model.Grade;
import com.example.backend.model.GradeRequest;
import com.example.backend.model.User;
import com.example.backend.service.GradeService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class GradeController {
    private final GradeService gradeService;

    // Get grades for the logged-in user (teacher or student)
    @GetMapping("/api/grades")
    public ResponseEntity<List<Grade>> getAllGrades(@AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(gradeService.getGradesForUser(user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // Return a forbidden response if an error occurs
        }
    }

    @PostMapping("/api/createGrades")
    public ResponseEntity<Grade> createGrade(@RequestBody GradeRequest request, @AuthenticationPrincipal User user) {
        try {
            return ResponseEntity.ok(gradeService.createGrade(request, user));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // Handle creation errors
        }
    }
}
