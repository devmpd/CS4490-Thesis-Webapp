import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdditionalMetadata} from '../model/additional-metadata';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private apiURL = 'http://localhost:8080/api/';
  constructor(private httpClient: HttpClient) { }

  public getBuildings(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'buildings');
  }

  public getSensorsByBuilding(buildingID: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'sensors/building/' + buildingID);
  }

  public getAllSensorData(sensorID: string): Observable<any> {
    return this.httpClient.get(this.apiURL + 'logs/data/all/' + sensorID);
  }

  public saveAdditionalMetadata(data: AdditionalMetadata): Observable<any> {
    return this.httpClient.post<AdditionalMetadata>(this.apiURL + 'sensors/sensor/addmetadata', data);
  }

  public getClusters(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'buildings/clusters');
  }
}
