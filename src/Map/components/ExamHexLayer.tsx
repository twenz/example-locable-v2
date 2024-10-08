import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { Position } from '@deck.gl/core';
import { Map } from 'mapbox-gl';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import * as pea1k from '../../data/pea1k.json' assert { type: 'json' };
import { CustomGeojson } from '../../utils/type';
import { useDeck } from '../../zustand/deckgl';

type PeaProp = {
  position: Position;
  kwatt: number;
  meter: string;
}
type Props = { map: Map }

const ExamHexLayer = ({ map }: Props) => {
  const { deck } = useDeck()
  const [dataSource, setDataSource] = useState<PeaProp[]>()
  useEffect(() => {
    const pea1khex = pea1k.features.map((e: CustomGeojson) => {
      return {
        position: e.geometry.coordinates as Position,
        kwatt: e.properties.kwatt_hours,
        meter: e.properties.meter_type
      }
    })
    setDataSource(pea1khex as PeaProp[])
  }, [])

  useEffect(() => {
    if (!map || !deck) return;

    // Re-render deck on map movement
    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      deck.setProps({
        viewState: {
          longitude: lng,
          latitude: lat,
          zoom: map.getZoom(),
          pitch: map.getPitch(),
          bearing: map.getBearing(),
        },
      });
    });
  }, [map, deck])

  const handleHexLayer = () => {

    if (!deck || !dataSource) {
      console.error('Deck or DataSource is not available');
      return; // Exit if deck or dataSource isn't ready
    }

    const hexagonLayer = new HexagonLayer<PeaProp>({
      id: 'hexagon-layer',
      data: dataSource,
      // colorRange,
      getPosition: d => d.position,
      getElevationWeight: d => d.kwatt,
      getColorWeight: d => d.kwatt,
      elevationScale: 50,
      extruded: true,
      radius: 300, // Radius of the hexagons in meters
      // opacity: 0.6,
      elevationRange: [0, 3000],
      upperPercentile: 60,
    })
    if (deck) {
      console.log('add deck layer')
      deck.setProps({ layers: [hexagonLayer] })
    }
  }
  return (
    <Button className='btn-primary' label='Add Hex' onClick={handleHexLayer} />
  )
}

export default ExamHexLayer