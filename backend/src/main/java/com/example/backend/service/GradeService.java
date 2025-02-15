package com.example.backend.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.backend.config.JwtService;
import com.example.backend.model.Courses;
import com.example.backend.model.Grade;
import com.example.backend.model.GradeRequest;
import com.example.backend.model.User;
import com.example.backend.repository.GradeRepository;
import com.example.backend.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GradeService {
    private final GradeRepository gradeRepository;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    public List<Grade> getGradesForUser(User user) {
        if (user == null) {
            throw new RuntimeException("User not found.");
        }
        List<Grade> grades = gradeRepository.findByTeacher(user);
    
        if (grades.isEmpty()) {
            throw new RuntimeException("No grades found for this teacher.");
        }
    
        return grades;
    }
    
    
    public Grade createGrade(GradeRequest request, String token) {
        String newT = token.substring(7);
        String teacherN = jwtService.extractUsername(newT);
    
        User teacher = userRepository.findByEmail(teacherN)
            .orElseThrow(() -> new RuntimeException("Teacher not found"));
    
        User student = userRepository.findByEmail(request.getStudent_email())
            .orElseThrow(() -> new RuntimeException("Student not found"));
    
        Grade grade = new Grade();
        grade.setTeacher(teacher); 
        grade.setDate(request.getDate());
        grade.setGrade_given(request.getGrade_given());
        grade.setLesson_name(request.getLesson_name());
        grade.setUser(student);
    
        return gradeRepository.save(grade);
    }
    
}
