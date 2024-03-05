//  import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'app/main/apps/crud.service';
import { DsSidebarService } from '@glits/components/sidebar/sidebar.service';
import { AtomService } from 'app/main/services/atom.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from 'app/main/shared/components/delete-dialog/delete-dialog.component';
import { UserService } from 'app/providers/user/user.serivce';
import { switchMap, debounceTime, tap, map, finalize } from 'rxjs/operators';



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  data: any;
  map: any;
  markerIcon: any;
  markerIconTwo: any;
  markerIconThree:any;
  markerIconFour:any;
  markerIconFive:any;
  markerIconSix:any;
  markerIconSeven:any;
  distrctLst: any;
  districtID: any;
  mandalID:any;
  mandalLst: any;
  open: boolean = false;
  stsLsts: any;
  ctgryLsts: any;
  grpLsts: any;
  oltLst: any[];
  sidenav: boolean = true;
  tableView:boolean;
  groupID: any;
  categoryID: any;
  grps: any;
  ctgrys: any;
  inservicecount: any;
  blockedcount: any;
  plannedcount: any;
  Maintenancecount: any;
  viewI: boolean;
  viewB: boolean;
  viewP: boolean;
  viewM: boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  viewLst: any[];
  clDta:any;
  clckDta: any;
  dstrcts: number;
  typs: number;
  mndls:number;
  typLsts: any;
  typID: any;
  searchText = '';
  searchTextOne='';
  searchTextTwo='';
  searchTextThree=''
  pstLat: any;
  pstLng: any;
  columnDefs: { headerName: string; field: string; alignment: string; cellClass: string; width: number; sortable: boolean; filter: boolean; }[];

  /**
    * @param {DsSidebarService} _dsSidebarService
    */
  constructor(private fb: FormBuilder, private dsSidebarService: DsSidebarService, public crdsrv: CrudService, public atmSrv: AtomService, public snackBar: MatSnackBar, private userService: UserService) {

  }

  ngOnInit() {
    console.log(this.distrctLst);
    this.getdistrctLst()
    this.getmandalLst()
    this.grpLst();
    this.ctgryLst();
    this.stsLst();
    this.typLst();
    this.getOlts();
    this.grps = 0;
    this.ctgrys = 0;
    this.dstrcts = 0;
    this.typs = 0;
    this.mndls = 0;
    this.getinservice();
  }

  getdistrctLst() {
    let rte = 'agent/dstrctList'
    this.crdsrv.get(rte).subscribe((res) => {
      this.distrctLst = res['data']
      console.log(this.distrctLst)
    })
  }

  getmandalLst() {
    console.log(this.districtID);
    if(this.districtID == undefined){
      this.districtID=0;
    }
    console.log(this.districtID);
    let rte = `agent/mandalList/${this.districtID}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.mandalLst = res['data']
      console.log(this.mandalLst)
    })
  }

  grpLst() {
    let rte = 'maps/groups'
    this.crdsrv.get(rte).subscribe((res) => {
      this.grpLsts = res['data']
      console.log(this.grpLsts);
    })
  }
  getOlts() {
    let rte = 'maps/olts'
    this.crdsrv.get(rte).subscribe((res) => {
      this.oltLst = res['data'][0];
      console.log(res['data'][1])
      console.log(res['data'][1][0])
      console.log(res['data'][1][0].ct)
      this.inservicecount = res['data'][1][0].ct;
      this.blockedcount = res['data'][2][0].ct;
      this.plannedcount = res['data'][3][0].ct;
      this.Maintenancecount = res['data'][4][0].ct;
      console.log(this.oltLst);
      console.log(this.inservicecount);
      console.log(this.blockedcount);
      console.log(this.plannedcount);
      console.log(this.Maintenancecount);

      if (res['status'] == 200) {
        this.pointMap(1)
      }
    })
  }
  ctgryLst() {
    let rte = 'maps/category'
    this.crdsrv.get(rte).subscribe((res) => {
      this.ctgryLsts = res['data']
      console.log(this.ctgryLsts);
      console.log(this.ctgryLsts[0].icon)
    })
  }
  stsLst() {
    let rte = 'maps/status'
    this.crdsrv.get(rte).subscribe((res) => {
      this.stsLsts = res['data']
      console.log(this.stsLsts);
    })
  }

  typLst() {
    let rte = 'maps/type'
    this.crdsrv.get(rte).subscribe((res) => {
      this.typLsts = res['data']
      console.log(this.typLsts);
    })
  }

  private pointMap(id?): void {
    console.log(this.oltLst);
    console.log(id)
    var container = L.DomUtil.get('map');
    if(container != null){
    container._leaflet_id = null;
    }
    var map = L.map('map', {
      center: [45, -98],
      Zoom: 3,
      minZoom: 3,
      maxZoom: 7,
      ZoomControl: true
    })
    map.remove();
  //  map.getCenter();
  if(id==1){
    console.log("in if")
    map = L.map('map').setView([14.454210, 77.770284], 10);
    map.getCenter();
  }
  else{
    console.log("else")
    map = L.map('map').setView([this.oltLst[2].lat, this.oltLst[2].lng], 11);
  }
    // map.getCenter();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 10,

    }).addTo(map);



    ////////////////////////////MARKER11111/////////////////////////////////////

    this.markerIcon = {
      icon: L.icon({
        iconSize: [30, 30],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: `../../../../assets/icons/flags/${this.ctgryLsts[0].icon}`
      })
    };
    this.markerIconTwo = {
      icon: L.icon({
        iconSize: [30, 30],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: `../../../../assets/icons/flags/${this.ctgryLsts[1].icon}`,
      })
    };
    this.markerIconThree = {
      icon: L.icon({
        iconSize: [30, 30],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: `../../../../assets/icons/flags/${this.ctgryLsts[2].icon}`,
      })
    };
    this.markerIconFour = {
      icon: L.icon({
        iconSize: [30, 30],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: `../../../../assets/icons/flags/${this.ctgryLsts[3].icon}`,
      })
    };
    this.markerIconFive = {
      icon: L.icon({
        iconSize: [30, 30],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: `../../../../assets/icons/flags/${this.ctgryLsts[4].icon}`,
      })
    };
    this.markerIconSix = {
      icon: L.icon({
        iconSize: [30, 30],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: `../../../../assets/icons/flags/${this.ctgryLsts[5].icon}`,
      })
    };
    this.markerIconSeven = {
      icon: L.icon({
        iconSize: [30, 30],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: `../../../../assets/icons/flags/${this.ctgryLsts[5].icon}`,
      })
    };

    for (var i = 0; i < this.oltLst.length; i++) {
      const lat = this.oltLst[i].lat;
      const lon = this.oltLst[i].lng;
      // console.log(lat, lon);
      // console.log(this.oltLst[i].asrt_nm);
      if(this.oltLst[i].asrt_ctgry_id == 1){
        L.marker([lat, lon], this.markerIcon)
        .addTo(map).on('click', this.onClicktwo).bindPopup(this.oltLst[i].asrt_nm);
      }
      else if(this.oltLst[i].asrt_ctgry_id == 2){
        L.marker([lat, lon], this.markerIconTwo)
        .addTo(map).on('click', this.onClicktwo).bindPopup(this.oltLst[i].asrt_nm);
      }
      else if(this.oltLst[i].asrt_ctgry_id == 3){
        L.marker([lat, lon], this.markerIconThree)
        .addTo(map).on('click', this.onClicktwo).bindPopup(this.oltLst[i].asrt_nm);
      }
      else if(this.oltLst[i].asrt_ctgry_id == 4){
        L.marker([lat, lon], this.markerIconFour)
        .addTo(map).on('click', this.onClicktwo).bindPopup(this.oltLst[i].asrt_nm);
      }
      else if(this.oltLst[i].asrt_ctgry_id == 5){
        L.marker([lat, lon], this.markerIconFive)
        .addTo(map).on('click', this.onClicktwo).bindPopup(this.oltLst[i].asrt_nm);
      }
      else if(this.oltLst[i].asrt_ctgry_id == 6){
        L.marker([lat, lon], this.markerIconSix)
        .addTo(map).on('click', this.onClicktwo).bindPopup(this.oltLst[i].asrt_nm);
      }
      else if(this.oltLst[i].asrt_ctgry_id == 7){
        L.marker([lat, lon], this.markerIconSeven)
        .addTo(map).on('click', this.onClicktwo).bindPopup(this.oltLst[i].asrt_nm);
      }
     
    }
  }





  onClicktwo = (e) => {
    this.tableView = false;
    console.log(e);
    console.log(e.latlng);
    console.log(e.latlng.lat);
    console.log(e.latlng.lng);
    this.pstLat=e.latlng.lat?e.latlng.lat:0
    this.pstLng=e.latlng.lng?e.latlng.lng:0
    console.log(this.pstLat);
    console.log(this.pstLng);
    let rte = `maps/olts/latlngs/${this.pstLat}/${this.pstLng}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.clckDta = res['data']
      console.log(this.clckDta);
      if (res['status'] == 200) {
        this.tableView = true;
        this.columnDefs = [
          { headerName: 'Sno', field: 's_no', alignment: "center", cellClass: "pm-grid-number-cell", width: 50, sortable: true, filter: false },
          { headerName: 'OLT', field: 'asrt_nm', alignment: "center", cellClass: "pm-grid-number-cell", width: 200, sortable: true, filter: false },
          { headerName: 'OLT Serial No', field: 'asrt_srl_nu', alignment: "center", cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: false},
          { headerName: 'OLT Category', field: 'asrt_ctgry_nm', alignment: "center", cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: false},
          { headerName: 'OLT Type', field: 'asrt_type_nm', alignment: "center", cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false},
          { headerName: 'OLT Group', field: 'asrt_grp_nm', alignment: "center", cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false},
          { headerName: 'Substation', field: 'sbstn_nm', alignment: "center", cellClass: "pm-grid-number-cell", width: 190, sortable: true, filter: false},
          { headerName: 'District', field: 'dstrt_nm', alignment: "center", cellClass: "pm-grid-number-cell", width: 130, sortable: true, filter: false},
          { headerName: 'OLT Status', field: 'asrt_sts_nm', alignment: "center", cellClass: "pm-grid-number-cell", width: 120, sortable: true, filter: false},
        ]
        this.openSideBar();
      }
    })
    // for(var t=0; t<this.oltLst.length; t++){
    //  if(this.oltLst[t].lat == e.latlng.lat && this.oltLst[t].lng == e.latlng.lng){
    //    this.clckDta =this.oltLst[t]
    //  }
    // }
    
  }
  openSideBar = function () {
    console.log("sidebar");
    this.sidenav = false;
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }
  closeSideBar() {
    this.sidenav = true;
    this.dsSidebarService.getSidebar('addFormPanel').toggleOpen();
  }

  clsSdNav(){
    this.sidenav = false;
  }
 

  slctddstrcts(dstrct){
    this.oltLst = [];
    this.districtID = dstrct.dstrt_id;
    this.districtID = this.districtID ? this.districtID : 0;
    this.groupID = this.groupID ? this.groupID : 0;
    this.categoryID = this.categoryID ? this.categoryID : 0;
    this.typID = this.typID ? this.typID : 0;
    this.mandalID = this.mandalID ? this.mandalID : 0;
    let rte = `maps/olts/${this.groupID}/${this.categoryID}/${this.districtID}/${this.typID}/${this.mandalID}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.oltLst = res['data']
      console.log(this.oltLst);
      
      if (this.oltLst.length > 0) {
        this.pointMap()
      }
      else{
        console.log("in else")
        this.snackBar.open("NO DATA FOUND ", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }

  slctdmndl(mndl){
    this.oltLst = [];
    this.mandalID = mndl.mndl_nu;
    this.districtID = this.districtID ? this.districtID : 0;
    this.mandalID = this.mandalID ? this.mandalID : 0;
    this.groupID = this.groupID ? this.groupID : 0;
    this.categoryID = this.categoryID ? this.categoryID : 0;
    this.typID = this.typID ? this.typID : 0;
    let rte = `maps/olts/${this.groupID}/${this.categoryID}/${this.districtID}/${this.typID}/${this.mandalID}`
    console.log(rte)
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.oltLst = res['data']
      console.log(this.oltLst);
      if (this.oltLst.length > 0) {
        this.pointMap()
      }
      else{
        console.log("in else")
        this.snackBar.open("NO DATA FOUND ", '', {
          duration: 2000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    })
  }

  slctdtyp(typ){
    this.oltLst = [];
    this.typID = typ.asrt_type_id;
    this.typID = this.typID ? this.typID : 0;
    this.districtID = this.districtID ? this.districtID : 0;
    this.groupID = this.groupID ? this.groupID : 0;
    this.categoryID = this.categoryID ? this.categoryID : 0;
    this.mandalID = this.mandalID ? this.mandalID : 0;
    let rte = `maps/olts/${this.groupID}/${this.categoryID}/${this.districtID}/${this.typID}/${this.mandalID}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.oltLst = res['data']
      console.log(this.oltLst);
      if (this.oltLst.length > 0) {
        this.pointMap()
      }
    })
  }

  slctdgrp(grp) {
    this.oltLst = [];
    this.groupID = grp.asrt_grp_id;
    this.groupID = this.groupID ? this.groupID : 0;
    this.categoryID = this.categoryID ? this.categoryID : 0;
    this.districtID = this.districtID ? this.districtID : 0;
    this.typID = this.typID ? this.typID : 0;
    this.mandalID = this.mandalID ? this.mandalID : 0;
    console.log(this.groupID);
    console.log(this.categoryID);
    let rte = `maps/olts/${this.groupID}/${this.categoryID}/${this.districtID}/${this.typID}/${this.mandalID}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.oltLst = res['data']
      console.log(this.oltLst);
      if (this.oltLst.length > 0) {
        this.pointMap()
      }
    })
  }
  slctdCtgry(ctgry) {
    this.oltLst = [];
    this.categoryID = ctgry.asrt_ctgry_id;
    this.groupID = this.groupID ? this.groupID : 0;
    this.categoryID = this.categoryID ? this.categoryID : 0;
    this.districtID = this.districtID ? this.districtID : 0;
    this.typID = this.typID ? this.typID : 0;
    this.mandalID = this.mandalID ? this.mandalID : 0;
    console.log(this.groupID);
    console.log(this.categoryID);
    let rte = `maps/olts/${this.groupID}/${this.categoryID}/${this.districtID}/${this.typID}/${this.mandalID}`
    this.crdsrv.get(rte).subscribe((res) => {
      console.log(res['data']);
      this.oltLst = res['data']
      console.log(this.oltLst);
      if (this.oltLst.length > 0) {
        this.pointMap()
      }
    })
  }
  tabChangeFn(event): void {
    console.log(event.index);
    if (event.index === 0) {
     this.getinservice();
    } else if (event.index === 1) {
      this.getblocked()
    }else if (event.index === 2) {
      this.getplanned()
    }else if (event.index === 3) {
      this.getMaintenance()
    }
  }
  getinservice() {
    this.viewLst = [];
    // this.view = false;
    var value = 1;
    let rte = `maps/olts/${value}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.viewLst = res['data']
      console.log(this.viewLst);
      if (res['status'] == 200) {
        if(this.viewLst.length >0){
          this.viewI = true;
        }
        else{
          this.viewI = false;
        }
      }
    })

  }
  getblocked() {
    this.viewLst = [];
    // this.view = false;
    var value = 2;
    let rte = `maps/olts/${value}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.viewLst = res['data']
      console.log(this.viewLst);
      if (res['status'] == 200) {
        if(this.viewLst.length >0){
          this.viewB = true;
        }
        else{
          this.viewB = false;
        }
      }
    })

  }
  getplanned() {
    this.viewLst = [];
    // this.view = false;
    var value = 3;
    let rte = `maps/olts/${value}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.viewLst = res['data']
      console.log(this.viewLst);
      if (res['status'] == 200) {
        if(this.viewLst.length >0){
          this.viewP = true;
        }
        else{
          this.viewP = false;
        }
      }
    })

  }
  getMaintenance() {
    this.viewLst = [];
    // this.view = true;
    var value = 4;
    console.log("maintenance")
    let rte = `maps/olts/${value}`
    this.crdsrv.get(rte).subscribe((res) => {
      this.viewLst = res['data']
      console.log(this.viewLst);
      if (res['status'] == 200) {
        if(this.viewLst.length >0){
          this.viewM = true;
        }
        else{
          this.viewM = false;
        }
      }
    })
  }






  ///////////////////////////////////////////////////////////////////////////////////////////////////////////

  // private initMap(): void {
  //   console.log(this.data);
  //   if (this.map) {
  //     if (this.data) {
  //       console.log("hiiiiii")
  //       this.map.remove();
  //       this.map = L.map('map').setView([this.data.lat, this.data.lng], 13);
  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //         maxZoom: 15,

  //       }).addTo(this.map);

  //       this.markerIcon = {
  //         icon: L.icon({
  //           iconSize: [25, 41],
  //           iconAnchor: [10, 41],
  //           popupAnchor: [2, -40],
  //           // specify the path here
  //           iconUrl: "http://leafletjs.com/examples/custom-icons/leaf-green.png",
  //           shadowUrl: "http://leafletjs.com/examples/custom-icons/leaf-shadow.png"
  //         })
  //       };
  //       L.marker([this.data.lat, this.data.lng], this.markerIcon)
  //         .addTo(this.map).on('click', this.onClicktwo).bindPopup("hello");
  //     }
  //     else {
  //       this.map.remove();
  //       this.map = L.map('map').setView([16.8073, 81.5316], 13);
  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //         maxZoom: 10,

  //       }).addTo(this.map);
  //       var circle = L.circle([16.8073, 81.5316], {
  //         radius: 150,
  //       }).addTo(this.map)
  //     }

  //   }
  //   else {
  //     if (this.data) {
  //       this.map = L.map('map').setView([this.data.lat, this.data.lng], 13);
  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //         maxZoom: 15,

  //       }).addTo(this.map);
  //       var circle = L.circle([this.data.lat, this.data.lng], {
  //         radius: 150,
  //       }).addTo(this.map)
  //     }
  //     else {
  //       console.log("common Else");

  // //////////////////////Polylines////////////////////////////////////

  //      var map = L.map('map',{
  //         center:[45,-98],
  //         Zoom: 3,
  //         minZoom: 3,
  //         maxZoom: 7,
  //         ZoomControl:true
  //       })
  //        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //         maxZoom: 10,

  //       }).addTo(map);

  //       // var latlngs = [[37, -109.05],[41, -109.03]];
  //       var latlngs = [[17.3213,82.0407],[16.9174,81.3399]]
  //       var polygon = L.polygon(latlngs, {color: 'red'}).addTo(map);
  //       map.fitBounds(polygon.getBounds());


  //       //////////////////////CIRCLE/////////////////////////////////////
  //       let latlnging = [{
  //         "lat": 17.3213,
  //         "lng": 82.0407,
  //         "name": "vijawada"
  //       }, {
  //         "lat": 16.9174,
  //         "lng": 81.3399,
  //         "name": "NELLORE",
  //       },]
  //       for (var i = 0; i < latlnging.length; i++) {
  //         const lat = latlnging[i].lat;
  //         const lon = latlnging[i].lng;
  //         console.log(lat, lon);
  //         var circle = L.circle([lat, lon], {
  //         radius: 250,
  //       }).addTo(map)
  //       }


  //       ////////////////////////////MARKER11111/////////////////////////////////////
  //       let latlng = [{
  //         "lat": 16.5062,
  //         "lng": 80.6480,
  //         "name": "vijawada"
  //       }, {
  //         "lat": 14.2581,
  //         "lng": 79.9193,
  //         "name": "NELLORE",
  //       },]
  //       this.markerIcon = {
  //         icon: L.icon({
  //           iconSize: [30, 30],
  //           iconAnchor: [10, 41],
  //           popupAnchor: [2, -40],
  //           // specify the path here
  //           iconUrl: "../../../../assets/icons/flags/marker.png",
  //           // shadowUrl: "../../../../assets/icons/flags/marker.png"
  //         })
  //       };
  //       for (var i = 0; i < latlng.length; i++) {
  //         const lat = latlng[i].lat;
  //         const lon = latlng[i].lng;
  //         console.log(lat, lon);
  //         L.marker([lat, lon], this.markerIcon)
  //           .addTo(map).on('click', this.onClicktwo).bindPopup("OLT");
  //       }
  //        ////////////////////////////MARKER22222/////////////////////////////////////
  //        let latlngtwo = [{
  //         "lat": 19.0760,
  //         "lng": 72.8777,
  //         "name": "Mumbai"
  //       },  {
  //         "lat": 17.6868,
  //         "lng": 83.2185,
  //         "name": "visakaphanam"
  //       },]
  //       this.markerIcon = {
  //         icon: L.icon({
  //           iconSize: [33, 33],
  //           iconAnchor: [10, 41],
  //           popupAnchor: [2, -40],
  //           // specify the path here
  //           iconUrl: "../../../../assets/icons/flags/wifi.png",
  //           // shadowUrl: "../../../../assets/icons/flags/marker.png"
  //         })
  //       };
  //       for (var i = 0; i < latlngtwo.length; i++) {
  //         const lat = latlngtwo[i].lat;
  //         const lon = latlngtwo[i].lng;
  //         console.log(lat, lon);
  //         L.marker([lat, lon], this.markerIcon)
  //           .addTo(map).on('click', this.onClicktwo).bindPopup("Substations");
  //       }
  //     }
  //   }
  // }

  // private lfmaps(): void {
  //   let latlng = [{
  //     "lat": 16.5062,
  //     "lng": 80.6480,
  //     "name": "vijawada"
  //   }, {
  //     "lat": 14.2581,
  //     "lng": 79.9193,
  //     "name": "NELLORE",
  //   },]

  //   console.log("hiiiiii")
  //   this.map.remove();
  //   this.map = L.map('map').setView([16.8073, 81.5316], 13);
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     maxZoom: 15,

  //   }).addTo(this.map);

  //   this.markerIcon = {
  //     icon: L.icon({
  //       iconSize: [25, 41],
  //       iconAnchor: [10, 41],
  //       popupAnchor: [2, -40],
  //       // specify the path here
  //       iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  //       shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
  //     })
  //   };
  //   for (var i = 0; i < latlng.length; i++) {
  //     const lat = latlng[i].lat;
  //     const lon = latlng[i].lng;
  //     console.log(lat, lon);
  //     L.marker([lat, lon], this.markerIcon)
  //       .addTo(this.map).on('click', this.onClicktwo).bindPopup("hello");
  //   }

  // }




}