import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-model',
  standalone: true,
  imports: [],
  templateUrl: './user-model.component.html',
  styleUrl: './user-model.component.scss',
})
export class UserModelComponent {
  @Input() isOpen = false;
  @Output() closeModel = new EventEmitter();

  onCloseModel() {
    this.closeModel.emit(false);
  }
}
