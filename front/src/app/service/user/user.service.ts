import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, IUser } from '../../shared/models/User';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiurl = "http://localhost:8001";
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<ApiResponse<IUser[]>> {
    return this.http.get<IUser[]>(this.apiurl).pipe(
      map((users: IUser[]) => {
        return { data: users } as ApiResponse<IUser[]>;
      })
    );
  }

  getUser(id: string): Observable<ApiResponse<IUser>> {
    return this.http.get<ApiResponse<IUser>>(`${this.apiurl}/${id}`);
  }

  createUser(user: IUser): Observable<any>{
    return this.http.post(`${this.apiurl}`, user);
  }

  updateUser(id: string, user: IUser): Observable<any>{
    return this.http.put(`${this.apiurl}/${id}`, user);
  }

  deleteUser(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<{ message?: string } | null>(`${this.apiurl}/${id}`).pipe(
      map((response) => {
        if (response === null) {
          return { message: 'User deleted successfully' } as ApiResponse<any>;
        } else {
          return { message: response.message || 'User deleted successfully' } as ApiResponse<any>;
        }
      })
    );
  }
}
