import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../crud.service';
import { Router } from '@angular/router';
import { TransfereService } from 'app/providers/transfer/transfer.service';
import html2pdf from 'html2pdf.js';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-ill-caf-packages',
  templateUrl: './ill-caf-packages.component.html',
  styleUrls: ['./ill-caf-packages.component.scss']
})
export class IllCafPackagesComponent implements OnInit {
  getHeaderDtls = function (): any { return { 'title': 'ILL Packages', 'icon': 'people_outline' }; };
  loader = false;
  carddt
  entfrmData: any;
  illpckgeDtls: any;
  permissions;
  columnDefs;
  pdfBindDat=[{cntct_nm:"",cntct_mble1_nu:"",loc_eml1_tx:"",cntct_prsn_nm:"",cntct_prsn_phne_num:"",cntct_prsn_eml:""}];
  gst: string;
  msoshre: string;
  apsflshre: string;
  lmoshre;
  price: string;
  LmoMbl: string[];
  LmoNm: string[];
  LmoCd: string[];
  BilPrdct: string[];
  CntrcyPd: string[];
  FeeMdl: string[];
  IntPrtSpd: string[];
  NumOfCon: string[];
  PrdctSlc: string;
  ProofOfBil: string;
  BilCntryNm: string[];
  BilStNm: string[];
  BilPnCd: string[];
  BilCtyNm;
  BilAddLn2: string[];
  BilAddLn1;
  BlnAcNum: string[];
  GstNum: string[];
  SoCntryNm: string[];
  SoStNm: string[];
  SoPnCd: string[];
  SoCtyNm;
  SrvdOrdAddLn2: string[];
  SrvdOrdAddLn1;
  ProofOfId;
  PanrGir: string[];
  PhnNum: string[];
  StdCd: string[];
  ItmLst1: string[];
  ItmLst;
  cnctprdtyp;
  sameblng;
  ipaddrss;
  selectedFile: ImageSnippet;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  one_tme_chrge_at;
  one_tme_apsfl_chrge_at;
  one_tme_lmo_chrge_at;
  selectedservice;
  selectedPlan;
  constructor(public crdSrvc: CrudService, private route: Router, public TransfereService: TransfereService, private snackBar: MatSnackBar) { 
    this.permissions = { "slct_in": 1, "insrt_in": 1, "updt_in": 1, "dlte_in": 1, "exprt_in": 1 };
    this.ItmLst = ['s', 'r', 'a', 'v', 'a', 'n', 'i', '', 'm', 'a', 'c', 'h', 'i', 'n', 'a', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    this.ItmLst1 = [' ', ' ', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '', '', '', ' ', ' ', '', '', ''];
    this.StdCd = ['', '', '', '', ''];
    this.PhnNum = ['', '', '', '', '', '', '', '', '', ''];
    this.PanrGir = ['', '', '', '', '', '', '', '', '', ''];
    this.ProofOfId = "";
    this.SrvdOrdAddLn1 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.SrvdOrdAddLn2 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.SoCtyNm = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.SoPnCd = ['', '', '', '', '', ''];
    this.SoStNm = ['A', 'N', 'D', 'H', 'R', 'A', ' ', 'P', 'R', 'A', 'D', 'E', 'S', 'H']
    this.SoCntryNm = ['I', 'N', 'D', 'I', 'A'];
    this.GstNum = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BlnAcNum = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BilAddLn1 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BilAddLn2 = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BilCtyNm = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.BilPnCd = ['', '', '', '', '', ''];
    this.BilStNm = ['A', 'N', 'D', 'H', 'R', 'A', ' ', 'P', 'R', 'A', 'D', 'E', 'S', 'H']
    this.BilCntryNm = ['I', 'N', 'D', 'I', 'A'];
    this.ProofOfBil = "";
    this.PrdctSlc = "";
    this.NumOfCon = ['', ''];
    this.IntPrtSpd = ['', '', '', '', ''];
    this.FeeMdl = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.CntrcyPd = ['', ''];
    this.BilPrdct = ['', '', '', '', '', '', '', '', '', '', '', ''];
    this.LmoCd = ['', '', '', '', '', '', '', '', '', ''];
    this.LmoNm = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    this.LmoMbl = ['', '', '', '', '', '', '', '', '', ''];
    this.price = "";
    this.apsflshre = "";
    this.lmoshre = "";
    this.msoshre = "";
    this.gst = "";
    this.one_tme_chrge_at = "";
    this.one_tme_apsfl_chrge_at = "";
    this.one_tme_lmo_chrge_at = "";
    this.selectedservice = ['','','','','','','',''];
    this.selectedPlan = ['','','','']

  }

  ngOnInit() {
    this.entfrmData = this.TransfereService.getLoclData('cafData')
    console.log(this.entfrmData)
    this.getpackages();
  }
  getpackages() {
    let rte = `caf/iilCaf/package/${this.entfrmData.cstmr_id}`;
    this.loader = true;
    this.crdSrvc.get(rte).subscribe((res) => {
      this.loader = false;
      for (let i = 0; i < res['data'].length; i++) {
        res['data'][i]['sno'] = i + 1;
      }
      this.illpckgeDtls = res['data']
      console.log(this.illpckgeDtls);
      this.columnDefs = [
        { headerName: 'Sno', field: 'sno', algnmnt: 'center', cellClass: 'pm-grid-number-cell', width: 50, filter: false, search: false, columnFiltering: false },
        { headerName: 'Customer Id', field: 'cstmr_id', algnmnt: 'center',  cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },
        { headerName: 'Package Name', field: 'ill_pckge_nm', algnmnt: 'left',  cellClass: 'pm-grid-number-cell', width: 250, filter: true, columnFiltering: false }, 
        { headerName: 'Package Charge', field: 'chrge_at', format: true, type: 'currency', currency: 'INR', precision: '2',algnmnt: 'right', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },  
        { headerName: 'GST Amount', field: 'gst_at', format: true, type: 'currency', currency: 'INR', precision: '2', algnmnt: 'right', cellClass: 'pm-grid-number-cell', width: 100, filter: true, columnFiltering: false },  
        // { headerName: 'APSFL Amount', field: 'apsfl_shre_at', format: true, type: 'currency', currency: 'INR', precision: '2', algnmnt: 'right', cellClass: 'pm-grid-number-cell', width: 150, filter: true, columnFiltering: false },  
        // { headerName: 'LMO Amount', field: 'lmo_shre_at', format: true, type: 'currency', currency: 'INR', precision: '2', algnmnt: 'right',  cellClass: 'pm-grid-number-cell', width: 100, filter: true, columnFiltering: false },  
        // { headerName: 'MSO Amount', field: 'mso_shre_at', format: true, type: 'currency', currency: 'INR', precision: '2', algnmnt: 'right',  cellClass: 'pm-grid-number-cell', width: 100, filter: true, columnFiltering: false },  
        { headerName: 'Total Amount', field: 'total', format: true, type: 'currency', currency: 'INR', precision: '2', algnmnt: 'right', cellClass: 'pm-grid-number-cell', width: 100, filter: true, columnFiltering: false },  
        { headerName: 'Status', field: 'ill_sts_nm', format: true, type: 'currency', currency: 'INR', precision: '2', algnmnt: 'left',  cellClass: 'pm-grid-number-cell', width: 80, filter: true, columnFiltering: false },  

      ]
    })
  }
  onCellClick(e){
    console.log(e)
  }
  onCellPrepared(){

  }
  onToolbarPreparing(e) {
    // console.log(e);
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'plus',
        text: 'Add New Package',
        onClick: this.addpckge.bind(this),
        // this.onCellClick( this.selectedUsers),
        bindingOptions: {
          'disabled': 'isEmailButtonDisabled'
        }
      }
    });
  }
 
  downloadAgremnt(e){
    console.log("download");
    console.log(e);
    this.loader = true;
    let rte = `caf/getCstmrData/${e.key.cstmr_id}/${e.key.ill_pckge_id}`;
    this.crdSrvc.get(rte).subscribe((res) => {
  console.log(res);
  if(res['status']==200)
  {
  this.pdfBindDat = res['data']
      if(res['data'][0].cstmr_nm.length<33){
        this.ItmLst=res['data'][0].cstmr_nm.split("");
        if(res['data'][0].cstmr_nm.length<32){
          this.ItmLst[31]="";
        }
      }else{
        this.ItmLst=res['data'][0].cstmr_nm.split("").slice(0,33);
        this.ItmLst1=res['data'][0].cstmr_nm.split("").slice(33,res['data'][0].cstmr_nm.length);
        if(res['data'][0].cstmr_nm.length<64){
          this.ItmLst1[31]="";
        }
      }
      this.PhnNum=res['data'][0].cntct_mble1_nu.split("");
      if(res['data'][0].pan_nu){
        this.PanrGir=res['data'][0].pan_nu.split("");
      }
      let soAd=`${res['data'][0].loc_ara_tx} D-No:${res['data'][0].loc_addr1_tx} ${res['data'][0].loc_lcly_tx} ${res['data'][0].mndl_nm} ${res['data'][0].dstrt_nm}`;
      if(soAd.length<34){
        this.SrvdOrdAddLn1=soAd.split("");
        if(soAd.length<33){
          this.SrvdOrdAddLn1[32]="";
        }
      }else{
        this.SrvdOrdAddLn1=soAd.split("").slice(0,33);
        this.SrvdOrdAddLn2=soAd.split("").slice(33,soAd.length);
        if(soAd.length<66){
          this.SrvdOrdAddLn2[32]="";
        }else{
          this.SrvdOrdAddLn2.splice(33,soAd.length-32);
        }
      }
      if(res['data'][0].vlge_nm.length<20){
        this.SoCtyNm=res['data'][0].vlge_nm.split("");
        this.SoCtyNm[19]="";
      }else{
        this.SoCtyNm=res['data'][0].vlge_nm.split("").slice(0,20);
      }
      if(res['data'][0].lcl_pn_cd){
        this.SoPnCd=res['data'][0].lcl_pn_cd.toString().split("");
      }
      if(res['data'][0].gst_nu){
        this.GstNum=res['data'][0].gst_nu.split("");
      }
      let bilAd=`${res['data'][0].blng_ara_tx} D-No-${res['data'][0].blng_addr1_tx} ${res['data'][0].blng_lcly_tx} ${res['data'][0].blng_mndl_nm} ${res['data'][0].blng_dstrt_nm}`;
      if(bilAd.length<34){
        this.BilAddLn1=bilAd.split("");
        if(bilAd.length<33){
          this.BilAddLn1[32]="";
        }
      }else{
        this.BilAddLn1=bilAd.split("").slice(0,33);
        this.BilAddLn2=bilAd.split("").slice(33,bilAd.length);
        if(bilAd.length<66){
          this.BilAddLn2[32]="";
        }else{
          this.BilAddLn2.splice(33,soAd.length-32);
        }
      }
      if(res['data'][0].blng_vlge_nm.length<20){
        this.BilCtyNm=res['data'][0].blng_vlge_nm.split("");
        this.BilCtyNm[19]="";
      }else{
        this.BilCtyNm=res['data'][0].blng_vlge_nm.split("").slice(0,21);
      }
      this.BilPnCd =res['data'][0].blng_pn_cd.split("");
      if(res['data'][0].sm_as_blng_addrs_in){
        this.sameblng = res['data'][0].sm_as_blng_addrs_in.toString();
      }
      this.PrdctSlc = res['data'][0].ill_pckge_nm;
      this.NumOfCon=res['data'][0].num_cnts.toString().split("");
      this.FeeMdl =res['data'][0].frqncy_nm.split("");
      this.CntrcyPd=res['data'][0].cntrct_prd_num.toString().split("");
      this.CntrcyPd=res['data'][0].cntrct_prd_num.toString().split("");
      this.cnctprdtyp = res['data'][0].cntrct_prd_typ.toString();
      this.LmoNm = res['data'][0].agnt_nm.split("");
      this.price = res['data'][0].chrge_at;
      this.apsflshre=res['data'][0].chrge_at + res['data'][0].gst_at;
      this.lmoshre=res['data'][0].lmo_shre_at;
      // this.msoshre=res['data'][0].mso_shre_at;
      this.gst=res['data'][0].gst_at;
      this.one_tme_lmo_chrge_at=res['data'][0].one_tme_lmo_chrge_at;
      this.one_tme_apsfl_chrge_at=res['data'][0].one_tme_apsfl_chrge_at;
      this.one_tme_chrge_at=res['data'][0].one_tme_chrge_at;
      this.selectedservice= res['data'][0].cre_srvc_nm.split("");
      this.selectedPlan= res['data'][0].pckge_pln_nm.split("");
      if(res['data'][0].agnt_cd){
        this.LmoCd = res['data'][0].agnt_cd.split("");
      }
      if(res['data'][0].ofce_mbl_nu){
      this.LmoMbl = res['data'][0].ofce_mbl_nu.split("");
      }
      if(res['data'][0].attchmnts[0].prf_atchmnt_idnty==1 ){
          this.ProofOfId = res['data'][0].attchmnts[0].prf_typ_nm
      }
      else{
          this.ProofOfBil = res['data'][0].attchmnts[0].prf_typ_nm
      }
    if(res['data'][0].attchmnts[1].prf_atchmnt_idnty==1 ){
        this.ProofOfId = res['data'][0].attchmnts[1].prf_typ_nm
    }
    else{
        this.ProofOfBil = res['data'][0].attchmnts[1].prf_typ_nm
    }
     console.log(this.sameblng)
     document.getElementById("contentToConvert").style.display = "block";
     var data = document.getElementById('contentToConvert');
     console.log(data)
     document.getElementById("full").style.display = "none";
    //  html2pdf(data);
     var opt = {
  margin:       1,
  filename:     'myfile.pdf',
  image:        { type: 'jpeg', quality: 0.80 },
  html2canvas:  { scale: 1 },
  jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
};

// New Promise-based usage:
html2pdf().set(opt).from(data).save();
this.loader = false;

  }
  else{
    this.loader = false;
    this.snackBar.open("Something went worng", '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

// Old monolithic-style usage:
// html2pdf(data, opt);
    //  html2pdf(data, {
    //    margin: 1,
    //    filename: 'myfile.pdf',
    //    width: '100vh',
    //    height: '100vh',
    //    image: { type: 'png', quality: 1 },
    //    html2canvas: { scale: 3, letterRendering: true, useCORS: true },
    //    jsPDF: { orientation: 'portrait', unit: 'mm', format: [297,310], pagesplit: true },
    //    pdfCallback: this.pdfCallback
    //  })
});

  }
  pdfCallback(pdfObject) {
    var number_of_pages = pdfObject.internal.getNumberOfPages()
    var pdf_pages = pdfObject.internal.pages
    var myFooter = "Footer info"
    for (var i = 1; i < pdf_pages.length; i++) {
        // We are telling our pdfObject that we are now working on this page
        pdfObject.setPage(i)
        // The 10,200 value is only for A4 landscape. You need to define your own for other page sizes
        pdfObject.text(myFooter, 10, 200)
    }
}
  addpckge(data) {
    console.log(data);
    this.TransfereService.setLoclData('data',{cstmrId: this.entfrmData.cstmr_id})
    this.route.navigate([`/admin/ILL/caf/newIllEntprse`]);
  }
  uploadClick=(e)=>{
    console.log(e.target.value);
    e.target.value='';
  }
  processFile(data,imageInput){
    console.log(`${imageInput.target.files[0].size/1024}kb` );
    const file: File = imageInput.target.files[0];
    const reader = new FileReader();
    let fletype;
    if(imageInput.target.files[0].size>307200){
      // alert(`uploaded file size is ${(imageInput.target.files[0].size/1024).toFixed(2)} kb, please reduce the file size to less than 300kb then upload`);
      this.snackBar.open(`uploaded file size is ${(imageInput.target.files[0].size/1024).toFixed(2)} kb, please reduce the file size to less than 300kb then upload`, '', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
            });
    }else{
    reader.addEventListener('load', (event: any) => {
      console.log("sravani")
      this.selectedFile = new ImageSnippet(event.target.result, file);
      console.log(this.selectedFile)
      if (this.selectedFile.file.type == "application/pdf") {
        fletype = "pdf"
      }
      else{
        fletype = "image"
      }
      let pstdata = [{
        prf_idnty_url:this.selectedFile.src,
        cstmr_id:data.key.cstmr_id,
        ill_pckge_id:data.key.ill_pckge_id,
        cstInfoFileTyp:fletype
      }]
      console.log(pstdata)
      let rte = "caf/uploadPckgeAgreemnt";
      this.loader = false;
      this.crdSrvc.create(pstdata,rte).subscribe((res) => {
        console.log(res)
        if(res['status']==200){
          this.loader = false;
          this.snackBar.open("Sucessflly uploded", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.getpackages();
        }
        else{
          this.snackBar.open("Something went worng", '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }

      })

    });

    reader.readAsDataURL(file);
    }
  }
  downloadUplodedAgremnt(){
    console.log("downloadUplodedAgremnt")
  }
  addcaf(data) {
    let entfrmDta = []
    entfrmDta.push({
      "entfrmData":this.entfrmData,
      "ill_pckge_id": data.key.ill_pckge_id,
      "chrge_at": data.key.chrge_at,
      "gst_at": data.key.gst_at,
      "ill_pckge_nm": data.key.ill_pckge_nm,
      "total": data.key.total,
      "cre_srvc_id":data.key.cre_srvc_id
    })
    console.log(entfrmDta)
    let frm_actn = 'entnew'
    this.TransfereService.setData(frm_actn)
    this.TransfereService.setLoclData('entcafData', entfrmDta)

    this.route.navigate([`/admin/ILL/caf/form`])

  }

}
