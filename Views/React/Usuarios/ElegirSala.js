import React from 'react';
import socket from 'socket.io-client';
import { Link } from 'react-router-dom';


class ElegirSala extends React.Component {

    render() {
        return(
            <React.Fragment>
                <p align="center"> Código de sala: <br/> 
                <input name="Sala" type="text"/> </p>
                <Link to="/MostrarPregunta"> Entrar </Link>
                
            </React.Fragment>
        )
    }

}

export default ElegirSala;