import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { Router } from '@angular/router';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { CrudService } from '../../crud.service';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';


@Component({
  selector: 'app-resume-pending-list-view',
  templateUrl: './resume-pending-list-view.component.html',
  styleUrls: ['./resume-pending-list-view.component.scss']
})
export class ResumePendingListViewComponent implements OnInit {
  permissions: { slct_in: number; insrt_in: number; updt_in: number; dlte_in: number; exprt_in: number; };
  loading: boolean;
  rowData: any;
  shwPermMsg: string;
  columnDefs;
  showTble;
  public cstmrData: any;
  cmpltData: any;
  sdeMnuLdr = false;
  lmoColumnDefs = [];
  // tslint:disable-next-line:quotemark
  getHeaderDtls = function (): any { return { 'title': "Resume Pending List", 'icon': 'people_outline' }; };
  msoLmoDtls: any;
  complaintsview: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  cmpltsdata: any;
  rowData1: any;
  modalService: any;
  confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
  constructor(public crdsrv: CrudService, private router: Router, public dialog: MatDialog, public transfereService: TransfereService, private _dsSidebarService: DsSidebarService) {
    this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
  }

  ngOnInit(): void {
    this.resumelstView();
  }
  resumelstView(): any {
    this.loading = true;
    const cmprte = `lmoprepaid/listresumepending`;
    this.crdsrv.get(cmprte).subscribe((res) => {
      if (res['status'] === 200) {
        this.loading = false;
        this.rowData = res['data'];
        console.log(this.rowData);
        let counter = 0;
        this.rowData.filter((k) => {
          k['s_no'] = ++counter;
        });
        if (res['perm']) {
          this.permissions = res['perm'][0];
        } else {
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
          { headerName: 'Caf ID', field: 'caf_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
          { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string', filter: true },
          { headerName: 'ONU Serial Number', field: 'onu_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 180, filter: true },
          { headerName: 'IPTV Serial Number', field: 'iptv_srl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
          { headerName: 'LMO Code', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
          { headerName: 'Mobile Number', field: 'mbl_nu', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
          { headerName: 'Action', field: 'Retrack', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, height: 40, },
        ];
      }
    });
  }

  onCellPrepared(colDef, e) {

    if (e.rowType === "data" && e.row.data && e.column.dataField == 'Retrack') {
      e.cellElement.style.color = '#ff0000';
      e.cellElement.style.fontWeight = 500;
      e.cellElement.style.background = 'rgba(243, 191, 176, 0.2784313725490196)';
      e.cellElement.style.backgroundClip = 'content-box';
      e.cellElement.style.cursor = "pointer";
    }

  }
  // onCellClick(event): any {
  //   console.log(event.value);
  //   if (event.value == 'Retrack') {
  //     var data = event.data;

  //     for (var i = 0; i < this.rowData.length; i++) {
  //       if (this.rowData[i].caf_id == data.caf_id && this.rowData[i].curnt_tm > this.rowData[i].actl_ts) {
  //         this.crdsrv.create(data, "caf_operations/prpdresumepndng").subscribe((res) => {
  //           this.rowData1 = res["data"];
  //           console.log(this.rowData1);

  //           this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
  //             width: '25%',
  //             panelClass: 'my-class',
  //             data: {
  //               title: '',
  //               msg: 'Your re-track request submitted successfully',
  //               btnLst: [{
  //                 label: 'Ok',
  //                 res: 'ok'

  //               }
  //               ]
  //             }
  //           });
  //           this.resumelstView();
  //         })

  //       } else {
  //         this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
  //           width: '25%',
  //           panelClass: 'my-class',
  //           data: {
  //             title: '',
  //             msg: 'Retrack Option enabled on 15 Minutes',
  //             btnLst: [{
  //               label: 'Ok',
  //               res: 'ok'

  //             }
  //             ]
  //           }
  //         });
  //       }
  //     }

  //     //    console.log(data.caf_id);

  //     //    this.crdsrv.create(data, "caf_operations/prpdresumepndng").subscribe((res) => {
  //     //     this.rowData1 = res["data"];
  //     //     console.log(this.rowData1);
  //     //    })
  //     // this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
  //     //     width: '25%',
  //     //     panelClass: 'my-class',
  //     //     data: {
  //     //         title: '',
  //     //         msg: 'Your re-track request submitted successfully',
  //     //         btnLst: [{
  //     //             label: 'Ok',
  //     //             res: 'ok'
  //     //          }
  //     //       //,{
  //     //       //     label: 'Cancel',
  //     //       //     res: 'cancel'
  //     //       // }
  //     //     ]
  //     //     }
  //     // });
  //   }

  // }
  onCellClick(event): any {
    console.log(event.value);
    if (event.value == 'Retrack') {
      var data = event.data;
      console.log(data.caf_id);
      for (var i = 0; i < this.rowData.length; i++) {
        if (this.rowData[i].caf_id == data.caf_id) {
          if (this.rowData[i].curnt_tm > this.rowData[i].actl_ts) {
            this.crdsrv.create(data, "caf_operations/prpdresumepndng").subscribe((res) => {
              this.rowData1 = res["data"];
              console.log(this.rowData1);

              this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
                width: '25%',
                panelClass: 'my-class',
                data: {
                  title: '',
                  msg: 'Your re-track request submitted successfully',
                  btnLst: [{
                    label: 'Ok',
                    res: 'ok'

                  }
                  ]
                }
              });
              this.resumelstView();
            })
          } else {
            this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
              width: '25%',
              panelClass: 'my-class',
              data: {
                title: '',
                msg: 'Retrack Option enabled on 15 Minutes',
                btnLst: [{
                  label: 'Ok',
                  res: 'ok'

                }
                ]
              }
            });
          }


        }

      }


    }



  }
}
