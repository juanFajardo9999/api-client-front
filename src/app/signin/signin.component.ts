import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { ClientService } from '../services/client.service';
import { ErrorModalComponent } from '../shared/error-modal/error-modal.component';
import { ErrorMessage } from '../interfaces/error-message';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorModalComponent, NgClass, NgIf],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  form: FormGroup;
  errorMessage: ErrorMessage = { error: '', message: '' };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService
  ) {
    this.form = this.fb.group({
      tipoDocumento: ['', Validators.required],
      numeroDocumento: [
        '',
        [Validators.required, Validators.pattern(/^\d{8,11}$/)],
      ],
    });
  }

  isButtonDisabled(): boolean {
    return this.form.invalid;
  }

  formatDocumentNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = Number(value).toLocaleString('en-US');
    this.form.patchValue({ numeroDocumento: value.replace(/,/g, '') });
    input.value = value;
  }

  search(errorModal: ErrorModalComponent) {
    if (this.form.valid) {
      const { tipoDocumento, numeroDocumento } = this.form.value;

      this.clientService.getClientInfo(tipoDocumento, numeroDocumento).subscribe({
        next: (data) => {

          this.router.navigate(['/resumen'], { state: data });
        },
        error: (error) => {
          this.errorMessage = error.error;
          errorModal.open();
        },
      });
    }
  }
}