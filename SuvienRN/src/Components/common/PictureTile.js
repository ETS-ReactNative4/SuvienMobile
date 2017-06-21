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
                    console.log(this.props.unique);
                    Actions.MediaExplorer();
                    }
                    }
            >
                <Image source={require('./nocontent.jpg')} style={this.props.style} />
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
                console.log(this.props.data.mediaType);
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
                imageuri: this.props.imageuri, 
                caption: this.props.data.caption, 
                tag: this.props.data.group,
                isFavourite: this.props.data.isFavourite,
                mediaType: 'Youtube'
                }));
                console.log(this.props.data.mediaType);
                Actions.Media();
            }
            }
        >
                <Image source={{ uri: this.props.data.imageuri }} style={this.props.style} />
            </TouchableOpacity>
        );
    }
        }
    }
}

export { PictureTile };
