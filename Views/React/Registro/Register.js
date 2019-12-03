import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {

    render() {
        return(
            <React.Fragment>
                
                <h1 align="center"> Kahoot </h1>
  
                <form align="center">
                    <p> Nombre de usuario: <input name="Usuario" type="text" /> </p>
                    <p> Email: <input name="Email" type="email" /> </p>
                    <p> Contraseña: <input name="Password" type="password" /> </p>
                    <p> Repite la contraseña: <input name="RepitePassword" type="password" /> </p>
                    <input type="radio" name="Tipousuario" value="profesor" /> Profesor
                    <input type="radio" name="Tipousuario" value="alumno"/> Alumno <br/>
                    <p> <Link to="/Login"> ¿Ya tienes una cuenta? </Link> </p>
                    <p> 
                        <button name="Eliminar" type="reset"> Eliminar </button> <br/>
                        <button name="Enviar" type="submit"> Enviar </button> 
                    </p>
                </form>

            </React.Fragment>
        );
    }

}

export default Register;