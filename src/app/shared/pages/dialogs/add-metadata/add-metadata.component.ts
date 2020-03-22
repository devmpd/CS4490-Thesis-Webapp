import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-metadata',
  templateUrl: './add-metadata.component.html',
  styleUrls: ['./add-metadata.component.scss']
})
export class AddMetadataComponent implements OnInit {
  private metaTitle = '';
  private metaDescription = '';
  private errorMessage = '';


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
      this.dialogRef.close(null);
    }
  }

  close() {
    this.dialogRef.close();
  }

}
