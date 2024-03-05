import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-tutorial-venue-form',
  templateUrl: './tutorial-venue-form.component.html',
  styleUrls: ['./tutorial-venue-form.component.scss']
})
export class TutorialVenueFormComponent implements OnInit {
  ulbs : any;
  dstct : any;
  ScheduleForm: FormGroup;
  schFormDt : any;
  schdistLst : [any];
  ulbL : [any];
  constructor(private crdsrv: CrudService,private route: Router,public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.ulbs = new FormControl();
    this.dstct = new FormControl();
   
    this.ScheduleForm = new FormGroup({
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
  schdlTrng(){
    this.schFormDt = {
   ulbLst :this.ulbs.value,
   dstctL : this.dstct.value,
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
    const rte = 'web/common/mandalLst/' + this.dstct.value;
    this.crdsrv.getDistLst(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.ulbL = res['data'];
          console.log(this.dstct.value)
        }
      }
    })
    console.log();
  }
reset(){
  this.ulbs = new FormControl();
  this.dstct = new FormControl();
 
  this.ScheduleForm = new FormGroup({
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

}
