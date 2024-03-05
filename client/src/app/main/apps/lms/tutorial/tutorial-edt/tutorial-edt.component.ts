
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription, concat } from 'rxjs';
import { CrudService } from 'app/main/apps/crud.service';
import { VideoService } from '../video-service'
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { element } from '@angular/core/src/render3';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tutorial-edt',
  templateUrl: './tutorial-edt.component.html',
  styleUrls: ['./tutorial-edt.component.scss']
})
export class TutorialEdtComponent implements OnInit {
  dynamicForm: FormGroup;
  submitted = false;
  counter = 0
  slctCransr = []
  currentVenue: boolean;
  isOnline: boolean;
  catgryLst: any;
  FrmDta: any;
  update: boolean = false;
  sections: any;
  expand = false
  date: any;
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private apiSrvc: CrudService, private VideoService: VideoService, private DatePipe: DatePipe, public snackBar: MatSnackBar) {
    this.VideoService.Editdata.subscribe(item => {
      console.log(item)
      this.FrmDta = item
    })

  }

  ngOnInit() {
    this.date = this.DatePipe.transform(new Date(), "yyyy-MM-dd");
    this.dynamicForm = this.formBuilder.group({
      trng_nm: ['', Validators.required],
      trng_desc: ['', Validators.required],
      trng_st_dt: [this.date, Validators.required],
      trng_end_dt: [this.date, Validators.required],
      trng_ctgry_id: ['', Validators.required],
      trn_online_in: ['', Validators.required],
      sctns: new FormArray([]),

    });


    if (this.FrmDta) {
      this.update = true
      this.getTrainingContent()
    } else {
      this.update = false
    }


    this.apiSrvc.get('/web/common/catgrylst').subscribe((res) => {
      this.catgryLst = res['data']
      console.log(this.catgryLst)
    });

  }

  getTrainingContent() {

    var stDate = this.DatePipe.transform(this.FrmDta.trng_st_dt, "yyyy-MM-dd")
    var endDate = this.DatePipe.transform(this.FrmDta.trng_end_dt, "yyyy-MM-dd")
    console.log(stDate, endDate)
    console.log('hi')
    console.log(this.date)
    if (this.FrmDta.trng_onln_in == 0) {


      this.dynamicForm = this.formBuilder.group({
        trng_nm: [this.FrmDta.trng_nm, Validators.required],
        trng_desc: [this.FrmDta.trng_disc, Validators.required],
        trng_st_dt: [stDate, Validators.required],
        trng_end_dt: [endDate, Validators.required],
        trng_ctgry_id: [this.FrmDta.trng_ctgry_id, Validators.required],
        trn_online_in: [this.FrmDta.trng_onln_in, Validators.required],
        sctns: new FormArray([]),

      });
      // this.dynamicForm.controls['trng_nm'].setValue(this.FrmDta.trng_nm);
      // this.dynamicForm.controls['trng_desc'].setValue(this.FrmDta.trng_disc);
      // this.dynamicForm.controls['trng_st_dt'].setValue(stDate);
      // this.dynamicForm.controls['trng_end_dt'].setValue(this.DatePipe.transform(this.FrmDta.trng_end_dt, 'dd-MM-yyyy'));
      // this.dynamicForm.controls['trng_ctgry_id'].setValue(this.FrmDta.trng_ctgry_id, Validators.required);
      // this.dynamicForm.controls['trn_online_in'].setValue(this.FrmDta.trng_onln_in, Validators.required);
      this.onTypeChange(this.FrmDta.trng_onln_in)
    } else if (this.FrmDta.trng_onln_in == 1) {
      this.apiSrvc.get('/web/common/trngCntnt/' + this.FrmDta.trng_id).subscribe((res) => {
        this.sections = res['data'][0].sections;
        console.log(this.sections)
        var stDate = this.DatePipe.transform(this.FrmDta.trng_st_dt, "yyyy-MM-dd")
        var endDate = this.DatePipe.transform(this.FrmDta.trng_end_dt, "yyyy-MM-dd")
        this.dynamicForm.controls['trng_nm'].setValue(this.FrmDta.trng_nm);
        this.dynamicForm.controls['trng_desc'].setValue(this.FrmDta.trng_disc);
        this.dynamicForm.controls['trng_st_dt'].setValue(stDate);
        this.dynamicForm.controls['trng_end_dt'].setValue(endDate);
        this.dynamicForm.controls['trng_ctgry_id'].setValue(this.FrmDta.trng_ctgry_id, Validators.required);
        this.dynamicForm.controls['trn_online_in'].setValue(this.FrmDta.trng_onln_in, Validators.required);
        this.onTypeChange(this.FrmDta.trng_onln_in)
        this.UpdatVideo()
      });
    }


  }


  getControls() {
    return (this.t.get('controlName') as FormArray).controls;
  }


  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.sctns as FormArray; }

  // upDateSection() {
  //   var vides
  //   this.currentVenue = true;
  //   this.expand = true
  //   this.sections.forEach(elment => {

  //     this.t.push(this.formBuilder.group({
  //       sctn_nm: [elment.sctn_nm, Validators.required],
  //       sctn_desc: [elment.sctn_desc, Validators.required],
  //       vids: new FormArray([]),
  //       tests: new FormArray([])
  //     }));


  //   })
  //    this.UpdatVideo()

  // }
  addSection() {
    this.currentVenue = true;
    this.t.push(this.formBuilder.group({
      sctn_nm: ['Section Name', Validators.required],
      sctn_desc: ['Section Description', Validators.required],
      vids: new FormArray([]),
      tests: new FormArray([])
    }));

  }
  deleteSection(index) {
    console.log(this.t)
    console.log(index)
    this.t.removeAt(index);
    console.log(this.t)
  }

  onSubmit() {
    console.log("test")
    this.submitted = true;
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
    console.log(this.dynamicForm.value)
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    // this.t.clear();
  }
  ondelte(index) {
    console.log(index)
    this.t.removeAt(index);
    console.log(this.t.value)

  }

  UpdatVideo() {
    this.currentVenue = true;
    this.expand = true
    console.log("Videos")
    var contl
    var videos
    // this.sections.forEach(elment => {
    //   elment.videos.forEach(v =>{
    //     if(elment.sctn_id == v.sctn_id){
    //      this.t.controls.forEach(k => {
    //         contl=k.get('vids') as FormArray
    //           contl.push(this.formBuilder.group({
    //            vid_url: [v.vid_url, Validators.required],
    //            vid_nm: [v.vid_nm, Validators.required]
    //            // tests: new FormArray([]),
    //          }));
    //        })
    //       }
    //   })
    // })
    this.sections.forEach(elment => {

      let vids = new FormArray([]);
      let tests = new FormArray([]);
      elment.videos.forEach(v => {
        vids.push(this.formBuilder.group({
          vid_url: [v.vid_url, Validators.required],
          vid_nm: [v.vid_nm, Validators.required]

        }));
      });

      elment.tests.forEach(t => {
        let qstns = new FormArray([]);
        t.qtns.forEach(q => {
          let answers = new FormArray([])
          answers.push(this.formBuilder.group({
            id: [1, Validators.required],
            option: ['option1', Validators.required]
          }));
          answers.push(this.formBuilder.group({
            id: [2, Validators.required],
            option: ['option2', Validators.required]
          }));
          answers.push(this.formBuilder.group({
            id: [3, Validators.required],
            option: ['option3', Validators.required]
          }));
          answers.push(this.formBuilder.group({
             id: [4, Validators.required],
            option: ['option4', Validators.required]
          }));

          qstns.push(this.formBuilder.group({
            qution_id: [1],
            qstn_nm: [q.qstn_nm, Validators.required],
            opt_1: [q.opt_1, Validators.required],
            opt_2: [q.opt_2, Validators.required],
            opt_3: [q.opt_3, Validators.required],
            opt_4: [q.opt_4, Validators.required],
            crct_opt: ['option' + q.crct_opt, Validators.required],
            answers: answers
          }));
        })

        tests.push(this.formBuilder.group({
          test_nm: ["v.vid_url", Validators.required],
          test_desc: [t.test_desc, Validators.required],
          qstns: qstns
        }));

      });


      console.log(vids)


      this.t.push(this.formBuilder.group({
        sctn_id: [elment.sctn_id, Validators.required],
        sctn_nm: [elment.sctn_nm, Validators.required],
        sctn_desc: [elment.sctn_desc, Validators.required],
        vids: vids,
        tests: tests
      }));
    })

    // this.t.controls.forEach(vid =>{

    //   vid.controls.vids.push(this.formBuilder.group({
    //     vid_url: ['', Validators.required],
    //     vid_nm: ['', Validators.required]
    //     // tests: new FormArray([]),

    //   }));
    // })
  }

  addVideo(sections,index) {
    
    sections.controls.vids.push(this.formBuilder.group({
      vid_url: ['', Validators.required],
      vid_nm: ['', Validators.required],
      vid_dur: ['', Validators.required]
      // tests: new FormArray([]),

    }));
    setTimeout(() =>{
      document.getElementById(index+1+''+sections.controls.vids.length).scrollIntoView()
    },1)
   
  }
  deletevideo(cn,index){
    
    console.log(index)
    console.log(cn)
    cn.controls.vids.removeAt(index);
  }


  addTest(sections) {

    sections.controls.tests.push(this.formBuilder.group({
      test_nm: ['Test Name', Validators.required],
      test_desc: ['Test Description', Validators.required],
      qstns: new FormArray([])
    }));

    console.log(sections)
  }
  deletetest(cn,index){
    console.log(index)
    console.log(cn)
    cn.controls.tests.removeAt(index);
  }
  addQuestion(t) {
    console.log(t)
    t.controls.qstns.push(this.formBuilder.group({
      qution_id: [++this.counter],
      qstn_nm: ['', Validators.required],
      opt_1: ['', Validators.required],
      opt_2: ['', Validators.required],
      opt_3: ['', Validators.required],
      opt_4: ['', Validators.required],
      crct_opt: ['', Validators.required],
      answers: new FormArray([])
    }));


  }
  onChangeInpt(sections, optin, index) {
    let isExists = false;
    if (sections.controls.answers.controls.length == 0) {
      sections.controls.answers.push(this.formBuilder.group({
        id: [index, Validators.required],
        option: [optin, Validators.required]
      }));
    } else {
      for (let i = 0; i < sections.controls.answers.controls.length; i++) {
        console.log(optin != sections.controls.answers.controls[i].controls.option.value)
        if (optin == sections.controls.answers.controls[i].controls.option.value) {
          isExists = true;
        }

      }
      if (!isExists) {
        sections.controls.answers.push(this.formBuilder.group({
          id: [index, Validators.required],
          option: [optin, Validators.required]
        }));
      }

    }


  }
  onTypeChange(e: any) {
    console.log(e)

    if (e.value == 1 || e == 1) {
      this.isOnline = true;
    } else {
      this.isOnline = false;
    }
  }
  saveTraining() {
    let trngData = this.dynamicForm.value;

    trngData["trng_st_dt"] = this.DatePipe.transform(this.dynamicForm.value.trng_st_dt, "yyyy-MM-dd");
    trngData["trng_end_dt"] = this.DatePipe.transform(this.dynamicForm.value.trng_end_dt, "yyyy-MM-dd");

    const rte = 'web/common/addTrng';
    console.log(trngData)
    this.apiSrvc.create(trngData, rte).subscribe((res) => {
      console.log(res)
      if (res['status'] == 200) {
        this.snackBar.open("training Sucessfully Added", 'End now', {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "top",
        });

      }
    })

  }
 
  onChange(q,crtans){
    console.log(q,crtans)
  //  q.get('mySelectControl').valueChanges.subscribe(value => {
  //    console.log(value)
  //   })
  }
  updateTrng() {
    let trngData = this.dynamicForm.value;
    // trngData["trng_st_dt"] = "16-12-2019";
    // trngData["trng_end_dt"] = "16-12-2019";
    console.log(trngData)
    const rte = 'web/common/updtTrng/' + this.FrmDta.trng_id;
    console.log(trngData)
    // this.apiSrvc.update(trngData, rte).subscribe((res) => {
    //   console.log(res)
    //   if (res['status'] == 200) {
    //     this.snackBar.open("Course Sucessfully Added", 'End now', {
    //       duration: 2000,
    //       horizontalPosition: "center",
    //       verticalPosition: "bottom",
    //     });

    //   }
    // })

  }
  convert_time(duration) {
    let a = duration.match(/\d+/g);

    if (duration.indexOf('M') >= 0 && duration.indexOf('H') == -1 && duration.indexOf('S') == -1) {
      a = [0, a[0], 0];
    }

    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1) {
      a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') == -1 && duration.indexOf('S') == -1) {
      a = [a[0], 0, 0];
    }

    duration = 0;

    if (a.length == 3) {
      duration = duration + parseInt(a[0]) * 3600;
      duration = duration + parseInt(a[1]) * 60;
      duration = duration + parseInt(a[2]);
    }

    if (a.length == 2) {
      duration = duration + parseInt(a[0]) * 60;
      duration = duration + parseInt(a[1]);
    }

    if (a.length == 1) {
      duration = duration + parseInt(a[0]);
    }
    const formatted = moment.utc(duration * 1000).format('HH:mm:ss');
    return formatted;

  }
  getDuration(e: any, c: any) {
    // console.log(e.target.value)
    console.log(c)
    if( e.target.value.length > 0){
      var video_id = e.target.value.split('v=')[1];
      var ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      this.httpClient.get('https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + video_id + '&key=AIzaSyCfoLMTXlr1RqIIjXxwWSBYymU4R1Ci6wE').subscribe((res) => {
       
        c.controls.vid_dur.setValue(this.convert_time(res['items'][0].contentDetails.duration))
  
      });
    }
    }
  
}