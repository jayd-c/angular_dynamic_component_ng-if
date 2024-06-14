import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../Models/User';

@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  confirmDeleteUser = "John Smith"

  @Input() userToDelete:User;

  @Output() 
  onConfirmation:EventEmitter<boolean> = new EventEmitter<boolean>();

  onConfirmationButtonClicked(value:boolean) {
    this.onConfirmation.emit(value);
  }
}
