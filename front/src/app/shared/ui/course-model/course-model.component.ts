import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-model',
  standalone: true,
  imports: [],
  templateUrl: './course-model.component.html',
  styleUrl: './course-model.component.scss'
})
export class CourseModelComponent {
  @Input() isOpen = false;
  @Output() closeModel = new EventEmitter();

  onCloseModel() {
    this.closeModel.emit(false);
  }
}
