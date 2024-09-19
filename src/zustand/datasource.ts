import { create } from 'zustand'

type DatasourceState = {
  selectedDatasource: string[]
  setSelectedDatasource: (sourceName: string[]) => void
}

const useDatasource = create<DatasourceState>()((set) => ({
  selectedDatasource: [],
  setSelectedDatasource: (sourceName: string[]) => set(() => ({ selectedDatasource: sourceName })),
}))

export { useDatasource }
