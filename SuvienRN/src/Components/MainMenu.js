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
            <View style={styles.bigContainer}>
                <View style={styles.leftContainer}>
                    <Image source={require('../Images/leftss.png')} style={{ flex: 1, height: null, width: null }}>
                        <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent' }} />
                        <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent' }}>
                            <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                Get Started
                            </Button>
                        </CardSection>
                        <CardSection style={{ borderBottomWidth: 0, flex: 270, backgroundColor: 'transparent' }} />
                    </Image>
                </View>
                <View style={styles.rightContainer}>
                    <Image source={require('../Images/rightss.png')} style={{ flex: 1, height: null, width: null }} />
                </View>
            </View>
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
  },
      bigContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative'
    },
    leftContainer: {
        flex: 412,
        flexDirection: 'column',
        position: 'relative',
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
    }
};

export default MainMenu;
