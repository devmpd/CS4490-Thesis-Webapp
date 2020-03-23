import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {SensorService} from '../../../services/sensor.service';

@Component({
  selector: 'app-add-metadata',
  templateUrl: './add-metadata.component.html',
  styleUrls: ['./add-metadata.component.scss']
})
export class AddMetadataComponent implements OnInit {
  public metaTitle = '';
  public metaDescription = '';
  public errorMessage = '';


  constructor(private dialogRef: MatDialogRef<AddMetadataComponent>) { }

  ngOnInit() {
  }

  save() {
    if (this.metaTitle === '' && this.metaDescription === '') {
      this.errorMessage = 'Title and description must not be blank.';
    } else if (this.metaTitle === '') {
      this.errorMessage = 'Title must not be blank.';
    } else if (this.metaDescription === '') {
      this.errorMessage = 'Description must not be blank.';
    } else {
      const data = {metaTitle: this.metaTitle, metaDescription: this.metaDescription};
      this.dialogRef.close(data);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
