import React from 'react';
import Login from './Registro/Login';
import Register from './Registro/Register';
import ElegirSala from './Alumno/ElegirSala';
import Cuestionarios from './Profesor/Cuestionarios';
import CrearCuestionario from './Profesor/CrearCuestionario';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  
  render() {
    return (
      <BrowserRouter>
        <div>
          <Redirect from="/" to="/Login" />
          <Switch>
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Alumno/Sala" component={ElegirSala} />
            <Route exact path="/Profesor/Cuestionarios" component={Cuestionarios} />
            <Route exact path="/Profesor/CrearCuestionario" component={CrearCuestionario} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
