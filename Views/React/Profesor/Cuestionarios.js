import React from 'react';
import { Link } from 'react-router-dom';
import CCuestionarios from '../../../Controllers/CCuestionarios';

class Cuestionarios extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listaCues: Array()
        }
    }
    
    async componentDidMount() {
        var datos = await CCuestionarios.handleData();

        var boton = document.getElementById('Insert');
        boton.style.display = "none";
        var boton = document.getElementById('Mod');
        boton.style.display = "none";  
        
        this.montarTabla(datos);
    }

    nuevaFila = async e => {
        e.preventDefault();
        var nuevafila = `<tr>
        <td> default </td> 
        <td><input id="Nombre" type="text" /></td> 
        <td><input id="Asignatura" type="text" /></td>
        </tr>`;

        var boton = document.getElementById('Insert');
        boton.style.display = "inline";

        var table = document.getElementById("tabla").innerHTML + nuevafila;
        document.getElementById("tabla").innerHTML = table;
    }

    insertar = async e => {
        e.preventDefault();

        var a = await CCuestionarios.handleInsert();

        this.componentDidMount();   
    }

    montarTabla(datos) {

        this.setState({
            listaCues: datos,
        });

        var table = `<tr>
        <th>Id cuestionario</th>
        <th>Nombre del cuestionario</th>
        <th>Asignatura</th>
        <th>Seleccionado</th>
        </tr>`;

        for (var i = 0; i < this.state.listaCues.length; i++) {
            table += `<tr>
                    <td>${this.state.listaCues[i].id_cues}</td> <td>${this.state.listaCues[i].nombre_cues}</td> <td>${this.state.listaCues[i].asignatura}</td>
                    <td><input type="radio" name="Elegido" value=${i} /> </td>
                </tr> `;
        }
        document.getElementById("tabla").innerHTML = table;
    }

    async saberCuestionario() {
        var encontrado = false;
        var pos = -1;

        for (var i = 0; i < this.state.listaCues.length; i++) {

            if (document.forms["form"].elements[i].checked) {
                pos = i;
                encontrado = true;
                break;
            }
        }
        return pos;
    }

    handleSubmit = e => {
        e.preventDefault();
        
    }

    handleMod = async e => {
        e.preventDefault();

        var table = `<tr>
        <th id="id_cues">Id cuestionario</th>
        <th>Nombre del cuestionario</th>
        <th>Asignatura</th>
        <th>Seleccionado</th>
        </tr>`;

        for (var i = 0; i < this.state.listaCues.length; i++) {
            table += `<tr>
                    <td id="id${i}">${this.state.listaCues[i].id_cues}</td> 
                    <td><input id="Nom${i}" type="text" value=${this.state.listaCues[i].nombre_cues} /></td> 
                    <td><input id="Asig${i}" type="text" value=${this.state.listaCues[i].asignatura} /></td>
                    <td><input type="radio" name="Elegido" value=${i} /> </td>
                </tr> `;
        }

        document.getElementById("tabla").innerHTML = table;

        var boton = document.getElementById('Mod');
        boton.style.display = "inline";
    }

    //Si le pongo id="Nom${i}" id="Asig${i}" cuando monto la tabla seguramente pueda acceder a la fila
    modificar = async e => {
        e.preventDefault();

        var a = await CCuestionarios.handleModifications(this.state.listaCues.length);

        this.componentDidMount();
    }

    handleDelete = async e => {
        e.preventDefault();
        var pos = await this.saberCuestionario();
        var datos = await CCuestionarios.handleDelete(this.state.listaCues[pos].id_cues);

        if (datos == 'true') {
            var copia = [].concat(this.state.listaCues);
            copia.splice(pos,1);
            this.montarTabla(copia);
        }
    }

    render() {
        return(
            <React.Fragment>
                
                <div align="center">
                    <h1> Lista de cuestionarios</h1>
                    <form id="form">
                    <table id="tabla">
                    </table>
                    <button type="submit" onClick={this.handleSubmit}> Añadir Preguntas </button>
                    <button type="submit" onClick={this.handleMod}> Modificar Cuestionarios </button>
                    <button type="submit" onClick={this.handleDelete}> Eliminar Cuestionario </button>
                    <button type="submit" onClick={this.nuevaFila}> Añadir Cuestionario </button>
                    <p><button type="submit" id="Insert" onClick={this.insertar}> Aceptar Cambios </button></p>
                    <p><button type="submit" id="Mod" onClick={this.modificar}> Aceptar Cambios </button></p>
                    </form>
                    <p> <Link to="/Profesor/CrearCuestionario"> Crear cuestionario </Link> </p>
                </div>
            </React.Fragment>
        )
    }

}

export default Cuestionarios;