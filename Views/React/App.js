import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

//Usuarios
import Register from './Usuarios/Register';
import Login from './Usuarios/Login';
import Principal from './Usuarios/Principal';
import ElegirSala from './Usuarios/ElegirSala';
import ModificarDatos from './Usuarios/ModificarDatos';

//Cuestionarios
import Cuestionarios from './Cuestionarios/Cuestionarios';
import Preguntas from './Cuestionarios/Preguntas';
import AbrirCuestionario from './Cuestionarios/AbrirCuestionario';

//Pantallas
import Proyector from './Pantallas/Proyector';
import MostrarPregunta from './Pantallas/MostrarPregunta';


class App extends React.Component {
  
  render() {
    return (
      <React.Fragment>
      <BrowserRouter>
        <div>
          
          <Switch>

            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            <Route exact path="/Sala" component={ElegirSala} />
            <Route exact path="/Principal" component={Principal} />
            <Route exact path="/ModificarDatos" component={ModificarDatos} />

            <Route exact path="/Cuestionarios" component={Cuestionarios} />
            <Route exact path="/Preguntas/:id" component={Preguntas} />
            <Route exact path="/AbrirCuestionario/:id" component={AbrirCuestionario} />
            
            <Route exact path="/Proyector/:id" component={Proyector} />
            <Route exact path="/MostrarPregunta" component={MostrarPregunta} />
          </Switch>

          <Link to="/Login"> Login </Link>
        </div>
      </BrowserRouter>

      

      </React.Fragment>
    );
  }

}

export default App;
