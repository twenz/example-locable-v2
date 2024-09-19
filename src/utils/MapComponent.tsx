import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { useMapStore } from '../zustand/mapbox';

// type Props = {}
declare global {
  interface Window {
    MapDebug: Map;
  }
}
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
const Mapbox = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { lng, lat, zoom, setCoordinates, setZoom, setMap } = useMapStore();

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
      setMap(map)
      window.MapDebug = map
      return () => map.remove();
    }
  }, []);

  return <div ref={mapContainerRef} style={{ height: '100vh' }} />;

}

export default Mapbox