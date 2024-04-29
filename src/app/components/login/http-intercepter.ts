import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    // Log the complete CORS request URL
    console.log('Complete CORS Request URL:', req.urlWithParams);
    
    // Pass the request through unchanged
    return next.handle(req);
  }
}