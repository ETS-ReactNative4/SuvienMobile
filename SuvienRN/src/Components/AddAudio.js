import React, { Component } from 'react';
import MusicPlayerController from 'react-native-musicplayercontroller';
import { View } from 'react-native';
import { CardSection, Button } from './common';

class AddAudio extends Component {
    state = { audiopath: null }
    onRecordAudioPress() {
        MusicPlayerController.playMusic(()=>{
            console.log('I playin!');
    // Successfully playing
    }, ()=>{
    // Failed to play
    })
    }

    onChooseMusicPress() {
    MusicPlayerController.presentPicker(false, (metadata) => {
        console.log(metadata[0].uri);
        this.setState({ audiopath: metadata[0].uri });
        console.log(this.state.audiopath);
    }, () => {
        console.log('Cancel');
    });
    }

    onAddWebAudioPress() {
        //To add later: an actual link to async storage through state
        //const title = this.state.audiopath.toString();
        MusicPlayerController.preloadMusic(this.state.audiopath, (metadata) => {
            console.log('I found the music! Its:');
            console.log(metadata);
        }, () => {
            console.log('I didnt find it :(');
        });
    }
    
    render() {
        return (
            <View style={{ marginTop: 60 }}>
                <CardSection>
                    <Button onPress={this.onRecordAudioPress.bind(this)}>
                        Record Audio
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onChooseMusicPress.bind(this)}>
                        Choose from Music Library
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onAddWebAudioPress.bind(this)}>
                        Add from Youtube using URL
                    </Button>
                </CardSection>
            </View>
        );
    }
}

export { AddAudio };
