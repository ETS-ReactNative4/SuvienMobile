import React, { Component } from 'react';
import { View, Image, Text, Dimensions, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class MediaExplorer extends Component {
    state = { height: null, width: null }

    componentDidMount() {
        this.setState({ 
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width 
        });
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', paddingTop: 15, backgroundColor: '#f9f7f7', height: this.state.height, width: this.state.width, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light', marginBottom: 10 }}> Upload a new...</Text>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0, width: (this.state.width - 100) }}>
                        <Button onPress={() => Actions.AddPhoto()} style={{ height: 300, width: 600 }}>
                            Photo
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
                            style={{ height: 300, width: 600 }}
                        >
                            Audio
                            <Image source={require('../Images/audioicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0, width: (this.state.width - 100) }}>
                        <Button onPress={() => Actions.AddVideo()} style={{ height: 300, width: 600 }}>
                            Video
                            <Image source={require('../Images/videoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
            </View>
        );
    }
}

export { MediaExplorer };
