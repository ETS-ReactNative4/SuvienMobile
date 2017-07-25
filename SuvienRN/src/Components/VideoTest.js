import React, { Component } from 'react';
import { View, AsyncStorage, Text, Image, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Languages from '../Languages/Languages.json';
import Video from 'react-native-video';

class VideoTest extends Component {
    state = { uri: null, failed: null, languages: null }
    async componentWillMount() {
        this.setState({ uri: await AsyncStorage.getItem('currentVideoMsg'), languages: await AsyncStorage.getItem('Language') });
    }
    render() {
        console.log(this.state.failed);
        if (this.state.uri === null || this.state.languages === null) {
            return (
                <View />
            );
        } else {
            if (this.state.failed === null) {
                return (
                <Image source={{ uri: this.state.uri }} onError={() => this.setState({ failed: true })} onLoadEnd={() => this.setState({ failed: false })} style={{ height: null, width: null, flex: 1, opacity: 0 }} />
                );
            }
            if (this.state.failed === true) {
                setTimeout(() => Actions.Home(), 5000);
                return (
                    <View style={{ flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: `garbage${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 200, width: 200 }} />
                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>{Languages[this.state.languages]['122']}</Text>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['123']}</Text>
                        <Text style={{ fontSize: 25, fontFamily: 'Roboto-Light', marginTop: 10 }}>{Languages[this.state.languages]['124']}</Text>
                    </View>
                );
            }
            if (this.state.failed === false) {
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

export { VideoTest };
