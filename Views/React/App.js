import React from 'react';
import Login from './Usuarios/Login';
import Register from './Usuarios/Register';
import ElegirSala from './Alumno/ElegirSala';
import Cuestionarios from './Profesor/Cuestionarios';
import CrearCuestionario from './Profesor/CrearCuestionario';
import Principal from './Usuarios/Principal';
import ModificarDatos from './Usuarios/ModificarDatos';
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
            <Route exact path="/Principal" component={Principal} />
            <Route exact path="/ModificarDatos" component={ModificarDatos} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
