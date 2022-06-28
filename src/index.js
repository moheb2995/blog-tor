import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

if("serviceWorker" in navigator){
  navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/serviceworker.js`)
  .then(res => console.log(res))
  .catch(()=>'no res')
}

reportWebVitals();
