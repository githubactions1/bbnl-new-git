
import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-tutorial-venue-form',
  templateUrl: './training-lctns-edt.component.html',
  styleUrls: ['./training-lctns-edt.component.scss']
})
export class TrainingLctnsEdtComponent implements OnInit {
  
  ScheduleForm: FormGroup;
  schFormDt : any;
  schdistLst : any=[];
  ulbL :any= [];
  data = this.transfereService.getData();
  edit: boolean = false
  constructor(private crdsrv: CrudService,private route: Router,public snackBar: MatSnackBar,private transfereService:TransfereService) { }

  ngOnInit() {

    if(this.data){
    this.ScheduleForm = new FormGroup({
      ulbs : new FormControl(this.data.mndl_id, Validators.required),
      dstct : new FormControl(this.data.dstrt_id, Validators.required),
      vnunm: new FormControl(this.data.trng_vnu_nm, Validators.required),
      Capacity:new FormControl(this.data.trng_vnu_cpsty_ct, Validators.required),
      address: new FormControl(this.data.trng_vnu_address, Validators.required),
      prsn_nm: new FormControl(this.data.trng_vnu_cntct_nm, Validators.required),
      prsn_num: new FormControl(this.data.trng_vnu_mble_nu, Validators.required),
      radio1: new FormControl(this.data.trng_vnu_prjt_in, Validators.required),
      radio2: new FormControl(this.data.trng_vnu_mic_in, Validators.required),
      urbn_in:new FormControl(this.data.urbn_in, Validators.required),
    })
    this.edit= true
    this.dsrtcLst();  
    this.ulbLst()
  }
    if(!this.data){
      this.ScheduleForm = new FormGroup({
        ulbs : new FormControl('', Validators.required),
        dstct : new FormControl('', Validators.required),
        vnunm: new FormControl('', Validators.required),
        Capacity:new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        prsn_nm: new FormControl('', Validators.required),
        prsn_num: new FormControl('', Validators.required),
        radio1: new FormControl('', Validators.required),
        radio2: new FormControl('', Validators.required),
        urbn_in:new FormControl('', Validators.required),
      })
      this.dsrtcLst();
    }
    
  }
  schdlTrng(){
    this.schFormDt = {
   ulbLst :this.ScheduleForm.value.ulbs,
   dstctL : this.ScheduleForm.value.dstct,
   SchData: this.ScheduleForm.value
   }
   
   console.log(this.schFormDt);
   console.log(this.schFormDt.SchData);
   console.log(this.schFormDt.lengtht);
   const rte = 'web/common/vnuform';
   this.crdsrv.create(this.schFormDt, rte).subscribe((res) => {
    console.log(res)
  
    if (res['status'] == 200) {
      this.snackBar.open("Venue Sucessfully Added", 'End now', {
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
     this.reset();
    }
   //this.ScheduleForm.reset();
   
  }, (error) => {
    console.log(error)
  })
  
   }
  dsrtcLst() {
    const rte = 'web/common/dstrctLst';
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res);
      console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.schdistLst = res['data'];
          console.log(this.schdistLst)
        }
      }
    })
  }
  ulbLst(){
    const rte = 'web/common/mandalLst/' + this.ScheduleForm.value.dstct;
    this.crdsrv.getDistLst(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.ulbL = res['data'];
          console.log(this.ScheduleForm.value)
        }
      }
    })
    console.log();
  }
reset(){
  this.ScheduleForm = new FormGroup({
    ulbs : new FormControl('', Validators.required),
    dstct : new FormControl('', Validators.required),
    vnunm: new FormControl('', Validators.required),
    Capacity:new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    prsn_nm: new FormControl('', Validators.required),
    prsn_num: new FormControl('', Validators.required),
    radio1: new FormControl('', Validators.required),
    radio2: new FormControl('', Validators.required),
    urbn_in:new FormControl('', Validators.required),
  })
  this.ScheduleForm.markAsPristine();
this.ScheduleForm.markAsUntouched();

}
  back(){
    console.log("hai")
    // this.route.navigate([`/admin/lms/calendar`])
  }
  update(){
    this.schFormDt = this.ScheduleForm.value
    this.schFormDt['vnu_id'] =this.data.trng_vnu_id,
   
   
   console.log(this.schFormDt)
   const rte = 'web/common/vnuupdtform';
   this.crdsrv.create(this.schFormDt, rte).subscribe((res) => {
    console.log(res)
  
    if (res['status'] == 200) {
      this.snackBar.open("Venue Sucessfully Added", 'End now', {
        duration: 2000,
        horizontalPosition: "center",
        verticalPosition: "bottom",
      });
     this.reset();
    }
   //this.ScheduleForm.reset();
   
  }, (error) => {
    console.log(error)
  })
  
   }

}

