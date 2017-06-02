import React, { Component } from 'react';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';
import Orientation from 'react-native-orientation';

class MainMenu extends Component {
    componentDidMount() {
        Orientation.lockToLandscape();
    }
    onButtonPress() {
        Actions.AddPhoto();
    }
    render() {
        return (
            <Image 
            source={require('../Images/suviensplash.png')}
            style={styles.imageStyle}
            >
                <CardSection style={styles.containerStyle}>
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
    },
    containerStyle: {
        marginTop: 320,
        width: 590,
        height: 70,
        padding: 5,
        borderBottomWidth: 0,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
  }
};

export default MainMenu;
