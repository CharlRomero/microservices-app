import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './components/users/user-table/user-table.component';
import { CourseTableComponent } from './components/course/course-table/course-table.component';
import { CourseAssignComponent } from './components/course/course-assign/course-assign.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'users', component: UserTableComponent },
  { path: 'courses', component: CourseTableComponent },
  { path: 'assign-course', component: CourseAssignComponent },
  { path: '', component: NavigationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
