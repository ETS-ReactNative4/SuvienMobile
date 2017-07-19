import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, AsyncStorage, View, Platform } from 'react-native';
import Languages from './Languages.json';
import { CardSection } from './CardSection';
import { Actions } from 'react-native-router-flux';
import MusicPlayerController from 'react-native-musicplayercontroller';

class PictureTile extends Component {
    state = { imageuri: null, caption: null, tag: null, isNull: true, languages: null, isnone: null, noint: false }

    async componentWillMount() {
        this.setState({ languages: await AsyncStorage.getItem('Language') });
    }
    render() {
        if (this.state.languages !== null) {
             if (this.props.data === null) {
            return (
            <TouchableOpacity 
            onPress={() => {
                AsyncStorage.setItem('uniqueID', JSON.stringify(
                    { uniqueID: this.props.unique }
                    ));
                    Actions.MediaExplorer();
                    }
                    }
            >
                <Image source={{ uri: `${Languages[this.state.languages]['014']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={this.props.style} />
            </TouchableOpacity>
        );
    }
    if (this.props.data !== null) {
        if (this.props.data.mediaType === 'Photo') {
            if (this.state.isnone === null) {
                return (
                    <TouchableOpacity 
                    onPress={() => {
                        this.props.onChangePress({ uri: this.props.data.imageuri,
                        title: this.props.data.title, 
                        caption: this.props.data.caption, 
                        tag: this.props.data.group,
                        height: this.props.data.height,
                        width: this.props.data.width,
                        isFavourite: this.props.data.isFavourite,
                        mediaType: 'Photo'
                        });
                        /*
                        AsyncStorage.setItem('isSelected', JSON.stringify(
                        { uri: this.props.data.imageuri,
                        title: this.props.data.title, 
                        caption: this.props.data.caption, 
                        tag: this.props.data.group,
                        height: this.props.data.height,
                        width: this.props.data.width,
                        isFavourite: this.props.data.isFavourite,
                        mediaType: 'Photo'
                        }));*/
                        //Actions.Media();
                    }
                    }
                    >
                        <Image source={{ uri: this.props.data.imageuri }} style={this.props.style} onError={() => this.setState({ isnone: `${Languages[this.state.languages]['115']}${Platform.OS === 'ios' ? '.png' : ''}` })}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: this.props.style.height, height: this.props.style.height, paddingBottom: 10, paddingRight: 10 }}>
                            <Image source={require('./photoimagebig.png')} style={{ height: 50, width: 50 }} />
                            </View>
                        </Image>
                    </TouchableOpacity>
                );
            }
            if (this.state.isnone !== null) {
                return (
                    <TouchableOpacity 
                    onPress={() => {
                        this.props.onChangePress({ uri: this.props.data.imageuri,
                        title: this.props.data.title, 
                        caption: this.props.data.caption, 
                        tag: this.props.data.group,
                        height: this.props.data.height,
                        width: this.props.data.width,
                        isFavourite: this.props.data.isFavourite,
                        mediaType: 'Photo'
                        });
                        /*
                        AsyncStorage.setItem('isSelected', JSON.stringify(
                        { uri: this.props.data.imageuri,
                        title: this.props.data.title, 
                        caption: this.props.data.caption, 
                        tag: this.props.data.group,
                        height: this.props.data.height,
                        width: this.props.data.width,
                        isFavourite: this.props.data.isFavourite,
                        mediaType: 'Photo'
                        }));*/
                        //Actions.Media();
                    }
                    }
                    >
                        <Image source={{ uri: this.state.isnone }} style={this.props.style} onError={() => this.setState({ isnone: `${Languages[this.state.languages]['115']}${Platform.OS === 'ios' ? '.png' : ''}` })}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: this.props.style.height, height: this.props.style.height, paddingBottom: 10, paddingRight: 10 }}>
                            <Image source={require('./photoimagebig.png')} style={{ height: 50, width: 50 }} />
                            </View>
                        </Image>
                    </TouchableOpacity>
                );
            }
    }
    if (this.props.data.mediaType === 'Youtube') {
        if (this.state.noint === false) {
            return (
                <TouchableOpacity 
                    onPress={() => {
                        this.props.onChangePress({ uri: this.props.data.videouri,
                        title: this.props.data.title,
                        imageuri: this.props.imageuri, 
                        caption: this.props.data.caption, 
                        tag: this.props.data.group,
                        isFavourite: this.props.data.isFavourite,
                        mediaType: 'Youtube'
                        });
                        /*
                        AsyncStorage.setItem('isSelected', JSON.stringify(
                        { uri: this.props.data.videouri,
                        title: this.props.data.title,
                        imageuri: this.props.imageuri, 
                        caption: this.props.data.caption, 
                        tag: this.props.data.group,
                        isFavourite: this.props.data.isFavourite,
                        mediaType: 'Youtube'
                        }));*/
                        //Actions.Media();
                    }
                    }
                >
                        <Image source={{ uri: this.props.data.imageuri }} style={this.props.style} onError={() => this.setState({ noint: true })}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: this.props.style.height, height: this.props.style.height, paddingBottom: 10, paddingRight: 10 }}>
                            <Image source={require('./videoicon.png')} style={{ height: 50, width: 50 }} />
                            </View>
                        </Image>
                    </TouchableOpacity>
                );
        }
        if (this.state.noint === true) {
            return (
                        <Image source={{ uri: `${Languages[this.state.languages]['118']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={this.props.style}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: this.props.style.height, height: this.props.style.height, paddingBottom: 10, paddingRight: 10 }}>
                            <Image source={require('./videoicon.png')} style={{ height: 50, width: 50 }} />
                            </View>
                        </Image>
                );
        }
    }
        if (this.props.data.mediaType === 'Music') {
            MusicPlayerController.preloadMusic([this.props.data.title, this.props.data.album, 227.004, this.props.data.artist], (metadata) => (
            <TouchableOpacity 
            onPress={() => {
                this.props.onChangePress({
                title: this.props.data.title,
                album: this.props.data.album,
                artist: this.props.data.artist,
                caption: this.props.data.caption, 
                tag: this.props.data.group,
                isFavourite: this.props.data.isFavourite,
                mediaType: 'Music'
                });
            }
            }
            >
                <Image source={require('./musicalbumart.png')} style={this.props.style}>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>  
                        <Text style={{ backgroundColor: 'transparent', color: 'white', marginTop: 10, fontFamily: 'Roboto-Light', fontSize: 20 }}>{this.props.data.title}</Text>
                    </View>
                </Image>
            </TouchableOpacity>
            ), () => (
                        <Image source={{ uri: `${Languages[this.state.languages]['115']}.png` }} style={this.props.style} />
                    ));
        }
        if (this.props.data.mediaType === 'MusicAnd') {
            return (
            <TouchableOpacity 
            onPress={() => {
                this.props.onChangePress({
                uri: this.props.data.uri,
                title: this.props.data.title,
                album: this.props.data.album,
                artist: this.props.data.artist,
                caption: this.props.data.caption, 
                tag: this.props.data.group,
                isFavourite: this.props.data.isFavourite,
                mediaType: 'MusicAnd'
                });
            }
            }
            >
                <Image source={require('./musicalbumart.png')} style={this.props.style}>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>  
                        <Text style={{ backgroundColor: 'transparent', color: 'white', marginTop: 10, fontFamily: 'Roboto-Light', fontSize: 20 }}>{this.props.data.title}</Text>
                    </View>
                </Image>
            </TouchableOpacity>
            );
        }
        if (this.props.data.mediaType === 'Video') {
            if (this.state.isnone === null) {
                return (
                    <TouchableOpacity 
                    onPress={() => {
                        this.props.onChangePress({ uri: this.props.data.uri,
                        title: this.props.data.title, 
                        caption: this.props.data.caption, 
                        tag: this.props.data.group,
                        isFavourite: this.props.data.isFavourite,
                        mediaType: 'Video'
                        });
                        /*
                        AsyncStorage.setItem('isSelected', JSON.stringify(
                        ));
                        Actions.Media();
                        */
                    }
                    }
                    >
                        <Image source={{ uri: this.props.data.uri }} style={this.props.style} onError={() => this.setState({ isnone: `${Languages[this.state.languages]['115']}${Platform.OS === 'ios' ? '.png' : ''}` })}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: this.props.style.height, height: this.props.style.height, paddingBottom: 10, paddingRight: 10 }}>
                            <Image source={require('./videoicon.png')} style={{ height: 50, width: 50 }} />
                            </View>
                        </Image>
                    </TouchableOpacity>
                );
            }
            if (this.state.isnone !== null) {
                return (
                    <TouchableOpacity 
                    onPress={() => {
                        this.props.onChangePress({ uri: this.props.data.uri,
                        title: this.props.data.title, 
                        caption: this.props.data.caption, 
                        tag: this.props.data.group,
                        isFavourite: this.props.data.isFavourite,
                        mediaType: 'Video'
                        });
                        /*
                        AsyncStorage.setItem('isSelected', JSON.stringify(
                        ));
                        Actions.Media();
                        */
                    }
                    }
                    >
                        <Image source={{ uri: this.state.isnone }} style={this.props.style}>
                            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', width: this.props.style.height, height: this.props.style.height, paddingBottom: 10, paddingRight: 10 }}>
                            <Image source={require('./videoicon.png')} style={{ height: 50, width: 50 }} />
                            </View>
                        </Image>
                    </TouchableOpacity>
                );
            }
        }
        }
    }
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
    }
}

export { PictureTile };
