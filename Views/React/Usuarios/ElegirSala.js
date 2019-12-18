import React from 'react';
import socket from 'socket.io-client';

class ElegirSala extends React.Component {

    componentDidMount() {
        this.soc = socket;
        console.log("socket disponible");
    }

    handleClick = e => {
        console.log("hola");
        this.soc.connect('/');
        this.soc.send('hola', 'he pulsado el botón');
    }

    render() {
        return(
            <React.Fragment>
                <p align="center"> Código de sala: <br/> 
                <input name="Sala" type="text"/> </p>
                <Link to="/Sala"> Entrar </Link>
                
            </React.Fragment>
        )
    }

}

export default ElegirSala;