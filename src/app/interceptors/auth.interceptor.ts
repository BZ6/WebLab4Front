import {HttpInterceptorFn} from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({headers: req.headers.set('Content-Type', 'application/json')})
  return next(req)
}
