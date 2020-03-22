import {Component, NgModule, OnInit} from '@angular/core';
import { SensorService } from '../../services/sensor.service';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import {MatDialog, MatDialogModule, MatDialogConfig} from '@angular/material';
import {AddSensorsComponent} from '../dialogs/add-sensors/add-sensors.component';
import {AddEventComponent} from '../dialogs/add-event/add-event.component';
import {AddMetadataComponent} from '../dialogs/add-metadata/add-metadata.component';

StockModule(Highcharts);

Highcharts.setOptions({
  title: {
    style: {
      color: 'black'
    }
  }
});

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@NgModule({
  declarations: [AddSensorsComponent, AddEventComponent, AddMetadataComponent],
  imports: [MatDialogModule],
  entryComponents: [AddSensorsComponent, AddEventComponent, AddMetadataComponent]
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
  updateFromInput = true;

  constructor(private sensorService: SensorService, public dialog: MatDialog) { }


  ngOnInit() {
    this.sensorService.getBuildings().subscribe((data) => {
      console.log(data);
      this.buildings = data;
    });
    this.chartOptions = {
      legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'middle',
        itemHoverStyle: {
          color: 'red',
        }
      },
      rangeSelector: {
        selected: 2
      },
      title: { text: 'Sensor Data'},
      series: [{
        showInLegend: true,
        type: 'line',
        name: '',
        tooltip: {
          valueDecimals: 2
        },
        data: []
      }],
      yAxis: {
        opposite: false,
        title: {}
      },
      xAxis: {
        plotBands: [{
          color: 'rgba(255,0,0,0.5)',
          from: 1561752000000,
          to: 1561870800000
        }]
      }
    };
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AddSensorsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.addSeries(data);
        }
      }
    );
  }

  addEventDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddEventComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.addEvent(data);
        }
      }
    );
  }

  addMetadataDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(AddMetadataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.addEvent(data);
        }
      }
    );
  }

  selectBuilding($event) {
    this.sensorService.getSensorsByBuilding($event.value.id).subscribe((data) => {
      this.seriesData = null;
      this.sensorData = null;
      this.sensors = data;
    });
  }

  selectSensor($event) {
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
    this.chartOptions.series[0].name = this.selectedSensor.name;
  }

  addSeries(data): void {
    this.chartOptions.series[1] = {
      data: JSON.parse(data.sensor1.data)
    };
    this.chartOptions.series[1].name = data.sensor1.sensor.name;
    this.updateFromInput = true;
  }

  addEvent(data): void {
    this.chartOptions.xAxis.plotBands[1] = {

    };
  }
}
