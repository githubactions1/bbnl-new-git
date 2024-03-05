import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-doc-model',
  templateUrl: './doc-model.component.html',
  styleUrls: ['./doc-model.component.scss']
})
export class DocModelComponent implements OnInit {

  action: string;

  dialogTitle: string;
  merchant;
  docsData = []
  /**
 * Constructor
 * 
 * @param {MatDialogRef<DocModelComponent>} matDialogRef
 * @param _data
 * @param {FormBuilder} _formBuilder
 */

  constructor(public matDialogRef: MatDialogRef<DocModelComponent>) {

    console.log(this.action)
    if (this.action === 'edit') {
      this.dialogTitle = 'Edit Organization';

    }
    else {
      this.dialogTitle = 'New Organization';

    }

  }

  ngOnInit() {
    this.docsData = JSON.parse(localStorage.getItem('docs'))
    if(this.docsData && this.docsData.length > 0)
    {
      this.docsData.filter((k)=>{
        k.fileName = k.filePath.split("/")[k.filePath.split("/").length - 1]
      })
      console.log(this.docsData)
    }
  
  }
  createContactForm() {

  }

}


