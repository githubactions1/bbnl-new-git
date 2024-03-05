import { Component, OnInit } from '@angular/core';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { CrudService } from 'app/main/apps/crud.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-customers-invoice-view',
  templateUrl: './customers-invoice-view.component.html',
  styleUrls: ['./customers-invoice-view.component.scss']
})
export class CustomersInvoiceViewComponent implements OnInit {
  cstmrinvce;
  shwLdr=false;
  cstmrmnthdat;
  constructor(public TransfereService: TransfereService,public crdsrv: CrudService) {
        this.cstmrinvce = this.TransfereService.getLoclData('data');

        console.log(this.cstmrinvce)
          this.getInvoice();
   }
   getInvoice() {
     console.log(this.cstmrinvce.data.caf_invce_id)
    this.shwLdr = true;
    const rte = `caf/customer/invoiceBId/${this.cstmrinvce.data.cstmr_id}/${this.cstmrinvce.data.invce_yr}/${this.cstmrinvce.data.invce_mnth}`;
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data'])
      this.cstmrmnthdat=res['data'];
      this.shwLdr = false;

      // if(this.cstmrmnthdat.length>0 && this.cstmrinvce.type==2){
      //   this.captureScreen()
      // }
    })
   }

  ngOnInit() {
  }
  public captureScreen()  
  {  
  
    var data = document.getElementById('content');  
    html2canvas(data).then(canvas => {  
      console.log(canvas)
      console.log(data)
      // Few necessary setting options        
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF  
      var position = 0;  
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(contentDataURL, 'JPEG', 0, position, width, height)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }

}
