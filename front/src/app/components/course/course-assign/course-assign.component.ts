import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../service/course/course.service';
import { UserService } from '../../../service/user/user.service';
import { IUser } from '../../../shared/models/User';
import { ICourse } from '../../../shared/models/Course';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-assign',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './course-assign.component.html',
  styleUrl: './course-assign.component.scss',
})
export class CourseAssignComponent implements OnInit {
  assignForm!: FormGroup;
  users: IUser[] = [];
  courses: ICourse[] = [];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.assignForm = this.fb.group({
      userId: ['', Validators.required],
      courseId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllCourses();
    this.getAllUsers();
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

  getAllUsers() {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        this.users = response.data;
        console.log('Users loaded:', this.users);
        // Asegúrate de que todos los IDs son cadenas
        this.users.forEach(user => {
          user.id = String(user.id);
        });
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  onSubmit() {
    if (this.assignForm.valid) {
      const { userId, courseId } = this.assignForm.value;
      console.log('Form values:', this.assignForm.value);
      console.log('Selected userId:', userId);
  
      // Encuentra el usuario seleccionado por su id
      const selectedUser = this.users.find(user => String(user.id) === String(userId));
      console.log('Selected user:', selectedUser);
  
      if (selectedUser) {
        this.courseService.assignUser(selectedUser, courseId).subscribe({
          next: (response) => {
            this.toastr.success('User assigned successfully');
            this.assignForm.reset();
          },
          error: (err) => {
            this.toastr.error('Failed to assign user');
            console.error('Error assigning user:', err);
          }
        });
      } else {
        this.toastr.error('Selected user not found');
      }
    } else {
      this.assignForm.markAllAsTouched();
    }
  }
  
  
}
