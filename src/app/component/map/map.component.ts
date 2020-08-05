import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @ViewChild('map')
  private mapElement: ElementRef;

  constructor(private mapService: MapService) { }

  ngAfterViewInit(): void {
    this.mapService.setMapView(this.mapElement);
  }

}
