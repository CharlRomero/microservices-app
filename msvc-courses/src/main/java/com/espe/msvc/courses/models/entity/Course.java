package com.espe.msvc.courses.models.entity;

import com.espe.msvc.courses.models.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotEmpty
    private String name;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private List<CourseUser> courseUserList;

    @Transient
    private List<User> users;

    public Course(){
        courseUserList = new ArrayList<>();
        users = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<CourseUser> getCourseUserList() {
        return courseUserList;
    }

    public void setCourseUserList(List<CourseUser> courseUserList) {
        this.courseUserList = courseUserList;
    }

    public void addCourseUser(CourseUser courseUser){
        courseUserList.add(courseUser);
    }

    public void removeCourseUser(CourseUser courseUser){
        courseUserList.remove(courseUser);
    }
}
