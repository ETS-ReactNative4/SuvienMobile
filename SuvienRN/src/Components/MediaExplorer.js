import React, { Component } from 'react';
import { View, Image, Text, Dimensions, Platform, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Languages from '../Languages/Languages.json';
import { CardSection, Button } from './common';

class MediaExplorer extends Component {
    state = { height: null, width: null, languages: null }

    async componentDidMount() {
        this.setState({ 
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
            languages: await AsyncStorage.getItem('Language') 
        });
    }

    render() {
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
        if (this.state.languages !== null) {
            return (
            <View>
            <View style={{ flexDirection: 'column', backgroundColor: '#f9f7f7', height: this.state.height, width: this.state.width, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light', marginBottom: 10 }}> {Languages[this.state.languages]['048']}</Text>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0, width: (this.state.width - 100) }}>
                        <Button onPress={() => Actions.AddPhoto()}>
                            {Languages[this.state.languages]['036']}
                            <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0, width: (this.state.width - 100) }}>
                        <Button
                         onPress={() => { 
                                if (Platform.OS === 'ios') {
                                    Actions.AddAudio();
                                }
                                if (Platform.OS === 'android') {
                                    Actions.AddAudioAnd();
                                }
                            }} 
                        >
                            {Languages[this.state.languages]['038']}
                            <Image source={require('../Images/audioicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0, width: (this.state.width - 100) }}>
                        <Button onPress={() => Actions.AddVideo()}>
                            {Languages[this.state.languages]['037']}
                            <Image source={require('../Images/videoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
            </View>
            </View>
        );
        }
    }
}

export { MediaExplorer };
