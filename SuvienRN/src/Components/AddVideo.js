import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Input } from './common';

class AddVideo extends Component {
    state = { thumbnail: null, videosrc: null, videoID: null, title: null, caption: null, group: null, webvid: false, mediaType: null }
    onAddWebVideoPress() {
        this.setState({ webvid: true });
    }

    onTakeVideoPress() {

    }

    onChooseVideoPress() {

    }

    async onSaveItemPress() {
        const { mediaType, videoID, thumbnail, title, caption, group } = this.state;
        const videoobj = JSON.parse(await AsyncStorage.getItem('Videos'));
        const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
        const gen = JSON.parse(await AsyncStorage.getItem('Media'));
        const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
        videoobj.push(
            { 
                mediaType,
                videouri: videoID,
                imageuri: thumbnail,
                title,
                caption,
                group,
                isFavourite: false
            }
        );
        gen.push({
            uniqueID: objec.uniqueID, 
            title,
            videouri: videoID,
            imageuri: thumbnail, 
            caption, 
            group,
            isFavourite: false,
            mediaType 
        });
        const findTags = mytags.find((tag) => tag === this.state.group);
        if (findTags === undefined) {
            mytags.push(this.state.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        AsyncStorage.setItem('Videos', JSON.stringify(videoobj));
        AsyncStorage.setItem('Media', JSON.stringify(gen));
        Actions.Home();
    }

    onSaveURLPress() {
        const firstsplit = this.state.videosrc.split('=');
        const secondsplit = firstsplit[1].split('&');
        this.setState({ videoID: secondsplit[0], thumbnail: `https://img.youtube.com/vi/${secondsplit[0]}/hqdefault.jpg`, mediaType: 'Youtube' });
    }

    onRenderExplorer() {
        if (this.state.videoID === null) {
            return (
                <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={require('../Images/nocontent.jpg')} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="At the Beach"
                        label="Title"
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="Family vacation to Hawaii"
                        label="Caption"
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder="SummerVacation2017"
                        label="Tag"
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            Save and Continue
                            <Image source={require('../Images/saveicon.jpg')} style={{ height: 30, width: 40 }} />
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => Actions.Home()}>
                            Return to Home
                        </Button>
                    </CardSection>
                </View>
                </ScrollView>
            );
        }
        if (this.state.videoID !== null && this.state.thumbnail !== null){
            return (
                <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: this.state.thumbnail }} style={{ height: 360, width: 480 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="At the Beach"
                        label="Title"
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="Family vacation to Hawaii"
                        label="Caption"
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder="SummerVacation2017"
                        label="Tag"
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            Save and Continue
                            <Image source={require('../Images/saveicon.jpg')} style={{ height: 30, width: 40 }} />
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => Actions.Home()}>
                            Return to Home
                        </Button>
                    </CardSection>
                </View>
                </ScrollView>
            );
        }
    }

    onRenderYoutube() {
        if (this.state.webvid === true) {
            return (
                <View>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="https://www.youtube.com/watch?v=KVZ-P-ZI6W4"
                        label="URL"
                        value={this.state.videosrc}
                        onChangeText={(videosrc) => this.setState({ videosrc })}
                        />
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onSaveURLPress.bind(this)}>
                            Save
                        </Button>
                    </CardSection>
                </View>
            );
        }
    }
    render() {
        return (
            <ScrollView>
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
                    {this.onRenderYoutube()}
                    {this.onRenderExplorer()}
                </View>
            </ScrollView>
        );
    }
}

export { AddVideo };
