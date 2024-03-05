import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string, calbk) {

    let wrk_sheet_obj = {}
    let sheet_names = []
    // [
    //     sheet_nm : '',
    //     data : [
    //         {

    //         }
    //     ]
    // ]
    if(Array.isArray(json))
    {
        json.filter((k)=>{
            wrk_sheet_obj[k.sheet_nm] = XLSX.utils.json_to_sheet(k.data);
            sheet_names.push(k.sheet_nm);
        })
        console.log(wrk_sheet_obj)
        console.log(sheet_names)
        const workbook: XLSX.WorkBook = { Sheets: wrk_sheet_obj, SheetNames: sheet_names, Props : {
            Title : "Insert Title Here"
        }};
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName, ()=>{
            let err = '';
            let res = 200;
            calbk(err, res)
        });
    }
    else
    {
        let err = 'Format not matched..';
        let res = 500;
        calbk(err, res)
    }
    
   
  }

  private saveAsExcelFile(buffer: any, fileName: string, calbk) {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION)
    calbk()
  }

}