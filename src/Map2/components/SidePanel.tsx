import { Button } from 'primereact/button';
import { getConfigToSave, setConfig } from '../../utils/mapbox';
import { useMapStore } from '../../zustand/mapbox';
import AddDataSource from './DataSource';
import Layer from './Layer';
import ExamHexLayer from './examHexLayer';

const SidePanel = () => {
  const { map } = useMapStore()
  const handleSaveMap = () => {
    if (map) {
      // const mapStyle = map.getStyle();

      // Get the map's current camera state (zoom, center, bearing, pitch)
      // const mapState = {
      //   zoom: map.getZoom(),
      //   center: map.getCenter(),
      //   bearing: map.getBearing(),
      //   pitch: map.getPitch(),
      // }

      // // Return the combined config
      // const mapConfig = {
      //   mapStyle,
      //   mapState,
      // };
      // console.log("🚀 ~ handleSaveMap ~ mapConfig:", mapConfig)

      const mapConfig = getConfigToSave(map)
      console.log("🚀 ~ handleSaveMap ~ mapConfig:", mapConfig)

      const downloadConfig = (config: typeof mapConfig) => {
        const cfg = setConfig(config)

        console.log("🚀 ~ downloadConfig ~ config:", config)
        console.log("🚀 ~ downloadConfig ~ cfg:", cfg)

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(config);
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "mapConfig.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
      }

      // downloadConfig(mapConfig)
    }
  }

  const handleMbtile = () => {
    // const s3url = 'https://locable-dev-storage.s3.ap-southeast-1.amazonaws.com/dataset/dev/mbtile/gis_boundary/{z}/{x}/{y}.pbf'
    const s3url = 'https://locable-dev-storage.s3.ap-southeast-1.amazonaws.com/dataset/dev/vector/pea-full-v2/{z}/{x}/{y}.pbf'
    // map?.addSource('my-vector-tile-source', {
    //   type: 'geojson',
    //   data: pea as FeatureCollection
    // })
    // console.log(pea.features.length)
    map?.addSource('my-vector-tile-source', {
      type: 'vector',
      tiles: [
        s3url
      ],
      minzoom: 5,
      maxzoom: 14
    })
    map?.addLayer({
      id: 'my-vector-layer',
      type: 'circle', // 'line' or 'circle' for other types of data
      source: 'my-vector-tile-source',
      'source-layer': 'pea', // Name of the layer you used in Tippecanoe
      paint: {
        'circle-color': '#00FF00', // Fill color for your vector tiles
        'circle-radius': 4
        // 'circle-opacity': 0.5
      }
    })
  }
  const handleMbtile2 = () => {
    // const s3url = 'https://locable-dev-storage.s3.ap-southeast-1.amazonaws.com/dataset/dev/mbtile/gis_boundary/{z}/{x}/{y}.pbf'
    const s3url = 'https://locable-dev-storage.s3.ap-southeast-1.amazonaws.com/dataset/dev/vector/pea/{z}/{x}/{y}.pbf'
    map?.addSource('my-vector-tile-source', {
      type: 'vector',
      tiles: [
        s3url
      ],
      minzoom: 5,
      maxzoom: 14
    })
    map?.addLayer({
      id: 'my-vector-layer',
      type: 'circle', // 'line' or 'circle' for other types of data
      source: 'my-vector-tile-source',
      'source-layer': 'pea', // Name of the layer you used in Tippecanoe
      paint: {
        'circle-color': '#00F', // Fill color for your vector tiles
        'circle-radius': 4
        // 'circle-opacity': 0.5
      }
    })
  }

  return (
    <div className='loc-map-sidepanel-container box'>
      <div className='flex justify-between'>
        <h1>Example Mapbox</h1>
        <Button className='btn-primary' label='Save' onClick={handleSaveMap} />
      </div>
      <AddDataSource />
      <Layer />
      <div className='flex flex-col'>

        <Button className='btn-primary' label='Add Mbtile' onClick={handleMbtile} />
        <Button className='btn-primary' label='Add Mbtile 2' onClick={handleMbtile2} />
        <ExamHexLayer map={map!} />
      </div>

    </div>
  )
}

export default SidePanel