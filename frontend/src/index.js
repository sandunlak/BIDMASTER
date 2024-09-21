import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AssignSeats from './components/AssignSeats';
import Table from './components/Table';
import SeatingPlan from './components/SeatingPlan';


import BMICH from './components/BMICH';
import NegomboRegal from './components/NegomboRegal';
import JoashPlaceMaharagama from './components/JoashPlaceMaharagama';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/AssignSeats' element={<AssignSeats/>}/>
      <Route path='/Table' element={<Table/>}/>
      <Route path='/SeatingPlan' element={<SeatingPlan/>}/>

      <Route path='/BMICH' element={<BMICH/>}/>
      <Route path='/NegomboRegal' element={<NegomboRegal/>}/>
      <Route path='/JoashPlaceMaharagama' element={<JoashPlaceMaharagama/>}/>

    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

