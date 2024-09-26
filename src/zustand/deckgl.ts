import { Deck } from '@deck.gl/core'
import { create } from 'zustand'
const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.8,
  zoom: 10,
  pitch: 0,
  bearing: 0
}
type InitViewState = typeof INITIAL_VIEW_STATE
type Store = {
  deck: Deck | null,
  initViewState: InitViewState,
  controller: boolean,
  layers: [],
  setDeck: (deck: Deck) => void,
  setInitViewState: (viewState: InitViewState) => void,
  setController: (controller: boolean) => void,
  setLayers: (layers: []) => void,
}

const useDeck = create<Store>()((set) => ({
  deck: null,
  initViewState: INITIAL_VIEW_STATE,
  controller: true,
  layers: [],
  setInitViewState: (viewState: InitViewState) => set((_state) => ({ initViewState: viewState })),
  setLayers: (layers: []) => set((_state) => ({ layers: layers })),
  setController: (controller: boolean) => set((_state) => ({ controller: controller })),
  setDeck: (deck: Deck) => set((_state) => ({ deck: deck })),
}))

export { useDeck }
