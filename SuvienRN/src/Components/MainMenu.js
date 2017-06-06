import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';
import Orientation from 'react-native-orientation';

class MainMenu extends Component {
    componentDidMount() {
        Orientation.lockToLandscape();
    }
    onButtonPress() {
        Actions.Settings();
    }
    render() {
        return (
                <Image resizeMode="stretch" source={require('../Images/suviensplash.png')} style={styles.canvas}>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: null, width: null }}>
                        <View style={styles.leftContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent', position: 'relative' }} />
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative' }}>
                                <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                    Get Started
                                </Button>
                            </CardSection>
                            <CardSection style={{ borderBottomWidth: 0, flex: 270, backgroundColor: 'transparent', position: 'relative' }} />
                        </View>
                        <View style={styles.rightContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 456, backgroundColor: 'transparent', flexDirection: 'column', position: 'relative' }} />
                        </View>
                    </View>
                </Image>
        );
    }    
}

const styles = {
    bigContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative'
    },
    leftContainer: {
        flex: 412,
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'transparent'
    },
    rightContainer: {
        flex: 456,
        flexDirection: 'column',
        position: 'relative'
    },
    buttonContainer: {
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    canvas: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: null,
        width: null
},
};

export { MainMenu };
