import {Component, Inject, OnInit} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {SensorService} from '../../../services/sensor.service';
import {Event} from '../../../model/event';

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
  public selectedCluster = null;
  public isGlobal = false;
  public errorMessage = '';

  constructor(private dialogRef: MatDialogRef<AddEventComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private sensorService: SensorService) {
    this.buildings = data.buildings;
  }

  ngOnInit() {
  }

  save() {
    if (!this.validateTimes()) {
      this.errorMessage = 'End time cannot be before start time.';
    } else if (this.validateInput()) {
      let building = '';
      if (this.isGlobal) {
        building = 'GLOBAL';
      } else {
        building = this.selectedBuilding.id;
      }

      // Convert our dates to Est time
      const estTimeStart = this.startDate.toLocaleString('en-US', {timeZone: 'America/New_York'});
      const convertedTimeStart = new Date(estTimeStart);

      let estTimeEnd = null;
      if (this.endDate) {
        estTimeEnd = this.endDate.toLocaleString('en-US', {timeZone: 'America/New_York'});
        const convertedTimeEnd = new Date(estTimeEnd);
      }

      let cluster = null;
      if (this.selectedCluster) {
        cluster = this.selectedCluster.id;
      }

      const event: Event = {
        id: null,
        title: this.eventTitle,
        description: this.eventDescription,
        startDate: estTimeStart,
        endDate: estTimeEnd,
        buildingId: building,
        clusterId: cluster
      };
      this.dialogRef.close(event);
    } else {
      this.errorMessage = 'Please enter all required information.';
    }
  }

  close() {
    this.dialogRef.close();
  }

  validateInput(): boolean {
    return !(this.eventTitle === '' || this.eventDescription === '' || (!this.isGlobal && !this.selectedBuilding) || !this.startDate);
  }

  validateTimes(): boolean {

    if (this.endDate === null) {
      return true;
    } else {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      return start.getTime() < end.getTime();
    }
  }

  selectBuilding($event) {
    this.sensorService.getClusters($event.value.id).subscribe((data) => {
      this.clusters = data;
    });
  }
}
