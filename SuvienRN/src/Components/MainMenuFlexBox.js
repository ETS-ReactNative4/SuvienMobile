import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, CardSection } from './common';

class MainMenuFlexBox extends Component {
    render() {
        return (
            <View style={styles.bigContainer}>
                <View style={styles.leftContainer}>
                    <Image source={require('../Images/leftss.png')} style={{ flex: 1, height: null, width: null }}>
                        <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent'}} />
                        <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent' }}>
                            <Button style={styles.buttonContainer}>
                                Click me!!!
                            </Button>
                        </CardSection>
                        <CardSection style={{ borderBottomWidth: 0, flex: 270, backgroundColor: 'transparent'}} />
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
    topContainer: {
        flex: 401, //301
        flexDirection: 'column',
        position: 'relative'
    },
    bottomContainer: {
        flex: 170, //270
        flexDirection: 'column',
        position: 'relative'
    },
    logoContainer: {
        flex: 251,
        flexDirection: 'column',
        position: 'relative'
    },
    buttonContainer: {
        flexDirection: 'column',
        position: 'relative',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default MainMenuFlexBox;
