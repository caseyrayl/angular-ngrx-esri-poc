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

  public selectedPermStopId: string[];

  constructor(public stopService: PermStopService) { }

  ngOnInit(): void {
  }

  public addRandomStop() {
    const stop: PermanentStop = {
      activeRouteDetailsID: uuidv4(),
      latitude: 0,
      longitude: 0
    };
    this.stopService.addStop(stop);
  }

  public removeSelectedStops() {
    if (this.selectedPermStopId && this.selectedPermStopId.length) {
      this.stopService.removeStop(this.selectedPermStopId);
    }
  }
}
