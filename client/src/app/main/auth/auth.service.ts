import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private http: HttpClient,private _snackBar: MatSnackBar) { }

  // get Hardware Rfid Tags
  public doLogin(data, cb) {
    data.app = 'web';
    this.http.post('/login_new', data).subscribe(data => {
      // Read the result field from the JSON response.
      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }


  // get Hardware Rfid Tags
  public doLogout(cb) {
    this.http.get('/logout').subscribe(res => {
      // Read the result field from the JSON response.
      localStorage.clear();
      cb(false, res);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getClntRprtStng(cb) {
    this.http.get('/client/report').subscribe(res => {
      // Read the result field from the JSON response.

      cb(false, res);

    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getAplctnPrfls(cb) {
    this.http.get('/user/appsLst').subscribe(res => {
      // Read the result field from the JSON response.

      cb(false, res);

    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getAplctnMnuPrfls(cb) {
    this.http.get('/user/menuLst').subscribe(data => {
      // Read the result field from the JSON response.

      cb(false, data);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  public getUsrPrfl(cb) {
    this.http.get('/user/profile').subscribe(res => {
      // Read the result field from the JSON response.

      cb(false, res);

    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  // get Hardware Rfid Tags
  public forgetPassword(data, cb) {
    this.http.post('/forgot-password/send_otp', data).subscribe(res => {
      // Read the result field from the JSON response.
      localStorage.clear();
      cb(false, res);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }
  // get Hardware Rfid Tags
  public resetPassword(data, cb) {
    this.http.post('/change_password', data).subscribe(res => {
      // Read the result field from the JSON response.
      // localStorage.clear();
      cb(false, res);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }



  public saveUsrDt(data, cb) {
    data.app = 'web';
    console.log(data);
    this.http.post('/user/profile', data).subscribe(data => {
      // Read the result field from the JSON response.
      cb(false, data);
      this._snackBar.open('Successfully Updated', 'End now', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }


  // get Hardware Rfid Tags
  public matchOldNewPassword(data, cb) {
    this.http.post('/match_old_new_password', data).subscribe(res => {
      // Read the result field from the JSON response.
      localStorage.clear();
      cb(false, res);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
        }
        cb(true, null);
      });
  }

    // get Hardware Rfid Tags
    public changePassword(data, cb) {
      this.http.post('/chgPswrd', data).subscribe(res => {
        // Read the result field from the JSON response.
        localStorage.clear();
        cb(false, res);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            console.log('Backend returned code:' + err.status + ', error message: ' + err.error);
          }
          cb(true, null);
        });
    }
}
