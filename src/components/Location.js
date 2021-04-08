import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router-dom';

class Location extends React.Component {
    state = {lat: null, errorMessage: ''};  //equivalent to constructor function - can delete constructor - less code :)

    componentDidMount() {
        console.log('My component was renredered to the screen');
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude.toFixed(1), lon: position.coords.longitude}),
            err => this.setState({errorMessage: err.message})
        )
    }
    
    render() {
        return (
            <div className="navigation-icon">
                {this.state.lat || 'Seattle, WA'}
            </div>
        )
    }
}

export default Location;