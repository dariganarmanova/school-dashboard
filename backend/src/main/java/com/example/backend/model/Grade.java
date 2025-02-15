package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "grade_table")
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Date date;
    private String grade_given;
    private String lesson_name;

    // Student receiving the grade
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Teacher assigning the grade
    @ManyToOne
    @JoinColumn(name = "teacher_id")  // This replaces teacher_email
    private User teacher;
}
