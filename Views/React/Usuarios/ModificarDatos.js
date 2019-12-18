import React from 'react';
import { Link } from 'react-router-dom';
import CModificarDatos from '../../../Controllers/ControllerModificarDatos';

class ModificarDatos extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            email: '',
        };
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
        const body = await CModificarDatos.handleModifications();
    };

    render() {
        return(
            <React.Fragment>
  
                <h1 align="center"> Modificar Datos </h1>
                <p> Conectado como: {this.state.user} </p>
                
                <form align="center" onSubmit={this.handleSubmit}>
                    <p> Nueva Contraseña: <input id="Password1" type="password" /> </p>
                    <p> Repite Contraseña: <input id="Password2" type="password" /> </p>
                    <p> Email: <input id="Email" type="email" defaultValue={this.state.email}/> </p>   
                    <p> <button type="submit"> Guardar cambios </button> </p>
                </form>

            </React.Fragment>
        );
    }
}

export default ModificarDatos;