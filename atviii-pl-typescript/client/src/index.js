import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Roteador from './componentes/roteadorBarraFooter/roteador';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Roteador />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();