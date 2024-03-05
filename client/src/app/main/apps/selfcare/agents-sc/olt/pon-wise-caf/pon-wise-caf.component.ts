import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/providers/user/user.serivce';


@Component({
  selector: 'app-pon-wise-caf',
  templateUrl: './pon-wise-caf.component.html',
  styleUrls: ['./pon-wise-caf.component.scss']
})
export class PonWiseCafComponent implements OnInit {
  lmocd: any;
  agnt_id: any;
  constructor(private userService: UserService) { 
    this.userService.USER_DETAILS.subscribe(val => {
      if (val.usr_ctgry_id == 8) // LMO
      {
        this.lmocd = val.lmo_cd
        this.agnt_id = val.usr_ctgry_ky
        console.log(this.agnt_id);
        console.log(this.lmocd);
        console.log(val);

      }
    });
  }

  ngOnInit() {
  }

}
