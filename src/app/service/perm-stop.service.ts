import { Injectable } from '@angular/core';
import { PermanentStop } from '../store/state/perm-stop.state';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store/state/app.state';
import { getPermStopValues } from '../store/selector/perm-stop.selectors';
import { PermStopAdd, PermStopRemove } from '../store/action/perm-stop.actions';

@Injectable({
  providedIn: 'root'
})
export class PermStopService {

  public stops: PermanentStop[];

  constructor(private store: Store<AppState>) {
    this.store.pipe(select(getPermStopValues)).subscribe((stops: PermanentStop[]) => {
      this.stops = stops;
    });
  }

  public addStop(stop: PermanentStop) {
    const action = new PermStopAdd(stop);
    this.store.dispatch(action);
  }

  public removeStop(stops: PermanentStop[]) {
    const action = new PermStopRemove(stops);
    this.store.dispatch(action);
  }
}
