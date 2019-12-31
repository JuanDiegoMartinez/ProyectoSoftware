import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import CCuestionarios from '../../../Controllers/ControllerCuestionarios';

class Cuestionarios extends React.Component {

    constructor(props) {
        super(props);
        
        //Lista de cuestionarios, saber el cuestionario pulsado, saber el radio button pulsado
        this.state = {
            listaCues: Array(),
            seleccionado: -1,
            radioPul: -1
        }
    }
    
    async componentDidMount() {

        //Obtener los cuestionarios del usuario
        var cuestionarios = await CCuestionarios.handleData();

        var boton = document.getElementById('Insert');
        boton.style.display = "none";
        var boton = document.getElementById('Mod');
        boton.style.display = "none";
        
        //Montar la tabla de los cuestionarios
        this.montarTabla(cuestionarios);
    }

    //Montar la tabla de los cuestionarios
    montarTabla(cuestionarios) {

        //Actualizar el estado con los cuestionarios
        this.setState({
            listaCues: cuestionarios,
        });

        //Obtenemos la tabla y añadimos los cuestionarios
        var table = `<tr>
        <th>Nombre del cuestionario</th>
        <th>Asignatura</th>
        <th>Seleccionado</th>
        </tr>`;

        for (var i = 0; i < this.state.listaCues.length; i++) {
            table += `<tr id="Fila${i}">
                    <td>${this.state.listaCues[i].nombre_cues}</td> 
                    <td>${this.state.listaCues[i].asignatura}</td>
                    <td><input type="radio" id="Elegido${i}" name="unico" value=${i} /> </td>
                    </tr> `;
        }

        document.getElementById("tabla").innerHTML = table;

        //Crear los listeners de los radiobuttons
        this.crearListeners();
    }

    //Crear listeners de los radiobuttons
    crearListeners() {

        for (var i = 0; i < this.state.listaCues.length; i++) {
            document.getElementById("Elegido" + i).addEventListener("change", this.saberCuestionario);
        }
    }

    //Obtener el cuestionario seleccionado
    saberCuestionario = e =>  {
        e.preventDefault();
        
        var id = this.state.listaCues[e.target.value].id_cues;

        this.setState({
            seleccionado: id,
            radioPul: e.target.value
        });
    }

    //Crear un nuevo cuestionario
    nuevoCuestionario = async e => {
        e.preventDefault();

        var nuevafila = `<tr>
        <td><input id="Nombre" type="text" /></td> 
        <td><input id="Asignatura" type="text" /></td>
        <td><input id="Asignatura" type="radio" disabled /></td>
        </tr>`;

        var boton = document.getElementById('Insert');
        boton.style.display = "inline";

        var table = document.getElementById("tabla").innerHTML + nuevafila;
        document.getElementById("tabla").innerHTML = table;
    }

    //Insertar el nuevo cuestionario en la bbdd
    insertar = async e => {
        e.preventDefault();

        var a = await CCuestionarios.handleInsert();

        this.componentDidMount();   
    }

    //Modificar datos del cuestionario
    modificarCuestionario = async e => {
        e.preventDefault();

        var pos = this.state.radioPul;

        console.log(this.state.listaCues[pos].nombre_cues)

        var fila = `
        <td><input id="Nombre" type="text" value="${this.state.listaCues[pos].nombre_cues}" /></td> 
        <td><input id="Asignatura" type="text" value="${this.state.listaCues[pos].asignatura}" /></td>
        <td><input type="radio" id="Elegido${pos}" name="unico" value="${pos}" disabled /> </td>`;

        document.getElementById("Fila" + pos).innerHTML = fila;
        
        var boton = document.getElementById('Mod');
        boton.style.display = "inline";
    }

    //Modificar el cuestionario en la bbdd
    modificar = async e => {
        e.preventDefault();

        var a = await CCuestionarios.handleModifications(this.state.seleccionado);

        this.componentDidMount();
    }

    //Borrar cuestionario
    borrarCuestionario = async e => {
        e.preventDefault();

        var pos = this.state.radioPul;
        var datos = await CCuestionarios.handleDelete(this.state.seleccionado);

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
                    <br></br>
                    <button type="submit" onClick={this.nuevoCuestionario}> Añadir Cuestionario </button>
                    <button type="submit" onClick={this.modificarCuestionario}> Modificar Cuestionario </button>
                    <button type="submit" onClick={this.borrarCuestionario}> Eliminar Cuestionario </button>
                    <p><button type="submit" id="Insert" onClick={this.insertar}> Aceptar Cambios </button></p>
                    <p><button type="submit" id="Mod" onClick={this.modificar}> Aceptar Cambios </button></p>
                    </form>
                    <p> <Link to={`/Preguntas/${this.state.seleccionado}`}>  Gestionar preguntas </Link> </p>
                    <p> <Link to={`/AbrirCuestionario/${this.state.seleccionado}`}>  Abrir cuestionario </Link> </p>
                    
                    
                </div>
            </React.Fragment>
        )
    }

}

export default Cuestionarios;