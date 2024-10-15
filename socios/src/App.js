import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './screen/Login';
import Home from './screen/Home';
import Profile from './screen/Profile';
import Table from './screen/Table';
import Cuota from './screen/Quota';
import Pay from './screen/Pay';
import New from './components/New'; 
import EditarPago from './components/EditPayment';
import PagoForm from './components/PayForm';
import EditarSocio from './components/EditMember';
import AgregarSocio from './components/AddMember';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/perfil' element={<Profile />} />
        <Route exact path='/table' element={<Table />} />
        <Route exact path='/cuota' element={<Cuota />} />
        <Route exact path='/pay' element={<Pay />} />
        <Route exact path='/nuevo-pago' element={<New />} />
        <Route path="/editar-pago/:id" element={<EditarPago />} />       
        <Route path="/pagar-cuota/:id" element={<PagoForm />} />
        <Route path="/editar-socio/:nro_socio" element={<EditarSocio />} />
        <Route path="/agregar-socio" element={<AgregarSocio />} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
