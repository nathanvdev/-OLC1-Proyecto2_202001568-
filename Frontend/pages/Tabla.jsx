import React, { Fragment,useState } from 'react';


function Tabla() {
  //traer lista que esta en home
    const listaVariables = window.listaVariables
    console.log(listaVariables)
  return (
    <Fragment>
      
      <div className="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Variable</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Ambito</th>
                  <th scope="col">Fila</th>
                  <th scope="col">Columna</th>
                </tr>
              </thead>
              <tbody>
                {listaVariables.map((variable, index) => (
                  <tr key={index}>
                    <td>{variable.ID}</td>
                    <td>{variable.Value}</td>
                    <td>{variable.Tipo}</td>
                    <td>{variable.Ambito}</td>
                    <td>{variable.Linea}</td>
                    <td>{variable.Columna}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      


    </Fragment>
  );
}

export default Tabla;