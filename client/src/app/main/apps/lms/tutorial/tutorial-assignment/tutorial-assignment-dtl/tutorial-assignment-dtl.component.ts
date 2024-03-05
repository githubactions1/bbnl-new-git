import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-tutorial-assignment-dtl',
  templateUrl: './tutorial-assignment-dtl.component.html',
  styleUrls: ['./tutorial-assignment-dtl.component.scss']
})
export class TutorialAssignmentDtlComponent implements OnInit {
  assignLst: any;

  constructor(private crdsrv: CrudService, private transfereService: TransfereService, private route: Router) { }

  ngOnInit() {
    const rte = 'web/common/assignLst'
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res)
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.assignLst = res['data'];
          this.assignLst.forEach(element => {
            element['isSelected'] = false;
          });
          console.log(this.assignLst)
        }
      }
    })
  }
  schedule(data){
    console.log(data)
    this.transfereService.setData(data);

    this.route.navigate([`admin/lms/schedule`]) 
}

}
