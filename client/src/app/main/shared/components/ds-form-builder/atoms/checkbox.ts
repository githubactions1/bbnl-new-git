import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// <div *ngFor="let opt of field.options" class="form-check form-check">
// <label class="form-check-label">
//    <input [formControlName]="opt.key" class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
//    {{opt.label}}</label>

// </div>

@Component({
    selector: 'checkbox',
    template: `
      <div [formGroup]="form">
        <div [formGroupName]="field.name" >
             <section class="example-section pt-24">
                <mat-checkbox *ngFor="let opt of field.options" 
                [formControlName]="opt.key"
                [id]="opt.key"
                style="margin:0px 5px">{{opt.label}}</mat-checkbox>
             </section>
        </div>
      </div> 
    `
})
export class CheckBoxComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
}