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
        socket.id = "Proyector";

        // Resultados de la pregunta actual
        var nResp = [0, 0, 0, 0]
        socket.on('deliverQuestion', function(pregunta) {
            document.getElementById('respuestasA').innerHTML = `0`;
            document.getElementById('respuestasB').innerHTML = `0`;
            document.getElementById('respuestasC').innerHTML = `0`;
            document.getElementById('respuestasD').innerHTML = `0`;

            // Ocultar bienvenida
            var bienvenida = document.getElementById('bienvenida');
            bienvenida.style.display = "none";

            var table = `<tr> <th>${pregunta.preg} </th> </tr>
                         <tr> <td> <button disabled id="boton1" value="1">A: ${pregunta.res1}</button> 
                                   <button disabled id="boton2" value="2">B: ${pregunta.res2}</button>  </td> </tr>
                         <tr> <td> <button disabled id="boton3" value="3">C: ${pregunta.res3}</button> 
                                   <button disabled id="boton4" value="4">D: ${pregunta.res4}</button> </td> </tr>`;

            // Ocultar espera
            var espera = document.getElementById('espera');
            espera.style.display = "none";

            // Mostrar timer y pregunta con las respuestas
            document.getElementById("timer").innerHTML = `Quedan ${pregunta.timer} segundos`;
            var tim = document.getElementById('timer');
            tim.style.display = "block";
            document.getElementById('pregunta').innerHTML = table;
            var preg = document.getElementById('pregunta');
            preg.style.display = "inline";

            // Gestionar el timer
            let counter = parseInt(pregunta.timer);
            let k = setInterval(function() {
                counter--;
                document.getElementById("timer").innerHTML = `Quedan ${counter} segundos`;

                if (counter <= 0) {
                    clearInterval(k);
                    var espera = document.getElementById('espera');
                    espera.style.display = "inline";
                    var tim = document.getElementById('timer');
                    tim.style.display = "none";
                    var preg = document.getElementById('pregunta');
                    preg.style.display = "none";
                }
            }, 1000);
        });

        socket.on('deliverAnswer', function(respuesta) {
            if(respuesta == 1) {
                nResp[0] += 1
                document.getElementById("respuestasA").innerHTML = `${nResp[0]}`;
            }
            if(respuesta == 2) {
                nResp[1] += 1
                document.getElementById("respuestasB").innerHTML = `${nResp[1]}`;
            }
            if(respuesta == 3) {
                nResp[2] += 1
                document.getElementById("respuestasC").innerHTML = `${nResp[2]}`;
            }
            if(respuesta == 4) {
                nResp[3] += 1
                document.getElementById("respuestasD").innerHTML = `${nResp[3]}`;
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
                    <td align="center" id="respuestasA">0</td>  
                    <td align="center" id="respuestasB">0</td>  
                    <td align="center" id="respuestasC">0</td>  
                    <td align="center" id="respuestasD">0</td>  
                </tr>
                </tbody>
            </table>
            </React.Fragment>
        );
    }
}

export default Proyector;