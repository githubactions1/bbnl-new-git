import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';

import { UserService } from 'app/providers/user/user.serivce';

@Component({
  selector: 'app-substation-request',
  templateUrl: './substation-request.component.html',
  styleUrls: ['./substation-request.component.scss']
})
export class SubstationRequestComponent implements OnInit {
  substationLst: any;
  mandalData: any;
  villagesData: any;
  districtID: any;
  substationID: any;
  villageIDS: any;
  count: any;
  TableOneData: any;
  permissions;
  columnDefs:any;
  portcolumnDefs:any;
  seLctdData: any;
  selectedSubstnIDS: any[];
  agentPortData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  lmocd:any;
  agnt_id:any;

  constructor(private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, public snackBar: MatSnackBar,private userService: UserService) {
    this.permissions={ "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 }
    this.userService.USER_DETAILS.subscribe(val => {
      if(val.usr_ctgry_id==8) // LMO
            {
                this.lmocd=val.lmo_cd
                this.agnt_id = val.usr_ctgry_ky
                console.log(this.agnt_id);
                console.log(val);
            }
      });

   }

  ngOnInit() {
    this.distrctLst();
    this.gridData();
    this.portAllocated();
  }
  gridData(){
    let rte = `agent/substations/agent/${this.agnt_id}`
    //console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
     // console.log(res['data']);
      this.TableOneData=res['data']
      //console.log(this.TableOneData)
      var index=0
        for(var k=0; k<this.TableOneData.length; k++){
          index= index+1;
          this.TableOneData[k].indx=index
        }
       // console.log(this.TableOneData)
        this.columnDefs = [
          { headerName: 'Sno', field: 'indx', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 50,sortable: true,filter: false },
          { headerName: 'District',field: 'dstrt_nm' , cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Mandal',field: 'mndl_nm' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Village',field: 'vlge_nm' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Substation Name',field: 'sbstn_nm' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Substation Type',field: 'sbstn_type_nm' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
          { headerName: 'Estimated CAF Count',field: 'count' , algnmnt:"center", cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
          { headerName: 'Requested Date',field: 'dt' , algnmnt:"center", cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
     ];
    })
  }
  openSideBar(key) {
    //console.log(key);
    this.dsSidebarService.getSidebar(key).toggleOpen();
  }
  closeSideBar() {
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  distrctLst(){
    let rte = 'agent/dstrctList'
    this.crdsrv.get(rte).subscribe((res) => {
      //console.log(res['data']);
      this.distrctLst=res['data']
      //console.log(this.distrctLst);
    })
  }
  getSubStnLst(dstId){
   // console.log(dstId);
    let rte = `agent/substationList/${dstId}`
   // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
    //  console.log(res['data']);
      this.substationLst=res['data']
     // console.log(this.substationLst);
    })
  }
  getMandalsVillages(substnId){
   // console.log(substnId);
    let rte = `agent/mandalVillagesList/${substnId}`
   // console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
    //  console.log(res['data']);
      this.mandalData=res['data'][0]
      this.villagesData=res['data'][1]
     // console.log(this.mandalData);
     // console.log(this.villagesData);
    })
  }


  saveSubstations(){
    // console.log(this.districtID);
    // console.log(this.substationID);
    // console.log(this.mandalData[0].mndl_id);
    // console.log(this.villageIDS);
    // console.log(this.count);
    let insert_Data = {
             s_district_id:this.districtID,
             s_substatn_id:this.substationID,
             s_mndl_id:this.mandalData[0].mndl_id,
             s_villages_id:this.villageIDS,
             s_count:this.count,
             s_agnt_id:this.agnt_id

    }
    console.log(insert_Data);
    let rot = 'agent/insrt_substations'
    this.crdsrv.create(insert_Data, rot).subscribe((res) => {
      //console.log(res['status']);
      if(res['status'] == 200){
        this.snackBar.open("Sucessfully Added", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }

  
  onToolbarPreparing(e) {
      e.toolbarOptions.items.unshift({
        location: 'after',
        widget: 'dxButton',
        options: {
            icon: 'plus',
            text: 'Add New Sub-Stations',
            onClick:this.openSideBar.bind(this, 'addFormPanel'),
            bindingOptions: {
              'disabled': 'isEmailButtonDisabled'
            }
        }
    });
}


portAllocated() {
  let rte = `agent/get_olts_ports/${this.agnt_id}`
  this.crdsrv.get(rte).subscribe((res) => {
   // console.log(res['data']);
    this.agentPortData=res['data']
   // console.log(this.agentPortData);
    var serialno=0
    for(var k=0; k<this.agentPortData.length; k++){
      serialno= serialno+1;
      this.agentPortData[k].sno=serialno
    }
    this.portcolumnDefs = [
      { headerName: 'Sno', field: 'sno', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 50,sortable: true,filter: false},
      { headerName: 'District',field: 'dstrt_nm' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true},
      { headerName: 'Mandal',field: 'mndl_nm' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true},
      { headerName: 'Substation Name',field: 'sbstn_nm' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true},
      { headerName: 'Substation Type',field: 'sbstn_type_nm' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true},
      { headerName: 'OLT Name',field: 'olt_nm' ,  cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true},
      { headerName: 'OLT Ip Address',field: 'olt_ip_addr_tx' ,  cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true},
      { headerName: 'OLT Serial Number',field: 'olt_srl_nu' , algnmnt:"center", cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true},
      { headerName: 'OLT Port Name',field: 'olt_prt_nm' , algnmnt:"center", cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true},
    ]
  })
}
}
