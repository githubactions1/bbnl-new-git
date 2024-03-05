import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-caf-box-change',
  templateUrl: './caf-box-change.component.html',
  styleUrls: ['./caf-box-change.component.scss']
})
export class CafBoxChangeComponent implements OnInit {
  permissions;
  lmoPymntsForm: FormGroup;
  lmocd: any;
  agnt_id: any;
  filteredAgents: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  aadharnumber: any;
  mobilenumber: any;
  cafnumber: any;
  cafData: any;
  pageLdr:boolean;
  columnDefs: { headerName: string; field: string; alignment: string; cellClass: string; width: number; sortable: boolean; filter: boolean; }[];
  selectedData: any;
  scafnumber: any;
  Subscribercode: any;
  reason: any;
  comment: any;
  sidebar: boolean = false;
  iptvView: boolean;
  iptvsrId: any;
  iptvData: any;
  viewIptvmacAdress: boolean = false;
  onusrTd: string;
  onuData: any;
  tableView: boolean = true;
  errorMsg: string;
  isLoading: boolean;
  eriptvmsg:boolean;
  agentDropDwnView: boolean;
  getHeaderDtls = function () { return { "title": "BOX Change", "icon": "list_alt" } }

  viewonumacAdress: boolean = false;
  agntId: any;
  lmoCode: any;
  aaa_mac_id_sus: string;
  spltData: any;
  cafType: any;
  newIptvSrNu: any[];
  newOnuSrNu: any[];
  constructor(private fb: FormBuilder, private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService) {
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 }
    this.userService.USER_DETAILS.subscribe(val => {
      if (val.usr_ctgry_id == 8 || val.usr_ctgry_id == 10) {
        this.lmocd = val.lmo_cd;
        this.agnt_id = val.usr_ctgry_ky;
      }
    });
    const permTxt = 'Box Change';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      console.log(res['data'][0]);
      this.permissions = res['data'][0];
    });
  }

  ngOnInit() {
    console.log(this.agnt_id);
    if (this.agnt_id == undefined) {
      this.agentDropDwnView = true;
    }
    else {
      this.agentDropDwnView = false;
    }

    this.lmoPymntsForm = this.fb.group({
      lmoCode: ['', Validators.required],
    });

    this.lmoPymntsForm.get('lmoCode').valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredAgents = [];
          this.isLoading = true;
        }),
        switchMap((value) => {
          if (value) {
            if (value.length >= 3 || value.length !== null) {
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

    this.getcafdetails();
  }
  displayFn(agent): any {
    if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
  }

  getcafdetails() {

    if (this.cafnumber == undefined && this.mobilenumber == undefined && this.aadharnumber == undefined && this.agnt_id == undefined && this.lmoPymntsForm.value.lmoCode.agnt_id == undefined) {
      console.log("ifffffffff");
      this.tableView = false
    }
    else {
      console.log("elseeeeeeeeeee");
      this.tableView = true;
      let data = {
        caf_nu: this.cafnumber == undefined ? 0 : this.cafnumber,
        mbl_nu: this.mobilenumber == undefined ? 0 : this.mobilenumber,
        adhar_nu: this.aadharnumber == undefined ? 0 : this.aadharnumber,
        agntID: this.agnt_id == undefined ? (this.lmoPymntsForm.value.lmoCode.agnt_id == undefined ? 0 : this.lmoPymntsForm.value.lmoCode.agnt_id) : this.agnt_id
      }
      console.log(data);
      let rte = 'olt/boxchange'
      this.crdsrv.create(data, rte).subscribe((res) => {
        this.cafData = res['data'];
        console.log(this.cafData)
        var index = 0
        for (var k = 0; k < this.cafData.length; k++) {
          index = index + 1;
          this.cafData[k].sno = index
        }
        if (res['status'] == 200) {
          this.columnDefs = [
            { headerName: 'Sno', field: 'sno', alignment: "center", cellClass: "pm-grid-number-cell", width: 65, sortable: true, filter: false },
            { headerName: 'CAF Number', field: 'caf_nu', alignment: "center", cellClass: "pm-grid-number-cell", width: 110, sortable: true, filter: false },
            // { headerName: 'LMO Code', field: 'agnt_cd', alignment: "center", cellClass: "pm-grid-number-cell", width: 115, sortable: true, filter: false },
            { headerName: 'Aadhar Number', alignment: "center", field: 'adhr_nu', cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },
            { headerName: 'Mobile Number', field: 'mbl_nu', alignment: "center", cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },
            { headerName: 'First Name', field: 'frst_nm', alignment: "left", cellClass: "pm-grid-number-cell", width: 125, sortable: true, filter: false },
            { headerName: 'Last Name', field: 'lst_nm', alignment: "left", cellClass: "pm-grid-number-cell", width: 135, sortable: true, filter: false },
            { headerName: 'Address 1', field: 'instl_addr1_tx', alignment: "left", cellClass: "pm-grid-number-cell", width: 115, sortable: true, filter: false },
            { headerName: 'Address 2', field: 'instl_addr2_tx', alignment: "left", cellClass: "pm-grid-number-cell", width: 135, sortable: true, filter: false },
            // { headerName: 'Locality', field: 'instl_lcly_tx', alignment: "left", cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            // { headerName: 'Area', field: 'instl_ara_tx', alignment: "left", cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            // { headerName: 'District', field: 'dstrt_nm', alignment: "left", cellClass: "pm-grid-number-cell", width: 140, sortable: true, filter: false },
            // { headerName: 'Mandal', field: 'mndl_nm', alignment: "left", cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            // { headerName: 'Village', field: 'vlge_nm', alignment: "left", cellClass: "pm-grid-number-cell", width: 150, sortable: true, filter: false },
            { headerName: 'IPTV Serial Number', alignment: "center", field: 'iptv_srl_nu', cellClass: "pm-grid-number-cell", width: 135, sortable: true, filter: false },
            { headerName: 'IPTV MAC Address', alignment: "center", field: 'iptv_mac_addr_tx', cellClass: "pm-grid-number-cell", width: 135, sortable: true, filter: false },
            { headerName: 'ONU Serial Number', alignment: "center", field: 'onu_srl_nu', cellClass: "pm-grid-number-cell", width: 135, sortable: true, filter: false },
            { headerName: 'ONU MAC Address', alignment: "center", field: 'onu_mac_addr_tx', cellClass: "pm-grid-number-cell", width: 125, sortable: true, filter: false },
            { headerName: 'Subscriber Code', alignment: "center", field: 'mdlwe_sbscr_id', cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false },  
            { headerName: 'Status', alignment: "center", field: 'sts_nm', cellClass: "pm-grid-number-cell", width: 80, sortable: true, filter: false },

          ]
        }
      })
    }
  }


  // oltSlctn(dta){
  //   this.selectedData = dta.selectedRowsData;
  //   console.log(this.selectedData);
  //   this.sidebar=true;
  //   this.openSideBar('addFormPanel');
  // }
  onCellClick(data) {
    this.selectedData=[];
    this.iptvData=[];
    this.newIptvSrNu=[];
    this.newOnuSrNu=[];
    this.onuData=[];
    this.comment=[];
    this.reason=[];
    this.viewonumacAdress=false
    this.viewIptvmacAdress=false
    console.log(data);
    console.log(data.data);
    this.selectedData = data.data;
    console.log(this.selectedData);
    if(this.selectedData.enty_sts_id == 10 || this.selectedData.enty_sts_id == 11){
      this.snackBar.open("Box Change Cannot Be Done To This CAF", '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else{
 if(this.selectedData.caf_type_id == 1){
      this.iptvView=true;
      this.sidebar = true;
      this.openSideBar('addFormPanel');
    }
    else if(this.selectedData.caf_type_id != 1){
      this.iptvView=false;
      this.sidebar = true;
      this.openSideBar('addFormPanel');
    }
    }
   
  
  }
  // onCellClickdouble(data) {
  //   this.selectedData=[];
  //   this.selectedData
  //   console.log(data);
  //   console.log(data.data);
  //   this.selectedData = data.data;
  //   console.log(this.selectedData);
  //   if(this.selectedData.caf_type_id == 1){
  //     this.iptvView=true;
  //     this.sidebar = true;
  //     this.openSideBar('addFormPanel');
  //   }
  //   else if(this.selectedData.caf_type_id != 1){
  //     this.iptvView=false;
  //     this.sidebar = true;
  //     this.openSideBar('addFormPanel');
  //   }
  
  // }
  openSideBar(key) {
    this.pageLdr=false;
    this.dsSidebarService.getSidebar(key).toggleOpen();
  }
  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  // myMethod(eventData){
  //   console.log(eventData);
  //   console.log(eventData.target.value);
  //   // this.iptvsrId=eventData.target.value;
  //   // console.log(this.iptvsrId);
  // }
  onSearchChange(searchValue: string): void {
    console.log("nowBoxchanginggggggggg")
    this.iptvData=[];
    this.viewIptvmacAdress = false;
    this.iptvsrId = searchValue;
    console.log(this.iptvsrId);
    if (this.iptvsrId.length > 4) {
      let rte = `olt/setupbox/iptv/${this.iptvsrId}`
      this.crdsrv.get(rte).subscribe((res) => {
        this.iptvData = res['data']
        console.log(this.iptvData);
        console.log(this.iptvData.length);
        if (this.iptvData.length > 0) {
          let rote = `olt/validation/setupbox/${this.iptvData[0].iptv_stpbx_id}`
          this.crdsrv.get(rote).subscribe((res) => {
            if (res['status'] == 200) {
              console.log(res['data'][0]);
              console.log(this.iptvData);
              if (res['data'][0] == 0) {
                if(this.iptvData[0].prdct_id == 2){
                  this.viewIptvmacAdress = true;
                }
                else{
                  this.viewIptvmacAdress = false;
                  this.snackBar.open("This is Not IPTV Serial No", '', {
                    duration: 2500,
                    panelClass: ['red-snackbar'],
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                }
              }
              else {
                this.viewIptvmacAdress = false;
                // this.snackBar.open("Already assigned to another Caf", '', {
                  this.snackBar.open("Already " + this.iptvData[0].iptv_stpbx_id + " assigned to another Caf", '', {
                  duration: 2500,
                  panelClass: ['red-snackbar'],
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }
            }
          })
          
        } else {
          this.viewIptvmacAdress = false;
            this.snackBar.open("Please search for the box that's in your inventory", '', {
            duration: 2500,
            panelClass: ['snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }

      })
    }
  }
  onchange(value: string): void {
    this.onuData=[];
    this.viewonumacAdress = false;
    this.onusrTd = value;
    console.log(this.onusrTd);
    if (this.onusrTd.length > 4) {
      let rte = `olt/setupbox/onu/${this.onusrTd}`
      this.crdsrv.get(rte).subscribe((res) => {
        this.onuData = res['data']
        console.log(this.onuData);
        if (this.onuData.length > 0) {
          let rote = `olt/validation/setupbox/${this.onuData[0].onu_stpbx_id}`;
          this.crdsrv.get(rote).subscribe((res) => {
            if (res['status'] == 200) {
              if (res['data'][0] == 0) {
                if(this.onuData[0].prdct_id == 1){
                  this.viewonumacAdress = true;
                }
                else{
                  this.viewonumacAdress = false;
                  this.snackBar.open("This is Not ONU Serial No", '', {
                    duration: 2500,
                    panelClass: ['red-snackbar'],
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                  });
                }
              }
              else {
                this.viewonumacAdress = false;
                // this.snackBar.open("Already  assigned to another Caf", '', {
                  this.snackBar.open("Already " + this.onuData[0].onu_stpbx_id + " assigned to another Caf", '', {
                  duration: 2500,
                  panelClass: ['red-snackbar'],
                  horizontalPosition: this.horizontalPosition,
                  verticalPosition: this.verticalPosition,
                });
              }
            }
          })
          // this.viewonumacAdress = true;
        } else {
          this.viewIptvmacAdress = false;
            this.snackBar.open("Please search for the box that's in your inventory", '', {
            duration: 2500,
            panelClass: ['snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      })
    }
  }
  update() {
    this.pageLdr=true;
    console.log(this.reason);
    console.log(this.comment);
    console.log(this.iptvData)
    console.log(this.onuData)
    console.log(this.iptvData);
    console.log(this.onuData);

    console.log(this.selectedData.accId);
    var s = this.onuData[0].onu_mac_addr
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
    this.spltData = this.selectedData.aghra_cd.split('-');
    console.log(this.spltData);
    let postData = {
      caf_id: this.selectedData.caf_id,
      caf_nu: this.selectedData.caf_nu,
      subscr_code: this.selectedData.mdlwe_sbscr_id,
      caf_type_id:this.selectedData.caf_type_id,
      old_onu_srno: this.selectedData.onu_srl_nu.toUpperCase(),
      new_onu_srno: this.onuData[0].onu_srl_nu,
      new_onu_mac_adrs: this.onuData[0].onu_mac_addr,
      old_onu_mac_adrs: this.selectedData.onu_mac_addr_tx,
      reason_change: this.reason,
      change_comment: this.comment,
      lagId: this.selectedData.lagId,
      // accessid: this.selectedData.lagId,
      changed: '',
      olt_ip_addr_tx: this.selectedData.olt_ip_addr_tx,
      serialNumber: '',
      card: this.selectedData.olt_crd_nu,
      tp: this.selectedData.olt_prt_nm,
      onuId: this.selectedData.olt_onu_id,
      type: '',
      id: this.spltData[0] + "-" + this.spltData[1] + "-" + this.spltData[2] + "-" + this.spltData[3],
      aaa_cd: this.selectedData.aaa_cd,
      pckge_id: this.selectedData.crnt_pln_id,
      accessid: this.aaa_mac_id_sus
    }
    if(this.selectedData.caf_type_id != 2){
      postData["old_iptv_stpbx_id"] =  this.selectedData.IPTVBOXID
      postData["old_onu_stpbx_id"] =  this.selectedData.ONUBOXID
      postData["iptv_stpbx_id"] =  this.iptvData[0].iptv_stpbx_id
      postData["old_iptv_srno"] =  this.selectedData.iptv_srl_nu
      postData["new_iptv_srno"] =  this.iptvData[0].iptv_srl_nu
      postData["new_iptv_mac_adrs"] =  this.iptvData[0].iptv_mac_addr
      postData["old_iptv_mac_adrs"] =  this.selectedData.iptv_mac_addr_tx
      postData["onu_stpbx_id"] = this.onuData[0].onu_stpbx_id
      if (postData["new_iptv_srno"].toLowerCase() == this.selectedData.iptv_srl_nu.toLowerCase() && postData.new_onu_srno.toLowerCase() != this.selectedData.onu_srl_nu.toLowerCase()) {
        console.log("changing onuu");
        postData['changed'] = 'onu'
      }
      if (postData["new_iptv_srno"].toLowerCase() != this.selectedData.iptv_srl_nu.toLowerCase() && postData.new_onu_srno.toLowerCase() == this.selectedData.onu_srl_nu.toLowerCase()) {
        console.log("changing iptvv");
        postData['changed'] = 'iptv'
      }
      if (postData["new_iptv_srno"].toLowerCase() != this.selectedData.iptv_srl_nu.toLowerCase() && postData.new_onu_srno.toLowerCase() != this.selectedData.onu_srl_nu.toLowerCase()) {
        console.log("changing Bothh");
        postData['changed'] = 'both'
      }
      if (postData["new_iptv_srno"].toLowerCase() == this.selectedData.iptv_srl_nu.toLowerCase() && postData.new_onu_srno.toLowerCase() == this.selectedData.onu_srl_nu.toLowerCase()) {
        console.log("not changing Bothh");
        postData['changed'] = 'same'
      }
    }
    console.log(this.onuData);
    console.log(this.onuData[0].onu_srl_nu);
    if (this.onuData[0].onu_srl_nu.startsWith('DSNW')) {
      postData["serialNumber"] = this.onuData[0].onu_srl_nu.replace('DSNW', '44534E57');
    } else if (this.onuData[0].onu_srl_nu.startsWith('ZTEG')) {
      postData["serialNumber"] = this.onuData[0].onu_srl_nu.replace('ZTEG', '5A544547');
    } else if (this.onuData[0].onu_srl_nu.startsWith('YGE1')) {
      postData["serialNumber"] = this.onuData[0].onu_srl_nu.replace('YGE1', '59474531');
    } else if (this.onuData[0].onu_srl_nu.startsWith('KONK')) {
      postData["serialNumber"] = this.onuData[0].onu_srl_nu.replace('KONK', '4B4F4E4B');
    }else{
      postData["serialNumber"] = this.onuData[0].onu_srl_nu
    }

    if (postData.changed == 'same') {
      this.snackBar.open("IPTV and ONU Both Not Changed", '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else {
      console.log(postData);
      if(postData.changed == 'both'){
        console.log(postData);
        console.log(JSON.stringify(postData));
        let rte='caf_operations/box-change'
        this.crdsrv.create(postData,rte).subscribe((res) => {
          console.log(res['status']);
          if(res['status'] == 200){
            this.pageLdr=false;
            this.closeSideBar();
            this.snackBar.open("Sucessfully Changed", '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
            this.getcafdetails();
          }
          else{
            this.snackBar.open("Something Went Wrong Please Try Again", '', {
              duration: 2000,
              panelClass: ['green-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        })
      }
     else if(postData.changed != 'both'){
      this.snackBar.open("Plz change Both or select double box change button", '', {
        duration: 2000,
        panelClass: ['red-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
     }
    }

  }
 
}
