import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';

import { UserService } from 'app/providers/user/user.serivce';
import { IfStmt } from '@angular/compiler';
@Component({
  selector: 'app-port-spliting',
  templateUrl: './port-spliting.component.html',
  styleUrls: ['./port-spliting.component.scss']
})
export class PortSplitingComponent implements OnInit {
  lmocd: any;
  agnt_id: any;
  permissions;
  oltDrpDwn: boolean = false;
  oltList: any;
  oltid:any;
  TableData: any;
  columnDefs: any[];
  selectedData: any;
  showResults:boolean = false;
  sltFirstData: any
  dataOne: { sno: number; id: number; value: { l_id1: number; }[]; slotTdata: { s_id: number; }[]; }[];
  jsonData: any[];
  sendingData: any[];
  postingData: any[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  getHeaderDtls = function () { return { "title": "Port Spliting", "icon": "list_alt" } }
  viewMsg:boolean = true;
  oltID: any;
  pageLdr:boolean;
  apsflbbnlflag;



  constructor(private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, public snackBar: MatSnackBar, private userService: UserService) {
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 }
    var  sltFirstData= [
      {
        sno:1,
        id: 2,
        value: [{l_id1:1,s_data:"false"},{l_id1:2,s_data:"false"}],
        slotTdata:[{s_id:2},{s_id:4},{s_id:8},{s_id:16},{s_id:32},{s_id:64}]
      },
      {
        sno:2,
        id: 4,
        value: [{l_id1:1,s_data:"false"},{l_id1:2,s_data:"false"},{l_id1:3,s_data:"false"},{l_id1:4,s_data:"false"}],
        slotTdata:[{s_id:2},{s_id:4},{s_id:8},{s_id:16},{s_id:32}]
      },
      {
        sno:3,
        id: 8,
        value: [{l_id1:1,s_data:"false"},{l_id1:2,s_data:"false"},{l_id1:3,s_data:"false"},{l_id1:4,s_data:"false"},{l_id1:5,s_data:"false"},{l_id1:6,s_data:"false"},{l_id1:7,s_data:"false"},{l_id1:8,s_data:"false"}],
        slotTdata:[{s_id:2},{s_id:4},{s_id:8},{s_id:16}]
      },
      {
        sno:4,
        id: 16,
        value: [{l_id1:1,s_data:"false"},{l_id1:2,s_data:"false"},{l_id1:3,s_data:"false"},{l_id1:4,s_data:"false"},{l_id1:5,s_data:"false"},{l_id1:6,s_data:"false"},{l_id1:7,s_data:"false"},{l_id1:8,s_data:"false"},{l_id1:9,s_data:"false"},{l_id1:10,s_data:"false"},{l_id1:11,s_data:"false"},{l_id1:12,s_data:"false"},{l_id1:13,s_data:"false"},{l_id1:14,s_data:"false"},{l_id1:15,s_data:"false"},{l_id1:16,s_data:"false"}],
        slotTdata:[{s_id:2},{s_id:4},{s_id:8}]
      },
      {
        sno:5,
        id: 32,
        value: [{l_id1:1,s_data:"false"},{l_id1:2,s_data:"false"},{l_id1:3,s_data:"false"},{l_id1:4,s_data:"false"},{l_id1:5,s_data:"false"},{l_id1:6,s_data:"false"},{l_id1:7,s_data:"false"},{l_id1:8,s_data:"false"},{l_id1:9,s_data:"false"},{l_id1:10,s_data:"false"},{l_id1:11,s_data:"false"},{l_id1:12,s_data:"false"},{l_id1:13,s_data:"false"},{l_id1:14,s_data:"false"},{l_id1:15,s_data:"false"},{l_id1:16,s_data:"false"},{l_id1:17,s_data:"false"},{l_id1:18,s_data:"false"},{l_id1:19,s_data:"false"},{l_id1:20,s_data:"false"},{l_id1:21,s_data:"false"},{l_id1:22,s_data:"false"},{l_id1:23,s_data:"false"},
          {l_id1:24,s_data:"false"},{l_id1:25,s_data:"false"},{l_id1:26,s_data:"false"},{l_id1:27,s_data:"false"},{l_id1:28,s_data:"false"},{l_id1:29,s_data:"false"},{l_id1:30,s_data:"false"},{l_id1:31,s_data:"false"},{l_id1:32,s_data:"false"}],
        slotTdata:[{s_id:2},{s_id:4}]
      }
    ]
    this.dataOne = sltFirstData;
    console.log(this.dataOne);
    this.userService.USER_DETAILS.subscribe(val => {
      if (val.usr_ctgry_id == 8) // LMO
      {
        this.lmocd = val.lmo_cd
        this.agnt_id = val.usr_ctgry_ky
        console.log(this.agnt_id);
        console.log(val);
      }
    });
  }

  ngOnInit() {
    //this.oltDetails();
    this.oltDrpDwn = true;
    this.apsflbbnlflag = [
      //{value: 4, viewValue: 'APSFL'},
      {value: 3, viewValue: 'BBNL'}
    ];
  }
  getoltdtls(ab){
    console.log("ab",ab);    
    console.log("value",ab.value);    
    this.oltDetails(ab.value);
  }
  oltDetails(value) {
    let rte = `olt/portoltdetails/${this.agnt_id}/${value}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.oltList = res['data']
      if (res['status'] == 200) {
        this.oltDrpDwn = true;
      }
    })
  }
  // getPortsSltsCount(olt_id) {
  //   this.viewMsg = true;
  //   console.log(olt_id);
  //   this.oltid = olt_id;
  //   let rte = `olt/slotDetails/${this.oltid}`
  //   this.crdsrv.get(rte).subscribe((res) => {
  //     console.log(res['data']);
  //     this.TableData = res['data']
  //     var index=0
  //     for(var k=0; k<this.TableData.length; k++){
  //       index= index+1;
  //       this.TableData[k].indx=index
  //     }
  //     if (res['status'] == 200) {
  //          this.viewMsg = false;
  //      this.columnDefs = [
  //       { headerName: 'Sno', field: 'indx', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100,sortable: true,filter: false },
  //       { headerName: 'OLT Name',field: 'olt_nm' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
  //       { headerName: 'OLT Port Name',field: 'olt_prt_nm' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
  //       { headerName: 'No.Of Slots',field: 'sltsct' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
  //       { headerName: 'Slots',field: 'solts' , cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
  //      ]
  //     }
  //   })
  // }
  getPortsSltsCount() {
    this.TableData=[];
    //  this.viewMsg = true;
    this.pageLdr=true;
    console.log(this.oltID);
    this.oltid=  this.oltID;
       let rte = `olt/slotDetails/${this.oltid}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.TableData = res['data']
      var index=0
      for(var k=0; k<this.TableData.length; k++){
        index= index+1;
        this.TableData[k].indx=index
      }
      if (res['status'] == 200) {
        console.log("status");
           this.viewMsg = false;
       this.columnDefs = [
        { headerName: 'Sno', field: 'indx', algnmnt:"center", cellClass: "pm-grid-number-cell", width: 50,sortable: true,filter: false },
        { headerName: 'OLT Name',field: 'olt_nm' ,  cellClass: "pm-grid-number-cell", width: 265, sortable: true,filter:true },
        { headerName: 'OLT Port Name',field: 'olt_prt_nm' , algnmnt:"center", cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
        { headerName: 'No.Of Slots',field: 'sltsct' , algnmnt:"center", cellClass: "pm-grid-number-cell", width: 150, sortable: true,filter:true },
        { headerName: 'Slots',field: 'solts' , cellClass: "pm-grid-number-cell", width: 200, sortable: true,filter:true },
       ]
       this.pageLdr=false;
      }
    })
  }
  // oltSlctn(dta){
  //   console.log(dta.selectedRowsData);
  //   this.selectedData =  dta.selectedRowsData;
  //   console.log(this.selectedData);
  //   if(this.selectedData[0].sltsct == 0){
  //     if(this.selectedData[0].olt_prt_nm > 0){
  //       this.showResults = true;
  //   }
  //   }
  //   else{
  //     this.showResults = false;
  //   }
   
  // }
  onCellClick(data){
    console.log(data);
   console.log(data.data);
      this.selectedData =  data.data;
    console.log(this.selectedData);
    if(this.selectedData.sltsct == 0){
      if(this.selectedData.olt_prt_nm > 0){
        this.showResults = true;
    }
    }
    else{
      this.showResults = false;
    }
  }
  getSltsFrst(fstNumber){
    var data = []
       console.log(fstNumber);
       console.log(this.dataOne);
       for(var j=0; j<this.dataOne.length; j++){
        if(fstNumber == this.dataOne[j].id){
          data.push({id:this.dataOne[j].id,value:this.dataOne[j].value,slotTdata:this.dataOne[j].slotTdata});
        }
       }
       console.log(data);
       this.jsonData = data;
       console.log(this.jsonData);
  }
  getSltsScnd(sndNumber){
    console.log(sndNumber);
    console.log(this.jsonData);
    for(var h=0; h<this.jsonData[0].value.length; h++){
      console.log(this.jsonData[0].value[h]);
      if(this.jsonData[0].value[h].l_id2){
        this.jsonData[0].value[h].l_id3=  128/ ((this.jsonData[0].id)*(this.jsonData[0].value[h].l_id2))
        this.jsonData[0].value[h].s_data = true;
      }
      
    }
    console.log(this.jsonData);
  }
  save(){
    console.log(this.selectedData);
    var postdata = []
    var postdataOne = []
    console.log(this.jsonData);
    this.sendingData = this.jsonData;
    for(var l=0; l<this.sendingData[0].value.length; l++){
      postdata.push({data:this.sendingData[0].value[l].l_id1+'-'+this.sendingData[0].value[l].l_id2+'-'+this.sendingData[0].value[l].l_id3})
    }
    console.log(postdata);
    this.postingData = postdata;
    console.log(this.postingData)
    for(var k=0; k<this.postingData.length; k++){
      postdataOne.push(this.postingData[k].data)
      // postdataOne.push(this.postingData[k].data)
    }
    console.log(postdataOne);
    let finalPostData = {
       olt_id:this.selectedData.olt_id,
       prt_id:this.selectedData.olt_prt_id,
       splitsdata:postdataOne.join(','),
      //  slotsData:this.jsonData[0].value
    }
    console.log(finalPostData)
    let rte = `olt/slotDetails`
    this.crdsrv.create(finalPostData,rte).subscribe((res) => {
      console.log(res['data']);
      console.log(res['status']);
      if(res['status'] == 200){
        this.snackBar.open("Sucessfully Inserted", '', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })

  }

}
