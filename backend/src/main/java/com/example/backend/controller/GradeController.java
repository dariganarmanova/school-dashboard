package com.example.backend.controller;

import java.util.List;

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
    @GetMapping("/api/grades")
    public ResponseEntity<List<Grade>> getAllGrades(@AuthenticationPrincipal User teacher) {
        return ResponseEntity.ok(gradeService.getGradesForUser(teacher));
    }
    @PostMapping("/api/createGrades")
    public ResponseEntity<Grade> createGrade(@RequestBody GradeRequest request, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(gradeService.createGrade(request,token));
    }
}
