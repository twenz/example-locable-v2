// PrimeReact styles
import 'primeflex/primeflex.css'; // optional for utility classes
import 'primeicons/primeicons.css'; // icons CSS
import 'primereact/resources/primereact.min.css'; // core CSS
import 'primereact/resources/themes/saga-blue/theme.css'; // or other theme

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import Map from './Map/Map';
import Map2 from './Map2/Map';
import WorkSpace from './WorkSpace/WorkSpace';

function App() {

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Router basename={'/'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<Map />} />
          <Route path="/map2" element={<Map2 />} />
          <Route path="/workspace" element={<WorkSpace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
