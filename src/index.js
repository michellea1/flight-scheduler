import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { FlightScheduleProvider } from './store/flight-schedule-context'

ReactDOM.render(
  <FlightScheduleProvider>
    <App />
  </FlightScheduleProvider>, 
  document.getElementById('root')
);