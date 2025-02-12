package com.example.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.model.CourseRequest;
import com.example.backend.model.CourseResponse;
import com.example.backend.model.Courses;
import com.example.backend.model.User;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    public CourseResponse createCourse(CourseRequest request) {
        Courses courses = new Courses();
        courses.setGrade(request.getGrade());
        courses.setLesson(request.getLesson());
        courses.setTeacher(request.getTeacher());
        courseRepository.save(courses);
        CourseResponse response = new CourseResponse();
        response.setLesson(courses.getLesson());
        response.setTeacher(courses.getTeacher());
        return response;
    }
    public CourseResponse getCourse(UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("user is not found"));
        String grade = user.getGrade();
        if (grade == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User grade is null");
        }
        System.out.println(grade);
        Courses course = courseRepository.findByGrade(grade)
            .orElseThrow(() -> new RuntimeException("cannot be found"));
        CourseResponse response = new CourseResponse();
        response.setLesson(course.getLesson());
        response.setTeacher(course.getTeacher());
        return response;
    }
}
