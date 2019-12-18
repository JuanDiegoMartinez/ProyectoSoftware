import React from 'react';
import io from 'socket.io-client';

function controlTotal() {

}

function esperaEnvioPregunta() {
    return <div id="Espera">
                <h1> Espera a la siguiente pregunta </h1>
    <a href="https://icon-library.net/icon/waiting-icon-gif-26.html" title="Waiting Icon Gif #309258">
        <img src="https://icon-library.net//images/waiting-icon-gif/waiting-icon-gif-26.jpg" width="350" />
    </a>
    </div>;
}

//var socket = io.connect('/');

export default {esperaEnvioPregunta, controlTotal};