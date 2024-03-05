import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';

import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'ds-form-builder',
  template: `
  <form [formGroup]="form">
      <div *ngFor="let field of fields">
          <field-builder [field]="field" [stngs]="stngs" [form]="form" [hidden]="field.hidden"></field-builder>
      </div>

      <br>

      <button *ngIf="stngs.saveBtn" mat-raised-button color="primary"  class = "gtDtls"  (click)="saveFormData(form.value)">Save</button>
      <button  *ngIf="stngs.saveAsBtn" mat-raised-button (click)="saveFormDataAsNew(form.value)">Save As New</button>
      <button  *ngIf="stngs.deleteBtn" mat-raised-button color="warn" (click)="delData(form.value)">Delete</button>
      <button  *ngIf="stngs.closeBtn" mat-raised-button  (click)="closeForm()" style = "margin:0px 10px">Close</button>

    </form> 
  `,
})
export class DsFormBuilderComponent implements OnInit, OnChanges {
  @Output() formEvent = new EventEmitter();
  @Input() initData2: any;
  @Input() formDetails: any;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  fields: any[] = [];// Teh fields in the form
  Formdata: any; // The form data 
  fnctns: any; // functions to be called
  initdata: any; // Initial data
  apis: any; //APIs to be called for the form
  form: FormGroup; // The main form group
  public stngs: any; // Settings
  constructor(private crdsrv: CrudService, public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  saveFormData = function (data_got) {
    if (this.stngs.oper_mode == "new") {
      console.log(data_got)
      if (typeof this.fnctns.onSave === "function") {
        this.fnctns.onSave(data_got);
      } else {
        this.crdsrv.create(data_got, this.apis.ins_url).subscribe(res => {
          if (res['status'] == 200) {
            this.snackBar.open("Sucessfully Added", '', {
              duration: 2000, horizontalPosition: 'end', verticalPosition: 'top',
            });
            this.formEvent.emit({ "dataUpdated": true, "closeForm": true });
          } else if (res['status'] == 404) {
            this.snackBar.open("You do not have permissions to do this operation.Please contact Admin.", '', {
              duration: 4000, horizontalPosition: 'end', verticalPosition: 'top',
            });
            this.formEvent.emit({ "dataUpdated": true, "closeForm": true });
          } else {
            this.snackBar.open("Adding the record failed. Please try again", '', {
              duration: 2000, horizontalPosition: 'end', verticalPosition: 'top',
            });
          }
        })

      }
    } else if (this.stngs.oper_mode == "edit") {
      if (typeof this.fnctns.onUpdate === "function") {
        this.fnctns.onUpdate(data_got);
      } else {
        // console.log("Inside the component update data send to url :: "+this.apis.upd_url.replace(':'+this.formDetails.key_field[0],data_got[this.formDetails.key_field[0]]))
        // console.log("data to save :: "+JSON.stringify(data_got))
        this.crdsrv.create(data_got, this.apis.upd_url.replace(':' + this.formDetails.key_field[0], data_got[this.formDetails.key_field[0]])).subscribe(res => {
          // console.log(res)
          if (res['status'] == 200) {
            this.snackBar.open("Sucessfully Updated", '', {
              duration: 2000, horizontalPosition: 'end', verticalPosition: 'top',
            });
            this.formEvent.emit({ "dataUpdated": true, "closeForm": true });
          } else if (res['status'] == 404) {
            this.snackBar.open("You do not have permissions to do this operation.Please contact Admin.", '', {
              duration: 4000, horizontalPosition: 'end', verticalPosition: 'top',
            });
            this.formEvent.emit({ "dataUpdated": true, "closeForm": true });
          } else {
            this.snackBar.open("Update failed. Please try again", '', {
              duration: 2000, horizontalPosition: 'end', verticalPosition: 'top',
            });
          }
        })

      }
    }

  }


  saveFormDataAsNew = function (data_got) {
    if (typeof this.fnctns.onSaveAs === "function") {
      this.fnctns.onSaveAs(data_got);
    } else {
      console.log("Inside the component")
    }
  }
  closeForm = function () {
    if (typeof this.fnctns.onClose === "function") {
      this.fnctns.onClose();
    } else {
      this.formEvent.emit({ "closeForm": true });
    }
  }
  delData = function (data_got) {
    if (typeof this.fnctns.onClose === "function") {
      this.fnctns.onClose(data_got);
    } else {

      this.confirmDialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '25%',
        panelClass: 'my-class',
        data: { message: 'Are you sure deleting this item ?', id: null, nm: null, entityname: this.stngs.form_title, flag: false, rte: this.apis.del_url.replace(':' + this.formDetails.key_field[0], data_got[this.formDetails.key_field[0]]) }
      });
      this.confirmDialogRef.afterClosed().subscribe((response) => {
        if (response == undefined) { }
        else if (response.status == 200) {
          this.formEvent.emit({ "dataUpdated": true, "closeForm": true });
        }
      })

    }
  }
  ngOnInit() {
    if (this.formDetails.hasOwnProperty('fields')) {
      console.log("Has Fields")
      console.log(this.formDetails.fields)
      this.fields = this.formDetails.fields;
    }
    if (this.formDetails.hasOwnProperty('fnctns')) { this.fnctns = this.formDetails.fnctns; }
    if (this.formDetails.hasOwnProperty('apis')) { this.apis = this.formDetails.apis; }
    if (this.formDetails.hasOwnProperty('Formdata')) { this.Formdata = this.form; }
    if (this.formDetails.hasOwnProperty('stngs')) { this.stngs = this.formDetails.stngs; }


    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type != 'checkbox') {
        fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts)
      }
    }
    this.form = new FormGroup(fieldsCtrls);

    if (this.formDetails.hasOwnProperty('initdata')) {
      this.initdata = this.formDetails.initdata;
      // console.log(this.form)
      // console.log("this.initdata ::"+JSON.stringify(this.initdata[this.formDetails.key_field[0]]) +"End this.initdata")
      for (let k of this.formDetails.key_field) {
        if (!this.initdata[k] === undefined)
          this.form.get(k).setValue(this.initdata[k]);
        // console.log("Key data this.initdata["+k+"]  :: "+this.initdata[k])
      }
      for (let f of this.fields) {
        this.form.get(f.name).setValue(this.initdata[f.name]);
        // console.log("this.initdata["+f.name+"]  :: "+this.initdata[f.name])
      }
    }


  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formDetails.hasOwnProperty('initdata')) {
      this.initdata = this.formDetails.initdata;
      for (let k of this.formDetails.key_field) {
        if (!this.initdata[k] === undefined)

          this.form.get(k).setValue(this.initdata[k]);
      }
      for (let f of this.fields) {
        this.form.get(f.name).setValue(this.initdata[f.name]);
      }
    }
  }
}
