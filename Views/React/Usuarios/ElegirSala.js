import React from 'react';
import socket from 'socket.io-client';
import { Link } from 'react-router-dom';


class ElegirSala extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }

    submitForm (e) {
        e.preventDefault();
        //document.getElementById('info').innerHTML = 'La sala no existe';
        var sala = document.getElementById('Sala').value
        this.props.history.push(`/MostrarPregunta/${sala}`);
    };

    render() {
        return(
            <React.Fragment>
                <h1 align="center"> Elige la sala </h1> <br/> <br/> 

                <form align="center" id="form" onSubmit={this.submitForm.bind(this)}>
                    <p align="center"> Código: <br/> 
                    <input id="Sala" type="text"/> </p>
                    <button type="submit">Entrar</button>
                </form>

                <p align="center" id="info"></p>
            </React.Fragment>
        )
    }

}

export default ElegirSala;