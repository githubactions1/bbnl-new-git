import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.scss']
})
export class PdfDownloadComponent implements OnInit {
  @Output() pdfEvent = new EventEmitter<boolean>();
  @Input() isPdfDwnLd;
  @Input() pdfPagesize;
  @Input() PdfpageOrientation;
  @Input() ReportHeader;
  @Input() pdftableData;
  @Input() tableHeadersWthDataValues;
  @Input() fileName;
  @Input() pdfheaderRows;
  // @Input() fontSize;
  @Input() autoresize;
  @Input() fitToPage;
  constructor() { }

  ngOnInit() {
  }
  getPdf() {
    this.isPdfDwnLd = true;
    this.pdfEvent.emit(true);
  }

  ngOnChanges(changes: any) {
    if (this.isPdfDwnLd) {
      this.getPdfData();
    }
  }

  table(data, columns) {
    return {
      table: {
        headerRows: this.pdfheaderRows,
        tableHeader: {
        },
        body: this.buildTableBody(data, columns)
      },
      alignment: 'center',
      wordspacing: "10px",
      fontSize: 10,
      autoresize:this.autoresize,
      fitToPage:this.fitToPage,
    };
  }

  buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function (row) {
      var dataRow = [];

      columns.forEach(function (column) {
        dataRow.push(row[column]);
      })

      body.push(dataRow);
    });

    return body;
  }

  getPdfData(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    var dd =
    {
      pageSize: this.pdfPagesize,
      pageOrientation: this.PdfpageOrientation,

      content: [
        { style: 'h1', text: 'APSFL', fontSize: 22, color: '#800000', alignment: 'center' },
        // { style: 'h2', text: 'COMMISSIONER & DIRECTOR OF MUNICIPAL ADMINISTRATION', fontSize: 11, alignment: 'center' },
        { style: 'h2', text: 'website : http://apsfl.com/', fontSize: 11, alignment: 'center' },
        { style: 'h2', text: '                                                                                                  ', fontSize: 11, alignment: 'center' },
        { style: 'h1', text: this.ReportHeader, fontSize: 15, color: '#800080', alignment: 'center' },



        // { text:  this.ulbNM +'- ULB RTMS GATE COVERAGE REPORT '+' '+'('+ this.from_date +')',  style: 'header' },
        this.table(this.pdftableData, this.tableHeadersWthDataValues),



      ],
      footer: function (page, pages) {
        return { columns: ['***Powered by glits***', { alignment: 'right', text: 'http://esachivalayam.com/', italics: true }], margin: [10, 0] };
      }
    };



    pdfMake.createPdf(dd).download(this.fileName + '.pdf');

  }


}