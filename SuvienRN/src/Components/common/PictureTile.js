import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { CardSection } from './CardSection';
import ImagePicker from 'react-native-image-picker';

class PictureTile extends Component { 
    state = { imageuri: null }
    onTilePress() {
        return (
            ImagePicker.launchImageLibrary(options, (response) => {
                const source = { uri: response.uri };
                if (source.uri === undefined) {
                    source.uri = null;
                }
                this.setState({ imageuri: source });
                console.log(this.state.imageuri);
            }));
    }
    
    renderPhoto() {
        if (this.state.imageuri === null) {
            return (
            <Text>Click me for pictures!</Text>
            );
        }
        if (this.state.imageuri !== null) {
            return (
                <Image source={this.state.imageuri} style={{ height: 200, width: 200 }} />
            );
        }
    }
    
    render() {
        return (
            <TouchableOpacity onPress={this.onTilePress.bind(this)}>
                <CardSection style={{ height: 400 }}>
                    {this.renderPhoto()}
                </CardSection>
            </TouchableOpacity>
        );
    }
    
}

const options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
                ],
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
};

export { PictureTile };
