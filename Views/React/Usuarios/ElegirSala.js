import React from 'react';
import socket from 'socket.io-client';
import { Link } from 'react-router-dom';
import Barra from '../Barra';
import Usuario from '../../../Controllers/ControllerModificarDatos';


class ElegirSala extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        };
    }

    componentWillMount() {
        this.actualizarNombre()
    }

    actualizarNombre = async () => {
        var usuario = await Usuario.handleData();
        this.setState({
            nombre: usuario.nombre
        });
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
                <Barra user={this.state.nombre}/><br/>
                <h1 align="center"> Elige la sala </h1> <br/> <br/> 

                <form align="center" id="form" onSubmit={this.submitForm.bind(this)}>
                    <p align="center"> Código: <br/> 
                    <input id="Sala" type="text"/> </p>
                    <p align="center"><button type="submit" align="center">Entrar</button></p>
                </form>

                <p align="center" id="info"></p>
            </React.Fragment>
        )
    }

}

export default ElegirSala;