import { Deck } from '@deck.gl/core';
import mapboxgl from 'mapbox-gl';
import { useEffect } from "react";
import { useDeck } from '../../zustand/deckgl';
import { useMapStore } from '../../zustand/mapbox';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const MapboxDeck = () => {
  const { setMap, lat, lng } = useMapStore()
  const { setDeck } = useDeck()
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: 10
    })
    setMap(map)

    // const pea1khex = pea1k.features.map(e => {
    //   return {
    //     position: e.geometry.coordinates as Position,
    //     kwatt: e.properties.kwatt_hours,
    //     meter: e.properties.meter_type
    //   }
    // })
    const deck = new Deck({
      canvas: 'deck-canvas',
      width: window.innerWidth,
      height: window.innerHeight,
      initialViewState: {
        longitude: lng,
        latitude: lat,
        zoom: 10,
        pitch: 0,
        bearing: 0
      },
      controller: true,
      onDrag(info, event) {
        console.log("🚀 ~ onDrag ~ info, event:", info, event)

      },
      layers: []
    });
    setDeck(deck)
    map.on('move', () => {
      console.log('onmove')
      const { lng, lat } = map.getCenter();
      deck.setProps({
        viewState: {
          longitude: lng,
          latitude: lat,
          zoom: map.getZoom(),
          bearing: map.getBearing(),
          pitch: map.getPitch()
        }
      });
    });

  }, [])

  return (
    <>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
      <canvas id="deck-canvas" style={{ height: '100vh', width: '100%', position: 'absolute', pointerEvents: 'none', top: 0, left: 0 }}></canvas>
    </>
  )
}

export default MapboxDeck