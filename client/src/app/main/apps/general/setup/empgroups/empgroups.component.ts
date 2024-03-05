import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Subject, BehaviorSubject, Observable, merge, fromEvent } from 'rxjs';
import { takeUntil, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import * as jspdf from 'jspdf';  
import * as _ from 'lodash';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';
import { dsAnimations } from '@glits/animations';
import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DsUtils } from '@glits/utils';
import { EmployeeGroupsService } from './empgroups.service';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { CrudService } from '../../../crud.service';

import { AddGroupFormDialogComponent } from './add-group-form-dialog/add-group-form-dialog.component';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('app/main/shared/utils/vfs.js');
// import { InvoiceService } from 'app/main/pages/invoices/invoice.service';



@Component({
  selector: 'app-empgroups',
  templateUrl: './empgroups.component.html',
  styleUrls: ['./empgroups.component.scss'],
  animations   : dsAnimations,
  encapsulation: ViewEncapsulation.None
})
export class EmpgroupsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchInput: FormControl;
  // grpCnt = 5;
  isCntEnabled = false;
  dataSource: FilesDataSource | null;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  emps: any;
  checkboxes: {};
  user: any;
  selectedEmps: any[];
  displayedColumns = [ 'checkbox', 'avatar', 'name','eml_tx','mble_ph'];
  dialogRef: any;

// Private
private _unsubscribeAll: Subject<any>;
 
  disabled: boolean;
  grpCntInput: number;
  _contactsService: any;
  stngForm: FormGroup;
  hasSelectedContacts: boolean;
  grpCnt: number;
   

  constructor(public crdsrv: CrudService,private _formBuilder: FormBuilder, private _empGrpService: EmployeeGroupsService,private _matDialog: MatDialog) {

    //this.getempy();
    this._unsubscribeAll = new Subject();
   
   }

  ngOnInit() {
    //this.getempy();
    this.searchInput = new FormControl('');
    //this.cntControl = new FormControl("", [Validators.max(100), Validators.min(0)])
    this.selectedEmps=[]
    this.stngForm = this._formBuilder.group({
      cntControl: ['',[ Validators.min(0),(control: AbstractControl) => Validators.max(this.selectedEmps.length)(control)]],
      checked:[''],
      grpName:['',[ Validators.required]]
    });
    this.dataSource = new FilesDataSource(this._empGrpService);
    console.log(this.dataSource)
    this._empGrpService.onEmpsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(emps => {
            this.emps = emps;
           
            this.checkboxes = {};
            emps.map(emps => {
              this.checkboxes[emps.id] = false;
          });

            if(this.selectedEmps && this.selectedEmps.length != 0){
              this.stngForm .controls['cntControl'].setValidators(Validators.max(this.selectedEmps.length))
              emps.map(emps => {
                if(_.includes(this.selectedEmps, emps.id)){
                  this.checkboxes[emps.id] = true;
                }else{
                  this.checkboxes[emps.id] = false;
                }
                
            });
            }
        
        });

    this._empGrpService.onSelectedEmpsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(selectedEmps => {
          this.hasSelectedContacts = selectedEmps.length > 0;

            for ( const id in this.checkboxes )
            {
                if ( !this.checkboxes.hasOwnProperty(id) )
                {
                    continue;
                }

                this.checkboxes[id] = selectedEmps.includes(id);
            }
            this.selectedEmps = selectedEmps;
            this.stngForm .controls['cntControl'].setValidators(Validators.max(this.selectedEmps.length))
            this.emps.map(emps => {
              if(_.includes(this.selectedEmps, emps.id)){
                this.checkboxes[emps.id] = true;
              }else{
                this.checkboxes[emps.id] = false;
              }
              
          });
            console.log(this.selectedEmps)
        });
        this.searchInput.valueChanges
        .pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
        .subscribe(searchText => {
            this._empGrpService.onSearchTextChanged.next(searchText);
        });

        this.checked.valueChanges.subscribe(check => {
          check ? this.cntControl.disable() : this.cntControl.enable();
        });
}



  // getempy() {
  //   let rte = "merchant/employes/1"
  //   this.crdsrv.get(rte).subscribe((res) => {
  //     console.log(res['data'])
  //     this.dataSourceone.data = res['data'];
  //   }, (error) => {
  //     console.log(error)
  //   });
  // }


  
  


  /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

  


    /**
     * On selected change
     *
     * @param empId
     */
    onSelectedChange(empId): void
    {
      console.log(empId)
        this._empGrpService.toggleSelectedEmp(empId);
    }

    onAllGrpChk():void{
      if(this.isCntEnabled){
        this.isCntEnabled = false;
      }else{
        this.grpCnt = 0
        this.isCntEnabled = true;
      }
    }

    saveApproval(){
      
      if(this.checked){
      
      
      }else{
        if(this.stngForm.valid){
          
        }
      }
    }
    // checkValue(){
    //   if(this.checked){
    //     this.disabled = true
    //     this.grpCntInput = this.selectedEmps.length;
    //   }else{
    //     this.disabled = false
    //   }
    // }
   
    get checked(){
      return this.stngForm.get('checked') as FormControl;
    }
    get cntControl(){
      return this.stngForm.get('cntControl') as FormControl;
    }
      /**
     * New contact
     */
    newContact(): void
    {
        this.dialogRef = this._matDialog.open(AddGroupFormDialogComponent, {
            panelClass: 'add-group-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
        .subscribe((response) => {
          
          if (!response) {
            return;
          }
          const actionType: string = response[0];
          const insertId : number = response[1]
          switch (actionType) {
            /**
             * Save
             */
            case 'refresh':
              console.log('refresh')
              this._empGrpService.onGroupAdded.next(insertId);
  
  
              break;
         
          }
         
        
        });
    }
}
export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {EmployeeGroupsService} _empGrpService
     */
    constructor(
        private _empGrpService: EmployeeGroupsService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
      console.log("Connected")
        return this._empGrpService.onEmpsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
