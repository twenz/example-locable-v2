import { create } from 'zustand'

type DataLayerState = {
  selectedDataLayer: string[]
  setSelectedDataLayer: (layerName: string[]) => void
}

const useDataLayer = create<DataLayerState>()((set) => ({
  selectedDataLayer: [],
  setSelectedDataLayer: (layerName: string[]) => set(() => ({ selectedDataLayer: layerName })),
}))

export { useDataLayer }
