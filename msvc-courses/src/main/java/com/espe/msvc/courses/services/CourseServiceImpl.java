package com.espe.msvc.courses.services;

import com.espe.msvc.courses.clients.UserClientRest;
import com.espe.msvc.courses.models.User;
import com.espe.msvc.courses.models.entity.Course;
import com.espe.msvc.courses.models.entity.CourseUser;
import com.espe.msvc.courses.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService{
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    UserClientRest userClientRest;

    @Override
    @Transactional(readOnly = true)
    public List<Course> getCourses() {
        return (List<Course>) courseRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Course> byId(Long id) {
        return courseRepository.findById(id);
    }

    @Override
    @Transactional
    public Course save(Course course) {
        return courseRepository.save(course);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        courseRepository.deleteById(id);
    }

    @Override
    public Optional<User> addUser(User user, Long idCourse) {
        Optional<Course> optionalCourse = courseRepository.findById(idCourse);
        if(optionalCourse.isPresent()){
            User userMicro = userClientRest.detail(user.getId());

            Course course = optionalCourse.get();
            CourseUser courseUser = new CourseUser();
            courseUser.setUserId(userMicro.getId());

            course.addCourseUser(courseUser);
            courseRepository.save(course);
        }
        return Optional.empty();
    }

    @Override
    public Optional<User> createUser(User user, Long idCourse) {

        Optional<Course> optionalCourse = courseRepository.findById(idCourse);

        if(optionalCourse.isPresent()){
            User userMicro = userClientRest.create(user);

            Course course = optionalCourse.get();
            CourseUser courseUser = new CourseUser();
            courseUser.setUserId(userMicro.getId());

            course.addCourseUser(courseUser);
            courseRepository.save(course);
        }

        return Optional.empty();
    }

    @Override
    public Optional<User> deleteUser(User user, Long idCourse) {

        Optional<Course> optionalCourse = courseRepository.findById(idCourse);

        if(optionalCourse.isPresent()){
            User userMicro = userClientRest.detail(user.getId());

            Course course = optionalCourse.get();
            CourseUser courseUser = new CourseUser();
            courseUser.setUserId(userMicro.getId());

            course.removeCourseUser(courseUser);
            courseRepository.save(course);
        }

        return Optional.empty();
    }
}
