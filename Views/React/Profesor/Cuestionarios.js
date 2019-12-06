import React from 'react';
import { Link } from 'react-router-dom';

class Cuestionarios extends React.Component {

    MostrarCuestionarios() {
        // Obtener los datos de los cuestionarios desde la bbdd
        const listaCst = [
            ["Tema 1", "Bases de Datos", 7, <button type="button">Activar</button>],
            ["Backtracking", "Algoritmia", 11],
            ["General", "Estructura de computadores", 5],
        ]; // Mock temporal para testear

        // Generar el código html correspondiente y devolverlo
        return (listaCst.map(function(item, i) {
            return (
            <tr key={i}>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
                <td>{item[2]}</td>
                <td>{item[3]}</td>
            </tr>
            )
        }));
    }

    render() {
        return(
            <React.Fragment>
                <div align="center">
                    <h1> Lista de cuestionarios</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>Nombre del cuestionario</th>
                                <th>Asignatura</th>
                                <th>Preguntas</th>
                                <th>Activa Cuest</th>
                            </tr>
                            {this.MostrarCuestionarios()} 
                        </tbody>
                    </table>
                    <p> <Link to="/Profesor/CrearCuestionario"> Crear cuestionario </Link> </p>
                </div>
            </React.Fragment>
        )
    }

}

export default Cuestionarios;