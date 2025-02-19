package com.example.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.example.backend.config.JwtService;
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
        List<Grade> grade = gradeRepository.findByTeacher(user);
        if (grade == null || grade.isEmpty()) {
            List<Grade> grades = gradeRepository.findByUser_Email(user.getEmail());
            return grades;
        }
        return grade;
    }

    public Grade createGrade(GradeRequest request, User teacher) {
        if (!teacher.getRole().equals("ROLE_TEACHER")) {
            throw new RuntimeException("Only teachers can create grades.");
        }

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
