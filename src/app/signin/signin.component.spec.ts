import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let clientService: jasmine.SpyObj<ClientService>;
  let router: Router;

  beforeEach(async () => {
    const clientServiceSpy = jasmine.createSpyObj('ClientService', ['getClientInfo']);
    await TestBed.configureTestingModule({
      imports: [SigninComponent,ReactiveFormsModule, 
        ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ClientService, useValue: clientServiceSpy }
      ],
    }).compileComponents();

    const httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientService) as jasmine.SpyObj<ClientService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the button if the form is invalid', () => {
    component.form.controls['tipoDocumento'].setValue('');
    component.form.controls['numeroDocumento'].setValue('');
    expect(component.isButtonDisabled()).toBeTrue();

    component.form.controls['tipoDocumento'].setValue('CC');
    component.form.controls['numeroDocumento'].setValue('12345678');
    expect(component.isButtonDisabled()).toBeFalse();
  });

  it('should call getClientInfo and navigate on valid form submission', () => {
    const mockData = {
      firstName: 'Juan',
      secondName: 'Carlos',
      firstLastName: 'Pérez',
      secondLastName: 'Gómez',
      phone: '1234567890',
      address: 'Calle 123',
      city: 'Bogotá',
    };
    clientService.getClientInfo.and.returnValue(of(mockData));

    spyOn(router, 'navigate');
    component.form.controls['tipoDocumento'].setValue('CC');
    component.form.controls['numeroDocumento'].setValue('12345678');

    const errorModal = jasmine.createSpyObj('ErrorModalComponent', ['open']);
    component.search(errorModal);

    expect(clientService.getClientInfo).toHaveBeenCalledWith('CC', '12345678');
    expect(router.navigate).toHaveBeenCalledWith(['/resumen'], { state: mockData });
  });

  it('should handle error and open error modal on API error', () => {
    const mockError = { error: { error: 'Error', message: 'Details' } };
    clientService.getClientInfo.and.returnValue(throwError(mockError));

    const errorModal = jasmine.createSpyObj('ErrorModalComponent', ['open']);
    component.form.controls['tipoDocumento'].setValue('CC');
    component.form.controls['numeroDocumento'].setValue('12345678');

    component.search(errorModal);

    expect(clientService.getClientInfo).toHaveBeenCalledWith('CC', '12345678');
    expect(component.errorMessage).toEqual(mockError.error);
    expect(errorModal.open).toHaveBeenCalled();
  });
});
