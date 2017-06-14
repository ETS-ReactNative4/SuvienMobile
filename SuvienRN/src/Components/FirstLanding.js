import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, CardSection } from './common';
import { Actions } from 'react-native-router-flux';

class FirstLanding extends Component {
    render() {
        return (
            <View style={{ marginLeft: 80, marginRight: 80, marginTop: 60, flexWrap: 'wrap' }}>
                <View style={{ marginLeft: 30, marginRight: 30 }}>
                    <Text style={{ fontSize: 27, fontFamily: 'ClementePDag-Book', marginBottom: 50, marginTop: 50 }}>Hello there! 
                        Welcome to Suvien, the app that takes you on a journey down memory lane. 
                        We notice this is your first time opening the app on this device.
                        Would you like to read the tutorial first?
                    </Text>
                </View>
                <CardSection>
                    <Button onPress={() => console.log('Tutorial Rquest')}>
                        Yes, I wish to see the tutorial
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => Actions.Settings()}>
                        No, I've used Suvien before
                    </Button>
                </CardSection>
            </View>
        );
    }
}

export default FirstLanding;
