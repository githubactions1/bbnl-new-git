import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TutorialDtlDlgComponent } from './tutorial-dtl-dlg/tutorial-dtl-dlg.component';
import { FormGroup } from '@angular/forms';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { dsAnimations } from '@glits/animations';
import { VideoService } from './video-service'
import * as _ from 'lodash';
import { FilterPipe } from '@glits/pipes/filter.pipe';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  animations: dsAnimations,
  providers: [FilterPipe]
})
export class TutorialComponent implements OnInit {
  filterBy: number;
  dprtMntLst: any;
  dprtMntLstBndng: any;
  routerbk: any;
  dialogRef: any;
  rating: number = 3;
  starCount: number = 5;

  ratingArr = []
  catgrylst: any;
  trnLst: any;
  trngsLst: any = [];
  catTrngs: any = [];
  onlineIndicator: number = 0;
  searchTerm: string;
  trn_id: any;
  cln_trndt: any;
  currentCategory:any
  constructor(private apiSrvc: CrudService, private route: Router, private _matDialog: MatDialog, private transfereService: TransfereService,private VideoService:VideoService,private FilterPipe:FilterPipe) {
    this.searchTerm=''
   }

  ngOnInit() {
    this.getTrainings(0);
    this.currentCategory='all'
  }
  getTrainings(id) {
    this.apiSrvc.get('/web/common/trngLst').subscribe((res) => {
      this.trngsLst = res['data']
      this.trngsLst.forEach(tr =>{
       tr.trainings.forEach(t =>{
        if(t.trng_onln_in == this.onlineIndicator){
        this.catTrngs.push(t)
      }
     })
    })
      //this.trngsLst[0]['isActive'] = true;
      console.log(this.trngsLst)
    });
  }

  viewTutorial(data) {

    this.transfereService.setData(data);

    console.log(data)

    this.route.navigate([`/admin/lms/training/assign-training`])
  }
  catgryChangd(id) {
    console.log(id)
    this.trn_id=id
   this.catTrngs=[]
   this.trngsLst.forEach(tr =>{
     if(tr.trng_ctgry_id==id){
      tr.trainings.forEach(t =>{
      if(t.trng_onln_in == this.onlineIndicator){
      this.catTrngs.push(t)
    }
   })
     }else if(id=='all'){
      tr.trainings.forEach(t =>{
        if(t.trng_onln_in == this.onlineIndicator){
        this.catTrngs.push(t)
      }
     })
     }
   })
   console.log(this.catTrngs)
this.cln_trndt=_.cloneDeep(this.catTrngs);
   
  }



  

  viewCourse(data) {

    this.transfereService.setData(data);

    console.log(data)

    this.route.navigate([`/admin/lms/training/crs-dtl`])
  }
  addCourse(edtdata) {
    console.log(edtdata)
    this.VideoService.EditData(edtdata)
    this.route.navigate([`/admin/lms/training/new-training`])

  }
  onTabChanged(e: any) {
    if (e.index == 0) {
      this.catTrngs=[]
      this.onlineIndicator = 0
      this.getTrainings(0);
      this.currentCategory='all'
    } else if (e.index == 1) {
      this.catTrngs=[]
      this.onlineIndicator = 1
      this.getTrainings(0);
          this.currentCategory='all'
    }

  }
  // filterCoursesByTerm(key): void
  // {
  //   //  this.catTrngs = lodash.filter(this.catTrngs, { type: [{ name: `${this.searchTerm}`, present: true }] });
  //   console.log(this.searchTerm);
  //   var type='district'
    
  //     // this.catTrngs = this.FilterPipe.transform(this.catTrngs,this.searchTerm,type)
  //     // console.log(this.catTrngs)

  //     const searchTerm = this.searchTerm.toLowerCase();
  //     console.log(searchTerm)

  //     // Search
      
      
  //     this.cln_trndt=_.cloneDeep(this.catTrngs)
    
  //       this.catTrngs = this.cln_trndt.filter((course) => {
        
  //           return course.trng_nm.toLowerCase().includes(searchTerm);
      
  //         });
      
      
  // }
}





