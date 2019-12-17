import React from 'react';
import Login from './Usuarios/Login';
import Register from './Usuarios/Register';
import ElegirSala from './Alumno/ElegirSala';
import Cuestionarios from './Profesor/Cuestionarios';
import Preguntas from './Profesor/Preguntas';
import Principal from './Usuarios/Principal';
import ModificarDatos from './Usuarios/ModificarDatos';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Pantalla from './Proyector/Pantalla';
import AbrirCuestionario from './Profesor/AbrirCuestionario';

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
            <Route exact path="/Profesor/Preguntas/:id" component={Preguntas} />
            <Route exact path="/Principal" component={Principal} />
            <Route exact path="/ModificarDatos" component={ModificarDatos} />
            <Route exact path="/Pantalla" component={Pantalla} />
            <Route exact path="/Profesor/AbrirCuestionario" component={AbrirCuestionario} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
