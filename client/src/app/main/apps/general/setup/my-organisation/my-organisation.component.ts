import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-my-organisation',
  templateUrl: './my-organisation.component.html',
  styleUrls: ['./my-organisation.component.scss']
})
export class MyOrganisationComponent implements OnInit {
  [x: string]: any;
  mrchtDataForm: FormGroup;
  orgData: any;
  spnrCtrl;
  public orgnData: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  steLst: any;
  ctyLst: any;
  imageUrl;
  loader:boolean;
  disable: boolean;
  // cd: any;
  editFile: boolean;
  removeUpload: boolean;
  constructor(private _formBuilder: FormBuilder, public crdsrv: CrudService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.mrchtDataForm = this._formBuilder.group({
      mrcht_nm: ['', Validators.required],
      mrcht_dsply_nm: [''],
      mrcht_img_url_txt: [''],
      address: [''],
      city: [''],
      eml_tx: [''],
      mble_ph: [''],
      state: ['']
  });
  this.getCities();
  this.getStates();
  this.getorganisationDtls();
  }

  getStates(){
    const sterte = `user/getstates`;
    this.crdsrv.get(sterte).subscribe((res) => {
      this.steLst = res['data'];
    });
  }

  getCities(){
    const ctyrte = `user/cities`;
    this.crdsrv.get(ctyrte).subscribe((res) => {
      this.ctyLst = res['data'];
    });
  }

  getorganisationDtls() {
    this.loader=true;
    const organisation = `user/mymerchant`;
    this.crdsrv.get(organisation).subscribe((res) => {
      if(res['status']==200)
      {
        this.loader=false;
        let resorgnData = res['data'];
        this.orgnData = resorgnData[0];
        this.disable = true;
        if (res['data'].length > 0) {
            this.orgData = res['data'][0];
            this.imageUrl = this.orgnData.mrcht_imge_url_tx;
            this.mrchtDataForm.get('mrcht_nm').setValue(this.orgData.mrcht_nm);
            this.mrchtDataForm.get('mrcht_dsply_nm').setValue(this.orgData.mrcht_dsply_nm);
            this.mrchtDataForm.get('mrcht_img_url_txt').setValue(this.orgData.mrcht_imge_url_tx);
            this.mrchtDataForm.get('eml_tx').setValue(this.orgData.eml_tx);
            this.mrchtDataForm.get('mble_ph').setValue(this.orgData.mble_ph);
            this.mrchtDataForm.get('address').setValue(this.orgData.addr1_tx);
            this.mrchtDataForm.get('state').setValue(this.orgData.ste_id);
            this.mrchtDataForm.get('city').setValue(this.orgData.cty_id);
        }
      }
       
    });
}

uploadFile(event) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];

  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.imageUrl = reader.result;
      // this.prflimageUrl = reader.result;
      this.mrchtDataForm.patchValue({
        file: reader.result
      });
      this.editFile = false;
      this.removeUpload = true;
    };
    // ChangeDetectorRef since file is loading outside the zone
    // this.cd.markForCheck();
  }
}

saveMrchtData(){

  let rte = "user/mymerchant";
  // this.usrdtls = JSON.parse(localStorage.getItem('usrDtls'));
  let organizationData = {
    // dsgn_id: data.dsgn_id,
    mrcht_nm: this.mrchtDataForm.value.mrcht_nm,
    mrcht_dsply_nm: this.mrchtDataForm.value.mrcht_dsply_nm,
    addr1_tx: this.mrchtDataForm.value.address,
    cty_id: this.mrchtDataForm.value.city,
    ste_id: this.mrchtDataForm.value.state,
    eml_tx: this.mrchtDataForm.value.eml_tx,
    mble_ph: this.mrchtDataForm.value.mble_ph,
    mrcht_id: this.orgnData.mrcht_id,
    imageUrl: this.imageUrl
  };

  this.crdsrv.create(organizationData, rte).subscribe((res) => {
    if (res['status'] == 200) {
      this.snackBar.open("Organisation Details Updated Sucessfully", '', {
        duration: 3000,
        panelClass: ['blue-snackbar'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.getorganisationDtls();
    }
  }, (error) => {
    console.log(error);
  });
}

}
