import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { Deck, Position } from "@deck.gl/core";
import { Map } from "mapbox-gl";
import pea1k from '../../data/pea1k.json' assert { type: 'json' };

type PeaProp = {
  position: Position;
  kwatt: number;
  meter: string;
}

const initDeckLayer = (map: Map) => {

  console.log('init deck layer')
  const { lng, lat } = map.getCenter();

  const deck = new Deck({
    canvas: 'deck-canvas', // Canvas layer for Deck.gl rendering
    initialViewState: {
      longitude: lng,
      latitude: lat,
      zoom: map.getZoom(),
      pitch: map.getPitch(),
      bearing: map.getBearing(),
    },
    controller: true,
    layers: []
  });

  const pea1khex = pea1k.features.map(e => {
    return {
      position: e.geometry.coordinates as Position,
      kwatt: e.properties.kwatt_hours,
      meter: e.properties.meter_type
    }
  })

  // Add the HexagonLayer
  const hexagonLayer = new HexagonLayer<PeaProp>({
    id: 'hexagon-layer',
    data: pea1khex,
    getPosition: d => d.position,
    getElevationWeight: d => d.kwatt,
    getColorWeight: d => d.kwatt,
    elevationScale: 50,
    extruded: true,
    radius: 1000, // Radius of the hexagons in meters
    opacity: 0.6,
    elevationRange: [0, 3000],
    upperPercentile: 90,
  });

  // Add the Deck.gl layer to the map when Mapbox is ready
  map.on('load', () => {
    deck.setProps({ layers: [hexagonLayer] });
  })
}

export { initDeckLayer };
