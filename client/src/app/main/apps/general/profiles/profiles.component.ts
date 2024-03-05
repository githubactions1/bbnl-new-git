import { Component, OnInit, Inject } from '@angular/core';
// import { ProfileService } from '../merchant/profile.service';
import { MatIconModule } from '@angular/material/icon';
import { id } from '@swimlane/ngx-charts/release/utils';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { ProfileService } from '../../profile.service';
// import { ConfirmDialogComponent } from '../merchant/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  dialogRef: any;
prfledata;
movies;
horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public prflesrv: ProfileService, public maticon: MatIconModule, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProfileData();
  }
  // tslint:disable-next-line:typedef
  getProfileData(){
    const userDetails = JSON.parse(localStorage.getItem('usrDtls'));
    const rte = 'user/user/profiles/' + userDetails.mrcht_usr_id;
    this.prflesrv.get(rte).subscribe(res => {
      console.log(res['data']);
       this.prfledata = res['data'];

    });
  }

  applyFilter(filterValue: string) {
    this.prfledata.filter = filterValue.trim().toLowerCase();
  }

 

  openDialog(): void{

    this.dialogRef = this.dialog.open(StyleComponentDialog, {
      // height : '300px',
      // panelClass: 'contact-form-dialog',
      panelClass: 'sidemenu-optns-dialog',
      data: {
          action: this.prfledata
      }
  });
  this.dialogRef.afterClosed().subscribe(response => {
    console.log(`Dialog result: ${response}`);
        this.getProfileData();
});
}
}
@Component({
  selector: 'stylecomponent-dialog',
  templateUrl: 'StyleComponent-dialog.html',
})
export class StyleComponentDialog {
  menulst: any;
  menuitms;
  confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
  dialogRef: any;
  items: any;
  rtt;
  prfledata: any;
 
    /**
 * Constructor
 *@param _data
 * @param {DsNavigationService} _dsNavigationService
 * @param {MatDialogRef<StyleComponentDialog>} matDialogRef
 */

constructor(public prflesrv: ProfileService, public dialog: MatDialog,  
            @Inject(MAT_DIALOG_DATA) private _data: any, public matDialogRef: MatDialogRef<StyleComponentDialog>) {

  console.log(_data);
  this.items = _data.action;
 }

 ngOnInit(): void {
   
  this.menuitms = JSON.parse(localStorage.getItem('mnuDtls'));
  this.getmenus();
  
  }

  getmenus(): void{
    const rte = 'user/menu/items';
  this.prflesrv.get(rte).subscribe(res => {
     this.menulst = res['data'];
     console.log(this.menulst);
    //  this.menulst.forEach(element => {
    //   this.items.mnu_itms.forEach(ele => {
    //       if (element.prnt_mnu_itm_id === 0){
    //         if (element.mnu_itm_id === ele.mnu_itm_id){
    //             if (ele.dsble_in === 0){
    //               element.enble_in = 1;
    //             }
    //         }
    //       }
    //       else{
    //           element.sub_mnus.forEach(elemn => {
    //             if (elemn.mnu_itm_id === ele.mnu_itm_id){
    //                 if (ele.dsble_in === 0){
    //                     elemn.enble_in = 1;
    //                 }
    //             }  
    //           });
    //       }

    //   });
    //   });

  });
  }
  
  change(p, $event){
    let active;
   console.log(p);
   console.log($event);
   if ($event.checked === true){
      active = 1;
   }else{
      active = 0;
   }
   let rte = 'user/update/user/profile';
   let data = {
    mnu_itm_id : p.mnu_itm_id,
    act_in : active,
   };
    
   this.prflesrv.update(rte, data).subscribe(res => {
    console.log(res);
   });
   
  }
  close(): void {
    this.matDialogRef.close();
  }
}
