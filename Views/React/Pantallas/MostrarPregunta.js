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

        var usuario = await Usuario.handleData();

        var socket = io.connect('/');
        socket.emit('nuevoUsuario', usuario.nombre);

        this.setState({
            user: socket,
            nombre: usuario.nombre,
        });

        this.state.user.on('deliverQuestion', function(pregunta) {
            
            var table = `<table>
                            <tr> <th>${pregunta.preg} </th> </tr>
                            <tr> <td> <button id="boton${1}" value="1">${pregunta.res1}</button> <button id="boton${2}" value="2">${pregunta.res2}</button>  </td> </tr>
                            <tr> <td> <button id="boton${3}" value="3">${pregunta.res3}</button> <button id="boton${4}" value="4">${pregunta.res4}</button> </td> </tr>
                        </table>`;

            var espera = document.getElementById('espera');
            espera.style.display = "none";

            var tim = document.getElementById('timer');
            tim.style.display = "inline";

            document.getElementById('pregunta').innerHTML = table;

            var preg = document.getElementById('pregunta');
            preg.style.display = "inline";

            let counter = parseInt(pregunta.timer);
            let c = parseInt(pregunta.timer);
            let k = setInterval(function() {
                document.getElementById("timer").innerHTML = `Quedan ${c} segundos`;
                counter--;
                c--;

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
    }

    //Crear listeners de los radiobuttons
    crearListeners() {

        for (var i = 1; i <= 4; i++) {
            document.getElementById("boton" + i).addEventListener("click", this.envio);
        }
    }

    envio = e => {
        e.preventDefault();
        var espera = document.getElementById('espera');
        espera.style.display = "inline";
        var tim = document.getElementById('timer');
        tim.style.display = "none";
        var preg = document.getElementById('pregunta');
        preg.style.display = "none";
        this.state.user.emit('nuevoUsuario', "hola");
        
        console.log(document.forms);
        console.log(e);

        /*
        for (var i = 0; i < this.state.listaCues.length; i++) {

            if (document.forms["pregunta"].elements[i].checked) {
                //pos = i;
                //encontrado = true;
                break;
            }
        }
        */

        console.log(e.target.value);
    }
   
    render() {
        return(
            <React.Fragment>
            <div id="espera">
                {espera.esperaEnvioPregunta()}
            </div>
            <form align="center" id="pregunta" onSubmit={this.envio}> </form>
            <div id="timer"> </div>  
                
            </React.Fragment>
        );
    }
}

export default MostrarPregunta;