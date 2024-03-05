import { Component, OnInit, Inject, Input } from '@angular/core';
import { Config } from 'app/main/shared/components/accordion/types/Config';
import { Menu,SubMenu} from 'app/main/shared/components/accordion/types/Menu';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UserService } from 'app/providers/user/user.serivce';
@Component({
  selector: 'app-tutorial-dtl-dlg',
  templateUrl: './tutorial-dtl-dlg.component.html',
  styleUrls: ['./tutorial-dtl-dlg.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TutorialDtlDlgComponent implements OnInit {
  options: Config = { multi: false };
  data = this.transfereService.getData(); 
  menus: Menu[] = []
  UsrDtls = {
    hyrchy_id: 0,
    dstrt_nm: '',
    dstrt_id: 0,
    hyrchy_grp_nm: '',
    hyrchy_grp_id: 0,
    urbn_in: 0,
    user_id:''
  };
  // = [
  //   { 
  //     name: 'Front-end',
  //     iconClass: 'fa fa-bars',
  //     active: false,
  //     submenu: [
  //       { name: 'HTML',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=iyafB0VCLsA',isViewed:true,type:'video',test:[] },
  //       { name: 'CSS',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=0afZj1G0BIE',isViewed:true,type:'video',test:[] },
  //       { name: 'Javascript',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',isViewed:false,type:'video',test:[] },
  //       { name: 'test',iconClass:'fa fa-play-circle', test:[],url:'#',isViewed:false,type:'test' }
  //     ]
  //   },
  //   { 
  //     name: 'Responsive web',
  //     iconClass: 'fa fa-bars',
  //     active: false,
  //     submenu: [
  //       { name: 'HTML',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=iyafB0VCLsA',isViewed:true,type:'video',test:[] },
  //       { name: 'CSS',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=0afZj1G0BIE',isViewed:true,type:'video',test:[] },
  //       { name: 'Javascript',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',isViewed:false,type:'video',test:[] },
  //       { name: 'test',iconClass:'fa fa-play-circle', test:[],url:'#',isViewed:false,type:'test' }
  //     ]
  //   },
  //   { 
  //     name: 'Web Browser',
  //     iconClass: 'fa fa-bars',
  //     active: false,
  //     submenu: [
  //       { name: 'HTML',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=iyafB0VCLsA',isViewed:true,type:'video',test:[] },
  //       { name: 'CSS',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=0afZj1G0BIE',isViewed:true,type:'video',test:[] },
  //       { name: 'Javascript',iconClass:'fa fa-play-circle', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',isViewed:false,type:'video',test:[] },
  //       { name: 'test',iconClass:'fa fa-play-circle', test:[],url:'#',isViewed:false,type:'test' }
  //     ]
  //   }
  // ];
  sections: any;
  constructor(private route: Router,private transfereService:TransfereService,public apiSrvc: CrudService, private usrService: UserService) {
    this.UsrDtls = this.usrService.getUsrDta();
  
   console.log(this.UsrDtls.user_id)
  }


  ngOnInit() {           
    console.log(this.data)
    this.insrtusr()
    this. getTrainingContent()
    
  }
  startCourse(a){
    this.transfereService.setData(this.data);
    this.route.navigate([`/admin/lms/training/course`])
  }


insrtusr(){
  var data={
    trng_id:this.data.trng_id,
    user_id:this.UsrDtls.user_id
  }
  this.apiSrvc.create(data,'/web/common/insrtUsrTrng').subscribe((res) => {
    console.log(res)
   
  });
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
            type: 'video',
            test: [],
          })
        })
        if(element.tests && element.tests.length){
          element.tests.forEach((t) => {
            console.log(t)
            submenu.push({
              name: t.test_desc,
              iconClass: 'fa fa-clipboard',
              url: '',
              isViewed: false,
              type: 'test',
              test: t.qtns,
              testDesc:t.test_desc,
            
            })
          })
        }
        this.menus.push({
          id:element.sctn_id,
          name: element.sctn_nm,
          iconClass: 'fa fa-bars',
          active: false,
          submenu: submenu,
          vid_ct: element.videos.length,
          test_ct:element.tests.length
        })
        console.log(this.menus)
      });
    });
  }
}
