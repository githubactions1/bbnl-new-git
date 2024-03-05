import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../apps/crud.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.scss']
})
export class NotificationBarComponent implements OnInit {
  showNtf: boolean;
  hideNtf: boolean;
  ntfctn: any;
  
  constructor(public apiSrvc: CrudService) { 
  }

  ngOnInit() {
    let usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    // console.log(usrDtls);
    if(usrDtls)
    this.getUsrRcntNotfctn();
  }


  private getUsrRcntNotfctn() {
    let rte = `alert/usrRcntNtfctn`
    // console.log(rte)
    this.apiSrvc.get(rte).subscribe((res) => {
      if (res['status'] == 200) {
      this.ntfctn = res['data'][0];
      // console.log(this.ntfctn);
      if(this.ntfctn.alert_tx != null) { this.showNtf = true } else { this.hideNtf = false };
      if(this.ntfctn.alert_tx == null) { this.showNtf = false } else { this.hideNtf = true };
    }else {
      // console.log('No notification found');
    }
  }, (error) => {
      console.log(error)
    });
  }

  private close(clsId){
    // console.log('close-----------')
    let rte = "alert/ntfctnRspns"
    var rspnseDta = {clsId: clsId, alertId: this.ntfctn.alert_id}
    this.apiSrvc.update(rspnseDta, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.hideNtf = true; this.showNtf = false;
      }
    }, (error) => {
      console.log(error);
    });
  }
}
