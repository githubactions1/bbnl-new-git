import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { AtomService } from 'app/main/services/atom.service';

@Component({
    selector: 'datepicker',
    template: `
      <div [formGroup]="form">
      <div class="form-label">{{field.label}}</div>
        <mat-form-field appearance="outline" style="width: 100%;" >
<input matInput [matDatepicker]="picker1"   [formControlName]="field.name">
<mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
<mat-datepicker #picker1></mat-datepicker>
</mat-form-field>
      </div> 
    `
})
export class DatePickerComponent implements OnInit {


    @Input() field: any = {};
    @Input() form: FormGroup;
    constructor(private atmSrv: AtomService) {

    }
    ngOnInit(): void {
      
    }

}