import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { TransfereService } from 'app/providers/transfer/transfer.service';
@Component({
  selector: 'app-trainer-edt',
  templateUrl: './trainer-edt.component.html',
  styleUrls: ['./trainer-edt.component.scss']
})
export class TrainerEdtComponent implements OnInit {
  ulbs : any;
  dstct : any;
  ScheduleForm: FormGroup;
  schFormDt : any;
  distlst : [any];
  ulbL : [any];
  svm:[any];
  dptl:[any]
  dpt: any;
  svms: any;
  Imgsrc: any;
  img = [];
  curDate: Date;
  shwImgView: boolean =false;
  shwsrcimg: any;
  edit: boolean =false;
  data = this.transfereService.getData(); 
  constructor(private crdsrv: CrudService,private route: Router,public snackBar: MatSnackBar,private transfereService:TransfereService,private fb: FormBuilder) { }

  ngOnInit() {
 
    
    if(!this.data){
    this.ScheduleForm = new FormGroup({
      trnrnm: new FormControl(null, Validators.required),
      radio1: new FormControl(null, Validators.required),
      ulbs : new FormControl('', Validators.required),
      dstct :new FormControl('', Validators.required),
      svms : new FormControl('', Validators.required),
      dpt : new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      Email:new FormControl('', Validators.required),
    })
  }
    this.dsrtcLst();
    console.log(this.data)
  
    if(this.data){
      this.edit= true
      // this.ScheduleForm.controls['trnrnm'].setValue(this.data.trnr_nm)
      // console.log(this.data.dstrt_id)
      // this.ScheduleForm.controls['dstct'].setValue(this.data.dstrt_id)
      // this.ScheduleForm.controls['dpt'].setValue(this.data.dprt_id)
      // this.ScheduleForm.controls['ulbs'].setValue(this.data.mndl_id)
      // this.ScheduleForm.controls['radio1'].setValue(this.data.trnr_mstr_in)
     
      console.log("hai")
      this.ScheduleForm = new FormGroup({
        trnrnm: new FormControl(this.data.trnr_nm, Validators.required),
        radio1: new FormControl(this.data.trnr_mstr_in, Validators.required),
        ulbs : new FormControl(this.data.mndl_id, Validators.required),
        dstct :new FormControl(this.data.dstrt_id, Validators.required),
        svms : new FormControl(this.data.trnr_svm_id, Validators.required),
        dpt : new FormControl(this.data.dprt_id, Validators.required),
        number: new FormControl(this.data.trnr_mbl_num, Validators.required),
        Email:new FormControl(this.data.trnr_email_id, Validators.required),
      })
      this.ulbLst(this.data.dstrt_id)
      this.svmlst(this.data.mndl_id)
      this.shwImgView = true;
      this.shwsrcimg = this.data.trnr_img_url
    }
    console.log(this.edit)
  }
  schdlTrng(){
    console.log(this.img)
    this.schFormDt = {
   ulbLst :this.ScheduleForm.value.ulbs,
   dstctL : this.ScheduleForm.value.dstct,
   dptlst: this.ScheduleForm.value.dpt,
   svmlst:this.ScheduleForm.value.svms,
   img_url:this.shwsrcimg,
   trnrnm:this.ScheduleForm.value.trnrnm,
   radio1: this.ScheduleForm.value.radio1,
   number:this.ScheduleForm.value.number,
   Email:this.ScheduleForm.value.Email,
   }
   
   console.log(this.ScheduleForm.value);

   const rte = 'web/common/trainerfrm';
   this.crdsrv.create(this.schFormDt, rte).subscribe((res) => {
    console.log(res)
  
    if (res['status'] == 200) {
      this.snackBar.open("trainer Sucessfully Added", 'End now', {
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
          this.distlst = res['data'];
          console.log(this.distlst)
        }
      }
    })
    const rtetwo = 'web/common/dprtLst/';
    this.crdsrv.getDistLst(rtetwo).subscribe(res => {
      
      console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.dptl = res['data'];
          console.log(this.dptl)
        }
      }
    })
    
  }
  ulbLst(event){
    console.log(event)
    const rte = 'web/common/mandalLst/' +event;
    this.crdsrv.getDistLst(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.ulbL = res['data'];
          
        }
      }
    })
    console.log();
  }
  svmlst(event){
    
    const rte = `web/common/svmLst/`+ event;
    
    this.crdsrv.get(rte).subscribe((res) => {
      this.svm = res['data'];
      console.log('_________')
      console.log(res['data']); 
    }, (error) => {

    });


  }
reset(){
 
  this.ScheduleForm = new FormGroup({
    trnrnm: new FormControl('', Validators.required),
    radio1: new FormControl('', Validators.required),
    ulbs : new FormControl('', Validators.required),
    dstct :new FormControl('', Validators.required),
    svms : new FormControl('', Validators.required),
    dpt : new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    Email:new FormControl('', Validators.required),
  })
  this.ScheduleForm.markAsPristine();
this.ScheduleForm.markAsUntouched();
this.shwsrcimg=[]

}
preview(files) {
  console.log(files);
  this.curDate = new Date();
    if (files.length === 0)
      return;
       console.log("h")
      for (let i = 0; i < files.length; i++) {
        var mimeType = files[i].type;
        var reader = new FileReader();
        
        reader.readAsDataURL(files[i]);
        reader.onload = (_event: any) => {
          this.Imgsrc = _event.target.result;
          this.img =[]
          this.img.push({
            'atcht_pth_tx': this.Imgsrc,         
          })
          console.log(this.img);
          this.shwImgView = true;
          this.shwsrcimg =this.img[0].atcht_pth_tx
         
        }
       
      }
     

    
}
  back(){
    console.log("hai")
    // this.route.navigate([`/admin/lms/calendar`])
  }
  update(){
    console.log(this.img.length)
    if(this.img.length==0){
      this.schFormDt = {
        ulbLst :this.ScheduleForm.value.ulbs,
        dstctL : this.ScheduleForm.value.dstct,
        dptlst: this.ScheduleForm.value.dpt,
        svmlst:this.ScheduleForm.value.svms,
        img_data:"",
        img_url:this.shwsrcimg,
        trnrnm:this.ScheduleForm.value.trnrnm,
        radio1: this.ScheduleForm.value.radio1,
        number:this.ScheduleForm.value.number,
        Email:this.ScheduleForm.value.Email,
        id:this.data.trnr_id,
        }
    }
    else{
      
    this.schFormDt = {
      ulbLst :this.ScheduleForm.value.ulbs,
      dstctL : this.ScheduleForm.value.dstct,
      dptlst: this.ScheduleForm.value.dpt,
      svmlst:this.ScheduleForm.value.svms,
      img_url:this.shwsrcimg,
      img_data:this.img[0].atcht_pth_tx,
      trnrnm:this.ScheduleForm.value.trnrnm,
      radio1: this.ScheduleForm.value.radio1,
      number:this.ScheduleForm.value.number,
      Email:this.ScheduleForm.value.Email,
      id:this.data.trnr_id,
      }
    }
      console.log(this.schFormDt.img_url.length);
      const rte = 'web/common/trnrdtls';
      this.crdsrv.create(this.schFormDt, rte).subscribe((res) => {
       console.log(res)
     
       if (res['status'] == 200) {
         this.snackBar.open("trainer Sucessfully updated", 'End now', {
           duration: 2000,
           horizontalPosition: "center",
           verticalPosition: "top",
         });
        
       }
      //this.ScheduleForm.reset();
      
     }, (error) => {
       console.log(error)
     })

  }

}
