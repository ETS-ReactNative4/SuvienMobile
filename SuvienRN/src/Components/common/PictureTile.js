import React, { Component } from 'react';
import { Text, TouchableOpacity, Image, AsyncStorage, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Actions } from 'react-native-router-flux';

class PictureTile extends Component {
    state = { imageuri: null, caption: null, tag: null, isNull: true }

    render() {
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
                <Image source={require('./nocontent.png')} style={this.props.style} />
            </TouchableOpacity>
        );
    }
    if (this.props.data !== null) {
        if (this.props.data.mediaType === 'Photo'){
            return (
            <TouchableOpacity 
            onPress={() => {
                AsyncStorage.setItem('isSelected', JSON.stringify(
                { uri: this.props.data.imageuri,
                title: this.props.data.title, 
                caption: this.props.data.caption, 
                tag: this.props.data.group,
                height: this.props.data.height,
                width: this.props.data.width,
                isFavourite: this.props.data.isFavourite,
                mediaType: 'Photo'
                }));
                Actions.Media();
            }
            }
            >
                <Image source={{ uri: this.props.data.imageuri }} style={this.props.style} />
            </TouchableOpacity>
        );
    }
    if (this.props.data.mediaType === 'Youtube') {
        return (
        <TouchableOpacity 
            onPress={() => {
                AsyncStorage.setItem('isSelected', JSON.stringify(
                { uri: this.props.data.videouri,
                title: this.props.data.title,
                imageuri: this.props.imageuri, 
                caption: this.props.data.caption, 
                tag: this.props.data.group,
                isFavourite: this.props.data.isFavourite,
                mediaType: 'Youtube'
                }));
                Actions.Media();
            }
            }
        >
                <Image source={{ uri: this.props.data.imageuri }} style={this.props.style} />
            </TouchableOpacity>
        );
    }
        if (this.props.data.mediaType === 'Music') {
            return (
            <TouchableOpacity 
            onPress={() => {
                AsyncStorage.setItem('isSelected', JSON.stringify(
                {
                title: this.props.data.title,
                album: this.props.data.album,
                artist: this.props.data.artist,
                caption: this.props.data.caption, 
                tag: this.props.data.group,
                isFavourite: this.props.data.isFavourite,
                mediaType: 'Music'
                }));
                Actions.Media();
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
        if (this.props.data.mediaType === 'MusicAnd') {
            return (
            <TouchableOpacity 
            onPress={() => {
                AsyncStorage.setItem('isSelected', JSON.stringify(
                {
                uri: this.props.data.uri,
                title: this.props.data.title,
                album: this.props.data.album,
                artist: this.props.data.artist,
                caption: this.props.data.caption, 
                tag: this.props.data.group,
                isFavourite: this.props.data.isFavourite,
                mediaType: 'MusicAnd'
                }));
                Actions.Media();
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
            return (
            <TouchableOpacity 
            onPress={() => {
                AsyncStorage.setItem('isSelected', JSON.stringify(
                { uri: this.props.data.uri,
                title: this.props.data.title, 
                caption: this.props.data.caption, 
                tag: this.props.data.group,
                isFavourite: this.props.data.isFavourite,
                mediaType: 'Video'
                }));
                Actions.Media();
            }
            }
            >
                <Image source={{ uri: this.props.data.uri }} style={this.props.style} />
            </TouchableOpacity>
        );
        }
        }
    }
}

export { PictureTile };
