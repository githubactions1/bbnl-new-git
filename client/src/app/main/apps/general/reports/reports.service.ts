import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class reportsService {
  // getuserwisereport(gtsScnd: { 'from_dt': string; 'to_dt': string; }, arg1: (err: any, attndStatus_res: any) => void) {
  //   throw new Error("Method not implemented.");
  // }

  constructor(private http: HttpClient) { }
  public getUlbs(cb) {
    this.http.get('/geoLocations/ulb').subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getWorkPackages(ulb_id, cb) {
    this.http.get('/geoLocations/workPackages/' + ulb_id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getClusters(ulb_id, wrk_pckge_id, cb) {
    this.http.get('/geoLocations/clusters/' + ulb_id + '/' + wrk_pckge_id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public geMicroPockets(ulb_id, wrk_pckge_id, clsrt_id, cb) {
    this.http.get('/geoLocations/microPockets/' + ulb_id + '/' + wrk_pckge_id + '/' + clsrt_id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getDayWiseWeighmentData(wghtDtData, cb) {

    this.http.post('/weighmntDashboard/ulb/wghmntCnt', wghtDtData).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getDayWiseTrnsprtnData(transDtData, cb) {
    this.http.post('/vhclDbrd/grphTrps', transDtData).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }

  getMonthlyAttendaceData(cb) {
    this.http.get('/attendanceMonthlyPer').subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }

  getMonthlyScannedGatesData(cb) {
    this.http.get('/scanningMonthlyPer').subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }

  getMonthlyWeighmentData(cb) {
    this.http.get('/weighmentMonthlyPer').subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }


  getMonthlyTripsData(cb) {
    this.http.get('/transportMonthlyPer').subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getReportCategoryList(cb) {
    this.http.get('/reports/category').subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getReportList(id, cb) {
    this.http.get('/reports/list/' + id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getMnthlyUlbGtsData(mnth, yr, cb) {
    this.http.get('/gatesMonthlyDta/' + mnth + '/' + yr).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getMnthlyUlbAtndncData(mnth, yr, cb) {
    this.http.get('/attendanceMonthlyDta/' + mnth + '/' + yr).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getMnthlyUlbWghData(mnth, yr, cb) {
    this.http.get('/weighmentMonthlyDta/' + mnth + '/' + yr).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getMnthlyUlbTrpsData(mnth, yr, cb) {
    this.http.get('/tripsMonthlyDta/' + mnth + '/' + yr).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public scannersMonthlyDta(mnth, yr, cb) {
    this.http.get('/scannersMonthlyDta/' + mnth + '/' + yr).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getUlbGtsData(gtedata, cb) {
    this.http.post('/gatesDashboard/ulb/gates/scanned', gtedata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getUlbAttndData(attnddata, cb) {
    this.http.post('/atndnceDashboard/ulb/emp/atndnce', attnddata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getGatesByUlb(id, cb) {
    this.http.get('/reports/gates/ulb/' + id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getUlbGteAnaysis(id, cb) {
    this.http.get('/reports/ulb/gates/' + id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getPhwrkrsPrsntButGtsNtScnd(postdata, cb) {
    this.http.post('/reports/misreports/phWrkrsPrsntgtsNtScnd', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }

  public getHistoricalGateStatus(postdata, cb) {
    this.http.post('/reports/misreports/ulb/gates/history', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getHistoricalAttndStatus(postdata, cb) {
    this.http.post('/reports/misreports/ulb/attendance/history', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getHistoricalWghtStatus(postdata, cb) {
    this.http.post('/reports/misreports/ulb/weighment/history', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getHistoricalTrnsStatus(postdata, cb) {
    this.http.post('/reports/misreports/ulb/transportation/history', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getEmplyeFrsStatus(postdata, cb) {
    this.http.post('/reports/misreports/ulb/employee/frs/summary', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getUnassigndEmpList(data, cb) {
    this.http.post('/reports/exceptional/unassigned/employees', data).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getWrnglyScndList(cb) {
    this.http.get('/reports/exceptional/wrong/scans').subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  getdayWiseOfFLineScndLst(postData, cb) {
    this.http.post('/reports/misreports/dayWiseofflineScnsLst', postData).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }

  getdayWiseWrnglyScndLst(postData, cb) {
    this.http.post('/reports/misreports/dayWiseWronglyScnsLst', postData).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }


  getdayWiseunasgndtagLst(postData, cb) {
    this.http.post('/reports/misreports/dayWiseunasgndtagLst', postData).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }


  getdayWiseEmployeeLst(postData, cb) {
    this.http.post('/reports/misreports/dayWiseemployeeLst', postData).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getDyWiseGateStatus(postdata, cb) {
    this.http.post('/custom/gatesCoveredCnts', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getDyWiseAttndStatus(postdata, cb) {
    this.http.post('/custom/attedenceCoveredCnts', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getDyWiseWghtStatus(postdata, cb) {
    this.http.post('/custom/wghmntsCoveredCnts', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getDyWiseTrnsStatus(postdata, cb) {
    this.http.post('/custom/TripsCoveredCnts', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public gatesNtScnd(postdata, cb) {
    this.http.post('/ulbdashboard/gateNtscnd', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public gatesNtScndByMcrpt(data, cb) {
    this.http.get('/ulbdashboard/gateNtscnd/micropocket/' + data.mcrpt_id + '/' + data.from_dt + '/' + data.to_dt).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }

  public wghmntNtTaknByMcrpt(data, cb) {
    this.http.get('/ulbdashboard/weighmntNtTakn/micropocket/' + data.mcrpt_id + '/' + data.from_dt + '/' + data.to_dt).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public transprPontsNtCvrd(data, cb) {
    this.http.get('/ulbdashboard/trnsprPntsNtCvrd/ulb/' + data.ulb_id + '/' + data.from_dt + '/' + data.to_dt).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public scnrsNtWrkngUlbWse(data, cb) {
    this.http.get('/ulbdashboard/scanners/ntWorking/' + data.ulb_id + '/' + data.from_dt + '/' + data.to_dt).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public trackersNtWrkngUlbWse(data, cb) {
    this.http.get('/ulbdashboard/trackers/ntWorking/' + data.ulb_id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public oflneScnData(postdata, cb) {
    this.http.post('/rtms/ulb/offline/scans/counts', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public oflneScnbyScnrId(data, cb) {
    this.http.get('/rtms/ulb/offline/scans/' + data.scnr_id + '/' + data.dt).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public wrnglyScnData(postdata, cb) {
    this.http.post('/ulbdashboard/wrongly/scans', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public wrnglyScnDatabyScnr(postdata, cb) {
    this.http.post('/ulbdashboard/scanner/wrong/scans', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public unasgndTgeData(postdata, cb) {
    this.http.post('/ulbdashboard/unassigned/scans', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getUlbLst(cb) {
    this.http.get('/ulb').subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public sngleScnEmplyLst(postdata, cb) {
    this.http.post('/ulbdashboard/empAbsnt', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getGateCrdCnts(postdata, cb) {
    this.http.post('/gatesDashboard/scndGtsCount', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getAttndCrdCnts(postdata, cb) {
    this.http.post('/atndnceDashboard/empCount/atndnce', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getWghmntCrdCnts(postdata, cb) {
    this.http.post('/weighmntDashboard/wghmntCnt', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getTrnsCrdCnts(postdata, cb) {
    this.http.post('/vhclDbrd/vhclCnts', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getGatesFixDtls(postdata, cb) {
    this.http.post('/reports/misreports/ulb/gates/fixation', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getGatesList(mcrpt_id, cb) {
    this.http.get('/ulb/micropockets/gates/' + mcrpt_id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getUlbEchGteHstryDtls(postdata, cb) {
    this.http.post('/reports/ulb/micropocket/gate/history', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getEmpList(mcrpt_id, cb) {
    this.http.get('/ulb/micropockets/employee/' + mcrpt_id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getUlbEchVehHstryDtls(postdata, cb) {
    this.http.post('/reports/ulb/vehicle/trip/history', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getclstrVehicles(clsrt_id, cb) {
    this.http.get('/rtms/ulb/cluster/vehicle/list/' + clsrt_id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public vehiclenotcvrtr(data, cb) {
    this.http.post('/reports/exceptional/vehiclestripsnotcvd', data).subscribe(resdata => {
      cb(false, resdata);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }


  public getuserwisereport(data, cb) {
    this.http.get('/userwise', data).subscribe(resdata => {
    cb(false, resdata);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }

  public MpWiseCoveragerpt(data, cb) {
    this.http.post('/reports/misreports/ulb/gates/coverage', data).subscribe(resdata => {
      cb(false, resdata);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public MpWiseEmpperfrmncrpt(data, cb) {
    this.http.post('/reports/misreports/ulb/mpwise/empperfrmnc', data).subscribe(resdata => {
      cb(false, resdata);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getMnthlySanitoryInspectorData(mnth, yr, ulb_id, cb) {
    this.http.get('/sanitoryInspectorMonthlyDta/' + mnth + '/' + yr+ '/' +ulb_id).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getmismatchscans(postdata, cb) {
    this.http.post('/dashboard/scanners/count', postdata).subscribe(data => {
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred:', err.error.message);
        } else {
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
}

