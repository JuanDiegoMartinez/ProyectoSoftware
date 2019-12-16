import React from 'react';
import { Link } from 'react-router-dom';
import handleLogin from '../../../Controllers/Clogin';
import Barra from '../Barra';

class Login extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
            pass: '',
            responseToPost: '',
        };
    }
  
    handleSubmit = async e => {
        e.preventDefault();
        const body = await handleLogin();
        this.setState({ responseToPost: body });
        console.log(this.state.user);
        
        if (body == true) {
            this.hola();
        }
        document.getElementById('form').reset();
        
    };

    go(routeName) {
        this.props.navigation.navigate(routeName);
    }

    hola() {
        
        var u = document.getElementById('Usuario').value;

        this.setState({
            user: u,
        });
    }

    render() {
        return(
            <React.Fragment>

                <Barra usu={this.state.user} />
                
                <h1 align="center"> ¿Pa' que quieres saber eso? </h1>
                <h1 align="center"> Iniciar Sesión </h1>
  
                <form align="center" id="form" onSubmit={this.handleSubmit}>
                    <p> Usuario: <input id="Usuario" type="text"/> </p>
                    <p> Contraseña: <input id="Password" type="password"/> </p>
                    <p> <button type="submit" onClick={this.hola}> Aceptar </button> </p>
                </form>
                <p>{this.state.responseToPost}</p>
                

                <p align="center"> <Link to="/Register"> ¿Aún no tienes una cuenta? </Link> </p>
                <p align="center"> <Link to="/Alumno/Sala"> Elegir sala </Link> </p>
                <p align="center"> <Link to="/Principal"> Principal </Link> </p>
                <p align="center"> <Link to="/Profesor/Cuestionarios"> Crear cuestionario </Link> </p>

            </React.Fragment>
        );
    }
}

export default Login;