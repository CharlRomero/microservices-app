import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { IUser } from '../../../shared/models/User';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges {
  @Input() data: IUser | null = null;
  @Output() onCloseModel = new EventEmitter();

  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.userForm.patchValue({
        name: this.data.name,
        email: this.data.email,
        password: this.data.password,
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.userService
          .updateUser(this.data.id as string, this.userForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetUserForm();
              this.toastr.success(response.message || 'User updated successfully');
              this.onCloseModel.emit();
            },
            error: (err) => {
              console.error('Error updating user:', err);
              this.toastr.error('Failed to update user');
            },
          });
      } else {
        this.userService.createUser(this.userForm.value).subscribe({
          next: (response: any) => {
            this.resetUserForm();
            this.toastr.success(response.message || 'User created successfully');
            this.onCloseModel.emit();
          },
          error: (err) => {
            console.error('Error creating user:', err);
            this.toastr.error('Failed to create user');
          },
        });
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  resetUserForm() {
    this.userForm.reset();
    this.onClose();
  }
}
