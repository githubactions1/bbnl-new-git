import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';

@Component({
  selector: 'app-support-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @Output() ClickEvent = new EventEmitter<boolean>();

  menulst: any = [];
  typeDtls: any;
  statusDtls: any;
  categoryDtls: any;
  alleventCounts:any;
  itmsDtls:any;
  UsrDtls:any;
  constructor(private crdsrv: CrudService) {
    this.menulst = [
      {
        prnt_mnu_itm_id: 1,
        prnt_mnu_itm_nm: 'MY TICKETS',
        sub_mnus: [{
          id:'',
          mnu_itm_nm: 'Assigned to my Team',
          mnu_itm_url_tx: '',
          mnu_icn_tx: 'AT',
          mnu_icn_tx_bg: '#fdacbc',
          mnu_icn_tx_clr: '#f20534',
          indicator: "ASSIGNEDTOTEAM",
          count:''
        },{
          id:'',
          mnu_itm_nm: 'Accept By Me',
          mnu_itm_url_tx: '',
          mnu_icn_tx: 'A',
          mnu_icn_tx_bg: 'rgb(172 189 145);',
          mnu_icn_tx_clr: 'rgb(204 255 2);',
          indicator: "ASSIGNEDBYME",
          count:''
        },
        {
          id:'',
          mnu_itm_nm: 'Create By Me',
          mnu_itm_url_tx: '',
          mnu_icn_tx: 'C',
          mnu_icn_tx_bg: 'rgb(169 147 255);',
          mnu_icn_tx_clr: 'rgb(127 0 223)',
          indicator: "CREATEDBYME",
          count:''
        },
        {
          id:'',
          mnu_itm_nm: 'Created By Team',
          mnu_itm_url_tx: '',
          mnu_icn_tx: 'CT',
          mnu_icn_tx_bg: '#93b5ff',
          mnu_icn_tx_clr: '#0046df',
          indicator: "CREATEDBYTEAM",
          count:''
        },
        {
          id:'',
          mnu_itm_nm: 'To Approve',
          mnu_itm_url_tx: '',
          mnu_icn_tx: 'AP',
          mnu_icn_tx_bg: 'rgb(245 199 236)',
          mnu_icn_tx_clr: 'rgb(223 0 216)',
          indicator: "APPROVAL",
          count:''
        },
        {
          id:'',
          mnu_itm_nm: 'My Approvals',
          mnu_itm_url_tx: '',
          mnu_icn_tx: 'AP',
          mnu_icn_tx_bg: 'rgb(245 179 160)',
          mnu_icn_tx_clr: 'rgb(241 68 17)',
          indicator: "MYAPPROVAL",
          count:''
        },
        {
          id:'',
          mnu_itm_nm: 'Escalated To',
          mnu_itm_url_tx: '',
          mnu_icn_tx: 'ES',
          mnu_icn_tx_bg: 'rgb(255 250 193)',
          mnu_icn_tx_clr: 'rgb(247 217 5)',
          indicator: "ESCALATED",
          count:''
        }],
        submnus:[]
      },
      //  {
      //   prnt_mnu_itm_id: 2,
      //   prnt_mnu_itm_nm: 'STATUS',
      //   submnus:[]
      // }, {
      //   prnt_mnu_itm_id: 3,
      //   prnt_mnu_itm_nm: 'TYPE',
      //   submnus:[]
      // },
      // {
      //   prnt_mnu_itm_id: 4,
      //   prnt_mnu_itm_nm: 'CATEGORY',
      //   submnus:[]
      // },
    ]
  }

  ngOnInit() {
     this.getSidemenuItems();
    console.log(this.menulst);
    // if (this.menulst[0].prnt_mnu_itm_id) {
    //   this.item(this.menulst[0].sub_mnus[0].mnu_itm_nm);
    // } else
    //   this.item(this.menulst[0].mnu_itm_nm);
      this.item(this.menulst[0].sub_mnus[0]);
  }
  getSidemenuItems(){
    // const rte = 'ticket/getDetails'
    // this.crdsrv.get(rte).subscribe((res) => {
    //   console.log(res['data']);
    //   this.itmsDtls = res['data'][0];
    //   this.UsrDtls = res['data'][1];
    //   console.log(this.itmsDtls);
    //   console.log(this.menulst);
      for(var k=0; k<this.menulst.length; k++){
        if(this.menulst[k].prnt_mnu_itm_nm == 'MY TICKETS'){
          this.menulst[k].submnus.push(this.menulst[k].sub_mnus);
        }
        // if(this.menulst[k].prnt_mnu_itm_nm == 'STATUS'){
        //   this.menulst[k].submnus.push(this.itmsDtls[0]);
        // }
        // if(this.menulst[k].prnt_mnu_itm_nm == 'TYPE'){
        //   this.menulst[k].submnus.push(this.itmsDtls[1]);
        // }
        // if(this.menulst[k].prnt_mnu_itm_nm == 'CATEGORY'){
        //   this.menulst[k].submnus.push(this.itmsDtls[2]);
        // }
      }
      console.log(this.menulst);
    // })
  }
  item(data) {
    console.log(data);
    // this.ClickEvent=data;
    this.ClickEvent.emit(data);
    // alert("You Clicked Me!");
  }
 



}
