import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import esri = __esri;

import { MapService } from 'src/app/service/map.service';
import { GraphicService } from 'src/app/service/graphic.service';
import { PermStopService } from 'src/app/service/perm-stop.service';
import { PermanentStop } from 'src/app/store/state/perm-stop.state';
import { MapInteractionService } from 'src/app/service/map-interaction.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map')
  private mapElement: ElementRef;

  constructor(
    private mapService: MapService,
    private graphicService: GraphicService,
    private interactionService: MapInteractionService
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
  }

  private async initMap() {
    const view = await this.mapService.setMapView(this.mapElement);
    await this.graphicService.setMapView(view);
    this.interactionService.setMapView(view);
  }
}
