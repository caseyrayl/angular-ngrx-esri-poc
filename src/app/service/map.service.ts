import { Injectable } from '@angular/core';

import esri = __esri;

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private mapView: esri.MapView;

  constructor() { }

  public setMapView(mv: esri.MapView) {
    this.mapView = mv;
  }
}
