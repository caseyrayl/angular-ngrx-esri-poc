import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

const getPermStopState = (state: AppState) => state.permStops;

/**
 * Selector for getting the stats table state from the application state.
 */
export const getPermStopValues = createSelector(
  getPermStopState,
  state => state.stops
);
