import React from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import Controlador from '../../../Controllers/ControllerProyector';


class Proyector extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            idCues: -1
        };
    }

    componentDidMount() {
        var socket = io.connect('/');
        socket.id = "Proyector";

        socket.emit('hola', 'mierda');
        socket.emit('obtenerPreguntas', this.state.idCues);
        
        socket.on('Preguntas', (datos) => {
            this.con(datos);
        });
    }
  
    con(datos) {
        console.log(datos);
    }
   
    render() {
        return(
            <React.Fragment>
                
                <div>
                    <h1> Información de la sesión </h1>
                    <p> Esperando alumnos... </p>
                </div>   

            </React.Fragment>
        );
    }
}


export default Proyector;