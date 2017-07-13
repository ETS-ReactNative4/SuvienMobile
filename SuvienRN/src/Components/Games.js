import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Button, Header } from './common';
import { Actions } from 'react-native-router-flux';
import Languages from '../Languages/Languages.json';

class Games extends Component {
    state = { languages: null }
    async componentWillMount() {
        this.setState({ languages: await AsyncStorage.getItem('Language')});
    }
    render() {
        if (this.state.languages === null) {
            return (
                <View />
            );
        } else {
            return (
                <View>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['108']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <Text style={{ fontSize: 27, fontFamily: 'UltimaPDac-UltraLight', alignSelf: 'center', marginTop: 10, marginBottom: 10 }}>{Languages[this.state.languages]['109']}</Text>
            <CardSection>
                <Button onPress={() => Actions.MemoryGame()}>
                    {Languages[this.state.languages]['099']}
                </Button>
            </CardSection>
            <CardSection>
                <Button onPress={() => Actions.CaptionGame()}>
                    {Languages[this.state.languages]['106']}
                </Button>
            </CardSection>
                </View>
            );
        }
    }
}

export { Games };
