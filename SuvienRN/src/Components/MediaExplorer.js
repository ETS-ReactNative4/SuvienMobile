import React, { Component } from 'react';
import { View, Image, Text, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Header } from './common';

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
            <View>
            <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Settings</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <View style={{ flexDirection: 'column', paddingTop: 15, backgroundColor: '#f9f7f7', height: this.state.height, width: this.state.width, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light', marginBottom: 10 }}> Upload a new...</Text>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0, width: (this.state.width - 100) }}>
                        <Button onPress={() => Actions.AddPhoto()}>
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
                        >
                            Audio
                            <Image source={require('../Images/audioicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0, width: (this.state.width - 100) }}>
                        <Button onPress={() => Actions.AddVideo()}>
                            Video
                            <Image source={require('../Images/videoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
            </View>
            </View>
        );
    }
}

export { MediaExplorer };
