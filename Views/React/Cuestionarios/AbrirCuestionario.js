import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import CPreguntas from '../../../Controllers/ControllerPreguntas';
import NewWindow from 'react-new-window';
import Proyector from '../Pantallas/Proyector';
import Barra from '../Barra';
import Usuario from '../../../Controllers/ControllerModificarDatos';

class AbrirCuestionario extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            socketP: '',
            idCues: -1,
            listaPre: Array(),
            idPre: -1,
            radioPul: -1,
            enviar: true,
            nombre: ''
        };
    }

    componentWillMount() {
        var socket = io.connect('/');
        
        this.setState({
            idCues: this.props.match.params.id,
            socketP: socket
        });

        this.actualizarNombre()

        socket.on('errorPregunta', (codError) => {
            if(codError == 0) {
                document.getElementById('info').innerHTML = "Ya hay una pregunta en curso";
            }
        })

        socket.on('pregEnviadas', this.actualizarRespondidas)

        socket.emit('nuevaSesion', this.props.match.params.id);
    }

    actualizarNombre = async () => {
        var usuario = await Usuario.handleData();
        this.setState({
            nombre: usuario.nombre
        });
    }

    actualizarRespondidas = (respondidas) => {
        for (var i = this.state.listaPre.length - 1; i >= 0; i--) {
            if (respondidas.includes(this.state.listaPre[i].id_pre)) { 
                this.state.listaPre.splice(i, 1);
            }
        }
        this.montarTabla();
        this.crearListeners();
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
        document.getElementById('atras').style.display = "none";
    }

    //Crear listeners de los radiobuttons
    crearListeners() {
        for (var i = 0; i < this.state.listaPre.length; i++) {
            if(document.getElementById("Elegido" + i) !== null)
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
        var pregunta = {id: seleccionada.id_pre,
                        preg: seleccionada.pregunta, 
                        res1: seleccionada.respuesta1, 
                        res2: seleccionada.respuesta2, 
                        res3: seleccionada.respuesta3, 
                        res4: seleccionada.respuesta4, 
                        correcta: seleccionada.correcta,
                        timer: seleccionada.tiempo
        };
        
        document.getElementById('info').innerHTML = "";

        this.state.socketP.emit('enviarPregunta', pregunta);
    }

    terminarSesion = e => {
        e.preventDefault()
        this.state.socketP.emit('terminarSesion', this.state.idCues)
        document.getElementById('enviarPreg').style.display = "none";
        document.getElementById('termSesion').style.display = "none";
        document.getElementById('proyector').style.display = "none";
        document.getElementById('atras').style.display = "inline";
    }

    atras = e => {
        this.props.history.push(`/Cuestionarios`)
    }

    render() {
        return(
            <React.Fragment>
                <Barra user={this.state.nombre}/><br/>
                <h1 id="titulo" align="center"> Realizar Cuestionario</h1>

                <form align="center" id="form">
                    <table align="center" id="tabla">
                    </table>
                    <br></br>
                    <button id="enviarPreg" type="submit" onClick={this.enviarPregunta}> Enviar Pregunta </button>
                    <button id="termSesion" type="submit" onClick={this.terminarSesion}> Terminar sesión </button>
                    <button id="atras" type="submit" onClick={this.atras}> Volver atrás </button>
                    <p align="center" id="info"></p>
                </form>
                <br></br>
                <p id="proyector" align="center"> <Link to={`/Proyector/${this.state.idCues}`} target="_blank"> Abrir proyector </Link> </p>
                
                <NewWindow title="Proyector" copyStyles="true" url={`/Proyector/${this.state.idCues}`} />

            </React.Fragment>
        );
    }
}

export default AbrirCuestionario;