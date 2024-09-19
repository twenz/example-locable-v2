import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// // PrimeReact styles
// import 'primeflex/primeflex.css'; // optional for utility classes
// import 'primeicons/primeicons.css'; // icons CSS
// import 'primereact/resources/primereact.min.css'; // core CSS
// import 'primereact/resources/themes/saga-blue/theme.css'; // or other theme

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
