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

        this.setState({
            user: socket,
            idCues: this.props.match.params.id
        });

        console.log("id: ", socket.id);
        console.log("otro id: ", this.state.user.id);
        console.log("cues: ", this.state.idCues);

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
                    <p> Hola </p>
                </div>   

            </React.Fragment>
        );
    }
}


export default Proyector;