import { Component, OnInit } from '@angular/core';
import {MatDialogRef, ThemePalette} from '@angular/material';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  public date: Date;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  constructor(private dialogRef: MatDialogRef<AddEventComponent>) { }

  ngOnInit() {
  }

  save() {
    this.dialogRef.close(null);
  }

  close() {
    this.dialogRef.close();
  }
}
