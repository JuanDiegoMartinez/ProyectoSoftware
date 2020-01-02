import React from 'react';
import { Link } from 'react-router-dom';
import Barra from '../Barra';

class Principal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <div className="elegirSala">
                    <h2 align="center"> <Link style={{color: "#2e7bb9"}} to="/Sala"> Elegir sala </Link> </h2>
                </div>
                <div className="elegirCuest">
                    <h2 align="center"> <Link style={{color: "#2e7bb9"}} to="/Cuestionarios"> Gestionar cuestionarios </Link> </h2>
                </div>
            </React.Fragment>
        );
    }
}

export default Principal;