import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransfereService } from "app/providers/transfer/transfer.service";
import { CrudService } from "app/main/apps/crud.service";
import { DsSidebarService } from "@glits/components/sidebar/sidebar.service";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatDialogRef,
  MatSnackBar,
  MatDialog,
  MAT_DIALOG_DATA,

} from "@angular/material";
import { DeleteDialogComponent } from "app/main/shared/components/delete-dialog/delete-dialog.component";
import { exit } from "process";
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from "rxjs";
import { Category } from "aws-sdk/clients/support";
import * as moment from "moment";
//import { underline } from "../../../../../../node_modules/colors/safe";
@Component({
  selector: 'app-accounting-ledger',
  templateUrl: './accounting-ledger.component.html',
  styleUrls: ['./accounting-ledger.component.scss']
})
export class AccountingLedgerComponent implements OnInit {
  [x: string]: any;
  picker1: any;
  permissions;
  columnDefs;
  checkfromDate;
  checktoDate;
  date = new FormControl(new Date());
  ledgerreportsData: FormGroup;
  Reports: any;
  public toDate: Date;
  public fromDate: Date;
  myDateValue: any;
  sdeMnuLdr = false;
  public cstmrData: any;
  ledger_type: any;
  complaint_source: any;
  lmoinput: boolean = false;
  lmotype: boolean = true;
  employeeDetails: any;
  org;
  suborg;
  getreport: boolean = false;
  pdfData; rowpdfdata;

  // provisionCharges: any = 'N/A';
  // pkge = [];
  // pack_nm: any = 'N/A';
  // add_on: any = 'N/A';
  // frm_dt: any = 'N/A';
  // to_dt: any = 'N/A';
  // total_Price: any = 0;
  // no_months: any = 1;

  serializedDate = new FormControl(new Date().toISOString());
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  getHeaderDtls = function () {
    return { title: "APSFL - LMO Account Ledger", icon: "people_outline" };
  };
  public filteredBanks: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);

  constructor(private _dsSidebarService: DsSidebarService,
    private http: HttpClient,
    private router: Router,
    private _formBuilder: FormBuilder,
    private crdsrv: CrudService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public TransfereService: TransfereService) { this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 }; }

  ngOnInit() {
    this.user_data();
    let lmocode = /^(?:[a-zA-Z][a-zA-Z-][a-zA-Z][0-9]{1,15})$/
    if (this.admin_type) {
      this.ledgerreportsData = this._formBuilder.group({
        fromDate: [null, Validators.required],
        toDate: [null, Validators.required],
        ledger_type: ['', [Validators.required, Validators.pattern(lmocode)]],
        cafid: ['',Validators]
      });
    } else {
      this.ledgerreportsData = this._formBuilder.group({
        fromDate: [null, Validators.required],
        toDate: [null, Validators.required],
        ledger_type: ['', Validators],
        cafid: ['',Validators]
      });
    }


  }

  user_data() {
    this.usrdtls = JSON.parse(localStorage.getItem("usrDtls"));
    console.log(this.usrdtls)
    console.log(this.usrdtls.usr_ctgry_id)
    if (this.usrdtls.usr_ctgry_id == '8') {
      this.admin_type = false;
      this.lmotype = false;
    } else if (this.usrdtls.usr_ctgry_id == '1') {
      this.admin_type = false;
      this.lmotype = true;
    } else {
      this.admin_type = true;
      this.lmotype = true;
    }

  }

  ledgerDate() {
    console.log("this.ledgerreportsData",this.ledgerreportsData)
    if(this.ledgerreportsData.value.cafid){
      console.log("this.ledgerreportsData.value",this.ledgerreportsData.value.cafid);
      this.ledgerreportsData.get('fromDate').setErrors(null);
      this.ledgerreportsData.get('toDate').setErrors(null);
      console.log("this.ledgerreportsData after null",this.ledgerreportsData)
    }

    if (this.ledgerreportsData.invalid) {
      this.snackBar.open("Please Enter Valid Data", '', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
    else {
      this.ledgerreportsData.value['fromDate'] = this.datePipe.transform(this.ledgerreportsData.value.fromDate, 'yyyy-MM-dd');
      this.ledgerreportsData.value['toDate'] = this.datePipe.transform(this.ledgerreportsData.value.toDate, 'yyyy-MM-dd');
	  this.checktoDate = new Date(this.ledgerreportsData.value['toDate']);
      this.checkfromDate = new Date(this.ledgerreportsData.value['fromDate']);
      var diff = Math.abs(this.checktoDate - this.checkfromDate);
       var remaining_days = Math.floor(diff / 86400000);
       console.log("remaining_days",remaining_days);
      var data = {
        frmdate: this.ledgerreportsData.value["fromDate"],
        todate: this.ledgerreportsData.value["toDate"],
        ledger_type: this.ledgerreportsData.value["ledger_type"],
        cafid: this.ledgerreportsData.value["cafid"],
      };
      if(this.usrdtls.usr_ctgry_id == 8){
        if (remaining_days < 93) {
          console.log(data);
          this.searchLoader = true;
          this.crdsrv.create(data, "lmoprepaid/faccountingwebledger").subscribe((res) => {
            this.ledgerreportsData.reset();
            this.ledgerReports = res["data"];
            console.log(this.ledgerReports);
            this.getreport = true;
            this.searchLoader = false;
            if (res['perm']) {
              this.permissions = res['perm'][0];
            } else {
              this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
            }
            let counter = 0;
            this.ledgerReports.filter((k) => {
              k['s_no'] = ++counter;
            });
  
          });
  
          this.columnDefs = [
            { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
			{ headerName: 'Caf ID', field: 'cust_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
			{ headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string', filter: true },
			{ headerName: 'LMO Code', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			{ headerName: 'Description', field: 'remarks', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, filter: true },
			{ headerName: 'Open Balance', field: 'open_bal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string', filter: true },
			{ headerName: 'Amount', field: 'amount', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			{ headerName: 'Close Balance', field: 'close_bal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			{ headerName: 'Created Date', field: 'date_created', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			{ headerName: 'start Date', field: 'startdate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			{ headerName: 'end Date', field: 'enddate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
			// { headerName: 'Action', field: 'print', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},  
          ];
        } else {
          this.snackBar.open(`Please Select Days Range between 1 to 93 DAYS, You are searching for ${remaining_days} days data`, '', {
            duration: 3000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      } else { 
      if(remaining_days < 31){

      console.log(data);
      this.searchLoader = true;
      this.crdsrv.create(data, "lmoprepaid/faccountingwebledger").subscribe((res) => {
        this.ledgerreportsData.reset();
        this.ledgerReports = res["data"];
        console.log(this.ledgerReports);
        this.getreport = true;
        this.searchLoader = false;
        if (res['perm']) {
          this.permissions = res['perm'][0];
        } else {
          this.shwPermMsg = 'You do not have permissions to do this operation. Please contact Administrator to get permissions.';
        }
        let counter = 0;
        this.ledgerReports.filter((k) => {
          k['s_no'] = ++counter;
        });

      });

      this.columnDefs = [
        { headerName: 'Sno', field: 's_no', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
        { headerName: 'Caf ID', field: 'cust_id', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
        { headerName: 'Customer Name', field: 'cstmr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string', filter: true },
        { headerName: 'LMO Code', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        { headerName: 'Description', field: 'remarks', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 250, filter: true },
        { headerName: 'Open Balance', field: 'open_bal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'string', filter: true },
        { headerName: 'Amount', field: 'amount', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        { headerName: 'Close Balance', field: 'close_bal', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        { headerName: 'Created Date', field: 'date_created', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        { headerName: 'start Date', field: 'startdate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        { headerName: 'end Date', field: 'enddate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, filter: true },
        // { headerName: 'Action', field: 'print', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
      ];
	  } else {
      this.snackBar.open(`Please Select Days Range between 1 to 31 DAYS, You are searching for ${remaining_days} days data`, '', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
	}
    }

  }
  a = [
    '',
    'One ',
    'Two ',
    'Three ',
    'Four ',
    'Five ',
    'Six ',
    'Seven ',
    'Eight ',
    'Nine ',
    'Ten ',
    'Eleven ',
    'Twelve ',
    'Thirteen ',
    'Fourteen ',
    'Fifteen ',
    'Sixteen ',
    'Seventeen ',
    'Eighteen ',
    'Nineteen '];
  b = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety'];

  transform(value: any): any {
    if (value) {
      let number = parseFloat(value).toFixed(2).split(".")
      let num = parseInt(number[0]);
      let digit = parseInt(number[1]);
      if (num) {
        if ((num.toString()).length > 9) { return ''; }
        const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        const d = ('00' + digit).substr(-2).match(/^(\d{2})$/);
        if (!n) { return ''; }
        let str = '';
        str += (Number(n[1]) !== 0) ? (this.a[Number(n[1])] || this.b[n[1][0]] + ' ' + this.a[n[1][1]]) + 'Crore ' : '';
        str += (Number(n[2]) !== 0) ? (this.a[Number(n[2])] || this.b[n[2][0]] + ' ' + this.a[n[2][1]]) + 'Lakh ' : '';
        str += (Number(n[3]) !== 0) ? (this.a[Number(n[3])] || this.b[n[3][0]] + ' ' + this.a[n[3][1]]) + 'Thousand ' : '';
        str += (Number(n[4]) !== 0) ? (this.a[Number(n[4])] || this.b[n[4][0]] + ' ' + this.a[n[4][1]]) + 'Hundred ' : '';
        str += (Number(n[5]) !== 0) ? (this.a[Number(n[5])] || this.b[n[5][0]] + ' ' + this.a[n[5][1]]) + 'Rupee ' : '';
        str += (Number(d[1]) !== 0) ? ((str !== '') ? "and " : '') + (this.a[Number(d[1])] || this.b[d[1][0]] + ' ' + this.a[d[1][1]]) + 'Paise Only' : 'Only';
        return str;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }




  parseDateToddMMyyyy(value: any): string {
    this.inputPattern = "yyyy-MM-dd HH:mm:ss"
    this.outputPattern = "dd-MMM-yyyy h:mm a"
    this.inputFormat = this.SimpleDateFormat(this.inputPattern)
    this.outputFormat = this.SimpleDateFormat(this.outputPattern)
    this.date = null
    this.str = null
    this.date = this.inputFormat.parse(value)
    this.str = this.outputFormat.format(this.date)
    return this.str
  }




  async DownloadPdf(data) {
    console.log(data.data);

    if (data.data.money_type.toUpperCase() == "DEBIT") {
      console.log("Debit Receipt");

      this.provisionCharges = 'N/A';
      this.pkge = [];
      this.pack_nm = 'N/A';
      this.add_on = 'N/A';
      this.frm_dt = 'N/A';
      this.to_dt = 'N/A';
      this.total_Price = 0;
      this.no_months = 1;
      this.cpe_chr = 0;
      this.date_cre = 'N/A';


      if (data.data.cpe_chrge != null) {
        this.cpe_chr = data.data.cpe_chrge
      }

      if (data.data.date_created != null) {
        this.date_cre = data.data.date_created
      }



      if ((data.data.remarks != null) && (data.data.remarks.length > 25)) {

        this.remarksArray = data.data.remarks.toString().split("(")
        this.remarksDateArray = data.data.remarks.toString().split("to")
        this.remarksDaysAmount = data.data.remarks.toString().split("days amount")

        this.pack_nm = this.remarksArray[0]
        if (data.data.startdate != null && data.data.enddate != null && data.data.mnths != null) {
          this.frm_dt = data.data.startdate!!.substring(0, 11).toString()
          this.to_dt = data.data.enddate!!.substring(0, 11).toString()
          this.no_months = data.data.mnths!!


        } else {
          this.frm_dt = this.remarksDateArray[0].substring(this.remarksDateArray[0].length - 11, this.remarksDateArray[0].length)
          //this.to_dt = data.data.remarks.substringAfter("to").replace(")","")

          this.vr_dt = data.data.remarks.split("to", 2);
          this.to_dt = this.vr_dt[1].replace(")", "")
          //console.log("hello" + this.to_dt);

          this.no_Days = this.remarksDaysAmount[0].substring(this.remarksDaysAmount[0].length - 4, this.remarksDaysAmount[0].length).trim()
          this.no_months = this.no_Days / 30

          //console.log("chiru" + this.no_months)
          //console.log("world" + data.data.startdate != null && data.data.enddate != null && data.data.mnths != null)


        }
      }


      if (data.data.operation != null && data.data.operation == "Provision") {
        this.provisionCharges = "Rs.60"
      }


      if (data.data.startdate != null) {
        this.frm_dt = data.data.startdate
      }

      if (data.data.enddate != null) {
        this.to_dt = data.data.enddate
      }


      // this.pkge = data.data.remarks.split("(", 3);
      // this.pack_nm = this.pkge[0]
      //console.log("this is hello" + this.pkge);



      if (data.data.mnths != null) {
        this.no_months = data.data.mnths
      }

      // if (data.data.pack_price != null) {
      //   if (this.provisionCharges == "N/A") {
      //     if (this.cpe_chr != null) {
      //       this.total_Price = ((data.data.pack_price!! * this.no_months) + this.cpe_chr).toString()
      //     } else {
      //       this.total_Price = (data.data.pack_price!! * this.no_months).toString()
      //     }
      //   } else {
      //     this.total_Price = (data.data.pack_price!! * this.no_months + 60).toString()
      //   }
      // } 

      if (data.data.pack_amount != null) {
        {
          if (this.provisionCharges == "N/A") {
            if (this.cpe_chr != null) {
              this.total_Price = ((data.data.pack_amount!! * this.no_months) + this.cpe_chr).toString()
            } else {
              this.total_Price = (data.data.pack_amount!! * this.no_months).toString()
            }
          } else {
            this.total_Price = (data.data.pack_amount!! * this.no_months + 60).toString()
          }
        }
      }




      if (data.data.operation != null && data.data.operation == "add on") {
        this.pkge = data.data.remarks.split("(", 3);
        this.add_on = this.pkge[0]
        this.total_Price = data.data.pack_amount
      } else {
        this.pkge = data.data.remarks.split("(", 3);
        this.pack_nm = this.pkge[0]
      }



      if (data.data.operation == "Resume") {
        if (data.data.pckge_type_id == "2") {
          this.total_Price = data.data.pack_amount
          this.pkge = data.data.remarks.split("(", 3);
          this.add_on = this.pkge[0]
        }
      }

      if (data.data.operation == "30_days_Suspended_caf") {
        this.total_Price = data.data.pack_amount
      }



      var dd = {
        content: [
          [{
            //image: await this.getBase64ImageFromURL("assets/images/apfiber_logo.png"),
            image: await this.getBase64ImageFromURL("assets/images/apsfl-head.png"),
            width: 500,
            height: 80,
            alignment: 'center' // Default... not actually required.
          },
            // {
            //   image: await this.getBase64ImageFromURL("assets/images/APSFL.png"),
            //   width: 200,
            //   height: 50,
            //   alignment: 'left' // Default... not actually required.
            // },
          ],
          // { style: 'h1', text: 'APSFL', fontSize: 22, color: '#800000', alignment: 'center' },
          // { style: 'h2', text: 'website : http://apsfl.com/', fontSize: 11, alignment: 'center' },
          { style: 'h2', text: '', fontSize: 11, alignment: 'center' },
          { style: 'h1', text: 'Payment Acknowledgement', bold: true, fontSize: 15, color: '#000', alignment: 'center', width: 300, margin: 10, Text: 'underline' },


          {
            //layout: 'lightHorizontalLines', // optional
            //padding: [50, 0, 50, 0], 

            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              widths: [150, 90, 150, 90],
              headerRows: 13,
              color: '#444',
              fontSize: 15,


              body: [
                // [{ text: '',src:'assets/images/logos/glits_D.png', bold: true }, { text: '', bold: true }, { text: 'AndhraPradesh State Fibernet Limited', bold: true },],
                //['', '', '', ''],

                //[{ text: 'Customer Details', bold: true, alignment: 'center', colSpan: 3 }],
                [{ text: 'Customer Details', bold: true, margin: [5, 5, 5, 5], alignment: 'center', colSpan: 4 }, '', '', ''],
                [{ text: 'CAF Id', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.cust_id, margin: [5, 5, 5, 5] }, { text: 'Subscriber Id', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.sbscr_code, margin: [5, 5, 5, 5] }],
                [{ text: 'Customer Name', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.cstmr_nm, margin: [5, 5, 5, 5] }, { text: 'Contact details', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.mbl_nu, margin: [5, 5, 5, 5] }],
                [{ text: 'CAF Activation Date', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.caf_actvn_dt, margin: [5, 5, 5, 5] }, { text: 'LMO Code', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.mrcht_usr_nm, margin: [5, 5, 5, 5] }],
                [{ text: 'Transaction Details', bold: true, margin: [5, 5, 5, 5], alignment: 'center', colSpan: 4 }, '', '', ''],
                [{ text: 'Transaction Id', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.receipt_id, margin: [5, 5, 5, 5] }, { text: 'Date & Time', bold: true, margin: [5, 5, 5, 5] }, { text: this.date_cre, margin: [5, 5, 5, 5] }],
                [{ text: 'Package Name', bold: true, margin: [5, 5, 5, 5] }, { text: this.pack_nm, margin: [5, 5, 5, 5] }, { text: 'Transaction type', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.operation, margin: [5, 5, 5, 5] }],
                [{ text: 'Package Price', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.pack_amount, margin: [5, 5, 5, 5] }, { text: 'New Caf Provisional Charges', bold: true, margin: [5, 5, 5, 5] }, { text: this.provisionCharges, margin: [5, 5, 5, 5] }],
                [{ text: 'ADD On Channels/Bouquet price', bold: true, margin: [5, 5, 5, 5] }, { text: this.add_on, margin: [5, 5, 5, 5] }, { text: 'Additional CPE Charges for Idle time (period should mention)', bold: true, margin: [5, 5, 5, 5] }, { text: this.cpe_chr, margin: [5, 5, 5, 5] }],
                [{ text: 'Other If Any', bold: true, margin: [5, 5, 5, 5] }, { text: 'N/A', margin: [5, 5, 5, 5] }, { text: 'Total Price', bold: true, margin: [5, 5, 5, 5] }, { text: this.total_Price, margin: [5, 5, 5, 5] }],
                [{ text: 'In words', bold: true, margin: [5, 5, 5, 5] }, { text: this.transform(this.total_Price), margin: [5, 5, 5, 5], colSpan: 3 }],
                [{ text: 'Validity From', bold: true, margin: [5, 5, 5, 5] }, { text: this.frm_dt.substring(0, 11), margin: [5, 5, 5, 5] }, { text: 'Valid to', bold: true, margin: [5, 5, 5, 5] }, { text: this.to_dt.substring(0, 11), margin: [5, 5, 5, 5] }],
                [{ text: 'Description of Transaction', bold: true, margin: [5, 5, 5, 5] }, { text: data.data.remarks, margin: [5, 5, 5, 5], colSpan: 3, }],


                // ['Transaction ID', ':', data.data.f_ac_id],             
                // ['Package Name', ':', data.data.remarks],
                // ['Price(₹)', ':', '₹' + data.data.pack_amount],
                // ['if any Add on`s , HSI', ':', data.data.remarks],
                // ['Ref.No', ':', data.data.cust_id],
                // ['Date and Time', ':', data.data.date_created],
                // ['Payment Mode', ':', data.data.money_type],
                // ['LMO', ':', data.data.mrcht_usr_nm],
                // ['New CAF Activation Charges', ':', '₹ 0'],
                // ['in Words', ':', this.transform(data.data.pack_amount)],


              ]
            }

          },

          {
            //image: await this.getBase64ImageFromURL("assets/images/apfiber_logo.png"),
            image: await this.getBase64ImageFromURL("assets/images/apsfl-footer.png"),
            width: 500,
            height: 80,
            margin: 10,
            alignment: 'center' // Default... not actually required.
          },

        ],

        // content1: [
        //   [{
        //     //image: await this.getBase64ImageFromURL("assets/images/apfiber_logo.png"),
        //     image: await this.getBase64ImageFromURL("assets/images/apsfl-footer.png"),
        //     width: 1000,
        //     height: 50,
        //     alignment: 'center' // Default... not actually required.
        //   }],
        // ]

        // footer: function (page, pages) {
        //   return { columns: ['***Powered by APSFL***', { alignment: 'center', text: 'Regd office:3rd Floor,Admninistartive Block,Pandit Nehru Bus station,vijayawada-520013', italics: true }], margin: [10, 0] };
        // }

        // footer: function (page, pages) {
        //   return { columns: [{ alignment: 'center', text: 'Regd office:3rd Floor,Admninistartive Block,Pandit Nehru Bus station,vijayawada-520013', italics: true }], margin: [10, 0] };
        // }


      };

      // const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
      pdfMake.createPdf(dd).download('Payment Receipt.pdf');
      // var myArray = []
      // this.isPdfDwnLd = $event;
      // this.pdfPagesize = 'A3';
      // this.PdfpageOrientation = 'landscape';
      // this.pdfheaderRows = 1;
      // this.ReportHeader = 'Payment Receipt';
      // console.log(data.data);
      // console.log($event)
      // this.pdftableData = this.rowpdfdata=data.data;
      // for (var r = 0; r < this.cloumdata.length; r++) {
      //   for (var m = 0; m < this.rowpdfdata.length; m++) {
      //     var keysdata = Object.keys(this.rowpdfdata[m])
      //     for (var k = 0; k < keysdata.length; k++) {
      //       if (keysdata[k] == this.cloumdata[r].field) {
      //         var key = this.cloumdata[r].headerName;
      //         var obj = {};
      //         obj[key] = this.rowpdfdata[m][keysdata[k]];
      //         Object.assign(this.rowpdfdata[m], obj);
      //       }
      //     }
      //   }
      // }
      // for (var s = 0; s < this.cloumdata.length; s++) {
      //   myArray.push(this.cloumdata[s].headerName);
      // }

      // this.tableHeadersWthDataValues = myArray;
      // this.fileName = 'Payment Receipt';
    } else {
      console.log("Credit Receipt");

    }
  }



  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }
}
