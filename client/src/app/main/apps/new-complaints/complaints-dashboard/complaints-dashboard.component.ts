import { Component, OnInit } from "@angular/core";
import { TransfereService } from "app/providers/transfer/transfer.service";
import { CrudService } from "app/main/apps/crud.service";
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from "@angular/material";
import { DialogData } from "app/main/apps/general/change-log/master/change-log/change-log-modal/change-log-modal.component";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { DxChartModule } from "devextreme-angular";
import { DsSidebarService } from "@glits/components/sidebar/sidebar.service";
import * as _ from "lodash";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
    selector: "app-complaints-dashboard",
    templateUrl: "./complaints-dashboard.component.html",
    styleUrls: ["./complaints-dashboard.component.scss"],
})

export class ComplaintsDashboardComponent implements OnInit {
    shwLdr = false;
    totalcompData: any;
    rowData: any;
    closecompData: any;
    opencompData: any;
    generalenquiryData: any;
    generalenquirytotltckts:any;
    generalenquirycalldrop: any;
    generalenquirynewconctn: any;
    resolvecompData: any;
    subscribeappData: any;
    prvsmnthtotltckts:any;
    prvsmntopentckts:any;
    prvsmntresolvetckts:any;
    prvsmntclsetckts:any;
    thismnthtotltckts:any;
    thismnthopentckts:any;
    thismnthresolvetckts:any;
    thismnthclsetckts:any;
    individualtotltckts:any;
    individualopentckts:any;
	permissions;
    individualrelvetckts:any;
    individualclsetckts:any;
    previousdayTotalTckts:any;
	columnDefs = [];
	slaincmplnt:  boolean = false;
    slaoutcmplnt:  boolean = false;
    todayTotalTckts:any;
	    thismnthenttckts=[{Close:0,Open:0,Resolved:0,Total_Tickets:0}];
    prvsmnthenttckts=[{Close:0,Open:0,Resolved:0,Total_Tickets:0}];
    thismnthenttcktslist:any;
    prvsmnthenttcktslist:any;
    // grossProductData:any;
    state: string;
    usrdtls: any;
    year2016: number;
    year2017: number;
    year2018: number;
    indivudualcard:boolean = true;
    BSSWebPortalcard:boolean = true;
    selectedMonth;
  selectedDate
  months = [{ id: 1, nm: 'January' }, { id: 2, nm: 'February' }, { id: 3, nm: 'March' }, { id: 4, nm: 'April' }, { id: 5, nm: 'May' }, { id: 6, nm: 'June' }, { id: 7, nm: 'July' }, { id: 8, nm: 'August' }, { id: 9, nm: 'Spetember' }, { id: 10, nm: 'October' }, { id: 11, nm: "November" }, { id: 12, nm: 'December' }]

  years: number[] = [];
  selectedYear;
  currentyear;
    public grossProductData = [{
        state: 'Illinois',
        year2016: 803,
        year2017: 823,
        year2018: 863,
      }];
    getHeaderDtls = function (): any {
        return {
            title: "Service & Help Desk Dashboard",
            icon: "people_outline",
        };
    };
    today: string;
    constructor(
        public TransfereService: TransfereService,
        public crdsrv: CrudService,
        public dialog: MatDialog,
        public route: ActivatedRoute,
        private router: Router    ) {
		this.permissions = { 'slct_in': 1, 'insrt_in': 0, 'updt_in': 1, 'dlte_in': 1, 'exprt_in': 1 };
            this.currentyear = (new Date()).getFullYear();
            var count = this.currentyear - 2016;
            for (var i = 0; i <= count; i++) {
              let yr = this.currentyear - i
              this.years.push(yr)
            }
            this.selectedYear = this.currentyear;
        }

    ngOnInit() {
        this.totalcomplaints();
        this.opencomplaints();
        this.resolvecomplaints();
        this.closecomplaints();
        this.generalenquirytckts();
        this.subscribeapptckts();
        this.generalenquirytotaltckts();
        this.generalenquiry_ticket_calldrop();
        this.generalenquiry_ticket_newconection();
        this.previousmnthtaltckts();
        this.previousmnthopntckts();
        this.previousmnthresolvetckts();
        this.previousmnthclsetckts();
        this.currentmnthtaltckts();
        this.currentmnthopntckts();
        this.currentmnthresolvetckts();
        this.currentmnthclsetckts();
        this.individualtaltckts();
        this.individualopntckts();
        this.individualresolvetckts();
        this.individualclsedtckts();
        this.previousdaytotaltickets();
        this.todaytotaltickets();
        this.user_login_data();
		this.entthistcktinsla();
        this.entprvstcktinsla();
        this.selectedDate = new Date();
        var date = new Date(),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        this.today = [date.getFullYear(), mnth, day].join("-");
        this.getHoulyLiveIptvSts(this.today);
        this.selectedMonth = date.getMonth() + 1
        var month = date.getMonth() + 1
        this.getMnthlyIptvSts(month,this.selectedYear);
    }
    getHoulyLiveIptvSts(today: string) {
        throw new Error("Method not implemented.");
    }
    getMnthlyIptvSts(month: number, selectedYear: any) {
        throw new Error("Method not implemented.");
    }
	    entthistcktinsla(){
        this.shwLdr = true;
            let rte = "subscriberApp/presentmnthenterprisetckts";
            // console.log(rte);

            this.crdsrv.get(rte).subscribe((res) => {
                this.thismnthenttckts = res["data"];
                //console.log(this.thismnthenttckts);
                this.shwLdr = false;

            });

    }
    entprvstcktinsla(){
        this.shwLdr = true;
            let rte = "subscriberApp/previousmnthenterprisetickets";
            // console.log(rte);
            this.crdsrv.get(rte).subscribe((res) => {

                this.prvsmnthenttckts = res["data"];
                // console.log(this.prvsmnthenttckts);
                this.shwLdr = false;

            });

    }
    prvsmnthentcomplaints_listview(ct){
        this.shwLdr = true;
        let rte = `subscriberApp/previousmnth_entrpriselist/${ct}`;
        // console.log(rte);
        this.slaincmplnt = true;
        this.slaoutcmplnt = false;
        this.crdsrv.get(rte).subscribe((res) => {

            this.prvsmnthenttcktslist = res["data"];
            // console.log(this.prvsmnthenttckts);
            this.shwLdr = false;
            let counter = 0;
            this.prvsmnthenttcktslist.filter((k) => {
                k['sno'] = ++counter;
              });
        });
        this.columnDefs = [
            { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
            { headerName: 'District Name', field: 'districtname', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
            { headerName: 'Caf ID', field: 'caf_id', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Type', field: 'caftype', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Ticket No', field: 'ticket_No', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
            { headerName: 'Organization', field: 'ent_orgn_name', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Complaint Source', field: 'comp_source', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Caller Type', field: 'callertype', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Issue Type', field: 'comp_ticket_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Complaint Category', field: 'Category', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Customer Mobile Number', field: 'alternate_mobile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Issue Owner', field: 'cmplnt_owner', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
            { headerName: 'Status', field: 'cmp_sts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
            { headerName: 'Assigned To', field: 'cmplnt_emp', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Created by', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true}, 
            { headerName: 'Created On', field: 'dateCreated', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Created Date', field: 'createdDate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Closed On', field: 'closedatetime', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Closed Date', field: 'closedate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Total Time', field: 'datediff', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Complaint Remarks', field: 'complaint', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'View', field: 'View', alignment: 'center', cellClass: 'pm-grid-number-cell', width:100, height: 40, columnFiltering: false},
          ];
          console.log("prev",this.columnDefs)
    }
    thismnthentcomplaints_listview(ct){
        this.shwLdr = true;
        let rte = `subscriberApp/presentmnth_entrpriselist/${ct}`;
        // console.log(rte);
        this.slaincmplnt = false;
        this.slaoutcmplnt = true;
        this.crdsrv.get(rte).subscribe((res) => {
            this.thismnthenttcktslist = res["data"];
            // console.log(this.prvsmnthenttckts);
            this.shwLdr = false;
            let counter = 0;
            this.thismnthenttcktslist.filter((k) => {
              k['sno'] = ++counter;
            });
        });
        this.columnDefs = [
            { headerName: 'Sno', field: 'sno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 80, dataType: 'number', filter: true },
            { headerName: 'District Name', field: 'districtname', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150, dataType: 'number', filter: true },
            { headerName: 'Caf ID', field: 'caf_id', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Type', field: 'caftype', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Ticket No', field: 'comp_ticketno', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'string' ,filter: true},
            { headerName: 'Organization', field: 'ent_orgn_name', alignment:'center', cellClass: 'pm-grid-number-cell', width: 100, dataType: 'number', filter: true },
            { headerName: 'Complaint Source', field: 'comp_source', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Caller Type', field: 'callertype', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Issue Type', field: 'comp_ticket_type', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'Complaint Category', field: 'Category', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Customer Mobile Number', field: 'alternate_mobile', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Issue Owner', field: 'cmplnt_owner', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
            { headerName: 'Status', field: 'cmp_sts', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true},
            { headerName: 'Assigned To', field: 'cmplnt_emp', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Created by', field: 'mrcht_usr_nm', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 100 ,filter: true}, 
            { headerName: 'Created On', field: 'dateCreated', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Created Date', field: 'createdDate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Closed On', field: 'closedatetime', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true}, 
            { headerName: 'Closed Date', field: 'closedate', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Total Time', field: 'datediff', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150 ,filter: true},
            { headerName: 'Complaint Remarks', field: 'complaint', alignment: 'center', cellClass: 'pm-grid-number-cell', width: 150,filter: true },
            { headerName: 'View', field: 'View', alignment: 'center', cellClass: 'pm-grid-number-cell', width:100, height: 40, columnFiltering: false},
          ];
          console.log("present",this.columnDefs)
    }
   

user_login_data(){
    this.usrdtls = JSON.parse(localStorage.getItem("usrDtls"));
    // console.log(this.usrdtls)
    // console.log(this.usrdtls.mnu_prfle_id)
    if(this.usrdtls.mnu_prfle_id =='1' )
    {
        this.indivudualcard = false;
    }
    else{
        this.indivudualcard = true;
    }

    if(this.usrdtls.mnu_prfle_id =='98')
    {
        this.BSSWebPortalcard = false;
    }
    else{
        this.BSSWebPortalcard = true;
    }
}

    totalcomplaints() {
        this.shwLdr = true;
        let rte = "subscriberApp/OCCIssueCountByCatgryResolveCtrl/0";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.totalcompData = res["data"][0]["count(*)"];
            // console.log(this.totalcompData);
            this.shwLdr = false;
        });
    }
    opencomplaints() {
        this.shwLdr = true;
        let rte = "subscriberApp/OCCIssueCountByCatgryResolveCtrl/1";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.opencompData = res["data"][0]["count(*)"];
            // console.log(this.opencompData);
            this.shwLdr = false;
        });
    }

    resolvecomplaints() {
        this.shwLdr = true;
        let rte = "subscriberApp/OCCIssueCountByCatgryResolveCtrl/2";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.resolvecompData = res["data"][0]["count(*)"];
            // console.log(this.resolvecompData);
            this.shwLdr = false;
        });
    }

    closecomplaints() {
        this.shwLdr = true;
        let rte = "subscriberApp/OCCIssueCountByCatgryResolveCtrl/3";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.closecompData = res["data"][0]["count(*)"];
            // console.log(this.closecompData);
            this.shwLdr = false;
        });
    }
    
    generalenquirytckts() {
        this.shwLdr = true;
        let rte = "subscriberApp/generalenquirecntdata/0";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            //  console.log(res['data'][0]['count']);
            this.generalenquiryData = res["data"][0]["count"];
            // console.log(this.generalenquiryData);
            this.shwLdr = false;
        });
    }

    generalenquirytotaltckts() {
        this.shwLdr = true;
        let rte = "subscriberApp/generalenquirecntdata/0";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            //  console.log(res['data'][0]['count']);
            this.generalenquirytotltckts = res["data"][0]["count"];
            // console.log(this.generalenquirytotltckts);
            this.shwLdr = false;
        });
    }

    generalenquiry_ticket_newconection() {
        this.shwLdr = true;
        let rte = "subscriberApp/generalenquirecntdata/1";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            //  console.log(res['data'][0]['count']);
            this.generalenquirynewconctn = res["data"][0]["count"];
            // console.log(this.generalenquirynewconctn);
            this.shwLdr = false;
        });
    }
    generalenquiry_ticket_calldrop() {
        this.shwLdr = true;
        let rte = "subscriberApp/generalenquirecntdata/2";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            //  console.log(res['data'][0]['count']);
            this.generalenquirycalldrop = res["data"][0]["count"];
            // console.log(this.generalenquirycalldrop);
            this.shwLdr = false;
        });
    }

    subscribeapptckts() {
        this.shwLdr = true;
        let rte = "subscriberApp/countcompstatus/1";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            console.log(res["data"][0]["count"]);
            this.subscribeappData = res["data"][0]["count"];
            // console.log(this.subscribeappData);
            this.shwLdr = false;
        });
    }



previousmnthtaltckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthismnthtckts/2/0";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['prvsmnth']);
        this.prvsmnthtotltckts = res["data"][0]['prvsmnth'];
        // console.log(this.prvsmnthtotltckts);
        this.shwLdr = false;
    });
}
previousmnthopntckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthismnthtckts/2/1";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['prvsmnth']);
        this.prvsmntopentckts = res["data"][0]['prvsmnth'];
        // console.log(this.prvsmntopentckts);
        this.shwLdr = false;
    });
}
previousmnthresolvetckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthismnthtckts/2/2";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['prvsmnth']);
        this.prvsmntresolvetckts = res["data"][0]['prvsmnth'];
        // console.log(this.prvsmntresolvetckts);
        this.shwLdr = false;
    });
}
previousmnthclsetckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthismnthtckts/2/3";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['prvsmnth']);
        this.prvsmntclsetckts = res["data"][0]['prvsmnth'];
        // console.log(this.prvsmntclsetckts);
        this.shwLdr = false;
    });
}


currentmnthtaltckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthismnthtckts/1/0";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['thismnth']);
        this.thismnthtotltckts = res["data"][0]['thismnth'];
        // console.log(this.thismnthtotltckts);
        this.shwLdr = false;
    });
}

currentmnthopntckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthismnthtckts/1/1";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['thismnth']);
        this.thismnthopentckts = res["data"][0]['thismnth'];
        // console.log(this.prvsmntopentckts);
        this.shwLdr = false;
    });
}

currentmnthresolvetckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthismnthtckts/1/2";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['thismnth']);
        this.thismnthresolvetckts = res["data"][0]['thismnth'];
        // console.log(this.thismnthresolvetckts);
        this.shwLdr = false;
    });
}

currentmnthclsetckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthismnthtckts/1/3";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['thismnth']);
        this.thismnthclsetckts = res["data"][0]['thismnth'];
        // console.log(this.thismnthclsetckts);
        this.shwLdr = false;
    });
}


individualtaltckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/CalcntrIssueByCatgry/0/0";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]["count"]);
        this.individualtotltckts = res["data"][0]["count"];
        // console.log(this.individualtotltckts);
        this.shwLdr = false;
    });
}

individualopntckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/CalcntrIssueByCatgry/0/1";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]["count"]);
        this.individualopentckts = res["data"][0]["count"];
        // console.log(this.individualopentckts);
        this.shwLdr = false;
    });
}

individualresolvetckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/CalcntrIssueByCatgry/0/2";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]["count"]);
        this.individualrelvetckts = res["data"][0]["count"];
        // console.log(this.individualrelvetckts);
        this.shwLdr = false;
    });
}

individualclsedtckts(){
    this.shwLdr = true;
    let rte = "subscriberApp/CalcntrIssueByCatgry/0/3";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]["count"]);
        this.individualclsetckts = res["data"][0]["count"];
        // console.log(this.individualclsetckts);
        this.shwLdr = false;
    });
}


todaytotaltickets(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthisdaytckts/1/0";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['today']);
        this.todayTotalTckts = res["data"][0]['today'];
        // console.log(this.todayTotalTckts);
        this.shwLdr = false;
    });
}

previousdaytotaltickets(){
    this.shwLdr = true;
    let rte = "subscriberApp/prvsthisdaytckts/2/0";
    // console.log(rte);
    this.crdsrv.get(rte).subscribe((res) => {
        console.log(res["data"][0]['prvsday']);
        this.previousdayTotalTckts = res["data"][0]['prvsday'];
        // console.log(this.previousdayTotalTckts);
        this.shwLdr = false;
    });
}

    total_ticket() {
        this.router.navigate([`admin/cmplnts/view_complaint`]);
    }
    open_ticket() {
        this.router.navigate([`admin/cmplnts/open_complaint`]);
    }
    resolve_ticket() {
        this.router.navigate([`admin/cmplnts/resolve_complaint`]);
    }
    close_ticket() {
        this.router.navigate([`admin/cmplnts/close_complaint`]);
    }
    general_ticket() {
        this.router.navigate([`admin/cmplnts/general_enquiry`]);
    }
    general_ticket_calldrop() {
        this.router.navigate([`admin/cmplnts/general_enquiry`]);
    }
    general_ticket_newconection() {
        this.router.navigate([`admin/cmplnts/general_enquiry`]);
    }
    subcribe_ticket() {
        this.router.navigate([`admin/cmplnts/subscribe_app_tckts`]);
    }
    todaycomplaints_listview(){
        this.router.navigate([`admin/cmplnts/today_complaints`]);
    }
    previousdaycomplaints_listview(){
        this.router.navigate([`admin/cmplnts/previousday_complaints`]);
    }

    onPointClick(e) {
        e.target.select();
      }
      

      selectmnth(){
        console.log("in month")
        this.getMnthlyIptvSts(this.selectedMonth,this.selectedYear)
      }
}
