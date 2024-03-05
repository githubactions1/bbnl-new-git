import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../crud.service';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-audit',
  templateUrl: './user-audit.component.html',
  styleUrls: ['./user-audit.component.scss']
})
export class UserAuditComponent implements OnInit {
  getRowHeight: (params: any) => number;
  startDate = '';
  endDate = new FormControl(new Date());
  loginfo: any;
  hdrDta:any;
  shwTotlCntTble= true;
  hdeTotlCntTble = false
  pagination: boolean = true;
  paginationPageSize = 10;
  lgn_inpts = {
 
    frm_dt: '',
    to_dt: '',
  }

  showReset = false;
  count = 0
  mrcht_usr_id: any;
  permissions;
  loader:boolean;

  getHeaderDtls = function() { return {"title":"User Login Information","icon":"person"}}

  constructor(private crdsrv: CrudService,private datePipe: DatePipe) {
    let rowHeight = 40;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 0, "dlte_in": 0, "exprt_in": 1 };
   }
 
 
  // columnDefs = [
  //   { headerName: 'Sno', field: 'sno',alignment: 'left', filter: false , width:70},
  //   { headerName: 'Person Name',alignment: 'left',field: 'fst_nm'   },
  //   { headerName: 'User Name',alignment: 'left',field: 'mrcht_usr_nm' },
  //   { headerName: 'Mobile Number',alignment: 'left',field: 'mbl_nu' },
  //   { headerName: 'Login Status',alignment: 'left',field: 'lgn_sts', filter : false},
  //   { headerName: 'Last Login Time',alignment: 'left',field: 'lst_lgn_ts', filter : false},
  //   { headerName: 'Total Login Count',alignment: 'left',field:'lgn_cnt', filter : false},
  // ]

  columnDefs = [
    { headerName: 'Sno', alignment: 'center',field: 'sno', filter: false , width:70},
    { headerName: 'Person Name',alignment: 'left',field: 'fst_nm'   },
    { headerName: 'User Name',alignment: 'left',field: 'mrcht_usr_nm' },
    { headerName: 'Mobile Number',alignment: 'center',field: 'mbl_nu' },
    { headerName: 'Login Status',alignment: 'left',field: 'lgn_sts', filter : false},
    { headerName: 'Last Login Time',alignment: 'center',field: 'lst_lgn_ts', filter : false},
  ]

  
 
  rowData = [];
  
  ngOnInit() {

    
    this.getUserAuditDtls();

  }

  getUserAuditDtls(){

    let data = {
      frm_dt: this.datePipe.transform(this.lgn_inpts.frm_dt, "yyyy-MM-dd"),
      to_dt: this.datePipe.transform(this.lgn_inpts.to_dt, "yyyy-MM-dd"),
    }

    this.loader=true;
    let rte = "user/loginfo"
    this.crdsrv.create(data, rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false;
        console.log(res['data'])
      this.loginfo = res['data'];
     
      for(let i = 0; i < this.loginfo.length; i++){
        
          this.rowData = this.loginfo[i].lgn_dtls;
        
      } let count = 0;
      this.rowData.forEach(element => {
        element['sno'] =++count;
      });
      // console.log(this.loginfo) 
      }
      
     
    }, (error) => {
      // console.log(error)
    });
  }

  // onCellClick(event) {
  //   if (event.colDef.headerName == 'Total Login Count'){
   
  //     // this.mrcht_usr_id = event.data.mrcht_usr_id;
  //     this.showReset = true;
  //     this.shwTotlCntTble= false;
  //     this. hdeTotlCntTble = true
  //     console.log( this.rowData)
  //     for(let i = 0; i < this.loginfo.length; i++){
  //       if(event.data.mrcht_usr_id == this.loginfo[i].mrcht_usr_id){
  //         this.rowData = this.loginfo[i].lgn_dtls;
  //       }
  //     }

  //     let count = 0;
  //     this.rowData.forEach(element => {
  //       element['sno'] =++count;
  //     });
  //     // console.log(this.loginfo) 
  //     }
  // }


  // resetloginDtls(){
  //   this.getUserAuditDtls();
  //   this.showReset = false;
  //   this.shwTotlCntTble= true;
  //   this.hdeTotlCntTble = false
  // }

  getloginDtls(){
    console.log("....getdata.....")
    this. getUserAuditDtls();
  }

}
