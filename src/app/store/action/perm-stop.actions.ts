import { Action } from '@ngrx/store';
import { PermanentStop } from '../state/perm-stop.state';

// Actions types
export enum PermStopActionTypes {
  PermStopAdd = '[Perm Stop Action] Add',
  PermStopRemove = '[Perm Stop Action] Remove',
}

// Action Creators
export class PermStopAdd implements Action {
  readonly type = PermStopActionTypes.PermStopAdd;
  constructor(public permStop: PermanentStop) {}
}

export class PermStopRemove implements Action {
  readonly type = PermStopActionTypes.PermStopRemove;
  constructor(public stops: PermanentStop[]) {}
}

// Exports Union type
export type PermStopActions = PermStopAdd | PermStopRemove ;
