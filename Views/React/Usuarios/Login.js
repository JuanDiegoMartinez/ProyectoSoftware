import React from 'react';
import { Link } from 'react-router-dom';
import handleLogin from '../../../Controllers/ControllerLogin';
import Barra from '../Barra';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: ''
        };
    }
  
    handleSubmit = async e => {
        e.preventDefault();
        const body = await handleLogin();
        
        if (body == true) {
            var u = document.getElementById('Usuario').value;
            this.setState({
                user: u,
            });
        }
        document.getElementById('form').reset();
    };
   
    render() {
        return(
            <React.Fragment>
                <Barra user={this.state.user} />
                
                <h1 align="center"> Iniciar Sesión </h1>
  
                <form align="center" id="form" onSubmit={this.handleSubmit}>
                    <p align="center"> Usuario: <br/> <input id="Usuario" type="text"/> </p>
                    <p align="center"> Contraseña: <br/> <input id="Password" type="password"/> </p>
                    <p align="center"> <button type="submit"> Aceptar </button> </p>
                </form>
                
                <p align="center"> <Link to="/Register"> ¿Aún no tienes una cuenta? </Link> </p>
                <p align="center"> <Link to="/Sala"> Elegir sala </Link> </p>
                <p align="center"> <Link to="/Cuestionarios"> Crear cuestionario </Link> </p>
            </React.Fragment>
        );
    }
}

export default Login;