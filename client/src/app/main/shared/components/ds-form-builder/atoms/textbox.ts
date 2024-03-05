import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// <div [formGroup]="form">
// <input *ngIf="!field.multiline" [attr.type]="field.type" class="form-control"  [id]="field.name" [name]="field.name" [formControlName]="field.name">
// <textarea *ngIf="field.multiline" [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
// rows="9" class="form-control" [placeholder]="field.placeholder"></textarea>

// </div> 

// text,email,tel,textarea,password, 
@Component({
    selector: 'textbox',
    template: `
      <div [formGroup]="form">
      <div class="form-label">{{field.label}}</div>
        <mat-form-field appearance="outline" style="width:100%">
          <input *ngIf="!field.multiline" matInput [placeholder]="field.placeholder" [id]="field.name" [name]="field.name"  [formControlName]="field.name">
          <textarea *ngIf="field.multiline" matInput [placeholder]="field.placeholder" [rows]="field.rowcount" [id]="field.name" [name]="field.name"  [formControlName]="field.name"></textarea>
          <mat-hint *ngIf="field.hint">{{field.hint}}</mat-hint>
        </mat-form-field>

      </div> 
    `
 
})
export class TextBoxComponent {
    @Input() field:any = {};
    @Input() form:FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
  
    constructor() {

    }
}