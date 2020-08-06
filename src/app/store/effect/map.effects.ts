import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { withLatestFrom, map, concatMap } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

// Services
import { GraphicService } from 'src/app/service/graphic.service';

// NgRx
import { AppState } from '../state/app.state';
import { PermStopActionTypes, PermStopAdd, PermStopRemove } from '../action/perm-stop.actions';

/**
 * Effects that update filter state based on global state changes.
 */
@Injectable({
  providedIn: 'root'
})
export class MapEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private graphicService: GraphicService
  ) { }

  @Effect({ dispatch: false })
  mapAddGraphicAction$: Observable<void> = this.actions$.pipe(
    ofType(
      PermStopActionTypes.PermStopAdd,
    ),
    concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe()))),
    map(([action , appState]) => {
      const typedAction: PermStopAdd = action as PermStopAdd;
      console.log(`Add graphic map effect handler for ${typedAction.type}, updating map graphics.`);
      this.graphicService.addPermStop(typedAction.permStop);
    })
  );

  @Effect({ dispatch: false })
  mapRemoveGraphicsAction$: Observable<void> = this.actions$.pipe(
    ofType(
      PermStopActionTypes.PermStopRemove,
    ),
    concatMap((action) => of(action).pipe(withLatestFrom(this.store.pipe()))),
    map(([action , appState]) => {
      const typedAction: PermStopRemove = action as PermStopRemove;
      console.log(`Remove graphic map effect handler for ${typedAction.type}, updating map graphics.`);
      this.graphicService.removePermStops(typedAction.stops);
    })
  );
}
