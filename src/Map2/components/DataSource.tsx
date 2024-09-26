import { useDatasource } from '../../zustand/datasource';
import AddDataDialog from './AddDataDialog';

const DataSource = () => {
  const { selectedDatasource } = useDatasource()

  const datasources = selectedDatasource.map((e) => {
    return (
      <small key={e}>{e}</small>
    )
  })

  return (
    <div className='loc-adddata box flex flex-col gap-4'>
      <div className='flex justify-between'>
        <p>Datasets</p>
        <AddDataDialog />
      </div>
      <div className="flex flex-column gap-1">

        {datasources}
      </div>
    </div>
  )
}

export default DataSource