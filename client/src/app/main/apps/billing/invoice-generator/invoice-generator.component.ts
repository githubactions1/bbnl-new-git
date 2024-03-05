import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'app-invoice-generator',
  templateUrl: './invoice-generator.component.html',
  styleUrls: ['./invoice-generator.component.scss']
})

export class InvoiceGeneratorComponent implements OnInit {
  custTypes: any;
  cafTypes: any;
  packagesfrpdf: any;
  districts: any;
  UrlS ;
  currentyear: number;
  years = [];
  mm: any;
  errorMsg: string;
  isLoading: boolean;
  customerNames: any;
  counter_pdf = 0;
  // tslint:disable-next-line:max-line-length
  months = [{ val: '01', name: 'January' }, { val: '02', name: 'Febuary' }, { val: '03', name: 'March' }, { val: '04', name: 'April' }, { val: '05', name: 'May' }, { val: '06', name: 'June' }, { val: '07', name: 'July' }, { val: '08', name: 'August' }, { val: '09', name: 'September' }, { val: '10', name: 'October' }, { val: '11', name: 'November' }, { val: '12', name: 'December' }];
  monthsfrpdf = [{ val: '01', name: 'January' }, { val: '02', name: 'Febuary' }, { val: '03', name: 'March' }, { val: '04', name: 'April' }, { val: '05', name: 'May' }, { val: '06', name: 'June' }, { val: '07', name: 'July' }, { val: '08', name: 'August' }, { val: '09', name: 'September' }, { val: '10', name: 'October' }, { val: '11', name: 'November' }, { val: '12', name: 'December' }];
  InvoiceForm: any;
  InvoiceForm1: any;
  InvoiceForm2: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  showLdr: boolean;
  count: any;
  arry = [];
  filterValues: any = [];
  api_idx = this.filterValues.length;
  mnthcrnt: any;
  mygendata: any;
  recntgendata: any;
  columnDefsRcrd;
  columnDefsRcrd1;
  ttldata: any;
  sT = false;
  sT1 = false;
  cT = false;
  cT1 = false;
  dT = false;
  yT = false;
  yT1 = false;
  mT = false;
  mT1 = false;
  loader: boolean;
  getHeaderDtls = function () { return { "title": 'Invoice Generation', "icon": "people_outline" } };
  permissions: any;
  shwPermMsg: string;
  refreshdta: any;
  constructor(private apiSerice: CrudService, private fb: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.InvoiceForm = this.fb.group({
      subtype: [''],
      custtype: [''],
      district: [''],
      year: [''],
      month: ['']
    })
    this.InvoiceForm1 = this.fb.group({
      subtype: [''],
      year: [''],
      month: [''],
      cafid: [''],
    })
	this.InvoiceForm2 = this.fb.group({
      subtype: [''],
      custtype: [''],
      district: [''],
      year: [''],
      month: ['']
    })

    this.currentyear = (new Date()).getFullYear();
    var count = this.currentyear - 2016;
    for (var i = 0; i <= count; i++) {
      let yr = this.currentyear - i
      this.years.push(yr)
    }
    this.mm = (new Date()).getMonth() + 1
    if (this.mm < 10) {
      this.mm = '0' + this.mm
    }
    this.customerTypes();
    this.getDistricts();
    this.getgentpdf();
	this.getpackagesfrpdf();
    // this.InvoiceForm.get('cstmrid').valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     tap(() => {
    //       this.errorMsg = '';
    //       this.customerNames = [];
    //       this.isLoading = true;
    //     }),
    //     switchMap((value) => {
    //       if (value >= 3) {
    //         let data = { value: value, id: this.InvoiceForm.value.district.dstrt_id, type: this.InvoiceForm.value.custtype.entrpe_type_id }
    //         return this.apiSerice.getbydata(`billing/getCstmrBySearch`, data)
    //           .pipe(
    //             finalize(() => {
    //               this.isLoading = false;
    //             }),
    //           );
    //       }
    //     })
    //   )
    //   .subscribe(data => {
    //     // console.log(data)cstmrid
    //     if (data['data'] === undefined) {
    //       this.errorMsg = data['Error'];
    //       this.customerNames = [];
    //     } else {
    //       this.errorMsg = '';
    //       this.customerNames = data['data'];
    //     }
    //   });
  }
  // displayFn(cstmr) {
  //   if (cstmr) { return cstmr.cstmr_nm + " " + '|' + " " + cstmr.cstmr_id; }
  // }
  getgentpdf() {
    let rte = `/billing/user_generated_invoices`
    this.apiSerice.get(rte).subscribe((res) => {
      // console.log(res)
      if (res['status'] == 200) {
        this.filterValues = res['data'];
        if (res['perm']){
          this.permissions = res['perm'][0];
        } else{
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
      }
    })
  }
  getpackagesfrpdf(){
    let rte = `package/getPckgesfrPdf`
    this.apiSerice.get(rte).subscribe((res) => {
      // console.log(res)
        this.packagesfrpdf = res['data'];
    })
  }
  customerTypes() {
    // console.log("customerTypes")
    let rte = `crm/customer/customertype`
    this.apiSerice.get(rte).subscribe((res) => {
      // console.log(res)
      this.custTypes = res['data']
    })
  }
  getDistricts() {
    let rte = `user/getdstrcts/${1}`
    this.apiSerice.get(rte).subscribe((res) => {
      // console.log(res)
      this.districts = res['data']
    })

  }

  generate() {
    console.log("generate.................sravani",++this.counter_pdf)
    let data;

    if (this.InvoiceForm.value.subtype || this.InvoiceForm.value.year || this.InvoiceForm.value.month.val || this.InvoiceForm.value.district.dstrt_id) {
      this.sT1 = false; this.yT1 = false; this.cT1 = false; this.mT1 = false;
      if (this.InvoiceForm.value.subtype == "") this.sT = true; else { this.sT = false; } if (this.InvoiceForm.value.custtype.entrpe_type_id == undefined) this.cT = true; else { this.cT = false; } if (this.InvoiceForm.value.district.dstrt_id == undefined) this.dT = true; else { this.dT = false; }
      if (this.InvoiceForm.value.year == "") this.yT = true; else { this.yT = false; } if (this.InvoiceForm.value.month.val == undefined) this.mT = true; else { this.mT = false; }

      data = {
        subtype: this.InvoiceForm.value.subtype,
        custype: this.InvoiceForm.value.custtype.entrpe_type_id,
        district: this.InvoiceForm.value.district.dstrt_id,
        district_nm: this.InvoiceForm.value.district.dstrt_nm,
        year: this.InvoiceForm.value.year,
        month: this.InvoiceForm.value.month.val,
        caf_id: this.InvoiceForm.value.cafid,
        type: this.InvoiceForm.value.subtype == 1 ? "pdf" : "sms/email"
      }
    }
    if (this.InvoiceForm1.value.subtype || this.InvoiceForm1.value.year || this.InvoiceForm1.value.month.val || this.InvoiceForm1.value.cafid) {
      if (this.InvoiceForm1.value.subtype == "") this.sT1 = true; else { this.sT1 = false; } if (this.InvoiceForm1.value.year == "") this.yT1 = true; else { this.yT1 = false; } if (this.InvoiceForm1.value.month.val == undefined) this.mT1 = true; else { this.mT1 = false; } if (this.InvoiceForm1.value.cafid == "") this.cT1 = true; else { this.cT1 = false; }


      this.sT = false; this.cT = false; this.dT = false; this.yT = false; this.mT = false;
      data = {
        subtype: this.InvoiceForm1.value.subtype,
        custype: this.InvoiceForm.value.custtype.entrpe_type_id,
        district: this.InvoiceForm.value.district.dstrt_id,
        district_nm: this.InvoiceForm.value.district.dstrt_nm,
        year: this.InvoiceForm1.value.year,
        month: this.InvoiceForm1.value.month.val,
        caf_id: this.InvoiceForm1.value.cafid,
        type: this.InvoiceForm1.value.subtype == 1 ? "pdf" : "sms/email"
      }
    }

    // console.log(data);

    if (data) {
      if ((data.year && data.month && data.subtype) && (data.district || data.caf_id)) {
        this.showLdr = true;
        let rte1 = `/billing/generateCount`;
        this.apiSerice.create(data, rte1).subscribe((res) => {
          console.log(res)
          this.showLdr = false;
          if (res['status'] == 200) {
            if (res['data'].err == 'billnot') {
              this.snackBar.open("Bill not Generated To This CAF", '', {
                duration: 2000,
                panelClass: ['blue-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              return;
            }
            else if (res['data'].err == 'gen') {
              this.snackBar.open("Already Generated", '', {
                duration: 2000,
                panelClass: ['blue-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              return;
            } else if (res['data'].err == 'nouser') {
              this.filterValues.splice(this.api_idx, 1);
              this.snackBar.open("Customer Not Exist", '', {
                duration: 2000,
                panelClass: ['blue-snackbar'],
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
              });
              return;
            }
            else {
              this.filterValues = res['data'].data;
              // for(let i=0;i<res['data'].tldata.length;i++){
              //   res['data'].tldata[i]['sts_id'] = res['data'].data[0].sts_id 
              // }
              // this.ttldata = res['data'].tldata;
              // if (this.ttldata.length > 0) {
                // let rte = `/billing/getgeneratePdfCstmrs`;
                // this.showLdr = true;
                // this.apiSerice.createPdf({ data: this.ttldata, data1: data }, rte).subscribe((res) => {
                //   console.log(res);
                //   this.showLdr = false;
                //   if (res['status'] == 200) {
                //     this.getgentpdf();
                //     this.snackBar.open("Sucessfully Updated", '', {
                //       duration: 2000,
                //       panelClass: ['blue-snackbar'],
                //       horizontalPosition: this.horizontalPosition,
                //       verticalPosition: this.verticalPosition,
                //     });
                //   } else {
                //     this.filterValues[this.api_idx].sts_txt = 'Failed';
                //     this.snackBar.open("Something went wrong. Please try again...", '', {
                //       duration: 2000,
                //       panelClass: ['red-snackbar'],
                //       horizontalPosition: this.horizontalPosition,
                //       verticalPosition: this.verticalPosition,
                //     });
                //   }

                // })
              // }
            }
          } else {
            this.snackBar.open("Something went wrong. Please try again", '', {
              duration: 2000,
              panelClass: ['blue-snackbar'],
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
          }
        })
      }
    }
  }
  
  pdf() {
    console.log("generate.................ramesh",++this.counter_pdf)
    let data;

    if (this.InvoiceForm.value.subtype || this.InvoiceForm.value.year || this.InvoiceForm.value.month.val || this.InvoiceForm.value.district.dstrt_id) {
      this.sT1 = false; this.yT1 = false; this.cT1 = false; this.mT1 = false;
      if (this.InvoiceForm.value.subtype == "") this.sT = true; else { this.sT = false; } if (this.InvoiceForm.value.custtype.entrpe_type_id == undefined) this.cT = true; else { this.cT = false; } if (this.InvoiceForm.value.district.dstrt_id == undefined) this.dT = true; else { this.dT = false; }
      if (this.InvoiceForm.value.year == "") this.yT = true; else { this.yT = false; } if (this.InvoiceForm.value.month.val == undefined) this.mT = true; else { this.mT = false; }

      data = {
        subtype: this.InvoiceForm.value.subtype,
        custype: this.InvoiceForm.value.custtype.entrpe_type_id,
        district: this.InvoiceForm.value.district.dstrt_id,
        district_nm: this.InvoiceForm.value.district.dstrt_nm,
        year: this.InvoiceForm.value.year,
        month: this.InvoiceForm.value.month.val,
        caf_id: this.InvoiceForm.value.cafid,
        type: this.InvoiceForm.value.subtype == 1 ? "pdf" : "sms/email"
      }
    }
    if (this.InvoiceForm1.value.subtype || this.InvoiceForm1.value.year || this.InvoiceForm1.value.month.val || this.InvoiceForm1.value.cafid) {
      if (this.InvoiceForm1.value.subtype == "") this.sT1 = true; else { this.sT1 = false; } if (this.InvoiceForm1.value.year == "") this.yT1 = true; else { this.yT1 = false; } if (this.InvoiceForm1.value.month.val == undefined) this.mT1 = true; else { this.mT1 = false; } if (this.InvoiceForm1.value.cafid == "") this.cT1 = true; else { this.cT1 = false; }


      this.sT = false; this.cT = false; this.dT = false; this.yT = false; this.mT = false;
      data = {
        subtype: this.InvoiceForm1.value.subtype,
        custype: this.InvoiceForm.value.custtype.entrpe_type_id,
        district: this.InvoiceForm.value.district.dstrt_id,
        district_nm: this.InvoiceForm.value.district.dstrt_nm,
        year: this.InvoiceForm1.value.year,
        month: this.InvoiceForm1.value.month.val,
        caf_id: this.InvoiceForm1.value.cafid,
        type: this.InvoiceForm1.value.subtype == 1 ? "pdf" : "sms/email"
      }
    }

    // console.log(data);

    if (data) {
      window.open(`https://bbnlbss.apsfl.co.in/apiv1/subscriberApp/invoice/${data.caf_id}/${data.year}/${data.month}`);
    }
  }
  refreshcnt(data){
    console.log(data.sts_id)
    let rte = "/billing/refreshPdfdta/" +data.sts_id;
    this.showLdr = true;
    this.apiSerice.get(rte).subscribe((res) => {
      // console.log(res);

      this.showLdr = false;
      if (res['status'] == 200) {
       this.refreshdta =res['data']
       console.log(this.filterValues[0].sts_id)
       console.log(this.refreshdta[0].sts_id)
      //  for(let i = 0 ;i<=this.filterValues.length;i++)
      //  {
      //   if (this.filterValues[i].sts_id == this.refreshdta[0].sts_id) {
      //     this.filterValues[i]=this.refreshdta[0]
      //     console.log("changed")
      //     }
      //  }
       this.filterValues.filter((k) => {
        
          if (k.sts_id == this.refreshdta[0].sts_id) {
          k.pdf_gen_cnt = this.refreshdta[0].pdf_gen_cnt
          k.fld_gen_cnt = this.refreshdta[0].fld_gen_cnt
          console.log("changed")
          }
         
        
        
      })
      console.log(this.filterValues)
      console.log(this.refreshdta)
      }
    })

  }
  
  pdfPlanWise() {
    console.log("generate.................ramesh",++this.counter_pdf)
    let data;
    console.log("this.form1",this.InvoiceForm2.value);
    if (this.InvoiceForm2.value.subtype || this.InvoiceForm2.value.year || this.InvoiceForm2.value.month.val || this.InvoiceForm2.value.cafid) {
      if (this.InvoiceForm2.value.subtype == "") this.sT1 = true; else { this.sT1 = false; } if (this.InvoiceForm2.value.year == "") this.yT1 = true; else { this.yT1 = false; } if (this.InvoiceForm2.value.month.val == undefined) this.mT1 = true; else { this.mT1 = false; } if (this.InvoiceForm2.value.cafid == "") this.cT1 = true; else { this.cT1 = false; }


      this.sT = false; this.cT = false; this.dT = false; this.yT = false; this.mT = false;
      data = {
        subtype: this.InvoiceForm2.value.subtype,
        custype: this.InvoiceForm2.value.custtype.pckge_id,
        district: this.InvoiceForm2.value.district.dstrt_id,
        district_nm: this.InvoiceForm2.value.district.dstrt_nm,
        year: this.InvoiceForm2.value.year,
        month: this.InvoiceForm2.value.month.val,
        caf_id: this.InvoiceForm2.value.cafid,
        type: this.InvoiceForm2.value.subtype == 1 ? "pdf" : "sms/email"
      }
    }

    // console.log(data);

    if (data) {
      console.log("data : ", data)
      let rte = `package/getPckgesfrcafIdPdf`;
      var UrlSf = [];
      this.apiSerice.create(data, rte).subscribe((res) => {
      // console.log(res)
      this.cafTypes = res['data']
      for(let i=0; i< this.cafTypes.length; i++){
        console.log("this.cafTypes[i].cafid", this.cafTypes[i].caf_id);
        UrlSf.push(`https://bbnlbss.apsfl.co.in/apiv1/subscriberApp/invoice/${this.cafTypes[i].caf_id}/${data.year}/${data.month}`);
      }
      for(let i=0; i< this.cafTypes.length; i++){
        window.open(UrlSf[i])
      }
      console.log(UrlSf)
    })

    }
  }
  
  RetryFailedPdfs(idx) {

    // console.log(this.filterValues[idx]); 
    let rte = `/billing/retryPdfs`;
    this.showLdr = true;
    let data = {
      subtype: this.filterValues[idx].fle_typ == 'pdf' ? 1 : 2,
      custype: this.filterValues[idx].inve_cstmr_typ_id,
      district: this.filterValues[idx].invce_dstrt_id,
      year: this.filterValues[idx].invce_year,
      month: this.filterValues[idx].inve_mnth,
      cstmr_id: this.filterValues[idx].cstmr_id,
      caf_id: this.filterValues[idx].caf_id,
      type: this.filterValues[idx].fle_typ,
      pdf_gen_cnt: this.filterValues[idx].pdf_gen_cnt,
      sts_id: this.filterValues[idx].sts_id
    }
    // console.log(data);
    this.apiSerice.create(data, rte).subscribe((res) => {
      // console.log(res);

      this.showLdr = false;
      if (res['status'] == 200) {
        if (res['data'].err == 'gen') {
          this.snackBar.open("Already Generated", '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          return;
        } else {
          this.getgentpdf();
          this.filterValues[idx].pdf_gen_cnt = res['data'].pdf_gen_cnt;
          this.filterValues[idx].fld_gen_cnt = this.count - res['data'].pdf_gen_cnt;
          this.filterValues[idx].sts_txt = (res['data'].fld_gen_cnt == 0) ? 'completed' : 'partially completed';


          this.snackBar.open("Sucessfully Updated", '', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      }
    })
  }
  getMyGeneratedPdfs() {

    let rte = `/billing/mygenertdpdfs`;
    this.mnthcrnt = (new Date()).getMonth() - 1;
    this.currentyear = (new Date()).getFullYear();
    let data = {
      year: this.currentyear,
      month: this.mnthcrnt
    }
    this.loader = true;
    this.apiSerice.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        // console.log(res)
        this.mygendata = res['data']
        this.columnDefsRcrd = [
          { headerName: 'sno', field: 'sno', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "center" },
          { headerName: 'File Type', field: 'fle_typ', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'Invoice Year', field: 'invce_year', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'Invoice Month', field: 'inve_mnth', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'Total Count', field: 'ttl_cnt', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'PDF Generated Count', field: 'pdf_gen_cnt', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'Status', field: 'sts_txt', algnmnt: "center", cellClass: "pm-grid-number-cell", filter: true },

        ]
      }


    })

  }
  getRecntGeneratedPdfs() {
    let rte = `/billing/recntgenertdpdfs`;
    this.mnthcrnt = (new Date()).getMonth() - 1;
    this.currentyear = (new Date()).getFullYear();
    let data = {
      year: this.currentyear,
      month: this.mnthcrnt
    }
    this.loader = true;
    this.apiSerice.create(data, rte).subscribe((res) => {
      if (res['status'] == 200) {
        this.loader = false;
        // console.log(res)
        this.recntgendata = res['data']
        this.columnDefsRcrd1 = [
          { headerName: 'sno', field: 'sno', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "center" },
          { headerName: 'File Type', field: 'fle_typ', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'Invoice Year', field: 'invce_year', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'Invoice Month', field: 'inve_mnth', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'Total Count', field: 'ttl_cnt', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'PDF Generated Count', field: 'pdf_gen_cnt', cellClass: "pm-grid-number-cell", filter: true, algnmnt: "" },
          { headerName: 'Status', field: 'sts_txt', algnmnt: "center", cellClass: "pm-grid-number-cell", filter: true },

        ]
      }

    })
  }
  tabClick(tab) {
    // console.log(tab);
    if (tab.index == 0) {
      this.getgentpdf();
    }
    if (tab.index == 1) {
      this.getMyGeneratedPdfs();
    }
    if (tab.index == 2) {
      this.getRecntGeneratedPdfs();
    }
  }



}
