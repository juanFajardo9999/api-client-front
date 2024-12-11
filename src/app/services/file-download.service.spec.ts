import { TestBed } from '@angular/core/testing';
import { FileDownloadService } from './file-download.service';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('FileDownloadService', () => {
  let service: FileDownloadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(FileDownloadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('downloadFile', () => {
    it('should perform a GET request and trigger a download', () => {
      const bucketName = 'clients-info-001';
      const objectKey = '23445322.txt';
      const mockBlob = new Blob(['Mock file content'], { type: 'text/plain' });

      const createObjectURLSpy = spyOn(window.URL, 'createObjectURL').and.returnValue('mockUrl');
      const revokeObjectURLSpy = spyOn(window.URL, 'revokeObjectURL').and.callFake(() => {});

      const mockAnchor = {
        href: '',
        download: '',
        click: jasmine.createSpy('click'),
      };
      spyOn(document, 'createElement').and.returnValue(mockAnchor as any);

      service.downloadFile(bucketName, objectKey);

      const req = httpMock.expectOne(
        `${service['baseUrl']}?bucketName=${bucketName}&objectKey=${objectKey}`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.responseType).toBe('blob');
      req.flush(mockBlob);

      expect(createObjectURLSpy).toHaveBeenCalledWith(mockBlob);
      expect(mockAnchor.href).toBe('mockUrl');
      expect(mockAnchor.download).toBe(objectKey);
      expect(mockAnchor.click).toHaveBeenCalled();
      expect(revokeObjectURLSpy).toHaveBeenCalledWith('mockUrl');
    });

  });
});
