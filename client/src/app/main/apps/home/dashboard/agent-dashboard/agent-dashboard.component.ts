import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrls: ['./agent-dashboard.component.scss']
})
export class AgentDashboardComponent implements OnInit {
  chart: am4charts.XYChart;
  chart2: am4charts.XYChart;
  columnDefs: any;
  gridData: any;
  initdata: any;
  gridApi;
  permissions;
  mainMessage;
  constructor() {
    this.permissions = { "slct_in": 1, "insrt_in": 0, "updt_in": 0, "dlte_in": 0, "exprt_in": 0 }
  }

  ngOnInit() {
    this.getGridData();

    this.chart = am4core.create("chartdiv", am4charts.XYChart);
    this.chart2 = am4core.create("chartdiv2", am4charts.XYChart);

    this.chart.data = [{
      "month": "January",
      "visits": 3025
    }, {
      "month": "February",
      "visits": 1882
    }, {
      "month": "March",
      "visits": 1809
    }, {
      "month": "April",
      "visits": 1809
    }, {
      "month": "May",
      "visits": 1809
    }, {
      "month": "June",
      "visits": 1809
    }, {
      "month": "July",
      "visits": 1809
    }, {
      "month": "August",
      "visits": 1809
    }, {
      "month": "September",
      "visits": 1809
    }, {
      "month": "October",
      "visits": 1809
    }, {
      "month": "November",
      "visits": 1809
    }, {
      "month": "December",
      "visits": 1809
    }];
    this.chart2.data = [
      {
        category: "Jan",
        value1: 1,
        value2: 5,
        value3: 3
      },
      {
        category: "Feb",
        value1: 2,
        value2: 5,
        value3: 3
      },
      {
        category: "Mar",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Apr",
        value1: 4,
        value2: 5,
        value3: 6
      },
      {
        category: "May",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Jun",
        value1: 2,
        value2: 13,
        value3: 1
      }
      ,
      {
        category: "Jul",
        value1: 2,
        value2: 5,
        value3: 3
      },
      {
        category: "Aug",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Sep",
        value1: 4,
        value2: 5,
        value3: 6
      },
      {
        category: "Oct",
        value1: 3,
        value2: 5,
        value3: 4
      },
      {
        category: "Nov",
        value1: 2,
        value2: 13,
        value3: 1
      },
      {
        category: "Dec",
        value1: 2,
        value2: 13,
        value3: 1
      }
    ];
    if (this.chart.data) {
      let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "month";
      let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      let series = this.chart.series.push(new am4charts.ColumnSeries());
      console.log(series)
      series.name = "Yearly Revenue";
      series.dataFields.categoryX = "month";
      series.dataFields.valueY = "visits";
      series.columns.template.tooltipText = "[bold]{name}[/][font-size:14px]{categoryX}: {valueX}";
    }
    if (this.chart2.data) {


      this.chart2.colors.step = 2;
      this.chart2.padding(30, 30, 10, 30);
      this.chart2.legend = new am4charts.Legend();

      let categoryAxis = this.chart2.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;

      let valueAxis = this.chart2.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      valueAxis.renderer.minWidth = 50;


      let series1 = this.chart2.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(60);
      series1.columns.template.tooltipText =
        "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
      series1.name = "Series 1";
      series1.dataFields.categoryX = "category";
      series1.dataFields.valueY = "value1";
      series1.dataFields.valueYShow = "totalPercent";
      series1.dataItems.template.locations.categoryX = 0.5;
      series1.stacked = true;
      series1.tooltip.pointerOrientation = "vertical";

      var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
      bullet1.interactionsEnabled = false;
      bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
      bullet1.label.fill = am4core.color("#ffffff");
      bullet1.locationY = 0.5;

      var series2 = this.chart2.series.push(new am4charts.ColumnSeries());
      series2.columns.template.width = am4core.percent(60);
      series2.columns.template.tooltipText =
        "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
      series2.name = "Series 2";
      series2.dataFields.categoryX = "category";
      series2.dataFields.valueY = "value2";
      series2.dataFields.valueYShow = "totalPercent";
      series2.dataItems.template.locations.categoryX = 0.5;
      series2.stacked = true;
      series2.tooltip.pointerOrientation = "vertical";

      var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
      bullet2.interactionsEnabled = false;
      bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
      bullet2.locationY = 0.5;
      bullet2.label.fill = am4core.color("#ffffff");

      var series3 = this.chart2.series.push(new am4charts.ColumnSeries());
      series3.columns.template.width = am4core.percent(60);
      series3.columns.template.tooltipText =
        "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
      series3.name = "Series 3";
      series3.dataFields.categoryX = "category";
      series3.dataFields.valueY = "value3";
      series3.dataFields.valueYShow = "totalPercent";
      series3.dataItems.template.locations.categoryX = 0.5;
      series3.stacked = true;
      series3.tooltip.pointerOrientation = "vertical";

      var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
      bullet3.interactionsEnabled = false;
      bullet3.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
      bullet3.locationY = 0.5;
      bullet3.label.fill = am4core.color("#ffffff");

      // this.chart2.scrollbarX = new am4core.Scrollbar();

    }

  }




  getGridData() {
    // this.crdsrv.get(this.formDetails.apis.sel_url).subscribe((res) => {
    //   if (res['status'] == 200) {
    let agents =
      [
        {
          sno: "1",
          mso_code: 2352532,
          mso_name: "",
          lmo_name: "",
          lmo_mobile_number: "",
          lmo_code: "",
          lmo_district: "",
          lmo_mandal: "",
          lmo_village: ""
        },
        {
          sno: "2",
          mso_code: "2352532",
          mso_name: "",
          lmo_name: "",
          lmo_mobile_number: "",
          lmo_code: "",
          lmo_district: "",
          lmo_mandal: "",
          lmo_village: ""
        },
        {
          sno: "3",
          mso_code: "2352532",
          mso_name: "",
          lmo_name: "",
          lmo_mobile_number: "",
          lmo_code: "",
          lmo_district: "",
          lmo_mandal: "",
          lmo_village: ""
        },
      ]

    this.gridData = agents;
    console.log(this.gridData);
    this.columnDefs = [
      { headerName: 'Sno', field: 'sno', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100, sortable: true, filter: false },
      { headerName: 'MSO Code', field: 'mso_code', cellStyle: { 'text-align': "center" }, cellClass: "pm-grid-number-cell", width: 100 },
      { headerName: 'MSO Name', field: 'mso_name', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
      { headerName: 'LMO Name', field: 'lmo_name', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
      { headerName: 'LMO Mobile Number', field: 'lmo_mobile_number', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
      { headerName: 'LMO Code', field: 'lmo_code', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
      { headerName: 'LMO District', field: 'lmo_district', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
      { headerName: 'LMO Mandal', field: 'lmo_mandal', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
      { headerName: 'LMO Village', field: 'lmo_village', cellStyle: { 'text-align': "left" }, cellClass: "pm-grid-number-cell", width: 265, sortable: true, filter: true },
    ];
  }
}
// }
