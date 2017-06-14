import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { CardSection } from './CardSection';

class PictureTile extends Component {
    state = { imageuri: null }
    render() {
        return (
            <TouchableOpacity onPress={() => console.log(this.props.unique)}>
                <Image source={this.props.source} style={this.props.style} />
            </TouchableOpacity>
        );
    }
}

export { PictureTile };
