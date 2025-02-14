package com.example.backend.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradeRequest {
    private Date date;
    private String grade_given;
    private String lesson_name;
    private String student_email;
}
