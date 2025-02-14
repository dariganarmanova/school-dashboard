package com.example.backend.service;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

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
    private final UserRepository userRepository;
    private User getCurrentUserId() {
        UserDetails userDetails = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        String username = userDetails.getUsername();
        User currentUser = userRepository.findByEmail(username)
            .orElseThrow(() -> new RuntimeException("Username was not found"));
        return currentUser;
    }
    public List<Grade> getGradesOfUser() {
        User user = getCurrentUserId();
        Integer user_id = user.getId();
        return gradeRepository.findByUserId(user_id);
    }
    public Grade createGrade(GradeRequest request) {
        User teacher = getCurrentUserId();
        User student = userRepository.findByEmail(request.getStudent_email())
            .orElseThrow(() -> new RuntimeException("Cannot be found"));
        Grade grade = new Grade();
        grade.setTeacher_email(teacher.getEmail());
        grade.setDate(request.getDate());
        grade.setGrade_given(request.getGrade_given());
        grade.setLesson_name(request.getLesson_name());
        grade.setUser(student);
        return gradeRepository.save(grade);
    }
}
