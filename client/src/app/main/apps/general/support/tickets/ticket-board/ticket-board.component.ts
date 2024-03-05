import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';


@Component({
  selector: 'app-ticket-board',
  templateUrl: './ticket-board.component.html',
  styleUrls: ['./ticket-board.component.scss']
})
export class TicketBoardComponent implements OnInit {
  deleteCategory;
  born_settings = [{
    "title": "Tickets Created by Me",
    "tabs": [{ "id": 1, "nm": "Open/Not Accepted", "url": "open", "flters": { "act_usr_id": null, "crte_usr_id": 123, "sts_id": 0 } }
      , { "id": 2, "nm": "In Progress", "flters": { "crte_usr_id": 123, "clse_in": 0 } }
      , { "id": 3, "nm": "Closed", "flters": { "crte_usr_id": 123, "clse_in": 1 } }]
  }, {
    "title": "Tickets Created for me",
    "tabs": [{ "id": 1, "nm": "Open/Not Accepted", "flters": { "usr_id": 123, "sts_id": 0 } }
      , { "id": 2, "nm": "In Progress(By Me)", "flters": { "act_usr_id": 123, "sts_id": 1 } }
      , { "id": 3, "nm": "Closed(By Me)", "flters": { "act_usr_id": 123, "sts_id": 2 } }
      , { "id": 4, "nm": "SLA Breached(By Me)", "flters": { "act_usr_id": 123, "sts_id": 2 } }
      , { "id": 5, "nm": "In Progress(By Group)", "flters": { "usr_id": 123, "sts_id": 0 } }
      , { "id": 6, "nm": "Closed(By Group)", "flters": { "usr_id": 123, "sts_id": 0 } }
      , { "id": 7, "nm": "SLA Breached(By Group)", "flters": { "act_usr_id": 123, "sts_id": 2 } }]
  }, {
    "title": "Tickets Created for $$group$$",
    "tabs": [{ "id": 1, "nm": "Open/Not Accepted", "flters": { "usr_id": 123, "sts_id": 0 } }
      , { "id": 2, "nm": "In Progress", "flters": { "usr_id": 123, "sts_id": 0 } }
      , { "id": 3, "nm": "Closed", "flters": { "usr_id": 123, "sts_id": 0 } }]
  }
  ]
  active_board = this.born_settings[1];
  active_tab = this.active_board.tabs[0];
  slctdIndx = 0;
  currentTab: any
  public form: FormGroup;
  unsubcribe: any;

  // Formdata = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  //   picture: new FormControl(''),
  //   country: new FormControl(''),
  //   gender: new FormControl(''),
  //   hobby: new FormControl(''),
  //   comment: new FormControl(''),
  // });
  saveFormData=function(data){
    console.log (data)
  }

  // public form_functions:any ={"onSave":this.saveFormData}
  public fields: any[] = [
    { type: 'text',name: 'firstName',label: 'First Name',value: '',required: true,},
    { type: 'text',name: 'lastName',label: 'Last Name',value: '',required: true,},
    { type: 'text',name: 'email',label: 'Email',value: '',required: true,},
    { type: 'file',name: 'picture',label: 'Picture',required: true,onUpload: this.onUpload.bind(this)},
    { type: 'dropdown',name: 'country',label: 'Country',value: 'in',required: true,
      options: [
        { key: 'in', label: 'India' },
        { key: 'us', label: 'USA' }
      ]
    },
    { type: 'radio',name: 'gender',label: 'Gender',value: 'm',required: true,
      options: [
        { key: 'm', label: 'Male' },
        { key: 'f', label: 'Female' }
      ]
    },
    { type: 'checkbox',name: 'hobby',label: 'Hobby',required: true,
      options: [
        { key: 'f', label: 'Fishing' },
        { key: 'c', label: 'Cooking' }
      ]
    }
  ];
  public formDetails : any ={
    fnctns  :{},
    //Formdata:this.Formdata,
    apis    :{"upd_url":"/designations/$$emp_id$$",
             "ins_url":"/designations"},
    initdata:{ "emp_id":123213,
              firstName: "sunil",
              lastName: "mulagada",
              email: "msunilkumar@gmail.com",
              picture: "",
              country: "us",
              gender: "f",
              hobby: {f: true, c: null}
            },
    fields  :this.fields,
    key_field:["emp_id"],
    stngs   :{ "style" :"mat",
                "saveAsBtn":false,
                "closeBtn":false,
                "model_style":"right",
                "new_title":"Add New Designation"

    }
  } 
  constructor(private _dsSidebarService: DsSidebarService) {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    })
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }
  opensideBar(key, deprtmntUpdtData) {

    // if (deprtmntUpdtData) {
    //   this.sideBarHeader = 'Edit';
    //   this.editClicked = true;
    //   this.updateData = deprtmntUpdtData;
    //   this.formOutletCategory.get('otlt_ctgry_nm').setValue(deprtmntUpdtData.otlt_ctgry_nm);
    // } else {
    //   this.sideBarHeader = 'Add New';
    //   this.deleteCategory = false;
    //   this.editClicked = false;
    //   this.formOutletCategory.get('otlt_ctgry_nm').setValue('');
    // }
    console.log(deprtmntUpdtData);

    // this.formOutletCategory.get('otlt_ctgry_nm').setValue('');
    // console.log("************************calll ************************");
  this._dsSidebarService.getSidebar(key).toggleOpen();
}

  ngOnInit() {
  }

  onUpload(e) {
    console.log(e);

  }

  getFields() {
    return this.fields;
  }

  ngDistroy() {
    this.unsubcribe();
  }

  selectedIndex(tabIndex) {
    this.slctdIndx = tabIndex;
    this.active_tab = this.active_board.tabs[tabIndex];
  }

}
