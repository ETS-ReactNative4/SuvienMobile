import React, { Component } from 'react';
import MusicPlayerController from 'react-native-musicplayercontroller';
import { View, AsyncStorage, Image, Text, ScrollView } from 'react-native';
import { CardSection, Button, Input } from './common';
import { Actions } from 'react-native-router-flux';

class AddAudio extends Component {
    state = { information: null, caption: null, group: null }
    async onRecordAudioPress() {
       MusicPlayerController.playMusic(() => {
            console.log('I playin!');
    // Successfully playing
}, () => {
    console.log('I failed Nooooo');
    // Failed to play
});
    //console.log(JSON.parse(await AsyncStorage.getItem('samplemusic')));
}
//WARNING! Make sure to fix the unique id problem!! you need to add a check for presets
    async onSaveItemPress() {
        const { information, caption, group } = this.state;
        const audios = JSON.parse(await AsyncStorage.getItem('Audio'));
        const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
        const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
        const gen = JSON.parse(await AsyncStorage.getItem('Media'));
        audios.push({
            title: information[0],
            album: information[1],
            artist: information[3],
            caption,
            group,
            isFavourite: false,
            mediaType: 'Music'
        });
        gen.push({
            uniqueID: objec.uniqueID,
            title: information[0],
            album: information[1],
            artist: information[3],
            caption,
            group,
            isFavourite: false,
            mediaType: 'Music'
        });
        const findTags = mytags.find((tag) => tag === this.state.group);
        if (findTags === undefined) {
            mytags.push(this.state.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        AsyncStorage.setItem('Media', JSON.stringify(gen));
        AsyncStorage.setItem('Audio', JSON.stringify(audios));
        console.log(await AsyncStorage.getItem('Audio'));
        Actions.Home();
    }
    
    onAudioSelect() {
        if (this.state.information === null) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={require('../Images/noimage.jpg')} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Title</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>None</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Album</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>None</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Artist</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>None</Text>
                        </View>
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
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 40 }} />
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => Actions.Home()}>
                            Return to Home
                        </Button>
                    </CardSection>
                </View>
            );
        }
        if (this.state.information !== null) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={require('../Images/musicalbumart.png')} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Title</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.information[0]}</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Album</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.information[1]}</Text>
                        </View>
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Artist</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.information[3]}</Text>
                        </View>
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
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 40 }} />
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => Actions.Home()}>
                            Return to Home
                        </Button>
                    </CardSection>
                </View>
            );
        }
    }

    async onChooseMusicPress() {
    MusicPlayerController.presentPicker(false, (metadata) => {
        //console.log(metadata[0].uri);
        //this.setState({ audiopath: metadata[0].uri });
        console.log(metadata[0]);
        this.setState({ information: [metadata[0].title, metadata[0].albumTitle, metadata[0].playbackDuration, metadata[0].artist] });
    }, () => {
        console.log('Cancel');
    });
    }

    async onAddWebAudioPress() {
        //AsyncStorage.setItem('samplemusic', JSON.stringify(this.state.audiopath));
        //this.setState({ audiopath: JSON.parse(await AsyncStorage.getItem('samplemusic')) });
        //To add later: an actual link to async storage through state
        //const title = this.state.audiopath.toString();
        /*MusicPlayerController.preloadMusic(this.state.audiopath, (metadata) => {
            console.log('I found the music! Its:');
            console.log(metadata);
        }, () => {
            console.log('I didnt find it :(');
        });*/
        //This is currently all configured for ios
        MusicPlayerController.preloadMusic(['It Wasn\'t Me', 'Hot Shot', 227.004, 'Ricardo "RikRok" Ducent/Shaggy'], (metadata) => {
            console.log('I found the music! Its:');
            console.log(metadata);
        }, () => {
            console.log('I didnt find it :(');
        });
        console.log('I preloaded the music!');
        //AsyncStorage.setItem('samplemusic', JSON.stringify(this.state.audiopath));
    }
    
    render() {
        return (
            <View style={{ marginTop: 60, flex: 1 }}>
                <ScrollView>
                    <CardSection>
                        <Button onPress={this.onRecordAudioPress.bind(this)}>
                            Record Audio
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onChooseMusicPress.bind(this)}>
                            Choose from Music Library
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onAddWebAudioPress.bind(this)}>
                            Add from Youtube using URL
                        </Button>
                    </CardSection>
                    {this.onAudioSelect()}
                </ScrollView>
            </View>
        );
    }
}

export { AddAudio };
