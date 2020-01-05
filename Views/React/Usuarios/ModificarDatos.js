import React from 'react';
import { Link } from 'react-router-dom';
import CModificarDatos from '../../../Controllers/ControllerModificarDatos';
import Barra from '../Barra';
import Usuario from '../../../Controllers/ControllerModificarDatos';

class ModificarDatos extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            email: '',
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

    async componentDidMount() {
        console.log('componentdidmount');
        var datos = await CModificarDatos.handleData();
        console.log(datos);
        console.log(datos.nombre);

        this.setState({
            user: datos.nombre,
            email: datos.email,
        });
    }
  
    handleSubmit = async e => {
        e.preventDefault();
        if(document.getElementById('Password1').value == document.getElementById('Password2').value) {
            await CModificarDatos.handleModifications();
            document.getElementById('Info').innerHTML = "Cambios realizados"
        } else {
            document.getElementById('Info').innerHTML = "Las contraseñas deben coincidir"
        }
    };

    render() {
        return(
            <React.Fragment>
                <Barra user={this.state.nombre}/><br/>
                <h1 align="center"> Modificar Datos </h1>
                <br/>
                <form align="center" onSubmit={this.handleSubmit}>
                    <p> Nueva Contraseña: <input id="Password1" type="password" /> </p>
                    <p> Repite Contraseña: <input id="Password2" type="password" /> </p>
                    <p> Email: <input id="Email" type="email" defaultValue={this.state.email}/> </p>   
                    <p> <button type="submit"> Guardar cambios </button> </p>
                </form>
                <p align="center" id="Info"></p>

                <p align="center"> <Link to="/Principal"> Volver al panel principal </Link> </p>
            </React.Fragment>
        );
    }
}

export default ModificarDatos;