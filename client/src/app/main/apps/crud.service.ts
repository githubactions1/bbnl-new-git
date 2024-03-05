import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/Rx';
import * as _ from 'lodash';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //uri = 'http://localhost:4901/apiv1/';
  public usrLgnDtls: BehaviorSubject<any>;
  usrMnuDtls: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('usrDtls')) {
      let jsonData = localStorage.getItem('usrDtls');
      this.usrLgnDtls = new BehaviorSubject(jsonData);
    }
    else {
      this.usrLgnDtls = new BehaviorSubject({});
    }
    if (localStorage.getItem('mnuDtls')) {
      let jsonData = localStorage.getItem('mnuDtls');
      this.usrMnuDtls = new BehaviorSubject(jsonData);
    }
    else {
      this.usrMnuDtls = new BehaviorSubject({});
    }
  }


  // ----------------------------------
  create(postdata, rte) {
    return this.http.post(`/${rte}`, { data: postdata })}
  create_ext(postdata, rte) {
	  return this.http.post(`/${rte}`, postdata)
	}
  createPdf(postdata, rte) {
    return this.http.post(`/${rte}`, { data: postdata }).timeout(5000000)}
  get(rte) {
    return this.http.get(`/${rte}`);
  }

  update(postdata, rte) {
    return this.http.put(`/${rte}`, { data: postdata });
  }
  delete(rte) {
    return this.http.delete(`/${rte}`);
  }
  // ----------------------------------




  setUsrDtl(val) {
    this.usrLgnDtls.next(val);
  }
  setMnuDtl(val) {
    this.usrMnuDtls.next(val);
  }

  getUsrLgnDtls() {
    let jsonData = localStorage.getItem('usrDtls');
    this.usrLgnDtls.next(jsonData);
    return this.usrLgnDtls;
  }
  getUsrMnuDtls() {
    let jsonData = localStorage.getItem('mnuDtls');
    this.usrMnuDtls.next(jsonData);
    return JSON.parse(this.usrMnuDtls.value)[0].children;
  }
  getMnuItmId(name) {
    let item = _.filter(this.getUsrMnuDtls(), function (i) {
      if (i.mnu_itm_nm === name) {
        return i;
      }
    });
    return (item[0]['mnu_itm_id'])
  }
  getmnuItmUrl(id) {
    let item = _.filter(this.getUsrMnuDtls(), function (i) {
      if (i.mnu_itm_id == id) {
        return i
      }
    })
    return (item[0]['mnu_itm_url_tx'])

  }
  getStpIn(name) {
    let item = _.filter(this.getUsrMnuDtls(), function (i) {
      if (i.mnu_itm_nm === name) {
        return i;
      }
    })
    return (item[0]['stp_in']);
  }
  getUserSetupData(rte) {
    return this.http.get(`/${rte}`);
  }
  getbydata(rte, data) {
    return this.http.post(`/${rte}`, { data: data });
  }

  gtChangeLog(rte) {
    return this.http.get(`/${rte}`);
  }

  udtlgsts(rte, chng_lg_in) {
    return this.http.post(`/${rte}`, chng_lg_in);
  }

  logDtls(rte) {
    return this.http.get(`/${rte}`);
  }

  chartData(rte) {
    return this.http.get(`/${rte}`);
  }

  distwswBarGrphLst(rte) {
    return this.http.get(`/${rte}`)
  }

  getLnegrphs(rte) {
    return this.http.get(`/${rte}`)
  }

  pstRcrtmntData(rte, data) {
    return this.http.post(`/${rte}`, data);
  }

  getDistLst(rte, ) {
    return this.http.get(`/${rte}`)
  }
  getSvmLstByID(rte, data) {
    return this.http.post(`/${rte}`, data);
  }

  getMndlLst(rte) {
    return this.http.get(`/${rte}`)
  }


  getvlgLst(rte, ) {
    return this.http.get(`/${rte}`)
  }

  getschvlmLst(rte) {
    return this.http.get(`/${rte}`)
  }

  dprtmntlmLst(rte) {
    return this.http.get(`/${rte}`)
  }

  getEmpDtsl(rte) {
    return this.http.get(`/${rte}`)
  }

  getSvmEmpLst(rte) {
    return this.http.get(`/${rte}`)
  }

  updateImgData(rte, data) {
    return this.http.put(`/${rte}`, data);
  }
}
