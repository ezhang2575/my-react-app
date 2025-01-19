import React from 'react';
import ReactDOM from 'react-dom/client';
import MonthlyMetrics from './MonthlyMetrics';
import MaintenanceDualView from './MaintenanceDualView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      <MonthlyMetrics />
      <MaintenanceDualView />
    </div>
  </React.StrictMode>
);
