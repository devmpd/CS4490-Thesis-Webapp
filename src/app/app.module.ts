import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatInputModule, MatDatepickerToggle } from '@angular/material';
import { HomeComponent } from './shared/pages/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HighchartsChartModule } from 'highcharts-angular';
import { AddSensorsComponent } from './shared/pages/dialogs/add-sensors/add-sensors.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEventComponent } from './shared/pages/dialogs/add-event/add-event.component';
import { AddMetadataComponent } from './shared/pages/dialogs/add-metadata/add-metadata.component';
import { FormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddSensorsComponent,
    AddEventComponent,
    AddMetadataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatButtonModule,
    HighchartsChartModule,
    MatDialogModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    MatDatepickerToggle
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddSensorsComponent, AddEventComponent, AddMetadataComponent]
})
export class AppModule { }
