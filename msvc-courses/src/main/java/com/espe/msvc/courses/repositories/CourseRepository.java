package com.espe.msvc.courses.repositories;

import com.espe.msvc.courses.models.entity.Course;
import org.springframework.data.repository.CrudRepository;

public interface CourseRepository extends CrudRepository<Course, Long> {
}
