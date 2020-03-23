import {Component, Inject, OnInit} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {SensorService} from '../../../services/sensor.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  public eventTitle = '';
  public eventDescription = '';
  public startDate: Date;
  public endDate: Date;
  public selectedBuilding;
  public buildings = [];
  public clusters = [];
  public selectedCluster;

  constructor(private dialogRef: MatDialogRef<AddEventComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private sensorService: SensorService) {
    this.buildings = data.buildings;
  }

  ngOnInit() {
    this.sensorService.getClusters().subscribe((data) => {
      this.clusters = data;
    });
  }

  save() {
    this.dialogRef.close(null);
  }

  close() {
    this.dialogRef.close();
  }
}
