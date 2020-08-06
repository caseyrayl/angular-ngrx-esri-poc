import { Component, OnInit } from '@angular/core';
import { PermStopService } from 'src/app/service/perm-stop.service';
import { PermanentStop } from 'src/app/store/state/perm-stop.state';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-stop-list',
  templateUrl: './stop-list.component.html',
  styleUrls: ['./stop-list.component.scss']
})
export class StopListComponent implements OnInit {

  public selectedPermStops: PermanentStop[];

  constructor(public stopService: PermStopService) { }

  ngOnInit(): void {
  }

  public addRandomStop() {
    const lon = Math.random() * 1.8 - 112.8;
    const lat = Math.random() * 1.2 + 33;
    const stop: PermanentStop = {
      activeRouteDetailsID: uuidv4(),
      longitude: lon,
      latitude: lat,
    };
    this.stopService.addStop(stop);
  }

  public removeSelectedStops() {
    if (this.selectedPermStops && this.selectedPermStops.length) {
      this.stopService.removeStop(this.selectedPermStops);
    }
  }
}
