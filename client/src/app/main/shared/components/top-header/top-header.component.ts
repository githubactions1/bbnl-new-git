import { Component, OnInit,Input } from '@angular/core';
import { TopHeaderSrvc } from 'app/providers/top-header/top-header-service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent implements OnInit {
  hdrTxt: any;
  hdrAlgn: any;
  @Input() headrName:any;
  @Input() headrIcon:any;
  @Input() btnName:any;
  // pg_ttl:string;
  constructor(private hdrSrvc: TopHeaderSrvc) {
    // this.pg_ttl = "Setup"
   }

  ngOnInit() {
    // this.hdrSrvc.getHdr().subscribe(hdrDta => {
    //   this.hdrTxt = hdrDta;
    //   this.hdrAlgn = this.hdrTxt.widths[0];
    // })
  }
}
