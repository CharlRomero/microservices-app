package com.espe.msvc.courses.services;

import com.espe.msvc.courses.models.User;
import com.espe.msvc.courses.models.entity.Course;
import java.util.List;
import java.util.Optional;

public interface CourseService {
    List<Course> getCourses();
    Optional<Course> byId(Long id);
    Course save(Course course);
    void delete(Long id);

    Optional<User> addUser(User user, Long idCourse);
    Optional<User> createUser(User user, Long idCourse);
    Optional<User> deleteUser(User user, Long idCourse);
}
