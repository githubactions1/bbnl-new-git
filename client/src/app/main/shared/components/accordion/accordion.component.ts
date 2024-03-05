import { Component, OnInit, Input } from '@angular/core';
import { Config, Menu } from './types';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { VideoService } from '../../../apps/lms/tutorial/video-service'
@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() options;
  @Input() menus: Menu[];
  newurl: any
  config: Config;
  constructor(private VideoService: VideoService) { }
  ngOnInit() {
    this.config = this.mergeConfig(this.options);
    console.log(this.menus)

    this.VideoService.nextVideo.subscribe(item => {
      try {
        if (item) {
          let sctnId = item.sctn
          let vid = item.vid
          console.log(sctnId, vid)
          console.log(this.menus)
          console.log(this.menus[sctnId].submenu[vid])

          if (item.type == 'next') {
            if (this.menus[sctnId].submenu.length > vid + 1) {
              let vidFound = false;
              for (let j = vid + 1; j < this.menus[sctnId].submenu.length; j++) {
                if (this.menus[sctnId].submenu[j].type == "video") {
                  this.VideoService.onVideoChange(this.menus[sctnId].submenu[vid + 1], sctnId, vid + 1);
                  vidFound = true
                  break;
                }

              }
              if (!vidFound) {
                if ((this.menus.length > sctnId + 1)) {
                  this.menus.forEach((m) => {
                    m.active = false;
                  })
                  this.menus[sctnId + 1].active = true;
                  this.VideoService.onVideoChange(this.menus[sctnId + 1].submenu[0], sctnId + 1, 0);

                }
              }

            } else if ((this.menus.length > sctnId + 1)) {
              this.menus.forEach((m) => {
                m.active = false;
              })
              this.menus[sctnId + 1].active = true;
              this.VideoService.onVideoChange(this.menus[sctnId + 1].submenu[0], sctnId + 1, 0);

            }

          } else if (item.type == 'prv') {
            if (this.menus[sctnId].submenu.length > vid + 1) {
              let vidFound = false;
              for (let j = vid + 1; j < this.menus[sctnId].submenu.length; j++) {
                if (this.menus[sctnId].submenu[j].type == "video") {
                  this.VideoService.onVideoChange(this.menus[sctnId].submenu[vid - 1], sctnId, vid - 1);
                  vidFound = true
                  break;
                }

              }
              if (!vidFound) {
                if ((this.menus.length > sctnId + 1)) {
                  this.menus.forEach((m) => {
                    m.active = false;
                  })
                  this.menus[sctnId - 1].active = true;
                  this.VideoService.onVideoChange(this.menus[sctnId - 1].submenu[0], sctnId - 1, 0);

                }
              }

            } else if ((this.menus.length > sctnId + 1)) {
              this.menus.forEach((m) => {
                m.active = false;
              })
              this.menus[sctnId - 1].active = true;
              this.VideoService.onVideoChange(this.menus[sctnId - 1].submenu[0], sctnId - 1, 0);

            }
          }
        }

      } catch{
        console.log("err")
      }


    })
  }

  mergeConfig(options: Config) {

    const config = {

      multi: true
    };

    return { ...config, ...options };
  }

  toggle(index: number) {

    if (!this.config.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }


    this.menus[index].active = !this.menus[index].active;
  }

  onItemClick(item: any, i: any, j: any) {
    // var previndx_of_menu=i
    // var nextindex_of_menu=i
    // console.log("curntindx:",i)
    // console.log("prvindex",--previndx_of_menu)

    // console.log("nxtindx:",++nextindex_of_menu)

    // var previndx_of_submenu=j
    // var nextindex_of_submenu=j
    // console.log("curntindx:",j)
    // console.log("prvindex",--previndx_of_submenu)

    // console.log("nxtindx:",++nextindex_of_submenu)


    //  console.log(item)
    //  console.log(parentItem)
    if (item.type == 'video') {
      this.VideoService.onVideoChange(item, i, j);
    } else if (item.type == 'test') {
      console.log("clicked")
      this.VideoService.onTestChange(item)
    }

  }





  // chantest(test){
  //   console.log(test)
  //   this.VideoService.changetest(test)
  // }
}