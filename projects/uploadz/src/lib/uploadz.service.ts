import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpResponse,
  HttpEventType,
  HttpProgressEvent,
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadRequest, Progress } from '../utils/models/upload.model';

@Injectable({
  providedIn: 'root',
})
export class UploadzService {

  specialHeaders?: any[];

  constructor(private http: HttpClient) {}

  uploadFiles(files: File[], url: string): Observable<any>[] {
    const observables: Observable<any>[] = [];

    files.map((file: File) =>
      observables.push(this.upload({ file: file, url: url }))
    );

    return observables;
  }

  upload(uploadRequest: UploadRequest): Observable<any> {
    const formdata = new FormData();
    const timeRigthNow = new Date().getTime();
    formdata.append('file', uploadRequest.file);

    let headers = {};

    if (this.specialHeaders) {
      headers = { ...this.specialHeaders };
    }

    return this.http
      .post(uploadRequest.url, formdata, {
        reportProgress: true,
        observe: 'events',
        headers: headers
      })
      .pipe(map((event) => this.prettifyProgressResponse(event, timeRigthNow)));
  }

  prettifyProgressResponse(
    event: HttpEvent<any>,
    startTime: number
  ): HttpResponse<any> {
    switch (event.type) {
      case HttpEventType.Sent:
        return new HttpResponse<any>({
          status: 200,
          body: { message: 'Request has been made!' },
        });
        break;
      case HttpEventType.ResponseHeader:
        return new HttpResponse<any>({
          status: 200,
          body: { message: 'Response header has been received!' },
        });
        break;
      case HttpEventType.Response:
        return new HttpResponse<any>({
          status: 200,
          body: {
            type: 'done',
            message: 'File has been uploaded!',
            response: <HttpResponse<any>>event.body,
          },
        });
        break;
      case HttpEventType.UploadProgress:
        return new HttpResponse<any>({
          status: 200,
          body: {
            type: 'progress',
            progress: this.generateProgress(event, startTime),
          },
        });
        break;
    }

    return new HttpResponse<any>({
      status: 200,
      body: { message: 'File has getting uploaded!' },
    });
  }

  generateProgress(event: HttpProgressEvent, startTime: number): Progress {
    try {
      if (event.total) {
        const humanizeTimeStamp = (sec: number) => {
          return new Date(sec * 1000).toISOString().substr(11, 8);
        };
        const precentage = Math.round((event.loaded / event.total) * 100);
        const diff = new Date().getTime() - startTime;
        const speed = Math.round((event.loaded / diff) * 1000);
        const eta = Math.ceil((event.total - event.loaded) / speed);

        return {
          percentage: precentage,
          uploaded: event.loaded,
          totalSize: event.total,
          estimateTime: humanizeTimeStamp(eta),
        };
      } else {
        throw new Error('Total size is zero');
      }
    } catch (e) {
      return {
        percentage: 0,
        uploaded: 0,
        totalSize: 0,
        estimateTime: '0 Seconds',
      };
    }
  }
}
