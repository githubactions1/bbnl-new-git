import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { UserService } from 'app/providers/user/user.serivce';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { yearsPerPage } from '@angular/material/datepicker/typings/multi-year-view';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-caf-suspension',
  templateUrl: './caf-suspension.component.html',
  styleUrls: ['./caf-suspension.component.scss']
})
export class CafSuspensionComponent implements OnInit {
  lmocd: any;
  agnt_id: any;
  permissions;
  cafnumber: any;
  mobilenumber: any;
  aadharnumber: any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  columnDefs: { headerName: string; field: string; cellStyle: { 'text-align': string; }; cellClass: string; width: number; sortable: boolean; filter: boolean; }[];
  cafData: any;
  reaadharnumber: any;
  remobilenumber: any;
  recafnumber: any;
  susCafData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isLinear:any;
  suspnReason:any;
  tosuspend: any;
  agentDropDwnView:boolean;
  agentDropDwnViewScd:boolean;
  tableView:boolean = true;
  tableViewScd:boolean = true;
  pageLdr:boolean;
  errorMsg: string;
  isLoading: boolean;
  filteredAgents: any;
  lmoPymntsForm: FormGroup;
  thirdFormGroup:FormGroup;
  prtableview:boolean;
  curentdate = new Date();


  getHeaderDtls = function () { return { "title": " CAF Suspensions", "icon": "list_alt" } }
  // confirmMsgDialogRef: any;
  // dialog: any;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  aaa_mac_id: string;
  aaa_mac_id_sus: string;
  prvioususpenstn: any;
  status: any;
  
  constructor(private fb: FormBuilder,private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, 
    private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService, public dialog: MatDialog) {
    // this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 }
    this.userService.USER_DETAILS.subscribe(val => {
      if (val.usr_ctgry_id == 8) {
        this.lmocd = val.lmo_cd;
        this.agnt_id = val.usr_ctgry_ky;
        console.log(this.agnt_id);
      }
    });
    const permTxt = 'CAF Suspension';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      this.permissions = res['data'][0];
      console.log("permissionnnnnnnnnnnnnnnnn");
      console.log(this.permissions);
    });

  }

  // cafsuspensnData =[
  //   {
  //     title:"caf",
  //     msg:"Are You Sure you want to active",
  //     btns:[
  //       {
  //         label : "yes"
  //       }
  //     ],
  //   }
  // ]

  ngOnInit() {
    if(this.agnt_id == undefined){
      this.agentDropDwnView=true;
      this.agentDropDwnViewScd=true;
}
else{
  this.agentDropDwnView=false;
  this.agentDropDwnViewScd=false;
}

    this.lmoPymntsForm = this.fb.group({
      lmoCode: ['', Validators.required],
    });

    //******************************//
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
          return this.crdsrv.get('agent/getAgentBySearch/' + value)
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
    //************************************//
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
      scdlmoCode: ['', Validators.required],
    });


    this.firstFormGroup.get('scdlmoCode').valueChanges
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
          return this.crdsrv.get('agent/getAgentBySearch/' + value)
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
        //************************************//
        this.thirdFormGroup = this.formBuilder.group({
          lmoCdThrd: ['', Validators.required]
        });

        this.thirdFormGroup.get('lmoCdThrd').valueChanges
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
          return this.crdsrv.get('agent/getAgentBySearch/' + value)
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
        //************************************//
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
   
    this.getdetails();
    this.getsuspnForResume()
  }
  getsuspnForResume() {
    // this.pageLdr=true;
    if(this.recafnumber == undefined && this.remobilenumber == undefined && this.reaadharnumber == undefined && this.agnt_id == undefined && this.lmoPymntsForm.value.lmoCode.agnt_id == undefined){
      console.log("ifffffffff");
        this.tableView=false
    }
    else
    {
      this.tableView=true;
      let data = {
        caf_nu: this.recafnumber == undefined ? 0 : this.recafnumber,
        mbl_nu: this.remobilenumber == undefined ? 0 : this.remobilenumber,
        adhar_nu: this.reaadharnumber == undefined ? 0 : this.reaadharnumber,
        agntID: this.agnt_id == undefined ? (this.lmoPymntsForm.value.lmoCode.agnt_id == undefined ? 0 :this.lmoPymntsForm.value.lmoCode.agnt_id): this.agnt_id,
        sts:this.status == undefined ? 0:this.status,
      }
      console.log(data);
      let rte = 'olt/suspended/cafs'
      this.crdsrv.create(data, rte).subscribe((res) => {
        this.susCafData = res['data'];
        console.log(this.susCafData);
        var index = 0
        for (var k = 0; k < this.susCafData.length; k++) {
          index = index + 1;
          this.susCafData[k].sno = index
        }
        if (res['status'] == 200) {
          // this.pageLdr=false;
          this.columnDefs = [
            { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 80, sortable: true, filter: false },
            { headerName: 'CAF Number', field: 'caf_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
            // { headerName: 'LMO Code', field: 'agnt_cd', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: false },
            { headerName: 'Aadhar Number', field: 'adhr_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
            { headerName: 'Mobile Number', field: 'mbl_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
            { headerName: 'First Name', field: 'frst_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
            { headerName: 'Last Name', field: 'lst_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
            // { headerName: 'Address 1', field: 'instl_addr1_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },
            // { headerName: 'Address 2', field: 'instl_addr2_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            // { headerName: 'Locality', field: 'instl_lcly_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            // { headerName: 'Area', field: 'instl_ara_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            // { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: false },
            // { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            // { headerName: 'Village', field: 'vlge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            { headerName: 'Last Suspended Date', field: 'spnd_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
            { headerName: 'Days Suspended', field: 'spnd_count', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },
            { headerName: 'Status', field: 'sts_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 180, sortable: true, filter: true },

          ]
        }
      })
    }
   
  }
  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }
    getdetails() {
      // this.pageLdr=true;
      console.log(this.firstFormGroup.value.scdlmoCode);
      if(this.cafnumber == undefined && this.mobilenumber == undefined && this.aadharnumber == undefined && this.agnt_id == undefined && this.firstFormGroup.value.scdlmoCode.agnt_id == undefined){
        console.log("ifffffffff");
          this.tableViewScd=false;
      }
      else{
        this.tableViewScd=true;
        let data = {
          caf_nu: this.cafnumber == undefined ? 0 : this.cafnumber,
          mbl_nu: this.mobilenumber == undefined ? 0 : this.mobilenumber,
          adhar_nu: this.aadharnumber == undefined ? 0 : this.aadharnumber,
          agntID: this.agnt_id == undefined ? (this.firstFormGroup.value.scdlmoCode.agnt_id == undefined ? 0 :this.firstFormGroup.value.scdlmoCode.agnt_id): this.agnt_id
        }
        console.log(data);
        let rte = 'olt/active/cafs'
        this.crdsrv.create(data, rte).subscribe((res) => {
          this.cafData = res['data'];
          console.log(this.cafData)
          var index = 0
          for (var k = 0; k < this.cafData.length; k++) {
            index = index + 1;
            this.cafData[k].sno = index
          }
          if (res['status'] == 200) {
            // this.pageLdr=false;
            this.columnDefs = [
              { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 90, sortable: true, filter: false },
              { headerName: 'CAF Number', field: 'caf_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
              { headerName: 'LMO Code', field: 'agnt_cd', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
              { headerName: 'Aadhar Number', field: 'adhr_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
              { headerName: 'Mobile Number', field: 'mbl_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
              { headerName: 'First Name', field: 'frst_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
              { headerName: 'Last Name', field: 'lst_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },
              { headerName: 'Status', field: 'sts_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: true },

              // { headerName: 'Address 1', field: 'instl_addr1_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },
              // { headerName: 'Address 2', field: 'instl_addr2_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
              // { headerName: 'Locality', field: 'instl_lcly_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
              // { headerName: 'Area', field: 'instl_ara_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
              // { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: false },
              // { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
              // { headerName: 'Village', field: 'vlge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            ]
          }
        })
      }
   
  }
  suspsnDetails() {
    this.openSideBar('addFormPanel');
  }
  openSideBar(key) {
    this.dsSidebarService.getSidebar(key).toggleOpen();
  }
  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  onCellClick(data) {
    this.tosuspend=data.data
    console.log(this.tosuspend);
  }
  save() {
    console.log(this.tosuspend);
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
          title: '',
          msg: 'Are you sure, you want to Suspend this customer',
          btnLst: [{
              label: 'Ok',
              res: 'ok'
          },{
            label: 'Cancel',
            res: 'cancel'
        }]
      }
  });


  this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
    if (response) { 
      if(response == 'ok'){
        console.log(this.tosuspend.mac_addr_cd);
        var s = this.tosuspend.mac_addr_cd
      var arr = s.split(':');
      var modified = ""
      for (var i = 0; i < arr.length; i++) {
        if (i % 2 == 1) {
          if (i == arr.length - 1) {
            modified = modified + arr[i];
          } else {
            modified = modified + arr[i] + ".";
          }

        } else {
          modified = modified + arr[i];
        }
      }
      console.log(modified.toLowerCase())
      this.aaa_mac_id_sus = modified.toLowerCase()
        console.log(this.tosuspend);
        console.log(this.suspnReason);
        console.log("data saving");
        let data ={
          caf_id: this.tosuspend.caf_id,
          cstmr_id:this.tosuspend.cstmr_id,
          spnd_reason:this.suspnReason,
          pckge_id:this.tosuspend.crnt_pln_id,
          subscr_code:this.tosuspend.mdlwe_sbscr_id,
          phne_nu:this.tosuspend.phne_nu == null ? '' : this.tosuspend.phne_nu.replace("-", ""),
          aghra_cd:this.tosuspend.aghra_cd,
          aaa_cd:this.tosuspend.aaa_cd,
          accessId:this.aaa_mac_id_sus,
          caf_type_id:this.tosuspend.caf_type_id,
          olt_ip_addr_tx:this.tosuspend.olt_ip_addr_tx,
          olt_onu_id:this.tosuspend.olt_onu_id,
          olt_prt_nm:this.tosuspend.olt_prt_nm,
          olt_crd_nu:this.tosuspend.olt_crd_nu
        }
        console.log(data);
        let rte='caf_operations/suspension'
        this.crdsrv.create(data,rte).subscribe((res) => {
          console.log(res['status']);
          if(res['status'] == 200){
            if(res['data'][0] == 'false'){
          console.log("falseeeeeeeeeeeeeeeeeeee");
          console.log(res['data'][1][0]);
          this.snackBar.open("This CAF is already suspended once" + res['data'][1][0].spnd_dt +"only 1 suspention are allowed in a month.", '', {
            duration: 2000,
            panelClass: ['red-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.getdetails();
          this.firstFormGroup = this.formBuilder.group({
            firstCtrl: ['', Validators.required]
          });
          this.suspnReason = ''
            }
            else if(res['data'][0] == 'true'){
              console.log("trueeeeeeeeeeeeeeee");
            this.snackBar.open("Sucessfully Suspended", '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.getdetails();
            this.firstFormGroup = this.formBuilder.group({
              firstCtrl: ['', Validators.required]
            });
            this.suspnReason = ''
            }
            else if(res['data'][0] == 'pending'){
            this.snackBar.open("CAF Suspension is PENDING", '', {
              duration: 2000,
              panelClass: ['green-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.getdetails();
            this.firstFormGroup = this.formBuilder.group({
              firstCtrl: ['', Validators.required]
            });
            this.suspnReason = ''
            }
            else if(res['data'][0] == 'failed'){
            this.snackBar.open("CAF Suspension is Failed", '', {
              duration: 2000,
              panelClass: ['red-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.getdetails();
            this.firstFormGroup = this.formBuilder.group({
              firstCtrl: ['', Validators.required]
            });
            this.suspnReason = ''
            }
           
          }
        })
      } else {
        this.getdetails();
      }
      console.log(response);
      console.log("in close");
    }
  });

    
  }
  onactiveCellClick(acvtdata) {
    console.log(acvtdata);
    this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
      width: '25%',
      panelClass: 'my-class',
      data: {
          title: '',
          msg: 'Are you sure, you want to Activate this customer',
          btnLst: [{
              label: 'Ok',
              res: 'ok'
          },{
            label: 'Cancel',
            res: 'cancel'
        }]
      }
  });

  this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
    if (response) { 
      if(response == 'ok'){
        var s = acvtdata.data.mac_addr_cd
      var arr = s.split(':');
      var modified = ""
      for (var i = 0; i < arr.length; i++) {
        if (i % 2 == 1) {
          if (i == arr.length - 1) {
            modified = modified + arr[i];
          } else {
            modified = modified + arr[i] + ".";
          }

        } else {
          modified = modified + arr[i];
        }
      }
      console.log(modified.toLowerCase())
      this.aaa_mac_id = modified.toLowerCase()
      let data = {
            caf_id: acvtdata.data.caf_id,
            cstmr_id:acvtdata.data.cstmr_id,
            pckge_id:acvtdata.data.crnt_pln_id,
            subscr_code:acvtdata.data.mdlwe_sbscr_id,
            phne_nu:acvtdata.data.phne_nu == null ? '' :acvtdata.data.phne_nu.replace("-", ""),
            aghra_cd:acvtdata.data.aghra_cd,
            aaa_cd:acvtdata.data.aaa_cd,
            accessId:this.aaa_mac_id,
            caf_type_id:acvtdata.data.caf_type_id,
            olt_ip_addr_tx:acvtdata.data.olt_ip_addr_tx,
            olt_onu_id:acvtdata.data.olt_onu_id,
            olt_prt_nm:acvtdata.data.olt_prt_nm,
            olt_crd_nu:acvtdata.data.olt_crd_nu
          }
          console.log(data);
          let rte='caf_operations/resume'
          this.crdsrv.create(data,rte).subscribe((res) => {
            console.log(res['status']);
            if(res['status'] == 200){
              // this.snackBar.open("Sucessfully Activated", '', {
              //   duration: 2000,
              //   panelClass: ['blue-snackbar'],
              //   horizontalPosition: this.horizontalPosition,
              //   verticalPosition: this.verticalPosition,
              // });
              // this.getsuspnForResume();
            
                   if(res['data'][0] == 'true'){
                    console.log("trueeeeeeeeeeeeeeee");
                  this.snackBar.open("Sucessfully Activated", '', {
                    duration: 2000,
                    panelClass: ['blue-snackbar'],
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                  this.getsuspnForResume();
                  }
                  else if(res['data'][0] == 'pending'){
                  this.snackBar.open("CAF Activation is PENDING", '', {
                    duration: 2000,
                    panelClass: ['green-snackbar'],
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                  this.getsuspnForResume();
                  }
                  else if(res['data'][0] == 'failed'){
                  this.snackBar.open("CAF Activation is Failed", '', {
                    duration: 2000,
                    panelClass: ['red-snackbar'],
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                  this.getsuspnForResume();
                  }
            }
          })
      } else {
        this.getsuspnForResume();
      }
      console.log(response);
      console.log("in close");
    }
  });
  }
  tabChangeFn(event): void {
    if (event.index === 1) {
     this.previoususpenstion();
    } else if (event.index === 2) {
    }
  }
  previoususpenstion(){
    if(this.agnt_id == undefined && this.thirdFormGroup.value.lmoCdThrd.agnt_id == undefined){
     this.prtableview=false;
    }
    else{
      this.prtableview=true;
      let data = {
        agntID: this.agnt_id == undefined ? (this.thirdFormGroup.value.lmoCdThrd.agnt_id == undefined ? 0 :this.thirdFormGroup.value.lmoCdThrd.agnt_id): this.agnt_id
      }
      let rte= `olt/previous/suspenstion`
    this.crdsrv.create(data,rte).subscribe((res) => {
      console.log(res['data']);
      this.prvioususpenstn=res['data'];
      console.log(this.prvioususpenstn)
      var index = 0
      for (var k = 0; k < this.prvioususpenstn.length; k++) {
        index = index + 1;
        this.prvioususpenstn[k].sno = index
      }
      if (res['status'] == 200) {
        this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 80, sortable: true, filter: false },
          { headerName: 'CAF Number', field: 'caf_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true },
          { headerName: 'LMO Code', field: 'agnt_cd', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true },
          { headerName: 'Aadhar Number', field: 'adhr_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true },
          { headerName: 'Mobile Number', field: 'mbl_nu', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: true },
          { headerName: 'First Name', field: 'frst_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
          { headerName: 'Last Name', field: 'lst_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Address 1', field: 'instl_addr1_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: true },
          { headerName: 'Address 2', field: 'instl_addr2_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Locality', field: 'instl_lcly_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Area', field: 'instl_ara_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'District', field: 'dstrt_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: true },
          { headerName: 'Mandal', field: 'mndl_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Village', field: 'vlge_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Suspended Date', field: 'spnd_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Suspended Reason', field: 'spnd_cmnt_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Suspended By', field: 'spnd_by', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Resume Date', field: 'rsme_dt', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },
          { headerName: 'Resume Reason', field: 'rsme_cmnt_tx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 220, sortable: true, filter: true },
          { headerName: 'Resumed By', field: 'rsm_by', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: true },

        ]
      }
    })
    }
   
    
  }
}
