import React from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import Controlador from '../../../Controllers/ControllerProyector';
import espera from './Todo';


class Proyector extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            nombre: '',
            user: '',
            contador: -1
        };
    }

    componentDidMount() {
        var socket = io.connect('/');
        var nResp = [0, 0, 0, 0] // Resultados de la pregunta actual
        var mapaPuntos = new Map()

        // Integer como nombre para diferenciarse de los alumnos
        socket.emit('nuevoUsuario', {nombre: this.props.match.params.id, 
            sala: this.props.match.params.id});

        // Cuando un alumno entra en la sala, poner sus puntos a 0
        socket.on('nuevoAlumnoEnSala', function(nombre) {
            mapaPuntos.set(nombre, 0)
            document.getElementById('alumnos').innerHTML += `<p id="alumno${nombre}"/>${nombre}: 0</p>`
        });

        // Al recibir una respuesta de un alumno, aumentar el número de respuestas correspondiente y actualizar vista
        socket.on('respuestaEnviada', function(respuesta) {
            // Si el alumno no estaba en el mapa se le añade
            if(!mapaPuntos.has(respuesta.nombre)) {
                document.getElementById('alumnos').innerHTML += `<p id="alumno${respuesta.nombre}"/>${respuesta.nombre}: ${respuesta.puntos}</p>`
            } else {
                document.getElementById(`alumno${respuesta.nombre}`).innerHTML = `${respuesta.nombre}: ${respuesta.puntos}`
            }
            mapaPuntos.set(respuesta.nombre, respuesta.puntos)
            
            // Respuestas por tipo
            nResp[respuesta.resp-1] += 1
            document.getElementById(`respuestas${respuesta.resp}`).innerHTML = `${nResp[respuesta.resp-1]}`;
        })

        // Al recibir una pregunta del profesor...
        socket.on('preguntaEnviada', function(pregunta) {

            // Borrar los resultados de la pregunta anterior
            nResp = [0, 0, 0, 0]
            document.getElementById('respuestas1').innerHTML = `0`;
            document.getElementById('respuestas2').innerHTML = `0`;
            document.getElementById('respuestas3').innerHTML = `0`;
            document.getElementById('respuestas4').innerHTML = `0`;

            // Ocultar bienvenida
            var bienvenida = document.getElementById('bienvenida');
            bienvenida.style.display = "none";

            // Crear la tabla con la pregunta y las respuestas
            var table = `<tr> <th>${pregunta.preg} </th> </tr>
                         <tr> <td> A: ${pregunta.res1} </td> </tr>
                         <tr> <td> B: ${pregunta.res2} </td> </tr>
                         <tr> <td> C: ${pregunta.res3} </td> </tr>
                         <tr> <td> D: ${pregunta.res4} </td> </tr>`;

            // Ocultar espera
            var espera = document.getElementById('espera');
            espera.style.display = "none";

            // Mostrar timer y tabla creada
            document.getElementById("timer").innerHTML = `Quedan ${pregunta.timer} segundos`;
            var tim = document.getElementById('timer');
            tim.style.display = "block";
            document.getElementById('pregunta').innerHTML = table;
            var preg = document.getElementById('pregunta');
            preg.style.display = "inline";
        });

        // Al recibir los segundos restantes, actualizar la vista
        socket.on('segundosRestantes', function(segundos) {
            document.getElementById("timer").innerHTML = `Quedan ${segundos} segundos`;

            // Y cambiar a modo espera si se acaba el tiempo
            if (segundos <= 0) {
                var espera = document.getElementById('espera');
                espera.style.display = "inline";
                var tim = document.getElementById('timer');
                tim.style.display = "none";
                var preg = document.getElementById('pregunta');
                preg.style.display = "none";
            }
        })
    }
   
    render() {
        return(
            <React.Fragment>
            <h1 align="center">Proyector</h1>
            <p align="center" id="bienvenida">
                Bienvenido al proyector<br/>
                Envía una pregunta del cuestionario para comenzar<br/>
                Los resultados de las preguntas aparecerán en la tabla que hay debajo<br/>
            </p>
            <div id="espera" style={{display: "none"}}>
                {espera.esperaEnvioPregunta()}
            </div>
            <form align="center"> 
                <table id="tabla" id="pregunta"></table>
            </form> 
            <br/>
            <p align="center" id="timer"></p>  
            <br/>
            <br/>
            <table align="center">
                <tbody>
                <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                </tr>
                <tr>
                    <td align="center" id="respuestas1">0</td>  
                    <td align="center" id="respuestas2">0</td>  
                    <td align="center" id="respuestas3">0</td>  
                    <td align="center" id="respuestas4">0</td>  
                </tr>
                </tbody>
            </table>
            <p align="center"><b>Puntos:</b></p>
            <p id="alumnos" align="center"></p>
            </React.Fragment>
        );
    }
}

export default Proyector;