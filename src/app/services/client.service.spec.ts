import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
    ],
  }).compileComponents();

    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getClientInfo', () => {
    it('should perform a GET request and return client info', () => {
      const tipoDocumento = 'CC';
      const numeroDocumento = '1234567890';
      const mockResponse = {
        firstName: 'Juan',
        secondName: 'Carlos',
        firstLastName: 'Pérez',
        secondLastName: 'Gómez',
        phone: '1234567890',
        address: 'Calle 123',
        city: 'Bogotá',
      };

      service.getClientInfo(tipoDocumento, numeroDocumento).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/clients/${tipoDocumento}/${numeroDocumento}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error responses', () => {
      const tipoDocumento = 'CC';
      const numeroDocumento = '1234567890';
      const mockError = { message: 'Client not found' };

      service.getClientInfo(tipoDocumento, numeroDocumento).subscribe({
        next: () => fail('Expected an error, but got a success response'),
        error: (error) => {
          expect(error.error).toEqual(mockError);
        },
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/clients/${tipoDocumento}/${numeroDocumento}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockError, { status: 404, statusText: 'Not Found' });
    });

    it('should use the correct URL from environment', () => {
      const tipoDocumento = 'CC';
      const numeroDocumento = '9876543210';
      service.getClientInfo(tipoDocumento, numeroDocumento).subscribe();

      const req = httpMock.expectOne(`${environment.apiUrl}/clients/${tipoDocumento}/${numeroDocumento}`);
      expect(req.request.url).toBe(`${environment.apiUrl}/clients/${tipoDocumento}/${numeroDocumento}`);
    });
  });
});
