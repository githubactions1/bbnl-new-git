import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';

@Component({
  selector: 'app-complaints-overview-dashboard',
  templateUrl: './complaints-overview-dashboard.component.html',
  styleUrls: ['./complaints-overview-dashboard.component.scss']
})
export class ComplaintsOverviewDashboardComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  areas: any; 
  ticktschrt: any;
  todayschrt: any;
  dmstctprsntchrt:any;
  dnsttodayschrt:any;
  entprsntmnthchrt:any;
  enttdycnt:any;
  oltschrt: any;
  ontschrt: any;
  todaydatacounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}]
  yesdatacounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  tkdatacounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  prevsdatacounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  enterdatacounts = [{ enterprise: 0 }];
  domedatacounts = [{ Domestic: 0 }];
  grievandatacounts = [{ Greviences: 0 }];
  sourceprsntmnthdatacounts = [{total_tickets: 0, subcriber_app: 0, lmo_app: 0, call_center: 0}];
  sourcepremnthdatacounts = [{total_tickets: 0, subcriber_app: 0, lmo_app: 0, call_center: 0}];
  categorywisedatacounts = [{count: ''},{count: ''},{count: ''},{count: ''},{count: ''},{count: ''}];  
  name = [{category:''},{category:''},{category:''},{category:''},{category:''},{category:''}];  resumedatacounts = [{resume_pending : 0}];
  pendingdatacounts = [{pending_activation : 0}];
  boxdatacounts = [{box_change : 0}];
  pondatacounts = [{pon_change : 0}];
  suspenddatacounts = [{suspend_pending : 0}];
  termdatacounts = [{termination_pending : 0}];
  entprvsmonthdatacounts = [{ enterprise: 0 }];
  domeprvsmonthdatacounts = [{ domestic: 0 }];
  grievanprvsmonthdatacounts = [{ grevience: 0 }];
  enttodaycounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  entprvsdaycounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  entprsntmnthdatacounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  entprvousmnthdatacounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  domestictodaycounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  domesticprvsdaycounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  domesticprsntmnthdatacounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];
  domesticprvousmnthdatacounts = [{total: 0, Open: 0, Close: 0, Resolved: 0}];

  pieColorPalette = [/*blue*/'#44C8F5',/*orange*/'#FF8C61', /*red*/'#CC444B'];
  getHeaderDtls = function (): any { return { 'title': 'Complaints Overview Dashboard', 'icon': 'language' }; };
  configUrl: string;
  handleError: (err: any, caught: Observable<Object>) => never;
  category: any;
  
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  constructor(public crdSrvc: CrudService, private dsSidebarService: DsSidebarService, private http: HttpClient, public snackBar: MatSnackBar) { }

  ngOnInit() {   
    this.getEntprvsMonthcount();
    this.getDomestprvsMonthcount();
    this.getGrievanprvsMonthcount(); 
    this.getEnterpriseTodayCounts();
    this.getEnterprisePreviousDayCounts();
    this.getEnterprisePrsntMonth();
    this.getEnterprisePreviousMonth();
    this.getDomesticTodayCounts();
    this.getDomesticPreviousDayCounts();
    this.getDomesticPrsntMonth();
    this.getDomesticPreviousMonth();
    this.getTodayCounts();
    this.getYesdayCounts();
    this.getPreMnthCounts();
    this.getPrevsMnthCounts();
    this.getEnterCounts();
    this.getDomestCounts();
    this.getGrievanCounts();    
    this.getSourcePrsntMnthCounts();
    this.getSourcePreviousMnthCounts();
    this.getCategoryWise();
    this.getResumePnd();
    this.getPendActivation();
    this.getBoxChange();
    this.getPonChange();
    this.getSuspend();
    this.getTerminatn();
  }
	  getEntprvsMonthcount(){
    let rte1 = `subscriberApp/previousmonthenterprisecount`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.entprvsmonthdatacounts = res['data']     
    });
  }

  getDomestprvsMonthcount(){
    let rte1 = `subscriberApp/previousmonthdomesticcount`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.domeprvsmonthdatacounts = res['data']     
    });
  }

  getGrievanprvsMonthcount() {
    let rte1 = `subscriberApp/previousmonthgrivancescount`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.grievanprvsmonthdatacounts = res['data']     
    });
  }
  getDomesticTodayCounts() {
    let rte1 = `subscriberApp/todaydomestictickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.domestictodaycounts = res['data'];
      this.domestictodaycounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.domestictodaycounts)
      this.dnsttodayschrt = [{
        status: "OPEN TICKETS",
        area: this.domestictodaycounts[0].Open,
        color: "#FA4659"
      }, {
        status: "CLOSED TICKETS",
        area: this.domestictodaycounts[0].Close,
        color: "#2EB872"
      },
      {
        status: "RESOLVED",
        area: this.domestictodaycounts[0].Resolved,
        color: "#FA4659"
      },];
    })  
  }
  

  getDomesticPreviousDayCounts() {
    let rte1 = `subscriberApp/previousdaydomestictickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.domesticprvsdaycounts = res['data'];
      this.domesticprvsdaycounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.domesticprvsdaycounts)
      // this.todayschrt = [{
      //   status: "OPEN TICKETS",
      //   area: this.domesticprvsdaycounts[0].Open,
      //   color: "#FA4659"
      // }, {
      //   status: "CLOSED TICKETS",
      //   area: this.domesticprvsdaycounts[0].Close,
      //   color: "#2EB872"
      // },
      // {
      //   status: "RESOLVED",
      //   area: this.domesticprvsdaycounts[0].Resolved,
      //   color: "#FA4659"
      // },];
    })  
  }

  getDomesticPrsntMonth(){
    let rte1 = `subscriberApp/presentmnthdomesticopnclsereslved`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.domesticprsntmnthdatacounts = res['data'];
      this.domesticprsntmnthdatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.domesticprsntmnthdatacounts)
      this.dmstctprsntchrt = [{
        status: "OPEN TICKETS",
        area: this.domesticprsntmnthdatacounts[0].Open,
        color: "#FA4659"
      }, {
        status: "CLOSED TICKETS",
        area: this.domesticprsntmnthdatacounts[0].Close,
        color: "#2EB872"
      },
      {
        status: "RESOLVED",
        area: this.domesticprsntmnthdatacounts[0].Resolved,
        color: "#FA4659"
      },];
    })  
  }

  getDomesticPreviousMonth(){
    let rte1 = `subscriberApp/previousmnthdomestictickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.domesticprvousmnthdatacounts = res['data'];
      this.domesticprvousmnthdatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.domesticprvousmnthdatacounts)
      // this.todayschrt = [{
      //   status: "OPEN TICKETS",
      //   area: this.domesticprvousmnthdatacounts[0].Open,
      //   color: "#FA4659"
      // }, {
      //   status: "CLOSED TICKETS",
      //   area: this.domesticprvousmnthdatacounts[0].Close,
      //   color: "#2EB872"
      // },
      // {
      //   status: "RESOLVED",
      //   area: this.domesticprvousmnthdatacounts[0].Resolved,
      //   color: "#FA4659"
      // },];
    })  
  }

  getEnterprisePrsntMonth() {
    let rte1 = `subscriberApp/presentmnthentrpriseopnclereslvd`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.entprsntmnthdatacounts = res['data'];
      this.entprsntmnthdatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.entprsntmnthdatacounts)
      this.entprsntmnthchrt = [{
        status: "OPEN TICKETS",
        area: this.entprsntmnthdatacounts[0].Open,
        color: "#FA4659"
      }, {
        status: "CLOSED TICKETS",
        area: this.entprsntmnthdatacounts[0].Close,
        color: "#2EB872"
      },
      {
        status: "RESOLVED",
        area: this.entprsntmnthdatacounts[0].Resolved,
        color: "#FA4659"
      },];
    })  
  }


  getEnterprisePreviousMonth(){
    let rte1 = `subscriberApp/previousmnthenterprisetickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.entprvousmnthdatacounts = res['data'];
      this.entprvousmnthdatacounts[0]['total'] = res['data'][0]['Total_Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.entprvousmnthdatacounts)
      // this.todayschrt = [{
      //   status: "OPEN TICKETS",
      //   area: this.entprvousmnthdatacounts[0].Open,
      //   color: "#FA4659"
      // }, {
      //   status: "CLOSED TICKETS",
      //   area: this.entprvousmnthdatacounts[0].Close,
      //   color: "#2EB872"
      // },
      // {
      //   status: "RESOLVED",
      //   area: this.entprvousmnthdatacounts[0].Resolved,
      //   color: "#FA4659"
      // },];
    })  
  }

  getEnterpriseTodayCounts() {
    let rte1 = `subscriberApp/todayenterprisetickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.enttodaycounts = res['data'];
      this.enttodaycounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.enttodaycounts)
      this.enttdycnt = [{
        status: "OPEN TICKETS",
        area: this.enttodaycounts[0].Open,
        color: "#FA4659"
      }, {
        status: "CLOSED TICKETS",
        area: this.enttodaycounts[0].Close,
        color: "#2EB872"
      },
      {
        status: "RESOLVED",
        area: this.enttodaycounts[0].Resolved,
        color: "#FA4659"
      },];
    })
  } 

  getEnterprisePreviousDayCounts(){
    let rte1 = `subscriberApp/previousdayenterprisetickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.entprvsdaycounts = res['data'];
      this.entprvsdaycounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.entprvsdaycounts)
      // this.todayschrt = [{
      //   status: "OPEN TICKETS",
      //   area: this.entprvsdaycounts[0].Open,
      //   color: "#FA4659"
      // }, {
      //   status: "CLOSED TICKETS",
      //   area: this.entprvsdaycounts[0].Close,
      //   color: "#2EB872"
      // },
      // {
      //   status: "RESOLVED",
      //   area: this.entprvsdaycounts[0].Resolved,
      //   color: "#FA4659"
      // },];
    }) 
  }
  
  getTodayCounts() {       
    let rte1 = `subscriberApp/todaytickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.todaydatacounts = res['data'];
      this.todaydatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.todaydatacounts)
      this.todayschrt = [{
        status: "OPEN TICKETS",
        area: this.todaydatacounts[0].Open,
        color: "#FA4659"
      }, {
        status: "CLOSED TICKETS",
        area: this.todaydatacounts[0].Close,
        color: "#2EB872"
      },
      {
        status: "RESOLVED",
        area: this.todaydatacounts[0].Resolved,
        color: "#FA4659"
      },];
    })
  } 

  getYesdayCounts() {       
    let rte1 = `subscriberApp/yesterdaytickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.yesdatacounts = res['data'];
      this.yesdatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.yesdatacounts)
      // this.todayschrt = [{
      //   status: "OPEN TICKETS",
      //   area: this.yesdatacounts[0].Open,
      //   color: "#FA4659"
      // }, {
      //   status: "CLOSED TICKETS",
      //   area: this.yesdatacounts[0].Close,
      //   color: "#2EB872"
      // },
      // {
      //   status: "RESOLVED",
      //   area: this.yesdatacounts[0].Resolved,
      //   color: "#FA4659"
      // },];
    })
  } 


  getPreMnthCounts() {       
    let rte1 = `subscriberApp/presentmonthtickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.tkdatacounts = res['data'];
      this.tkdatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.tkdatacounts)
      this.ticktschrt = [{
        status: "OPEN TICKETS",
        area: this.tkdatacounts[0].Open,
        color: "#FA4659"
      }, {
        status: "CLOSED TICKETS",
        area: this.tkdatacounts[0].Close,
        color: "#2EB872"
      },
      {
        status: "RESOLVED",
        area: this.tkdatacounts[0].Resolved,
        color: "#FA4659"
      },];
    })
  } 


  getPrevsMnthCounts() {       
    let rte1 = `subscriberApp/previousmnthtickets`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.prevsdatacounts = res['data'];
      this.prevsdatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.prevsdatacounts)
      // this.ticktschrt = [{
      //   status: "OPEN TICKETS",
      //   area: this.prevsdatacounts[0].Open,
      //   color: "#FA4659"
      // }, {
      //   status: "CLOSED TICKETS",
      //   area: this.prevsdatacounts[0].Close,
      //   color: "#2EB872"
      // },
      // {
      //   status: "RESOLVED",
      //   area: this.prevsdatacounts[0].Resolved,
      //   color: "#FA4659"
      // },];
    })
  } 


  getEnterCounts() {
    let rte1 = `subscriberApp/enterprisecount`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.enterdatacounts = res['data']     
    });
  }

  getDomestCounts() {
    let rte1 = `subscriberApp/presentmnthdomestictckts`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.domedatacounts = res['data']     
    });
  }

  getGrievanCounts() {
    let rte1 = `subscriberApp/presentmnthgrievance`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.grievandatacounts = res['data']     
    });
  }


  getSourcePrsntMnthCounts() {       
    let rte1 = `subscriberApp/sourceprsntmnth`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.sourceprsntmnthdatacounts = res['data'];
      //this.sourceprsntmnthdatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.sourceprsntmnthdatacounts)
      this.oltschrt = [{
        status: "SUBCRIBER APP",
        area: this.sourceprsntmnthdatacounts[0].subcriber_app,
        color: "#FA4659"
      }, {
       status: "LMO APP",
        area: this.sourceprsntmnthdatacounts[0].lmo_app,
        color: "#2EB872"
      },
      {
        status: "CALL CENTER",
        area: this.sourceprsntmnthdatacounts[0].call_center,
        color: "#FA4659"
      },];
    })
  } 


  getSourcePreviousMnthCounts() {       
    let rte1 = `subscriberApp/sourceprvsmnth`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data']);
      //console.log('tickets')
      this.sourcepremnthdatacounts = res['data'];
      //this.sourceprsntmnthdatacounts[0]['total'] = res['data'][0]['Total Tickets']; // Space and Capital letter defined to the commond//
      console.log(this.sourcepremnthdatacounts)
      // this.oltschrt = [{
      //   status: "SUBCRIBER APP",
      //   area: this.sourcepremnthdatacounts[0].subcriber_app,
      //   color: "#FA4659"
      // }, {
      //  status: "LMO APP",
      //   area: this.sourcepremnthdatacounts[0].lmo_app,
      //   color: "#2EB872"
      // },
      // {
      //  status: "CALL CENTER",
      //   area: this.sourcepremnthdatacounts[0].call_center,
      //   color: "#FA4659"
      // },];
    })
  } 


  getCategoryWise() {
    let rte1 = `subscriberApp/categorywisecomplaints`;
    this.crdSrvc.get(rte1).subscribe((res) => {
    console.log(res['data'])
    this.categorywisedatacounts = res['data'] 
    this.name = res['data']        
    });
  }


  getResumePnd() {
    let rte1 = `subscriberApp/todayresmepending`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.resumedatacounts = res['data']     
    });
  }

  getPendActivation() {
    let rte1 = `subscriberApp/todaypendingactivation`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.pendingdatacounts = res['data']     
    });
  }

  getBoxChange() {
    let rte1 = `subscriberApp/todayboxchnage`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.boxdatacounts = res['data']     
    });
  }

  getPonChange() {
    let rte1 = `subscriberApp/todayponchange`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.pondatacounts = res['data']     
    });
  }

  getSuspend() {
    let rte1 = `subscriberApp/todaysuspndpending`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.suspenddatacounts = res['data']     
    });
  }

  getTerminatn() {
    let rte1 = `subscriberApp/todayterminationpending`;
    this.crdSrvc.get(rte1).subscribe((res) => {
      console.log(res['data'])
      this.termdatacounts = res['data']     
    });
  }


}
