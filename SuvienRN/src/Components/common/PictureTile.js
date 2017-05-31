import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './CardSection';
import ImagePicker from 'react-native-image-picker';

class PictureTile extends Component { 
    onTilePress() {
        return (
            ImagePicker.launchImageLibrary(options, (response) => {
                console.log('Response = ', response);
            }));
    }
    render() {
        return (
            <TouchableOpacity onPress={this.onTilePress.bind(this)}>
                <CardSection style={{ height: 400 }}>
                    <Text>Click me for pictures!</Text>
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
