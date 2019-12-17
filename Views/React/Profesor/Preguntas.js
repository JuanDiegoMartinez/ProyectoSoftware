import React from 'react';
import { Link } from 'react-router-dom';
import CPreguntas from '../../../Controllers/CPreguntas';

class Preguntas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id_cues: -1,
            listaPre: Array()
        }
    }
    
    async componentDidMount() {

        //Falta obtener el id_cues
        var datos = await CPreguntas.handleData(this.props.match.params.id);
        console.log(datos);

        var boton = document.getElementById('Insert');
        boton.style.display = "none";
        var boton = document.getElementById('Mod');
        boton.style.display = "none"; 
        
        console.log(this.props.match.params.id);
        
        this.montarTabla(datos);
    }

    nuevaFila = async e => {
        e.preventDefault();
        var nuevafila = `<tr>
        <td> default </td>
        <td> default </td>  
        <td><input id="Pregunta" type="text" /></td> 
        <td><input id="Respuesta" type="text" /></td>
        <td><input id="Correcta" type="text" /></td>
        </tr>`;

        var boton = document.getElementById('Insert');
        boton.style.display = "inline";

        var table = document.getElementById("tabla").innerHTML + nuevafila;
        document.getElementById("tabla").innerHTML = table;
    }

    insertar = async e => {
        e.preventDefault();

        var a = await CPreguntas.handleInsert();

        this.componentDidMount();   
    }

    montarTabla(datos) {

        this.setState({
            id_cues: this.props.match.params.id,
            listaPre: datos
        });

        var table = `<tr>
        <th> Id cuestionario: ${this.state.id_cues} </th>
        </tr>`;

        for (var i = 0; i < this.state.listaPre.length; i++) {
            table += `<tr> <th> Id pregunta: ${this.state.listaPre[i].id_pre} Pregunta: ${this.state.listaPre[i].pregunta} </th> </tr>
                        <tr> <td> Respuesta 1: ${this.state.listaPre[i].respuesta1} Respuesta 2: ${this.state.listaPre[i].respuesta2}
                        Respuesta 3: ${this.state.listaPre[i].respuesta3} Respuesta 4: ${this.state.listaPre[i].respuesta4} </td> </tr>
                        <tr> <td align="center"> Correcta: ${this.state.listaPre[i].correcta} </td> </tr>
                        <tr> <td align="center"> <input type="radio" name="Elegido" value=${i} /> </td> </tr>`;
        }
        document.getElementById("tabla").innerHTML = table;
    }

    async saberPregunta() {
        var encontrado = false;
        var pos = -1;

        for (var i = 0; i < this.state.listaPre.length; i++) {

            if (document.forms["form"].elements[i].checked) {
                pos = i;
                encontrado = true;
                break;
            }
        }
        return pos;
    }

    handleMod = async e => {
        e.preventDefault();

        var table = `<tr>
        <th>Id cuestionario</th>
        <th>Id pregunta</th>
        <th>Pregunta</th>
        <th>Respuesta</th>
        <th>Correcta</th>
        </tr>`;

        for (var i = 0; i < this.state.listaPre.length; i++) {
            table += `<tr>
                    <td id="idC${i}">${this.state.listaPre[i].id_cues}</td>
                    <td id="idP${i}">${this.state.listaPre[i].id_pre}</td>  
                    <td><input id="pregunta${i}" type="text" value=${this.state.listaPre[i].pregunta} /></td> 
                    <td><input id="respuesta${i}" type="text" value=${this.state.listaPre[i].respuesta} /></td>
                    <td><input id="correcta${i}" type="text" value=${this.state.listaPre[i].correcta} /></td>
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

        var a = await CPreguntas.handleModifications(this.state.listaPre.length);

        this.componentDidMount();
    }

    handleDelete = async e => {
        e.preventDefault();
        var pos = await this.saberPregunta();
        var datos = await CPreguntas.handleDelete(this.state.listaPre[pos].id_cues, this.state.listaPre[pos].id_pre);

        if (datos == 'true') {
            var copia = [].concat(this.state.listaPre);
            copia.splice(pos,1);
            this.montarTabla(copia);
        }
    }

    render() {
        return(
            <React.Fragment>
                
                <div align="center">
                    <h1> Preguntas del cuestionario: </h1>
                    <form id="form">
                    <table id="tabla">
                    </table>
                    <button type="submit" onClick={this.handleMod}> Modificar Preguntas </button>
                    <button type="submit" onClick={this.handleDelete}> Eliminar Pregunta </button>
                    <button type="submit" onClick={this.nuevaFila}> Añadir Nueva Pregunta </button>
                    <p><button type="submit" id="Insert" onClick={this.insertar}> Aceptar Cambios </button></p>
                    <p><button type="submit" id="Mod" onClick={this.modificar}> Aceptar Cambios </button></p>
                    </form>
                </div>
            </React.Fragment>
        )
    }

}

export default Preguntas;