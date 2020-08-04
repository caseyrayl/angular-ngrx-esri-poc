import * as _ from 'lodash';

import { initiaPermStopsState, PermStopsState, PermanentStop } from '../state/perm-stop.state';
import { PermStopActions, PermStopActionTypes } from '../action/perm-stop.actions';

export function permStopReducer(state = initiaPermStopsState, action: PermStopActions): PermStopsState {
  switch (action.type) {
    case PermStopActionTypes.PermStopAdd: {
      const stops = state.stops.concat();
      stops.push(action.permStop);
      return {
        ...state,
        stops
      };
    }

    case PermStopActionTypes.PermStopRemove: {
      const stops = _.remove(state.stops, (stop: PermanentStop) => {
        return stop.activeRouteDetailsID === action.ardi;
      });
      return {
        ...state,
        stops
      };
    }

    default: {
      return state;
    }
  }
}
