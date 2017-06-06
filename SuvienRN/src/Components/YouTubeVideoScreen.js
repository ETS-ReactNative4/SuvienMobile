import React, { Component } from 'react';
import { WebView } from 'react-native';
import YouTube from 'react-native-youtube';
import Orientation from 'react-native-orientation';

class YouTubeVideoScreen extends Component {
    state = { isReady: null, status: null, quality: null, error: null, currentTime: null, duration: null }
    render() {
        Orientation.lockToPortrait();
        Orientation.unlockAllOrientations();
        Orientation.lockToLandscapeLeft();
        return (
            //<WebView source={{ uri: 'https://www.youtube.com/watch?v=KVZ-P-ZI6W4' }} style={{ alignSelf: 'stretch', height: 700, backgroundColor: 'black', marginVertical: 10 }} />
            <YouTube
            apiKey='AIzaSyDCv-gME-M7Zm42sZz8vuQcK-3uNtbTVhU'
            ref={(component) => {
            this._youTubePlayer = component;
            }}
            videoId="KVZ-P-ZI6W4"           // The YouTube video ID
            playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId`
            play                     // control playback of video with true/false
            fullscreen={false}               // control whether the video should play in fullscreen or inline
            loop                     // control whether the video should loop when ended

            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            onProgress={e => this.setState({ currentTime: e.currentTime, duration: e.duration })}

            style={{ alignSelf: 'stretch', height: 700, backgroundColor: 'black', marginVertical: 10 }}
            />
        );
    }
}

export default YouTubeVideoScreen;
