import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('token');

  const reqWithHeader = req.clone({
    //TODO: para um backend real, descomentar essa linha
    //headers: req.headers.set('Authorization', `${token}`),
  });

  return next(reqWithHeader);
}