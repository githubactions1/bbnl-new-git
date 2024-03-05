import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { Router } from '@angular/router';
@Component({
  selector: 'app-training-statusdilog',
  templateUrl: './training-statusdilog.component.html',
  styleUrls: ['./training-statusdilog.component.scss']
})
export class TrainingStatusdilogComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  statusDtls
  statusresponseDtls: any;
  filter:any
  statusbndingDtls: any;
  imgdta: any;


  constructor(private apiSrv: CrudService, public dialogRef: MatDialogRef<TrainingStatusdilogComponent>,private route: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {

     this.statusDtls=this.data.data
      console.log(this.statusDtls)

     }

  ngOnInit() {
    this.apiSrv.get('/web/common/trningtsbyid').subscribe((res) => {
      
       this.statusresponseDtls=res['data']
       console.log(this.statusresponseDtls[0].altchmets)
      //this. galleryImages=this.statusresponseDtls[0].altchmets
      //   this.filter= this.statusresponseDtls.filter(k =>{
      //    if(k.dstrt_id== this.statusDtls.dstrt_id){
      //     this.statusbndingDtls=k
      //    }
      //  })
      //  this.statusbndingDtls=this.filter
       //console.log(this.statusbndingDtls[0].altchmets)
    }, (error) => {

    });
    this.galleryOptions =   [
      { "image": false, "height": "100px" },
      { "breakpoint": 500, "width": "100%" }
      
      ]
  
    this.galleryImages = [
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/1-small.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/1-medium.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/1-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-small.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-medium.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/2-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-small.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-medium.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/3-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-small.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-medium.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/4-big.jpeg'
      },
      {
        small: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-small.jpeg',
        medium: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-medium.jpeg',
        big: 'https://lukasz-galka.github.io/ngx-gallery-demo/assets/img/5-big.jpeg'
      }      
    ];
  }



  aprove(){
   
  }
  close(){
    this.dialogRef.close()
  }
  crddata(data){

  }
//   closeDialog() {
//   this.route.navigate(["/rqsten"]);
//   this.dialogRef.close();
 

// }
}
