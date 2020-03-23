import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {SensorService} from '../../../services/sensor.service';

@Component({
  selector: 'app-add-sensors',
  templateUrl: './add-sensors.component.html',
  styleUrls: ['./add-sensors.component.scss']
})
export class AddSensorsComponent implements OnInit {
  private data = {};
  public buildings: [];
  public sensors: [];
  public sensorData;
  public selectedBuilding;
  public selectedSensor;

  constructor(private sensorService: SensorService, private dialogRef: MatDialogRef<AddSensorsComponent>) { }

  ngOnInit() {
    this.sensorService.getBuildings().subscribe((data) => {
      this.buildings = data;
    });
  }

  save() {
    this.dialogRef.close(this.sensorData);
  }

  close() {
    this.dialogRef.close();
  }

  selectBuilding($event) {
    this.sensorService.getSensorsByBuilding($event.value.id).subscribe((data) => {
      this.sensorData = null;
      this.sensors = data;
    });
  }

  selectSensor($event) {
    this.sensorService.getAllSensorData($event.value.id).subscribe((data) => {
      this.sensorData = {sensor1: data};
    });
  }
}
