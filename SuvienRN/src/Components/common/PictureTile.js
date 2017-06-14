import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { CardSection } from './CardSection';

class PictureTile extends Component {
    state = { imageuri: null, caption: null, tag: null }
    render() {
        const dataobj = JSON.parse(this.props.data);
        if (this.props.data === null) {
            return (
            <TouchableOpacity onPress={}>
                <Image source={require('./nocontent.jpg')} style={this.props.style} />
            </TouchableOpacity>
        );
    }
    if (this.props.data !== null && this.props.unique === dataobj.uniqueID) {
       return (
           <TouchableOpacity onPress={this.props.onPress}>
                <Image source={dataobj.uri} style={this.props.style} />
            </TouchableOpacity>
       );
}
    if (this.props.data !== null && this.props.unique !== dataobj.uniqueID) {
            return (
            <TouchableOpacity onPress={this.props.onPress}>
                <Image source={require('./nocontent.jpg')} style={this.props.style} />
            </TouchableOpacity>
        );
    }
    }
}

export { PictureTile };
