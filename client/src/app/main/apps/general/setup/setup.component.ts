import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as _ from 'lodash';
import { CrudService } from '../../crud.service';
import { DsNavigationService } from '@glits/components/navigation/navigation.service';


@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  public setup: any;
  invntSetup;
  setupCln;
  setupPrfleData;
  setupPrfleDataFromServer;
  IsChecked: boolean;
  shwTabs: boolean = false;
  checkData;
  checkLbl1 = 'Payroll';
  tabs = [];
  tabsData;
  outletData;
  /**
   * Constructor
   *
   * @param {DsNavigationService} _dsNavigationService
   */
  searchInput: FormControl;
  private _unsubscribeAll: Subject<any>;
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  advanc: any[];

  usrDtls;
  menuitms;
  tabLabel;
  outletSettingData = [];
  breakpoint: number;
  chg_lg_info: any;
  hdrDta: any;
  searchText: string;
  result = [];
  getHeaderDtls = function() { return {"title":"Setup","icon":"settings"}}
  constructor(public router: Router, public crdsrv: CrudService, private dsNavigationService: DsNavigationService) {
    this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.menuitms = JSON.parse(localStorage.getItem('mnuDtls'));
    this.IsChecked = false;
    this.searchInput = new FormControl('');
    this._unsubscribeAll = new Subject();
    this.setupCln = _.cloneDeep(this.setup);
  }

  

  btnClick = function (url) {
    this.router.navigate(['/admin' + url]);
  };

  initilieze = () => {
    this.setup = _.cloneDeep(this.setupCln);
  }

  srchFltr = (val) => {
    this.initilieze();
    if (val && val.trim() !== '') {
      this.setup = this.setup.filter((item) => {
        let d = [];
        d = item.subsetup.filter((k) => {
          return (k.nm.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        if (d.length > 0) {
          return item.subsetup = d;
        }
        else {

        }

      });
    }
  }

  ngOnInit(): void {


    this.breakpoint = (window.innerWidth <= 400) ? 1 : (window.innerWidth <= 600 && window.innerWidth >= 400) ? 2 :
      (window.innerWidth <= 800 && window.innerWidth >= 600) ? 3 : 4;

    const usrDetails = JSON.parse(localStorage.getItem('usrDtls'));
    this.getsetupdata(usrDetails);

    this.searchInput.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchText => {
        this.srchFltr(searchText);
      });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : (event.target.innerWidth <= 600 && event.target.innerWidth >= 400) ? 2 :
      (event.target.innerWidth <= 800 && event.target.innerWidth >= 600) ? 3 : 4;
  }

  getsetupdata(data): void {
    const rte = 'user/setup/profile';
    this.crdsrv.getUserSetupData(rte).subscribe(res => {

      for (let i = 0; i < res['data'].length; i++){
        res['data'][i]['grp_nm'] = res['data'][i].stp_grp_nm;
        for (let j = 0; j < res['data'][i].opts.length; j++){
          res['data'][i].opts[j]['opt_nm'] = res['data'][i].opts[j].stp_opt_nm;
      }
    }

    this.setup = res['data'];
    });
  }


  addNavItemWithCustomFunction(type) {
    // Prepare the new nav item
    const newNavItem = {
      id: type.mnu_itm_id,
      mnu_itm_id: type.mnu_itm_id,
      title: type.mnu_itm_nm,
      type: 'item',
      icon: type.mnu_itm_icn_tx,
      mnu_itm_nm: type.mnu_itm_nm,
      mnu_itm_url_tx: type.mnu_itm_url_tx,
      mnu_itm_icn_tx: type.mnu_itm_icn_tx,
      url: type.mnu_itm_url_tx,
      translate: 'NAV.APPLICATIONS',
    };
    this.menuitms[0].children.push(newNavItem);
    localStorage.setItem('mnuDtls', JSON.stringify(this.menuitms));
    setTimeout(() => {
      this.crdsrv.setMnuDtl(this.menuitms);
    }, 500);
    // Add the new nav item at the beginning of the navigation
    this.dsNavigationService.addNavigationItem(newNavItem, 'applications');
  }
  checked(event, type) {
    if (event.checked == true) {
      this.addNavItemWithCustomFunction(type);
      this.active(type);
    }
    else {
      this.dsNavigationService.removeNavigationItem(type.mnu_itm_id);
      this.menuitms[0].children.splice(this.menuitms[0].children.indexOf(type.mnu_itm_id), 1);
      localStorage.setItem('mnuDtls', JSON.stringify(this.menuitms));
      setTimeout(() => {
        this.crdsrv.setMnuDtl(this.menuitms);
      }, 500);
      this.unactive(type);
    }
  }
  active(data) {
    data.a_in = 1;
    const rte = 'merchant/menu/active';
    this.crdsrv.update(data, rte).subscribe((res) => {
    });

  }
  unactive(data) {
    data.a_in = 0;
    const rte = 'merchant/menu/active';
    this.crdsrv.update(data, rte).subscribe((res) => {
    });
  }
}
