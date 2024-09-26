import { parse, stringify } from 'flatted';
import { FeatureCollection } from "geojson";
import { CircleLayerSpecification, Layer, Map } from 'mapbox-gl';
import { useMapStore } from "../zustand/mapbox";
import { LayerType } from "./type";

type GeoJSONS = {
  type: 'geojson',
  data: FeatureCollection
}
type Vector = {
  type: 'vector',
  url: string
}
type CustomSourceType = GeoJSONS | Vector

//#region useMapFunc
const filterSameSource = (sourceId: string, map: Map) => {
  const sameSourceLayer = map?.getStyle()?.layers.filter(_layer => _layer.source === sourceId) || []
  return sameSourceLayer
}
const useMapFunc = () => {
  const { map } = useMapStore()

  const addSource = (id: string, source: CustomSourceType) => {
    if (!map?.getSource(id + '-source')) {
      map?.addSource(id + '-source', source)
    }
  }
  const removeSource = (id: string) => {
    if (map) {
      const _layers = filterSameSource(id + '-source', map)
      _layers.forEach(_layer => removeLayer(_layer.id))
      map?.removeSource(id + '-source')
    }
  }
  const addLayer = (id: string, type: LayerType, source: string) => {
    if (map) {

      const colors = ['#7e5af9', '#de8819', '#a66cde', '#207bc7', '#df83a4', '#19d199', '#bba65e', '#d9f5b9']
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const defaultCircleLayer: CircleLayerSpecification = {
        paint: {
          'circle-color': randomColor,
          'circle-radius': 8,
          'circle-stroke-color': '#fff'
        },
        id: "",
        type: "circle",
        source: ""
      }

      const _layers = filterSameSource(id + '-source', map)
      const layer: Layer = {
        id: id + '-' + _layers.length + '-layer',
        type: type,
        paint: {},
        source: source + '-source'
      }

      switch (type) {
        case "line":
          break;

        default:
          layer.paint = defaultCircleLayer.paint
          break;
      }

      const newLayer = map?.addLayer(layer).getLayer(id + '-' + _layers.length + '-layer')
      return newLayer?.id
    }
  }
  const removeLayer = (id: string) => {
    map?.removeLayer(id)
  }
  return {
    addSource,
    removeSource,
    addLayer,
    removeLayer
  }
}
//#endregion

//#region 
const getConfigToSave = (map: Map) => {
  const mapStyle = map.getStyle();
  const sources = mapStyle?.sources
  console.log("🚀 ~ getConfigToSave ~ sources:", sources)



  const mapState = {
    zoom: map.getZoom(),
    center: map.getCenter(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
  };
  const uiState = {
    isFullscreen: document.fullscreenElement !== null,
  };

  // Combine the config
  const config = {
    mapStyle,
    mapState,
    uiState,
  };

  // Use flatted to handle circular references
  return stringify(config);
}

const setConfig = (config: string) => {
  return parse(config)
}
//#endregion

export { getConfigToSave, setConfig, useMapFunc };

