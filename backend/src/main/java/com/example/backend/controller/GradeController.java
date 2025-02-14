package com.example.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.model.Grade;
import com.example.backend.model.GradeRequest;
import com.example.backend.service.GradeService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class GradeController {
    private final GradeService gradeService;
    @GetMapping("/api/grades")
    public ResponseEntity<List<Grade>> getAllGrades() {
        return ResponseEntity.ok(gradeService.getGradesOfUser());
    }
    @PostMapping("/api/createGrades")
    public ResponseEntity<Grade> createGrade(@RequestBody GradeRequest request) {
        return ResponseEntity.ok(gradeService.createGrade(request));
    }
}
