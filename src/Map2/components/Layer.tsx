import { useDataLayer } from "../../zustand/datalayer"
import AddLayerOverlay from "./AddLayerOverlay"

const Layer = () => {
  const { selectedDataLayer } = useDataLayer()
  const layers = selectedDataLayer.map(l => <small key={l}>{l}</small>)
  return (
    <div className='loc-adddata box flex flex-col gap-4'>
      {/* <AddDataDialog /> */}
      <div className="flex justify-between">
        <p className='pb-2' >
          Layer
        </p>
        {/* <Button className="btn-primary" icon='pi pi-plus' label="Add Layer" /> */}
        <AddLayerOverlay />
      </div>
      <div className="flex flex-col">
        {layers}
      </div>
    </div>
  )
}

export default Layer