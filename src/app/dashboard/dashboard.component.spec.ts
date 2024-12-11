import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    const httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(DashboardComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set clientInfo based on history state', () => {
    const mockState = {
      firstName: 'Juan',
      secondName: 'Carlos',
      firstLastName: 'Pérez',
      secondLastName: 'Gómez',
      phone: '1234567890',
      address: 'Calle 123',
      city: 'Bogotá',
    };
    spyOnProperty(history, 'state', 'get').and.returnValue(mockState);

    component.ngOnInit();

    expect(component.clientInfo()).toEqual(mockState);
  });

  it('should navigate back to the root when goBack is called', () => {
    spyOn(router, 'navigate');
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});

