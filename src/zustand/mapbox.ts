import { Map } from 'mapbox-gl';
import { create } from 'zustand';

interface MapState {
  lng: number;
  lat: number;
  zoom: number;
  map: Map | null;
  setCoordinates: (lng: number, lat: number) => void;
  setZoom: (zoom: number) => void;
  setMap: (map: Map) => void;
}

export const useMapStore = create<MapState>((set) => ({
  lng: 100.5018, // default longitude
  lat: 13.7563,  // default latitude
  zoom: 10,      // default zoom level
  map: null,
  setCoordinates: (lng, lat) => set({ lng, lat }),
  setZoom: (zoom) => set({ zoom }),
  setMap: (map) => set({ map })
}));
