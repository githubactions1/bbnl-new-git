import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/Rx';
import * as _ from 'lodash';
import { CrudService } from 'app/main/apps/crud.service';
@Injectable({
  providedIn: 'root'
})
export class Dataservice {
      static lmoList=[];
      constructor(private http: HttpClient,public crdsrv:CrudService) { }
      getLmoLst=()=>{
          return new Promise((resolve,reject)=> {
                if (Dataservice.lmoList.length>0){
                    console.log("if")
                    resolve(Dataservice.lmoList)
                }else{
                  this.crdsrv.get(`lmo/lmos`).subscribe(res=>{
                            console.log(res)
                            Dataservice.lmoList=res['data']
                            resolve(Dataservice.lmoList)
                          })
                }     
        })
      }


}