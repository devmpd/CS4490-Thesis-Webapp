import {Component, NgModule, OnInit} from '@angular/core';
import { SensorService } from '../../services/sensor.service';

import * as Highcharts from 'highcharts';
import StockModule from 'highcharts/modules/stock';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import {AddSensorsComponent} from '../dialogs/add-sensors/add-sensors.component';
import {AddEventComponent} from '../dialogs/add-event/add-event.component';
import {AddMetadataComponent} from '../dialogs/add-metadata/add-metadata.component';
import { AdditionalMetadata } from '../../model/additional-metadata';
import {Event} from '../../model/event';

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

/*@NgModule({
  declarations: [AddSensorsComponent, AddEventComponent, AddMetadataComponent],
  imports: [MatDialogModule],
  entryComponents: [AddSensorsComponent, AddEventComponent, AddMetadataComponent]
})*/
export class HomeComponent implements OnInit {
  public buildings: [];
  public sensors: [];
  public sensorData;
  public additionalMetadata: AdditionalMetadata[] = [];
  public selectedBuilding;
  public selectedSensor;
  public sidebarOpened = true;
  public Highcharts: typeof Highcharts = Highcharts;
  public chartOptions;
  public seriesData;
  public updateFromInput = true;
  public events = [];
  public eventDetails = {};
  public eventData;

  plotBandEvents = {
    click(e) {
      const startDate = new Date(this.options.from);
      let endDate = null
      if (this.options.to && this.options.to !== this.options.from) {
        endDate = new Date(this.options.to);
      }
      this.options.that.eventData = {
        title: this.options.id,
        description: this.options.description,
        cluster: this.options.cluster,
        start: startDate,
        end: endDate
      };
    },

    mouseover(e) {
      document.body.style.cursor = 'pointer';
      const chart = this.axis.chart;
      const x = e.offsetX;
      if (chart.customLabel) {
        chart.customLabel.hide();
      }
      chart.customLabel = chart.renderer.label(this.id, x, 85, 'callout', chart.plotLeft, chart.plotTop, false)
        .css({
          color: 'white',
        })
        .attr({
          padding: 5,
          zIndex: 6,
          stroke: 'black',
          fill: 'rgba(0,0,0,0.6)',
          r: 5,
        }).add();
    },
    mouseout(e) {
      document.body.style.cursor = 'auto';
      const chart = this.axis.chart;
      if (chart.customLabel) {
        chart.customLabel.hide();
      }
    }
  };

  constructor(private sensorService: SensorService, public dialog: MatDialog) {
  }


  ngOnInit() {
    this.sensorService.getBuildings().subscribe((data) => {
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
      title: {text: 'Sensor Data'},
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
        /*        plotBands: [{
                  id: 'test',
                  color: 'rgba(255,0,0,0.5)',
                  from: 1561752000000,
                  to: 1561752000000,
                  events: this.plotBandEvents
                }]*/
        plotBands: this.events
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
    dialogConfig.data = {buildings: this.buildings};
    const dialogRef = this.dialog.open(AddEventComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        dialogRef.close();
        if (data) {
          this.saveEvent(data);
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
          this.saveMetadata(data);
        }
      }
    );
  }

  selectBuilding($event) {
    this.sensorService.getSensorsByBuilding($event.value.id).subscribe((data) => {
      this.seriesData = null;
      this.sensorData = null;
      this.additionalMetadata = [];
      this.events.length = 0;
      this.sensors = data;
    });
  }

  selectSensor($event) {
    this.sensorService.getAllSensorData($event.value.id).subscribe((data) => {
      this.additionalMetadata = [];
      this.events.length = 0;
      this.sensorData = {sensor1: data};
      this.seriesData = {sensor1: JSON.parse(data.data)};
      for (const item of data.additionalMetadata) {
        this.additionalMetadata.push(item);
      }
      for (const item of data.events) {
        this.addEvent(item);
      }
      this.updateChart();
      this.updateFromInput = true;
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

  saveMetadata(data): void {
    const addMetadata: AdditionalMetadata = {
      title: data.metaTitle,
      description: data.metaDescription,
      sensorId: this.sensorData.sensor1.sensorMeta._id
    };
    this.sensorService.saveAdditionalMetadata(addMetadata).subscribe((response) => {
      this.additionalMetadata.push(addMetadata);
    });
  }

  saveEvent(data): void {
    this.sensorService.saveEvent(data.eventData).subscribe((response) => {
      if (data.eventData.buildingId === this.selectedBuilding.id || data.eventData.buildingId === 'GLOBAL') {
        const start = new Date(data.eventData.startDate);
        let endtime: number;
        if (data.eventData.endDate) {
          const end = new Date(data.eventData.endDate);
          endtime = end.getTime();
        } else {
          endtime = start.getTime();
        }
        this.events.push({
          id: data.eventData.title,
          color: 'rgba(255,0,0,0.5)',
          from: start.getTime(),
          to: endtime,
          events: this.plotBandEvents,
          description: data.eventData.description,
          cluster: data.cluster,
          that: this
        });
        this.updateFromInput = true;
      }
    });
  }

  addEvent(data): void {
    const start = new Date(data.startDate);
    let endtime: number;
    if (data.endDate) {
      const end = new Date(data.endDate);
      endtime = end.getTime();
    } else {
      endtime = start.getTime();
    }
    this.events.push({
      id: data.title,
      color: 'rgba(255,0,0,0.5)',
      from: start.getTime(),
      to: endtime,
      events: this.plotBandEvents,
      description: data.description,
      cluster: data.cluster,
      that: this
    });
    this.updateFromInput = true;
  }

  selectEvent(data) {
    const startDate = new Date(data.from);
    let endDate = null
    if (data.to && data.to !== data.from) {
      endDate = new Date(data.to);
    }
    this.eventData = {
      title: data.id,
      description: data.description,
      cluster: data.cluster,
      start: startDate,
      end: endDate
    };
  }
}
