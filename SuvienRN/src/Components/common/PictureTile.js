import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { CardSection } from './CardSection';
import { Actions } from 'react-native-router-flux';

class PictureTile extends Component {
    state = { imageuri: null, caption: null, tag: null, isNull: true }
    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps && nextProps.data !== null && isNull ==) {
            if (JSON.parse(nextProps.data).uniqueID === nextProps.unique) {
            this.setState({ imageuri: JSON.parse(nextProps.data).uri, caption: JSON.parse(nextProps.data).caption, tag: JSON.parse(nextProps.data).group, isNull: false });
            }
        }
    }

    render() {
        if (this.state.isNull === true) {
            return (
            <TouchableOpacity 
            onPress={() => {
                AsyncStorage.setItem('temp', JSON.stringify(
                    { uniqueID: this.props.unique, uri: { uri: null } }
                    ));
                    console.log(this.props.unique);
                    Actions.MediaExplorer();
                    }
                    }
            >
                <Image source={require('./nocontent.jpg')} style={this.props.style} />
            </TouchableOpacity>
        );
    }
    if (this.state.isNull === false) {
       return (
           <TouchableOpacity onPress={this.props.onPress}>
                <Image source={{ uri: this.state.imageuri }} style={this.props.style} />
            </TouchableOpacity>
       );
    }
    }
}

export { PictureTile };
