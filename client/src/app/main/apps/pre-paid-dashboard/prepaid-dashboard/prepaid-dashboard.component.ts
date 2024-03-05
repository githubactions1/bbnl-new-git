import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../crud.service';
import { TransfereService } from "app/providers/transfer/transfer.service";
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';


@Component({
    selector: 'app-prepaid-dashboard',
    templateUrl: './prepaid-dashboard.component.html',
    styleUrls: ['./prepaid-dashboard.component.scss']
})
export class PrepaidDashboardComponent implements OnInit {
    getHeaderDtls = function (): any {
        return {
            title: "Prepaid Dashboard",
            icon: "people_outline",
        };
    };
    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    shwLdr: boolean;
    totalcafsData: any;
    activecafsData: any;
    suspendedcafsData: any;
    terminatedcafsData: any;
    terminatedpendingcafsData: any;
    suspendpendingcafsData: any;
    ResumependingcafsData: any;
    PendingrequestsData: any;
    BoxchangeData: any;
    PonChangeData: any;
    TodayExpiredcafsData: any;
    MonthlyRenewedcafsData: any;
    TodayrenewedcafsData: any;
    OnlinecollectionData: any;
    TodayrevenueData: any;
    MonthlyrevenueData: any;
    MonthlycollectionData: any;
    totalprepaidlmodata: any;
    lmodata: any;
    TodaycollectionData: any;
    advancerenewalcafs: any;
    advancerenewalcafsData: any;
    onlinecollectionmtd: any;
    onlinecollectiontoday: any;
    todayadvancerenewedcafsData: any;
    previousdaysuspendedcafsData: any;
    TodayrevshareAlacarteData: any;
    MonthlyrevshareAlacarteData: any;
    TodayplanchangeData: any;
    MonthlyplanchangeData: any;
    TodayterminateinitiateData: any;
    MonthlyterminateinitiateData: any;
    selectcaflmodstrt : any
    allalacartecount;
    usrdtls: any;
    gridColumnDefs = [];
    gridData = [];
    ShowGr: boolean = false;
    card2: boolean;
    cardType: any;
    showOne: boolean;
    showTwo: boolean;
    showThree: boolean;
    showFour: boolean;
    showFive: boolean;
    showSix: boolean;
    showSeven: boolean;
    showEight: boolean;
    showNine: boolean;
    showTen: boolean;
    showEleven: boolean;
    showTwelve: boolean;
    showThirteen: boolean;
    dstrctLst: any;
    showFourteen: boolean;
    showFifteen: any;
    showSixteen: boolean;
    showSeventeen: boolean;
    showEighteen: boolean;
    showNineteen: boolean;
    showTwenty: boolean;
    showTwentyOne: boolean;
    showTwentyTwo: boolean;
    showTwentyThree: boolean;
    showTwentyFour: boolean;
    showTwentyFive: boolean;
    showTwentySix: boolean;
    showTwentySeven: boolean;
    showTwentyEight: boolean;
    showTwentyNine: boolean;
    showThirty: boolean;
    showThirtyOne: boolean;
    showThirtyTwo: boolean;
    showThirtyThree: boolean;
    showThirtyFour: boolean;
    showThirtyFive : boolean;
    showThirtySix : boolean;
    showThirtySeven : boolean;
    showThirtyEight : boolean;
    showThirtyNine : boolean;
    showForty : boolean;
    showFortyOne : boolean;
    showFortyTwo : boolean;
    showFortyThree : boolean;
    showFortyFour : boolean;
    showFortyFive : boolean
    showFortySix : boolean;
    showFortySeven : boolean;
    showFortyEight : boolean;
    showFortyNine : boolean;
    showFifty : boolean;
    showFiftyOne : boolean;
    edibtnenble: boolean = false;

    usrcatid: boolean = false;
    manilsts: boolean = false;
    dstrtslcted: boolean = false;
    slctdDstrt;
    shwDstrctDrpdwn;
    totalprepaidcafsData = [
        { Total_CAF_count: 0, Active: 0, Pending_Activation: 0, Box_Change_Initiated: 0, Terminated: 0, Pon_Change_Initiated: 0, Termination_Pending: 0, Suspend_Pending: 0, Resume_Pending: 0, Suspended: 0 }
    ];
    totalprepaidcafsplnsData = [
        { homeminicafs: 0, homebasiccafs: 0, homeessentialcafs: 0, homepremiumcafs: 0, homelifecafs: 0, homeultracafs: 0, homepiecafs: 0, homegoldcafs: 0, homegoldpluscafs: 0, homeplatinumcafs: 0,
        ootminicafs : 0 , ottmaxicafs : 0 , ootprimecafs : 0, testhsi60 : 0, testhsi100: 0, homestandard: 0, testpack: 0 }
    ];
    AlapostlistData = [{ AlacarteData: 0 }];

    AlacarteData: any;
    planchngData: any;
    terminateData: any;

    nxtvalue: number = 0;

    nxtData: any = '';



    constructor(public TransfereService: TransfereService,
        public crdsrv: CrudService,
        public dialog: MatDialog,
        public _snackBar: MatSnackBar,
        public route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.ngonitgetLmoWiseData();
        this.ngonitgetallbasepacksdata(false, null);
        this.ngonitgetallalacartepacksdata(false, null);
        //this.totalcafs(false,null);
        // this.Activecafs(false,null);
        //this.Suspendedcafs(false,null);
        //this.Terminatedcafs(false,null);
        // this.Terminatedpendingcafs(false,null);
        // this.Suspendpendingcafs(false,null);
        // this.Resumependingcafs(false,null);
        // this.Pendingrequests(false,null);
        // this.Boxchange(false,null);
        // this.PonChange(false,null);
        this.TodayExpiredcafs(false, null);
        this.MonthlyRenewedcafs(false, null);
        this.Todayrenewedcafs(false, null);
        this.Onlinecollection(false, null);
        this.Todayrevenue(false, null);
        this.Monthlyrevenue(false, null);
        this.Monthlycollection(false, null);
        this.Todaycollection(false, null);
        this.Lmodata(false, null);
        this.Advancerenewalcafs(false, null);
        this.OnlineCollectionMtd(false, null);
        this.OnlineCollectionToday(false, null);
        this.todayadvancerenewedcafs(false, null);
        this.previousdaysuspendedcafs(false, null);
        //this.Alacarte(false, null);
        //this.planchng(false, null);
        //this.terminate(false, null);
        this.TodayRevshareAlacarte(false, null);
        this.MonthlyRevshareAlacarte(false, null);
        this.TodayPlanChange(false, null);
        this.MonthlyPlanChange(false, null);
        this.TodayTerminateInitiate(false, null);
        this.MonthlyTerminateInitiate(false, null);



        this.usrdtls = JSON.parse(localStorage.getItem("usrDtls"));
        console.log(this.usrdtls)
        if (this.usrdtls.usr_ctgry_id == 1 || this.usrdtls.usr_ctgry_id == 2) {
            this.manilsts = true
        }
        if (this.usrdtls.usr_ctgry_id == 2) {
            this.dstrtslcted = true;
            this.selectedDstrct = this.usrdtls.hyrchy_grp_id
        }
        if (this.usrdtls.usr_ctgry_id == 1) {
            //if (this.usrdtls.mrcht_usr_id == 101000156) {
            this.manilsts = true
        }
        if (this.usrdtls.usr_ctgry_id == 1) {
            this.usrcatid = true
        }
        // if(this.usrdtls.usr_ctgry_id == 8){
        //     this.usrcatid = true
        // }
        if (this.usrdtls.hyrchy_grp_id == null) {
            this.shwDstrctDrpdwn = true;
            const rte = `admin/districts`;
            this.crdsrv.get(rte).subscribe((res) => {
                this.dstrctLst = res['data'];
                // tslint:disable-next-line:triple-equals
                if (this.slctdDstrt == undefined) {
                    this.slctdDstrt = 15;
                    this.dstrtslcted = false
                }
            });
        } else {
            this.shwDstrctDrpdwn = false;
        }
    }
    selectedDstrct(data): any {
        this.selectcaflmodstrt = data.value;
    }


    // AlaList(data): any {
    //     this.AlaList = data.value;     

    // }

    getLmoWiseData(): any {
        this.dstrtslcted = true;
        this.slctdDstrt = this.selectcaflmodstrt;
        this.ngonitgetallbasepacksdata(true, null);
        this.ngonitgetallalacartepacksdata(true, null);
        this.TodayExpiredcafs(true, null);
        this.MonthlyRenewedcafs(true, null);
        this.Todayrenewedcafs(true, null);
        this.Onlinecollection(true, null);
        this.Todayrevenue(true, null);
        this.Monthlyrevenue(true, null);
        this.Monthlycollection(true, null);
        this.Todaycollection(true, null);
        this.Lmodata(true, null);
        this.Advancerenewalcafs(true, null);
        this.OnlineCollectionMtd(true, null);
        this.OnlineCollectionToday(true, null);
        this.todayadvancerenewedcafs(true, null);
        this.previousdaysuspendedcafs(true, null);
        //this.Alacarte(true, null);
        //this.planchng(true, null);
        //this.terminate(true, null);
        this.TodayRevshareAlacarte(true, null);
        this.MonthlyRevshareAlacarte(true, null);
        this.TodayPlanChange(true, null);
        this.MonthlyPlanChange(true, null);
        this.TodayTerminateInitiate(true, null);
        this.MonthlyTerminateInitiate(true, null);


        this.shwLdr = true;
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: true
        };
        let rte = "lmoprepaid/prepaidcafdstrtcount";
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.totalprepaidcafsData = res["data"];
            console.log(this.totalprepaidcafsData);
            this.shwLdr = false;
        });
    }
    ngonitgetLmoWiseData(): any {
        this.shwLdr = true;
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: false
        };
        let rte = "lmoprepaid/prepaidcafdstrtcount";
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.totalprepaidcafsData = res["data"];
            console.log(this.totalprepaidcafsData);
            this.shwLdr = false;
        });
    }
    totalcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/totalprepaidcafcount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.totalcafsData = res["data"][0]["count"];
            console.log(this.totalcafsData);
            this.shwLdr = false;
        });
    }
    ngonitgetallbasepacksdata(fltr, data){
        this.shwLdr = true;
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        console.log("lmoData",lmoData)
        let rte = "lmoprepaid/allbasepackscount";
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.totalprepaidcafsplnsData = res["data"];
            console.log("lmoprepaid/allbasepackscount",this.totalprepaidcafsplnsData);
            this.shwLdr = false;
        });
    }
    ngonitgetallalacartepacksdata(fltr, data){
        this.shwLdr = true;
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        let rte = "lmoprepaid/allalacartepackscount";
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.allalacartecount = res["data"][0]['count'];
            console.log("lmoprepaid/allalacartepackscount",this.allalacartecount);
            this.shwLdr = false;
        });
    }

    getData(type) {
        //this.key = (type)
        console.log('Get Data using Filters', type);
        this.cardType = this.getgridCardName(type);
        this.nxtvalue = 0;
        if (type == 1) {
            this.getCard1();
        } else if (type == 2) {
            this.getCard2();
        } else if (type == 3) {
            this.getCard3();
        } else if (type == 4) {
            this.getCard4();
        } else if (type == 5) {
            this.getCard5();
        } else if (type == 6) {
            this.getCard6();
        } else if (type == 7) {
            this.getCard7();
        } else if (type == 8) {
            this.getCard8();
        } else if (type == 9) {
            this.getCard9();
        } else if (type == 10) {
            this.getCard10();
        } else if (type == 11) {
            this.getCard11();
        } else if (type == 12) {
            this.getCard12();
        } else if (type == 13) {
            this.getCard13();
        } else if (type == 14) {
            this.getCard14();
        } else if (type == 15) {
            this.getCard15();
        } else if (type == 16) {
            this.getCard16();
        } else if (type == 17) {
            this.getCard17();
        } else if (type == 18) {
            this.getCard18();
        } else if (type == 19) {
            this.getCard19();
        } else if (type == 20) {
            this.getCard20();
        } else if (type == 21) {
            this.getCard21()
        } else if (type == 22) {
            this.getCard22()
        } else if (type == 23) {
            this.getCard23()
        } else if (type == 24) {
            this.getCard24()
        } else if (type == 25) {
            this.getCard25()
        } else if (type == 26) {
            this.getCard26()
        } else if (type == 27) {
            this.getCard27()
        } else if (type == 28) {
            this.getCard28()
        } else if (type == 29) {
            this.getCard29()
        } else if (type == 30) {
            this.getCard30()
        } else if (type == 31) {
            this.getCard31()
        } else if (type == 32) {
            this.getCard32()
        } else if (type == 33) {
            this.getCard33()
        }
    }







    getgridCardName(type) {
        if (type == 1) {
            return "Total Prepaid CAF's";
        } else if (type == 2) {
            return "Active CAF's";
        } else if (type == 3) {
            return "Suspended CAF's";
        } else if (type == 4) {
            return "Terminated CAF's";
        } else if (type == 5) {
            return "Terminated Pending CAF's";
        } else if (type == 6) {
            return "Suspend_Pending CAF's";
        } else if (type == 7) {
            return "Resume Pending CAF's";
        } else if (type == 8) {
            return "Pending Activation";
        } else if (type == 9) {
            return "Box Change";
        } else if (type == 10) {
            return "Pon Change";
        } else if (type == 11) {
            return "Today Expired CAF's";
        } else if (type == 12) {
            return "Monthly Renewed CAF's";
        } else if (type == 13) {
            return "Today Renewed CAF's";
        } else if (type == 14) {
            return "Online Collection";
        } else if (type == 15) {
            return "LMO/MSO Revenue Share-Daily";
        } else if (type == 16) {
            return "LMO/MSO Revenue Share-MTD";
        } else if (type == 17) {
            return "APSFL Revenue Share-MTD";
        } else if (type == 18) {
            return "APSFL Revenue Share-Daily";
        } else if (type == 19) {
            return "Total Prepaid LMO Data";
        } else if (type == 20) {
            return "Advance Renewal CAF's";
        } else if (type == 21) {
            return "Today Advance Renewed CAF's";
        } else if (type == 22) {
            return "Previous Day Suspended CAF's";
        } else if (type == 23) {
            return "Online Collection-MTD";
        } else if (type == 24) {
            return "Online Collection-Today";
        } else if (type == 25) {
            return "Alacarte";
        } else if (type == 26) {
            return "Planchange";
        } else if (type == 27) {
            return "Terminate Initiate";
        }

    }


    getCard1() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = true; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false;this.showThirtyFour= false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;


            /********************************Get Active CAF's list ****************************************** */
            if (this.showOne == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/totalprepaidcafslist";
                this.nxtData = "lmoprepaid/totalprepaidcafslistdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,

                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_Name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                    { headerName: 'Cycle Start Date', field: 'Cycle_Start_Date', alignment: 'center' },
                    { headerName: 'Cycle End Date', field: 'Cycle_End_Date', alignment: 'center' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard2() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = true; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false;this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;

            if (this.showTwo == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/activecaflist";
                this.nxtData = "lmoprepaid/activecaflistdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'PACKAGE NAME', alignment: 'center', field: 'Pckge_Name' },
                    { headerName: 'ACTIVATION DATE', alignment: 'center', field: 'Activation_Date' },
                    { headerName: 'CAF RENEWED DATE', alignment: 'center', field: 'Caf_Renewed_Date' },
                    { headerName: 'CAF END DATE', alignment: 'center', field: 'Caf_end_Date' },
                    { headerName: 'ADVANCE RENEWAL DATE', alignment: 'center', field: 'Advance_Renewal_Date' },
                    { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }

    getCard3() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = true; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false;this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showThree == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE ', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                    { headerName: 'SUSPENDED DATE', alignment: 'center', field: 'Suspended_Date' }
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/suspendedcaflist";
                this.nxtData = "lmoprepaid/suspendedcaflistdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard4() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = true;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false;this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showFour == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'MOBILE NUMBER', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/terminatedcaflist";
                this.nxtData = "lmoprepaid/terminatedcaflistdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }
    getCard5() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = true; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showFive == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                    // { headerName: 'END DATE', field: 'end_date', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/terminatedpendingcaflist";
                this.nxtData = "lmoprepaid/terminatedpendingcaflistdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard6() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = true; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showSix == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/suspendpendingcaflist";
                this.nxtData = "lmoprepaid/suspendpendingcaflistdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;

                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard7() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = true; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showSeven == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/resumependingcaflist";
                this.nxtData = "lmoprepaid/resumependingcaflistdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard8() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = true;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showEight == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/pendingactivationcaflist";
                this.nxtData = "lmoprepaid/pendingactivationcafdatalist";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard9() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = true; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showNine == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'districtname' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'NAME', alignment: 'center', field: 'cstmr_nm' },
                    { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'END DATE', field: 'end_date', alignment: 'center' },
                    { headerName: 'STATUS', field: 'sts_nm', alignment: 'center' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listboxchange";
                this.nxtData = "lmoprepaid/listboxchangelist";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard10() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = true; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showTen == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/ponchangelist";
                this.nxtData = "lmoprepaid/ponchangelistdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard11() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = true; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showEleven == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', field: 'dist', alignment: 'center' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'lmo_cd' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'CUSTOME NAME', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'CURRENT PACKAGE NAME', alignment: 'center', field: 'curnt_pak' },
                    { headerName: 'PON NUMBER', alignment: 'center', field: 'Pon_Number' },
                    { headerName: 'START DATE', alignment: 'center', field: 'start_dt', },
                    { headerName: 'END DATE', alignment: 'center', field: 'dt', },

                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listtodayexpiredcaf";
                this.nxtData = "lmoprepaid/listtodayexpiredcafdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard12() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = true;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showTwelve == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', field: 'district_Name', alignment: 'center' },
                    { headerName: 'LMO CODE', field: 'agnt_nm', alignment: 'center' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'Wallet Transaction ID', field: 'receipt_id', alignment: 'center', width: 150 },
                    { headerName: 'CUSTOMER NAME', field: 'cstmr_nm', alignment: 'center' },
                    { headerName: 'MOBILE NUMBER', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'PACKAGE NAME', field: 'pckge_nm', alignment: 'center' },
                    { headerName: 'END DATE', field: 'end_date', alignment: 'center' },
                    { headerName: 'ADVANCE RENEWED DATE ', field: 'Advance_Renewal_Date', alignment: 'center' }

                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listmnthlyrenewdcafs";
                this.nxtData = "lmoprepaid/listmnthlyrenewdcafs";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard13() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = true; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showThirteen == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', field: 'district_name', alignment: 'center' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'Wallet Transaction ID', field: 'receipt_id', alignment: 'center', width: 150 },
                    { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
                    { headerName: 'MOBILE NUMBER', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'PACKAGE NAME', field: 'pckge_nm', alignment: 'center' },
                    { headerName: 'ADVANCE RENEWED DATE ', field: 'Advance_Renewal_Date', alignment: 'center' }


                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listtdyrenewdcafs";
                this.nxtData = "lmoprepaid/listtdyrenewdcafsdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard14() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = true; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showFourteen == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'MOBILE', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    // { headerName: 'CURRENT WALLET AMOUNT', field: 'mob', alignment: 'center' },
                    // { headerName: 'OPEN BALANCE', field: 'ttl_dys', alignment: 'center' },
                    { headerName: 'AMOUNT', field: 'amt', alignment: 'center' },
                    // { headerName: 'CLOSE BALANCE', field: 'ttl_abs', alignment: 'center' },
                    { headerName: 'DATE CREATED', field: 'dt', alignment: 'center' }
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listonlinecollectionamunt";
                this.nxtData = "lmoprepaid/listonlinecollectionamuntdata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard15() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = true; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showFifteen == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
                    // { headerName: 'CLIENT ID', alignment: 'center', field: 'agnt_id' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'DESCRIPTION', alignment: 'center', field: 'remarks' },
                    { headerName: 'OPEN BALANCE', alignment: 'center', field: 'open_bal' },
                    { headerName: 'AMOUNT', alignment: 'center', field: 'amnt_ct' },
                    { headerName: 'CLOSE BALANCE', alignment: 'center', field: 'close_bal' },
                    { headerName: 'DATE CREATED', alignment: 'center', field: 'createdDate' },
                    { headerName: 'DISTRICT', field: 'district_name', alignment: 'center' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listtdyrevenue";
                this.nxtData = "lmoprepaid/listtdyrevenuedata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard16() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = true;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showSixteen == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
                    // { headerName: 'CLIENT ID', alignment: 'center', field: 'agnt_id' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'DESCRIPTION', alignment: 'center', field: 'remarks' },
                    { headerName: 'OPEN BALANCE', alignment: 'center', field: 'open_bal' },
                    { headerName: 'AMOUNT', alignment: 'center', field: 'amount' },
                    { headerName: 'CLOSE BALANCE', alignment: 'center', field: 'close_bal' },



                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listmnthlyrevenue";
                this.nxtData = "lmoprepaid/listmnthlyrevenuedata";
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }
    getCard17() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = true; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showSeventeen == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
                    { headerName: 'DISTRICT', field: 'district_name', alignment: 'center' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'OPEN BALANCE', field: 'open_bal', alignment: 'center' },
                    { headerName: 'DEPOSITED AMOUNT', field: 'amount', alignment: 'center' },
                    { headerName: 'CLOSE BALANCE', field: 'close_bal', alignment: 'center' },
                    { headerName: 'DATE OF RENEWAL', alignment: 'center', field: 'createdDate' },
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listmnthlycollection";
                this.nxtData = "lmoprepaid/listmnthlycollectiondata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard18() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = true; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showEighteen == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
                    //{ headerName: 'CURRENT WALLET AMOUNT', field: 'close_bal', alignment: 'center' },
                    { headerName: 'OPEN BALANCE', field: 'open_bal', alignment: 'center' },
                    { headerName: 'DEPOSITED AMOUNT', field: 'amount', alignment: 'center' },
                    { headerName: 'CLOSE BALANCE', field: 'close_bal', alignment: 'center' },
                    { headerName: 'DATE CREATED', field: 'createdDate', alignment: 'center' }
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/listtdycollection";
                this.nxtData = "lmoprepaid/listtdycollectiondata";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard21() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = true; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showTwentyOne == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/tdyadvancerenwedcaf";
                this.nxtData = "lmoprepaid/tdyadvancerenwedcafdata";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', field: 'district_name', alignment: 'center' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
                    { headerName: 'MOBILE NUMBER', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'PACKAGE NAME', field: 'pckge_nm', alignment: 'center' },
                    { headerName: 'RENEWAL DATE ', field: 'renwal_dt', alignment: 'center' },
                    { headerName: 'ADVANCE RENEWAL DATE ', field: 'advnce_dt', alignment: 'center' }
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }


    getCard22() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = true; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showTwentyTwo == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/prvsdaysuspndcaf";
                this.nxtData = "lmoprepaid/prvsdaysuspndcafdata";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'AGENT NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    //{ headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
                    { headerName: 'SUSPENDED DATE', alignment: 'center', field: 'Suspended_Date' },
                    { headerName: 'MOBILE ', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'STATUS', field: 'status', alignment: 'center' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard23() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = true;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showTwentyThree == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'MOBILE', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'AMOUNT', field: 'amt', alignment: 'center' },
                    { headerName: 'DATE CREATED', field: 'dt', alignment: 'center' }
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/onlinecollectionweblist";
                this.nxtData = "lmoprepaid/onlinecollectionweblistdatatdy";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard24() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = true; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showTwentyFour == true) {
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
                    { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
                    { headerName: 'MOBILE', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'AMOUNT', field: 'amt', alignment: 'center' },
                    { headerName: 'DATE CREATED', field: 'dt', alignment: 'center' }
                ];
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/onlinecollectionwebmtd";
                this.nxtData = "lmoprepaid/onlinecollectionwebmtddatalist";
                // console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }

    todayadvancerenewedcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/tdyadvancerenwedcafcount";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.todayadvancerenewedcafsData = res["data"][0]["tdy_renwd_caf"];
            console.log(this.todayadvancerenewedcafsData);
            this.shwLdr = false;
        });
    }

    previousdaysuspendedcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/prvsdaysuspndcafcount";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.previousdaysuspendedcafsData = res["data"][0]["count"];
            console.log(this.previousdaysuspendedcafsData);
            this.shwLdr = false;
        });
    }



    OnlineCollectionMtd(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/onlinecollectionwebmtdcount";
        // console.log(rte);
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.onlinecollectionmtd = res["data"][0]["online collection tdy"];
            console.log(this.onlinecollectionmtd);
            this.shwLdr = false;
        });
    }

    OnlineCollectionToday(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/onlinecollectionwebcount";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.onlinecollectiontoday = res["data"][0]["online collection tdy"];
            console.log(this.onlinecollectiontoday);
            this.shwLdr = false;
        });
    }

    Activecafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/activecafscount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.activecafsData = res["data"][0]["count"];
            console.log(this.activecafsData);
            this.shwLdr = false;
        });
    }
    Suspendedcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/suspendedcafscount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.suspendedcafsData = res["data"][0]["count"];
            console.log(this.suspendedcafsData);
            this.shwLdr = false;
        });
    }
    Terminatedcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/terminatedcafscount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.terminatedcafsData = res["data"][0]["count"];
            console.log(this.terminatedcafsData);
            this.shwLdr = false;
        });
    }
    Terminatedpendingcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/terminatedpendingcafscount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.terminatedpendingcafsData = res["data"][0]["count"];
            console.log(this.terminatedpendingcafsData);
            this.shwLdr = false;
        });
    }
    Suspendpendingcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/suspendedpendingcafscount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.suspendpendingcafsData = res["data"][0]["count"];
            console.log(this.suspendpendingcafsData);
            this.shwLdr = false;
        });
    }
    Resumependingcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/resumependingcafscount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.ResumependingcafsData = res["data"][0]["count"];
            console.log(this.ResumependingcafsData);
            this.shwLdr = false;
        });
    }
    Pendingrequests(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/pendingactivationcount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.PendingrequestsData = res["data"][0]["count"];
            console.log(this.PendingrequestsData);
            this.shwLdr = false;
        });
    }
    Boxchange(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/boxchangecount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.BoxchangeData = res["data"][0]["count"];
            console.log(this.BoxchangeData);
            this.shwLdr = false;
        });
    }
    PonChange(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/ponchangecount";
        // console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.PonChangeData = res["data"][0]["count"];
            console.log(this.PonChangeData);
            this.shwLdr = false;
        });
    }
    TodayExpiredcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/todayexpiredcaf";
        // console.log(rte);
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.TodayExpiredcafsData = res["data"][0]["expired_caf"];
            console.log(this.TodayExpiredcafsData);
            this.shwLdr = false;
        });
    }
    MonthlyRenewedcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/mnthlyrenewdcafs";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.MonthlyRenewedcafsData = res["data"][0]["mntly_rnwed_caf"];
            console.log(this.MonthlyRenewedcafsData);
            this.shwLdr = false;
        });
    }





    Todayrenewedcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/tdyrenewdcafs";
        // console.log(rte);
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.TodayrenewedcafsData = res["data"][0]["tdy_renwd_caf"];
            console.log(this.TodayrenewedcafsData);
            this.shwLdr = false;
        });
    }

    Onlinecollection(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/onlinecollectionamunt";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.OnlinecollectionData = res["data"][0]["sum_ammount"];
            console.log(this.OnlinecollectionData);
            this.shwLdr = false;
        });
    }
    Todayrevenue(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/tdyrevenue";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.TodayrevenueData = res["data"][0]["ttl_apsfl_tdy_rvnue"];
            console.log(this.TodayrevenueData);
            this.shwLdr = false;
        });
    }
    Monthlyrevenue(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/mnthlyrevenue";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.MonthlyrevenueData = res["data"][0]["ttl_apsfl_mnth_rvnue"];
            console.log(this.MonthlyrevenueData);
            this.shwLdr = false;
        });
    }
    Monthlycollection(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/mnthlycollection";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.MonthlycollectionData = res["data"][0]["ttl_apsfl_mnth_clctn"];
            console.log(this.MonthlycollectionData);
            this.shwLdr = false;
        });
    }
    Todaycollection(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/tdycollection";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.TodaycollectionData = res["data"][0]["ttl_apsfl_tdy_clctn"];
            console.log(this.TodaycollectionData);
            this.shwLdr = false;
        });
    }
    TodayRevshareAlacarte(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/alcartecount/0";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((result) => {
            // console.log(result)
            this.TodayrevshareAlacarteData = result["data"][0]["count"];
            console.log("asdtester", this.TodayrevshareAlacarteData);
            this.shwLdr = false;
        });
    }
    MonthlyRevshareAlacarte(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/alcartecount/1";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.MonthlyrevshareAlacarteData = res["data"][0]["count"];
            console.log(this.MonthlyrevshareAlacarteData);
            this.shwLdr = false;
        });
    }

    TodayPlanChange(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/planchangecount/0";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.TodayplanchangeData = res["data"][0]["count"];
            console.log(this.TodayplanchangeData);
            this.shwLdr = false;
        });
    }

    MonthlyPlanChange(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/planchangecount/1";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.MonthlyplanchangeData = res["data"][0]["count"];
            console.log(this.MonthlyplanchangeData);
            this.shwLdr = false;
        });
    }

    TodayTerminateInitiate(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/terminateinitiatcount/0";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.TodayterminateinitiateData = res["data"][0]["count"];
            console.log(this.TodayterminateinitiateData);
            this.shwLdr = false;
        });
    }

    MonthlyTerminateInitiate(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/terminateinitiatcount/1";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        // console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.MonthlyterminateinitiateData = res["data"][0]["count"];
            console.log(this.MonthlyterminateinitiateData);
            this.shwLdr = false;
        });
    }




    getCard19() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = true; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            if (this.showNineteen == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/totalprepaidlmodata";
                this.nxtData = "lmoprepaid/totalprepaidlmodatalist";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', alignment: 'center', field: 'district_Name' },
                    { headerName: 'LMO CODE', alignment: 'center', field: 'Lmo_code' },
                    { headerName: 'Total CAF Count', alignment: 'center', field: 'Total CAF count' },
                    { headerName: 'PREPAID ACTIVATION DATE', alignment: 'center', field: 'Activation_Date' },
                    { headerName: 'Active', alignment: 'center', field: 'Active' },
                    { headerName: 'Remaining', alignment: 'center', field: 'remaining' },
                    { headerName: 'Suspended', alignment: 'center', field: 'Suspended' },
                    { headerName: 'Mobile', alignment: 'center', field: 'mbl_nu' },
                    { headerName: 'LMO NAME', alignment: 'center', field: 'Lmo_name' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }

    Lmodata(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/totalprepaidlmocount";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.totalprepaidlmodata = res["data"][0]["count"];
            console.log(this.totalprepaidlmodata);
            console.log(res)
            this.shwLdr = false;
        });
    }




    getCard20() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = true;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showTwenty == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/advancerenewalcafs";
                this.nxtData = "lmoprepaid/advancerenewalcafsdata";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0,
                };
                this.crdsrv.create(lmoData, rte,).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', field: 'district_Name', alignment: 'center' },
                    { headerName: 'LMO CODE', field: 'mrcht_usr_nm', alignment: 'center' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'CURRENT PACKAGE NAME', field: 'crnt_pckge_name', alignment: 'center' },
                    { headerName: 'CYCLE START DATE', alignment: 'center', field: 'cycle_start_dt' },
                    { headerName: 'CYCLE END DATE', alignment: 'center', field: 'cycle_end_dt' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    Advancerenewalcafs(fltr, data) {
        this.shwLdr = true;
        let rte = "lmoprepaid/advancerenewalcafcount";
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        console.log(rte);
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.advancerenewalcafsData = res["data"][0]["count"];
            console.log(this.advancerenewalcafsData);
            this.shwLdr = false;
        });
    }






    getCard25() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false;
            this.showTwentyFour = false; this.showTwentyFive = true; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showTwentyFive == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/alcartelist";
                this.nxtData = "lmoprepaid/alcartelist";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    //{ headerName: 'DISTRICT NAME', field: 'district_Name', alignment: 'center' },
                    { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center' },
                    { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
                    { headerName: 'CUSTOMER NAME', field: 'cstmr_nm', alignment: 'center' },
                    { headerName: 'MOBILE NUMBER', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'AGENT NAME', field: 'agnt_nm', alignment: 'center' },
                    { headerName: 'PACKAGE NAME', field: 'pckge_nm', alignment: 'center' },
                    //{ headerName: 'CYCLE START DATE', alignment: 'center', field: 'cycle_start_dt' },
                    { headerName: 'END DATE', alignment: 'center', field: 'end_date' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }

    Alacarte(fltr, data) {
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        this.shwLdr = true;
        let rte = "lmoprepaid/alcartecount";
        console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.AlacarteData = res["data"][0]["count"];
            console.log(this.AlacarteData);
            this.shwLdr = false;
        });
    }

    getCard26() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false; this.showTwentyFour = false;
            this.showTwentyFive = false; this.showTwentySix = true; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showTwentySix == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/planchangelist";
                this.nxtData = "lmoprepaid/planchangelist";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    //{ headerName: 'DISTRICT NAME', field: 'district_Name', alignment: 'center' },
                    { headerName: 'LMO CODE', field: 'f_ac_id', alignment: 'center' },
                    //{ headerName: 'RECEIPT ID', field: 'receipt_id', alignment: 'center' },
                    //{ headerName: 'MERCHANT ID', field: 'trns_mrchant_id', alignment: 'center' },
                    //{ headerName: 'ADMIN ID', field: 'admin_id', alignment: 'center' },
                    { headerName: 'CUSTOMER ID', field: 'cust_id', alignment: 'center' },
                    //{ headerName: 'STD ID', field: 'stb_id', alignment: 'center' },
                    { headerName: 'OEPN BALANCE', field: 'open_bal', alignment: 'center' },
                    //{ headerName: 'AMOUNT', field: 'amount', alignment: 'center' },
                    { headerName: 'CLOSE BALANCE', field: 'close_bal', alignment: 'center' },
                    //{ headerName: 'CPE CHARGE', field: 'cpe_chrge', alignment: 'center' },
                    { headerName: 'OPERATION', field: 'operation', alignment: 'center' },
                    { headerName: 'REMARKS', field: 'remarks', alignment: 'center' },
                    //{ headerName: 'ACCOUNT DATE', field: 'ac_date', alignment: 'center' },
                    { headerName: 'CREATED DATE', field: 'dateCreated', alignment: 'center' },
                    // { headerName: 'CREATED BY', field: 'created_by', alignment: 'center' },
                    //{ headerName: 'MONEY TYPE', field: 'money_type', alignment: 'center' },
                    { headerName: 'OLD PACK AVILABLE DAYS', field: 'old_pack_availed_days', alignment: 'center' },
                    { headerName: 'PACK REMAINING DAYS', field: 'pack_remaining_days', alignment: 'center' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }

    planchng(fltr, data) {
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        this.shwLdr = true;
        let rte = "lmoprepaid/planchangecount";
        console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.planchngData = res["data"][0]["count"];
            console.log(this.planchngData);
            this.shwLdr = false;
        });
    }




    getCard27() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false; this.showTwentyFour = false;
            this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = true;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showTwentySeven == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/terminateinitiatlist";
                this.nxtData = "lmoprepaid/terminateinitiatlist";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'DISTRICT NAME', field: 'district_Name', alignment: 'center' },
                    { headerName: 'LMO CODE', field: 'f_ac_id', alignment: 'center' },
                    { headerName: 'CUSTOMER ID', field: 'cust_id', alignment: 'center' },
                    { headerName: 'OEPN BALANCE', field: 'open_bal', alignment: 'center' },
                    { headerName: 'CLOSE BALANCE', field: 'close_bal', alignment: 'center' },
                    { headerName: 'CREATED DATE', field: 'dateCreated', alignment: 'center' },
                    { headerName: 'CREATED BY', field: 'created_by', alignment: 'center' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }
    getCard28() {
        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false; this.showTwentyFour = false;
            this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = true; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showTwentyEight == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/alcartelist/0";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center' },
                    { headerName: 'CUSTOMER ID', field: 'caf_id', alignment: 'center' },
                    { headerName: 'CUSTOMER NAME', field: 'cstmr_nm', alignment: 'center' },
                    { headerName: 'MOBILE NUMBER', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'AGENT NAME', field: 'agnt_nm', alignment: 'center' },
                    { headerName: 'PACKAGE NAME', field: 'pckge_nm', alignment: 'center' },
                    { headerName: 'END DATE', field: 'end_date', alignment: 'center' }
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard29() {

        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false; this.showTwentyFour = false;
            this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = true; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showTwentyNine == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/alcartelist/1";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'LMO CODE', field: 'agnt_cd', alignment: 'center' },
                    { headerName: 'CUSTOMER ID', field: 'caf_id', alignment: 'center' },
                    { headerName: 'CUSTOMER NAME', field: 'cstmr_nm', alignment: 'center' },
                    { headerName: 'MOBILE NUMBER', field: 'mbl_nu', alignment: 'center' },
                    { headerName: 'AGENT NAME', field: 'agnt_nm', alignment: 'center' },
                    { headerName: 'PACKAGE NAME', field: 'pckge_nm', alignment: 'center' },
                    { headerName: 'END DATE', field: 'end_date', alignment: 'center' }
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
    }

    getCard30() {

        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false; this.showTwentyFour = false;
            this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = true; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showThirty == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/planchangelist/0";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'CUSTOMER ID', field: 'cust_id', alignment: 'center' },
                    { headerName: 'PACKAGE ID', field: 'stb_id', alignment: 'center' },
                    { headerName: 'DISTRICT NAME', field: 'district_Name', alignment: 'center' },
                    { headerName: 'OEPN BALANCE', field: 'open_bal', alignment: 'center' },
                    { headerName: 'AMOUNT', field: 'amount', alignment: 'center' },
                    { headerName: 'CLOSE BALANCE', field: 'close_bal', alignment: 'center' },
                    { headerName: 'NEW PACK LMOSAHRE', field: 'new_pack_lmo_share', alignment: 'center' },
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard31() {

        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false; this.showTwentyFour = false;
            this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = true;
            this.showThirtyTwo = false; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showThirtyOne == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/planchangelist/1";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'CUSTOMER ID', field: 'cust_id', alignment: 'center' },
                    { headerName: 'PACKAGE ID', field: 'stb_id', alignment: 'center' },
                    // { headerName: 'DISTRICT NAME', field: 'district_Name', alignment: 'center' },
                    { headerName: 'OEPN BALANCE', field: 'open_bal', alignment: 'center' },
                    { headerName: 'AMOUNT', field: 'amount', alignment: 'center' },
                    { headerName: 'CLOSE BALANCE', field: 'close_bal', alignment: 'center' },
                    { headerName: 'NEW PACK LMOSAHRE', field: 'new_pack_lmo_share', alignment: 'center' }
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard32() {

        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false; this.showTwentyFour = false;
            this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = true; this.showThirtyThree = false; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showThirtyTwo == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/terminateinitiatlist/0";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    { headerName: 'CUSTOMER ID', field: 'caf_id', alignment: 'center' },
                    { headerName: 'LMO CODE', field: 'mrcht_usr_nm', alignment: 'center' },
                    { headerName: 'CUSTOMER NAME', field: 'cstmr_nm', alignment: 'center' }
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    getCard33() {

        if (this.dstrtslcted) {
            this.gridData = [];
            this.ShowGr = true;
            this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
            this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
            this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
            this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
            this.showSeventeen = false; this.showEighteen = false; this.showNineteen = false; this.showTwenty = false;
            this.showTwentyOne = false; this.showTwentyTwo = false; this.showTwentyThree = false; this.showTwentyFour = false;
            this.showTwentyFive = false; this.showTwentySix = false; this.showTwentySeven = false;
            this.showTwentyEight = false; this.showTwentyNine = false; this.showThirty = false; this.showThirtyOne = false;
            this.showThirtyTwo = false; this.showThirtyThree = true; this.showThirtyFour = false; this.showThirtyFive = false; this.showThirtySix = false;
            this.showThirtySeven = false; this.showThirtyEight = false; this.showThirtyNine = false; this.showForty = false; this.showFortyOne = false;
            this.showFortyTwo = false; this.showFortyThree = false; this.showFortyFour = false; this.showFortyFive = false; this.showFortySix = false;
            this.showFortySeven = false; this.showFortyEight = false; this.showFortyNine = false; this.showFifty = false; this.showFiftyOne = false;
            /********************************Get Active CAF's list ****************************************** */
            if (this.showThirtyThree == true) {
                this.shwLdr = true;
                this.edibtnenble = false;
                let rte = "lmoprepaid/terminateinitiatlist/1";
                console.log(rte);
                const lmoData = {
                    dstrt: this.slctdDstrt,
                    dstrt_fltr: true,
                    "lmt_pstn": 0
                };

                this.crdsrv.create(lmoData, rte).subscribe((res) => {
                    this.gridData = res["data"];
                    console.log(this.gridData);
                    this.shwLdr = false;
                });
                this.gridColumnDefs = [
                    // { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: false },
                    { headerName: 'CUSTOMER ID', field: 'caf_id', alignment: 'center' },
                    { headerName: 'LMO CODE', field: 'mrcht_usr_nm', alignment: 'center' },
                    { headerName: 'CUSTOMER NAME', field: 'cstmr_nm', alignment: 'center' }
                ];
            }
        } else {
            this._snackBar.open('Please select district filter to get list view', '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }

    }

    terminate(fltr, data) {
        const lmoData = {
            dstrt: this.slctdDstrt,
            dstrt_fltr: fltr
        };
        this.shwLdr = true;
        let rte = "lmoprepaid/terminateinitiatcount";
        console.log(rte);
        this.crdsrv.get(rte).subscribe((res) => {
            this.terminateData = res["data"][0]["count"];
            console.log(this.terminateData);
            this.shwLdr = false;
        });
    }






    Next() {
        //alert (this.key); 
        this.shwLdr = true;
        this.edibtnenble = true;
        //let rte = "lmoprepaid/totalprepaidlmodatalist";
        let rte = this.nxtData;
        console.log(rte);
        // if (this.value == -1) {
        //     this.value = 0;
        // }
        const lmoData = {
            "lmt_pstn": this.nxtvalue +=1,
        };
        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.gridData = res["data"];
            console.log(this.gridData);
            this.shwLdr = false;
            console.log(this.nxtvalue);
        });
    }


    Prev() {
        this.shwLdr = true;
        this.edibtnenble = true;
        //let rte = "lmoprepaid/totalprepaidlmodatalist";
        let rte = this.nxtData;
        console.log(rte);
        // if (this.value == -1 || this.value == 0) {
        //     this.value = 0
        // }

        const lmoData = {
            "lmt_pstn": this.nxtvalue -=1,
        };

        this.crdsrv.create(lmoData, rte).subscribe((res) => {
            this.gridData = res["data"];

            if(this.nxtvalue ==0){
                this.edibtnenble = false;
            }
            console.log(this.gridData);
            this.shwLdr = false;
            console.log(this.nxtvalue);
        });
    }


    // Next1() {          
    //     this.shwLdr = true;
    //     this.edibtnenble = true;  
    //     let rte = "lmoprepaid/totalprepaidcafslistdata";
    //     //let rte = this.nxtData;
    //     console.log(rte);        
    //     if(this.value == -1){
    //         this.value=0;
    //     }
    //     const lmoData = {
    //         "lmt_pstn": this.value++,
    //     };
    //     this.crdsrv.create(lmoData, rte).subscribe((res) => {
    //         this.gridData = res["data"];
    //         console.log(this.gridData);
    //         this.shwLdr = false;
    //         console.log(this.value);
    //     });
    // }


    // Prev1() {        
    //     this.shwLdr = true;
    //     this.edibtnenble = true;
    //     let rte = "lmoprepaid/totalprepaidcafslistdata";
    //     console.log(rte);
    //     if(this.value == -1 || this.value == 0 ){
    //         this.value=0
    //     }
    //     const lmoData = {
    //         "lmt_pstn": this.value--, 
    //     };

    //     this.crdsrv.create(lmoData, rte).subscribe((res) => {
    //         this.gridData = res["data"];
    //         console.log(this.gridData);
    //         this.shwLdr = false;
    //         console.log(this.value);
    //     });
    // }

};


