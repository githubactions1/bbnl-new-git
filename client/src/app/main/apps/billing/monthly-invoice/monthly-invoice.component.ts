import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';

@Component({
  selector: 'app-monthly-invoice',
  templateUrl: './monthly-invoice.component.html',
  styleUrls: ['./monthly-invoice.component.scss']
})
export class MonthlyInvoiceComponent implements OnInit {
  getHeaderDtls = function (): any { return { 'title': 'Monthly Invoice', 'icon': 'money' }; };
  constructor(public crdSrv: CrudService) { 
  }

  ngOnInit(): any {}
}
