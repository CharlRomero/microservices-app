import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICourse } from '../../shared/models/Course';
import { IUser } from '../../shared/models/User';
import { map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { ICourseUser } from '../../shared/models/CourseUser';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiuser = 'http://localhost:8001';
  private apicourse = 'http://localhost:8002';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiuser);
  }

  getCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.apicourse);
  }

  getAssignments(): Observable<ICourseUser[]> {
    return this.http.get<ICourseUser[]>(this.assignmentsUrl);
  }

  getAssignmentsDetails(): Observable<any[]> {
    return forkJoin({
      users: this.getUsers(),
      courses: this.getCourses(),
      assignments: this.getAssignments(),
    }).pipe(
      map(({ users, courses, assignments }) => {
        return assignments.map((assignment) => {
          return {
            ...assignment,
            user: users.find((user) => user.id === assignment.userId),
            course: courses.find((course) => course.id === assignment.courseId),
          };
        });
      })
    );
  }
}
