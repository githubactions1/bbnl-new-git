import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { validateBasis } from '@angular/flex-layout';
import { map, startWith } from 'rxjs/operators';
import { CrudService } from '../../crud.service';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';
import * as _ from 'lodash';


@Component({
  selector: 'app-stock-upload',
  templateUrl: './stock-upload.component.html',
  styleUrls: ['./stock-upload.component.scss']
})
export class StockUploadComponent implements OnInit {
  stocupldform: FormGroup
  isHovering: any;

  prdct_type: any;
  prdpfx: any;
  agents: any;

  filteredOptions: Observable<[any]>;
  options: any;
  storeData: any;
  worksheet: XLSX.WorkSheet;
  fileUploaded: File;
  ExclDta: any;
  isValid: boolean = true
  chExclDt = [];
  nwpfix: boolean = true;
  ttlRcds: any;
  shwrcds = false
  showAutocomplete: boolean = true;
  constructor(private FormBuilder: FormBuilder, public apiService: CrudService) { }
  toggleHover(el) { }
  ngOnInit() {


    this.stocupldform = this.FormBuilder.group({
      prdttype: ['', Validators.required],
      agnt_id: ['', Validators.required],
      prefix: ['', Validators.required],
      // cmnt:['', Validators.required]
    })

    this.apiService.get('inventory/product/type').subscribe(res => {
      this.prdct_type = res['data']
    })

    this.apiService.get('inventory/agents').subscribe(res => {
      this.agents = res['data']

      this.filteredOptions = this.agents
      this.filteredOptions = this.stocupldform.get('agnt_id').valueChanges.pipe(

        map(value => typeof value === 'string' ? value : value.agnt_id),
        map(name => name ? this._filter(name) : this.options.slice())
      );
      this.options = this.agents
    })


    // this.filteredOptions = this.stocupldform.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => typeof value === 'string' ? value : value.name),
    //   map(name => name ? this._filter(name) : this.options.slice())
    // );
    console.log("StockUploadComponent")
  }


  uploadedFile(event) {

    console.log('hi')
    this.fileUploaded = event.target.files[0];
    this.readExcel();
    this.shwrcds = true
  }
  readExcel() {
    this.isValid = true;
    let readFile = new FileReader();
    readFile.onload = (e) => {
      this.storeData = readFile.result;
      var data = new Uint8Array(this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, {
        type: "binary", cellDates: true,
        cellNF: false,
        cellText: false
      });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      this.ExclDta = XLSX.utils.sheet_to_json(this.worksheet, { raw: true });
      console.log(this.ExclDta)
      this.ttlRcds = this.ExclDta.length
      for (i = 0; i < this.ExclDta.length; i++) {


        // var str = JSON.stringify(this.ExclDta[i]);
        // str = str.replace('Cpe Serial No', 'CpeSerialNo');
        // str = str.replace('Batch Id', 'BatchId');
        // str = str.replace('Batch Date', 'BatchDate');
        // var object = JSON.parse(str);
        // this.chExclDt.push(object)
        console.log("Cpe Serial No:" + typeof this.ExclDta[i]["Cpe Serial No"])
        console.log("Batch Id:" + typeof this.ExclDta[i]["Batch Id"])
        console.log("Batch Date:" + typeof this.ExclDta[i]["Batch Date"])

        if (typeof this.ExclDta[i]["Cpe Serial No"] != 'number' || typeof this.ExclDta[i]["Batch Id"] != 'number' || typeof this.ExclDta[i]["Batch Date"] != 'object') {
          this.isValid = false;
          break;
        } else {
          this.isValid = true;
        }

      }


    }
    readFile.readAsArrayBuffer(this.fileUploaded);

  }


  adnewprifix(id) {
    if (id == 'new') {
      this.nwpfix = false
    } else {
      console.log('as key value')
      this.nwpfix = true

    }

  }



  updatedVal(id) {
    if (id.length >= 1) {
      console.log('hi')
      this.showAutocomplete = true
    } else {
      this.showAutocomplete = false

      console.log('hello')
    }
  }

  stockUpdt() {
    if (this.ExclDta && this.isValid && this.stocupldform.valid) {
      var agentId
      console.log(this.stocupldform.value)
      agentId = this.stocupldform.value['agnt_id']
      var data
      data = {
        prdttype: this.stocupldform.value['prdttype'],
        agnt_id: agentId.agnt_id,
        agnt_cd: agentId.agnt_cd,
        // cmnt:this.stocupldform.value['cmnt'],
        prefix: this.stocupldform.value['prefix'],
        exceldt: this.ExclDta
      }
      console.log(data)
      // this.apiService.create(data, 'inventory/insrtStockdt').subscribe(res => {
      //   console.log(res)
      // })
    } else {
      alert('Please Enter Valid FormData and Upload Excel')
    }

  }


  prdpfxchg(id) {


    this.apiService.get('inventory/productsprfx/' + id).subscribe(res => {
      this.prdpfx = res['data']
      console.log(this.prdpfx)
    })


  }


  displayFn(user?): string | undefined {
    return user ? user.agnt_frst_nm : undefined;
  }

  private _filter(name: string) {
    console.log(name)
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.agnt_cd.toLowerCase().indexOf(filterValue) === 0 || option.agnt_frst_nm.toLowerCase().indexOf(filterValue) === 0);
  }
}
