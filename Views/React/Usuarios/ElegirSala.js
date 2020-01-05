import React from 'react';
import Barra from '../Barra';
import Usuario from '../../../Controllers/ControllerModificarDatos';
import io from 'socket.io-client';


class ElegirSala extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            sala: -1
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

    componentDidMount() {
        var socket = io.connect('/');
        socket.on('salaExiste', this.actualizarSala)

        this.setState({user: socket});
    }

    actualizarSala = (codigo) => {
        if(codigo == 1) {
            this.props.history.push(`/MostrarPregunta/${this.state.sala}`);
        } else {
            document.getElementById('info').innerHTML = 'Esta sala no existe';
        }
    }

    submitForm (e) {
        e.preventDefault();
        var s = document.getElementById('Sala').value;
        if(s != '') {
            this.setState({
                sala: s
            })
            this.state.user.emit('comprobarSala', s)
        }
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