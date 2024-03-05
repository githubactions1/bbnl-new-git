import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { TransfereService } from 'app/providers/transfer/transfer.service';


@Component({
  selector: 'app-trnersubmtnform',
  templateUrl: './trnersubmtnform.component.html',
  styleUrls: ['./trnersubmtnform.component.scss']
})
export class TrnersubmtnformComponent implements OnInit {
  schdistLst: any;
  ScheduleForm: FormGroup;
  date: any;
  data:any=[]
  getdata = this.transfereService.getData();
  constructor(private datePipe: DatePipe,private crdsrv: CrudService,public snackBar: MatSnackBar, private transfereService: TransfereService) { }

  ngOnInit() {
    this.date = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.ScheduleForm = new FormGroup({
       SchDatestart: new FormControl(this.date, Validators.required),
       SchDateend: new FormControl(this.date, Validators.required),
       atn_mbrs:new FormControl('', Validators.required),
     })
    this.trngdata()
    console.log(this.getdata)

  }
  trngdata() {
    const rte = 'web/common/trngdata';
    this.crdsrv.get(rte).subscribe(res => {
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
  schdlTrng() {
    this.data.push({
      trng_id:this.schdistLst[0].trng_id,
      act_st_dt:this.ScheduleForm.value.SchDatestart,
      act_end_dt:this.ScheduleForm.value.SchDateend,
      schdl_id:this.schdistLst[0].schdl_id,

    })
    console.log(this.data)
    const rte = 'web/common/subform';
    this.crdsrv.create(this.data, rte).subscribe((res) => {
     console.log(res)
   
     if (res['status'] == 200) {
       this.snackBar.open("Course Sucessfully Added", 'End now', {
         duration: 2000,
         horizontalPosition: "center",
         verticalPosition: "bottom",
       });
      
     }
    //this.ScheduleForm.reset();
    
   }, (error) => {
     console.log(error)
   })

  }

}
