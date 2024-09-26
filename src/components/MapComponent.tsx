// import  { DeckProps } from '@deck.gl/core';
import { Deck } from '@deck.gl/core';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { useDeck } from '../zustand/deckgl';
import { useMapStore } from '../zustand/mapbox';
// import { DeckGL } from '@deck.gl/react';


// type Props = {}
declare global {
  interface Window {
    MapDebug: Map;
    DeckDebug: Deck;
  }
}
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const Mapbox = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { lng, lat, zoom, setCoordinates, setZoom, setMap } = useMapStore();
  const { setDeck } = useDeck()
  // const INITIAL_VIEW_STATE = {
  //   longitude: lng,
  //   latitude: lat,
  //   zoom: 10,
  //   pitch: 0,
  //   bearing: 0
  // }
  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom,
      });
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
      map.on('move', () => {
        setCoordinates(map.getCenter().lng, map.getCenter().lat);
        setZoom(map.getZoom());
      });
      map.on('load', (e) => {
        const { lat, lng } = e.target.getCenter()
        const _deck = new Deck({
          canvas: 'deck-canvas', // Canvas layer for Deck.gl rendering
          initialViewState: {
            longitude: lng,
            latitude: lat,
            zoom: e.target.getZoom(),
          },
          controller: true,
          layers: []
        })
        setDeck(_deck)
        window.DeckDebug = _deck
        console.log('created deck and setup')
      })

      setMap(map)
      window.MapDebug = map

      // initDeckLayer(map)
      return () => map.remove();
    }
  }, []);

  return (
    <>
      <div ref={mapContainerRef} style={{ height: '100vh' }} />
      <canvas id="deck-canvas" style={{ height: '100vh', position: 'absolute', pointerEvents: 'none', top: 0, left: 0 }}></canvas>
    </>
  )

}

export default Mapbox