import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class TransfereService {

  constructor(
    private router:Router,
  
  ) { }

  private  static data;

  setData(data){
    TransfereService.data = data;
    console.log(TransfereService.data)
 
  }

  getData(){
    // let temp = this.data;
   
    console.log(TransfereService.data)
    return TransfereService.data;
  }

setLoclData(Key:string,data){
  localStorage.setItem(Key, JSON.stringify(data))
 
}


getLoclData(Key:string){
  var data
  data=localStorage.getItem(Key)
  
 return JSON.parse(data)
}

ClearLocalData(key:string){
  localStorage.removeItem(key)
}
  clearData(){
    TransfereService.data = undefined;
  }

}