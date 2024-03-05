import { Component, ViewChild, OnInit, Output, EventEmitter, Input, NgZone } from '@angular/core';
import { CrudService } from '../../../../../apps/crud.service'
import { MatDialogRef, MatPaginator, MatTableDataSource, MatSort, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar, MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';
import { MessageDialogComponent } from 'app/main/shared/components/message-dialog/message-dialog.component';
import { Location } from '@angular/common';

@Component({
    selector: 'app-custom-report-bldr',
    templateUrl: './custom-report-bldr.component.html',
    styleUrls: ['./custom-report-bldr.component.scss']
})
export class CustomReportBldrComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    query: string = 'select * from prfle_lst_t limit 10;';
    report_url: string = '';
    report_name: string = '';
    descrp_txt: string = '';
    qurydata: any;
    labename: any
    results: boolean = false;
    TableHeaders: any = [];
    TableData: any = [];
    horizontalPosition: MatSnackBarHorizontalPosition = 'right';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    grplist: any;
    ctgrylist: any;
    fltrlist: any;
    rpt_id: any;
    selectGrp: any;
    selectCtgy: any;
    selectFltrs: any;
    fltrids = [];
    fltrslabel: boolean = false;
    tableview: boolean = false;
    pushAddDtls: any[];
    fltrsdata: any = [];
    tabledata: any = [];
    fltrsnames: any;
    fltrs: any;
    mnindx: number;
    usrLgnDtls: any;
    excelflenm: boolean = false;
    pdfflenm: boolean = false;
    acceptdescrption: boolean = false;
    selectexcel: any;
    excelname: any;
    selectPdf: any;
    pdfname: any;
    loader: boolean;
    pgnation: any;
    showcolumns: boolean = false;
    columnnames: { type: string; value: any; }[];
    dataft: any[];
    rptParamDta: any;
    cmRptData: any;
    showCmRpts: boolean = false;
    erptGrpCtQryData: any[];
    efltrsData: any[];
    ecolumnsData: any[]
    shwUpdtBtn: boolean = false;
    shwSubmtBtn: boolean = true;
    shwSaveClms: boolean = true;
    shwUpdClms: boolean = false;
    editrptDATA: any;
    dummyfltrdata: any;
    checkComplted: any[];
    confirmMsgDialogRef: MatDialogRef<MessageDialogComponent>;
    csmtList: any;
    getRowHeight;
    permissions;
    mainMessage;

    columnDefs: any;
    stanedVrblsList: any;

    getHeaderDtls = function () { return { "title": "Report Builder", "icon": "list_alt" } }
    connectionList: any;
    selectDbConctors: any;
    columnKeys: any = [];
    clumnDetails: any;
    constructor(private apiSrv: CrudService, public _snackBar: MatSnackBar, public dialog: MatDialog, private _location: Location) {
        this.usrLgnDtls = JSON.parse(localStorage.getItem('usrDtls'));
        this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 }
        let rowHeight = 40;
        this.getRowHeight = function (params) {
            return rowHeight;
        };
    }

    ngOnInit() {
        this.rptgrouplst();
        this.rptcatgrylst();
        this.rptfltrslst();
        this.customreports();
        this.standedvariables();
        this.dbconection();
    }
    dbconection() {
        const rte = `sql/dbconnectionlist`;
        this.apiSrv.get(rte).subscribe((res) => {
            this.connectionList = res['data']
            console.log(this.connectionList)
        });
    }
    standedvariables() {
        const rte = `sql/standedvariableslist`;
        this.apiSrv.get(rte).subscribe((res) => {
            this.stanedVrblsList = res['data']
        });
    }

    customreports() {
        const rte = `sql/customReportslist`;
        this.apiSrv.get(rte).subscribe((res) => {
            if (res['status'] == 200) {
                this.permissions = (res['perm'] === undefined) ? this.permissions : res['perm'][0];
                if (this.permissions.slct_in == 0) this.mainMessage = "You do not have permissions to do this operation. Please contact Administrator to get permissions."
                if (res['data'].length == 0) this.mainMessage = "No entries found in the database."

                this.csmtList = res['data'];
                console.log(this.csmtList); 
                this.columnDefs = [

                    { headerName: 'Sno', field: 'sno', cellStyle: 'center', cellClass: "pm-grid-number-cell", width: 80 },
                    { headerName: 'Report Name', field: 'rpt_nm', cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 200 },
                    { headerName: 'Report Description', field: 'rpt_desc_txt', cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 300 },
                    { headerName: 'Report Group', field: 'grp_nm', cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 300 },
                    { headerName: 'Report Category', field: 'rpt_ctgry_nm', cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 150, groupIndex: 0 },
                    { headerName: 'Create User Name', field: 'mrcht_usr_nm', cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 150 },
                    { headerName: 'Create Time', field: 'crte_ts', cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 130 },
                    { headerName: 'Update User Name', field: 'updte_usr_nm', cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 150 },
                    { headerName: 'Update Time', field: 'updte_ts', cellStyle: 'left', cellClass: "pm-grid-number-cell", width: 130 },

                ];
            }
            else if (res['status'] == 404) {
                this.permissions = { "slct_in": 0, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
            }
        })
    }

    rptgrouplst() {
        const rte = `sql/grouplist`;
        this.apiSrv.get(rte).subscribe((res) => {
            this.grplist = res['data']
        });
    }
    rptcatgrylst() {
        const rte = `sql/catgrylist`;
        this.apiSrv.get(rte).subscribe((res) => {
            this.ctgrylist = res['data']
        });
    }
    rptfltrslst() {
        const rte = `sql/fltrslist`;
        this.apiSrv.get(rte).subscribe((res) => {
            this.dummyfltrdata = res['data']
            for (var f = 0; f < this.dummyfltrdata.length; f++) {
                this.dummyfltrdata[f].checkng = false;
            }
            this.fltrlist = this.dummyfltrdata;
        });
    }
    getexcel(eind) {
        if (eind == 1) {
            this.excelflenm = true;
        }
        else {
            this.excelflenm = false;
        }
    }
    getPdf(pind) {
        if (pind == 1) {
            this.pdfflenm = true;
        }
        else {
            this.pdfflenm = false;
        }
    }
    onSubmit() {
        if (this.selectGrp == undefined || this.selectCtgy == undefined) {
            this.confirmMsgDialogRef = this.dialog.open(MessageDialogComponent, {
                width: '25%',
                panelClass: 'my-class',
                data: {
                    title: '',
                    msg: 'Select Group and Category',
                    btnLst: [{
                        label: 'Ok'
                    }]
                }
            });
        }
        else {
            if (!this.report_name) return;
            let postData = {
                query: this.query,
                connectonId: this.selectDbConctors,
                report_name: this.report_name,
                report_url: this.report_url,
                report_desc_txt: this.descrp_txt,
                excel_ind: this.selectexcel ? this.selectexcel : '0',
                excel_fle_nm: this.excelname ? this.selectexcel : '',
                pdf_in: this.selectPdf ? this.selectPdf : '0',
                pdf_fle_nm: this.pdfname ? this.pdfname : '',
                pgntn: this.pgnation ? this.pgnation : '10'
            }
            console.log(postData);
            const rte = `sql/querypstDtls`;
            this.apiSrv.create(postData, rte).subscribe((res) => {
                this.rpt_id = res['data'].insertId
                if (res['data'].insertId) {
                    this.showcolumns = true;
                    this.report_name = '';
                    this.report_url = '';
                    this.descrp_txt = '';
                    this.selectDbConctors = '';
                    this._snackBar.open('Report Successfully Saved.', 'End now', {
                        duration: 2000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                    });
                    let pstdta = {
                        groupid: this.selectGrp,
                        categoryid: this.selectCtgy,
                        reportid: this.rpt_id,
                    }

                    this.grpctgryfnctn(pstdta);
                    this.fltrsrltnfnctn();
                    this.forcloumnsinsertion(this.rpt_id);
                    this.rptPrfleRltn();
                }

            });
            this.results = true;
        }
    }
    onReportChange() {
        this.report_url = '/report/' + this.report_name.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '_')
            ;
    }
    
    addfltrs(varble, dta) {
        if (varble != 1) {
            this.dataft = [];
            this.fltrids = [];
            for (let n = 0; n <= this.selectFltrs.length; n++) {
                for (let m = 0; m < this.fltrlist.length; m++) {
                    if (this.selectFltrs[n] == this.fltrlist[m].fltr_id) {
                        this.fltrids.push({ 'name': this.fltrlist[m].fltr_nm, 'fltr_id': this.fltrlist[m].fltr_id, 'inputbox': [{ 'iputid': '', 'inputnm': '', 'variable': this.fltrlist[m].fltr_nm + '_0', 'default': '', 'sequence': '1', 'accept': '', 'acceptdes': '' }], })
                    }
                }
            }
            this.dataft = _.uniqBy(this.fltrids, 'fltr_id');
        }
        else if (varble == 1) {
            this.fltrids = Object.keys(dta).map(nm => ({ name: dta[nm].fltr_NM, fltr_id: dta[nm].fltr_ID, 'inputbox': [{ 'iputid': '', 'inputnm': '', 'variable': dta[nm].fltr_VBTX, 'default': dta[nm].fltr_DFVL, 'sequence': dta[nm].fltr_SQNCEID, 'accept': dta[nm].fltr_ACIN, 'acceptdes': dta[nm].fltr_ACDESC }] }))
            this.dataft = _.uniqBy(this.fltrids, 'fltr_id');
        }

    }
    addtxtbox(itm) {
        itm.inputbox.push({ 'iputid': '', 'inputnm': '', 'variable': itm.name + '_' + itm.inputbox.length, 'default': '', 'sequence': itm.inputbox.length + 1, 'accept': '', 'acceptdes': '' });
    }
    upward(uitms, uoitm, uindex) {
        var mnindx = uindex - 1;
        if (uitms.inputbox[mnindx]) {
            uitms.inputbox[mnindx].inputnm = uoitm.inputnm
            uitms.inputbox[mnindx].default = uoitm.default
            uoitm.inputnm = ''
            uoitm.default = ''
        }
    }
    downwward(ditms, doitm, dindex) {
        var mxindx = dindex + 1;
        if (ditms.inputbox[mxindx]) {
            ditms.inputbox[mxindx].inputnm = doitm.inputnm
            ditms.inputbox[mxindx].default = doitm.default
            doitm.inputnm = ''
            doitm.default = ''
        }
    }
    delete(dlitms, dlitm, dlindex) {
        var arr = dlitms
        var dlindx = dlindex
        arr.inputbox.splice(dlindx, 1);
    }
    grpctgryfnctn(pstngdata) {
        console.log("categoryyyyyyyygrouppppp");
        const rteo = `sql/reportgroupsrltn`;
        this.apiSrv.create(pstngdata, rteo).subscribe((res) => {
           if(res['status'] == 200){
            const rteT = `sql/reportctgryrltn`;
            this.apiSrv.create(pstngdata, rteT).subscribe((res) => {
                console.log(res['status']);
            });
        }
        });
       
    }

    fltrsrltnfnctn() {
        console.log("flterssssssssss")
        var fltrsdta = {
            reportid: this.rpt_id,
            fltrid: this.dataft
        }
        if (fltrsdta.fltrid) {
            if (fltrsdta.fltrid.length != 0) {
                const rteTh = `sql/reportfiltrsrltntwo`;
                this.apiSrv.create(fltrsdta, rteTh).subscribe((res) => {
                    console.log(res['status']);
                });
            }
        }
        else {
            console.log("NO FILTERS");
        }

    }
    rptPrfleRltn() {
        console.log("reportprofileeeeee")
        let dta = {
            reportid: this.rpt_id,
            usrid: this.usrLgnDtls.mrcht_usr_id
        }
        const rteTh = `sql/reportPrflesrltntwo`;
        this.apiSrv.create(dta, rteTh).subscribe((res) => {
            if (res['status'] == 200) {
            }
        });
    }

    forcloumnsinsertion(rptdata) {
        console.log("columns insertion");
        this.columnKeys = [];
        let postdata = {
            rpt_id: rptdata,
            rpt_params_data: this.rptParamDta ? JSON.parse(this.rptParamDta) : 0
        }
        const rte = `sql/getallrptdetails`;
        this.apiSrv.create(postdata, rte).subscribe((res) => {
            if (res['status'] == 200) {
                this.fltrsdata = res['data'][0];
                this.tabledata = res['data'][1];
                console.log(this.tabledata);
                console.log(this.fltrsdata);
                this.loader = false;
                var columValues = Object.keys(this.tabledata[0]);
                // this.columnKeys.push(columValues)
                console.log(columValues);
                for (var i = 0; i < columValues.length; i++) {
                    console.log(columValues[i]);
                    var o = {};
                    // o[columValues[i]] = columValues[i];
                    this.columnKeys.push(columValues[i]);
                }

                // console.log(this.columnKeys);
                if (this.tabledata.length) {
                    // for (var i = 0; i < this.columnnames.length; i++) {
                    //     if (this.columnnames[i].type == this.columnKeys) {
                    //         this.columnnames = Object.keys(this.tabledata[0]).map(key => ({ type: key, value: this.tabledata[0][key], displaynm: '', visibleonrpt: '', filterin: '', width: '', refanrpt: '', rpturl: '', rptparameters: '', rptfilterparameters: '', csequence: '', datatype: '' }))
                    //     } else {
                    //         console.log("else condition")
                    this.columnnames = Object.keys(this.tabledata[0]).map(key => ({ type: key, value: this.tabledata[0][key], displaynm: '', visibleonrpt: '', filterin: '', width: '', refanrpt: '', rpturl: '', rptparameters: '', rptfilterparameters: '', csequence: '', datatype: '' }));
                    // }
                    // }

                }
                // if (this.tabledata.length) {
                //     this.columnnames = Object.keys(this.tabledata[0]).map(key => ({ type: key, value: this.tabledata[0][key], displaynm: '', visibleonrpt: '', filterin: '', width: '', refanrpt: '', rpturl: '', rptparameters: '', rptfilterparameters: '', csequence: '', datatype: '' }));
                // }
            }
        })

    }
    svcolumnsdata(clmsdata) {
        for (var k = 0; k < clmsdata.length; k++) {
            if (clmsdata[k].visibleonrpt == "") {
                clmsdata[k].visibleonrpt = false;
            }
            if (clmsdata[k].filternm == "") {
                clmsdata[k].filternm = false;
            }
        }
        let clmnsdata = {
            rpt_id: this.rpt_id,
            columnskeys: clmsdata
        }
        const rptclumns = `sql/reportqrycolumns`;
        this.apiSrv.create(clmnsdata, rptclumns).subscribe((res) => {
            if (res['status'] == 200) {
                this._snackBar.open('Columns Successfully Saved.', 'End now', {
                    duration: 2000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                });
            }
        })
    }

    custRpts() {
        this.loader = true
        const rte = `sql/getOnlyCustmRptsDetails`;
        this.apiSrv.get(rte).subscribe((res) => {
            this.erptGrpCtQryData = res['data'][0]
            this.efltrsData = res['data'][1]
            this.ecolumnsData = res['data'][2]
            console.log(this.ecolumnsData);
            if (this.erptGrpCtQryData.length > 0) {
                this.showCmRpts = true;
                this.loader = false
            }
        });
    }

    goEditRpt(ClckRprtId) {
        let RpDls = [];
        
        for (var d = 0; d < this.erptGrpCtQryData.length; d++) {
            if (this.erptGrpCtQryData[d].rpt_ID == ClckRprtId) {
                RpDls.push(this.erptGrpCtQryData[d])
            }
        }
        console.log(RpDls)
        this.editrptDATA = RpDls;
        this.showCmRpts = false;
        this.shwUpdtBtn = true;
        this.shwSubmtBtn = false;
        this.shwSaveClms = false;
        this.shwUpdClms = true;
        this.report_name = RpDls[0].rpt_NAME;
        this.descrp_txt = RpDls[0].rpt_DESC;
        this.selectGrp = RpDls[0].rpt_GRPID;
        this.selectCtgy = RpDls[0].rpt_CATID;
        this.selectexcel = RpDls[0].rpt_EXIN;
        if (this.selectexcel == 0) {
            this.excelflenm = false;
        }
        else if (this.selectexcel == 1) {
            this.excelflenm = true;

        }
        this.excelname = RpDls[0].rpt_EXNM;
        this.selectPdf = RpDls[0].rpt_PDFIN;
        if (this.selectPdf == 0) {
            this.pdfflenm = false;
        }
        else if (this.selectPdf == 1) {
            this.pdfflenm = true;
        }
        this.pdfname = RpDls[0].rpt_PDFNM;
        this.pgnation = RpDls[0].rpt_PGN;
        this.query = RpDls[0].rpt_QUERY
        this.selectDbConctors = RpDls[0].rpt_PDFNM;

        // let EDclmsData = [];
        // for (var r = 0; r < this.ecolumnsData.length; r++) {
        //     if (ClckRprtId == this.ecolumnsData[r].clum_rpt_ID) {
        //         EDclmsData.push(this.ecolumnsData[r])
        //     }

        // }
        // if (r == this.ecolumnsData.length) {
        //     this.columnnames = Object.keys(EDclmsData).map(key => ({ type: EDclmsData[key].clum_NAME, value: EDclmsData[key], displaynm: EDclmsData[key].clum_DSPNM, visibleonrpt: EDclmsData[key].clum_VSIBLE, filterin: EDclmsData[key].clum_FILTER, width: EDclmsData[key].clum_WDTH, refanrpt: EDclmsData[key].clum_RFRPTNM, rpturl: EDclmsData[key].clum_RFRPTURL, rptparameters: EDclmsData[key].clum_RFRPTPARMS, rptfilterparameters: EDclmsData[key].clum_RFRPTFILTRPARMS, csequence: EDclmsData[key].clum_SQNCE }));
        // }
        let EDfltrsData = [];
        for (var c = 0; c < this.efltrsData.length; c++) {
            if (ClckRprtId == this.efltrsData[c].fltr_rpt_ID) {
                EDfltrsData.push(this.efltrsData[c])
            }

        }
        if (c == this.efltrsData.length) {
            this.selectFltrs = Object.keys(EDfltrsData).map(sm => (EDfltrsData[sm].fltr_ID))
            this.addfltrs(1, EDfltrsData);
        }

// console.log(this.columnnames);
// console.log(this.ecolumnsData);
// console.log(EDclmsData);
const rte = `sql/getColumnDetailsForEdit/${ClckRprtId}`;
this.apiSrv.get(rte).subscribe((res) => {
    this.clumnDetails = res['data']
    console.log(this.clumnDetails);
    this.columnnames = Object.keys(this.clumnDetails).map(key => ({ clmnId: this.clumnDetails[key].rpt_clumn_id,type: this.clumnDetails[key].clmn_nm, value: this.clumnDetails[key], displaynm: this.clumnDetails[key].dsply_nm, visibleonrpt: this.clumnDetails[key].vsble_in, 
        filterin: this.clumnDetails[key].fltr_in, width: this.clumnDetails[key].wdth_ct, refanrpt: this.clumnDetails[key].rfrnce_rpt_id, rpturl: this.clumnDetails[key].rpt_url_tx,
         rptparameters: this.clumnDetails[key].rpt_prmtrs_tx, rptfilterparameters: this.clumnDetails[key].fltr_prmtrs_tx, csequence: this.clumnDetails[key].sqnce_id, datatype: this.clumnDetails[key].dta_type}))

         console.log(this.columnnames);
        })
    }
    onUpdate() {
        this.loader = true;
        let pstUpdateRptsData = {
            rpt_id: this.editrptDATA[0].rpt_ID,
            rpt_name: this.report_name,
            rpt_desc: this.descrp_txt,
            rpt_grp_id: this.selectGrp,
            rpt_ctgry_id: this.selectCtgy,
            rpt_excel_in: this.selectexcel,
            rpt_excel_name: this.excelname,
            rpt_pdf_in: this.selectPdf,
            rpt_pdf_name: this.pdfname,
            rpt_pgntn: this.pgnation,
            updQuery: this.query,
            rpt_fltrsdata: this.dataft,
            updbconctn: this.selectDbConctors
        }

        const rte = `sql/updateReportData`;
        this.apiSrv.create(pstUpdateRptsData, rte).subscribe((res) => {
            this.forcloumnsinsertion(this.editrptDATA[0].rpt_ID)
        })
    }
    upcolumnsdata(updclms) {
        console.log(this.columnnames);
     
        let pstUpdateColms = {
            rpt_id: this.editrptDATA.rpt_ID ? this.editrptDATA.rpt_ID : this.editrptDATA[0].rpt_ID,
            updateColoumnsData: this.columnnames
        }
        console.log(this.columnnames);
        const rte = `sql/updatecolumnsData`;
        this.apiSrv.create(pstUpdateColms, rte).subscribe((res) => {
            console.log(res['data']);
            if (res['status'] == 200) {
                this._snackBar.open('Columns Successfully Updated.', 'End now', {
                    duration: 2000,
                    horizontalPosition: this.horizontalPosition,
                    verticalPosition: this.verticalPosition,
                });
            }
        })
    }

    back() {
        this.showCmRpts = false;
        this.shwUpdtBtn = false;
        this.shwSubmtBtn = true;
        this.shwSaveClms = true;
        this.shwUpdClms = false;
    }

    startEdit(event) {
        console.log(event.data.rpt_id);
        this.goEditRpt(event.data.rpt_id);
    }

}

