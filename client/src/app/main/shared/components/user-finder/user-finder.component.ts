import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CrudService } from 'app/main/apps/crud.service';
import { dsAnimations } from '@glits/animations';

@Component({
  selector: 'app-user-finder',
  templateUrl: './user-finder.component.html',
  styleUrls: ['./user-finder.component.scss'],
  animations: dsAnimations,
})
export class UserFinderComponent implements OnInit {
  FilterForm: FormGroup;
  membersForm: FormGroup;
  date: any;
  // ulbs: FormControl;
  // dstct: FormControl;
  chkd: FormControl;
  schdistLst: any;
  ulbL: any;
  isFilters: boolean;
  isResults: boolean = false;
  finalresults: boolean = false;
  isSelectable: boolean;
  isSelectAll: any;
  users: any;
  slctedusrs = [];
  searchInput: FormControl;
  svmL: any;
  dprtL: any;
  dstid
  mdlid
  svmid
  dprtid
  constructor(private datePipe: DatePipe, private crdsrv: CrudService) { }

  ngOnInit() {
    this.FilterForm = new FormGroup({
      ulbs: new FormControl('', Validators.required),
      dstct: new FormControl('', Validators.required),
      dprmt: new FormControl('', Validators.required),

    })
    this.FilterForm = new FormGroup({
      chkd: new FormControl('', Validators.required),
    })
    this.date = this.datePipe.transform(new Date(), "dd-MM-yyyy");

    this.dsrtcLst()
    this.dprtLst()
    // this.ulbLst()

  }
  checkchng(row, event) {
    console.log(row)
    console.log(event)
    if (event.checked) {
      this.slctedusrs.push(row)
    }
    console.log(this.slctedusrs)

  }
  delUsr(deldta) {
    console.log(deldta)
    // this.slctedusrs.pop(deldta)
    const index: number = this.slctedusrs.indexOf(deldta);
    if (index !== -1) {
      this.slctedusrs.splice(index, 1);
    }
    console.log(this.slctedusrs)
  }
  dsrtcLst() {
    const rte = 'web/common/dstrctLst';
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res);
      console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.schdistLst = res['data'];

        }
      }
    })
  }

  ulbLst(id) {
    this.dstid = id.value
    this.mdlid = null;
    this.ulbL = []
    this.svmL = []
    this.svmid = null;
    const rte = 'web/common/mandalLst/' + id.value;
    this.crdsrv.getDistLst(rte).subscribe(res => {
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.ulbL = res['data'];
          console.log(this.ulbL)
          console.log(id.value)
        }
      }
    })

  }
  svmLst(id) {
    this.mdlid = id.value
    this.svmid = null;

    const rte = 'web/common/svmLst/' + id.value;
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res)
      if (res['status'] == 200) {
        if (res['data'].length > 0) {

          this.svmL = res['data'];
          console.log(this.svmL)
        }
      }
    })
    console.log();
  }
  onSvmSelect(id) {
    this.svmid = id.value
  }
  dprtLst() {

    const rte = 'web/common/dprtLst/'
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res)
      if (res['status'] == 200) {
        if (res['data'].length > 0) {

          this.dprtL = res['data'];

        }
      }
    })
    console.log();
  }
  dprtLstid(id) {
    this.dprtid = id.value
  }
  showFilters() {
    if (this.isFilters) {
      this.isFilters = false;
    } else {
      this.isFilters = true;
    }

  }
  saveFilters(id) {

    let data = {}
    if (this.dprtid != null) {
      data['dstid'] = this.dprtid
    } if (this.mdlid != null) {
      data['mdlid'] = this.mdlid
    } if (this.svmid != null) {
      data['svmid'] = this.svmid
    } if (this.dprtid != null) {
      data['dprtid'] = this.svmid
    }
    // var  data={
    //   dstid:this.dstid,
    //   mdlid:this.mdlid,
    //   svmid: this.svmid,
    //   dprtid:this.dprtid
    //   }
    console.log(this.FilterForm.value)
    console.log(this.isResults)
    const rte = 'web/common/getUsrs/'
    this.crdsrv.getbydata(rte, data).subscribe(res => {
      console.log(res)
      if (res['status'] == 200) {
        if (res['data'].length > 0) {

          this.users = res['data'];
          console.log(id.value)
        }
      }
    })
    this.isFilters = false;
    this.isResults = true;
    //   this.users=[
    //     {
    //     usr_id:1,
    //     usr_nm:"pradeep"
    //   }, {
    //     usr_id:2,
    //     usr_nm:"pradeep"
    //   }, {
    //     usr_id:3,
    //     usr_nm:"pradeep"
    //   }, {
    //     usr_id:4,
    //     usr_nm:"pradeep"
    //   }, {
    //     usr_id:5,
    //     usr_nm:"pradeep"
    //   }, {
    //     usr_id:6,
    //     usr_nm:"pradeep"
    //   }, {
    //     usr_id:7,
    //     usr_nm:"pradeep"
    //   }, {
    //     usr_id:8,
    //     usr_nm:"pradeep"
    //   }, {
    //     usr_id:9,
    //     usr_nm:"ram"
    //   }, {
    //     usr_id:10,
    //     usr_nm:"pradeep"
    //   },
    // ]



  }
  toggleSelect() {
    if (this.isSelectable) {
      this.isSelectable = false;
      this.isSelectAll = false;
    } else {
      this.isSelectable = true;
    }
  }
  toggleSelectAll() {
    this.isSelectable = true
    if (this.isSelectAll) {
      this.isSelectAll = false;
    } else {
      this.isSelectAll = true;
    }
  }
  onSelectUsers() {

    this.isResults = false;
    this.finalresults = true;

  }

}
