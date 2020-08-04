export interface PermanentStop {
  activeRouteDetailsID: string;
  latitude: number;
  longitude: number;
}

export interface PermStopsState {
  stops: PermanentStop[];
}

export const initiaPermStopsState: PermStopsState = {
  stops: []
};
