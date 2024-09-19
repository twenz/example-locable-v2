import { Button } from 'primereact/button';
import { ListBox } from 'primereact/listbox';
import { OverlayPanel } from 'primereact/overlaypanel';
import { SyntheticEvent, useRef, useState } from 'react';
import { useMapFunc } from '../../utils/mapbox';
import { useDataLayer } from '../../zustand/datalayer';
import { useDatasource } from '../../zustand/datasource';

const AddLayerOverlay = () => {
  const op = useRef<OverlayPanel | null>(null);
  const { selectedDatasource: selectedDatasources } = useDatasource()
  const [selectedDatasource, setselectedDatasource] = useState(null)
  const { setSelectedDataLayer, selectedDataLayer } = useDataLayer()

  const { addLayer } = useMapFunc()
  const onConfirm = (e: SyntheticEvent<Element, Event> | null | undefined) => {
    if (op.current) {
      op.current.toggle(e)
      const ds = [...selectedDataLayer]
      if (selectedDatasource) {
        const _layerId = addLayer(selectedDatasource, 'circle', selectedDatasource)!
        ds.push(_layerId)
        setSelectedDataLayer(ds)
      }
      setselectedDatasource(null)
    }
  }
  return (
    <div>
      <Button className='btn-primary' type="button" icon="pi pi-plus" label="Add Layer" onClick={(e) => { if (op.current) op.current.toggle(e) }} />
      <OverlayPanel className='loc-overlay' ref={op} showCloseIcon closeOnEscape dismissable={false}>
        <div className='flex flex-col min-w-52 gap-1'>
          <p>Select datasource</p>
          <ListBox value={selectedDatasource}
            onChange={(e) => setselectedDatasource(e.value)}
            options={selectedDatasources}
            className="w-full md:w-14rem" />
          <Button className='btn-primary' onClick={onConfirm} label='confirm' />
        </div>
      </OverlayPanel>
    </div>
  )
}

export default AddLayerOverlay