import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { forkJoin } from 'rxjs/observable/forkJoin';
import { UploadService } from 'app/main/apps/upload.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('file') file;

  public files = [];
  fileData = [];


  constructor(public dialogRef: MatDialogRef<DialogComponent>, public uploadService: UploadService) { }

  ngOnInit() {
    console.log("--------------------", this.fileData)
    this.fileData = []
  }

  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  flCtrl = false;
  scCtrl = false;
  onFilesAdded(event) {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.push(files[key]);
      }
    }
    this.onSelectFile(event);
  }



  urls = [];
  onSelectFile(event) {
    console.log(event)

    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (eventLd) => {
          let fileUrl = (<FileReader>eventLd.target).result;
          this.fileData.push( { fileContent : fileUrl, extnsn : event.target.files[i].name.split(".")[event.target.files[i].name.split(".").length - 1]})
        }
      
        reader.readAsDataURL(event.target.files[i]);
      }
    }

  }

  addFiles() {
    this.file.nativeElement.click();
  }

  closeDialog() {

    console.log(this.fileData)
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;

    // start the upload and save the progress map
    console.log(this.files)
    this.progress = this.uploadService.upload(this.files , this.fileData);
    console.log(this.progress);
    var lclStrg = []
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val));
      this.progress[key].result.subscribe(val => {
        console.log("result...........", val)
        lclStrg.push(val[0])
        localStorage.setItem('docs', JSON.stringify(lclStrg))
      });
    }

    this.files.filter((k)=>{
      this.progress[k.name].err.subscribe(val => {
        if(val)
        {
          this.flCtrl = true;
          this.scCtrl = false;
          this.showCancelButton = true;
        }
        k["err"] = val
      });
    })
 
    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;
   
    console.log("------------------------")
    console.log(this.files)
    console.log(this.progress)
    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      console.log("server sucesss")
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      if(!this.flCtrl)
      {
        this.scCtrl = true;
      }

      // ... and the component is no longer uploading
      this.uploading = false;
      
    }, (err)=>{
      console.log(err)
      console.log("server file")
      console.log("rrrrrrrrrrrrrrrrrrr")
    });
    
  }
}
