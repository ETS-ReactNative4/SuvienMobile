import React, { Component } from 'react';
import MusicPlayerController from 'react-native-musicplayercontroller';
import { View, AsyncStorage } from 'react-native';
import { CardSection, Button } from './common';

class AddAudio extends Component {
    state = { audiopath: null }
    async onRecordAudioPress() {
       MusicPlayerController.playMusic(() => {
            console.log('I playin!');
    // Successfully playing
}, () => {
    console.log('I failed Nooooo');
    // Failed to play
});
    //console.log(JSON.parse(await AsyncStorage.getItem('samplemusic')));
    }

    onChooseMusicPress() {
    MusicPlayerController.presentPicker(false, (metadata) => {
        //console.log(metadata[0].uri);
        //this.setState({ audiopath: metadata[0].uri });
        console.log(metadata[0]);
        this.setState({ audiopath: metadata[0] });
    }, () => {
        console.log('Cancel');
    });
    }

    async onAddWebAudioPress() {
        //AsyncStorage.setItem('samplemusic', JSON.stringify(this.state.audiopath));
        //this.setState({ audiopath: JSON.parse(await AsyncStorage.getItem('samplemusic')) });
        //To add later: an actual link to async storage through state
        //const title = this.state.audiopath.toString();
        /*MusicPlayerController.preloadMusic(this.state.audiopath, (metadata) => {
            console.log('I found the music! Its:');
            console.log(metadata);
        }, () => {
            console.log('I didnt find it :(');
        });*/
        MusicPlayerController.preloadMusic('Addicted To You', 'True', 148.48, 'Avicii', (metadata) => {
            console.log('I found the music! Its:');
            console.log(metadata);
        }, () => {
            console.log('I didnt find it :(');
        });
        console.log('I preloaded the music!');
        //AsyncStorage.setItem('samplemusic', JSON.stringify(this.state.audiopath));
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
