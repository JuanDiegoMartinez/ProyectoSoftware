import React from 'react';
import { Link } from 'react-router-dom';
import CPreguntas from '../../../Controllers/ControllerPreguntas';
import Barra from '../Barra';
import Usuario from '../../../Controllers/ControllerModificarDatos';

class Preguntas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listaPre: Array(),
            idCues: -1,
            radioPul: -1,
            idPre: -1,
            ultPre: -1           
        }
    }
    
    componentWillMount() {
        this.actualizarNombre()
    }

    actualizarNombre = async () => {
        var usuario = await Usuario.handleData();
        this.setState({
            nombre: usuario.nombre
        });
    }
    
    async componentDidMount() {

        //Obtenemos las preguntas del cuestionario
        var preguntas = await CPreguntas.handleData(this.props.match.params.id);
        var ultP = await CPreguntas.handleUltimaPregunta(this.props.match.params.id);

        this.setState({
            ultPre: ultP.max,
            idCues: this.props.match.params.id,
        });

        var boton = document.getElementById('Insert');
        boton.style.display = "none";
        var boton = document.getElementById('Mod');
        boton.style.display = "none"; 
        
        //Montar la tabla de las preguntas
        this.montarTabla(preguntas);
    }

    //Montar la tabla de las preguntas
    montarTabla(preguntas) {

        this.setState({
            listaPre: preguntas
        });

        var table = `<tr>
        <th> Id cuestionario: ${this.state.idCues} </th>
        </tr>`;

        for (var i = 0; i < this.state.listaPre.length; i++) {
            table += `<tbody id="Fila${i}">
            <tr> <th> Pregunta: ${this.state.listaPre[i].pregunta} </th> </tr>
                        <tr> <td> <p> Respuesta 1: ${this.state.listaPre[i].respuesta1} </p><p> Respuesta 2: ${this.state.listaPre[i].respuesta2} </p>
                        <p> Respuesta 3: ${this.state.listaPre[i].respuesta3} </p><p> Respuesta 4: ${this.state.listaPre[i].respuesta4} </p> </td> </tr>
                        <tr> <td align="center"> Correcta: ${this.state.listaPre[i].correcta} </td> </tr>
                        <tr> <td align="center"> Tiempo: ${this.state.listaPre[i].tiempo} </td> </tr>
                        <tr> <td align="center"> <input type="radio" id="Elegido${i}" name="unico" value=${i} /> </td> </tr>
                        </tbody>`;
        }
        document.getElementById("tabla").innerHTML = table;

        //Crear los listeners de los radiobuttons
        this.crearListeners();
    }

    //Crear listeners de los radiobuttons
    crearListeners() {

        for (var i = 0; i < this.state.listaPre.length; i++) {
            document.getElementById("Elegido" + i).addEventListener("change", this.saberPregunta);
        }
    }

    //Obtener la pregunta seleccionada
    saberPregunta = e => {
        e.preventDefault();
        
        var id = this.state.listaPre[e.target.value].id_pre;

        this.setState({
            idPre: id,
            radioPul: e.target.value
        });
    }

    //Crear una nueva pregunta
    nuevaPregunta = async e => {
        e.preventDefault();
        document.getElementById('nuevaPreg').disabled = true;
        document.getElementById('modifPreg').disabled = true;
        document.getElementById('elimPreg').disabled = true;
        for (var i = 0; i < this.state.listaPre.length; i++) {
            document.getElementById(`Elegido${i}`).disabled = true;
        }

        var nuevafila = ` 
        <tr> <td> Pregunta: <input class= "textolargo" id="Pregunta" type="text" /> </td> </tr>
        <tr> <td> <p> Respuesta1: <input class= "textolargo" id="Respuesta1" type="text" /> </p>
        <p> Respuesta2: <input class= "textolargo" id="Respuesta2" type="text" /> </p>
        <p> Respuesta3: <input class= "textolargo" id="Respuesta3" type="text" /> </p> 
        <p> Respuesta4: <input class= "textolargo" id="Respuesta4" type="text" /> </p> </td>  </tr>
        <tr> <td> Correcta: <input type="number" id="Correcta" min="1" max="4" /> </td> </tr>
        <tr> <td> Tiempo: <input type="number" id="Tiempo" min="1" /> </td> </tr>`;

        var boton = document.getElementById('Insert');
        boton.style.display = "inline";

        var table = document.getElementById("tabla").innerHTML + nuevafila;
        document.getElementById("tabla").innerHTML = table;
    }

    //Insertar la pregunta en la base de datos
    insertar = async e => {
        e.preventDefault();
        var ultPregunta = this.state.ultPre + 1;

        var a = await CPreguntas.handleInsert(this.state.idCues, ultPregunta);

        this.setState({
            ultPre: ultPregunta
        })

        document.getElementById('nuevaPreg').disabled = false;
        document.getElementById('modifPreg').disabled = false;
        document.getElementById('elimPreg').disabled = false;
        for (var i = 0; i < this.state.listaPre.length; i++) {
            document.getElementById(`Elegido${i}`).disabled = false;
        }
        this.componentDidMount();   
    }

    //Modificar datos de la pregunta
    modificarPregunta = async e => {
        e.preventDefault();
        var pos = this.state.radioPul;

        if(pos != -1) {
            document.getElementById('nuevaPreg').disabled = true;
            document.getElementById('modifPreg').disabled = true;
            document.getElementById('elimPreg').disabled = true;
            for (var i = 0; i < this.state.listaPre.length; i++) {
                document.getElementById(`Elegido${i}`).disabled = true;
            }

            // Fila a editar
            var fila = `<tr> <th> Pregunta: <input className= "textolargo" id="Pregunta" type="text" value=${this.state.listaPre[pos].pregunta} /> </th> </tr>
                            <tr> <td> <p> Respuesta 1: <input className= "textolargo" id="Respuesta1" value=${this.state.listaPre[pos].respuesta1} />
                            Respuesta 2: <input id="Respuesta2" className= "textolargo" value=${this.state.listaPre[pos].respuesta2} /> </p>
                            <p> Respuesta 3: <input id="Respuesta3" className= "textolargo" value=${this.state.listaPre[pos].respuesta3} /> 
                            Respuesta 4: <input id="Respuesta4" className= "textolargo" value=${this.state.listaPre[pos].respuesta4} /> </p> </td> </tr>
                            <tr> <td align="center"> Correcta: <input id="Correcta" type="number" min="1" max="4" value=${this.state.listaPre[pos].correcta} /> </td> </tr>
                            <tr> <td align="center"> Tiempo: <input id="Tiempo" type="number" min="1" value=${this.state.listaPre[pos].tiempo} /> </td> </tr>
                            <tr> <td align="center"> <input type="radio" id="Elegido${pos}" name="unico" value=${pos} disabled /> </td> </tr>`
            document.getElementById("Fila" + pos).innerHTML = fila;



            var boton = document.getElementById('Mod');
            boton.style.display = "inline";
        }
    }

    //Modificar la pregunta en la bbdd
    modificar = async e => {
        e.preventDefault();

        // Desbloquear los botones de crear/modificar/borrar pregunta
        document.getElementById('nuevaPreg').disabled = false;
        document.getElementById('modifPreg').disabled = false;
        document.getElementById('elimPreg').disabled = false;

        // Desbloquear los botones "seleccionado" de la tabla
        for (var i = 0; i < this.state.listaPre.length; i++) {
            document.getElementById(`Elegido${i}`).disabled = false;
        }

        var a = await CPreguntas.handleModifications(this.state.idCues, this.state.idPre);

        this.componentDidMount();
    }

    //Borrar pregunta
    borrarPregunta = async e => {
        e.preventDefault();

        var pos = this.state.radioPul;
        var datos = await CPreguntas.handleDelete(this.state.idCues, this.state.idPre);

        if (datos == 'true') {
            var copia = [].concat(this.state.listaPre);
            copia.splice(pos,1);
            this.montarTabla(copia);
        }
    }

    render() {
        return(
            <React.Fragment>
                <Barra user={this.state.nombre}/><br/>
                <div align="center">
                    <h1> Preguntas del cuestionario: </h1>
                    <form id="form">
                    <table id="tabla"> </table>

                    <button type="submit" id="nuevaPreg" onClick={this.nuevaPregunta}> Añadir Nueva Pregunta </button>
                    <button type="submit" id="modifPreg" onClick={this.modificarPregunta}> Modificar Pregunta </button>
                    <button type="submit" id="elimPreg" onClick={this.borrarPregunta}> Eliminar Pregunta </button>
                    <p><button type="submit" id="Insert" onClick={this.insertar}> Aceptar Cambios </button></p>
                    <p><button type="submit" id="Mod" onClick={this.modificar}> Aceptar Cambios </button></p>
                    </form>
                </div>
            </React.Fragment>
        )
    }

}

export default Preguntas;