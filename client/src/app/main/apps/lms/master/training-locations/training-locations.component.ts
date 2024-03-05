import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../crud.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-training-locations',
  templateUrl: './training-locations.component.html',
  styleUrls: ['./training-locations.component.scss']
})
export class TrainingLocationsComponent implements OnInit {
  VnsLst: any;
  dstLst: any;
  mndLst: any;
  cln_vnudt: any;
  dstid: any;
  mndal:any
  dstrct:any
  NoDtFound: boolean=false;
  rowData:any;
  columnDefs:any;
  getRowHeight;
  gridApi: any;
  gridColumnApi: any;
  constructor(private apiSrvc:CrudService,private route: Router, private transfereService: TransfereService,public snackBar: MatSnackBar) { 
    let rowHeight = 45;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
  }

  ngOnInit() {
    this.dstrcts()
    this.grddata()
     //this.rowData = this.VnsLst

     this.columnDefs = [
       { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 },
       { headerName: 'Venue name', field: 'trng_vnu_nm', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 250, filter:true },
       { headerName: 'Venue Capacity', field: 'trng_vnu_cpsty_ct', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, filter:false},
       { headerName: 'Venue Mobile No', field: 'trng_vnu_mble_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, filter:false},
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
  grddata(){
    this.apiSrvc.get('/web/common/vnusLst').subscribe((res) => {
      this.VnsLst= res['data']
      console.log(this.VnsLst)
      this.rowData = this.VnsLst
     });
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

    }
    if(data.colDef.headerName=="Delete"){
     console.log("delete  ")
     const rte = 'web/common/vnudlt';
     this.apiSrvc.create(data.data, rte).subscribe((res) => {
      console.log(res)
    
      if (res['status'] == 200) {
        this.snackBar.open("Venue Sucessfully Deleated", 'End now', {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        });
        this.grddata()
       
      }
     //this.ScheduleForm.reset();
     
    }, (error) => {
      console.log(error)
    })

    }
    if(data.colDef.headerName=="Edit"){
       this.transfereService.setData(data.data);

       console.log("edit")
    
       this.route.navigate([`/admin/lms/venueform`])

    }
  
  }
  dstrcts() {
    this.apiSrvc.get('/web/common/dstrctLst').subscribe((res) => {
      this.dstLst= res['data']
      console.log(this.dstLst)
     });
     
  }


  dstrChangd(id){
    console.log(id)
    this.mndal="all"
    this.dstid=id
      console.log(this.cln_vnudt)
      this.VnsLst=[]
    this.apiSrvc.get('/web/common/mandalLst/'+id).subscribe((res) => {
      this.mndLst= res['data']
      console.log(this.mndLst)
     });
     this.cln_vnudt.forEach(item =>{
       if(item.dstrt_id==id){
        this.VnsLst.push(item)
       }else if(id =="all"){
         this.VnsLst.push(item)
       }
     })
     if(this.VnsLst===[]){
       console.log("hi")
       this.NoDtFound=true
     }
    
  }



  
mndalchgd(id){

console.log(id)
this.VnsLst=[]
this.cln_vnudt.forEach(item =>{
  if(item.dstrt_id==this.dstid && item.mndl_id==id){
   this.VnsLst.push(item)
  }else if(id=='all'){
    if(item.dstrt_id==this.dstid){
      this.VnsLst.push(item)
    }
  }
})

}
addVenue(){
  this.route.navigate([`/admin/lms/venueform`])
}

}
