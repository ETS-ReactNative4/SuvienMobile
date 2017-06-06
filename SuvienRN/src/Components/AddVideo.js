import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';
import Video from 'react-native-video';
import ImagePicker from 'react-native-image-picker';

class AddVideo extends Component {
    state = { videouri: null, pauseing: true }
    onTakeVideoPress() {
        Actions.VideoPageTest();
    }

   onChooseVideoPress() {
        return (
            ImagePicker.launchImageLibrary(options, (response) => {
                let source = { uri: response.uri };
                if (source.uri === undefined) {
                    source.uri = null;
                }
                this.setState({ videouri: source });
                console.log(this.state.videouri);
            }
            )
        );
    }

    onAddWebVideoPress() {

    }

    playVideo() {
        return (
            this.setState({ pauseing: false })
        );
    }

    onEnding() {
        return (
            this.player.seek(0)
        );
    }  

    onloading() {
        return (
            this.player.seek(0)
        );
    }

    render() {
        console.log(this.state.pauseing);
        return (
            <View style={{ marginTop: 60 }}>
                <CardSection>
                    <Button onPress={this.onTakeVideoPress.bind(this)}>
                        Record Video
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onChooseVideoPress.bind(this)}>
                        Choose from Video Library
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onAddWebVideoPress.bind(this)}>
                        Add from web using Youtube
                    </Button>
                </CardSection>
                <TouchableOpacity style={{ height: 400, width: 400 }} onPress={this.playVideo.bind(this)}>
                    <Video
                    source={require('../Images/suvienvideofinal.mp4')}
                    ref={(video) => {
                        this.player = video;
                        }}                                   // Store reference
                    rate={1.0}                              // 0 is paused, 1 is normal.
                    volume={1.0}                            // 0 is muted, 1 is normal.
                    muted={false}  
                    //ActiveStatePauseStatus={this.state.pauseing}                         // Mutes the audio entirely.
                    paused={this.state.pauseing}
                    onLoad={this.onloading.bind(this)}
                    style={styles.backgroundVideo} 
                    resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                    onEnd={this.onEnding.bind(this)}
                    playInBackground={false}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
                ],
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
};

const styles = {
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    alignSelf: 'center',
    height: 400,
    width: 400
  },
};

export { AddVideo };
