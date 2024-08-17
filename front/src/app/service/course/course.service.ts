import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, ICourse } from '../../shared/models/Course';
import { IUser } from '../../shared/models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiurl = 'http://localhost:8002';

  constructor(private http: HttpClient) {}

  getAllCourse(): Observable<ApiResponse<ICourse[]>> {
    return this.http.get<ICourse[]>(this.apiurl).pipe(
      map((courses: ICourse[]) => {
        return { data: courses } as ApiResponse<ICourse[]>;
      })
    );
  }

  getCourse(id: string): Observable<ApiResponse<ICourse>> {
    return this.http.get<ApiResponse<ICourse>>(`${this.apiurl}/${id}`);
  }

  createCourse(course: ICourse): Observable<any> {
    return this.http.post(`${this.apiurl}`, course);
  }

  updateCourse(id: string, course: ICourse): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, course);
  }

  deleteCourse(id: string): Observable<ApiResponse<any>> {
    return this.http
      .delete<{ message?: string } | null>(`${this.apiurl}/${id}`)
      .pipe(
        map((response) => {
          if (response === null) {
            return {
              message: 'Course deleted successfully',
            } as ApiResponse<any>;
          } else {
            return {
              message: response.message || 'Course deleted successfully',
            } as ApiResponse<any>;
          }
        })
      );
  }

  assignUser(user: IUser, idCourse: number): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiurl}/assign-user/${idCourse}`, user);
  }
}
