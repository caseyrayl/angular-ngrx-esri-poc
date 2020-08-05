import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// import esri = __esri;
import { loadModules, loadCss } from 'esri-loader';

import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('map')
  private mapElement: ElementRef;

  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.initializeMap();
  }

  private async initializeMap() {
    loadCss();

    const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);
    const mapView = new MapView({
      container: this.mapElement.nativeElement,
      center: [-111.893789, 33.616224],
      zoom: 10,
      map: new Map({ basemap: 'streets' }),
    });
    this.mapService.setMapView(mapView);
  }

}
