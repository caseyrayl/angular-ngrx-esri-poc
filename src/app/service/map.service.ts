import { Injectable, ElementRef } from '@angular/core';

import esri = __esri;
import { loadModules, loadCss } from 'esri-loader';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private mapView: esri.MapView;

  // dynamically loaded esri modules
  private EsriMap: esri.MapConstructor = null;
  private EsriMapView: esri.MapViewConstructor = null;

  constructor() {
    loadCss();
  }

  public async setMapView(mapElement: ElementRef): Promise<esri.MapView> {
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

    return this.mapView;
  }

  private async loadEsriModules() {
    try {
      // Load the modules for the ArcGIS API for JavaScript
      const [EsriMap, EsriMapView] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
      ]);

      this.EsriMap = EsriMap;
      this.EsriMapView = EsriMapView;
    }
    catch (error) {
      console.log('EsriLoader: ', error);
    }
  }
}
