package com.example.backend.service;

import java.util.List;

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
        courses.setTime(request.getTime());
        courseRepository.save(courses);
        CourseResponse response = new CourseResponse();
        response.setLesson(courses.getLesson());
        response.setTeacher(courses.getTeacher());
        response.setTime(courses.getTime());
        return response;
    }
    public List<CourseResponse> getCourse(UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("user is not found"));
        String grade = user.getGrade();
        if (grade == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User grade is null");
        }
        System.out.println(grade);
        List<Courses> course = courseRepository.findByGrade(grade);
        if (course.isEmpty()) {
            throw new RuntimeException("cannot be found");
        }
        return course.stream().map(cs -> {
            CourseResponse response = new CourseResponse();
            response.setLesson(cs.getLesson());
            response.setTeacher(cs.getTeacher());
            response.setTime(cs.getTime());
            return response;
        }).toList();
    }
}
