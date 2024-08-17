package com.espe.msvc.courses.controllers;

import com.espe.msvc.courses.models.User;
import com.espe.msvc.courses.models.entity.Course;
import com.espe.msvc.courses.services.CourseService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;

@RestController
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Course> getCourses(){
        return courseService.getCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable Long id){
        Optional<Course> courseOptional = courseService.byId(id);
        if(!courseOptional.isPresent())
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().body(courseOptional.get());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Course course, BindingResult result){
        if(result.hasErrors())
            return check(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.save(course));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody Course course, @PathVariable Long id){
        Optional<Course> courseOptional = courseService.byId(id);
        if(!courseOptional.isPresent())
            return ResponseEntity.notFound().build();

        Course courseDB = courseOptional.get();
        courseDB.setName(course.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.save(courseDB));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<Course> courseOptional = courseService.byId(id);
        if(!courseOptional.isPresent())
            return ResponseEntity.notFound().build();

        courseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/assign-user/{idCourse}")
    public ResponseEntity<?> assignUser(@RequestBody User user, @PathVariable Long idCourse){
        Optional<User> optionalUser;
        try{
            optionalUser = courseService.addUser(user, idCourse);
        }catch (FeignException feignException){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "Error: " + feignException.getMessage()));
        }
        if(!optionalUser.isPresent())
            return ResponseEntity.notFound().build();

        return ResponseEntity.status(HttpStatus.CREATED).body(optionalUser.get());
    }

    private static ResponseEntity<Map<String, String>> check(BindingResult result) {
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "The field " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
