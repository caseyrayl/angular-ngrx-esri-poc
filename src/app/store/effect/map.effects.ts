import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { withLatestFrom, map, concatMap } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';

// Services
import { MapService } from 'src/app/service/map.service';

// NgRx
import { AppState } from '../state/app.state';
import { PermStopActionTypes, PermStopAdd } from '../action/perm-stop.actions';

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
    private mapService: MapService
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
      this.mapService.addPermStop(typedAction.permStop);

      // return new FilterActions.ExpressionSegmentsUpdate(segements);
    })
  );
}
