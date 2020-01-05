import React from 'react';
import { Link } from 'react-router-dom';

class Barra extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <React.Fragment>
                <header className="tituloBarra">
                    <p align="center" className="tituloPagina">KaTive</p>
                    {(() => {
                        if (this.props.user != "") {
                            return  <nav>
                                        <p style={{display:"inline"}} className="menuPagina">Sesión iniciada como: {this.props.user}</p>
                                        <Link className="menuPagina" to="/Principal"> Panel principal </Link>
                                        <Link className="menuPagina" to="/Login"> Cambiar de usuario </Link>
                                    </nav>;
                        } else {
                            return;
                        }
                    })()}
                    
                </header>
            </React.Fragment>
        );  
    }
}

export default Barra;