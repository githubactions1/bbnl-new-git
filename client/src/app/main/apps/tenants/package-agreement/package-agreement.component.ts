import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { ConditionalExpr } from '@angular/compiler';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';



@Component({
  selector: 'app-package-agreement',
  templateUrl: './package-agreement.component.html',
  styleUrls: ['./package-agreement.component.scss']
})


export class PackageAgreementComponent implements OnInit {
  columnDefs: any;
  gridColumnDefs: any;
  gridData: any;
  initdata: any;
  gridApi;
  permissions;
  mainMessage;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  lmoPymntsForm: FormGroup;
  msoPymntsForm:FormGroup;
  cmpltPackgsData = [];
  arrayData = [];
  filteredOptions = [];
  
  // getHeaderDtls = function () { return { 'title': this.formDetails.stngs.form_title + ' List', 'icon': 'receipt' } }
  packageLstData: any;
  chkBoxesView: boolean;
  SingleTemplate: boolean;
  MultiTemplate: boolean;
  viewtentsData: boolean;
  asPrtnrsData: boolean = false
  data: { label: string; checked: boolean; }[];
  jSondata: { label: string; checked: boolean; }[];
  SlctOne: any;
  selectTemplates: any;
  loader: boolean;
  templeLstData: any;
  tenantsData: any;
  tenTData: any;
  asTenantsData: any;
  viewtntData: boolean = false;
  crtNewArmnt: boolean = false
  tableVw: boolean = true;
  packagesData: any;
  insertData: any;
  assignView: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  dialogRef: any;
  gridRowData: any;
  subTablesData: any;
  subtable: boolean = false;
  packageServices: any;
  templatePartners: any;
  ForLpData: any;
  agrmntDtls: any;
  comment: any;
  ifelse: boolean;
  partnersDtls: any;
  clickview:boolean = true;
  viewId:any;
  smvlue =0;
  srnidx = 0;
  clckopnclsd:any;
  servicecolumndefs: { headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; }[];
  partnerscolumndefs: { headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; }[];
  shocolumnDefs:any;
  getRowHeight = function () { return 40; };
  getHeaderDtls = function () { return { 'title': 'Package Agreement', 'icon': 'list_alt' }; };
  serviceslst: any;
  filteredAgents: any;
  errorMsg: string;
  errorMsgM: string;
  isLoading: boolean;
  isLoadingM: boolean;
  filteredmsoAgents: any;
  tableData: any;
  fltrids = [];
  canceledData:any;
  shwPermMsg: string;

  
  constructor(private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, public snackBar: MatSnackBar) {
    // this.permissions = { 'slct_in': 1, 'insrt_in': 1, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
    // const permTxt = 'Package Agreement';
    //   const prmeRte = `user/permissions/${permTxt}`;
    //   this.crdsrv.get(prmeRte).subscribe((res) => {
    //     // console.log(res['data'][0]);
    //     this.permissions = res['data'][0];
    //   });
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    
    this.getPackgeAgreemnt();
    this.lmoPymntsForm = this.formBuilder.group({
      lmoCode: ['', Validators.required],
      apsflcode: ['101000008', Validators.required]
    });
    this.msoPymntsForm = this.formBuilder.group({
      msocode: ['', Validators.required],
    });
    console.log(this.lmoPymntsForm);
    console.log(this.lmoPymntsForm.value);
    console.log(this.lmoPymntsForm.value.lmoCode);
    console.log(this.lmoPymntsForm.value.msocode);

  this.lmoPymntsForm.get('lmoCode').valueChanges
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
        // return this.crdsrv.get('agent/getAgentBySearch/' + value)
        return this.crdsrv.get(`agent/getAgentBySearchCtgr/1/${value}`)
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
      console.log(this.filteredAgents);
    }
  });

      this.msoPymntsForm.get('msocode').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredmsoAgents = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value){
          if (value.length >= 3 || value.length !==  null) {
            return this.crdsrv.get(`agent/getAgentBySearchCtgr/3/${value}`)
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
          this.filteredmsoAgents = [];
        } else {
          this.errorMsg = '';
          this.filteredmsoAgents = data['data'];
        }
      });
    
    
  }
  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }
  


  onToolbarPreparing(e) {
    // // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New Package Agreement',
        onClick: this.openSideBar.bind(this, 'addFormPanel'),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }

  openSideBar(key) {
    // console.log(key);
    this.dsSidebarService.getSidebar(key).toggleOpen();
    // this.crtNewArmnt=true;
    // this.tableVw=false;
  }
  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }

  packagePlanLst() {
    let rte = 'package/packagePlanLst';
    this.crdsrv.get(rte).subscribe((res) => {
      this.packageLstData = res['data'];
       console.log(this.packageLstData);
      if (res['status'] == 200) {
        this.loader = false;
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 120, sortable: true, filter: false },
          { headerName: 'Package Name', field: 'pckge_nm', cellStyle: { 'text-align': 'center' }, cellClass: 'pm-grid-number-cell', width: 190 },
          { headerName: 'Customer Type', field: 'caf_type_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 170, sortable: true, filter: true },
          { headerName: 'Package Type', field: 'pckage_type_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 170, sortable: true, filter: true },
          { headerName: 'charge amount', field: 'chrge_at', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 170, sortable: true, filter: true },
          { headerName: 'GST amount', field: 'gst_at', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 170, sortable: true, filter: true },
          { headerName: 'Total Amount', field: 'total', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 170, sortable: true, filter: true },
        ];
        this.getTmplst();
      }
    });
  }


  packageSelection(data) {
    // console.log('heeeeeloooooooooooooooooooooooooooooooooooooooooo');
    // console.log(data.selectedRowsData);
    this.packagesData = data.selectedRowsData;
    // console.log(this.packagesData);
    // console.log(data.selectedRowsData.length);
    if (data.selectedRowsData.length > 1) {
      this.chkBoxesView = true;
    }
    else {
      this.chkBoxesView = false;
      this.SingleTemplate = true;
      this.MultiTemplate = false;
    }

  }
  onRowExpandingpckgs(i){
    i.component.collapseAll(-1);
    console.log(i.key);
    console.log(i.key.pckge_id);
    let rte = `package/packages/services/${i.key.pckge_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.serviceslst=res['data']
      console.log(this.serviceslst);
    })
  }
  packagesandTmplate(data) {
    // console.log(data.selectedRowsData);
    this.subTablesData = data.selectedRowsData[0]
    // console.log(this.subTablesData);
    // let rot = 'package/ServicesAndPartners'
    // this.crdsrv.create(this.subTablesData, rot).subscribe((res) => {
    //   // console.log(res['data']);
    //   this.packageServices = res['data'][0];
    //   this.templatePartners = res['data'][1];
    //   // console.log(this.packageServices);
    //   // console.log(this.templatePartners);
    //   if (res['status'] == 200) {
    //     this.subtable = true;
    //     this.servicecolumndefs = [
    //       { headerName: 'Package Name', field: 'pckge_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },
    //       { headerName: 'Service Name', field: 'srvcpk_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },
    //       { headerName: 'Service Code', field: 'msp_cd', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },
    //       { headerName: 'Service Type', field: 'srvcpk_type_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },
    //       { headerName: 'Amount', field: 'chrg_amnt', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },

    //     ]
    //     this.partnerscolumndefs = [
    //       { headerName: 'Template Name', field: 'tmple_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },
    //       { headerName: 'Agent Name', field: 'prtnr_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },
    //       { headerName: 'Region', field: 'ara_type_nm', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },
    //       { headerName: 'Percentage', field: 'prcnt_ct', cellStyle: { 'text-align': 'left' }, cellClass: 'pm-grid-number-cell', width: 200 },
    //     ]
    //   }
    // })
  }
  // onCellClick(e){
  //   console.log("dataaaaaaaaaaa");
  //   console.log(e.data.pckge_agrmt_id);
  //   console.log(this.viewId);
  //   if(this.viewId == undefined){
  //   console.log("if");
  //   this.viewId=e.data.pckge_agrmt_id
  //   this.clickview=true;
  //   this.clckopnclsd ='opened'
  //     let rte = `package/agreement/details/${e.data.pckge_agrmt_id}`
  //    this.crdsrv.get(rte).subscribe((res) => {
  //      this.agrmntDtls=res['data'];
  //     var index = 0
  //     for (var k = 0; k < this.agrmntDtls.length; k++) {
  //       index = index + 1;
  //       this.agrmntDtls[k].sno = index;
  //      }
  //    })
  //   }
  //   else if(this.viewId != undefined){
  //     console.log("elseeeeeeeeif");
  //     if(this.viewId == e.data.pckge_agrmt_id){
  //       this.clckopnclsd ='closed'
  //       this.clickview=true;
  //     }
  //     else if(this.viewId != e.data.pckge_agrmt_id){
  //       console.log(this.clckopnclsd);
  //          if(this.clckopnclsd == 'closed'){
  //           this.clickview=true;
  //           let rte = `package/agreement/details/${e.data.pckge_agrmt_id}`
  //           this.crdsrv.get(rte).subscribe((res) => {
  //             this.agrmntDtls=res['data'];
  //            var index = 0
  //            for (var k = 0; k < this.agrmntDtls.length; k++) {
  //              index = index + 1;
  //              this.agrmntDtls[k].sno = index;
  //             }
  //           })
  //          }
  //          else{
  //           this.clickview=false;
  //          return;
  //          }
  //     }
  //   }
   
  // }


  onRowExpanding(e){
    e.component.collapseAll(-1);
    console.log(e.key.pckge_agrmt_id);
    let rte = `package/agreement/details/${e.key.pckge_agrmt_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.agrmntDtls=res['data'];
      var index = 0
                  for (var k = 0; k < this.agrmntDtls.length; k++) {
                   index = index + 1;
                   this.agrmntDtls[k].sno = index;
                  }
    })
  }
  onRowExpandingtwo(f){
    f.component.collapseAll(-1);
    console.log(f.key.tmple_id);
    console.log(f.key.pckge_id);
    console.log(f.key.pckge_agrmt_id);
    let data ={
      tmple_id : f.key.tmple_id,
      pckge_id: f.key.pckge_id,
      packge_agrmnt_id: f.key.pckge_agrmt_id
    };
    let rte=`package/agreement/partners/details`;
    this.crdsrv.create(data,rte).subscribe((res) => {
      console.log(res['data']);
      this.partnersDtls=res['data'];
      var index = 0;
             for (var k = 0; k < this.partnersDtls.length; k++) {
         index = index + 1;
         this.partnersDtls[k].sno = index;
       }
    });
  }
  // onScdCellClick(i){
  //   let data ={
  //     tmple_id :i.data.tmple_id,
  //     pckge_id:i.data.pckge_id,
  //     packge_agrmnt_id:i.data.pckge_agrmt_id
  //   }
  //   let rte=`package/agreement/partners/details`
  //   this.crdsrv.create(data,rte).subscribe((res) => {
  //     // console.log(res['data']);
  //     this.partnersDtls=res['data'];
  //     // console.log(this.partnersDtls);
  //     var index = 0
  //     for (var k = 0; k < this.partnersDtls.length; k++) {
  //       index = index + 1;
  //       this.partnersDtls[k].sno = index;
  //     }
  //   })
  // }
  secondNext() {
    // console.log(this.selectTemplates);
    // console.log(this.packagesData);
    for (var z = 0; z < this.packagesData.length; z++) {
      this.packagesData[z].tntAGntData = [];
      this.packagesData[z].tmpID = '';
      this.packagesData[z].agntID = '';
      this.packagesData[z].shwAgnts = false;
    }
    // console.log(this.packagesData);
    if (this.selectTemplates == 1) {
      // console.log('single');
      this.SingleTemplate = true;
      this.MultiTemplate = false;
    }
    if (this.selectTemplates == 2) {
      // console.log('double');
      this.SingleTemplate = false;
      this.MultiTemplate = true;
      // console.log(this.packagesData);
    }
  }

  getTmplst() {
    let rte = 'erp/erpTmplt';
    this.crdsrv.get(rte).subscribe((res) => {
      this.templeLstData = res['data']
      // console.log(this.templeLstData);
      // this.assignView=true;
    })
  }
  getTenantsLst(key, tmple_id) {
    // console.log(tmple_id);
    let rte = `erp/slctTmpltePrtnrsRel/${tmple_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.tenantsData = res['data']
      console.log(this.tenantsData);
      if (this.tenantsData.length > 0) {
        if (key == 1) {
          for(var p=0; p<this.tenantsData.length; p++){
            if(this.tenantsData[p].tenants[0].prtnr_nm == 'LMO'){
              console.log("lmooo");
              this.tenantsData[p].agentsData=this.lmoPymntsForm.value.lmoCode.agnt_id;
              this.tenantsData[p].agnt_nm=this.lmoPymntsForm.value.lmoCode.agnt_nm;
              this.tenantsData[p].type=this.tenantsData[p].tenants[0].prtnr_nm;
              this.tenantsData[p].percentage=this.tenantsData[p].tenants[0].prcnt_ct;
            }
            if(this.tenantsData[p].tenants[0].prtnr_nm == 'MSO'){
              console.log("lmooo");
              this.tenantsData[p].agentsData=this.msoPymntsForm.value.msocode.agnt_id;
              this.tenantsData[p].agnt_nm=this.msoPymntsForm.value.msocode.agnt_nm;
              this.tenantsData[p].type=this.tenantsData[p].tenants[0].prtnr_nm;
              this.tenantsData[p].percentage=this.tenantsData[p].tenants[0].prcnt_ct;
            }
            if(this.tenantsData[p].tenants[0].prtnr_nm == 'APSFL'){
              console.log("apsfl");
              this.tenantsData[p].agentsData=101000008;
              this.tenantsData[p].agnt_nm='APSFL';
              this.tenantsData[p].type=this.tenantsData[p].tenants[0].prtnr_nm;
              this.tenantsData[p].percentage=this.tenantsData[p].tenants[0].prcnt_ct;
            }
          }
          this.viewtntData = true;
          this.viewtentsData = false;
        }
        if (key == 2) {
          this.viewtntData = false;
          this.viewtentsData = true;
        }

      }
    })
  }
  
  assign(assTmpID, assPlnId, boln, data) {
    console.log("hkjhjkhjk");
    console.log(this.lmoPymntsForm.value.lmoCode);
    // console.log('i am hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    // console.log(assTmpID);
    // console.log(assPlnId);
    // console.log(boln);
    // console.log(this.packagesData);
    for (var b = 0; b < this.packagesData.length; b++) {
      if (this.packagesData[b].pckge_id == assPlnId) {
        this.packagesData[b].shwAgnts = true;
      }
    }
    this.arrayData = []
    // console.log(assTmpID);
    // console.log(assPlnId);
    let rte = `erp/slctTmpltePrtnrsRel/${assTmpID}`
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);
      data.tntAGntData = res['data']
       console.log(data);
       for(var u=0; u<data.tntAGntData.length; u++){
        if(data.tntAGntData[u].tenants[0].prtnr_nm == 'LMO'){
          console.log("lmooo");
          data.tntAGntData[u].agnt_id=this.lmoPymntsForm.value.lmoCode.agnt_id;
          data.tntAGntData[u].agnt_nm=this.lmoPymntsForm.value.lmoCode.agnt_nm;
          data.tntAGntData[u].type=data.tntAGntData[u].tenants[0].prtnr_nm;
          data.tntAGntData[u].percentage=data.tntAGntData[u].tenants[0].prcnt_ct;
        }
        if(data.tntAGntData[u].tenants[0].prtnr_nm == 'MSO'){
          console.log("lmooo");
          data.tntAGntData[u].agnt_id=this.msoPymntsForm.value.msocode.agnt_id;
          data.tntAGntData[u].agnt_nm=this.msoPymntsForm.value.msocode.agnt_nm;
          data.tntAGntData[u].type=data.tntAGntData[u].tenants[0].prtnr_nm;
          data.tntAGntData[u].percentage=data.tntAGntData[u].tenants[0].prcnt_ct;
        }
        if(data.tntAGntData[u].tenants[0].prtnr_nm == 'APSFL'){
          console.log("apsfl");
          data.tntAGntData[u].agnt_id=101000008;
          data.tntAGntData[u].agnt_nm='APSFL';
          data.tntAGntData[u].type=data.tntAGntData[u].tenants[0].prtnr_nm;
          data.tntAGntData[u].percentage=data.tntAGntData[u].tenants[0].prcnt_ct;
        }
        }
        console.log(data);
    })
   
  
    // for(var r=0; r<this.asTenantsData.length; r++){
    //   this.arrayData.push({asTmpId:assTmpID, asPlnId:assPlnId,asPartnrId:this.asTenantsData[r].tenants[0].prtnr_id,'asAgentsData': [], })
    // }
    // // console.log(this.arrayData);
  }
 

  // onSearchChange(ev: any,tdata) {
  //   this.ForLpData = tdata;
  //   const val = ev;
  //     this.filteredOptions =[]
  //   if (val.length > 2) {
  //         for (var l = 0; l < tdata.length; l++) {
  //           if (tdata[l].agnt_nm.toLowerCase().indexOf(val.toLowerCase()) > -1) {
  //             this.filteredOptions.push(tdata[l])
  //           }
  //         }

  //       }
  // }
 
  // displayFn(id) {
  //   if (!id) return '';
  
  //   let index = this.filteredOptions.findIndex(state => state.agnt_id === id);
  //   return this.filteredOptions[index].agnt_nm;
  // }
  LastNext(){
     this.fltrids = [];
    console.log(this.packagesData[0].tntAGntData);
    console.log(this.tenantsData);
    if(!this.packagesData[0].tntAGntData){
       console.log('only onceee');
      this.packagesData[0]['tntAGntData']=[]
    }
    // console.log(this.tenantsData);
    if (this.tenantsData) {
      console.log(' not only onceee');
      for (var l = 0; l < this.packagesData.length; l++) {
        for (var g = 0; g < this.tenantsData.length; g++) {
          if(this.packagesData[l].tntAGntData ){
            // console.log('i am there')
            this.packagesData[l].tntAGntData.push({tmple_id: this.tenantsData[g].tmple_id,tmple_nm: this.tenantsData[g].tmple_nm, agnt_id: this.tenantsData[g].agentsData, type:this.tenantsData[g].type, percentage:this.tenantsData[g].percentage, agnt_nm:this.tenantsData[g].agnt_nm })
          }
        }
      }
    }
    this.tableData = this.packagesData
    console.log(this.tableData);
    console.log(this.tableData[0].tntAGntData.length);
    if(this.tableData){
      console.log(this.tableData);
   
      for(var t=0; t<this.tableData.length; t++){
          // this.fltrids.push({ 'packagename': this.tableData[t].pckge_nm, 'template': this.tableData[t].tntAGntData[0].tmple_id})
        if(this.tableData[t].tntAGntData.length == 1){
          if(this.tableData[t].tntAGntData[0].type == 'APSFL'){
            this.fltrids.push({'packagename': this.tableData[t].pckge_nm,'template': this.tableData[t].tntAGntData[0].tmple_id,'templatename':this.tableData[t].tntAGntData[0].tmple_nm,'APSFLNm':this.tableData[t].tntAGntData[0].agnt_nm,'APSFLPt': this.tableData[t].tntAGntData[0].percentage,'LMONm':'',
            'LMOPt':'0','MSONm':'','MSOPt':'0'})
          }
          if(this.tableData[t].tntAGntData[0].type == 'LMO'){
            this.fltrids.push({'packagename': this.tableData[t].pckge_nm,'template': this.tableData[t].tntAGntData[0].tmple_id,'templatename': this.tableData[t].tntAGntData[0].tmple_nm,'APSFLNm':'','APSFLPt':'0','LMONm':this.tableData[t].tntAGntData[0].agnt_nm,
            'LMOPt':this.tableData[t].tntAGntData[0].percentage,'MSONm':'','MSOPt':'0'})
          }
          if(this.tableData[t].tntAGntData[0].type == 'MSO'){
            this.fltrids.push({'packagename': this.tableData[t].pckge_nm,'template': this.tableData[t].tntAGntData[0].tmple_id,'templatename': this.tableData[t].tntAGntData[0].tmple_nm,'APSFLNm':'','APSFLPt':'0','LMONm':'',
            'LMOPt':'0','MSONm':this.tableData[t].tntAGntData[0].agnt_nm,'MSOPt':this.tableData[t].tntAGntData[0].percentage})
          }
        }
        else if(this.tableData[t].tntAGntData.length == 2){
           
        }
        else if(this.tableData[t].tntAGntData.length == 3){
          if(this.tableData[t].tntAGntData[0].type == 'LMO'){
            this.fltrids.push({'packagename': this.tableData[t].pckge_nm,'template': this.tableData[t].tntAGntData[0].tmple_id,'templatename': this.tableData[t].tntAGntData[0].tmple_nm,'APSFLNm':this.tableData[t].tntAGntData[2].agnt_nm,'APSFLPt':this.tableData[t].tntAGntData[2].percentage,'LMONm':this.tableData[t].tntAGntData[0].agnt_nm,
            'LMOPt':this.tableData[t].tntAGntData[0].percentage,'MSONm':this.tableData[t].tntAGntData[1].agnt_nm,'MSOPt':this.tableData[t].tntAGntData[1].percentage})
          } 
        }
        else if(this.tableData[t].tntAGntData.length == 4){
          if(this.tableData[t].tntAGntData[0].type == 'LMO'){
            this.fltrids.push({'packagename': this.tableData[t].pckge_nm,'template': this.tableData[t].tntAGntData[0].tmple_id,'templatename': this.tableData[t].tntAGntData[0].tmple_nm,'APSFLNm':this.tableData[t].tntAGntData[2].agnt_nm,'APSFLPt':this.tableData[t].tntAGntData[2].percentage,'LMONm':this.tableData[t].tntAGntData[0].agnt_nm,
            'LMOPt':this.tableData[t].tntAGntData[0].percentage,'MSONm':this.tableData[t].tntAGntData[1].agnt_nm,'MSOPt':this.tableData[t].tntAGntData[1].percentage,'CPDRNm':this.tableData[t].tntAGntData[3].agnt_nm,'CPDRPt':this.tableData[t].tntAGntData[3].percentage})
          } 
        }
      }
      console.log(this.fltrids);
      var index = 0
      for (var k = 0; k < this.fltrids.length; k++) {
        index = index + 1;
        this.fltrids[k].indx = index
      }
      this.shocolumnDefs = [
        { headerName: 'Sno', field: 'indx', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 70, sortable: true, filter: false },
        { headerName: 'Package', field: 'packagename',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: false },
        { headerName: 'Template', field: 'templatename',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 200 },
        { headerName: 'LMO', field: 'LMONm', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
        { headerName: 'MSO', field: 'MSONm',  cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
        { headerName: 'AFSFL', field: 'APSFLNm',  cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
        { headerName: 'LMO Percentage', field: 'LMOPt',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
        { headerName: 'MSO Percentage', field: 'MSOPt',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
        { headerName: 'APSFL Percentage', field: 'APSFLPt',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
      ];
    }
    
    
  }
  save() {
    this.tableData[0].comment= this.comment;
    console.log(this.tableData);
    console.log(this.comment);
    // if(this.comment){
      console.log("I AM THERE");
      let rot = 'package/insrt_packageAgreement'
      this.crdsrv.create(this.tableData, rot).subscribe((res) => {
        if (res['status'] == 200) {
          this.snackBar.open('Sucessfully Created', '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.closeSideBar();
          this.getPackgeAgreemnt();
        }
        else{
             this.snackBar.open("Something Went Wrong Plz Try Again ", '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
       });
        }
      })
    // }
    // else{
    //   console.log("I AM NOT THERE");
    //   this.snackBar.open("Mention Reason in The CommentBox ", '', {
    //     duration: 2000,
    //     panelClass: ['red-snackbar'],
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //   });
    // }
        // if(!this.packagesData[0].tntAGntData){
    //    console.log('only onceee');
    //   this.packagesData[0]['tntAGntData']=[]
    // }

    // if (this.tenantsData) {
    //   console.log(' not only onceee');
    //   for (var l = 0; l < this.packagesData.length; l++) {
    //     for (var g = 0; g < this.tenantsData.length; g++) {
    //       if(this.packagesData[l].tntAGntData ){
    //         this.packagesData[l].tntAGntData.push({ tmple_id: this.tenantsData[g].tmple_id, agnt_id: this.tenantsData[g].agentsData, type:this.tenantsData[g].type, percentage:this.tenantsData[g].percentage, agnt_nm:this.tenantsData[g].agnt_nm })
    //       }
    //     }
    //   }
    // }
    // this.insertData = this.packagesData
    // this.insertData[0].comment= this.comment;
  
  }
  getPackgeAgreemnt() {
    this.loader = true;
    // console.log('entered into package agreement');
    let rte = 'package/select_packageAgreement';
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(res['data']);
      this.gridRowData = res['data'];

      if (res['perm']){
        this.permissions = res['perm'][0];
        this.packagePlanLst();
      } else{
        this.loader = false;
        this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
      
      // console.log(this.gridRowData);
      var index = 0;
      for (var k = 0; k < this.gridRowData.length; k++) {
        index = index + 1;
        this.gridRowData[k].indx = index;
      }
      if (res['status'] == 200) {
        this.loader = false;
        this.gridColumnDefs = [
          { headerName: 'Sno', field: 'indx', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 70, sortable: true, filter: false },
          { headerName: 'Package Agreement Id', field: 'pckge_agrmt_id',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Package Agreement Date', field: 'pckge_agrmt_dt',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 200 },
          { headerName: 'Approve Date', field: 'aprve_ts', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Description', field: 'aprve_cmnt_tx',  cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
          { headerName: 'Approve By', field: 'aprve_usr_nm',  cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Created On', field: 'i_ts',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 135, sortable: true, filter: true },
          { headerName: 'Total Packages', field: 'pckg_ct',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
          { headerName: 'Total Base Packages', field: 'bsepckg_ct',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Total AddOn Packages', field: 'addpckg_ct',  cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 160, sortable: true, filter: true },
          { headerName: 'Partners', field: 'agnt_cds',  cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 170, sortable: true, filter: true},
        ];
      }
    })

  }

  onDelete(deldata){
    console.log(deldata);
    console.log(deldata.data);
    this.canceledData = deldata.data;
    console.log(this.canceledData);
    let rot = 'package/cancel_packageAgreement'
    this.crdsrv.create(this.canceledData, rot).subscribe((res) => {
      console.log(res['status']);
      if (res['status'] == 200) {
        this.snackBar.open('Sucessfully Deleted', '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getPackgeAgreemnt();
      }
    })
      }

}