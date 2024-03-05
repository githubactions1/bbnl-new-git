import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable({
    providedIn: 'root'
})

export class UserService {
    USER_DETAILS = new BehaviorSubject<any>({});
    CURRENT_PERM = { id: null, c_in: 0, r_in: 0, u_in: 0, d_in: 0 };
    MENU_ITEMS: any = [];
    private _listners = new Subject<any>();
    constructor(private http: HttpClient) {
        this.USER_DETAILS.next(this.getUsrDta());
    }

    listen(): Observable<any> {
        return this._listners.asObservable();
    }

    filter(filterBy: string) {
        this._listners.next(filterBy);
    }
    loggedIn(val) {
        localStorage.setItem('log', val);
    }

    public setUsrDta(data): Promise<string> {
        this.USER_DETAILS.next(data);
        localStorage.setItem('usrDtls', JSON.stringify(data));
        return;
    }

    public getUsrDta() {
        return localStorage.getItem('usrDtls') ? JSON.parse(localStorage.getItem('usrDtls')) : '';
    }

    public setMenuItems(data) {
        this.MENU_ITEMS = data;
        return;
    }

    public setCurrenPerm(item) {
        // console.log({ c_in: item.c_in, r_in: item.r_in, u_in: item.u_in, d_in: item.d_in })
        this.CURRENT_PERM = { id: item.mnu_itm_id, c_in: item.c_in, r_in: item.r_in, u_in: item.u_in, d_in: item.d_in };
        // localStorage.setItem('currentUrl', JSON.stringify(item));
        return;
    }


}
