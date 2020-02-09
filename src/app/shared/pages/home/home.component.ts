import {Component, OnInit} from '@angular/core';
import { SensorService } from '../../services/sensor.service';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';

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
  private sidebarOpened = true;
  private Highcharts: typeof Highcharts = Highcharts;
  private chartOptions;
  private seriesData;

  constructor(private sensorService: SensorService) { }


  ngOnInit() {
    this.sensorService.getBuildings().subscribe((data) => {
      console.log(data);
      this.buildings = data;
    });
    this.chartOptions = {
      title: { text: 'test'},
      subtitle: {text: 'test 2' },
      series: [{
        type: 'line',
        tooltip: {
          valueDecimals: 2
        },
        data: []
      }],
      yAxis: {
        opposite: false,
        title: {}
      }
    };
  }

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
      this.seriesData = null;
      this.sensorData = null;
      this.sensors = data;
    });
  }

  selectSensor($event){
      this.sensorService.getAllSensorData($event.value.id).subscribe((data) => {
        this.sensorData = {sensor1: data};
        console.log(this.sensorData);
        this.seriesData = {sensor1: JSON.parse(data.data)};
        this.updateChart();
      });
  }

  updateChart(): void {
    this.chartOptions.series[0].data = this.seriesData.sensor1;
    this.chartOptions.yAxis.title = {};
    this.chartOptions.yAxis.title.text = this.sensorData.sensor1.sensorMeta.units;
  }
}
