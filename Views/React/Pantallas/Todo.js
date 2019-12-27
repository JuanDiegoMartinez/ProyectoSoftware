import React from 'react';
import io from 'socket.io-client';

function controlTotal() {

}

function esperaEnvioPregunta() {
    return <div id="Espera" align="center">
                <h2> Esperando a la siguiente pregunta </h2>
        <img src="https://flevix.com/wp-content/uploads/2019/07/Ajax-Preloader.gif" width="350" />
    </div>;
}

//var socket = io.connect('/');

export default {esperaEnvioPregunta, controlTotal};