import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { TrainerDtlComponent } from 'app/main/apps/lms/master/trainers/trainer-dtl/trainer-dtl.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit {
  trnrslst: any;
  filterBy: number =2;
  dialogRef: any;
  catTrngs: any;
  onlineIndicator=0
  distlst : [any];
  ulbL: [any];
  searchTerm:any;
  currentCategory :any;
  rowData:any;
  columnDefs:any;
  getRowHeight;
  gridApi: any;
  gridColumnApi: any;
  constructor(private crdsrv: CrudService,private route: Router,public dialog: MatDialog, private transfereService: TransfereService,public snackBar: MatSnackBar) {
    let rowHeight = 45;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
   }

  ngOnInit() {
   this.trnrs()
   this.dsrtcLst()
   this.columnDefs = [
    { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 },
    { headerName: 'Trainer name', field: 'trnr_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 200, filter:true },
    { headerName: 'Trainer Email', field: 'trnr_email_id', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 250, filter:false},
    { headerName: 'Trainer Mobile No', field: 'trnr_mbl_num', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, filter:false},
    { headerName: 'Trainer Department', field: 'dprt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, filter:false},
    { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 240, filter:true},
    { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 240, filter:true},
    {
      headerName: 'Edit',
      cellStyle: { textAlign: 'center' },
      width: 150,
      cellRenderer: function (param) {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = `<button class="btn-simple editBtn-color edtBtnstls" >
        <mat-icon class="s-20 mat-icon material-icons">edit</mat-icon>
         </button>`; 
      const eButton = eDiv.querySelectorAll('.btn-simple')[0];
         eButton.addEventListener('click', function (param) {
           // console.log(param);
         });
         return eDiv;
       
      },
    }, {
      headerName: 'Delete',
      
      cellStyle: { textAlign: 'center' },
      width: 150,
      cellRenderer: function (param) {
        const eDiv = document.createElement('div');
        eDiv.innerHTML = `<button class="btn-simple dlteBtnStyls" >
        <mat-icon  class="s-20 mat-icon material-icons deleteBtn-icon-color" >delete</mat-icon>
        </button>`;
    const eButton = eDiv.querySelectorAll('.btn-simple')[0];
         eButton.addEventListener('click', function (param) {
           // console.log(param);
         });
         return eDiv;
       
      },
    }, { headerName: 'view', cellRenderer:() => {  return '<button  mat-raised-button class="scd-btn">view</button>' },sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
   ];
  
  }
  onGridReady(params): void {
    console.log(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   }
   onCellClick(data) {
    console.log(data.data)
    if(data.colDef.headerName=="view"){
      console.log(data)
      this.openstatus(data.data)

    }
    if(data.colDef.headerName=="Delete"){
     console.log("delete")
     this.delete(data.data)
    }
    if(data.colDef.headerName=="Edit"){
      

       console.log("edit")
    
       this.edit(data.data)

    }
  
  }
  trnrs(){
    const rte = 'web/common/trnrtrngLst';
    this.crdsrv.getDistLst(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.trnrslst = res['data'];
          this.filter(this.filterBy,this.trnrslst)
          console.log(this.trnrslst)
          this.rowData = this.trnrslst
        
        }
      }
    })
    

  }
  dsrtcLst() {
    const rte = 'web/common/dstrctLst';
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res);
      console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.distlst = res['data'];
          console.log(this.distlst)
        }
      }
    })
  }  
  ulbLst(ulb){
    const rte = 'web/common/mandalLst/' + ulb.value;
    this.crdsrv.getDistLst(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.ulbL = res['data'];
          
        }
      }
    })
    this.catTrngs=[]
    for(let i=0;i<this.trnrslst.length;i++){
      if(this.trnrslst[i].trnr_dist_id == ulb.value){
       this.catTrngs.push(this.trnrslst[i])
      }
    }
    this.filter(this.filterBy,this.catTrngs)
    console.log(ulb.value);
    console.log(this.catTrngs)
  }
  filter(id,data){
    this.catTrngs=[]
    if(id == 2){
      this.catTrngs =data
    }
    else{
      for(let i=0;i<data.length;i++){
        if(data[i].trnr_mstr_in == id){
         this.catTrngs.push(data[i])
        }
      }
    }
  
    console.log(this.catTrngs)
  }
  changeFilter(filter){
    this.filterBy = filter
    this.onlineIndicator = filter
     this.filter(filter,this.trnrslst)
    
  
  }
  addTrainer() {
    this.route.navigate([`/admin/lms/trainer/addTrainer`])

  }
  filterCoursesByTerm(){
    
  }
  delete(trnr){
    const rte = 'web/common/trainerdlt';
    this.crdsrv.create(trnr, rte).subscribe((res) => {
     console.log(res)
   
     if (res['status'] == 200) {
      this.trnrs()
      this.dsrtcLst()
       this.snackBar.open("trainer Sucessfully deleted", 'End now', {
         duration: 2000,
         horizontalPosition: "center",
         verticalPosition: "top",
       });
      
     }
    //this.ScheduleForm.reset();
    
   }, (error) => {
     console.log(error)
   })
  }
  edit(edit){
    console.log(edit)
    this.transfereService.setData(edit);

    console.log(edit)
  
    this.route.navigate([`/admin/lms/trainer/addTrainer`])
  }
  /**
     * Edit Event
     *
     * @param {string} action
     * @param {CalendarEvent} event
     */
  openstatus(row): void {
    //const eventIndex = this.schedules.indexOf(event);

    this.dialogRef = this.dialog.open(TrainerDtlComponent, {
        panelClass: 'trnr-dtl-dialog',
        data: {
            data:row,
            event: event  
        }
    });

    this.dialogRef.afterClosed()
        .subscribe(response => {
            if (!response) {
                return;
            }
            const actionType: string = response[0];
            const formData: FormGroup = response[1];
            switch (actionType) {
                /**
                 * Save
                 */
                case 'save':

                 

                    break;
              
            }
        });
}


}
