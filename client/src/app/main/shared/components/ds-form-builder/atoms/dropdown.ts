import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { AtomService } from 'app/main/services/atom.service';

@Component({
  selector: 'dropdown',
  template: `
      <div [formGroup]="form">
      <div class="form-label">{{field.label}}</div>
        <mat-form-field style="width: 100%;">
          <mat-select  [formControlName]="field.name"  (selectionChange)="onItemSelect($event,field)">
            <mat-option *ngFor="let opt of field.options" [value]="opt.key">{{opt.label}}</mat-option>
          </mat-select>
        </mat-form-field>
      </div> 
    `
})
export class DropDownComponent implements OnInit  {
 

  @Input() field: any = {};
  @Input() form: FormGroup;
  constructor(private atmSrv:AtomService) {

  }
  ngOnInit(): void {
   // this.atmSrv.dropDownData.subscribe(user => this.user = user);
  }
  onItemSelect(data,field){
    field[field.name] = data.value;
   this.atmSrv.dropDownChange(field);
  }
}