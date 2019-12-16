import React from 'react';
import { Link } from 'react-router-dom';
import CCuestionarios from '../../../Controllers/CCuestionarios';

class Cuestionarios extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listaCues: Array(2),
        }
    }
    /*
    async mostrarCuestionarios() {
        // Obtener los datos de los cuestionarios desde la bbdd
        var datos = await CCuestionarios.handleData();

        var listaCues = [];
        
        const listaCst = [
            ["Tema 1", "Bases de Datos", 7, <button type="submit" onClick={this.handleSubmit}>Activar</button>],
            ["Backtracking", "Algoritmia", 11],
            ["General", "Estructura de computadores", 5],
        ]; // Mock temporal para testear


        for (var i = 0; i < 2; i++) {
            console.log(datos[i].id_cues);
            console.log(datos[i].nombre_cues);
            console.log(datos[i].asignatura);
            listaCues.push({id_cues: datos[i].id_cues, nombre_cues: datos[i].nombre_cues, asignatura: datos[i].asignatura});
        }
        console.log(listaCues);

        this.setState({
            listaCues: datos,
        });

        // Generar el código html correspondiente y devolverlo
        // return (listaCues.map(function(item, i) {
        //      return (
        //      <tr key={i}>
        //          <td>{item[i].id_cues}</td>
        //          <td>{item[i].nombre_cues}</td>
        //          <td>{item[i].asignatura}</td>
        //      </tr>
        //      )
        // }));
    }
    */

    async componentDidMount() {
        var datos = await CCuestionarios.handleData();

        console.log('datos: ', datos);
        console.log('datos0: ', datos[0]);
        
        this.setState({
              listaCues: datos,
        });

        console.log('state: ', this.state.listaCues);
        
        for (var i = 0; i < 2; i++) {
            console.log(this.state.listaCues[i].id_cues);
            console.log(this.state.listaCues[i].nombre_cues);
            console.log(this.state.listaCues[i].asignatura);
        }

        this.hola();
    }

    hola() {
        console.log('hola: ', this.state.listaCues);

        return (this.state.listaCues.map(function(item, i) {
            return (
                <tr key={i}>
                    <td>{item[i].id_cues}</td>
                    <td>{item[i].nombre_cues}</td>
                    <td>{item[i].asignatura}</td>
                </tr>
            )
        }));
    }

    handleSubmit() {
        var a = document.getElementById('id_cues');
        a.style.display = "none";
    }

    render() {
        return(
            <React.Fragment>
                <div align="center">
                    <h1> Lista de cuestionarios</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th id="id_cues">Id cuestionario</th>
                                <th>Nombre del cuestionario</th>
                                <th>Asignatura</th>
                                <th>Botones</th>
                            </tr>
                        </tbody>
                    </table>
                    <p> <Link to="/Profesor/CrearCuestionario"> Crear cuestionario </Link> </p>
                </div>
            </React.Fragment>
        )
    }

}

export default Cuestionarios;