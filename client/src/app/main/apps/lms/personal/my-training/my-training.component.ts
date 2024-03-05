import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../crud.service';
import { Router } from '@angular/router';
import { TransfereService } from '../../../../../providers/transfer/transfer.service';
@Component({
  selector: 'app-my-training',
  templateUrl: './my-training.component.html',
  styleUrls: ['./my-training.component.scss']
})
export class MyTrainingComponent implements OnInit {
  filterBy;
  dprtMntLst;
  dprtMntLstBndng;
  catTrngs: any = [];
  trngsLst: any = [];
  onlineIndicator: number = 0;
  constructor(private apiSrvc: CrudService,private route: Router,private transfereService: TransfereService) { }

  ngOnInit() {
    this.getTrainings(0);
    this.filterBy=3
  //   this.apiSrvc.get('/web/common/deptlst').subscribe((res) => {
  //   console.log(res)
  //   this.dprtMntLst=res['data']
  //    console.log(this.dprtMntLst)
  //    this.dprtMntLstBndng= this.dprtMntLst.filter(k =>{
  //      if(k.crs_cplt_in==3){
  //        return k
  //      }
  //    })
  //    console.log(this.dprtMntLstBndng)
  // });
  }
  getTrainings(id) {
    this.apiSrvc.get('/web/common/trngLst').subscribe((res) => {
      this.trngsLst = res['data']
      console.log(this.trngsLst)
      this.trngsLst.forEach((i) => {
        i['isActive'] = false;
      })
      this.catTrngs = this.trngsLst[id].trainings.filter((i) => {
        return i.trng_onln_in == this.onlineIndicator
      })
      this.trngsLst[0]['isActive'] = true;
      console.log(this.trngsLst)
    });
  }
  changeFilter(filter): void {
    this.filterBy = filter;
    // //  this.filterBy = filter;
    // //  this._contactsService.onFilterChanged.next(this.filterBy);
    // this.dprtMntLstBndng= this.dprtMntLst.filter(k =>{
    //   if(k.crs_cplt_in==filter){
    //     return k
    //   }
    // })
    // console.log(this.dprtMntLstBndng)


    // console.log(filter)
  
  
  }
 
  viewTutorial() {

    //this.route.navigate([`/admin/lms/courses/course`])
  }
  catgryChangd(id) {
 
    this.trngsLst.forEach((i) => {
      if (i.trng_ctgry_id == id) {
        i['isActive'] = true;
      } else {
        i['isActive'] = false
      }
    })
    this.catTrngs=[]
    for(let i=0;i<this.trngsLst.length;i++){
      if(this.trngsLst[i].trng_ctgry_id == id){
       this.catTrngs.push(this.trngsLst[i])
      }
    }
    console.log(this.catTrngs)
    this.catTrngs = this.catTrngs[0].trainings.filter((i) => {
      return i.trng_onln_in == this.onlineIndicator
    })
  
  }



  

  viewCourse(data) {

    this.transfereService.setData(data);

    console.log(data)

    this.route.navigate([`/admin/lms/training/crs-dtl`])
  }
  test() {
    this.route.navigate([`/admin/lms/training/test`])

  }
  onTabChanged(e: any) {
    if (e.index == 0) {
      this.onlineIndicator = 0
      this.getTrainings(0);
    } else if (e.index == 1) {
      this.onlineIndicator = 1
      this.getTrainings(0);
    }

  }
 

}
