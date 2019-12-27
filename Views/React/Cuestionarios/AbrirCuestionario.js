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

    componentWillMount() {
        var socket = io.connect('/');

        this.setState({
            idCues: this.props.match.params.id,
            socketP: socket
        });
    }

    async componentDidMount() {
        // Obtener las preguntas del cuestionario y guardarlas
        var preguntas = await CPreguntas.handleData(this.props.match.params.id);
        this.setState({
            listaPre: preguntas
        })
        
        // Montar la tabla con las preguntas guardadas
        this.montarTabla()

        // Crear los listeners de los radiobuttons
        this.crearListeners();
    }

    // Montar la tabla de las preguntas
    montarTabla() {
        var table = `<tr> <th> Id cuestionario: ${this.state.idCues} </th> </tr>`;
        for (var i = 0; i < this.state.listaPre.length; i++) {
            table += `<tbody id="Fila${i}">
            <tr> <th> Pregunta: ${this.state.listaPre[i].pregunta} </th> 
                        <td align="center"> <input type="radio" id="Elegido${i}" name="unico" value=${i} /> </td> </tr>
                        </tbody>`;
        }
        document.getElementById("tabla").innerHTML = table;
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
        var pregunta = {preg: seleccionada.pregunta, 
                        res1: seleccionada.respuesta1, 
                        res2: seleccionada.respuesta2, 
                        res3: seleccionada.respuesta3, 
                        res4: seleccionada.respuesta4, 
                        timer: seleccionada.tiempo
                    };

        this.state.socketP.emit('submitQuestion', pregunta);
    }

    render() {
        return(
            <React.Fragment>
                <h1 id="titulo" align="center"> Realizar Cuestionario</h1>

                <form align="center" id="form">
                    <table align="center" id="tabla">
                    </table>
                    <br></br>
                    <button type="submit" onClick={this.enviarPregunta}> Enviar Pregunta </button>
                </form>
                <br></br>
                <p align="center"> <Link to={`/Proyector/${this.state.idCues}`} target="_blank"> Abrir proyector </Link> </p>
                
                <NewWindow title="Proyector" copyStyles="true" url={`/Proyector/${this.state.idCues}`} />

            </React.Fragment>
        );
    }
}

export default AbrirCuestionario;