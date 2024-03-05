import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/Rx';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  get(rte) {
    return this.http.get(`/${rte}`);
  }

  update(rte,data){
    return this.http.post(`/${rte}`, data);
  }
}
