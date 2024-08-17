import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModelComponent } from '../../../shared/ui/user-model/user-model.component';
import { CourseFormComponent } from '../course-form/course-form.component';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../service/course/course.service';
import { ApiResponse, ICourse } from '../../../shared/models/Course';
import { CourseModelComponent } from '../../../shared/ui/course-model/course-model.component';

@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [CourseModelComponent, CourseFormComponent, CommonModule],
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss',
})
export class CourseTableComponent implements OnInit {
  isModelOpen = false;
  courses: ICourse[] = [];
  course!: ICourse;

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAllCourse().subscribe({
      next: (response) => {
        if (response.data) {
          this.courses = response.data;
        } else {
          console.log('No data found in response');
        }
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      },
    });
  }

  loadCourse(course: ICourse) {
    this.course = course;
    this.openModel();
  }

  deleteCourse(id?: string) {
    if (!id) {
      this.toastr.error('Course ID is undefined');
      return;
    }

    this.courseService.deleteCourse(id).subscribe({
      next: (response: ApiResponse<any>) => {
        if (response && response.message) {
          this.toastr.success(response.message);
        } else {
          this.toastr.success('Course deleted successfully');
        }
        this.getAllCourses();
      },
      error: (err) => {
        console.error('Error deleting course:', err);
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllCourses();
  }
}
