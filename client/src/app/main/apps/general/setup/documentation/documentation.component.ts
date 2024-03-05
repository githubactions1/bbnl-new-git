import { Component, OnInit,ViewChild } from '@angular/core';
import { CrudService } from '../../../crud.service';
import {MatPaginator,MatTableDataSource, MatDialogRef} from '@angular/material';
import { MatDialog } from '@angular/material';
// import { UploadService } from '../../upload.service';
// import { DialogComponent } from '../../../../shared/components/dialog/dialog.component';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';

import { FormGroup } from '@angular/forms';
import { DocModelComponent } from './doc-model/doc-model.component';
import { UploadService } from '../../../upload.service';
import { DialogComponent } from 'app/main/shared/components/dialog/dialog.component';


export interface PeriodicElement {
  description: string;
  title: string;
  date:string;
 format: string;
 download: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '12/4/2019', title: 'Adhar', description: 'adhar details', format: 'Chiranjeevi', download: ''},
  {date: '13/4/2019', title: 'Pancard', description: 'pan card details', format: 'Balayaa', download: ''},
  {date: '14/4/2019', title: 'Trade doc', description: 'trade details', format: 'Venkatesh', download: ''},
  {date: '15/4/2019', title: 'Shop license', description: 'shop details', format: 'Nagarjuna', download: ''}
];




@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {
  csvContent: string;
  fileData = ""

  

  displayedColumns: string[] = ['date','title', 'description', 'format', 'download' ,'upload'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  dialogRef: any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(public crdsrv: CrudService, public dialog: MatDialog, public uploadService: UploadService,) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  delete(ele){
    let confrm={
      name:ele.title,
      id:ele.id,
      rte:"/merchant"

    }
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: false,
      width: '30%',
      panelClass: 'my-class',
      data: {
        entity: confrm
      }
    });
  }
   openUploadDialog() {
    let dialogRef = this.dialog.open(DialogComponent, { width: '60%', height: '50%' });
  }

  dwnldDocs(element) {
    this.dialogRef = this.dialog.open(DocModelComponent, {
      panelClass: 'contact-form-dialog',
      data: {
        location: element,
        action: 'edit'
      }
    });

    this.dialogRef.afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        const actionType: string = response[0];
        const formData: FormGroup = response[1];
        switch (actionType) {
          /**
           * Save
           */
          case 'save':

          
            break;
          /**
           * Delete
           */
          case 'delete':

            

            break;
        }
      });
  }

}

// New entry record time

// Update time automatically when any column value update.

// Update time when record is deleted. NULL if not deleted

