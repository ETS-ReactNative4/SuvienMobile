import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';
import YouTube from 'react-native-youtube';
import Orientation from 'react-native-orientation';

class Media extends Component {
    state = { 
        uri: null, 
        caption: null, 
        tag: null, 
        height: null, 
        width: null, 
        scheight: null, 
        scwidth: null, 
        isFavourite: null, 
        imagerend: null, 
        pictures: null, 
        presets: null, 
        title: null,
        videos: null, 
        mediaType: null,
        imageuri: null,
        isReady: null,
        status: null,
        quality: null,
        error: null,
        currentTime: null,
        duration: null 
    }
    async componentWillMount() {
        const chosen = JSON.parse(await AsyncStorage.getItem('isSelected'));
        console.log(chosen);
        if (chosen === undefined) {
            console.log('Null!');
        }
        if (chosen.mediaType === 'Photo'){
        this.setState({ 
            pictures: JSON.parse(await AsyncStorage.getItem('Pictures')),
            presets: JSON.parse(await AsyncStorage.getItem('Presets')),
            uri: chosen.uri, 
            caption: chosen.caption, 
            tag: chosen.tag,
            height: chosen.height,
            width: chosen.width,
            isFavourite: chosen.isFavourite,
            title: chosen.title,
            mediaType: chosen.mediaType
        });
        if (chosen.isFavourite === false) {
            this.setState({ imagerend: require('../Images/favouritenot.png') });
        }
        if (chosen.isFavourite === true) {
            this.setState({ imagerend: require('../Images/favourite.png') });
        }
    }
        if (chosen.mediaType === 'Youtube') {
        this.setState({ videos: JSON.parse(await AsyncStorage.getItem('Videos')), presets: JSON.parse(await AsyncStorage.getItem('Presets')) });
        console.log(chosen);
        if (chosen.isFavourite === false) {
            this.setState({ imagerend: require('../Images/favouritenot.png') });
        }
        if (chosen.isFavourite === true) {
            this.setState({ imagerend: require('../Images/favourite.png') });
        }
        this.setState({ 
            uri: chosen.uri, 
            imageuri: chosen.imageuri,
            caption: chosen.caption, 
            tag: chosen.tag,
            isFavourite: chosen.isFavourite,
            title: chosen.title,
            mediaType: chosen.mediaType
        });
        }
    }

    componentDidMount() {
        this.setState({ 
            scheight: Dimensions.get('window').height,
            scwidth: Dimensions.get('window').width 
        });
    }

    onHomeReturn() {
        /*
        const { pictures, presets, title } = this.state;
        const image = pictures.filter((picture) => picture.title === title);
        const location = presets[0].content.indexOf()*/
        Actions.Home();
    }

    onFavouritePress() {
        if (this.state.isFavourite === false) {
            this.setState({ isFavourite: true, imagerend: require('../Images/favourite.png')});
        }
        if (this.state.isFavourite === true) {
            this.setState({ isFavourite: false, imagerend: require('../Images/favouritenot.png')});
        }
        console.log(this.state.isFavourite);
    }

    render() {
        console.log(this.state.mediaType);
        if (this.state.mediaType === null){
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../Images/loading.gif')} style={{ height: 400, width: 400 }} />
                </View>  
            );
        }
        if (this.state.mediaType === 'Photo') {
            const { height, width, scheight, scwidth, uri, caption, tag, isFavourite, imagerend } = this.state;
            if (scheight === null || width === null || uri === null || caption === null || tag === null || height === null || scwidth === null || isFavourite === null || imagerend === null){
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../Images/loading.gif')} style={{ height: 400, width: 400 }} />
                </View>  
            );
        }
            if (scheight !== null && width !== null && imagerend !== null) {
            if (height >= scheight) {
                const heightRatio = parseFloat(scheight) / parseFloat(height);
                let newHeight = scheight;
                let newWidth = width * heightRatio;
                if (newWidth > (scwidth - 400)) {
                    const widthRatio = parseFloat((scwidth - 400)) / parseFloat(newWidth);
                    newWidth = scwidth - 400;
                    newHeight *= widthRatio;
                }
                const paddingheight = (scheight - newHeight) / 2;

                return (
                <Image source={require('../Images/picturebackground.png')} style={{ flex: 1, height: null, width: null }}>
                    <View style={{ backgroundColor: '#a2aebe', height: (newHeight + 100), flexDirection: 'row', marginTop: (paddingheight - 50), alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', height: scheight, backgroundColor: 'transparent', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: paddingheight, backgroundColor: 'transparent' }}>
                                <Image source={{ uri: this.state.uri }} style={{ height: newHeight, width: newWidth }} />
                                <View style={{ height: newHeight, width: 400, backgroundColor: '#a4c0e5' }}>
                                    <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book', marginTop: 10, backgroundColor: 'grey', marginLeft: 5, marginRight: 5 }}>Caption</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'ClementePDag-Book', marginBottom: 10, backgroundColor: 'white', marginLeft: 5, marginRight: 5 }}>{this.state.caption}</Text>
                                    <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book' }}>Tag</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'ClementePDag-Book', marginBottom: 10 }}>{this.state.tag}</Text>
                                    <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book' }}>Favourite</Text>
                                    <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                        <Image source={imagerend} style={{ height: 60, width: 60 }} />
                                    </TouchableWithoutFeedback>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button onPress={this.onHomeReturn.bind(this)}>Return to Home</Button>
                                    </CardSection>
                                </View>
                            </View>
                        </View>
                    </View>
                </Image>
            );
            }
        }
    }
        if (this.state.mediaType === 'Youtube') {
            const { uri, caption, tag, isFavourite, imageuri, imagerend } = this.state;
            if (uri === null || caption === null || tag === null || isFavourite === null || imageuri === null || imagerend === null) {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../Images/loading.gif')} style={{ height: 400, width: 400 }} />
                </View>  
            );
        }
            if (uri !== null && imageuri !== null) {
                Orientation.lockToPortrait();
                Orientation.unlockAllOrientations();
                Orientation.lockToLandscape();
            return (
                    <View>
                            <YouTube
                            apiKey='AIzaSyDCv-gME-M7Zm42sZz8vuQcK-3uNtbTVhU'
                            ref={(component) => {
                            this._youTubePlayer = component;
                            }}
                            videoId="KVZ-P-ZI6W4"           // The YouTube video ID
                            playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId`
                            play                   // control playback of video with true/false
                            fullscreen={false}               // control whether the video should play in fullscreen or inline
                            loop                     // control whether the video should loop when ended

                            onReady={(e) => {
                                this.setState({ isReady: true });
                                this._youTubePlayer.seekTo(0);
                            }
                            }
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            onError={e => this.setState({ error: e.error })}
                            onProgress={e => this.setState({ currentTime: e.currentTime, duration: e.duration })}

                            style={{ alignSelf: 'stretch', height: 400, backgroundColor: 'black' }}
                            />
                            <View style={{ height: 400, backgroundColor: '#a4c0e5' }}>
                                <ScrollView>
                                    <View>
                                        <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book', marginTop: 10, backgroundColor: 'grey', marginLeft: 5, marginRight: 5 }}>Caption</Text>
                                        <Text style={{ fontSize: 20, fontFamily: 'ClementePDag-Book', marginBottom: 10, backgroundColor: 'white', marginLeft: 5, marginRight: 5 }}>{this.state.caption}</Text>
                                        <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book' }}>Tag</Text>
                                        <Text style={{ fontSize: 20, fontFamily: 'ClementePDag-Book', marginBottom: 10 }}>{this.state.tag}</Text>
                                        <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book' }}>Favourite</Text>
                                        <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                            <Image source={imagerend} style={{ height: 60, width: 60 }} />
                                        </TouchableWithoutFeedback>
                                        <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                            <Button onPress={this.onHomeReturn.bind(this)}>Return to Home</Button>
                                        </CardSection>
                                    </View>
                                </ScrollView>
                            </View>
                    </View>
            );
            }
        }
        }
        }

export default Media;
