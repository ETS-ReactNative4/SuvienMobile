import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Video from 'react-native-video';

class VideoTest extends Component {
    state = { uri: null }
    async componentWillMount() {
        this.setState({ uri: await AsyncStorage.getItem('currentVideoMsg') });
    }
    render() {
        if (this.state.uri === null) {
            return (
                <View />
            );
        }
        if (this.state.uri !== null) {
            return (
            <Video 
            source={{ uri: this.state.uri }}   // Can be a URL or a local file.
            ref={(ref) => {
                this.player = ref;
            }}                                      // Store reference
            rate={1.0}                              // 0 is paused, 1 is normal.
            volume={1.0}                            // 0 is muted, 1 is normal.
            muted={false}                           // Mutes the audio entirely.
            paused={false}                          // Pauses playback entirely.
            resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
            repeat={false}
            onEnd={() => Actions.Home()}                        // Repeat forever.
            playInBackground={false}                // Audio continues to play when app entering background.
            playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
            ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
            progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
            style={styles.backgroundVideo} 
            />
            );
        }
    }
}

const styles = {
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
};

export default VideoTest;
