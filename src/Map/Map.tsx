import Mapbox from "../components/MapComponent";
import './Map.css';
import SidePanel from './components/SidePanel';

const Map = () => {

  return (
    <div className='loc-map'>
      <div className='loc-map-mapbox'>
        <Mapbox />
      </div>
      <div className="loc-map-sidepanel">
        <SidePanel />
      </div>
    </div>
  )
}

export default Map