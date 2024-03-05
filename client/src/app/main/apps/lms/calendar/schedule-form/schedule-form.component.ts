import { Component, OnInit, Inject } from '@angular/core';
import { MatRadioChange, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CrudService } from 'app/main/apps/crud.service';
// import { DialogData } from 'app/main/apps/general/setup/change-log-modal/change-log-modal.component';
import { Router } from '@angular/router';
import { District, Mandal, Sachivalayam } from '../../models';
import { TransfereService } from 'app/providers/transfer/transfer.service';
@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.scss']
})
export class ScheduleFormComponent implements OnInit {

  ulbs: any;
  dstct: any;
  svcm: any;
  dept: any;
  scdlForm: FormGroup;
  schFormDt: any;
  usrLst: any = [];
  ulbL: any = [];
  svcml:any= [];
  date: any;
  trnrLst: any = [];
  dptLst: any = [];
  svmLst: any = [];
  trngsLst: any = [];
  offlnTrngs: any = [];
  districts: District[] = [];
  mandals: Mandal[] = [];
  sachivalayams: Sachivalayam[] = [];
  showSvmSpinner: boolean = false;
  showUlbSpinner: boolean = false;
  throttle = 150;
  svmCount = 10;
  svmPag = [];
  scrollDistance = 2;
  scrollUpDistance = 2;
  direction = '';
  selectedDistIds: any = [];
  selectedUlbIds: any = [];
  selectedSvmIds: any = [];
  selectedDptIds: any = [];
  showEmpSpinner: boolean;
  empLst: any = [];
  empCount: any = 50;
  empPag: any = [];
  selectedEmps: any = [];
  vnuLst: any = [];
  selectedTrnr: any = [];
  selectedVnu: any = [];
  selectedUsr: any =[];
  searchDst =''
  searchUlb =''
  searchVnu=''
  getdata = this.transfereService.getData();
  constructor(private datePipe: DatePipe, private crdsrv: CrudService, private route: Router, public snackBar: MatSnackBar, private transfereService: TransfereService) {

  }

  ngOnInit() {
    console.log(this.getdata)
    this.date = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.ulbs = new FormControl();
    this.dstct = new FormControl();
    this.svcm = new FormControl();
    this.dept = new FormControl();
    this.scdlForm = new FormGroup({
      trng_nm: new FormControl(this.getdata.trng_nm, Validators.required),
      batch_nm:new FormControl('', Validators.required),
      trng_id: new FormControl(this.getdata.trng_id, Validators.required),
      assign_id: new FormControl(this.getdata.Assign_id, Validators.required),
      SchDatestart: new FormControl(this.date, Validators.required),
      SchDateend: new FormControl(this.date, Validators.required)
    })
    this.getAssignedUsers();
    this.getTrainers();
    this.getVenues();
    this.getTrainings();
  }
 
  getTrainings() {
    this.crdsrv.get('/web/common/trngLst').subscribe((res) => {
      this.trngsLst = res['data']
      console.log(this.trngsLst)
      this.trngsLst.forEach((i) => {
        i.trainings.forEach((t) => {
          if (t.trng_onln_in == 0) {
            this.offlnTrngs.push(t)
          }
        })
      })

    });
  }
  getVenues() {
    const rte = 'web/common/trngVnuLst/'
    this.crdsrv.get(rte).subscribe(res => {
      console.log(res)
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.vnuLst = res['data'];
          this.vnuLst.forEach(element => {
            element['isSelected'] = false;
          });
          console.log(this.vnuLst)
        }
      }
    })
  }
  getAssignedUsers() {
    const rte = 'web/common/assgndUsrLst';
    this.crdsrv.create({assgnId:this.getdata.Assign_id},rte).subscribe(res => {
      console.log(res);
      console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.usrLst = res['data'];
          this.usrLst.forEach(element => {
            element['isSelected'] = false;
          });
        }
      }
    })
  }
  getTrainers() {
    //this.showUlbSpinner = true;
    const rte = 'web/common/trnrLst';
    this.crdsrv.get(rte).subscribe(res => {
      
      if (res['status'] == 200) {
       
        if (res['data'].length > 0) {
        
          let trnrs = res['data'];
          trnrs.forEach((item) => {
            item['isSelected'] = false;
          })
          this.trnrLst = trnrs;

        }
      }
    })
    console.log(this.trnrLst)
  }
  

 
  checkUsr(e: any, d: any) {
    this.usrLst.forEach((item) => {
      if (item.usr_id == d.usr_id) {
        if (e.checked) {
          item.isSelected = true;
          this.selectedUsr.push({usr_id:item.usr_id})
        } else {
          item.isSelected = false;
          let usrIndex = this.selectedUsr.findIndex(
            u => u === d.usr_id
          );
          if (usrIndex !== -1) {
            this.selectedUsr.splice(usrIndex, 1)
          }

        }
      }
    })
  }
  checkVnu(e:any,d:any){
    this.vnuLst.forEach((item) => {
      if (item.trng_vnu_id == d.trng_vnu_id) {
        if (e.checked) {
          item.isSelected = true;
          this.selectedVnu.push(item.trng_vnu_id)
        } else {
          item.isSelected = false;
          let vnuIndex = this.selectedVnu.findIndex(
            v => v === d.trng_vnu_id
          );
          if (vnuIndex !== -1) {
            this.selectedVnu.splice(vnuIndex, 1)
          }

        }
      }
    })
   
  }
  checkTrnr(e: any, d: any) {
    this.trnrLst.forEach((item) => {
      if (item.trnr_id == d.trnr_id) {
        if (e.checked) {
          item.isSelected = true;
          this.selectedTrnr.push(item.trnr_id)
        } else {
          item.isSelected = false;
          let trnrIndex = this.selectedTrnr.findIndex(
            dpt => dpt === d.trnr_id
          );
          if (trnrIndex !== -1) {
            this.selectedTrnr.splice(trnrIndex, 1)
          }

        }
      }
    })
   
  }

  checkAll(e: any, d: any) {
   if (d == 'users') {
      this.selectedUsr = []
      if (e.checked) {

        this.usrLst.forEach((item) => {
          item.isSelected = true;
          this.selectedUsr.push(
            {usr_id:item.usr_id})

        })

      }

      this.usrLst.forEach((item) => {
        if (e.checked) {

          item.isSelected = true;
        }
        else {

          item.isSelected = false;
        }

      })
    }
    else if (d == 'trainer') {
      this.selectedTrnr = []
      if (e.checked) {

        this.trnrLst.forEach((item) => {
          item.isSelected = true;
          this.selectedTrnr.push(item.trnr_id)

        })

      }

      this.trnrLst.forEach((item) => {
        if (e.checked) {

          item.isSelected = true;
        }
        else {

          item.isSelected = false;
        }

      })
     
    }
    else if (d == 'venue') {
      this.selectedVnu = []
      if (e.checked) {

        this.vnuLst.forEach((item) => {
          item.isSelected = true;
          this.selectedVnu.push(item.trng_vnu_id)

        })

      }

      this.vnuLst.forEach((item) => {
        if (e.checked) {

          item.isSelected = true;
        }
        else {

          item.isSelected = false;
        }

      })
     
    }
  }

  schdlTrng() {
    // this.schFormDt = {
    //   ulbLst: this.ulbs.value,
    //   dstctL: this.dstct.value,
    //   svm: this.svcm.value,
    //   dpt: this.dept.value,
    //   SchData: this.scdlForm.value
    // }

    // console.log(this.schFormDt);
    // console.log(this.schFormDt.SchData);
    // const rte = 'web/common/crsform';
    // this.crdsrv.create(this.schFormDt, rte).subscribe((res) => {
    //   console.log(res)

    //   if (res['status'] == 200) {
    //     this.snackBar.open("Course Sucessfully Added", 'End now', {
    //       duration: 2000,
    //       horizontalPosition: "center",
    //       verticalPosition: "bottom",
    //     });

    //   }
    //   //this.courseForm.reset();

    // }, (error) => {
    //   console.log(error)
    // })
    let data = this.scdlForm.value;
    data['usrs'] = this.selectedUsr;
    data['trnr_id'] = this.selectedTrnr[0]
    data['vnu_id'] = this.selectedVnu[0]

   const rte = 'web/common/insschdl/';
   this.crdsrv.create(data, rte).subscribe(res => {
     if (res['status'] == 200) {
       this.snackBar.open("Schedule Sucessfully Added", 'End now', {
         duration: 2000,
         horizontalPosition: "center",
         verticalPosition: "bottom",
       });
      this.resetFields()
     }
     console.log(res)
   })
    console.log(this.scdlForm.value)
    console.log(this.selectedUsr)
    console.log(this.selectedVnu)
    console.log(this.selectedTrnr)

  }

  resetFields() {
  
  }

}
