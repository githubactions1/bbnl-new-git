import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'app/main/apps/crud.service';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import {
  MatTableDataSource, MatPaginator, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialogRef, MatSnackBar, MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material';
@Component({
  selector: 'app-basic-service-form',
  templateUrl: './basic-service-form.component.html',
  styleUrls: ['./basic-service-form.component.scss']
})
export class BasicServiceFormComponent implements OnInit {
  getHeaderDtls = function () { return { "title": 'New Ticket', "icon": "people_outline" } }
  tktParamsDta = [];
  CategoryDtls:any;
  TypeID:any;
  categryID:any;
  subcategryID:any;
  fileUploaded: any;
  upldFileNm: any;
  // uploadedFiles: Array < File > ;
  imageUrl: string | ArrayBuffer;
  imgfilename: string;
  attach_image: {};
  app_icon: string;
  descrptn:any;
  lngdescrptn:any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  searchLoader: boolean = false;
  
  constructor(private route: ActivatedRoute, private crdsrv: CrudService, public router: Router, private location: Location, private snackBar: MatSnackBar, public datePipe: DatePipe) {
    this.route.queryParams.subscribe(params => {
      console.log(params.paramsdata);
      if (params.paramsdata) {
        this.tktParamsDta = JSON.parse(params.paramsdata);
      }
    })
  }


  ngOnInit() {
    console.log(this.tktParamsDta);
    this.ForCategory()
  
  }
  ForCategory(){
    this.TypeID=10;
  const rte = `ticket/getCategories/${this.TypeID}`
  this.crdsrv.get(rte).subscribe(res => {
    this.CategoryDtls = res['data'];
    console.log(this.CategoryDtls);
    console.log(this.CategoryDtls.length);
    if(this.CategoryDtls.length == 1){
      this.categryID=this.CategoryDtls[0].tckt_ctgry_id;
    }
    else{
      this.categryID=''
    }
  })
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
  this.app_icon= ''
  
}
resetTckInfrmtn(){
  this.categryID='';
  this.subcategryID='';
  this.imageUrl = '';
  this.imgfilename = '';
  this.app_icon= '';
  this.descrptn='';
  this.lngdescrptn='';
}
saveTckInfrmtn(){
  this.searchLoader = true;
  console.log(this.tktParamsDta);
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
  var postdata = {
    type:this.TypeID,
    category:this.categryID,
    subcategory:this.subcategryID,
    status:7,
    priority:3,
    description: this.descrptn ? this.descrptn.length>0? this.descrptn: 0 :0,
    longdescription:this.lngdescrptn ? this.lngdescrptn.length>0? this.lngdescrptn: 0 :0,
    attah_data: this.attach_image,
    cre_tm_id:this.tktParamsDta[0].tm_id
  }
  console.log(postdata);
  this.crdsrv.create(postdata, 'ticket/insert/basicServiceRequest/ticketDetails').subscribe(res => {
    console.log(res['status']);
    if (res['status'] = 200) {
      this.searchLoader = false;
     
      this.snackBar.open("Sucessfully Created", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.backBtn();
    }
  })
}
backBtn(){
  this.router.navigate(['/admin/support/personal/ticketlst'],{ queryParams: { "paramsdata": 1 }});
  this.location.replaceState('/admin/support/personal/ticketlst');
}

}
