import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Usuario from '../../../Controllers/ControllerModificarDatos';
import espera from './Todo';
import Barra from '../Barra';

class MostrarPregunta extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            nombre: '',
            user: '',
            contador: -1
        };
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
        // Ocultar espera
        var espera = document.getElementById('pregunta');
        espera.style.display = "none";

        var usuario = await Usuario.handleData();

        var socket = io.connect('/');
        this.setState({
            user: socket,
            nombre: usuario.nombre,
        });

        this.state.user.on('errorSala', function(valor) {
            // Gestionar errores de la sala si fuese necesario
        })

        socket.emit('nuevoUsuario', {nombre: usuario.nombre, sala: this.props.match.params.id});

        // Elementos usados en las siguientes funciones
        var espera = document.getElementById('espera');
        var tim = document.getElementById('timer');
        var preg = document.getElementById('pregunta');
        var punt = document.getElementById('puntos')

        this.state.user.on('preguntaEnviada', function(pregunta) {
            // Ocultar espera
            espera.style.display = "none";
            punt.style.display = "none";

            // Mostrar timer y opciones A, B, C y D
            tim.innerHTML = `Quedan ${pregunta.timer} segundos`;
            tim.style.display = "block";
            preg.style.display = "block";
        });
        
        // Al recibir los segundos restantes, actualizar la vista
        this.state.user.on('segundosRestantes', function(segundos) {
            // Cambiar a modo espera si se acaba el tiempo
            if (segundos <= 0) {
                espera.style.display = "inline";
                punt.style.display = "block";
                tim.style.display = "none";
                preg.style.display = "none";

            // Si no, actualizar los segundos
            } else { 
                tim.innerHTML = `Quedan ${segundos} segundos`;
            }
        })

        // Al saber que se ha terminado la sesión actual, mostrar la puntuación final
        socket.on('sesionTerminada', function(codigo) {
            document.getElementById('espera').style.display = "none";
            document.getElementById('timer').innerHTML = "Cuestionario terminado";
            document.getElementById('timer').style.display = "block";
            document.getElementById('pregunta').style.display = "none";
            document.getElementById('puntos').style.display = "block";
        })

        // Al recibir los nuevos puntos, actualizar la vista
        this.state.user.on('nuevosPuntos', function(puntos) {
            punt.innerHTML = `Puntos: ${puntos}`;
        })
    }

    responder = (n) => {
        var espera = document.getElementById('espera');
        espera.style.display = "inline";
        var tim = document.getElementById('timer');
        tim.style.display = "none";
        var preg = document.getElementById('pregunta');
        preg.style.display = "none";
        var socket = this.state.user
        socket.emit('enviarRespuesta', {nombre: this.state.nombre, sala: this.props.match.params.id, resp: n}); 
    }

    respuestaA = () => { this.responder(1) }
    respuestaB = () => { this.responder(2) }
    respuestaC = () => { this.responder(3) }
    respuestaD = () => { this.responder(4) }
   
    render() {
        return(
            <React.Fragment>
            <Barra user={this.state.nombre}/><br/>
            <br/>
            <div id="espera">
                {espera.esperaEnvioPregunta()}
            </div>
            <p align="center">Sala: {this.props.match.params.id}</p>
            <div align="center" id="pregunta" height="100%" width="100%">
                <h1 align="center">Elige la respuesta correcta</h1>
                <br></br>
                <button className="botonesrespA" onClick={this.respuestaA} id="boton1" value="1">A</button> 
                <button className="botonesrespB" onClick={this.respuestaB} id="boton2" value="2">B</button>
                <button className="botonesrespC" onClick={this.respuestaC} id="boton3" value="3">C</button> 
                <button className="botonesrespD" onClick={this.respuestaD} id="boton4" value="4">D</button>
            </div>
            <br/><br/>
            <div id="timer" align="center"></div>
            <div id="puntos" align="center"></div>
            </React.Fragment>
        );
    }
}

export default MostrarPregunta;