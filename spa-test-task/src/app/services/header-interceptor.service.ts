import { Injectable } from "@angular/core";
import {  HttpRequest,  HttpHandler,  HttpEvent,  HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        "Content-Type":  "application/json",
        Accept: "application/json"
      }
    });

    return next.handle(request);
  }
}
