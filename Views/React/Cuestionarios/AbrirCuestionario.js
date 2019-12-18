import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

class AbrirCuestionario extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            idCues: -1
        };
    }
   
    render() {
        return(
            <React.Fragment>

                <h1> Realizar Cuestionario</h1>
                
                <p> Nombre del cuestionario: {this.state.idCues} </p>

                <form>
                    <p> Tiempo en segundos de las pregunta: </p>
                    <p> <input type="number" min="5" max="20"></input> </p>
                    <Link to={`/Proyector/${this.state.idCues}`}> Mostrar PIN </Link>
                </form>
                
            </React.Fragment>
        );
    }
}

export default AbrirCuestionario;