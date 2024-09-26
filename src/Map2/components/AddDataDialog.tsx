// import { Avatar } from '@/components/lib/avatar/Avatar';
import { FeatureCollection } from 'geojson';
import { Button } from 'primereact/button';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { useDatasets } from '../../hooks/useDatasets';
import { useMapFunc } from '../../utils/mapbox';
import { useDataLayer } from '../../zustand/datalayer';
import { useDatasource } from '../../zustand/datasource';


const AddDataDialog = () => {
  const [visible, setVisible] = useState(false);
  const { datasets } = useDatasets()
  const { selectedDatasource, setSelectedDatasource } = useDatasource()
  const { addSource, removeSource } = useMapFunc()
  const { selectedDataLayer, setSelectedDataLayer } = useDataLayer()

  const onCategoryChange = (e: CheckboxChangeEvent) => {
    let _selectedCategories = [...selectedDatasource];
    if (e.checked) {
      _selectedCategories.push(e.value);
      const _dataset = datasets.find(ds => ds.geojson.name === e.value)
      addSource(e.value, { type: 'geojson', data: _dataset?.geojson as FeatureCollection })
    }
    else {
      _selectedCategories = _selectedCategories.filter(name => name !== e.value);
      removeSource(e.value)
      const nonRemoveLayer = selectedDataLayer.filter(_l => !_l.startsWith(e.value))
      setSelectedDataLayer(nonRemoveLayer)
    }

    setSelectedDatasource(_selectedCategories);
  }

  const onConfirmDialog = () => {
    setVisible(false)
  }
  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      {/* <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" /> */}
      <span className="font-bold white-space-nowrap">Add Datasource</span>
    </div>
  );
  const footerContent = (
    <div>
      <Button className='btn-primary' label="Ok" icon="pi pi-check" onClick={onConfirmDialog} autoFocus />
    </div>
  );

  const datasources = datasets.map((e, i) => {
    const checked = selectedDatasource.some((item) => item === e.geojson.name)

    return (
      <div key={i} className="flex align-items-center">
        <Checkbox className='loc-checkbox' inputId={e.geojson.name} name="category" value={e.geojson.name} onChange={onCategoryChange} checked={checked} />
        <small className="ml-2">{e.geojson.name}</small>
      </div>
    )
  })

  return (
    <div className="flex justify-end">
      <Button className='btn-primary' label="Data console" icon="pi pi-external-link" onClick={() => setVisible(true)} />

      <Dialog className='loc-dialog' visible={visible} modal header={headerElement} footer={footerContent} onHide={() => { if (!visible) return; setVisible(false); }}>
        <div className='flex flex-col gap-1'>
          {datasources}
        </div>
      </Dialog>
    </div>
  )
}

export default AddDataDialog