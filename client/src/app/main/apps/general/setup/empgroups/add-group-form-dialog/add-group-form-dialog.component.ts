import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Subject, Observable, merge, BehaviorSubject } from 'rxjs';
import { CrudService } from '../../../../crud.service';

import { takeUntil, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { DataSource } from '@angular/cdk/table';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-add-group-form-dialog',
  templateUrl: './add-group-form-dialog.component.html',
  styleUrls: ['./add-group-form-dialog.component.scss']
})
export class AddGroupFormDialogComponent implements OnInit {


  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  searchInput: FormControl;
  grpCnt = 5;
  isCntEnabled = false;
  dataSource: FilesDataSource | null;
  isLinear = false;
  showProgress = false;
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
  grpForm: FormGroup;
  usrDtls: any;

  constructor(public crdsrv: CrudService,  public snackBar: MatSnackBar,private _formBuilder: FormBuilder, private _empService: EmployeeService,public matDialogRef: MatDialogRef<AddGroupFormDialogComponent>) {

    //this.getempy();
    this._unsubscribeAll = new Subject();
    matDialogRef.disableClose = true;
    this.grpForm = this._formBuilder.group({
      grpName: ['', Validators.required],
      grpDesc: ['', Validators.required]

    });
    this.crdsrv.getUsrLgnDtls().subscribe((res)=>{
      if(res)
      {
        this.usrDtls = JSON.parse(res);
      }
     
    }, (err)=>{

    });
   }

  ngOnInit() {
    //this.getempy();
    this.searchInput = new FormControl('');
    //this.cntControl = new FormControl("", [Validators.max(100), Validators.min(0)])
    this.selectedEmps=[]
 
    this.dataSource = new FilesDataSource(this._empService,this.paginator);
   
    console.log(this.dataSource)
    this._empService.onEmpsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(emps => {
            this.emps = emps;
           console.log(this.emps)
            this.checkboxes = {};
            emps.map(emps => {
              this.checkboxes[emps.id] = false;
          });

            if(this.selectedEmps && this.selectedEmps.length != 0){
              emps.map(emps => {
                if(_.includes(this.selectedEmps, emps.id)){
                  this.checkboxes[emps.id] = true;
                }else{
                  this.checkboxes[emps.id] = false;
                }
                
            });
            }
        
        });

    this._empService.onSelectedEmpsChanged
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(selectedEmps => {
            for ( const id in this.checkboxes )
            {
                if ( !this.checkboxes.hasOwnProperty(id) )
                {
                    continue;
                }

                this.checkboxes[id] = selectedEmps.includes(id);
            }
            this.selectedEmps = selectedEmps;
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
            this._empService.onSearchTextChanged.next(searchText);
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
        this._empService.toggleSelectedEmp(empId);
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
      
    
    }
    createGroup(){
      console.log("Called Group")
      let rte = "merchant/employesGrps/"
      let data = this.grpForm.value;
      data['mrcht_id'] = this.usrDtls.mrcht_id;
      data['empsIds'] = this.selectedEmps;
      this.crdsrv.create(data, rte).subscribe((res) => {
        this.showProgress = false;
        this.snackBar.open('Group Added Successfully', 'Close', {
          duration: 1000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this._empService.deselectEmps()
        this.matDialogRef.close(['refresh',res['data'].insertId]);
      }, (error) => {
        this.showProgress = false;
        console.log(error);
      });

    }
   
 
}
export class FilesDataSource extends DataSource<any>
{
  private _empDataChange = new BehaviorSubject('');
    /**
     * Constructor
     *
     * @param {EmployeeService} _empService
     * 
     */
    
    constructor(
        private _empService: EmployeeService, private _matPaginator: MatPaginator
    )
    {
        super();
        this.empData = this._empService.emps; 
    }

    // Filtered data
    get empData(): any
    {
       
        return this._empDataChange.value;
    }
    set empData(value: any)
    {
       
        this._empDataChange.next(value);
    }
    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
      console.log("Connected")
      const displayDataChanges = [
        this._empService.onEmpsChanged,
        this._matPaginator.page,
    ];

    return merge(...displayDataChanges).pipe(map(() => {

            let data = this._empService.emps.slice();
            this.empData =[...data];
            // Grab the page's slice of data.
            const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
            return data.splice(startIndex, this._matPaginator.pageSize);
        })
    );
        //return this._empService.onEmpsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
