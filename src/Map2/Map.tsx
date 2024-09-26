/// npm i mapbox-gl @deck.gl/core @deck.gl/aggregation-layers

import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { Deck, PickingInfo, Position } from '@deck.gl/core';
import mapboxgl, { Map } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import pea1k from '../data/pea1k.json';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
type Meter = { type: string, value: number }
type PeaProps = {
  coordinates: Position;
  kwatt: number;
  meter: number | undefined;
}
const MapCmp = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [deck, setDeck] = useState<Deck | null>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const _map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [101.1912, 13.0559],
      zoom: 9,
    });

    _map.on('load', () => {
      const newDeck = new Deck({
        canvas: 'deck-canvas',
        initialViewState: {
          longitude: 101.1912,
          latitude: 13.0559,
          zoom: 9,
        },
        controller: true,
        onViewStateChange: ({ viewState }) => {
          _map.jumpTo({
            center: [viewState.longitude, viewState.latitude],
            zoom: viewState.zoom,
            bearing: viewState.bearing,
            pitch: viewState.pitch,
          });
        },
        layers: [],
      });
      // map.on('move', () => {
      //   const { lng, lat } = map.getCenter();
      //   newDeck.setProps({
      //     viewState: {
      //       longitude: lng,
      //       latitude: lat,
      //       zoom: map.getZoom(),
      //       bearing: map.getBearing(),
      //       pitch: map.getPitch()
      //     }
      //   });
      // });
      setDeck(newDeck);
    });
    setMap(_map)
    return () => {
      _map.remove();
      deck?.finalize();
    };
  }, []);

  // Function to add Hexagon Layer
  const handleAddLayer = () => {
    console.log(deck?.getViewports())

    const _t = true
    if (_t) {
      const pea1kmeter = pea1k.features.reduce((acc: Meter[], cur) => {
        if (!acc.some(e => cur.properties.meter_type.match(e.type))) {
          acc.push({ type: cur.properties.meter_type, value: acc.length })
        }
        return acc
      }, [])
      const pea1khex = pea1k.features.map(e => {
        return {
          coordinates: e.geometry.coordinates as Position,
          kwatt: e.properties.kwatt_hours,
          meter: pea1kmeter.find(_e => _e.type === e.properties.meter_type)?.value
        }
      })

      const hexagonLayer = new HexagonLayer<PeaProps>({
        id: 'hexagon-layer',
        data: pea1khex, // Replace with your actual dataset
        getPosition: d => d.coordinates,
        getElevationWeight: d => d.kwatt,
        getColorWeight: d => d.meter || 0,
        elevationScale: 50,
        radius: 100,
        elevationRange: [0, 1000],
        upperPercentile: 60,
        extruded: true,
        pickable: true
      });
      map?.jumpTo({
        center: [100.999222, 13.151748],
        zoom: 10.19,
        pitch: 56.038445,
        bearing: 72.75,
      })
      deck?.setProps({
        layers: [hexagonLayer],
        getTooltip: getTooltip,
        initialViewState: {
          latitude: 13.151748,
          longitude: 100.999222,
          zoom: 10.19,
          pitch: 56.038445,
          bearing: 72.75,
        }
      });

    }

  };

  const getTooltip = ({ object }: PickingInfo) => {
    if (!object) {
      return null;
    }
    const pea1kmeter = pea1k.features.reduce((acc: Meter[], cur) => {
      if (!acc.some(e => cur.properties.meter_type.match(e.type))) {
        acc.push({ type: cur.properties.meter_type, value: acc.length })
      }
      return acc
    }, [])
    const _meter = pea1kmeter.find(e => e.value === object.colorValue)?.type
    return `\
      kwatt: ${object.elevationValue}
      meter: ${_meter}
      ${object.points.length} count`;
  }

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '100vw', height: '100vh' }} />
      <canvas id="deck-canvas" style={{ position: 'absolute', top: 0, left: 0 }} />
      <button className='btn-primary' onClick={handleAddLayer} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
        Add Hexagon Layer
      </button>
    </div>
  );
}

export default MapCmp;
