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
        this.setState({ response: body });
        document.getElementById('form').reset();
    };

    render() {
        return(
            <React.Fragment>
                
                <h1 align="center"> Registro </h1>
  
                <form align="center" id="form" onSubmit={this.handleSubmit}>
                    <p> Usuario: <input id="Usuario" type="text" required /> </p>
                    <p> Contraseña: <input id="Password" type="password" required /> </p>
                    <p> Email: <input id="Email" type="email" required /> </p>
                    <input type="radio" name="Tipousuario" value="profesor" /> Profesor
                    <input type="radio" name="Tipousuario" value="alumno" defaultChecked /> Alumno <br/>
                    <p> <button type="submit"> Enviar </button> </p>
                </form>

                <p>{this.state.response}</p>

                <p align="center"> <Link to="/Login"> ¿Ya tienes una cuenta? </Link> </p>

            </React.Fragment>
        );
    }

}

export default Register;