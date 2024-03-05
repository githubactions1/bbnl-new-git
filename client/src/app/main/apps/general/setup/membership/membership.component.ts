import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar,MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material';
import { CrudService } from '../../../crud.service';
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})

export class MembershipComponent implements OnInit {
  memdetails = new MatTableDataSource([]);
  usertable= new MatTableDataSource([]);
  displayColumns: string[] = ['position','mbrsp_id', 'mbrsp_nm', 'mbrsp_amt_ct', 'mbrsp_vldty_dy_ct'];
  secondtable:string[]=['position','usr_id','usr_nm','mbrsp_id','mbrsp_nm'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public crdsrv:CrudService,public snackBar: MatSnackBar) { }
  memDtls=[]
  userDtls=[]


  ngOnInit() {
    this.getmemberDtls()
 this.usermercDtls()
  }
  getmemberDtls = () => {
    this.crdsrv.get(`merchant/mrchntdetls`).subscribe((res) => {
      console.log(res['data'])
console.log("select function")
          this.memDtls = res['data']
          console.log(this.memDtls)
          let counter = 0; 
          this.memDtls.filter((k) => {
            k['position'] = ++counter;
         console.log(this.memDtls);
          })
          this. memdetails = new MatTableDataSource(this.memDtls);
          this. memdetails.paginator = this.paginator;
          this. memdetails._updateChangeSubscription()
        
    }, (error) => {
    
      console.log(error)
    });
  }

  usermercDtls = () => {
    this.crdsrv.get(`merchant/userdetls`).subscribe((res) => {
      console.log(res['data'])
console.log("select function")
          this.userDtls = res['data']
          console.log(this.memDtls)
          let counter = 0; 
          this.userDtls.filter((k) => {
            k['position'] = ++counter;
         console.log(this.userDtls);
          })
          this. usertable = new MatTableDataSource(this.userDtls);
          this. usertable.paginator = this.paginator;
          this. usertable._updateChangeSubscription()
        
    }, (error) => {
    
      console.log(error)
    });
  }
}
