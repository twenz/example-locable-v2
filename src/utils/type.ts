import { FeatureCollection } from 'geojson';


export type CustomFeatureCollection = FeatureCollection & { name: string }
export type GeojsonFiles = {
  fileName: string | undefined;
  geojson: CustomFeatureCollection
}[]
export type LayerType = 'circle' | 'symbol' | 'line' | 'fill'