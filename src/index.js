import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NodeProvider } from './context/node';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NodeProvider>
      <App />
    </NodeProvider>
  </React.StrictMode>
);

