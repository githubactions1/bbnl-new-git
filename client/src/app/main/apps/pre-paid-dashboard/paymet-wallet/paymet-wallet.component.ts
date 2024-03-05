import { Component, OnInit, Inject, Input, ViewChildren, QueryList } from '@angular/core';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from 'app/main/apps/crud.service';
import { MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DialogData } from 'app/main/apps/general/change-log/master/change-log/change-log-modal/change-log-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DxChartModule } from 'devextreme-angular';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import * as _ from 'lodash';
import { Observable, Observer } from "rxjs";
//import { Moment } from 'moment';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: 'app-paymet-wallet',
  templateUrl: './paymet-wallet.component.html',
  styleUrls: ['./paymet-wallet.component.scss']
})
export class PaymetWalletComponent implements OnInit {
    getHeaderDtls = function () {
        return { title: "Wallet Amount", icon: "people_outline" };
    };
    walletinfo: any;
    usrDtls: any;
    walletcount: boolean;
    amount_details: any;
    horizontalPosition: MatSnackBarHorizontalPosition;
    verticalPosition: MatSnackBarVerticalPosition;
    searchLoader: boolean;
    addwalletamount: any;
    constructor(public TransfereService: TransfereService, public crdsrv: CrudService, private dsSidebarService: DsSidebarService, @Inject(MAT_DIALOG_DATA) public cafdata: DialogData, public dialog: MatDialog, public route: ActivatedRoute, private _snackBar: MatSnackBar, private router: Router,private _formBuilder: FormBuilder, private snackBar: MatSnackBar,) { 
      this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    }

  ngOnInit() {
    this.amount_details = this._formBuilder.group({
        current_balance: ["", Validators],
        add_to_wallet:["", Validators],
    });

    this.walletamountfrlmo();
  }


  walletamountfrlmo(){
    this.crdsrv.get("lmoprepaid/walletamountfrlmo").subscribe((res) => {
        this.walletinfo = res["data"];
        // if(this.usrdtls.usr_ctgry_id == 8 ){
        //     this.walletcount = true;
            
        // } else {
        //     this.walletcount = false;
        // }
        console.log(res["data"]);
        console.log(this.walletinfo);
        console.log(this.walletinfo.balance)
    });
}

addWalletamount() {
    if (this.amount_details.invalid) {
        this.snackBar.open("Please Enter Valid Data", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
        var data = {

            login: "325861",
            pass: "325861_titan@123",
            ttype: "NBFundTransfer",
            prodid: "NSE",
            amt: this.amount_details.value["add_to_wallet"],
            txncur: "INR",
            txnamt: this.amount_details.value["add_to_wallet"],
            clientcode: "NAVIN",
            transid: "LMO_WT_WEB_"+new Date().getTime(),
            datepick: moment(new Date()).format('YYYY/MM/DD HH:mm:ss'),
            custacc: "100000036600",
            ru: "https://bbnlbss.apsfl.co.in/apiv1/lmoprepaid/AtomresGateway",
            udf1:this.usrDtls.mrcht_usr_id,
            udf2:this.usrDtls.frst_nm,
            udf3:this.usrDtls.usr_ctgry_ky,
            udf4:this.usrDtls.mrcht_usr_nm
        };
    
    console.log(data)
    this.crdsrv.create(data, "lmoprepaid/AtomGateway").subscribe((res) => {
        this.addwalletamount = res["data"];
        console.log(this.addwalletamount);
        window.location.href = res["data"]
        // window.open(res["data"])
        this.searchLoader = false;
        
    });
}


}




