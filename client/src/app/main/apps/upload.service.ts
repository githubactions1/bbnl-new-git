import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from "@angular/common/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

const url = "http://localhost:4901/apiv1/merchant/documentation";

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload( files, fileData): { [key: string]: { progress: Observable<number>, err : Observable<any>, result : Observable<any>  } } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number>, err : Observable<any>, result : Observable<any> } } = {};
    var counter = 0;
    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append("file", file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest("POST", url, [fileData[counter++]], {
        reportProgress: true
      });

      console.log(req)

      // create a new progress-subject for every file
      const progress = new Subject<number>();
      const err = new Subject<any>();
      const result = new Subject<any>();


      // send the http-request and subscribe for progress-updates

      // this.

      let startTime = new Date().getTime();
      this.http.request(req).subscribe( (event) => {
        
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((80 * event.loaded) / event.total);
          console.log(percentDone)
          // pass the percentage into the progress-stream
          progress.next(percentDone);
          err.next(false);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
        
          if(event && event.body && event.body['status'] == 200)
          {
            const percentDone = Math.round((100));
            progress.next(percentDone);
            console.log(event.body['data'])
            result.next(event.body['data'])
            err.next(false);
          }
          else
          {
            const percentDone = Math.round((80));
            progress.next(percentDone);
            err.next(true);
            result.next([])
          }
         
          progress.complete();
          err.complete();
        }

     
      }, (er)=>{
        console.log(er)
        const percentDone = Math.round((50));
        progress.next(percentDone);
        err.next(true);
        result.next([])
        console.log("errrrrrrrrrrrr")
      });

      // Save every progress-observable in a map of all observables
     
      status[file.name] = {
        progress: progress.asObservable(),
        err : err.asObservable(),
        result : result.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}
