import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Router } from '@angular/router';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import { DsUtils } from '@glits/utils';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CrudService } from 'app/main/apps/crud.service';


@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.scss']
})
export class MyTicketsComponent implements OnInit {

  // tickets: any = [];
  ticketsDta: any =[];
  editorValue: any;
  toolbarButtonOptions: any;
  title: string = 'Created by me';
  searchInput: FormControl;
  searchRaised = '';
  searchPrority = '';
  searchCat = '';
  searchText: string;
  categoryView: boolean = false;
  events: string[] = [];
  opened = true;
  ticketFormGroup: FormGroup;
  private _unsubscribeAll: Subject<any>;
  usrdtls: any;
  sideFltrTckts: any[];
  shwTcktsNoData: boolean;
  searchLoader: boolean =false;
  teamm_id : any;

  getHeaderDtls = function (dt): any {
    return { 'title': dt.mnu_itm_nm, 'icon': 'list_alt' };
  };
  ticketsData: any = [];
  itmsDtls: any;
  UsrDtls: any;
  esclationData: any = [];

  constructor(
    public router: Router, private _dsSidebarService: DsSidebarService, public fb: FormBuilder, private crdsrv: CrudService
  ) {
    this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): any {
    console.log("In MyTicketsComponent")
    this.ticketFormGroup = this.fb.group({
      orgn_typ: new FormControl(''),
      name: new FormControl('')
    });
    this.searchInput = new FormControl('');
    this.getMyTcktsFn({ rsd_by: this.usrdtls.usr_id });
    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        // this._contactsService.onSearchTextChanged.next(searchText);
        this.searchText = searchText;
        this.getMyTcktsFn({ rsd_by: this.usrdtls.usr_id });
      });
  }
  getMyTcktsFn(val): any {
    console.log(val);
    console.log(this.searchText);
    if (this.searchText && this.searchText !== '') {
      console.log(this.searchText);
      this.ticketsDta = DsUtils.filterArrayByString(this.ticketsDta, this.searchText);
      console.log("ticketsDta");
      console.log(this.ticketsDta)
      console.log(this.searchText.length)
      if(this.searchText.length >= 9){
        let data = {
          indicator: 'TicketID',
          id: this.searchText
          }
        console.log(data);
        this.searchLoader = true;
        let rte = 'ticket/get_TicketDetails'
        this.crdsrv.create(data, rte).subscribe((res) => {
          this.ticketsData = res['data'];
          console.log(this.ticketsData);
          
          for (var p = 0; p < this.ticketsData.dtarslts.length; p++) {
            this.ticketsData.dtarslts[p]['indicator'] = 'TicketID';
            this.ticketsData.dtarslts[p]['id'] = data.id;
            this.ticketsData.dtarslts[p]['loginuserteamid'] = this.UsrDtls[0].tm_id;
          }
          this.searchLoader = false;
          console.log("ticketsData");
          console.log(this.ticketsData);
        })
      }
    }
  }
  getEvent($event): void {
    this.ticketsData = [];
    this.title = $event.mnu_itm_nm;
    let data = {
      indicator: $event.indicator,
      id: $event.id,
      loginuserteamid:0
    } 
    if (data.indicator == 'ESCALATED'){
      let rte = 'ticket/esclation'
      this.crdsrv.get(rte).subscribe((res) => {
        this.esclationData = res['data'];
        console.log(this.esclationData);
        if (res['status'] == 200) {
          this.crdsrv.get('ticket/getDetails').subscribe((res) => {
            console.log(res['data']);
            // this.itmsDtls = res['data'][0];
            this.UsrDtls = res['data'][1];
            let semicolumnORcomma = ' ,'
            let concat = ' '
            for (var i = 0; i < this.UsrDtls .length; i++) {
              if (i + 1 == this.UsrDtls.length) {
                  semicolumnORcomma = ' '
              }
              concat += this.UsrDtls[i].tm_id + semicolumnORcomma;
          }
      
          this.teamm_id = concat;
            if (data.indicator == 'ASSIGNEDTOTEAM' || data.indicator == 'ASSIGNEDBYME' || data.indicator == 'CREATEDBYME' || data.indicator == 'CREATEDBYTEAM' || data.indicator == 'APPROVAL' || data.indicator == 'MYAPPROVAL') {
              data.id = this.teamm_id;
              data.loginuserteamid = this.teamm_id
            }
            data.loginuserteamid = this.teamm_id
            console.log(data);
            this.searchLoader = true;
            let rte = 'ticket/get_TicketDetails'
            this.crdsrv.create(data, rte).subscribe((res) => {
              this.ticketsData = res['data'];
              console.log(this.ticketsData);
              for (var p = 0; p < this.ticketsData.dtarslts.length; p++) {
                this.ticketsData.dtarslts[p]['indicator'] = $event.indicator;
                this.ticketsData.dtarslts[p]['id'] = data.id;
                this.ticketsData.dtarslts[p]['loginuserteamid'] = this.UsrDtls[0].tm_id;
              }
              this.searchLoader = false;
              console.log("ticketsData");
              console.log(this.ticketsData);
            })
          })
        }
      })
    } else{
    this.crdsrv.get('ticket/getDetails').subscribe((res) => {
      console.log(res['data']);
      // this.itmsDtls = res['data'][0];
      this.UsrDtls = res['data'][1];
      let semicolumnORcomma = ' ,'
      let concat = ' '
      for (var i = 0; i < this.UsrDtls .length; i++) {
        if (i + 1 == this.UsrDtls.length) {
            semicolumnORcomma = ' '
        }
        concat += this.UsrDtls[i].tm_id + semicolumnORcomma;
    }

    this.teamm_id = concat;
    console.log(this.teamm_id);
      if (data.indicator == 'ASSIGNEDTOTEAM' || data.indicator == 'ASSIGNEDBYME' || data.indicator == 'CREATEDBYME' || data.indicator == 'CREATEDBYTEAM' || data.indicator == 'APPROVAL' || data.indicator == 'MYAPPROVAL') {
        data.id = this.teamm_id;
        data.loginuserteamid = this.teamm_id
      }
      data.loginuserteamid = this.teamm_id
      console.log(data);
      this.searchLoader = true;
      let rte = 'ticket/get_TicketDetails'
      this.crdsrv.create(data, rte).subscribe((res) => {
        this.ticketsData = res['data'];
        console.log(this.ticketsData);
        for (var p = 0; p < this.ticketsData.dtarslts.length; p++) {
          this.ticketsData.dtarslts[p]['indicator'] = $event.indicator;
          this.ticketsData.dtarslts[p]['id'] = data.id;
          this.ticketsData.dtarslts[p]['loginuserteamid'] = this.UsrDtls[0].tm_id;
        }
        this.searchLoader = false;
        console.log(this.ticketsData);
      })
    })
  }
  }

  getFltrTcktsLst(slctdTckts): any {
    if (slctdTckts.length != 0) {
      this.ticketsDta = slctdTckts;
      this.shwTcktsNoData = false;
    } else {
      this.shwTcktsNoData = true;
      this.ticketsDta = this.sideFltrTckts;
    }

  }

  openForm() {
    this.router.navigate(['/admin/support/my-tickets/request-form']);
  }

  //  saveTicket(): any {
  //   console.log('new ticket');
  // }

  //   openSideBar(): any {
  //     this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  //   }
  //   closeSideBar(): any {
  //     this._dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  //   }

}
