import React, { Component } from 'react';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';

class MainMenu extends Component {
    onButtonPress() {
        Actions.Settings();
    }
    render() {
        return (
            <Image 
            source={require('../Images/suviensplash.png')}
            style={styles.imageStyle}
            >
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                     Get Started
                    </Button>
                </CardSection>
            </Image>
        );
    }
}

const styles = {
    imageStyle: {
        flex: 1,
        height: null,
        width: null
    }
};

export default MainMenu;
