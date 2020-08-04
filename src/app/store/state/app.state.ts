import { PermStopsState, initiaPermStopsState } from './perm-stop.state';

export interface AppState {
  permStops: PermStopsState;
}

export const initialAppState: AppState = {
  permStops: initiaPermStopsState,
};
