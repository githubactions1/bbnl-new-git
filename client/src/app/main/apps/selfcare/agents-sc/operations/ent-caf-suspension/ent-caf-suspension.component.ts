import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-ent-caf-suspension',
  templateUrl: './ent-caf-suspension.component.html',
  styleUrls: ['./ent-caf-suspension.component.scss']
})
export class EntCafSuspensionComponent implements OnInit {
  getHeaderDtls = function () {
    return { title: "Enterprise CAF Suspension", icon: "people_outline" };
  };
  permissions;
  rowData;
  caf_num;
  shwPermMsg;
  columnDefs;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loader:boolean=false;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  constructor(public crdsrv: CrudService, public snackBar: MatSnackBar, public dialog: MatDialog) {
    const permTxt = 'Enterprise CAF Suspension';
    const prmeRte = `user/permissions/${permTxt}`;
    this.crdsrv.get(prmeRte).subscribe((res) => {
      //if (res['data']){
        //this.permissions = res['data'][0];
     // } else{
        this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
        //this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
      //}
    });
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 }
    //this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
   }

  ngOnInit() {
  }
  getDtls(){
    this.loader = true;
    const cmprte = `caf/ent_caf_details/${this.caf_num}`;
    this.crdsrv.get(cmprte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loader = false;
        this.rowData = res['data'];
        let counter = 0;
        this.rowData.filter((k) => {
          k['s_no'] = ++counter;
        });
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
          { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 140, dataType: 'number', filter: true },
          { headerName: 'Name', field: 'cstmr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, dataType: 'number', filter: true },
          { headerName: 'Mobile Number', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 200, dataType: 'number', filter: true },
          { headerName: 'Status', field: 'sts_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
          { headerName: 'Caf Type', field: 'caf_type_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
          { headerName: 'ONU Serial NO', field: 'onu_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, dataType: 'number', filter: true },
          { headerName: 'District Name', field: 'dstrt_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, dataType: 'number', filter: true },
        ];
      }
    });
  }
  onCelleditClick(acvtdata) {
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
        }, {
          label: 'Cancel',
          res: 'cancel'
        }]
      }
    });
  this.confirmMsgDialogRef.afterClosed().subscribe((response) => {
    if (response) {
      if (response == 'ok') {
        this.loader = true;
        let data = {
          caf_id: acvtdata.data.caf_id,
        }
        console.log(data);
        let rte = 'caf_operations/ent_caf_suspend'
        this.crdsrv.create(data, rte).subscribe((res) => {
          this.loader = false;
          console.log(res['status']);
          if (res['status'] == 200) {
            if (res['data'][0] == 'true') {
              console.log("trueeeeeeeeeeeeeeee");
              this.snackBar.open("Sucessfully Caf Suspended", '', {
                duration: 2000,
                panelClass: ['blue-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              
            }
            else if (res['data'][0] == 'pending') {
              this.snackBar.open("CAF Suspension is PENDING", '', {
                duration: 2000,
                panelClass: ['green-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              
            }
            else if (res['data'][0] == 'failed') {
              this.snackBar.open("CAF Suspension is Failed", '', {
                duration: 2000,
                panelClass: ['red-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
             
            }
          }
        })
      } else {
        
      }
      console.log(response);
      console.log("in close");
    }
  });
  }
}
