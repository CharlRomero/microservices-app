import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModelComponent } from '../../../shared/ui/user-model/user-model.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../service/user/user.service';
import { ApiResponse, IUser } from '../../../shared/models/User';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [UserModelComponent, UserFormComponent, CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  isModelOpen = false;
  users: IUser[] = [];
  user!: IUser;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUser().subscribe({
      next: (response) => {
        if (response.data) {
          this.users = response.data;
        } else {
          console.log('No data found in response');
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  loadUser(user: IUser) {
    this.user = user;
    this.openModel();
  }

  deleteUser(id?: string) {
    if (!id) {
      this.toastr.error('User ID is undefined');
      return;
    }
    
    this.userService.deleteUser(id).subscribe({
      next: (response: ApiResponse<any>) => {
        if (response && response.message) {
          this.toastr.success(response.message);
        } else {
          this.toastr.success('User deleted successfully');
        }
        this.getAllUsers();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
      }
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllUsers();
  }
}
