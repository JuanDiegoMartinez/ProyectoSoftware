import React from 'react';
import { Link } from 'react-router-dom';
import CCuestionarios from '../../../Controllers/CCuestionarios';

class Cuestionarios extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listaCues: Array()
        }
    }
    
    mostrarCuestionarios() {
        // Obtener los datos de los cuestionarios desde la bbdd
        
        const listaCst = [
            ["Tema 1", "Bases de Datos", 7, <button type="submit" onClick={this.handleSubmit}>Activar</button>],
            ["Backtracking", "Algoritmia", 11],
            ["General", "Estructura de computadores", 5],
        ]; // Mock temporal para testear

        var a = ``;

        listaCst.map(function(item, i) {
            a += 
            `<tr key=${i}>
               <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
            </tr>`;
         });

         a = '<p>' + 341234 + '</p>';
         console.log(a);

         document.getElementById("hehe").innerHTML = a;


         //Generar el código html correspondiente y devolverlo
        //  return (listaCst.map(function(item, i) {
        //       return (
        //       `<tr key=${i}>
        //          <td>${item[0]}</td>
        //           <td>${item[1]}</td>
        //           <td>${item[2]}</td>
        //       </tr>`
        //       )
        // }));
    }
    
    async componentDidMount() {
        var datos = await CCuestionarios.handleData();

        console.log('datos: ', datos.length);
        console.log('datos0: ', datos[0]);
        
        this.setState({
              listaCues: datos,
        });

        console.log('state: ', this.state.listaCues);
        console.log(this.state.listaCues[0].id_cues);
        
        var a = `<tr>
        <th id="id_cues">Id cuestionario</th>
        <th>Nombre del cuestionario</th>
        <th>Asignatura</th>
        <th>Seleccionar</th>
        </tr>`;

        for (var i = 0; i < datos.length; i++) {
            a += `<tr>
                    <td>${this.state.listaCues[i].id_cues}</td> <td>${this.state.listaCues[i].nombre_cues}</td> <td>${this.state.listaCues[i].asignatura}</td>
                    <td><input type="radio" name="Elegido" value=${i} /> </td>
            
            </tr> `;
        }
        console.log(a);
        document.getElementById("hehe").innerHTML = a;
    }

    handleSubmit = e => {
        e.preventDefault();
        var a = document.forms["form"].elements;
        console.log(a);

        //hacer un for para saber cual está cheked

        //var a = document.getElementById('id_cues');
        //a.style.display = "none";
    }

    render() {
        return(
            <React.Fragment>
                
                <div align="center">
                    <h1> Lista de cuestionarios</h1>
                    <form id="form" onSubmit={this.handleSubmit}>
                    <table id="hehe">
                    </table>
                    <button type="submit"> Aceptar </button>
                    </form>
                    <p> <Link to="/Profesor/CrearCuestionario"> Crear cuestionario </Link> </p>
                </div>
            </React.Fragment>
        )
    }

}

export default Cuestionarios;