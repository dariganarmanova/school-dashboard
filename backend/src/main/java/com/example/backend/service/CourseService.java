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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(CourseService.class);

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

    public String transformGrade(String grade) {
        StringBuilder sb = new StringBuilder();
        sb.append(grade.charAt(0));
        sb.append(" ");
        sb.append(Character.toUpperCase(grade.charAt(1)));
        return sb.toString();
    }

    public List<CourseResponse> getCourse(UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        
        String grade = user.getGrade();
        if (grade == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User grade is null");
        }
        
        String normalizedGrade = grade.toLowerCase().replaceAll(" ", "");
        logger.info("Fetching courses for grade: {}", grade);

        List<Courses> courses = courseRepository.findByGrade(transformGrade(normalizedGrade));
        if (courses.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Courses for the user not found");
        }

        return courses.stream()
            .map(cs -> {
                CourseResponse response = new CourseResponse();
                response.setLesson(cs.getLesson());
                response.setTeacher(cs.getTeacher());
                response.setTime(cs.getTime());
                return response;
            })
            .collect(Collectors.toList());
    }
}
