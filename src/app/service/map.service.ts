import { Injectable, ElementRef } from '@angular/core';

import esri = __esri;
import { loadModules, loadCss } from 'esri-loader';

import { PermanentStop } from '../store/state/perm-stop.state';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private mapView: esri.MapView;

  // dynamically loaded esri modules
  private EsriMap: esri.MapConstructor = null;
  private EsriMapView: esri.MapViewConstructor = null;
  private EsriGraphic: esri.GraphicConstructor = null;
  private EsriPoint: esri.PointConstructor = null;
  private EsriColor: esri.ColorConstructor = null;
  private EsriUtils: esri.webMercatorUtils = null;

  constructor() {
    loadCss();
  }

  public async setMapView(mapElement: ElementRef) {
    if (!this.EsriMap) {
      await this.loadEsriModules();
    }

    this.mapView = new this.EsriMapView({
      container: mapElement.nativeElement,
      center: [-111.893789, 33.616224],
      zoom: 10,
      map: new this.EsriMap({ basemap: 'streets' }),
    });

    await this.mapView.when();
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
      const [EsriMap, EsriMapView, EsriGraphic, EsriPoint, EsriColor, EsriUtils] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/Graphic',
        'esri/geometry/Point',
        'esri/Color',
        'esri/geometry/support/webMercatorUtils'
      ]);

      this.EsriMap = EsriMap;
      this.EsriMapView = EsriMapView;
      this.EsriGraphic = EsriGraphic;
      this.EsriPoint = EsriPoint;
      this.EsriColor = EsriColor;
      this.EsriUtils = EsriUtils;
    }
    catch (error) {
      console.log('EsriLoader: ', error);
    }
  }
}
