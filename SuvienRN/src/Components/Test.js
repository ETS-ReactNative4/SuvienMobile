import React, { Component } from 'react';
import { Image } from 'react-native';

class Test extends Component {
    render() {
        return (
            <Image source={require('../Images/loading.gif')} style={{ height: 400, width: 400 }} />
        );
    }
}

export default Test;
