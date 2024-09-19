import AddDataSource from './DataSource';
import Layer from './Layer';

const SidePanel = () => {
  return (
    <div className='loc-map-sidepanel-container box'>
      <h1>Example Mapbox</h1>
      <AddDataSource />
      <Layer />
    </div>
  )
}

export default SidePanel