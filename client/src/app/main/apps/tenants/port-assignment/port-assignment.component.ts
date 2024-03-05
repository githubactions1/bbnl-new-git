import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-port-assignment',
  templateUrl: './port-assignment.component.html',
  styleUrls: ['./port-assignment.component.scss']
})
export class PortAssignmentComponent implements OnInit {
  permissions;
  mandalLst: any;
  dstId: any;
  mndlId: any;
  agntCode:any;
  oltDetails: any;
  isLoading: boolean;
  columnDefs:any;
  tableview: boolean;
  portsView:boolean=false;
  oltSlctdData: any;
  postData: any;
  public agntCtrl: FormControl = new FormControl();
  public agentCntrl: FormControl = new FormControl();
  tenantsData: any;
  scndChckData:any;
  portData: any;
  insert_Data:any;
  main_Data:any;
  mainAgNtData:any
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  tablevw:boolean = false;
  lmoPymntsForm: FormGroup;
  chngto:boolean=false
  filteredAgents: any;
  errorMsg: string;
  mandalID:any;
  districtID:any;
  stateCtrl: FormControl;
  filteredStates: any;
  getHeaderDtls = function (): any { return { "title": 'Port Allocation', "icon": "receipt" }; };
  serchAgntData: any;
  thirdsrch: any[];
  distrctLst: any;
  seeData: any[];
  shwPermMsg: string;
  constructor(private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, private formBuilder: FormBuilder, public snackBar: MatSnackBar) {
    const permTxt = 'Port Allocation';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      if (res['data']){
        this.permissions = res['data'][0];
      } else{
        this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      }
    });
	this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
	// this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 0 }
  }

  ngOnInit() {
    this.distrctLstfnctn();
    this.lmoPymntsForm = this.formBuilder.group({
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
        if (value){
        if (value.length >= 3 || value.length !==  null) {
          // return this.crdsrv.get('agent/getAgentBySearch/' + value)
          return this.crdsrv.get(`agent/getAgentBySearch/${value}`)
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
  }
  displayFn(id): any {
    //   if (agent) { return agent.agnt_nm + ' ' + '|' + ' ' + agent.agnt_cd; }
    if (!id){
      return '';
    } 
  
      if(this.serchAgntData){
      
        let index = this.serchAgntData.findIndex(state => state.agnt_id === id);
        console.log(this.serchAgntData[index].agnt_nm)
        // return this.serchAgntData[index].agnt_nm ;
        return this.serchAgntData[index].agnt_nm + ' ' + '|' + ' ' + this.serchAgntData[index].agnt_cd;
      }
  }
 

  
 
  onSearchChange(searchValue: string): void {
    var sdata =[]
    console.log("in on search")
    console.log(searchValue)

    this.agntCode = searchValue;
    sdata.push(this.agntCode);
    this.seeData = sdata
    if (this.agntCode.length > 3) {
      let rte=`agent/getAgentBySearch/${this.agntCode}`
      this.crdsrv.get(rte).subscribe((res) => {
        this.serchAgntData = res['data']
        console.log(this.serchAgntData)
      })
    }
  }

  distrctLstfnctn() {
    let rte = 'agent/dstrctList'
    this.crdsrv.get(rte).subscribe((res) => {
      this.distrctLst = res['data']
    })
  }
  getMandalLst(dstrct_id) {
    this.dstId = dstrct_id;
    let rte = `agent/mandalList/${dstrct_id}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.mandalLst = res['data']
      console.log(this.mandalLst)
    })
  }
  getdetails(mndl_id) {
    this.mndlId = mndl_id
  }
  getData() {
    this.tableview = false;
    this.portsView = false;
    let rte = `agent/oltWiseDetails/${this.dstId}/${this.mndlId}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.oltDetails = res['data'];
      console.log(this.oltDetails);
      console.log(res['perm']);
      //if (res['perm']){
        //this.permissions = res['perm'][0];
        this.tableview = true;
      //} else{
        //this.tableview = false;
        //this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      //}
      let index = 0;
      for (let k = 0; k < this.oltDetails.length; k++){
        index = index + 1;
        this.oltDetails[k].sno = index;
        if (this.oltDetails[k].crd_id == 1){
          this.oltDetails[k].unassignedports = 8-this.oltDetails[k].portcount;
        }
        else if (this.oltDetails[k].crd_id == 2){
          this.oltDetails[k].unassignedports = 16 - this.oltDetails[k].portcount;
        }
        else if (this.oltDetails[k].crd_id == 3){
          this.oltDetails[k].unassignedports = 32 - this.oltDetails[k].portcount;
        }
      }
      if (res['status'] == 200){
         this.columnDefs = [
          { headerName: 'Sno', field: 'sno', cellStyle:'center', cellClass: "pm-grid-number-cell", width: 110,sortable: true,filter: false },
          { headerName: 'Substation Name',field: 'sbstn_nm' , cellStyle:'left', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
          { headerName: 'Substation Code',field: 'sbstn_unq_cd' , cellStyle:'center', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
          { headerName: 'Substation Type',field: 'sbstn_type_nm' , cellStyle:'lef', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
          { headerName: 'OLT Name',field: 'olt_nm' , cellStyle:'left', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
          { headerName: 'OLT IP Address',field: 'olt_ip_addr_tx' , cellStyle:'center', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
          { headerName: 'OLT Serial Number',field: 'olt_srl_nu' , cellStyle:'center', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
          { headerName: 'Assigned Ports',field: 'portcount' , cellStyle:'center', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
          { headerName: 'Unassigned Ports',field: 'unassignedports' , cellStyle:'center', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
          { headerName: 'Total Subscribers',field: 'cafcount' , cellStyle:'center', cellClass: "pm-grid-number-cell", width: 210, sortable: true,filter:true },
     ];
      }
    })
  }
  oltSlctn(dta){
	if(dta.selectedRowsData.length > 0 ){
		this.tableview=true;
		var data =[]
		var scndChckDataV = []
		this.oltSlctdData=dta.selectedRowsData
		for(var i=0; i<this.oltSlctdData.length; i++){
			data[i]=this.oltSlctdData[i].olt_id
		}
	   
		data.push(this.districtID);
	   
		this.postData = data
		 let rte='agent/portsInformationForOlts'
	 
		this.crdsrv.create(this.postData,rte).subscribe((res) => {
		  this.portData = res['data'][0];
		  this.tenantsData = res['data'][1];
		  console.log(this.tenantsData);
		  console.log(this.portData);
		  if(res['status'] == 200){
			for(var l=0; l<this.portData.length; l++){
			  if(this.portData[l].agnt_id != null){
			  this.portData[l].agntId=this.portData[l].agnt_id;
			  this.portData[l]['chngto']=false;
			  this.portData[l]['agentnmcd']=this.portData[l].agnt_nm +'('+ this.portData[l].agnt_cd +')';
			  }
			  else{
			  this.portData[l].agntId='';
			  this.portData[l]['chngto']=false;
			  this.portData[l]['agentnmcd']='';
			  }
			}
			  
			  console.log(this.portData);
			 for(var v=0; v<this.portData.length; v++){
			   if(this.portData[v].agnt_id == '101000008'){
				 this.tenantsData.push({'olt_id':this.portData[v].olt_id, 'agnt_id':this.portData[v].agnt_id,'agnt_nm':this.portData[v].agnt_nm , 'agnt_cd':this.portData[v].agnt_cd});
				 this.portsView=true;
			  }
			  else{
				this.portsView=true;
			  }
			}
		 

		 }
		 
		 
		 
		})
	} else {
		 this.portsView = false;
	}

  }
  addlmoid(agntdt,prtdt){
    console.log(agntdt)
    console.log(prtdt)
    this.portData.filter((k,index) => { 
      console.log(index)
      if(k.olt_prt_id ==prtdt.olt_prt_id){
        if(agntdt.prt_in ==2){
          this.portData[index]["agntIdRl"] =101000008

        }
        else{
        this.portData[index]["agntIdRl"] =agntdt.agnt_id
          // agntIdRl: agntdt.agnt_id
        }
      }
    })
    console.log(this.portData);
    

  }

  onCfChange(agntValue: string): void {    
console.log(agntValue);

this.chngto=true
for(var b=0; b<this.portData.length; b++){
  if(agntValue['olt_prt_nm'] == this.portData[b].olt_prt_nm){
    this.portData[b].chngto=true;
  }
}
console.log(this.portData);

  }
  savePortDetails(){
    var insertData =[]
    var mainData = []
   

    var index=0;
    // for(var m=0; m<this.portData.length; m++){
    //   if(this.portData[m].agnt_id > 0 || this.portData[m].agntId > 0){
    //     if(this.portData[m].agntId != this.portData[m].agnt_id){
    //       insertData[index]=this.portData[m]
    //                 index++
    //     }
    //   }
          
    // }
    for(var m=0; m<this.portData.length; m++){
      if(this.portData[m].agntIdRl){
        if(this.portData[m].agntIdRl > 0){
       insertData[index]=this.portData[m]
                    index++
        }
      }
    }
         console.log(this.portData);
     this.insert_Data = insertData;

     console.log(this.insert_Data);
    let rte ='agent/insert_PortToAgent'
    this.crdsrv.create(this.insert_Data,rte).subscribe((res) => {
      if(res['status'] == 200){
        this.snackBar.open("Sucessfully Updated", '', {
          duration: 2500,
          panelClass: ['blue-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
      else{
        this.snackBar.open("Something Went Wrong", '', {
          duration: 2500,
          panelClass: ['red-snackbar'],
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }
}
