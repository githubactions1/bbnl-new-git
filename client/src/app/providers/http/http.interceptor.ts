import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { SessionPopup } from './sessionPopups';
import { MatDialog } from '@angular/material';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { UserService } from '../user/user.serivce';

export const environment = {
    // origin: 'http://uatapi.rtclivebus.com:6800/apiv1/',
    origin: 'https://bbnlbss.apsfl.co.in/apiv1',
    //origin: 'http://localhost:4901/apiv1'
};

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    constructor(public dialog: MatDialog, private userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('x-access-token') || '';
        // console.log(req.url); 
        req = req.clone({ url: req.url.startsWith('http') ? req.url : environment.origin + req.url });
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
   //     req = req.clone({ headers: req.headers.set('Content-Encoding', 'gzip') });

        if (localStorage.getItem('x-access-token')) {
            req = req.clone({ headers: req.headers.set('x-access-token', token) });
            
            req = req.clone({ headers: req.headers.set('Cache-Control', 'no-cache') });
            req = req.clone({ headers: req.headers.set('Pragma', 'no-cache') });
            // req = req.clone({ headers: req.headers.set('app', 'web') });
            req = req.clone({ headers: req.headers.set('access_id', this.userService.CURRENT_PERM.id || '') });
        }
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                    // console.log(event.headers.get('x-access-token'));
                    if (event.headers.get('x-access-token')) {
                        localStorage.setItem('x-access-token', event.headers.get('x-access-token'));
                    }
                    if (event.status == 257 || event.status == 258 || event.status == 259) {
                        localStorage.setItem('x-access-token', event.headers.get('x-access-token'));
                        this.dialog.closeAll();
                        const dialogRef = this.dialog.open(SessionPopup, {
                            width: '250px', disableClose: true
                        });
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                // console.log(error);
                let data = {};
                data = {
                    reason: error && error.error ? error.error.reason : '',
                    status: error.status
                };
                // console.log(data);
                // this.errorDialogService.openDialog(data);
                return throwError(error);
            }));
    }
    public internetError() {
        // return this.toastCtrl.create({
        //     message: 'Something went wrong. Please check your internet connectivity',
        //     duration: 3000
        // }).present();
    }
}