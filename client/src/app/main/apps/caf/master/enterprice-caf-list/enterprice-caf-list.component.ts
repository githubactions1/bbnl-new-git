import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { UserService } from 'app/providers/user/user.serivce';
import { Router } from '@angular/router';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-enterprice-caf-list',
  templateUrl: './enterprice-caf-list.component.html',
  styleUrls: ['./enterprice-caf-list.component.scss']
})
export class EnterpriceCafListComponent implements OnInit {
  firstFormGroup: FormGroup;
  rowData: any;
  shwLdr;
  columnDefs;
  permissions;
  public cstmrData: any;
  mndl_lst: any;
  CafTyp: any;
  Cafstus: any;
  districts: any;
  department_names: any;
  usrdtls: any;
  cafFRm: FormGroup;
  showTble;
  agnt_dta: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lmoTrmndCafForm: FormGroup;
  isLoading;
  filteredAgents: any[];
  errorMsg: string;
  disabled = false;
  getHeaderDtls = function (): any { return { 'title': ' Enterprise CAF  List', 'icon': 'people_outline' }; };
  constructor(private crdSrv: CrudService, private _formBuilder: FormBuilder,private datePipe: DatePipe,private snackBar: MatSnackBar, private userService: UserService, private route: Router, private _dsSidebarService: DsSidebarService,
    public TransfereService: TransfereService) { }

  ngOnInit() {
    const permTxt = 'Enterprise CAF Creation';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdSrv.get(prmeRte).subscribe((res) => {
       console.log(res['data'][0]);
      this.permissions = res['data'][0];
    });
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    console.log(this.usrdtls);
    this.cafFRm = this._formBuilder.group({
      dstrc_id: ['', Validators],
      lmo_nm: ['', Validators],
      mobileno: ['', Validators],
      CAf: ['', Validators],
      adhar: ['', Validators],
      str_dt: ['', Validators],
      end_dt: ['', Validators],
      till_dt: ['', Validators],
      mso_id: ['', Validators],
      org_nm: ['', Validators],
      Apsf_id: ['', Validators],
      Reg_no: ['', Validators],
      Caf_sts: ['', Validators],
	  ent_dprtmnt_nm: ['', Validators],
      mndl_nu: ['', Validators]
    });
    // this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    // this.getCafsData()
    this.getDistricts();
    this.getCafType();
    this.getCafStus();
	this.getentdprmntnm();
    // this.cafFRm = this._formBuilder.group({
    //   lmo_nm: ['', Validators]
    // });
    this.cafFRm.get('lmo_nm').valueChanges
        .pipe(
          debounceTime(500),
          tap(() => {
            this.errorMsg = '';
            this.filteredAgents = [];
            this.isLoading = true;
          }),
          switchMap((value) => {
            if (value){
            if (value.length >= 3 || value.length !==  null) {
              return this.crdSrv.get('agent/getAgentBySearch/' + value)
                .pipe(
                  finalize(() => {
                    this.isLoading = false;
                  }),
                );
            }
          }
          })
        )
        .subscribe(data => {
          if (data['data'] === undefined) {
            this.errorMsg = data['Error'];
            this.filteredAgents = [];
          } else {
            this.errorMsg = '';
            this.filteredAgents = data['data'];
          }
        });
        if(this.usrdtls.usr_ctgry_id==8) {
          this.disabled=true;
          var rte=`agent/agents/${this.usrdtls.usr_ctgry_ky}`  
          this.crdSrv.get(rte).subscribe(res => {
            this.agnt_dta=res['data']['agnt_info'][0]
          })
        }
  }
  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }
  getMandals(id) {
    const rte = `admin/mandals/${id}`;
    this.crdSrv.get(rte).subscribe((res) => {
      this.mndl_lst = res['data'];
    })
  }

  getCafType() {
    this.crdSrv.get('caf/caf-type').subscribe(res => {
      console.log(res)
      this.CafTyp = res['data']
    })

  }
  getCafStus() {
    this.crdSrv.get('caf/caf-status').subscribe(res => {
      console.log(res)
      this.Cafstus = res['data']
    })
  }

  getentdprmntnm() {
    const rte = `crm/entDepartmentNames`;
    this.crdSrv.get(rte).subscribe((res) => {
      this.department_names = res['data'];
      console.log(this.department_names)
    })
  }
  onValueChanged(value) {
    console.log(value)

  }
  getDistricts() {

    this.crdSrv.get("admin/districts").subscribe(res => {
      console.log(res)
      this.districts = res['data']
    })
  }
  onCellPrepared(colDef, e) {
    
    if (e.rowType === "data" && e.row.data && e.column.dataField == 'Profile') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
       e.cellElement.style.background= 'rgba(243, 191, 176, 0.2784313725490196)';
       e.cellElement.style.backgroundClip= 'content-box';
       e.cellElement.style.cursor = "pointer";
    }
 
}
onCellClick(event): any{
  console.log(event);
  if (event.value == 'Profile'){
   this.cstmrData = event.data;
   console.log(event.data);
  this.openSideBar();
  }
}
addNewCaf() {
  
  this.route.navigate([`/admin/caf/enterprice/caf/form`])
  // this.route.navigate([`/admin/caf/entcustomer/new-caf`])

}
  openSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar(): any {
    this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  // getCafsData() {
    
  //   const data = {
  //     Caf_type: 2
  //   };
  //   this.shwLdr = true;
  //   this.crdSrv.create(data, 'caf/getdt').subscribe(res => {
  //     this.rowData = res['data'];
  //     console.log(this.rowData);
  //     this.shwLdr = false;

  //     this.columnDefs = [
  //       { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false, columnFiltering: false },
  //       // tslint:disable-next-line:max-line-length
  //       { headerName: 'CAF No', field: 'caf_nu', alignment: 'center' , cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ] },
  //       { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false,  filter: true },
  //       { headerName: 'Name', field: 'cstmr_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, search: false, columnFiltering: false },
  //       // tslint:disable-next-line:max-line-length
  //       { headerName: 'Mobile Number', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ], selectedFilterOperation: 'contains', allowFiltering: true },
  //       { headerName: 'Status', field: 'sts_nm',  cellClass: 'pm-grid-number-cell', width: 125, filter: false, columnFiltering: true },
  //       { headerName: 'Billing Frequency', field: 'frqncy_nm',  cellClass: 'pm-grid-number-cell', width: 110, filter: true, columnFiltering: false },
  //       { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
  //       { headerName: 'ONU Serial NO', field: 'onu_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
  //       { headerName: 'iptv Serial NO', field: 'iptv_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
  //       { headerName: 'subscriber code', field: 'mdlwe_sbscr_id', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false }
  //     ];
  //   });
  // }
  Reset(Form) {
    this.showTble = false
    Form.reset()
    console.log(this.cafFRm)
    // this.crdSrv.create({}, "caf/caf").subscribe(() => {

    // })
  }
  
  getDetails() {
    console.log(this.cafFRm)
    if(this.cafFRm.value.dstrc_id  || this.cafFRm.value.mndl_nu  || this.cafFRm.value.lmo_nm.agnt_id  || this.cafFRm.value.mobileno  ||
    this.cafFRm.value.CAf  ||  this.cafFRm.value.org_nm  || this.cafFRm.value.ent_dprtmnt_nm ||
     this.cafFRm.value.Caf_sts  || this.cafFRm.value.adhar  || this.cafFRm.value.str_dt  || this.cafFRm.value.end_dt || this.cafFRm.value.till_dt  ){
      //  if(this.usrdtls.usr_ctgry_id==1){
      //     console.log(this.agnt_dta)
      //        if(this.agnt_dta.ofce_dstrt_id==this.cafFRm.value.dstrc_id && this.agnt_dta.ofce_mndl_id == this.cafFRm.value.mndl_nu){
      //         if (this.cafFRm.value['till_dt'] == true) {
      //           this.shwLdr = true;
      //           var data = {
      //             Caf_type: 2,
      //             dstrc_id: this.cafFRm.value['dstrc_id'],
      //             agntId: this.cafFRm.value.lmo_nm.agnt_id,
      //             mso_id: this.cafFRm.value['mso_id'],
      //             mobileno: this.cafFRm.value['mobileno'],
      //             CAf: this.cafFRm.value['CAf'],
      //             adhar: this.cafFRm.value['adhar'],
      //             till_dt: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
      //             org_nm: this.cafFRm.value['org_nm'],
      //             Apsf_id: this.cafFRm.value['Apsf_id'],
      //             Reg_no: this.cafFRm.value['Reg_no'],
      //             Caf_sts: this.cafFRm.value['Caf_sts'],
      //             mndl_id: this.cafFRm.value['mndl_nu'],
      //           }
      //           this.crdSrv.create(data, "caf/getdt").subscribe(res => {
      //             this.rowData = res["data"]
      //             this.shwLdr = false;
      //             if (res["data"]) {
      //               this.showTble = true
          
      //             }
          
      //           })
          
      //         } else {
      //           this.shwLdr = true;
      //           this.cafFRm.value['str_dt'] = this.datePipe.transform(this.cafFRm.value.str_dt, 'yyyy-MM-dd');
      //           this.cafFRm.value['end_dt'] = this.datePipe.transform(this.cafFRm.value.end_dt, 'yyyy-MM-dd');
      //           var Data = {
      //             Caf_type: 2,
      //             dstrc_id: this.cafFRm.value['dstrc_id'],
      //             agntId: this.cafFRm.value.lmo_nm.agnt_id,
      //             mso_id: this.cafFRm.value['mso_id'],
      //             mobileno: this.cafFRm.value['mobileno'],
      //             CAf: this.cafFRm.value['CAf'],
      //             adhar: this.cafFRm.value['adhar'],
      //             str_dt: this.cafFRm.value['str_dt'],
      //             end_dt: this.cafFRm.value['end_dt'],
      //             org_nm: this.cafFRm.value['org_nm'],
      //             Apsf_id: this.cafFRm.value['Apsf_id'],
      //             Reg_no: this.cafFRm.value['Reg_no'],
      //             Caf_sts: this.cafFRm.value['Caf_sts'],
      //             mndl_id: this.cafFRm.value['mndl_nu'],
          
      //           }
      //           this.crdSrv.create(Data, "caf/getdt").subscribe(res => {
      //             this.rowData = res["data"]
      //             this.shwLdr = false;
      //             if (res["data"]) {
      //               this.showTble = true
      //             }
      //             console.log(this.rowData)
      //           })
      //         }
      //        }else{
      //         this.snackBar.open('permision denied for this action', 'Undo', {
      //           duration: 3000,
      //           horizontalPosition: this.horizontalPosition,
      //           verticalPosition: this.verticalPosition,
      //         });
      //        }  
      //  }else{
        if (this.cafFRm.value['till_dt'] == true) {
          this.shwLdr = true;
          var data = {
            Caf_type: 2,
            dstrc_id: this.cafFRm.value['dstrc_id'],
            agntId: this.cafFRm.value.lmo_nm.agnt_id,
            mso_id: this.cafFRm.value['mso_id'],
            mobileno: this.cafFRm.value['mobileno'],
            CAf: this.cafFRm.value['CAf'],
            adhar: this.cafFRm.value['adhar'],
            till_dt: this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
            org_nm: this.cafFRm.value['org_nm'],
            Apsf_id: this.cafFRm.value['Apsf_id'],
            Reg_no: this.cafFRm.value['Reg_no'],
            Caf_sts: this.cafFRm.value['Caf_sts'],
            mndl_id: this.cafFRm.value['mndl_nu'],
			ent_dprtmnt_id: this.cafFRm.value['ent_dprtmnt_nm'],
			apsfl_bbnl : 4
          }
          this.crdSrv.create(data, "caf/getdt").subscribe(res => {
            this.rowData = res["data"]
            this.shwLdr = false;
            if (res["data"]) {
              this.showTble = true
    
            }
    
          })
    
        } else {
          this.shwLdr = true;
          this.cafFRm.value['str_dt'] = this.datePipe.transform(this.cafFRm.value.str_dt, 'yyyy-MM-dd');
          this.cafFRm.value['end_dt'] = this.datePipe.transform(this.cafFRm.value.end_dt, 'yyyy-MM-dd');
          var Data = {
            Caf_type: 2,
            dstrc_id: this.cafFRm.value['dstrc_id'],
            agntId: this.cafFRm.value.lmo_nm.agnt_id,
            mso_id: this.cafFRm.value['mso_id'],
            mobileno: this.cafFRm.value['mobileno'],
            CAf: this.cafFRm.value['CAf'],
            adhar: this.cafFRm.value['adhar'],
            str_dt: this.cafFRm.value['str_dt'],
            end_dt: this.cafFRm.value['end_dt'],
            org_nm: this.cafFRm.value['org_nm'],
            Apsf_id: this.cafFRm.value['Apsf_id'],
            Reg_no: this.cafFRm.value['Reg_no'],
            Caf_sts: this.cafFRm.value['Caf_sts'],
            mndl_id: this.cafFRm.value['mndl_nu'],
			ent_dprtmnt_id: this.cafFRm.value['ent_dprtmnt_nm'],
			apsfl_bbnl : 4			
          }
          this.crdSrv.create(Data, "caf/getdt").subscribe(res => {
            this.rowData = res["data"]
            this.shwLdr = false;
            if (res["data"]) {
              this.showTble = true
            }
            console.log(this.rowData)
          })
        }
      //  }
    
    }else{
      this.snackBar.open('please Select atleast District', 'Undo', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    
    console.log(this.cafFRm.value)
    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, filter: false, search: false, columnFiltering: false },
        // tslint:disable-next-line:max-line-length
        { headerName: 'CAF No', field: 'caf_nu', alignment: 'center' , cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ] },
        { headerName: 'Profile', field: 'Profile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, columnFiltering: false,  filter: true },
        { headerName: 'Name', field: 'cstmr_nm',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, search: false, columnFiltering: false },
        // tslint:disable-next-line:max-line-length
        { headerName: 'Mobile Number', field: 'cntct_mble1_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true , columnFiltering: false, filterOperations: [ 'contains', 'startswith', '=' ], selectedFilterOperation: 'contains', allowFiltering: true },
        { headerName: 'Status', field: 'sts_nm',  cellClass: 'pm-grid-number-cell', width: 125, filter: false, columnFiltering: true },
        { headerName: 'Enterprise Type', field: 'entrpe_type_nm',  cellClass: 'pm-grid-number-cell', width: 110, filter: true, columnFiltering: false },
        { headerName: 'Billing Frequency', field: 'frqncy_nm',  cellClass: 'pm-grid-number-cell', width: 110, filter: true, columnFiltering: false },
        { headerName: 'Activation Date', field: 'actvn_dt', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
		{ headerName: 'Package Name', field: 'pckge_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'OLT IP', field: 'olt_ip_addr_tx', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
		{ headerName: 'Department Name', field: 'ent_dept_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'Organization Code', field: 'orgnsn_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'ONU Serial NO', field: 'onu_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'iptv Serial NO', field: 'iptv_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        // { headerName: 'subscriber code', field: 'mdlwe_sbscr_id', alignment: 'left', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'District', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
		{ headerName: 'Mandal', field: 'mndl_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
        { headerName: 'Address', field: 'adrss', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, filter: true, columnFiltering: false },
        { headerName: 'LmoCode', field: 'lmo_cd', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 125, filter: true, columnFiltering: false },
      ];
    
  }
}