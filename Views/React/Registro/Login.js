import React from 'react';
import { Link } from 'react-router-dom';
import handleLogin from '../../../Controllers/Clogin';

class Login extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            response: '',
            postUser: '',
            postPass: '',
            responseToPost: '',
        };
    }
  
    handleSubmit = async e => {
        e.preventDefault();
        const body = await handleLogin();
        this.setState({ responseToPost: body });
    };

    render() {
        return(
            <React.Fragment>
                
                <h1 align="center"> Kahoot </h1>
  
                <p>{this.state.response}</p>
                <form align="center" onSubmit={this.handleSubmit}>
                    <p> Usuario: <input id="Usuario" type="text" value={this.state.postUser}
                        onChange={e => this.setState({ postUser: e.target.value })}/> </p>
                    <p> Contraseña: <input id="Password" type="password" value={this.state.postPass}
                        onChange={e => this.setState({ postPass: e.target.value })}/> </p>
                    <p> <button type="submit"> Enviar </button> </p>
                </form>
                <p>{this.state.responseToPost}</p>

                <p> <Link to="/Register"> ¿Aún no tienes una cuenta? </Link> </p>
                <p align="center"> <Link to="/Alumno/Sala"> Elegir sala </Link> </p>
                <p align="center"> <Link to="/Profesor/Cuestionarios"> Gestionar cuestionarios </Link> </p>

            </React.Fragment>
        );
    }
}

export default Login;