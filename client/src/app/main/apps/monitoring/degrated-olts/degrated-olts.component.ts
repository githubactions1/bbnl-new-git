import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-degrated-olts',
  templateUrl: './degrated-olts.component.html',
  styleUrls: ['./degrated-olts.component.scss']
})
export class DegratedOltsComponent implements OnInit {
  countriesInfo: any;
  energySources: any;
  customers: any;
  permissions;
  DistrctWiseOltDt;
  notoperatindata;
  getHeaderDtls = function () { return { 'title': 'Degraded OLTS', 'icon': 'people' }; };
  constructor(public crdSrvc: CrudService) {
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };

   }



  ngOnInit() {
    this.getDistrctWiseOlts()


  }
  getDistrctWiseOlts(){
    var districtID=0;
    var mandalID=0;
    var oltID=0;
    let rte1 = `dashbrd/distrctWseOlts/notoperational/${districtID}/${mandalID}/${oltID}`
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      for(let i=0;i<res['data'].length;i++){
          res['data'][i]['sno']=i + 1;
          if(res['data'][i].oprtnl_ste_id!=1){
          if(res['data'][i].hr<1){
            res['data'][i].hr = '<1'
          }
          else if(res['data'][i].hr<3
 && res['data'][i].hr>1){
            res['data'][i].hr = '<3'
          }
          else if(res['data'][i].hr>= 12 && res['data'][i].hr< 24){
            res['data'][i].hr = '>12'
          }
          else if(res['data'][i].hr>= 24){
            res['data'][i].hr = '>24'
          }
        }
      }
      this.DistrctWiseOltDt = res['data']
      this.getinactiveolts()
    })
  }
  getinactiveolts(){
    console.log("not active")
    this.notoperatindata=[];
    for(let i=0; i<this.DistrctWiseOltDt.length;i++){
      // if(this.DistrctWiseOltDt[i].ste_nm=="Down" || this.DistrctWiseOltDt[i].ste_nm=="Degraded" || this.DistrctWiseOltDt[i].ste_nm=="Not Operational"){
      //   this.notoperatindata.push(this.DistrctWiseOltDt[i])
      // }
      if(this.DistrctWiseOltDt[i].ste_nm=="Degraded"){
        this.notoperatindata.push(this.DistrctWiseOltDt[i])
      }
    }
    console.log(this.notoperatindata)
  }
}
