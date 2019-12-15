import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import Login from './Registro/Login';

class Session extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      sesion: 0,
    };
  }

  actualizarEstado(valor) {
    this.setState({
      sesion: valor,
    });
  }

  hola() {
    return( <React.Fragment>

      <BrowserRouter>
        <Switch>
          <Route exact path="/Login" component={Login} />
        </Switch>
      </BrowserRouter>

      <header> 
        <nav>
          <ul>
            <li> aaaa </li>
            <li> Ajustes </li>
          </ul>
        </nav>
      </header>
      
  </React.Fragment>);
  }

  render() {
    return this.hola();
  }

}

export default Session;