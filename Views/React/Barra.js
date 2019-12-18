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
                        Sesión iniciada como: {this.props.usu} <br/>
                        <Link to="/ModificarDatos"> Ajustes </Link> <br/>
                        <Link to="/Login"> Cerrar sesión </Link>
                    </nav>
                </header>
            </React.Fragment>
        );
    }
}

export default Barra;