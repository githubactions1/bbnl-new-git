import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  columnDefs = [];
  getRowHeight;
  rowSelection;
  usersubdt: any;
  sideBarHeader: string;
  editClicked: boolean;
  alertCtgry: any;
  formnoft: FormGroup;
  deleteRle: boolean;
  usrdtls: any;
  subcribetype: any;
  selectedoptions: any;
  mrchnts: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  updateData: any;
  selectBar: boolean;
  hdrDta: any;
  loader:boolean;
  paginationPageSize:any;
  
  /**
   * @param {FormBuilder} _formBuilder
 */
    /**
      * @param {DsSidebarService} _dsSidebarService
      */

     getHeaderDtls = function() { return {"title":"Alerts And Subscriptions","icon":"file_copy"}}    
  constructor(public crdsrv: CrudService,private _dsSidebarService: DsSidebarService, private _formBuilder: FormBuilder,public snackBar: MatSnackBar) { 
    this.getUseralertsSubs();
    this.getmerchants();
    this.getRowHeight = function (params) {
      if (params.node.level === 0) {
        return 40;
      } else {
        return 25;
      }
    };
    this.subcribetype=[{"id":1,"name":"SMS"},{"id":2,"name":"EMAIL"},{"id":3,"name":"WEB"},{"id":4,"name":"APP"}]
  }

  ngOnInit() {

    this.formnoft = new FormGroup({
      alert_cat_id: new FormControl('', Validators.required),
      alert_sub_type: new FormControl(''),
      mrcht_id: new FormControl('', Validators.required)


    });
  }
  getUseralertsSubs() {
    this.loader=true;
    const rte = `alert/subscrtype`;
    this.crdsrv.get(rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false;
        console.log(res['data'])
      this.usersubdt = res['data'];
      this.columnDefs = [
        { headerName: 'S.No', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 60, height: 60 },
        { headerName: 'User', field: 'mrcht_usr_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 60, filter: true },
        { headerName: 'Merchant', field: 'mrcht_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 60, filter: true },
        { headerName: 'Alert Category', field: 'alert_cat_nm', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 60, filter: true },
        { headerName: 'Sms', field: 'sms', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 60 },
        { headerName: 'Email', field: 'email', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 60 },
        { headerName: 'Push', field: 'APP', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 60 },
        { headerName: 'Web', field: 'web', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 200, height: 60 },
        {
          headerName: 'Edit',
          cellStyle: { textAlign: 'center' },
          width: 100,
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
        }, 
        // {
        //   headerName: 'Delete',
        //   cellStyle: { textAlign: 'center' },
        //   width: 100,
        //   cellRenderer: function (param) {
        //     const eDiv = document.createElement('div');
        //     eDiv.innerHTML = `<span class="my-css-class">
        //     <button class="btn-simple editBtn-color dlteBtnStyls" style=" 
        //     box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
        //     color: #fff;cursor: pointer;border: none;line-height: 17px;border-radius: 3px;"><mat-icon _ngcontent-smm-c39="" 
        //     class="secondary-text pt-4  mat-icon notranslate material-icons deleteBtn-icon-color" 
        //     role="img" aria-hidden="true">delete</mat-icon></button></span>
        //     <span class="my-css-class">
        //     </span>`;
        //     const eButton = eDiv.querySelectorAll('.btn-simple')[0];
        //     eButton.addEventListener('click', function (param) {
        //       // console.log(param);
        //     });
        //     return eDiv;
        //   },
        // }
      ];
      }
      
    })
    this.rowSelection = "single";
  }
  opensideBar(key, rledta) {
    console.log(rledta)
    if (rledta) {
      this.getAlertsCatgeories(2);
      this.sideBarHeader = 'Edit';
      this.selectBar = true;
      this.editClicked = true;
      this.updateData = rledta;
      let ftg =[]
      if(rledta.sms=="YES"){ftg.push(1)}if(rledta.APP=="YES"){
        ftg.push(4)}if(rledta.email=="YES"){ftg.push(2)}if(rledta.web=="YES"){ftg.push(3)}
        this.selectedoptions=ftg;

      this.formnoft.get('alert_cat_id').setValue(rledta.alert_cat_id);
      this.formnoft.get('mrcht_id').setValue(rledta.mrchnt_id);
      this.formnoft.get('alert_sub_type').setValue(this.selectedoptions);
    } else {
      this.getAlertsCatgeories(1);
      this.sideBarHeader = 'Add New';
      this.editClicked = false;
      this.selectBar = false;
      this.formnoft.get('alert_cat_id').setValue('');
      this.formnoft.get('mrcht_id').setValue('');
      this.formnoft.get('alert_sub_type').setValue([]);
    }
    this._dsSidebarService.getSidebar(key).toggleOpen();
  }
  getAlertsCatgeories(id){
    const rte = `alert/alrtctgry/${id}`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.alertCtgry = res['data'];
    })
  }
  getmerchants(){
    const rte = `alert/mrchnts`;
    this.crdsrv.get(rte).subscribe((res) => {
      this.mrchnts = res['data'];
    })
  }
  saveSub() {
    if (this.editClicked == false) {
      this.newentry();
    } else if (this.deleteRle == true) {
      // this.delete(this.updateData);
    } else {
      this.update(this.updateData);
    }
  }
  newentry() {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    let rte = `alert/subscribe`
    this.formnoft.value['SMS']=false;
    this.formnoft.value['EMAIL']=false;
    this.formnoft.value['WEB']=false;
    this.formnoft.value['APP']=false;
     for(var i=0; i<this.selectedoptions.length;i++){
       if(this.selectedoptions[i]==1){
        this.formnoft.value['SMS']=true;}
       if(this.selectedoptions[i]==2){
        this.formnoft.value['EMAIL']=true;}
       if(this.selectedoptions[i]==3){
        this.formnoft.value['WEB']=true;}
       if(this.selectedoptions[i]==4){
        this.formnoft.value['APP']=true;}
     }
    let data = {
      mrcht_id: this.formnoft.value.mrcht_id,
      alert_cat_id: this.formnoft.value.alert_cat_id,
      SMS: this.formnoft.value.SMS,
      EMAIL: this.formnoft.value.EMAIL,
      WEB: this.formnoft.value.WEB,
      APP: this.formnoft.value.APP,
      user_id: this.usrdtls.mrcht_id,
      crte_usr_id: this.usrdtls.mrcht_id
    };
    this.crdsrv.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Subscribed Sucessfully",'', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getUseralertsSubs();
        this.opensideBar('addFormPanel', null);

      }
    }, (error) => {
    });
  }
  onCellClick(event) {
    console.log(event)
    if (event.colDef.headerName == 'Edit') {
      this.deleteRle = false;
      this.opensideBar('addFormPanel', event.data);

    } else if (event.colDef.headerName == 'Delete') {
      this.deleteRle = true;
      this.opensideBar('addFormPanel', event.data);
    }
  }
  update(data) {
    let rte = `alert/subscribe`;
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.formnoft.value['SMS']=false;
    this.formnoft.value['EMAIL']=false;
    this.formnoft.value['WEB']=false;
    this.formnoft.value['APP']=false;
     for(var i=0; i<this.selectedoptions.length;i++){
       if(this.selectedoptions[i]==1){
        this.formnoft.value['SMS']=true;}
       if(this.selectedoptions[i]==2){
        this.formnoft.value['EMAIL']=true;}
       if(this.selectedoptions[i]==3){
        this.formnoft.value['WEB']=true;}
       if(this.selectedoptions[i]==4){
        this.formnoft.value['APP']=true;}
     }
     let updtdata = {
      mrcht_id: this.formnoft.value.mrcht_id,
      alert_cat_id: this.formnoft.value.alert_cat_id,
      SMS: this.formnoft.value.SMS,
      EMAIL: this.formnoft.value.EMAIL,
      WEB: this.formnoft.value.WEB,
      APP: this.formnoft.value.APP,
      user_id: this.usrdtls.mrcht_id,
      crte_usr_id: this.usrdtls.mrcht_id
    };
    this.crdsrv.update(updtdata, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.snackBar.open("Sucessfully Added", 'End now', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.getUseralertsSubs();
        this.opensideBar('addFormPanel', null);
      }
    }, (error) => {
    });
  }

}
