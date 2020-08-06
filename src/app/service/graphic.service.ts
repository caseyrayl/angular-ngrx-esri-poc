import { Injectable } from '@angular/core';

import esri = __esri;
import { loadModules } from 'esri-loader';

import { PermanentStop } from '../store/state/perm-stop.state';

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  private mapView: esri.MapView;

  // dynamically loaded esri modules
  private EsriGraphic: esri.GraphicConstructor = null;
  private EsriPoint: esri.PointConstructor = null;
  private EsriUtils: esri.webMercatorUtils = null;

  constructor() { }

  public async setMapView(mapView: esri.MapView) {
    this.mapView = mapView;
    await this.loadEsriModules();
  }

  public addPermStop(stop: PermanentStop) {
    if (this.mapView) {
      const point = new this.EsriPoint({
        longitude: stop.longitude,
        latitude: stop.latitude
      });
      const graphicOptions: any = {
        attributes: {
          activeRouteDetailsID: stop.activeRouteDetailsID
        },
        symbol: {
          type: 'simple-marker',
          color: 'green',
          size: '16px'
        },
        geometry: this.EsriUtils.geographicToWebMercator(point)
      };
      const graphic: esri.Graphic = new this.EsriGraphic(graphicOptions);
      this.mapView.graphics.add(graphic);
    }
  }

  public removePermStops(stops: PermanentStop[]) {
    if (this.mapView) {
      // translate stops to graphics
      const stopIds = stops.map((stop) => stop.activeRouteDetailsID);
      const graphics = this.mapView.graphics.filter((graphic) => {
        return stopIds.includes(graphic.attributes.activeRouteDetailsID);
      });
      this.mapView.graphics.removeMany(graphics);
    }
  }

  private async loadEsriModules() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriGraphic, EsriPoint, EsriUtils] = await loadModules([
        'esri/Graphic',
        'esri/geometry/Point',
        'esri/geometry/support/webMercatorUtils'
      ]);

      this.EsriGraphic = EsriGraphic;
      this.EsriPoint = EsriPoint;
      this.EsriUtils = EsriUtils;
    }
    catch (error) {
      console.log('EsriLoader: ', error);
    }
  }
}
