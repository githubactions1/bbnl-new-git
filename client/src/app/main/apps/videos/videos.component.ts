import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  getHeaderDtls = function (): any { return { 'title': 'Demo Videos', 'icon': 'tv' }; };
  vdeosList = [];
  vdeosListCpy = [];
  searchText = '';
  constructor(public crdsrv: CrudService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.vdeosDetails();
  }
  initlizeitems() {
    this.vdeosList = _.cloneDeep(this.vdeosListCpy);
  }
  searchName(event) {
    this.initlizeitems();
    if (event.target.value) {
      this.vdeosList = this.vdeosList.filter((k) => {
        return (k.vdeo_hdr_txt + "").toLowerCase().indexOf(event.target.value.toLowerCase()) > -1;
      })
    }
  }

  vdeosDetails() {
    let rte = `videos/shwVideos`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['safeURL'] = this._sanitizer.bypassSecurityTrustResourceUrl(res['data'][i].vdeo_lnk_url)
      }

      this.vdeosList = res['data'];
      this.vdeosListCpy = _.cloneDeep(res['data']);
      console.log(this.vdeosList)
      if (res['status'] == 200) {
        // this.oltDrpDwn = true;
      }
    })
  }



}
