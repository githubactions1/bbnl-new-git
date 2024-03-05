import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'app-ticket-request-form',
  templateUrl: './ticket-request-form.component.html',
  styleUrls: ['./ticket-request-form.component.scss']
})
export class TicketRequestFormComponent implements OnInit {
  ticketFormGroup: FormGroup;
  getHeaderDtls = function () { return { "title": 'New Ticket', "icon": "people_outline" } }
  priorityLst;
  cateogryLst;
  teamLst;
  // statusLst;
  typeLst;
  userLst;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  fileUploaded: any;
  upldFileNm: any;
  // uploadedFiles: Array < File > ;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  attach_image: {};
  backBtn;

  constructor(public router: Router, public fb: FormBuilder, private crdsrv: CrudService,private snackBar: MatSnackBar,) { }

  ngOnInit() {
    const phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    this.ticketFormGroup = this.fb.group({
      cstmr_nm: new FormControl('', Validators.required),
      req_usr_mbl: new FormControl('', Validators.pattern(phoneNumber)),
      ctgry: new FormControl('', Validators.required),
      prty: new FormControl('', Validators.required),
      team: new FormControl('', Validators.required),
      asgn_usr: new FormControl(''),
      // status: new FormControl('',Validators.required),
      caf_id: new FormControl(''),
      type: new FormControl('',Validators.required),
      desc: new FormControl('', Validators.required),
      app_icon: new FormControl(''),
    });
    this.getPriority();
    this.getCateogry();
    this.getTeam();
    // this.getStatus();
    this.getType();
    
  }
  uploadedFile(event) {
    console.log(event)
    // console.log("Called")
    // this.fileUploaded = event.target.files[0];
    // this.upldFileNm = this.fileUploaded.name;
    let reader = new FileReader();
  let file = event.target.files[0];
  console.log(file);
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);
    reader.onload  = (_event: any) => {
      this.imageUrl = _event.target.result;
      this.imgfilename = event.target.files[0].name
      console.log(this.imageUrl)
      console.log(this.imgfilename)
      let img ={}
      img ={
        base64: this.imageUrl,
        file_name: this.imgfilename
      }
      this.attach_image = img
      // this.ticketFormGroup.patchValue({
      //   app_icon: reader.result
      // });
      console.log('______________________________');
    }
  }
    // this.readExcel();
    // this.shwrcds = true;
    // this.lmoSlctd = true;
  }
  removeImg(){
    this.imageUrl = '';
    this.imgfilename = '';
    this.ticketFormGroup.patchValue({
      app_icon: ''
    });
  }
  saveTicket(): any {
    console.log("new");
    if(this.attach_image != undefined || "" ){
      this.attach_image = this.attach_image
    } else{
      let img1 = {}
      img1 = {
        base64: this.imageUrl,
        file_name: 0
      }
      this.attach_image = img1
    }
    let data = {
      req_data: this.ticketFormGroup.value,
      attah_data: this.attach_image
    }
    console.log(data);
    this.crdsrv.create(data, 'ticket/TicketDetails').subscribe(res => {
      console.log(res)
      if (res['status'] = 200) {
        this.snackBar.open("Sucessfully Created", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
        this.bckBtn();
      }
    })
  }
  bckBtn() {
    this.router.navigate(['/admin/support/personal/my-tickets']);
  }
  getPriority(): any {
    this.priorityLst = [];
    const rte = `support/Priority`;
    this.crdsrv.get(rte).subscribe((res) => {
      
      if (res['status'] === 200) {
        this.priorityLst = res['data'];
      }
    });
  }
  getCateogry(): any {
    this.cateogryLst = [];
    const rte = `support/Category`;
    this.crdsrv.get(rte).subscribe((res) => {
      
      if (res['status'] === 200) {
        this.cateogryLst = res['data'];
      }
    });
  }
    getTeam(): any {
    this.teamLst = [];
    const rte = `support/Team`;
    this.crdsrv.get(rte).subscribe((res) => {
      // console.log(this.ticketFormGroup.value.team.length);
      if (res['status'] === 200) {
        this.teamLst = res['data'];
        // this.getUserByTeamId();
        // if(this.ticketFormGroup.value.team.length >0){
        //   this.getUserByTeamId();
        // }
        
      }
    });
  }
  // getStatus(): any {
  //   this.statusLst = [];
  //   const rte = `ticket/Status`;
  //   this.crdsrv.get(rte).subscribe((res) => {
      
  //     if (res['status'] === 200) {
  //       this.statusLst = res['data'];
  //     }
  //   });
  // }
  getType(): any {
    this.typeLst = [];
    const rte = `support/Ticket-Type`;
    this.crdsrv.get(rte).subscribe((res) => {
      
      if (res['status'] === 200) {
        this.typeLst = res['data'];
      }
    });
  }
  getUserByTeamId(): any {
    console.log(this.ticketFormGroup.value.team);
    this.userLst = [];
    const rte = `ticket/user/${this.ticketFormGroup.value.team}`;
    this.crdsrv.get(rte).subscribe((res) => {
      
      if (res['status'] === 200) {
        this.userLst = res['data'];
        console.log(this.userLst);
      }
    });
  }
}
