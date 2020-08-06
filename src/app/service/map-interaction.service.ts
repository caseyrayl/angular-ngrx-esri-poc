import { Injectable } from '@angular/core';

import esri = __esri;

import { PermStopService } from './perm-stop.service';
import { PermanentStop } from '../store/state/perm-stop.state';

@Injectable({
  providedIn: 'root'
})
export class MapInteractionService {

  private mapView: esri.MapView;

  constructor(private stopService: PermStopService) { }

  public async setMapView(mapView: esri.MapView) {
    this.mapView = mapView;
    this.registerClickHandler();
  }

  private registerClickHandler() {
    this.mapView.on('click', async (evt) => {
      const htr: esri.HitTestResult = await this.mapView.hitTest(evt);
      if (htr.results.length) {
        const ardis = htr.results.map((result: esri.HitTestResultResults) => {
          return result.graphic.attributes.activeRouteDetailsID;
        });
        const stops = this.stopService.stops.filter((stop: PermanentStop) => {
          return ardis.includes(stop.activeRouteDetailsID);
        });
        if (stops.length) {
          this.stopService.removeStop(stops);
        }
      }
    });
  }
}
