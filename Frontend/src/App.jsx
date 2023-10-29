
import React from 'react'

import './App.css'
import { Navbar } from "../pages/navbar";
import Tabla from "../pages/Tabla";
import Errores from "../pages/Errores";
import Arboles from "../pages/Arboles";
import { Navigate, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/home";
import { Fragment } from "react";
function App() {
  window.listaVariables = []
  window.listaErrores = []
  return (
    <>
      <Navbar />
       <hr />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tabla" element={<Tabla />} />
        <Route path="/Arboles" element={<Arboles/>} />
        <Route path="/Errores" element={<Errores />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>

    
    </>
  );
}

  // return (
  //   <div>
  //  <h1>hello world</h1>
  //  <h2>hola mundo</h2>
  //  <button onClick={async () =>{
  //   const response = await fetch('http://localhost:3000/')
  //   const data =  await response.json()
  //   console.log(data);
  //  }}>
  //   obtener datos
  //  </button>
  //   </div>
  // )


export default App
