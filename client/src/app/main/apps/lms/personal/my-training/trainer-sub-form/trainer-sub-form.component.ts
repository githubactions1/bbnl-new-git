import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../../crud.service';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-trainer-sub-form',
  templateUrl: './trainer-sub-form.component.html',
  styleUrls: ['./trainer-sub-form.component.scss']
})
export class TrainerSubFormComponent implements OnInit {
  sublst: any;
  columnDefs = [];
  pagination: boolean = true;
  paginationPageSize = 50;
  rowData = [];
  getRowHeight
  gridApi: any;
  gridColumnApi: any;
  rowSelection:any;
  courseForm: FormGroup;
  date: any;
  getdata: any;
  selectedEmps: any = [];
  curDate: Date;
  Imgsrc: any;
  img = [];
  shwImgView: boolean =false;
  shwsrcimg: any;
  loadingCellRendererParams:any;
  loadingCellRenderer:any;
  schFormDt: { st_dt: any; end_dt: any; img_url: any; emps: any; };
  constructor(private datePipe: DatePipe, private crdsrv: CrudService,public snackBar: MatSnackBar) {
    let rowHeight = 45;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
   }

  ngOnInit() {
    const rte = 'web/common/sublst'
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res)
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.sublst = res['data'];
          this.rowData = this.sublst
          console.log(this.sublst)
        }
      }
    })
    console.log(this.rowData)
    this.columnDefs = [
      
      { headerName: 'Name', field: 'mrcht_emp_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 350, suppressSizeToFit: true },
      { headerName: 'Mobile Number', field: 'mbl_nu', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 250, suppressSizeToFit: true },
      { headerName: 'Batch Name', field: 'schdl_batch_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 450, suppressSizeToFit: true },
      { headerName: 'Training Name', field: 'trng_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 450, suppressSizeToFit: true },
      { headerName: '', filter: false, width: 80  , headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true},
      
    ];
    this.rowSelection = "multiple";
    this.date = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    console.log(this.sublst)
    this.courseForm = new FormGroup({
      //schdl_id: new FormControl(this.sublst[0].schdl_id, Validators.required),
      SchDatestart: new FormControl(this.date, Validators.required),
      SchDateend: new FormControl(this.date, Validators.required)
    })
  }
 
  onGridReady(params): void {
    console.log(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   }
   onCellClick(data) {
    console.log(data)
  
  }
  onRowSelected(event) {
    console.log(event)
    console.log(event.node.selected)
    
 
  }
  preview(files) {
    console.log(files);
    this.curDate = new Date();
      if (files.length === 0)
        return;
         console.log("h")
        for (let i = 0; i < files.length; i++) {
          var mimeType = files[i].type;
          var reader = new FileReader();
          
          reader.readAsDataURL(files[i]);
          reader.onload = (_event: any) => {
            this.Imgsrc = _event.target.result;
            this.img =[]
            this.img.push({
              'atcht_pth_tx': this.Imgsrc,         
            })
            console.log(this.img);
            this.shwImgView = true;
            this.shwsrcimg =this.img[0].atcht_pth_tx
           
          }
         
        }
       
  
      
  }
  trngsub(){
    
    // console.log(this.courseForm)
    // let data = this.courseForm.value;
    this.selectedEmps=this.gridApi.getSelectedRows()
   
  //  data['emps'] = this.selectedEmps;
    console.log(this.selectedEmps)
    // console.log(data)
   
    this.schFormDt = {
      st_dt :this.courseForm.value.SchDatestart,
      end_dt : this.courseForm.value.SchDateend,
      
      img_url:this.shwsrcimg,
      emps:this.selectedEmps
      }
      console.log(this.schFormDt)
   const rte = 'web/common/trngsubfrm';
   this.crdsrv.create(this.schFormDt, rte).subscribe(res => {
     if (res['status'] == 200) {
       this.snackBar.open("submitted Sucessfully Added", 'End now', {
         duration: 2000,
         horizontalPosition: "center",
         verticalPosition: "bottom",
       });
      
     }
     console.log(res)
   })
}

}
