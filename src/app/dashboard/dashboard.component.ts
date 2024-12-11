import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Client } from '../interfaces/client';
import { FileDownloadService } from '../services/file-download.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  clientInfo = signal<Client|null>(null);

  constructor(
    private router: Router,
    private fileDownloadService: FileDownloadService
  ) {}

  ngOnInit() {
    const state = history.state;
        this.clientInfo.set(state);
  }

  downloadFile(): void {
    const objectKey = `${environment.burnedClientId}.txt`;
    this.fileDownloadService.downloadFile(environment.bucketName, objectKey);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}