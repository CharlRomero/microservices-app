import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { ICourse } from '../../../shared/models/Course';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../../service/course/course.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnChanges {
  @Input() data: ICourse | null = null;
  @Output() onCloseModel = new EventEmitter();

  courseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private toastr: ToastrService
  ) {
    this.courseForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.courseForm.patchValue({
        name: this.data.name,
      });
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      if (this.data) {
        this.courseService
          .updateCourse(this.data.id as string, this.courseForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetCourseForm();
              this.toastr.success(
                response.message || 'Course updated successfully'
              );
              this.onCloseModel.emit();
            },
            error: (err) => {
              console.error('Error updating course:', err);
              this.toastr.error('Failed to update course');
            },
          });
      } else {
        this.courseService.createCourse(this.courseForm.value).subscribe({
          next: (response: any) => {
            this.resetCourseForm();
            this.toastr.success(
              response.message || 'Course created successfully'
            );
            this.onCloseModel.emit();
          },
          error: (err) => {
            console.error('Error updating course:', err);
            this.toastr.error('Failed to update course');
          },
        });
      }
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  resetCourseForm() {
    this.courseForm.reset();
    this.onClose();
  }
}
