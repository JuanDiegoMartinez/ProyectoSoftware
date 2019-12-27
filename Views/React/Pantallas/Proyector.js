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

        //socket.emit('obtenerPreguntas', this.state.idCues);
        
        //socket.on('Preguntas', (datos) => {
        //    this.con(datos);
        //});
        var nRespA = 0
        var nRespB = 0
        var nRespC = 0
        var nRespD = 0
        socket.on('deliverQuestion', function(pregunta) {
            nRespA = 0
            nRespB = 0
            nRespC = 0
            nRespD = 0
            document.getElementById('respuestasA').innerHTML = `A: 0`;
            document.getElementById('respuestasB').innerHTML = `B: 0`;
            document.getElementById('respuestasC').innerHTML = `C: 0`;
            document.getElementById('respuestasD').innerHTML = `D: 0`;

            var table = `
                            <tr> <th>${pregunta.preg} </th> </tr>
                            <tr> <td> <button disabled id="boton1" value="1">${pregunta.res1}</button> 
                                      <button disabled id="boton2" value="2">${pregunta.res2}</button>  </td> </tr>
                            <tr> <td> <button disabled id="boton3" value="3">${pregunta.res3}</button> 
                                      <button disabled id="boton4" value="4">${pregunta.res4}</button> </td> </tr>
                        `;

            var espera = document.getElementById('espera');
            espera.style.display = "none";

            var tim = document.getElementById('timer');
            tim.style.display = "inline";

            document.getElementById('pregunta').innerHTML = table;

            var preg = document.getElementById('pregunta');
            preg.style.display = "inline";

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
                nRespA += 1
                document.getElementById("respuestasA").innerHTML = `A: ${nRespA}`;
            }
            if(respuesta == 2) {
                nRespB += 1
                document.getElementById("respuestasB").innerHTML = `B: ${nRespB}`;
            }
            if(respuesta == 3) {
                nRespC += 1
                document.getElementById("respuestasC").innerHTML = `C: ${nRespC}`;
            }
            if(respuesta == 4) {
                nRespD += 1
                document.getElementById("respuestasD").innerHTML = `D: ${nRespD}`;
            }
        })
    }
   
    render() {
        return(
            <React.Fragment>
            <div id="espera">
                {espera.esperaEnvioPregunta()}
            </div>
            <form align="center"> 
                <table id="tabla" id="pregunta"> </table>
            </form>
            <div id="timer"> </div>  
            <div align="center" id="respuestasA"> </div>  
            <div align="center" id="respuestasB"> </div>  
            <div align="center" id="respuestasC"> </div>  
            <div align="center" id="respuestasD"> </div>  
            </React.Fragment>
        );
    }
}


export default Proyector;