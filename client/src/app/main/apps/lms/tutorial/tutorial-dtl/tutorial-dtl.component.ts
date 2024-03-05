import { Pipe, Component, OnInit } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NavigationExtras, Router } from '@angular/router';
import { EmbedVideoService } from 'ngx-embed-video';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { DsNavigationItem } from '@glits/types';
import { Config } from 'app/main/shared/components/accordion/types/Config';
import { Menu, SubMenu } from 'app/main/shared/components/accordion/types/Menu';
import { AccordionComponent } from 'app/main/shared/components/accordion/accordion.component';
import { VideoService } from '../video-service'

import { TransfereService } from 'app/providers/transfer/transfer.service';
import { dsAnimations } from '@glits/animations';
import { indexOf } from '@amcharts/amcharts4/.internal/core/utils/Array';
@Component({
  selector: 'app-tutorial-dtl',
  templateUrl: './tutorial-dtl.component.html',
  styleUrls: ['./tutorial-dtl.component.scss'],
  animations: dsAnimations,
})
@Pipe({ name: 'mySafe' })
export class TutorialDtlComponent implements OnInit {

  options: Config = { multi: false };
  iframe_html: any;
  url
  youtubeUrl = 'https://www.youtube.com/watch?v=rJbf-2XXsuY'

  data = this.transfereService.getData();
  menus: Menu[] = [];
  items: DsNavigationItem[];
  isVideo: boolean = true;

  testArray: any;
  sections: any = [];
  curtnurl: any;
  videos: any = [];
  sectn: any;
  curSctn: any;
  curVid: any;
  curMnuIndex: any;
  curVidIndex: any;

  constructor(public apiSrvc: CrudService, public sanitizer: DomSanitizer, public dialog: MatDialog, public Router: Router, private _dsSidebarService: DsSidebarService, private embedService: EmbedVideoService, private VideoService: VideoService, private transfereService: TransfereService) {
    // this.iframe_html =this.embedService.embed(this.youtubeUrl, {
    //   query: { portrait: 0, color: '333' },
    //   attr: { width: 1024, height: 768 }
    // })

  }

  ngOnInit() {
    console.log(this.data)
    this.getTrainingContent();
    this.VideoService.vidUrl.subscribe(item => {
      try {
        if (item) {
          console.log(item.vid.url)
          this.isVideo = true
          this.videos = [] 
          this.curMnuIndex = item.mnuIndex
          this.curVidIndex = item.vidIndex
          this.iframe_html = this.embedService.embed(item.vid.url, {
            query: { portrait: 0, color: '333' },
            attr: { width: 1024, height: 768 }
          })
        }
      } catch{
        console.log("err")
      }


    }
    )


    // this.VideoService.sect.subscribe( section=> {
    // this.sectn=section
    // }
    // )

    this.VideoService.testArray.subscribe(item => {
      console.log(item)
      this.testArray = item.test;
      if (item.type=='test') {
          this.isVideo = false;
        // if (this.testArray.length > 0) {
        //   this.isVideo = false;
        // }
      }

    }
    )

  }
  next() {
    var typ='next'
       
    this.VideoService.onNextVideo(this.curVidIndex,this.curMnuIndex,typ);
    // var video
    //  console.log(this.sectn)
    // for(var i=0;i<this.sections.length;i++){
    //   if(this.sections[i].sctn_id==this.sectn.id){
    //     for(var j=0;j<this.sections[i].videos.length;j++){
    //       if(this.sections[i].videos[j].vid_url==this.curtnurl){
    //         var index=this.sections.videos[j].indexOf(this.curtnurl)
    //           video=this.sections[i].videos[++j].vid_url
    //         console.log(index)
    //       }else if(index==-1){

    //       }

    //     }
    //   }
    // }
    // this.iframe_html = this.embedService.embed(video, {
    //   query: { portrait: 0, color: '333' },
    //   attr: { width: 1024, height: 768 }
    // })

    //console.log(index)
    // console.log(this.videos)
  }
prv(){
  var typ='prv'
  this.VideoService.onNextVideo(this.curVidIndex,this.curMnuIndex,typ);
}


  getTrainingContent() {
    this.apiSrvc.get('/web/common/trngCntnt/'+this.data.trng_id).subscribe((res) => {
      this.sections = res['data'][0].sections;
      console.log(this.sections)
      this.sections.forEach(element => {

        let submenu: SubMenu[] = []
        element.videos.forEach((v) => {
          submenu.push({
            name: v.vid_nm,
            iconClass: 'fa fa-play-circle',
            url: v.vid_url,
            isViewed: false,
            vid_dur:v.vid_durtn,
            type: 'video',
            test: [],
          
          })
        })
        if (element.tests && element.tests.length) {
          element.tests.forEach((t) => {
            console.log(t)
            submenu.push({
              name: t.test_desc,
              iconClass: 'fa fa-clipboard',
              url: '',
              isViewed: false,
              type: 'test',
              test: t.qtns,
              testDesc: t.test_desc,
            
            })
          })
        }
        this.menus.push({
          id: element.sctn_id,
          name: element.sctn_nm,
          iconClass: 'fa fa-bars',
          active: false,
          submenu: submenu,
          vid_ct: element.videos.length,
          test_ct: element.tests.length,
        })
      });
      console.log(this.menus)
      this.iframe_html = this.embedService.embed(this.menus[0].submenu[0].url, {
        query: { portrait: 0, color: '333' },
        attr: { width: 1024, height: 768 }
      })
    });
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._dsSidebarService.getSidebar(name).toggleOpen();
  }
  photoURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.youtubeUrl);
  }

}

