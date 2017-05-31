import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './CardSection';

class PictureTile extends Component {
    onTilePress() {
        Actions.AddPhoto();
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

export { PictureTile };
