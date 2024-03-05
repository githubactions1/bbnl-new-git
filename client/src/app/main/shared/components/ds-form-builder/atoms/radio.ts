import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
// <div [formGroup]="form">
// <div class="form-check" *ngFor="let opt of field.options">
//   <input class="form-check-input" type="radio" [value]="opt.key" >
//   <label class="form-check-label">
//     {{opt.label}}
//   </label>
// </div>


// </div> 
@Component({
    selector: 'radio',
    template: `
      <div [formGroup]="form"  class="pt-24">
        <mat-radio-group aria-label="field.label" [formControlName]="field.name">
          <mat-radio-button *ngFor="let opt of field.options" [value]="opt.key" style="width: 28%;"> {{opt.label}}</mat-radio-button>
        </mat-radio-group>

      </div> 
    `
})
export class RadioComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
}