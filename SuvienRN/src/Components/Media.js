import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';
import YouTube from 'react-native-youtube';
import Orientation from 'react-native-orientation';
import MusicPlayerController from 'react-native-musicplayercontroller';

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
        media: null, 
        title: null,
        videos: null, 
        mediaType: null,
        imageuri: null,
        isReady: null,
        status: null,
        quality: null,
        error: null,
        currentTime: null,
        duration: null,
        chosen: null,
        audios: null,
        album: null,
        artist: null
    }
    async componentWillMount() {
        //Note. The orientation issue only persists on android, not ios
        /*
        if (this.state.isReady === null) {
            Orientation.lockToPortrait();
            Orientation.unlockAllOrientations();
            Orientation.lockToLandscape();
        }
        
        */
        const chosen = JSON.parse(await AsyncStorage.getItem('isSelected'));
        if (chosen.mediaType === 'Photo'){
        this.setState({ 
            pictures: JSON.parse(await AsyncStorage.getItem('Pictures')),
            media: JSON.parse(await AsyncStorage.getItem('Media')),
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
        this.setState({ videos: JSON.parse(await AsyncStorage.getItem('Videos')), media: JSON.parse(await AsyncStorage.getItem('Media')) });
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
            mediaType: chosen.mediaType,
            chosen
        });
    }
        if (chosen.mediaType === 'Music') {
            this.setState({ audios: JSON.parse(await AsyncStorage.getItem('Audio')), media: JSON.parse(await AsyncStorage.getItem('Media')) });
            if (chosen.isFavourite === false) {
                this.setState({ imagerend: require('../Images/favouritenot.png') });
            }
            if (chosen.isFavourite === true) {
                this.setState({ imagerend: require('../Images/favourite.png') });
            }
            this.setState({
                album: chosen.album,
                artist: chosen.artist,
                caption: chosen.caption, 
                tag: chosen.tag,
                isFavourite: chosen.isFavourite,
                title: chosen.title,
                mediaType: chosen.mediaType,
                chosen
        });
        }
    }

    componentDidMount() {
        this.setState({ 
            scheight: Dimensions.get('window').height,
            scwidth: Dimensions.get('window').width 
        });
    }

    preloadMusicPlay() {
        console.log('im in preload music play!');
        const { title, album, artist } = this.state;
        console.log(title);
        console.log(album);
        console.log(artist);
                MusicPlayerController.preloadMusic([title, album, 227.004, artist], (metadata) => {
                    console.log('I found the music! Its:');
                    console.log(metadata);
                }, () => {
                    console.log('I didnt find it :(');
                });
    }
    onHomeReturn() {
        if (this.state.mediaType === 'Photo') {
            const myimages = this.state.pictures;
            const loca = myimages.findIndex((element, index, array) => {
                if (element.imageuri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            });
            myimages[loca].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Pictures', JSON.stringify(myimages));
            const mymedia = this.state.media;
            const locati = mymedia.findIndex(((element, index, array) => {
                if (element.imageuri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            mymedia[locati].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Media', JSON.stringify(mymedia));
        }
        if (this.state.mediaType === 'Youtube') {
            const myvideos = this.state.videos;
            const locat = myvideos.findIndex((element, index, array) => {
                if (element.videouri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            });
            myvideos[locat].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Videos', JSON.stringify(myvideos));
            const mymedia = this.state.media;
            const locatio = mymedia.findIndex(((element, index, array) => {
                if (element.videouri === this.state.uri) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            mymedia[locatio].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Media', JSON.stringify(mymedia));
        }
        if (this.state.mediaType === 'Music') {
            const myaudios = this.state.audios;
            const locat = myaudios.findIndex((element, index, array) => {
                if (element.title === this.state.title && element.album === this.state.album && element.artist === this.state.artist) {
                    return true;
                }
                else {
                    return false;
                }
            });
            myaudios[locat].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Audio', JSON.stringify(myaudios));
            const mymedia = this.state.media;
            const locatio = mymedia.findIndex(((element, index, array) => {
                if (element.title === this.state.title && element.album === this.state.album && element.artist === this.state.artist) {
                    return true;
                }
                else {
                    return false;
                }
            }));
            mymedia[locatio].isFavourite = this.state.isFavourite;
            AsyncStorage.setItem('Media', JSON.stringify(mymedia));
        }
        Actions.Home();
    }

    onFavouritePress() {
        if (this.state.isFavourite === false) {
            this.setState({ isFavourite: true, imagerend: require('../Images/favourite.png')});
        }
        if (this.state.isFavourite === true) {
            this.setState({ isFavourite: false, imagerend: require('../Images/favouritenot.png')});
        }
    }

    render() {
        if (this.state.mediaType === null){
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>  
            );
        }
        if (this.state.mediaType === 'Photo') {
            const { height, width, scheight, scwidth, uri, caption, tag, isFavourite, imagerend } = this.state;
            if (scheight === null || width === null || uri === null || caption === null || tag === null || height === null || scwidth === null || isFavourite === null || imagerend === null){
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading</Text>
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
                <View style={{ flex: 1, height: null, width: null, backgroundColor: '#d5deea' }}>
                    <View 
                    style={{
                        backgroundColor: '#d5deea', 
                        height: (newHeight + 100), 
                        flexDirection: 'row', 
                        marginTop: (paddingheight - 50), 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        }}
                    >
                        <View style={{ flexDirection: 'row', height: scheight, backgroundColor: 'transparent', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: paddingheight, backgroundColor: '#c7d0db' }}>
                                <Image source={{ uri: this.state.uri }} style={{ height: newHeight, width: newWidth }} />
                                <View style={{ height: newHeight, width: (scwidth - newWidth), backgroundColor: '#d5deea' }}>
                                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', backgroundColor: '#c7d0db', marginTop: 10, marginLeft: 5, marginRight: 5 }}>{this.state.title}</Text>
                                        <Text style={styles.textHeaderStyle}>Caption</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textHeaderStyle}>Tag</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.tag}</Text>
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
                </View>
            );
            }
        }
    }
        if (this.state.mediaType === 'Youtube') {
            const { uri, caption, tag, isFavourite, imageuri, imagerend } = this.state;
            if (uri === null || caption === null || tag === null || isFavourite === null || imageuri === null || imagerend === null) {
            return (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>  
            );
        }
            if (uri !== null && imageuri !== null) {
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
                                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', backgroundColor: '#b7d6ff', marginTop: 10, marginLeft: 5, marginRight: 5 }}>{this.state.title}</Text>
                                        <Text style={styles.textHeaderStyle}>Caption</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textHeaderStyle}>Tag</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.tag}</Text>
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
        //Note: this is configured only for ios at the moment
            
            }
            if (this.state.mediaType === 'Music') {
                console.log('Im in the first if!');
                if (this.state.album !== null && this.state.title !== null && this.state.artist !== null){
                    console.log(this.state.media);
                    this.preloadMusicPlay();
                    return (
                    <View style={{ height: this.state.scheight, backgroundColor: '#a4c0e5', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Image source={require('../Images/musicalbumart.png')} style={{ height: 400, width: 400 }} />
                            <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                            <Button 
                            onPress={() => {
                                this.preloadMusicPlay();
                                MusicPlayerController.playMusic(() => {
                                    console.log('I playin!');
                                // Successfully playing
                                }, () => {
                                    console.log('I failed Nooooo');
                                // Failed to play
                                });
                                }}
                            >
                                Play
                            </Button>
                            </CardSection>
                            <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                            <Button 
                            onPress={() => {
                                MusicPlayerController.pauseMusic(() => {
                                    console.log('I stoppin!');
                                // Successfully playing
                                }, () => {
                                    console.log('I failed Nooooo');
                                // Failed to play
                                });
                                }}
                            >
                                Pause
                            </Button>
                            </CardSection>
                        </View>
                            <ScrollView>
                                    <View>
                                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', backgroundColor: '#b7d6ff', marginTop: 10, marginLeft: 5, marginRight: 5 }}>{this.state.title}</Text>
                                        <Text style={styles.textHeaderStyle}>Album</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.album}</Text>
                                        <Text style={styles.textHeaderStyle}>Artist</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.artist}</Text>
                                        <Text style={styles.textHeaderStyle}>Caption</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.caption}</Text>
                                        <Text style={styles.textHeaderStyle}>Tag</Text>
                                        <Text style={styles.textBodyStyle}>{this.state.tag}</Text>
                                        <TouchableWithoutFeedback onPress={this.onFavouritePress.bind(this)}>
                                            <Image source={this.state.imagerend} style={{ height: 60, width: 60 }} />
                                        </TouchableWithoutFeedback>
                                        <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                            <Button onPress={this.onHomeReturn.bind(this)}>Return to Home</Button>
                                        </CardSection>
                                    </View>
                                </ScrollView>
                            </View>
                );
            } 
            if (this.state.album === null || this.state.title === null || this.state.artist === null) {
                    return (
                        <Text> Loading </Text>
                    );
                }
            }
        }
        }
    
    let newHeight;
    let paddingheight;
    let scheight;
    let newWidth;
    const styles = {
        textHeaderStyle: {
            fontSize: 25, 
            fontFamily: 'Roboto-Light', 
            marginTop: 10, 
            backgroundColor: '#c7d0db', 
            marginLeft: 5, 
            marginRight: 5, 
            //borderTopLeftRadius: 10, 
            //borderTopRightRadius: 10
        },
        textBodyStyle: {
            fontSize: 20, 
            fontFamily: 'Roboto-Thin', 
            marginBottom: 10, 
            backgroundColor: '#e3edf9', 
            marginLeft: 5, 
            marginRight: 5,
            //borderBottomLeftRadius: 10, 
            //borderBottomRightRadius: 10
        },
        imageContainerStyle: {
            backgroundColor: 'black', 
            height: (newHeight + 100), 
            flexDirection: 'row', 
            marginTop: (paddingheight - 50), 
            alignItems: 'center', 
            justifyContent: 'center' 
        },
        imageInnerContainerStyle: {
            flexDirection: 'row', 
            height: scheight, 
            backgroundColor: 'transparent', 
            justifyContent: 'center'
        },
        imageInnerStyle: { 
            flexDirection: 'row', 
            alignSelf: 'flex-end', 
            marginBottom: paddingheight, 
            backgroundColor: 'transparent' 
        },
        imageStyle: { 
            height: newHeight, 
            width: newWidth 
        },
        favouriteImageStyle: {
            height: 60, 
            width: 60
        },
        textSideStyle: {
            height: newHeight, 
            width: 400, 
            backgroundColor: '#a4c0e5'
        },
        buttonSectionStyle: {
            backgroundColor: 'transparent', 
            marginLeft: 0, 
            borderBottomWidth: 0
        },
        imageLoadingStyle: {
            alignItems: 'center', 
            justifyContent: 'center'
        }
    };

export default Media;
