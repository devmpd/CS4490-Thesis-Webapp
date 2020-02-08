import {Component, EventEmitter, OnInit} from '@angular/core';
import { SensorService } from "../../services/sensor.service";
import {MatSelectChange} from "@angular/material/select";

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock'

StockModule(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'tomato'
    }
  },
  legend: {
    enabled: false
  }
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private buildings: [];
  private sensors: [];
  private sensorData;
  private selectedBuilding;
  private selectedSensor;
  private sidebarOpened =true;
  private Highcharts: typeof Highcharts = Highcharts;
  private chartOptions;

  constructor(private sensorService: SensorService) { }


  ngOnInit() {
    this.sensorService.getBuildings().subscribe((data) =>{
      console.log(data);
      this.buildings = data;
    });
    this.chartOptions = {
      title: { text: "test"},
      subtitle: {text: "test 2" },
      series: [{
        type: 'line',
        data: [11, 2, 3],
      }]
    };
  }

/*  ngAfterViewInit(): void{
    this.chart = new StockChart(this.chartOptions);
  }*/

/*  loadChart(data): any{
    this.chartOptions = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'AAPL Stock Price'
      },
      series: [{
        tooltip: {
          valueDecimals: 2
        },
        name: 'AAPL',
        data: data }]
    };
  }*/

  selectBuilding($event){
    this.sensorService.getSensorsByBuilding($event.value.id).subscribe((data) =>{
      console.log(data);
      this.sensors = data;
    });
  }

  selectSensor($event){
      this.sensorService.getAllSensorData($event.value.id).subscribe((data) =>{
        console.log(this.selectedSensor);
        console.log(data);
        this.sensorData = {"sensor1": data};
        console.log("Sensor");
        console.log(this.sensorData);
        this.sidebarOpened = true;
        this.updateChart();
      })
  }

  updateChart(): void {
    this.chartOptions.series[0].data = [10,14,2,3,4,1,5,6,1,18];
  }
}
