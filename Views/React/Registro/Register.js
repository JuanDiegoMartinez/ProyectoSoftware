import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {

    pasar() {
        // Cancela el comportamiento por defecto
        event.preventDefault();

        // Obtener cliente para acceder a la bbdd
        //var cliente = AccesoBBDD.getCliente();

        // Obtener datos
        var usuario = document.getElementsByName("Usuario")[0].value;
        var contra = document.getElementsByName("Contrasenya")[0].value;
        var tipo;
        var tipoelegido = document.querySelector('input[name="Tipousuario"]:checked').value;
        if(tipoelegido == 'alumno') {
            tipo = 'a';
        } else if(tipoelegido == 'profesor') {
            tipo = 'p';
        }

        console.log('pasar(): ' + usuario + ", " + contra + ", " + tipo);
        /*
        cliente.query('INSERT INTO usuario VALUES(\'' + usuario  + '\',\'' + contra + '\' ,\'' + tipo + '\');', (err, res) => {
            console.log(err, res)
        })
        */
    }

    render() {
        return(
            <React.Fragment>
                
                <h1 align="center"> Kahoot </h1>
  
                <form align="center" onSubmit={this.pasar}>
                    <p> Usuario: <input name="Usuario" type="text" required /> </p>
                    <p> Contraseña: <input name="Contrasenya" type="password" required /> </p>
                    <input type="radio" name="Tipousuario" value="profesor" /> Profesor
                    <input type="radio" name="Tipousuario" value="alumno" defaultChecked /> Alumno <br/>
                    <p> 
                        <button> Enviar </button> 
                    </p>
                </form>

                <p align="center"> <Link to="/Login"> ¿Ya tienes una cuenta? </Link> </p>

            </React.Fragment>
        );
    }

}

export default Register;