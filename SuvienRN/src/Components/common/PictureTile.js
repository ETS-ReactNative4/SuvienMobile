import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import { CardSection } from './CardSection';
import { Actions } from 'react-native-router-flux';

class PictureTile extends Component {
    state = { imageuri: null, caption: null, tag: null, isNull: true }


    render() {
        if (this.props.data === null) {
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
    if (this.props.data !== null) {
        return (
        <TouchableOpacity 
            onPress={() => {
                console.log('I did it!');
                    }
                    }
        >
                <Image source={{ uri: this.props.data.imageuri }} style={this.props.style} />
            </TouchableOpacity>
        );
        }
    }
}

export { PictureTile };
