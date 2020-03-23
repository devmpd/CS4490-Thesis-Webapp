import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

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
