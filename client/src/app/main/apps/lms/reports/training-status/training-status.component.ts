import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { CrudService } from 'app/main/apps/crud.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TrainingStatusdilogComponent } from './training-statusdilog/training-statusdilog.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-training-status',
  templateUrl: './training-status.component.html',
  styleUrls: ['./training-status.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TrainingStatusComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  ctgry: any;
  crddta:any;
  carddta:any;
  dataT: any;
  rowData = [];
  assigned;
  infrmd_id;
  opened;
  frm_dt;
  to_dt;
  cat_id;
  dstrt_id;
  ulb_id;
  fun_id;

  dataSource: MatTableDataSource<[any]>;ulb: any;
  dataulb: any;
  schvm: boolean;
  aprvddta=[];
  functdta:any
  declneddta=[];
  chartData=[];
  columnsToDisplay = ['s_no', 'dstrt_nm', 'mbrs_atn', 'mbrs_natn','mbrs_stdl','ulb_cptd','ulb_prgc','ulb_nstd','btch_cptd','btch_stld','vrfsts_cptd','vrfsts_pnd','vrfsts_flg','view'];
  columnDefs = [];
  pagination: boolean = true;
  paginationPageSize = 5;
  loadingCellRendererParams;
  loadingCellRenderer;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() rowSelection;
  getRowHeight;
  datasvm: any;
  dialogRef: any;
  constructor(private apiSrv: CrudService,public dialog: MatDialog) {
    
    this.rowSelection = 'multiple';
    this.ctgry="dist";
    let rowHeight = 40;
    this.getRowHeight = function(params) {
      return rowHeight;
    };
   }
 

  ngOnInit() {
    this.trnglst(0)
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // openstatus(row){
  //   console.log(row)
  //   const dialogRef = this.dialog.open(TrainingStatusdilogComponent, {
  //     width: '950px',
      
  //     data:{data:row}
  //   });

  // }
      /**
     * Edit Event
     *
     * @param {string} action
     * @param {CalendarEvent} event
     */
    openstatus(row): void {
      //const eventIndex = this.schedules.indexOf(event);

      this.dialogRef = this.dialog.open(TrainingStatusdilogComponent, {
          panelClass: 'trng-sts-dialog',
          data: {
              data:row,
              event: event  
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
                
              }
          });
  }

  onCellClick(data) {
    console.log(data)
    if(this.ctgry=="ulb"){
      console.log(data.data.dst_id)
      this.dst(data.data.dst_id)

    }
    if(this.ctgry=="schvm"){
     this. ulbfltr(data.data.ulb_id)

    }
    if(data.colDef.headerName=="view"){
      this.openstatus(data.data)

    }
  }
  
  onGridReady(params): void {
   console.log(params)
  }
  crddata(id){
    console.log(id)
    console.log(this.ctgry)
    if(this.ctgry=='ulb'){
      if(id==1){
        this.columnDefs = [
          {
            headerName: '',
            children: [
              { headerName: 'Sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
              { headerName: ' District name', field: 'dstrt_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
            ]
          },
          {
            headerName: 'Total Members',
            children: [
              { headerName: 'Attended', field: 'mbrs_atn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
              { headerName: 'Un Attended', field: 'mbrs_natn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
              { headerName: 'Scheduled', field: 'mbrs_stdl', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }
            ]
          },
          {
            headerName: 'ULB`s/Mandals',
            children: [
              { headerName: 'Compleated', field: 'ulb_cptd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
              { headerName: 'In Progress', field: 'ulb_prgc', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
              { headerName: 'Not Started', field: 'ulb_nstd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            ]
          },
          {
            headerName: 'Batches',
            children: [
              { headerName: 'Compleated', field: 'btch_cptd', filter: false, cellStyle: { textAlign: 'center' },width: 120, suppressSizeToFit: true },
              { headerName: 'Scheduled', field: 'btch_stld', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
             
            ]
          },
          {
            headerName: 'Verification Status',
            children: [
              
              { headerName: 'Pending', field: 'vrfsts_pnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 330, suppressSizeToFit: true },
              
            ]
          },
        ];
      }
     else if(id==2){
        this.columnDefs = [
          {
            headerName: '',
            children: [
              { headerName: 'Sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
              { headerName: ' District name', field: 'dstrt_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
            ]
          },
          {
            headerName: 'Total Members',
            children: [
              { headerName: 'Attended', field: 'mbrs_atn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
              { headerName: 'Un Attended', field: 'mbrs_natn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
              { headerName: 'Scheduled', field: 'mbrs_stdl', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }
            ]
          },
          {
            headerName: 'ULB`s/Mandals',
            children: [
              { headerName: 'Compleated', field: 'ulb_cptd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
              { headerName: 'In Progress', field: 'ulb_prgc', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
              { headerName: 'Not Started', field: 'ulb_nstd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            ]
          },
          {
            headerName: 'Batches',
            children: [
              { headerName: 'Compleated', field: 'btch_cptd', filter: false, cellStyle: { textAlign: 'center' },width: 120, suppressSizeToFit: true },
              { headerName: 'Scheduled', field: 'btch_stld', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }, 
            ]
          },
          {
            headerName: 'Verification Status',
            children: [
              { headerName: 'Confirmed', field: 'vrfsts_cptd', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 330, suppressSizeToFit: true }, 
            ]
          },
        ];
      }
      else if(id==3){
        this.columnDefs = [
          {
            headerName: '',
            children: [
              { headerName: 'Sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
              { headerName: ' District name', field: 'dstrt_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
            ]
          },
          {
            headerName: 'Total Members',
            children: [
              { headerName: 'Attended', field: 'mbrs_atn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
              { headerName: 'Un Attended', field: 'mbrs_natn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
              { headerName: 'Scheduled', field: 'mbrs_stdl', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }
            ]
          },
          {
            headerName: 'ULB`s/Mandals',
            children: [
              { headerName: 'Compleated', field: 'ulb_cptd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
              { headerName: 'In Progress', field: 'ulb_prgc', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
              { headerName: 'Not Started', field: 'ulb_nstd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            ]
          },
          {
            headerName: 'Batches',
            children: [
              { headerName: 'Compleated', field: 'btch_cptd', filter: false, cellStyle: { textAlign: 'center' },width: 120, suppressSizeToFit: true },
              { headerName: 'Scheduled', field: 'btch_stld', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }, 
            ]
          },
          {
            headerName: 'Verification Status',
            children: [
              { headerName: 'Flaged', field: 'vrfsts_flg', sortable: true, cellStyle: { textAlign: 'center' }, width: 330, filter: false, suppressSizeToFit: true },
            ]
          },
        ];
      }

    }
   else if(this.ctgry=='schvm'){
     if(id==1){
      this.columnDefs = [
        {
          headerName: '',
          children: [
            { headerName: 'Sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
            { headerName: ' ULB name', field: 'ulb_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
          ]
        },
        {
          headerName: 'Total Members',
          children: [
            { headerName: 'Attended', field: 'mbrs_atn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
            { headerName: 'Un Attended', field: 'mbrs_natn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
            { headerName: 'Scheduled', field: 'mbrs_stdl', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }
          ]
        },
        {
          headerName: 'SACHIVALAYAM`S',
          children: [
            { headerName: 'Compleated', field: 'svm_cptd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            { headerName: 'In Progress', field: 'svm_prgc', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            { headerName: 'Not Started', field: 'svm_nstd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
          ]
        },
        {
          headerName: 'Batches',
          children: [
            { headerName: 'Compleated', field: 'btch_cptd', filter: false, cellStyle: { textAlign: 'center' },width: 120, suppressSizeToFit: true },
            { headerName: 'Scheduled', field: 'btch_stld', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
           
          ]
        },
        {
          headerName: 'Verification Status',
          children: [
            { headerName: 'Pending', field: 'vrfsts_pnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 330, suppressSizeToFit: true },
          ]
        },
      ];

     }
     else if(id==2){
      this.columnDefs = [
        {
          headerName: '',
          children: [
            { headerName: 'Sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
            { headerName: ' ULB name', field: 'ulb_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
          ]
        },
        {
          headerName: 'Total Members',
          children: [
            { headerName: 'Attended', field: 'mbrs_atn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
            { headerName: 'Un Attended', field: 'mbrs_natn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
            { headerName: 'Scheduled', field: 'mbrs_stdl', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }
          ]
        },
        {
          headerName: 'SACHIVALAYAM`S',
          children: [
            { headerName: 'Compleated', field: 'svm_cptd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            { headerName: 'In Progress', field: 'svm_prgc', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            { headerName: 'Not Started', field: 'svm_nstd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
          ]
        },
        {
          headerName: 'Batches',
          children: [
            { headerName: 'Compleated', field: 'btch_cptd', filter: false, cellStyle: { textAlign: 'center' },width: 120, suppressSizeToFit: true },
            { headerName: 'Scheduled', field: 'btch_stld', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
           
          ]
        },
        {
          headerName: 'Verification Status',
          children: [
            { headerName: 'Confirmed', field: 'vrfsts_cptd', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 330, suppressSizeToFit: true }, 
          ]
        },
      ];

     }
     else if(id==3){
      this.columnDefs = [
        {
          headerName: '',
          children: [
            { headerName: 'Sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
            { headerName: ' ULB name', field: 'ulb_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
          ]
        },
        {
          headerName: 'Total Members',
          children: [
            { headerName: 'Attended', field: 'mbrs_atn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
            { headerName: 'Un Attended', field: 'mbrs_natn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
            { headerName: 'Scheduled', field: 'mbrs_stdl', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }
          ]
        },
        {
          headerName: 'SACHIVALAYAM`S',
          children: [
            { headerName: 'Compleated', field: 'svm_cptd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            { headerName: 'In Progress', field: 'svm_prgc', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            { headerName: 'Not Started', field: 'svm_nstd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
          ]
        },
        {
          headerName: 'Batches',
          children: [
            { headerName: 'Compleated', field: 'btch_cptd', filter: false, cellStyle: { textAlign: 'center' },width: 120, suppressSizeToFit: true },
            { headerName: 'Scheduled', field: 'btch_stld', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
           
          ]
        },
        {
          headerName: 'Verification Status',
          children: [
            { headerName: 'Flaged', field: 'vrfsts_flg', sortable: true, cellStyle: { textAlign: 'center' }, width: 330, filter: false, suppressSizeToFit: true },
          ]
        },
      ];

     }

   }
    
   
    

  }
  trnglst(trng){
    console.log(trng)
    const rteTwo = `web/common/sachvalayamtrngaprval`;
      this.apiSrv.get(rteTwo).subscribe((res) => {
        this.dataT = res['data'];
        console.log('_________')
        console.log(res['data']);
        this.rowData =this.dataT
        this.carddta=this.dataT
        console.log(this.rowData)
        this.ctgry="ulb"
        // this.rowData = this.dataT;
        // this.dataSource.filter = '';
        this.crddta=this.dataT[0].batch_count//
        
      }, (error) => {
  
      });
      this.columnDefs = [
        {
          headerName: '',
          children: [
            // { headerName:"s no", field:1, sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
            { headerName: ' District name', field: 'dstrt_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
          ]
        },
        {
          headerName: 'Total Members',
          children: [
            // { headerName: 'Attended', field: 0, sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
            // { headerName: 'Un Attended', field: 0, sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
            { headerName: 'Scheduled', field: 'usr_count', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }
          ]
        },
        {
          headerName: 'ULB`s/Mandals',
          children: [
            // { headerName: 'Compleated', field: 0, sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            { headerName: 'In Progress', field: 'ulb_count', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
            // { headerName: 'Not Started', field: 0, sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
          ]
        },
        {
          headerName: 'Batches',
          children: [
            // { headerName: 'Compleated', field: 0, filter: false, cellStyle: { textAlign: 'center' },width: 120, suppressSizeToFit: true },
            { headerName: 'Scheduled', field: 'batch_count', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
           
          ]
        },
        // {
        //   headerName: 'Verification Status',
        //   children: [
        //     { headerName: 'Confirmed', field: 0, sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 110, suppressSizeToFit: true },
        //     { headerName: 'Pending', field: 0, sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 110, suppressSizeToFit: true },
        //     { headerName: 'Flaged', field: 0, sortable: true, cellStyle: { textAlign: 'center' }, width: 110, filter: false, suppressSizeToFit: true },
        //   ]
        // },
      ];
  }
  dst(dst){
    const rteTwo = `web/common/sachvalayamtrngaprvalulb/`+dst;
    this.apiSrv.get(rteTwo).subscribe((res) => {
      this.dataulb = res['data'];
      console.log('_________')
      console.log(res['data']);
      if (this.dataulb.length > 0) {
        this.ctgry = "schvm";
      }
      this.rowData =this.dataulb
      console.log(this.rowData)
      // this.rowData = this.dataT;
      // this.dataSource.filter = '';
      
    }, (error) => {

    });


    this.columnDefs = [
      {
        headerName: '',
        children: [
          { headerName: 'Sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
          { headerName: ' ULB name', field: 'ulb_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
        ]
      },
      {
        headerName: 'Total Members',
        children: [
          { headerName: 'Attended', field: 'mbrs_atn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
          { headerName: 'Un Attended', field: 'mbrs_natn', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
          { headerName: 'Scheduled', field: 'mbrs_stdl', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true }
        ]
      },
      {
        headerName: 'SACHIVALAYAM`S',
        children: [
          { headerName: 'Compleated', field: 'svm_cptd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
          { headerName: 'In Progress', field: 'svm_prgc', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
          { headerName: 'Not Started', field: 'svm_nstd', sortable: true, filter: false, cellStyle: { textAlign: 'center' }, width: 120, suppressSizeToFit: true },
        ]
      },
      {
        headerName: 'Batches',
        children: [
          { headerName: 'Compleated', field: 'btch_cptd', filter: false, cellStyle: { textAlign: 'center' },width: 120, suppressSizeToFit: true },
          { headerName: 'Scheduled', field: 'btch_stld', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
         
        ]
      },
      {
        headerName: 'Verification Status',
        children: [
          { headerName: 'Confirmed', field: 'vrfsts_cptd', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 110, suppressSizeToFit: true },
          { headerName: 'Pending', field: 'vrfsts_pnd', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 110, suppressSizeToFit: true },
          { headerName: 'Flaged', field: 'vrfsts_flg', sortable: true, cellStyle: { textAlign: 'center' }, width: 110, filter: false, suppressSizeToFit: true },
        ]
      },
    ];
 

  }
  ulbfltr(ulb){
    console.log(ulb)
    const rteTwo = `web/common/sachvalayamtrngaprvalschvm/`+ulb;
    this.apiSrv.get(rteTwo).subscribe((res) => {
      this.datasvm = res['data'];
      console.log('_________')
      console.log(res['data']);
      if (this.datasvm.length > 0) {
        this.ctgry = "batch ";
      }
      this.rowData =this.datasvm
      console.log(this.rowData)
      // this.rowData = this.dataT;
      // this.dataSource.filter = '';
      
    }, (error) => {

    });
    this.columnDefs = [
      {
        headerName: '',
        children: [
          { headerName: 'Sno', field: 's_no', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 100, suppressSizeToFit: true },
          { headerName: 'Batch name', field: 'btch_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 200, suppressSizeToFit: true }, 
          { headerName: 'Trainer Name', field: 'trnr_nm', filter: false, cellStyle: { textAlign: 'center' },width: 200, suppressSizeToFit: true },
          { headerName: 'Trainer Number', field: 'trnr_num', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
          { headerName: 'Location', field: 'phy_loc', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 250, suppressSizeToFit: true },
          { headerName: 'Functionary', field: 'fnctry', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 250, suppressSizeToFit: true },
          { headerName: 'Start Date', field: 'st_dt', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
          { headerName: 'End Date', field: 'end_dt', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
          { headerName: 'Approval Status', field: 'apvrl_sts', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
          { headerName: 'view', cellRenderer:() => {  return '<button  mat-raised-button class="scd-btn">view</button>' },
           
       
         sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 120, suppressSizeToFit: true },
        ]
      },
      
    ];

  }
  functionaryfltr(id){
    this.functdta=[]
    console.log(id)
    console.log(this.datasvm)
    this.datasvm.filter(k=>{
          if(k.func_id==id){
            this.functdta.push(k)
            
          }

          
        })
        console.log(this.functdta)
        this.rowData =this.functdta


  }
 
  chngdta(data){
    // if(this.ctgry=="ulb"){
    //   console.log(data)
    //   this.crddta=data
    //   const rteTwo = `web/common/sachvalayamtrngaprvalulb`;
    //   this.apiSrv.get(rteTwo).subscribe((res) => {
    //     this.dataulb = res['data'];
    //     console.log('_________________________________')
    //     console.log(res['data']);
    //     // this.rowData = this.dataT;
    //     // this.dataSource.filter = '';
    //     if(this.dataulb.length > 0){
  
    //       this.ctgry="schvm";
    //     }
    //     console.log( this.ctgry)
    //     this.columnsToDisplay = ['s_no', 'dstrt_nm', 'pnd_aprl', 'del_aprl','aprd_aprl',];
    //     this.dataSource =new MatTableDataSource(this.dataulb);
    //     this.dataSource.paginator=this.paginator
        
    //   }, (error) => {
  
    //   });
    //   this.ulb=2

    // }
    // else if(this.ctgry=="schvm"){
    //   console.log(data)
    //   this.crddta=data
    //   const rteTwo = `web/common/sachvalayamtrngaprvalschvm`;
    //   this.apiSrv.get(rteTwo).subscribe((res) => {
    //     this.dataulb = res['data'];
    //     console.log('_________________________________')
    //     console.log(res['data']);
    //     // this.rowData = this.dataT;
    //     // this.dataSource.filter = '';
    //     if(this.dataulb.length > 0){
  
    //       this.ctgry="schvm";
    //     }
    //     console.log( this.ctgry)
    //     this.columnsToDisplay = ['s_no', 'dstrt_nm', 'pnd_aprl', 'del_aprl','aprd_aprl',];
    //     this.dataSource =new MatTableDataSource(this.dataulb);
    //     this.dataSource.paginator=this.paginator
        
    //   }, (error) => {
  
    //   });
    //   this.ulb=3
    //   this.schvm=true
     

    // }
    console.log(data)
   
  }
  // chngdtashvlm(data){
  //   console.log(data)
  // }
  

}
