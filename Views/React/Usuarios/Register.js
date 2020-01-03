import React from 'react';
import { Link } from 'react-router-dom';
import handleRegister from '../../../Controllers/ControllerRegister';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: '',
        };
    }

    handleSubmit = async e => {
        e.preventDefault();
        const body = await handleRegister();

        if(body == 'true') {
            this.setState({ response: "Usuario registrado" });
        } else {
            this.setState({ response: "Este usuario ya existe" });
        }
        document.getElementById('form').reset();
    };

    render() {
        return(
            <React.Fragment>
                
                <h1 align="center"> Registro </h1>
  
                <form align="center" id="form" onSubmit={this.handleSubmit}>
                    <p> Usuario: <br/><input id="Usuario" type="text" required /> </p> 
                    <p> Contraseña: <br/><input id="Password" type="password" required /> </p> 
                    <p> Email: <br/><input id="Email" type="email" required /> </p>
                    <p> <button type="submit"> Enviar </button> </p>
                </form>

                <p align="center">{this.state.response}</p>

                <p align="center"> <Link to="/Login"> Iniciar sesión </Link> </p>

            </React.Fragment>
        );
    }

}

export default Register;