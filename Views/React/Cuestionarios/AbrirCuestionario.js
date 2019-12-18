import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import CPreguntas from '../../../Controllers/ControllerPreguntas';
import NewWindow from 'react-new-window';
import Proyector from '../Pantallas/Proyector';

class AbrirCuestionario extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            socketP: '',
            idCues: -1,
            listaPre: Array(),
            idPre: -1,
            radioPul: -1
        };
    }

    async componentWillMount() {

        //Obtenemos las preguntas del cuestionario
        var preguntas = await CPreguntas.handleData(this.props.match.params.id);

        var socket = io.connect('/');

        this.setState({
            idCues: this.props.match.params.id,
            socketP: socket
        });

        console.log('Socket del cuestionario: ', this.state.socketP.id);
        
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
            <tr> <th> Pregunta: ${this.state.listaPre[i].pregunta} </th> 
                        <td align="center"> <input type="radio" id="Elegido${i}" name="unico" value=${i} /> </td> </tr>
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
    
    enviarPregunta = e => {
        e.preventDefault();

        var pos = this.state.radioPul;
        var seleccionada = this.state.listaPre[pos];
        var timer = document.getElementById("timer").value;
        var pregunta = {preg: seleccionada.pregunta, 
                        res1: seleccionada.respuesta1, 
                        res2: seleccionada.respuesta2, 
                        res3: seleccionada.respuesta3, 
                        res4: seleccionada.respuesta4, 
                        timer: timer
                    };

        this.state.socketP.emit('submitQuestion', pregunta);
    }

    render() {
        return(
            <React.Fragment>
                <h1 align="center"> Realizar Cuestionario</h1>

                <form align="center" id="form">
                    <p> Tiempo en segundos de las preguntas: </p>
                    <p> <input id="timer" type="number" min="5" max="20"></input> </p>
                    <table align="center" id="tabla">
                    </table>
                    <br></br>
                    <button type="submit" onClick={this.enviarPregunta}> Enviar Pregunta </button>
                </form>
                <br></br>
                <p align="center"> <Link to={`/Proyector/${this.state.idCues}`}> Mostrar PIN </Link> </p>
                
                <NewWindow>    
                <Proyector />
                </NewWindow>
                
            </React.Fragment>
        );
    }
}

export default AbrirCuestionario;