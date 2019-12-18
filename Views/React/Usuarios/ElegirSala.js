import React from 'react';
import socket from 'socket.io-client';
import { Link } from 'react-router-dom';


class ElegirSala extends React.Component {

    render() {
        return(
            <React.Fragment>
                <h1 align="center"> Elige la sala </h1> <br/> <br/> 

                <p align="center"> Código: <br/> 
                <input name="Sala" type="text"/> </p>
                <p align="center"><Link to="/MostrarPregunta"> Entrar </Link></p>
                
            </React.Fragment>
        )
    }

}

export default ElegirSala;