import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription, } from 'rxjs';

@Injectable()
export class TopHeaderSrvc {
    private hdr: BehaviorSubject<any>;
    constructor() {
        this.hdr = new BehaviorSubject({});
    }

    setHdr = (hdr_dtl) => {
        this.hdr.next(hdr_dtl);
    }

    getHdr = (): Observable<any> => {
        return this.hdr.asObservable();
    }


}