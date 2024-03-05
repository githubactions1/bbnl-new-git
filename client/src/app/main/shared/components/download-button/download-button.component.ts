import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss']
})
export class DownloadButtonComponent implements OnInit {
  @Output() excelEvent = new EventEmitter<boolean>();
  @Input() headers;
  @Input() rowData;
  @Input() isExcelDwnLd;
  @Input() excelFileNm;
  constructor() { }

  ngOnInit() {  
    // this.fltrHdr.getExclDataDwnld().subscribe((res) => {
    //   if (res)
    //   {
    //     this.rowData = res.rowData;
    //     this.excelFileNm = res.excelFileNm;
    //     this.headers = res.headers;
    //   }
    //   console.log(this.rowData);
    //   console.log(this.excelFileNm);
    //   console.log(this.headers);
    // });

  }

  getExcel(){
    this.isExcelDwnLd = true;
    this.excelEvent.emit(true);
    let options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      headers: this.headers
    };
    new Angular5Csv(this.rowData, this.excelFileNm, options);

  }
  ngOnChanges(changes: any) {
    if (this.isExcelDwnLd) {
     
    }
  }
}
