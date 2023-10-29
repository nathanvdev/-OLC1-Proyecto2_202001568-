import React, { Fragment,useState } from 'react';

function Errores(){
    const listaErrores = window.listaErrores
    console.log(listaErrores)
    return(
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Descripcion</th>
                                    <th scope="col">Fila</th>
                                    <th scope="col">Columna</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaErrores.map((error, index) => (
                                    <tr key={index}>
                                        <td>{error.Type}</td>
                                        <td>{error.Message}</td>
                                        <td>{error.Line}</td>
                                        <td>{error.Column}</td>
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
export default Errores;