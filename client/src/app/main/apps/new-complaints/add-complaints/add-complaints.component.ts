import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TransfereService } from "app/providers/transfer/transfer.service";
import { CrudService } from "app/main/apps/crud.service";
import { DsSidebarService } from "@glits/components/sidebar/sidebar.service";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
    MatDialogRef,
    MatSnackBar,
    MatDialog,
    MAT_DIALOG_DATA,
} from "@angular/material";
import { DeleteDialogComponent } from "app/main/shared/components/delete-dialog/delete-dialog.component";
import { exit } from "process";
import { take, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from "rxjs";
import { Category } from "aws-sdk/clients/support";
interface Packageplan {
    value: string;
    viewValue: string;
}

interface Priority {
    value: string;
    viewValue: string;
}

class ImageSnippet {
    constructor(public src: string, public file: File) { }
}
@Component({
    selector: "app-add-complaints",
    templateUrl: "./add-complaints.component.html",
    styleUrls: ["./add-complaints.component.scss"],
})
export class AddComplaintsComponent implements OnInit {
    [x: string]: any;
    org;
    suborg;
    complaintform: FormGroup;
    cafdetails: FormGroup;
    submitted = false;
    bankFilterCtrl: FormGroup;
    pckgeProperties: any;
    gndrLst: any;
    frm_type: any;
    showStepr = false;
    sideBarHeader: string;
    editClicked: boolean = false;
    updateData: any;
    deleteCstmr: boolean;
    ste_lst: any;
    dstrt_lst: any;
    mndl_lst: any;
    vlge_lst: any;
    cllrtype: any;
    columnDefs = [];
    districtId: any;
    selectedFile: ImageSnippet;
    spnrCtrl = false;
    confirmDialogRef: MatDialogRef<DeleteDialogComponent>;
    horizontalPosition: MatSnackBarHorizontalPosition = "right";
    verticalPosition: MatSnackBarVerticalPosition = "top";
    getHeaderDtls = function () {
        return { title: "Add New Complaint", icon: "people_outline" };
    };
    blng_frqncy_lst: any;
    mndal_lst: any;
    mandalId: any;
    vilge_lst: any;
    permissions;
    read;
    packages: any;
    cstmrtyp: any;
    srvpcs: any;
    frmData: any;
    EnblUpbtn: boolean = false;
    cafid: any;
    cafId;
    oltDtls: any;
    slotDtls: any;
    prtDtls: any;
    sltLvlOne: any[];
    sltLvlTwo: any[];
    sltLvlThree: any[];
    blng_vlge_lst: any[];
    instl_vlge_lst: any[];
    blng_mndl_lst: any[];
    instl_mndl_lst: any[];
    blng_dstrt_lst: any[];
    instl_dstrt_lst: any[];
    loader: boolean = false;
    isChecked: any;
    entcaf: boolean = false;
    siusr: boolean = false;
    usrdtls: any;
    boxDetails: any;
    poplst: any;
    frm_actn: any;
    splits: any;
    radioSelected: any;
    radioSelected1: any;
    iptvDetails: any;
    lagDtls: any;
    caftyp_id = 0;
    level1: any;
    level2: any;
    level3: any;
    onu_id: any;
    packgdta: any;
    tps: any;
    trnfpt = [];
    splt_id: any;
    aaa_mac_id: any;
    aaa_cd: any;
    onuchecked = false;
    iptvchecked = false;
    aadhaar: any;
    showCafSidebar: boolean = false;
    showSidebar: boolean = false;
    adr: any;
    entfrmData: any;
    nodes: any;
    distnm: any;
    mandalnm: any;
    vlgnm: any;
    eftdt: any;
    expdt: any;
    poploc: any;
    Date: any;
    lsd_lne = 1;
    instd_by_prntnr_id = 4;
    adharErrorMsg: any;
    nxt = true;
    partnerCode: any;
    columnDefss: any;
    lmoLoader: boolean;
    distId: any;
    disabled: boolean | null;
    searchLoader: boolean;
    rowData: any;
	chckdtacaf:any;
    showTble: boolean;
    shwPrflePge: boolean;
    selectedValue: string;
    condition: string;
    elseBlock: string;
    lightindication: boolean = false;
    selected: string;
    selectedservice: string;
    showMecustomer: boolean = false;
    showMeenquiry: boolean = false;
    showMeenterprise: boolean = false;
    showMerequest: boolean = false;
    addonchannel: boolean = false;
    planupgrade: boolean = false;
    plandowngrade: boolean = false;
    showcustomerdetails: boolean = true;
    nullWithDefault: string = "N/A";
    notavailable: any;
    isValid: any;
	selfData:any;
    occ:any;
    entcafflag: boolean = false;
    category: any;
    shwLdr = false;
    Terminated: any;
    callattend: any;
    channellist: any[];
    newdstrct: any[];
    categorylist: any[];
    enterprise:boolean = false;
    nodata:boolean = false;
    nodataMsg; any;
    customercategory: any;
    servicescategory: any;
    enquirycategory: any;
    enterprisecategory: any;
    disableBtn: boolean;
    employeeDetails: any;
    reqstCategory: any;
    reqstorgCategory:any;
    imagesize: boolean = true;
    imgsizemessage: boolean = false;
    lmoinput: boolean = false;
    assigneddropdown: boolean = true;
    terminate = false;
    public issueType: FormControl = new FormControl();
    /** list of banks filtered by search keyword */
    public filteredBanks: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);

    constructor(
        private _dsSidebarService: DsSidebarService,
        private http: HttpClient,
        private router: Router,
        private _formBuilder: FormBuilder,
        private crdsrv: CrudService,
        private datePipe: DatePipe,
        private snackBar: MatSnackBar,
        public dialog: MatDialog,
        public TransfereService: TransfereService
    ) { }

    ngOnInit() {
        let cafidPattern = /^[A-Za-z0-9 ._%+-]{1,500}$/;
        this.cafdetails = this._formBuilder.group({
            Cafid: ["", [Validators.required, Validators.pattern(cafidPattern)]],
        });
        let phoneNumber = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        let emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        
        this.complaintform = this._formBuilder.group({
            select_ticket_type: ['', Validators.required],
            select_category: ['', Validators.required],
            priority: ['', Validators.required],
            complaint_remarks: ['', [Validators.required, Validators.pattern(cafidPattern)],],
            alternate_number: [null, [Validators.required, Validators.pattern(phoneNumber)],],
            select_orgnname: ['', Validators.required],
            dprtmntcde: [null, Validators],
            entemail: [null, Validators],
            cllrtyp: ['', Validators.required],
            new_dstrt: ['', Validators.required],
            caller_name: ['', [Validators.required, Validators.pattern(cafidPattern)],],
            cllattndby: [null, Validators],
			location:['', Validators.required],
            Updfile: [null, Validators],
            occcctype: [null, Validators],
            employeeInfo: this._formBuilder.group({
                assigned_emply: [null, Validators.required],
                owner_typ: [null, Validators.required],
            }),
        });
        this.occ=1;
        this.getissuwowner();
        //this.customercategoryList();
        //this.servicescategoryList();
        //this.enquirycategoryList();
        // this.categoryList();
        this.channelList();
        this.getcstmrdstrct();
        this.callertype();
        this.cllattndby();
        this.usrdtls = JSON.parse(localStorage.getItem("usrDtls"));
		this.selfdata();
        // console.log(this.usrdtls)
        // let disableBtn = false;
        // this.cafdetails.valueChanges
        // this.complaintform.valueChanges 
        //             .subscribe((changedObj: any) => {
        //                 // this.disableBtn = this. cafdetails.valid;
        //                  this.disableBtn = this.complaintform.valid;
        //             });

        // listen for search field value changes
        // this.issueType.valueChanges
        // .pipe(takeUntil(this._onDestroy))
        // .subscribe(() => {
        //   this.filterBanks();
        // });
		this.complaintform.get('cllattndby').setErrors(null); 
    }
	
	selfdata(){
        this.selfData = this.usrdtls
    }
    occcc(type){
        console.log("value occcc",type);
        this.complaintform.controls['select_ticket_type'].reset()
        this.complaintform.controls['select_category'].reset()
        this.occ = type
        this.customercategory = null
    }

    ticketType(tickettype) {
        //   alert(tickettype);
        if (tickettype == "Customer Complaints") {
            this.showMecustomer = true;
            this.showMerequest = false;
            this.showMeenquiry = false;
            this.showMeenterprise = false;
            //this.Customer_Complaints();
            this.customercategoryList();
            this.reset1();
            this.entcafflag = false;
            this.complaintform.get('select_orgnname').setValidators(null);
            this.complaintform.get('dprtmntcde').setValidators(null);
            this.complaintform.get('entemail').setValidators(null);
			this.complaintform.get('location').setValidators(null);
            this.complaintform.get('select_orgnname').setErrors(null); 
            this.complaintform.get('dprtmntcde').setErrors(null); 
            this.complaintform.get('entemail').setErrors(null); 
			this.complaintform.get('location').setErrors(null);
        } else if (tickettype == "Service Request") {
            this.showMecustomer = false;
            this.showMerequest = true;
            this.showMeenquiry = false;
            this.showMeenterprise = false;
            this.reset1();
            //this.occ=1;
            this.entcafflag = false;
            this.servicescategoryList();
            this.complaintform.get('select_orgnname').setValidators(null);
            this.complaintform.get('dprtmntcde').setValidators(null);
            this.complaintform.get('entemail').setValidators(null);
			this.complaintform.get('location').setValidators(null);
            this.complaintform.get('select_orgnname').setErrors(null); 
            this.complaintform.get('dprtmntcde').setErrors(null); 
            this.complaintform.get('entemail').setErrors(null); 
			this.complaintform.get('location').setErrors(null);
        } else if (tickettype == "Enquiry") {
            this.showMecustomer = false;
            this.showMerequest = false;
            this.showMeenquiry = true;
            this.showMeenterprise = false;
            this.reset1();
            this.enquirycategoryList();
            //this.occ=1;
            this.entcafflag = false;
            this.complaintform.get('select_orgnname').setValidators(null);
            this.complaintform.get('dprtmntcde').setValidators(null);
            this.complaintform.get('entemail').setValidators(null);
			this.complaintform.get('location').setValidators(null);
            this.complaintform.get('select_orgnname').setErrors(null); 
            this.complaintform.get('dprtmntcde').setErrors(null); 
            this.complaintform.get('entemail').setErrors(null); 
			this.complaintform.get('location').setErrors(null);
        }
        else if (tickettype == "Lmo Complaint") {
            this.showMecustomer = true;
            this.showMerequest = false;
            this.showMeenquiry = false;
            this.showMeenterprise = false;
            this.grievanceList();
            this.getsubemployee1();
            this.complaintform.get("employeeInfo.owner_typ").setValue(22);
            this.entcafflag = false;
            this.reset1();
            this.complaintform.get('select_orgnname').setValidators(null);
            this.complaintform.get('dprtmntcde').setValidators(null);
            this.complaintform.get('entemail').setValidators(null);
            this.complaintform.get('location').setValidators(null);
            this.complaintform.get('select_orgnname').setErrors(null);
            this.complaintform.get('dprtmntcde').setErrors(null);
            this.complaintform.get('entemail').setErrors(null);
            this.complaintform.get('location').setErrors(null);
        }
        else if (tickettype == "Enterprise") {
            this.showMecustomer = false;
            this.showMerequest = false;
            this.showMeenquiry = false;
            this.showMeenterprise = true;
            //this.reset1();
            this.entcafflag = true;
            this.servicescategoryList();
            //this.occ=1;
            this.complaintform.get('occcctype').setValidators(null);
            this.complaintform.get('occcctype').setErrors(null); 
        }
    }

    reset1() {
        this.reqstCategory = "";
    }

    Customer_Complaints(){
        
        //const rte = `subscriberApp/OCCIssueCcCatgrytype/7/${this.occ}`;
        const rte = `subscriberApp/OCCIssueCcCatgrybycaftype/7/${this.occ}/${this.cafId}`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.servicescategory = res["data"];
            //   console.log(res["data"])
        });
    }

    servicesRequest(servicesRequest) {
        //   alert(servicesRequest)
        if (servicesRequest == "addonchannel") {
            this.addonchannel = true;
            this.planupgrade = false;
            this.plandowngrade = false;
            this.showMecustomer = false;
        } else if (servicesRequest == "planupgrade") {
            this.addonchannel = false;
            this.planupgrade = true;
            this.plandowngrade = false;
            this.showMecustomer = false;
        } else if (servicesRequest == "plandowngrade") {
            this.addonchannel = false;
            this.planupgrade = false;
            this.plandowngrade = true;
            this.showMecustomer = false;
        }
    }

    getDetail() {
        this.complaintform.reset();
        var data = {
            caf_id: this.cafdetails.value["Cafid"],
        };
        console.log(data);
        this.searchLoader = true;
        this.crdsrv.create(data, "caf/getdtfrcmplnts").subscribe((res) => {
             this.crdsrv.create(data, "caf/getdtcountfrcmplnts").subscribe((countres) => {
                this.searchLoader = false;
                this.rowData = res["data"];
                
                //this.customercategoryList();
                console.log(this.rowData);
                console.log("length",this.rowData.length);
                console.log(countres["data"][0]);
                this.chckdtacaf=countres["data"][0];
                // this.complaintform.patchValue({employeeInfo:{assigned_emply:this.rowData[0]["sts_nm"]}});   
                
                //if(countres["data"][0].count == 0){
                     
               // } else {
                    //this.opentcktcaf = false; //17-06-23
                    //this.opentcktcaf = true;
                //}

                //  console.log(this.rowData[0]['sts_nm']);
                //  console.log(this.terminate );
                if(this.rowData.length > 0){
                    this.nodata = false
                    this.cafId = this.rowData[0].caf_id
                    if (this.rowData[0]['caf_type_nm'] == 'ENTERPRISE') {
                        this.terminate = false;
                        this.enterprise = false;
                        this.opentcktcaf = false;
                        this.showMeenterprise = true;
                        this.showMecustomer = false;
                    } else if (this.rowData[0]['sts_nm'] == 'Terminated' ) {
                        this.terminate = false;
                        this.enterprise = true;
                        this.opentcktcaf = false;
                        this.showMeenterprise = false;
                        this.showMecustomer = true;
                    } else {
                        this.terminate = true;
                        this.enterprise = true;
                        this.opentcktcaf = false;
                        this.showMeenterprise = false;
                        this.showMecustomer = true;
                        this.showMeenquiry = false;
                    }
                } else {
                    console.log("nodat msg");
                    
                    this.nodata = true
                    this.nodataMsg = 'Please Check The Customer Deatils'
                }
            })
        });


    }


    addComplaints() {
        console.log(this.entcafflag)
		    this.complaintform.get('select_orgnname').setErrors(null); 
            this.complaintform.get('dprtmntcde').setErrors(null); 
            this.complaintform.get('entemail').setErrors(null); 
			this.complaintform.get('location').setErrors(null);
        if(!this.entcafflag){
            this.complaintform.get('select_orgnname').setErrors(null); 
            this.complaintform.get('dprtmntcde').setErrors(null); 
            this.complaintform.get('entemail').setErrors(null); 
			this.complaintform.get('location').setErrors(null);
        }
        console.log(this.complaintform)
        let filetypCstInfo;
        //console.log(this.selectedFile.file.type)
        if (this.selectedFile) {
            if (this.selectedFile.file.type == "application/pdf") {
                filetypCstInfo = "pdf"
            }
            else {
                filetypCstInfo = "image"
            }
            this.complaintform.value.Updfile = this.selectedFile.src;
        }
        if (this.complaintform.invalid) {
            console.log(this.complaintform)
            this.snackBar.open("Please Enter Valid Data", '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
        }
        else {

            if (this.complaintform.value.employeeInfo["assigned_emply"]) {
                var data = {
                    caf_id: this.rowData[0]['caf_id'],
                    tickettype: this.complaintform.value["select_ticket_type"],
                    // servicerequest: this.complaintform.value["service_request_type"],
                    complaintcategory: this.complaintform.value["select_category"],
                    orgnname: this.complaintform.value["select_orgnname"],
                    dprtmntcde: this.complaintform.value["dprtmntcde"],
                    ent_email: this.complaintform.value["entemail"],
                    cllertype: this.complaintform.value["cllrtyp"],
                    newdstrt: this.complaintform.value["new_dstrt"],
                    cllrname: this.complaintform.value["caller_name"],
                    attndby: this.selfData.complaint_sub_emp_id,
                    priority: this.complaintform.value["priority"],
					location: this.complaintform.value["location"],
                    complaintremarks: this.complaintform.value["complaint_remarks"],
                    alternate_mobile: this.complaintform.value["alternate_number"],
                    selectcomplaintowner: this.complaintform.value.employeeInfo["owner_typ"],
                    occ_or_cc : this.occ,
                    attachments: [{
                        cstInfoFileTyp: filetypCstInfo,
                        uploadfile: this.complaintform.value.Updfile,
                    }],
                    assignedemployee: this.complaintform.value.employeeInfo["assigned_emply"],

                };
            }
            else {
                var data = {
                    caf_id: this.rowData[0]['caf_id'],
                    tickettype: this.complaintform.value["select_ticket_type"],
                    // servicerequest: this.complaintform.value["service_request_type"],
                    complaintcategory: this.complaintform.value["select_category"],
                    priority: this.complaintform.value["priority"],
                    orgnname: this.complaintform.value["select_orgnname"],
                    dprtmntcde: this.complaintform.value["dprtmntcde"],
                    ent_email: this.complaintform.value["entemail"],
                    complaintremarks: this.complaintform.value["complaint_remarks"],
                    alternate_mobile: this.complaintform.value["alternate_number"],
                    cllertype: this.complaintform.value["cllrtyp"],
                    newdstrt: this.complaintform.value["new_dstrt"],
                    cllrname: this.complaintform.value["caller_name"],
                    attndby: this.selfData.complaint_sub_emp_id,
					location: this.complaintform.value["location"],
                    selectcomplaintowner: this.complaintform.value.employeeInfo["owner_typ"],
                    occ_or_cc : this.occ,
                    attachments: [{
                        cstInfoFileTyp: filetypCstInfo,
                        uploadfile: this.complaintform.value.Updfile,
                    }],
                    assignedemployee: this.rowData[0].agnt_cd,
                };
            }
            console.log(data)
            this.searchLoader = true;
            this.crdsrv.create(data, "subscriberApp/OCCinsrtcmplnt").subscribe((res) => {
                this.newcomplaint = res["data"];
                if (res['status'] == 200) {
                    this.snackBar.open("Sucessfully Added", '', {
                        duration: 2000,
                        horizontalPosition: this.horizontalPosition,
                        verticalPosition: this.verticalPosition,
                    });

                    if (this.siusr) {
                        this.router.navigate([`admin/cmplnts/add_complaint`])
                    } else {
                        this.router.navigate(['admin/cmplnts/view_complaint'])
                    }

                }
                console.log(this.newcomplaint);
                this.searchLoader = false;

            });
        }


    }


    screenshotsFile(typ, imageInput) {
        console.log("in image upload");
        console.log(imageInput.target.files[0])
        const file: File = imageInput.target.files[0];
        const reader = new FileReader();
        if (imageInput.target.files[0].size > 512000) {
            this.imagesize = false;
            this.imgsizemessage = true;
            // alert(`uploaded file size is ${(imageInput.target.files[0].size/1024).toFixed(2)} kb, please reduce the file size to less than 300kb then upload`);
            this.snackBar.open(`uploaded file size is ${(imageInput.target.files[0].size / 1024).toFixed(2)} kb, please reduce the file size to less than 500kb then upload`, '', {
                duration: 2000,
                horizontalPosition: this.horizontalPosition,
                verticalPosition: this.verticalPosition,
            });
            this.disableBtn = this.complaintform.valid;
        } else {
            this.imagesize = true;
            this.imgsizemessage = false;
            reader.addEventListener('load', (event: any) => {
                console.log("siva")
                this.selectedFile = new ImageSnippet(event.target.result, file);
            });
            this.disableBtn = this.complaintform.invalid;
        }
        reader.readAsDataURL(file);
    }



    channelList() {
        this.crdsrv.get("subscriberApp/OCCgetAddOnpackages").subscribe((res) => {
            this.channellist = res["data"];
            // console.log(this.channellist);
        });
    }

    callertype() {
        this.crdsrv.get("subscriberApp/cllrtype").subscribe((res) => {
            this.cllrtype = res["data"];
            // console.log(this.channellist);
        });
    }

    cllattndby() {
        this.crdsrv.get("subscriberApp/cllattndby").subscribe((res) => {
            this.callattend = res["data"];
            // console.log(this.channellist);
        });
    }

    // categoryList(){
    //     var data = {
    //         select_category: this.cafdetails.value["select_category"],
    //     };
    //     this.crdsrv.create(data,"subscriberApp/get_comp_cat").subscribe((res) => {
    //         this.categorylist = res["data"];
    //         // console.log(this.categorylist);
    //     });
    // }


    // categoryList(){
    //     const rte = `subscriberApp/get_comp_cat`;
    //     this.crdsrv.get(rte).subscribe((res) => {
    //         this.categorylist = res["data"];
    //     //   console.log(this.categorylist)

    //     });
    // }

    customercategoryList() {
        //const rte = `subscriberApp/OCCIssueCatgrytype/1`;
        //const rte = `subscriberApp/OCCIssueCcCatgrytype/7/${this.occ}/${cafId}`OCCIssueCcCatgrybycaftype
        const rte = `subscriberApp/OCCIssueCcCatgrybycaftype/7/${this.occ}/${this.cafId}`
        this.crdsrv.get(rte).subscribe((res) => {
            this.customercategory = res["data"];
            //   console.log(res["data"])

        });
    }

    servicescategoryList() {
        var data = 2;
        if (this.entcafflag) {
            data = 6
        } else {
            data = 2
        }
        //const rte = `subscriberApp/OCCIssueCatgrytype/${data}`;
        const rte = `subscriberApp/OCCIssueCatgrybyCaftype/${data}/${this.cafId}`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.servicescategory = res["data"];
            //   console.log(res["data"])
        });
    }

    enquirycategoryList() {
        //const rte = `subscriberApp/OCCIssueCatgrytype/3`;
        const rte = `subscriberApp/OCCIssueCatgrybyCaftype/3/${this.cafId}`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.enquirycategory = res["data"];
            //   console.log(res["data"])         
        });
    }
	grievanceList() {
        const rte = `subscriberApp/OCCIssueCatgrybyCaftype/${this.occ}/${this.cafdetails.get('Cafid').value}`;
        console.log(rte)
        this.crdsrv.get(rte).subscribe((res) => {
            this.customercategory = res["data"];
        });
    }

    enterprisecategoryList() {
        //const rte = `subscriberApp/OCCIssueCatgrytype/4`;
        const rte = `subscriberApp/OCCIssueCatgrybyCaftype/4/${this.cafId}`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.enterprisecategory = res["data"];
            //   console.log(res["data"])         
        });
    }
    getcstmrdstrct() {
        const rte = `subscriberApp/dstrctlst`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.newdstrct = res["data"];
            //   console.log(res["data"])         
        });
    }

    getissuwowner() {
        const rte = `subscriberApp/OCCIssueCstmrTyp/1`;
        this.crdsrv.get(rte).subscribe((res) => {
            this.org = res['data'];
            console.log(this.org)
        });
        this.reset()
    }
    reset() {
        this.employeeDetails = "";
    }
	
	getsubemployee1() {
        const rte = "subscriberApp/OCCIssueCstmrSubTyp/22";
        this.crdsrv.get(rte).subscribe((res) => {
            this.suborg = res['data'];
            console.log(this.suborg)
        })
    }

    getsubemployee() {
        const rte = `subscriberApp/OCCIssueCstmrSubTyp/` + this.complaintform.value.employeeInfo.owner_typ;
        this.crdsrv.get(rte).subscribe((res) => {
            this.suborg = res['data'];
            console.log(this.suborg)
            const newLocal1 = 'complaint_owner_id';
            const newLocal2 = 'emp_active';
            if (this.suborg[0][newLocal1] == '4' && this.suborg[0][newLocal2] == '1') {
                this.lmoinput = true;
                this.assigneddropdown = false;
                this.complaintform.get('employeeInfo').get('assigned_emply').setValidators(null);
            }
            else {
                this.lmoinput = false;
                this.assigneddropdown = true;
            }
        });
    }

    planpackages: Packageplan[] = [
        { value: '1', viewValue: 'Home Mini' },
        { value: '2', viewValue: 'Home Basic' },
        { value: '3', viewValue: 'Home Essential' },
        { value: '4', viewValue: 'Home Premium' }

    ];

    priority: Priority[] = [
        { value: '1', viewValue: 'Low' },
        { value: '2', viewValue: 'Medium' },
        { value: '3', viewValue: 'High' },
    ];

    protected filterBanks() {
        if (!this.customercategory) {
            return;
        }
        // get the search keyword
        let search = this.issueType.value;
        if (!search) {
            this.customercategory.next(this.category.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        // filter the banks
        this.customercategory.next(
            this.category.filter(category => category.name.toLowerCase().indexOf(search) > -1)
        );
    }

}
