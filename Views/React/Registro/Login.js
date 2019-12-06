import React from 'react';
import { Link } from 'react-router-dom';
import socket from 'socket.io-client';

class Login extends React.Component {

    state = {
        response: '',
        postUser: '',
        postPass: '',
        responseToPost: '',
    };
      
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
        
        this.socket = socket.connect('/');
    }
      
    callApi = async () => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
    };
      
    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/readuser', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postUser: this.state.postUser, postPass: this.state.postPass }),
        });
        const body = await response.text();

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