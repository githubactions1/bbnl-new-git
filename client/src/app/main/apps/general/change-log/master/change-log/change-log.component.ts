import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-change-log',
  templateUrl: './change-log.component.html',
  styleUrls: ['./change-log.component.scss']
})
export class ChangeLogComponent implements OnInit {
  slctdCmpntId = 0;
  hdrDta:any;
  loader:boolean;
  constructor(public crdsrv: CrudService) { }
  chnglogData=[];
  ngOnInit() {
    
    this.chngLogLst()
  }
  chngLogLst(){
    this.loader=true;
    const rte = `user/change-log-tmelne/` + this.slctdCmpntId;
    // this.crdsrv.get(rte).subscribe((res) => {
    //   console.log(res['data']);
    //   // this.chnglogData=res['data'];
    //   this.chnglogData.push(_.groupBy(res['data'], 'chng_lg_dt'));
    //   console.log(this.chnglogData)
    //    console.log(JSON.stringify(this.chnglogData))
    //   _.forIn(this.chnglogData, function(value, key) {     
        
    //   });

    // });

    this.crdsrv.get(rte).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false;
        console.log(res);
        this.chnglogData=res['data'];
        let count = 0;
        console.log( this.chnglogData)
       
      }
      
    });


  }
}
