import React from 'react';

class CrearCuestionario extends React.Component {

    pasar () {
        // Comprobar que los campos son correctos y que el numero de preguntas no es 0
        // ...

        // Guardar el cuestionario en la bbdd
        // ...

        // Mostrar mensaje de éxito
        // ...
    }

    anyadirPregunta(){
        var contenedor = document.getElementById("preguntas");
        var numHijo = contenedor.children.length + 1;
        var nuevoDiv = document.createElement("div");
        
        // Crear texto con numero de pregunta
        nuevoDiv.appendChild(document.createTextNode("Pregunta " + numHijo + ": "));

        // Salto de linea
        nuevoDiv.appendChild(document.createElement("br"));

        // Crear un nuevo <input> para la pregunta
        var inPrg = document.createElement("textarea");
        inPrg.name = "pregunta" + numHijo;
        nuevoDiv.appendChild(inPrg);

        // Salto de linea
        nuevoDiv.appendChild(document.createElement("br"));

        // Crear 4 nuevos <input> de tipo texto y de tipo radio para las respuestas
        for(var i = 0; i < 4; i++) {
            var rdRsp = document.createElement("input");
            rdRsp.type = "radio";
            rdRsp.name = "radioResp" + numHijo;
            rdRsp.value = numHijo + "";
            nuevoDiv.appendChild(rdRsp);
            var inRsp = document.createElement("input");
            inRsp.type = "text";
            inRsp.name = "respuesta" + numHijo + "" + i;
            nuevoDiv.appendChild(inRsp);
        }

        // Dos saltos de linea
        nuevoDiv.appendChild(document.createElement("br"));
        nuevoDiv.appendChild(document.createElement("br"));

        // Anyadir al contenedor principal
        contenedor.appendChild(nuevoDiv);
    }

    eliminarPregunta(){
        var contenedor = document.getElementById("preguntas");
        
        // Eliminar los dos input y el salto de linea
        if(contenedor.lastChild)
            contenedor.removeChild(contenedor.lastChild);
    }

    render() {
        return(
            <React.Fragment>
                <h1 align="center"> Crear cuestionario </h1>
  
                <form align="center">
                    <p> Nombre: <input id="Nombre" type="text" /> </p>
                    <p> Asignatura: <input id="Asignatura" type="text" /> </p>
                    <p> Preguntas: </p><br/>
                    <div id="preguntas"> </div>
                    <p> <button name="NuevaPreg" type="button" onClick={() => this.anyadirPregunta()}> + </button> </p>
                    <p> <button name="EliminarPreg" type="button" onClick={() => this.eliminarPregunta()}> - </button> </p>
                    <p> <button name="Guardar" type="button" onClick={() => this.pasar()}> Enviar </button> </p>
                </form>

            </React.Fragment>
        );
    }

}

export default CrearCuestionario;