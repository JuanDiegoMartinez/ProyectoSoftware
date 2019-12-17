import React from 'react';
import { useLocation } from 'react-router-dom';
import handleLogin from '../../../Controllers/CPantalla';
import io from 'socket.io-client';


class Pantalla extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
        };
    }

    componentDidMount() {
        var socket = io.connect('/', {'forceNew': true });

        this.setState({
            user: socket,
        });

        let location = useLocation();
        console.log(location);
    }
  
    handleSubmit = async e => {
        e.preventDefault();

        var datos = "hehehe como te va?"

        this.state.user.emit('hola', this.state.user.id);
    };
   
    render() {
        return(
            <React.Fragment>
                
                <p>hola</p>
                <button type="submit" onClick={this.handleSubmit}> prueba </button>

            </React.Fragment>
        );
    }
}


export default Pantalla;