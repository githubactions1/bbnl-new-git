import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VideoService {
  youtubeUrl = 'https://www.youtube.com/watch?v=rJbf-2XXsuY'
  constructor() {
    this.Url.next(this.youtubeUrl);
  }
  private sction = new BehaviorSubject<any>('');
  private Url = new BehaviorSubject<any>('');
  private test = new BehaviorSubject<any>('')
  private nextVid = new BehaviorSubject<any>('')
  private EditDta = new BehaviorSubject<any>('')
  vidUrl = this.Url.asObservable();
  Editdata=this.EditDta.asObservable();
  nextVideo = this.nextVid.asObservable();
  sect = this.sction.asObservable();
  testArray = this.test.asObservable();
  onVideoChange(vid, mnuIndex,vidIndex) {
    let data ={
      vid:vid,
      vidIndex:vidIndex,
      mnuIndex:mnuIndex
    }
    this.Url.next(data);
    // this.sction.next(pat)
  }
  onTestChange(test) {
    console.log(test)
    this.test.next(test)
  }
  onNextVideo(vid, sctn,typ) {
    let data =
    { sctn: sctn, vid: vid,type:typ }
    this.nextVid.next(data)
  }

  EditData(dat){
   this.EditDta.next(dat)
  }

}