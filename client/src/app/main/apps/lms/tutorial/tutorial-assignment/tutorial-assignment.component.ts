import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { CrudService } from 'app/main/apps/crud.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { District, Mandal, Sachivalayam } from '../../models';
import { TransfereService } from 'app/providers/transfer/transfer.service';

@Component({
  selector: 'app-tutorial-assignment',
  templateUrl: './tutorial-assignment.component.html',
  styleUrls: ['./tutorial-assignment.component.scss']
})
export class TutorialAssignmentComponent implements OnInit {
  ulbs: any;
  dstct: any;
  svcm: any;
  dept: any;
  courseForm: FormGroup;
  schFormDt: any;
  dstLst: any = [];
  ulbL: any = [];
  svcml: any=[];
  date: any;
  ulbLst: any = [];
  dptLst: any = [];
  svmLst: any = [];
  trngsLst: any = [];
  offlnTrngs: any = [];
  districts: District[] = [];
  mandals: Mandal[] = [];
  sachivalayams: Sachivalayam[] = [];
  showSvmSpinner: boolean = false;
  showUlbSpinner: boolean = false;
  throttle = 150;
  svmCount = 10;
  svmPag = [];
  scrollDistance = 2;
  scrollUpDistance = 2;
  direction = '';
  selectedDistIds: any = [];
  selectedUlbIds: any = [];
  selectedSvmIds: any = [];
  selectedDptIds: any = [];
  showEmpSpinner: boolean;
  empLst: any = [];
  empCount: any = 50;
  empPag: any = [];
  selectedEmps: any = [];
  searchDst = ''
  searchUlb = ''
  searchDpt =''
  getdata = this.transfereService.getData();
  columnDefs = [];
  pagination: boolean = true;
  paginationPageSize = 50;
  rowData = [];
  getRowHeight
  private rowSelection;
  gridApi: any;
  gridColumnApi: any;
  ShwsbmtBtn: boolean=false;
  constructor(private datePipe: DatePipe, private crdsrv: CrudService, private route: Router, public snackBar: MatSnackBar, private transfereService: TransfereService) {
    let rowHeight = 45;
    this.getRowHeight = function (params) {
      return rowHeight;
    };
  }

  ngOnInit() {
  
    console.log(this.getdata)
    this.date = this.datePipe.transform(new Date(), "dd-MM-yyyy");
    this.ulbs = new FormControl();
    this.dstct = new FormControl();
    this.svcm = new FormControl();
    this.dept = new FormControl();
    this.courseForm = new FormGroup({
      trng_id: new FormControl(this.getdata.trng_id, Validators.required),
      SchDatestart: new FormControl(this.date, Validators.required),
      SchDateend: new FormControl(this.date, Validators.required)
    })
    this.getDistricts();
    this.getDptmnts();
    this.getTrainings();
  }
  get f() { return this.courseForm.controls; }
  onScrollDown() {

    const start = this.svmCount;
    this.svmCount += 20;
    if (this.svmLst.length > this.svmCount) {
      this.appendItems(start, this.svmCount, this.svmLst,this.svmPag);
    }


    this.direction = 'down'
  }
  onEmpsScrolledDown() {
    const start = this.empCount;
    this.empCount += 50;
    if (this.empLst.length > this.empCount) {
      this.appendItems(start, this.empCount, this.empLst,this.empPag);
    }


    this.direction = 'down'
  }
  appendItems(startIndex, endIndex, listArray,toArray) {
    this.addItems(startIndex, endIndex, 'push', listArray,toArray);
  }
  addItems(startIndex, endIndex, _method, listArray,toArray) {
    if (listArray.length > endIndex) {
      for (let i = startIndex; i < endIndex; ++i) {
        //this.svmLst[_method]([i, ' ', this.generateWord()].join(''));
        toArray[_method](listArray[i])
      }
    } else {
      for (let i = startIndex; i < listArray.length; ++i) {
        //this.svmLst[_method]([i, ' ', this.generateWord()].join(''));
        toArray[_method](listArray[i])
      }
    }

  }
  prependItems(startIndex, endIndex, listArray,toArray) {
    this.addItems(startIndex, endIndex, 'unshift', listArray,toArray);
  }
  onUp(ev) {
    console.log('scrolled up!', ev);
    const start = this.svmCount;
    this.svmCount += 20;
    this.prependItems(start, this.svmCount, this.svmLst,this.svmPag);

    this.direction = 'up';
  }
  getTrainings() {
    this.crdsrv.get('/web/common/trngLst').subscribe((res) => {
      this.trngsLst = res['data']
      console.log(this.trngsLst)
      this.trngsLst.forEach((i) => {
        i.trainings.forEach((t) => {
          if (t.trng_onln_in == 0) {
            this.offlnTrngs.push(t)
          }
        })
      })

    });
  }
  getDptmnts() {
    const rte = 'web/common/dprtLst/'
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res)
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.dptLst = res['data'];
          this.dptLst.forEach(element => {
            element['isSelected'] = false;
          });
          console.log(this.dptLst)
        }
      }
    })
  }
  getDistricts() {
    const rte = 'web/common/dstrctLst';
    this.crdsrv.getDistLst(rte).subscribe(res => {
      console.log(res);
      console.log(res['data']);
      if (res['status'] == 200) {
        if (res['data'].length > 0) {
          this.dstLst = res['data'];
          this.dstLst.forEach(element => {
            element['isSelected'] = false;
          });
        }
      }
    })
  }
  getUlbs(d: any) {
    this.showUlbSpinner = true;
    const rte = 'web/common/mandalLst/' + d.dstrt_id;
    this.crdsrv.getDistLst(rte).subscribe(res => {
      if (res['status'] == 200) {
        this.showUlbSpinner = false;
        if (res['data'].length > 0) {
          console.log(res['data'])
          let ulbs = res['data'];
          ulbs.forEach((item) => {
            item['isSelected'] = false;
          })
          let ulbLstTemp = {
            ulbs: ulbs,
            dst: d
          };
          this.ulbLst.push(ulbLstTemp)

        }
      }
    })
  }
  getAllUlbs() {
    this.showUlbSpinner = true;
    this.ulbLst = [];
    const rte = 'web/common/mandalLst/';
    this.crdsrv.getMndlLst(rte).subscribe(res => {
      if (res['status'] == 200) {
        this.showUlbSpinner = false;
        if (res['data'].length > 0) {
          console.log(res['data'])
          let ulbs = res['data'];

          ulbs.forEach((item) => {
            let ulbLstTemp = {
              isSelected: false,
              ulbs: item.ulbs,
              dst: {
                dstrt_id: item.dstrt_id,
                dstrt_nm: item.dstrt_nm,
              }
            };
            this.ulbLst.push(ulbLstTemp)
          })
        }
      }
    })
  }
  getAllSachivalayams(ulbs: any) {
    console.log(ulbs)
    this.showSvmSpinner = true;
    this.svmLst = [];
    const rte = 'web/common/svmLst/';
    this.crdsrv.getSvmLstByID(rte, { ulbs: ulbs }).subscribe(res => {
      if (res['status'] == 200) {
        this.showSvmSpinner = false;
        if (res['data'].length > 0) {
          console.log(res['data'])
          this.svmLst = res['data'];
          this.appendItems(0, this.svmCount, this.svmLst,this.svmPag);
          // svms.forEach((item) => {
          //   let svmLstTemp = {
          //     isSelected: false,
          //     svms: item.svms,
          //     ulb: {
          //       mndl_id: item.mndl_id,
          //       mndl_nm: item.mndl_nm,
          //     }
          //   };
          //   this.svmLst.push(svmLstTemp)
          // })
        }
      }
    })
  }
  getSachivalayams(ul: any) {
    const rte = 'web/common/svmLst/' + ul.mndl_id;
    this.crdsrv.getDistLst(rte).subscribe(res => {

      if (res['status'] == 200) {
        console.log("200")
        if (res['data'].length > 0) {
          console.log(res['data'])
          let svmLst = res['data'];
          svmLst.forEach((item) => {
            item['isSelected'] = false;
          })
          let svmLstTemp = {
            svms: svmLst,
            ulb: ul
          };
          this.svmLst.push(svmLstTemp)
          this.appendItems(0, this.svmCount, this.svmLst,this.svmPag);
        }
      }
    })

  }
  getEmployees() {
    this.ShwsbmtBtn=true
   
    this.showEmpSpinner = true;
    this.empLst = [];
    let data = { distIds: this.selectedDistIds, ulbIds: this.selectedUlbIds, svmIds: this.selectedSvmIds, dptIds: this.selectedDptIds }
    const rte = 'web/common/empLst/';
    this.crdsrv.create(data, rte).subscribe(res => {
      if (res['status'] == 200) {
        this.showSvmSpinner = false;
        if (res['data'].length > 0) {
          let data = res['data']
          this.rowData = data
          data.forEach((e) => {
            e['isSelected'] = false;
          })
          this.empLst = data;
          this.appendItems(0, this.empCount, this.empLst,this.empPag);
          console.log(data)
        }
      }
    })
    //this.rowData = data
    this.columnDefs = [
      { headerName: '', filter: false, width: 80  , headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true},
      { headerName: 'Name', field: 'mrcht_emp_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 350, suppressSizeToFit: true },
      { headerName: 'Mobile Number', field: 'mbl_nu', sortable: true, cellStyle: { textAlign: 'center' }, filter: false, width: 250, suppressSizeToFit: true },
      { headerName: 'Disignation', field: 'dsgn_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 450, suppressSizeToFit: true },
      { headerName: 'Deparment', field: 'dprt_nm', sortable: true, cellStyle: { textAlign: 'center' }, filter: true, width: 450, suppressSizeToFit: true },
      
    ];
    this.rowSelection = "multiple";

  }
  onGridReady(params): void {
    console.log(params)
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

   }
   onCellClick(data) {
    console.log(data)
  
  }
  onRowSelected(event) {
    console.log(event)
    console.log(event.node.selected)
  }
  checkDst(e: any, d: any) {
    this.dstLst.forEach((item) => {
      if (item.dstrt_id == d.dstrt_id) {
        if (e.checked) {
          item.isSelected = true;
          this.selectedDistIds.push(item.dstrt_id)
          this.getUlbs(d);
        } else {
          item.isSelected = false;
          let ulbIndex = this.ulbLst.findIndex(
            ulbLst => ulbLst.dst.dstrt_id === d.dstrt_id
          );
          if (ulbIndex !== -1) {
            this.ulbLst.splice(ulbIndex, 1)
          }
          let dstIndex = this.selectedDistIds.findIndex(
            dst => dst === d.dstrt_id
          );
          if (dstIndex !== -1) {
            this.selectedDistIds.splice(dstIndex, 1)
          }

        }
      }
    })
    console.log(this.districts)
  }
  checkEmp(e:any,d:any){
    this.empLst.forEach((item) => {
      if (item.mrcht_emp_id == d.mrcht_emp_id) {
        if (e.checked) {
          item.isSelected = true;
          this.selectedEmps.push(item)
        } else {
          item.isSelected = false;
        
          let empIndex = this.selectedEmps.findIndex(
            e => e.mrcht_emp_id === d.mrcht_emp_id
          );
          if (empIndex !== -1) {
            this.selectedEmps.splice(empIndex, 1)
          }

        }
      }
    })
  }
  checkDpt(e: any, d: any) {
    this.dptLst.forEach((item) => {
      if (item.dprt_id == d.dprt_id) {
        if (e.checked) {
          item.isSelected = true;
          this.selectedDptIds.push(item.dprt_id)
        } else {
          item.isSelected = false;
          let dptIndex = this.selectedDptIds.findIndex(
            dpt => dpt === d.dprt_id
          );
          if (dptIndex !== -1) {
            this.selectedDptIds.splice(dptIndex, 1)
          }

        }
      }
    })
    console.log(this.districts)
  }
  checkUlb(e: any, ul: any) {

    this.ulbLst.forEach((item) => {
      item.ulbs.forEach(element => {
        if (element.mndl_id == ul.mndl_id) {
          if (e.checked) {
            element.isSelected = true;
            this.selectedUlbIds.push(element.mndl_id)
            this.getSachivalayams(ul);
          } else {
            element.isSelected = false;
            let mndlIndex = this.selectedUlbIds.findIndex(
              mndl => mndl == element.mndl_id
            );
            if (mndlIndex !== -1) {
              this.selectedUlbIds.splice(mndlIndex, 1)
            }
          }
        }
      });

    })
    console.log(this.mandals)
  }
  checkSvm(e: any, s: any) {
    this.svmLst.forEach((item) => {
      console.log(item)
      item.svms.forEach(element => {
        if (element.svm_id == s.svm_id) {
          if (e.checked) {
            element.isSelected = true;
            this.selectedSvmIds.push(element.svm_id)
          } else {
            element.isSelected = false;
            let svmIndex = this.selectedSvmIds.findIndex(
              svm => svm == element.svm_id
            );
            if (svmIndex !== -1) {
              this.selectedSvmIds.splice(svmIndex, 1)
            }
          }
        }
      });
    })
    console.log(this.sachivalayams)
  }
  checkAll(e: any, d: any) {
    console.log(d)
    if (d == 'district') {
      this.selectedDistIds = []
      if (e.checked) {

        this.dstLst.forEach((item) => {
          item.isSelected = true;
          this.selectedDistIds.push(item.dstrt_id)

        })
        this.getAllUlbs();
      }
      else {

        this.ulbLst = []
      }
      this.dstLst.forEach((item) => {
        if (e.checked) {

          item.isSelected = true;
        }
        else {

          item.isSelected = false;
        }

      })
    } else if (d == 'ulbs') {
      this.selectedUlbIds = []
      console.log(this.ulbLst)


      this.ulbLst.forEach((item) => {

        item.ulbs.forEach((u) => {
          if (e.checked) {
            this.selectedUlbIds.push(u.mndl_id)
            u.isSelected = true
          } else {
            u.isSelected = false
          }


        })



      })
      if (e.checked) {
        this.getAllSachivalayams(this.selectedUlbIds);
      } else {

        this.svmLst = []
        this.svmPag = []
        this.svmCount = 10;
      }





      // this.ulbLst.forEach((item) => {
      //   if (e.checked) {

      //     item.isSelected = true;
      //   }
      //   else {

      //     item.isSelected = false;
      //   }

      // })
      // let selectedUlbs = [];
      // this.ulbLst.forEach((item) => {
      //   item.ulbs.forEach((u) => {
      //     if (e.checked) {
      //       selectedUlbs.push(u.mndl_id);
      //       u.isSelected = true;
      //     }

      //     else {
      //       u.isSelected = false;
      //     }

      //   })
      // })
      // if (e.checked) {
      //   this.getAllSachivalayams(selectedUlbs);
      // }
      // else {
      //   this.svmLst = []
      //   this.svmPag = []
      //   this.sum = 10;
      // }
    } else if (d == 'sachivalayam') {

      this.selectedSvmIds = []


      this.svmLst.forEach((item) => {

        item.svms.forEach((s) => {
          if (e.checked) {
            this.selectedSvmIds.push(s.svm_id)
            s.isSelected = true
          } else {
            s.isSelected = false
          }


        })



      })
      this.svmPag.forEach((item) => {
        item.svms.forEach((s) => {
          if (e.checked) {

            s.isSelected = true;
          }

          else {
            s.isSelected = false;
          }

        })
      })
    }
    //   if (!e.checked)

    //     this.svmLst = []
    //   this.svmPag = []
    //   this.sum = 10;
    // }


    // let selectedSvms = [];
    // this.svmLst.forEach((item) => {
    //   item.svms.forEach((s) => {
    //     if (e.checked) {

    //       s.isSelected = true;
    //     }

    //     else {
    //       s.isSelected = false;
    //     }

    //   })
    // })


    else if (d == 'departments') {
      this.selectedDptIds = []
      if (e.checked) {

        this.dptLst.forEach((item) => {
          item.isSelected = true;
          this.selectedDptIds.push(item.dprt_id)

        })

      }

      this.dptLst.forEach((item) => {
        if (e.checked) {

          item.isSelected = true;
        }
        else {

          item.isSelected = false;
        }

      })
    }
    else if (d == 'employee') {
      this.selectedEmps = []


      this.empLst.forEach((item) => {

          if (e.checked) {
            this.selectedEmps.push(item)
            item.isSelected = true
          } else {
            item.isSelected = false
          }

      })
      this.empPag.forEach((item) => {
        if (e.checked) {
          item.isSelected = true
        } else {
          item.isSelected = false
        }
      })
     
        this.empPag = []
        this.empCount = 50
        this.appendItems(0, this.empCount, this.empLst,this.empPag);
     
    }
  }

  schdlTrng() {
    this.schFormDt = {
      ulbLst: this.ulbs.value,
      dstctL: this.dstct.value,
      svm: this.svcm.value,
      dpt: this.dept.value,
      SchData: this.courseForm.value
    }

    console.log(this.schFormDt);
    console.log(this.schFormDt.SchData);
    const rte = 'web/common/crsform';
    this.crdsrv.create(this.schFormDt, rte).subscribe((res) => {
      console.log(res)

      if (res['status'] == 200) {
        this.snackBar.open("Course Sucessfully Added", 'End now', {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        });

      }
      //this.courseForm.reset();

    }, (error) => {
      console.log(error)
    })

  }
 
  assignTraining(){
     let data = this.courseForm.value;
     this.selectedEmps=this.gridApi.getSelectedRows()
    
     data['emps'] = this.selectedEmps;
     console.log(data)
    
 
    const rte = 'web/common/asgnTrng/';
    this.crdsrv.create(data, rte).subscribe(res => {
      if (res['status'] == 200) {
        this.snackBar.open("Assignment Sucessfully Added", 'End now', {
          duration: 2000,
          horizontalPosition: "center",
          verticalPosition: "bottom",
        });
       this.resetFields()
      }
      console.log(res)
    })
}
  resetFields() {
  
  }

}
