import React from 'react';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';

class Barra extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: ''
        };
    }
  
    handleSubmit = async (usu) => {
        e.preventDefault();
        //const body = await handleLogin();
        this.setState({ postUser: usu });
        //console.log('Se ha ejecutado el ref');
    };

    render() {
        return(
            <React.Fragment>
                
                <header>
                    <nav>
                        <li> Iniciada sesión como: {this.props.usu} </li>
                        <li> <Link to="/ModificarDatos"> Ajustes </Link> </li>
                        <li> Cerrar sesión </li>
                    </nav>
                </header>

            </React.Fragment>
        );
    }
}

export default Barra;