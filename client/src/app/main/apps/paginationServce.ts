import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/Rx';
import * as _ from 'lodash';
import CustomStore from "devextreme/data/custom_store";
import { createStore } from "devextreme-aspnet-data-nojquery";
@Injectable({
  providedIn: 'root'
})
export class peginationsrvc{
    
    serviceUrl = "https://bbnlbss.apsfl.co.in/apiv1/";
    constructor(){
      

     
    }
    

    get(rte,key){
      console.log(key)
     return  createStore({
            key: key,
            loadUrl:this.serviceUrl +  rte,
            
      
          
          })
    }
}