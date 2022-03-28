import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor{

    constructor(private _cookieServ : CookieService){}

    intercept(req : HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        var token = localStorage.getItem("user");
        // console.log("hello", token);

        if(token){
            // console.log("hello");
            
            var clone = req.clone({
                headers : req.headers.set("Authorization", 'Bearer '+token)
            });
            
            return next.handle(clone);
        }
        else{
            return next.handle(req);
        }
    }
}