import React from 'react';
import { Link } from 'react-router-dom';
import handleLogin from '../../../Controllers/CPantalla';
import io from 'socket.io-client';


class AbrirCuestionario extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
        };
    }

    componentDidMount() {
        var socket = io.connect('/', {'forceNew': true });

        this.setState({
            user: socket,
        });
    }
  
    handleSubmit = async e => {
        e.preventDefault();

        var datos = "hehehe como te va?"

        this.state.user.emit('hola', this.state.user.id);
    };
   
    render() {
        return(
            <React.Fragment>

                <h1> Realizar Cuestionario</h1>
                
                <p> Nombre del cuestionario: </p>

                <form>
                    <p> Tiempo en segundos de la pregunta: </p>
                    <p> <input type="number" min="30" max="120"></input> </p>
                    <p> <button type="submit" onClick={this.handleSubmit}> Siguiente pregunta </button> </p>
                </form>
                
            </React.Fragment>
        );
    }
}

export default AbrirCuestionario;