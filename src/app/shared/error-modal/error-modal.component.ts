import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ErrorMessage } from '../../interfaces/error-message';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent {
  @Input() errorMessage: ErrorMessage = { error: '', message: '' };
  isVisible = false;

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }
}
