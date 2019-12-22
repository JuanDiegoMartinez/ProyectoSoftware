import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import Usuario from '../../../Controllers/ControllerModificarDatos';
import espera from './Todo';

class MostrarPregunta extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            nombre: '',
            user: '',
            contador: -1
        };
    }

    async componentDidMount() {
        // Ocultar espera
        var espera = document.getElementById('pregunta');
        espera.style.display = "none";

        var usuario = await Usuario.handleData();

        var socket = io.connect('/');
        socket.emit('nuevoUsuario', usuario.nombre);

        this.setState({
            user: socket,
            nombre: usuario.nombre,
        });

        this.state.user.on('deliverQuestion', function(pregunta) {
            // Ocultar espera
            var espera = document.getElementById('espera');
            espera.style.display = "none";

            // Mostrar timer y opciones A, B, C y D
            var tim = document.getElementById('timer');
            tim.style.display = "inline";
            var preg = document.getElementById('pregunta');
            preg.style.display = "inline";

            let counter = parseInt(pregunta.timer);
            let k = setInterval(function() {
                counter--;
                document.getElementById("timer").innerHTML = `Quedan ${counter} segundos`;
                if (counter <= 0) {
                    clearInterval(k);
                    
                    // Mostrar espera (en un futuro, los puntos)
                    var espera = document.getElementById('espera');
                    espera.style.display = "inline";

                    // Ocultar timer y opciones A, B, C y D
                    var tim = document.getElementById('timer');
                    tim.style.display = "none";
                    var preg = document.getElementById('pregunta');
                    preg.style.display = "none";
                    
                }
            }, 1000);
        });
    }



    respuestaA() { 
        var espera = document.getElementById('espera');
        espera.style.display = "inline";
        var tim = document.getElementById('timer');
        tim.style.display = "none";
        var preg = document.getElementById('pregunta');
        preg.style.display = "none";
        var socket = io.connect('/');
        socket.emit('answerQuestion', 1); 
    }
    respuestaB() { 
        var espera = document.getElementById('espera');
        espera.style.display = "inline";
        var tim = document.getElementById('timer');
        tim.style.display = "none";
        var preg = document.getElementById('pregunta');
        preg.style.display = "none";
        var socket = io.connect('/');
        socket.emit('answerQuestion', 2); 
    }
    respuestaC() { 
        var espera = document.getElementById('espera');
        espera.style.display = "inline";
        var tim = document.getElementById('timer');
        tim.style.display = "none";
        var preg = document.getElementById('pregunta');
        preg.style.display = "none";
        var socket = io.connect('/');
        socket.emit('answerQuestion', 3); 
    }
    respuestaD() { 
        var espera = document.getElementById('espera');
        espera.style.display = "inline";
        var tim = document.getElementById('timer');
        tim.style.display = "none";
        var preg = document.getElementById('pregunta');
        preg.style.display = "none";
        var socket = io.connect('/');
        socket.emit('answerQuestion', 4); 
    }
   
    render() {
        return(
            <React.Fragment>
            <div id="espera">
                {espera.esperaEnvioPregunta()}
            </div>
            <div id="pregunta">
                <button className="botonesresp" onClick={this.respuestaA} id="boton1" value="1">A</button> 
                <button className="botonesresp" onClick={this.respuestaB} id="boton2" value="2">B</button>
                <button className="botonesresp" onClick={this.respuestaC} id="boton3" value="3">C</button> 
                <button className="botonesresp" onClick={this.respuestaD} id="boton4" value="4">D</button>
            </div>
            <div id="timer"> </div>  
                
            </React.Fragment>
        );
    }
}

export default MostrarPregunta;