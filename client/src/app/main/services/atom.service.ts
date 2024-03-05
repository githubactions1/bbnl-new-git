import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AtomService {
  constructor(){}
  private dropDown = new BehaviorSubject<any>({});
  dropDownData = this.dropDown.asObservable();
  
  dropDownChange(field){
    this.dropDown.next(field); 
  }
}