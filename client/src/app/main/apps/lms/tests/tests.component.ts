import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { count } from 'rxjs/operators';
import { VideoService } from '../tutorial/video-service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})

export class TestsComponent implements OnInit {

  testform: FormGroup;
  submited: boolean = false
  count
  results = [];
  elmDta: any;
  testArray: any;
  questions: any = [];
  testItem: any;
  isSubmitted: boolean;
  score: number;
  rtrybtn: boolean=false;
  itm: any;
  constructor(private fb: FormBuilder, private VideoService: VideoService) {
    // this.testform = this.fb.group({});

  }
  get t() { return this.f.qtns as FormArray; }
  get f() { return this.testform.controls; }
  ngOnInit() {
    this.VideoService.testArray.subscribe(item => {
         this.itm=item
      this.testform = this.fb.group({
        qtns: new FormArray([]),
      });
      this.isSubmitted =false;
      this.testItem = item;
      this.testArray = item.test;
      this.questions = item.test;
      this.testArray.forEach(q => {
        this.t.push(this.fb.group({
          qstn_id: [q.qstn_id],
          qstn_nm: [q.qstn_nm],
          opt_1: [q.opt_1],
          opt_2: [q.opt_2],
          opt_3: [q.opt_3],
          opt_4: [q.opt_4],
          ans: ['', Validators.required],
          crct_ans: [false],
          crct_optn: []
        }));
      })

    }
    )

  }
  submit() {
    this.rtrybtn = true
    this.isSubmitted = true;
    this.score = 0
    this.results = []
    this.submited = true
    let tstfrm = this.testform.value
    for (let i = 0; i < this.testArray.length; i++) {
      if (tstfrm.qtns[i].ans == this.testArray[i].crct_opt) {
        this.t.controls[i].get('crct_ans').setValue(true)
        tstfrm.qtns[i].crct_ans = true;
        this.score++;
      }
    }


  }

  retry(){
    this.rtrybtn = false
    console.log('hi')
    this.itm
    this.testform = this.fb.group({
      qtns: new FormArray([]),
    });
    this.isSubmitted =false;
    this.testItem = this.itm;
    this.testArray = this.itm.test;
    this.questions = this.itm.test;
    this.testArray.forEach(q => {
      this.t.push(this.fb.group({
        qstn_id: [q.qstn_id],
        qstn_nm: [q.qstn_nm],
        opt_1: [q.opt_1],
        opt_2: [q.opt_2],
        opt_3: [q.opt_3],
        opt_4: [q.opt_4],
        ans: ['', Validators.required],
        crct_ans: [false],
        crct_optn: []
      }));
    })

  }

}
