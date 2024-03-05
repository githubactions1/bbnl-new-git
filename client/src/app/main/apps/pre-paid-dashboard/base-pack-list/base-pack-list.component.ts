import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../crud.service';
import { TransfereService } from "app/providers/transfer/transfer.service";
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material';

@Component({
  selector: 'app-base-pack-list',
  templateUrl: './base-pack-list.component.html',
  styleUrls: ['./base-pack-list.component.scss']
})
export class BasePackListComponent implements OnInit {

  getHeaderDtls = function (): any {
    return {
        title: "Base Package Dashboard",
        icon: "people_outline",
    };
};
horizontalPosition: MatSnackBarHorizontalPosition = 'end';
verticalPosition: MatSnackBarVerticalPosition = 'top';
shwLdr: boolean;
selectcaflmodstrt : any
usrdtls: any;
gridColumnDefs = [];
gridData = [];
ShowGr: boolean = false;
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

edibtnenble: boolean = false;

usrcatid: boolean = false;
dstrtslcted: boolean = false;
slctdDstrt;
shwDstrctDrpdwn: boolean = true;

totalprepaidcafsplnsData = [
    { homeminicafs: 0, homebasiccafs: 0, homeessentialcafs: 0, homepremiumcafs: 0, homelifecafs: 0, homeultracafs: 0, homepiecafs: 0, homegoldcafs: 0, homegoldpluscafs: 0, homeplatinumcafs: 0,
    ootminicafs : 0 , ottmaxicafs : 0 , ootprimecafs : 0, testhsi60 : 0, testhsi100: 0, homestandard: 0, testpack: 0 }
];

constructor(public TransfereService: TransfereService,
    public crdsrv: CrudService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    public route: ActivatedRoute,
    private router: Router) { }

ngOnInit() {
    this.ngonitgetallbasepacksdata(false, null);

    this.usrdtls = JSON.parse(localStorage.getItem("usrDtls"));
    console.log(this.usrdtls)
    if (this.usrdtls.usr_ctgry_id == 2) {
        this.dstrtslcted = true;
        this.selectedDstrct = this.usrdtls.hyrchy_grp_id
    }
    if (this.usrdtls.usr_ctgry_id == 1) {
        this.usrcatid = true
    }
    if (this.usrdtls.hyrchy_grp_id == null) {
        const rte = `admin/districts`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.dstrctLst = res['data'];
            // tslint:disable-next-line:triple-equals
            if (this.slctdDstrt == undefined) {
                this.slctdDstrt = 15;
                this.dstrtslcted = false
            }
        });
    }
}
selectedDstrct(data): any {
    this.selectcaflmodstrt = data.value;
}
getLmoWiseData(): any {
    this.showOne = false; this.showTwo = false; this.showThree = false; this.showFour = false;
    this.showFive = false; this.showSix = false; this.showSeven = false; this.showEight = false;
    this.showNine = false; this.showTen = false; this.showEleven = false; this.showTwelve = false;
    this.showThirteen = false; this.showFourteen = false; this.showFifteen = false; this.showSixteen = false;
    this.showSeventeen = false; 
  this.dstrtslcted = true;
  this.ShowGr = false;
  this.slctdDstrt = this.selectcaflmodstrt;
  this.ngonitgetallbasepacksdata(true, null);

}



ngonitgetallbasepacksdata(fltr, data){
    this.shwLdr = true;
    const lmoData = {
        dstrt: this.slctdDstrt,
        dstrt_fltr: fltr
    };
    console.log("lmoData",lmoData)
    let rte = "lmoprepaid/basepackscnt";
    this.crdsrv.create(lmoData, rte).subscribe((res) => {
        this.totalprepaidcafsplnsData = res["data"];
        console.log("lmoprepaid/basepackscnt",this.totalprepaidcafsplnsData);
        this.shwLdr = false;
    });
}

getData(type) {
    //this.key = (type)
    console.log('Get Data using Filters', type);
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
    }
}


getgridCardName(type) {
    if (type == 1) {
        return "Home Mini";
    } else if (type == 2) {
        return "Home Basic";
    } else if (type == 3) {
        return "Home Essential";
    } else if (type == 4) {
        return "Home Premium";
    } else if (type == 5) {
        return "Home GOLD";
    } else if (type == 6) {
        return "Home GOLD PLUS";
    } else if (type == 7) {
        return "Home PLATINUM";
    } else if (type == 8) {
        return "Home LIFE";
    } else if (type == 9) {
        return "Home ULTRA";
    } else if (type == 10) {
        return "Home PIE";
    } else if (type == 11) {
        return "OTT MINI";
    } else if (type == 12) {
        return "OTT MAXI";
    } else if (type == 13) {
        return "OTT PRIME";
    } else if (type == 14) {
        return "TEST HSI 60";
    } else if (type == 15) {
        return "TEST HSI 100";
    } else if (type == 16) {
        return "HOME STANDARD";
    } else if (type == 17) {
        return "Test Pack";
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
        this.showSeventeen = false; 


        /********************************Get Active CAF's list ****************************************** */
        if (this.showOne == true) {
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id:"80,3000110"

            };
            this.crdsrv.create(lmoData, rte).subscribe((res) => {
                this.gridData = res["data"];
                console.log(this.gridData);
                this.shwLdr = false;
            });
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
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
        this.showSeventeen = false; 

        if (this.showTwo == true) {
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id :"79"
                
            };
            this.crdsrv.create(lmoData, rte).subscribe((res) => {
                this.gridData = res["data"];
                this.shwLdr = false;
            });
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
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
        this.showSeventeen = false; 
        if (this.showThree == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "3000107"
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
        this.showSeventeen = false; 
        if (this.showFour == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "3000106"
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
        this.showSeventeen = false; 
        if (this.showFive == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "8000001"
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
        this.showSeventeen = false; 
        if (this.showSix == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "8000002"
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
        this.showSeventeen = false; 
        if (this.showSeven == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "8000003" 
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
        this.showSeventeen = false; 
        if (this.showEight == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "8000000"
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
        this.showSeventeen = false; 
        if (this.showNine == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "9000000"
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
        this.showSeventeen = false; 
        if (this.showTen == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "9000001"
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
        this.showSeventeen = false; 
        if (this.showEleven == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "8000004"
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
        this.showSeventeen = false; 
        if (this.showTwelve == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "8000005"
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
        this.showSeventeen = false; 
        if (this.showThirteen == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "8000006"
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
        this.showSeventeen = false; 
        if (this.showFourteen == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "3000148,4000000"
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
        this.showSeventeen = false; 
        if (this.showFifteen == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "3000149"
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
        this.showSeventeen = false; 
        if (this.showSixteen == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "82"
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
        this.showSeventeen = true; 
        if (this.showSeventeen == true) {
            this.gridColumnDefs = [
              { headerName: 'S.NO', field: 'sno', alignment: 'center', width: 50, filter: true },
              { headerName: 'CAF ID', alignment: 'center', field: 'caf_id' },
              { headerName: 'CUSTOMER NAME', alignment: 'center', field: 'cstmr_nm' },
              { headerName: 'MOBILE NO', alignment: 'center', field: 'mbl_nu' },
              { headerName: 'PACKAGE NAME', alignment: 'center', field: 'pckge_nm' },
              { headerName: 'DISTRICT', field: 'dstrt_nm', alignment: 'center' },
              { headerName: 'LMO CODE', alignment: 'center', field: 'agnt_cd' },
              { headerName: 'LMO NAME', alignment: 'center', field: 'agnt_nm' },
            ];
            this.shwLdr = true;
            this.edibtnenble = false;
            let rte = "lmoprepaid/basepackslistview";
            // console.log(rte);
            const lmoData = {
                dstrt: this.slctdDstrt,
                dstrt_fltr: true,
                plan_id : "3000119,2000002"
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


}
