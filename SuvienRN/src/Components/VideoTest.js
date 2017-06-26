import React, { Component } from 'react';
import { View } from 'react-native';
import Video from 'react-native-video';

class VideoTest extends Component {
    render() {
        return (
            <Video 
            source={{ uri: 'assets-library://asset/asset.MOV?id=C5000A74-BBE3-4F55-9D41-BB52D79CD507&ext=MOV' }}   // Can be a URL or a local file.
            ref={(ref) => {
                this.player = ref;
            }}                                      // Store reference
            rate={1.0}                              // 0 is paused, 1 is normal.
            volume={1.0}                            // 0 is muted, 1 is normal.
            muted={false}                           // Mutes the audio entirely.
            paused={false}                          // Pauses playback entirely.
            resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
            repeat                         // Repeat forever.
            playInBackground={false}                // Audio continues to play when app entering background.
            playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
            ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
            progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
            style={styles.backgroundVideo} 
            />
            );
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