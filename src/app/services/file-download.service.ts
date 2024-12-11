import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileDownloadService {
  private baseUrl = `${environment.apiUrl}/files/download`;

  constructor(private http: HttpClient) {}

  downloadFile(bucketName: string, objectKey: string): void {
    const params = { bucketName, objectKey };

    this.http.get(this.baseUrl, { params, responseType: 'blob' }).subscribe((response) => {
      const blob = new Blob([response], { type: response.type });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = objectKey;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
