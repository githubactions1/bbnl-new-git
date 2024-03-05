import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { DsNavigationService } from '@glits/components/navigation/navigation.service';
@Injectable()
export class AuthGuardService implements CanActivate {
    usrDtls: any;
  mnuDtls: any;
  constructor(public auth: AuthService, public router: Router, private _dsNavigationService: DsNavigationService,) {}
  canActivate(): boolean {
    this.usrDtls = JSON.parse(localStorage.getItem('usrDtls'));
    this.mnuDtls = JSON.parse(localStorage.getItem('menuDetls'));
    if(!this.mnuDtls){

    }
    else{
      console.log(this.mnuDtls)
      this._dsNavigationService.unregister('main');
     
      this._dsNavigationService.register('main', this.mnuDtls);
    }
    console.log("in service")
    if(this.usrDtls){
        console.log("kjnjkbjbjhbjhfdgfd")
        this.router.navigate(['admin/home']);
        return true
    }
    else{
        console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuu")
        window.location.href='/login';  
        return false
    }
  }
}