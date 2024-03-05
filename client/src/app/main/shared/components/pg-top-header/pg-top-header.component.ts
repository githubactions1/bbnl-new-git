import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'pg-top-header',
  templateUrl: './pg-top-header.component.html',
  styleUrls: ['./pg-top-header.component.scss']
})
export class PgTopHeaderComponent implements OnInit {
  @Input() headerDtls: any;
  public href: string = "";
  shwreport: boolean;
  data: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    var parts = window.location.pathname.split('/');
    if (parts[1] == 'admin' && parts[2] == 'reports' && parts[3] == 'custom') {
      this.shwreport = true;
    }
  }

  ngOnInit() {
  }
  opensideBar(val1, val2, val3) { }

  gotoReports() {
    this.router.navigate(['/admin/reports/custom/'])
  }
}
