import React from 'react';
import { Link } from 'react-router-dom';
import Barra from '../Barra';
import Usuario from '../../../Controllers/ControllerModificarDatos';

class Principal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: ''
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

    render() {
        return(
            <React.Fragment>
                <Barra user={this.state.nombre}/><br/>
                <div className="elegirPrincipal">
                    <h2 align="center"> <Link style={{color: "#2e7bb9"}} to="/Sala"> Elegir sala </Link> </h2>
                </div>
                <div className="elegirPrincipal">
                    <h2 align="center"> <Link style={{color: "#2e7bb9"}} to="/Cuestionarios"> Gestionar cuestionarios </Link> </h2>
                </div>
                <div className="elegirPrincipal">
                    <h2 align="center"> <Link style={{color: "#2e7bb9"}} to="/ModificarDatos"> Modificar datos de la cuenta </Link> </h2>
                </div>
            </React.Fragment>
        );
    }
}

export default Principal;