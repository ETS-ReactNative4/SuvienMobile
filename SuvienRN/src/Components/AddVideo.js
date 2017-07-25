import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, ScrollView, CameraRoll, Modal, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Languages from '../Languages/Languages.json';
import { CardSection, Button, Input, Header } from './common';
import Camera from 'react-native-camera';

class AddVideo extends Component {
    state = { thumbnail: null, videosrc: null, height: null, width: null, acheivement: null, color: null, isNull: false, languages: null, heightc: null, widthc: null, cameraType: 'back', isRecording: false, videoID: null, isLaunchCam: false, title: null, caption: null, group: null, webvid: false, mediaType: null, modalVisible: false, videos: null, uri: null }
    async componentWillMount() {
        this.setState({ 
            heightc: Dimensions.get('window').height,
            widthc: Dimensions.get('window').width,
            acheivement: await AsyncStorage.getItem('Acheivement'),
            languages: await AsyncStorage.getItem('Language'),
            color: await AsyncStorage.getItem('BGColour')
        });
    }
    onAddWebVideoPress() {
        this.setState({ webvid: true });
    }

    onTakeVideoPress() {
        this.setState({ isLaunchCam: true });
    }

    onChooseVideoPress() {
        this.setState({ modalVisible: true });
        CameraRoll.getPhotos({
                first: 10000, //Quick and dirty fix. Will update to a more friendly fix in later versions
                assetType: 'Videos'
            })
            .then(r => this.setState({ videos: r.edges }));
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    async onSaveItemPress() {
        console.log(this.state.videouri);
        console.log(this.state.uri);
        if (this.state.title === null || this.state.caption === null || this.state.group === null || this.state.title === '' || this.state.caption === '' || this.state.group === '' || (this.state.videoID === null && this.state.uri === null)) {
            this.setState({ isNull: true });
        } else {
            if (this.state.mediaType === 'Youtube') {
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
                if (this.state.mediaType === 'Video') {
                    const { mediaType, uri, title, caption, group } = this.state;
                const videoobj = JSON.parse(await AsyncStorage.getItem('Videos'));
                const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
                const gen = JSON.parse(await AsyncStorage.getItem('Media'));
                const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
                videoobj.push(
                    { 
                        mediaType,
                        uri,
                        title,
                        caption,
                        group,
                        isFavourite: false,
                    }
                );
                gen.push({
                    uniqueID: objec.uniqueID, 
                    mediaType,
                    uri,
                    title,
                    caption,
                    group,
                    isFavourite: false,
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
        }
    }

    onSaveURLPress() {
        try {
            const firstsplit = this.state.videosrc.split('=');
            const secondsplit = firstsplit[1].split('&');
            this.setState({ videoID: secondsplit[0], thumbnail: `https://img.youtube.com/vi/${secondsplit[0]}/hqdefault.jpg`, mediaType: 'Youtube' });
        } catch (err) {
            this.setState({ mediaType: 'Invalid' });
        }
    }

    async createNew() {
        if (this.state.title === null || this.state.caption === null || this.state.group === null || this.state.title === '' || this.state.caption === '' || this.state.group === '' || (this.state.videoID === null && this.state.uri === null)) {
            this.setState({ isNull: true });
        } else {
            if (this.state.mediaType === 'Youtube') {
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
                if (this.state.mediaType === 'Video') {
                    const { mediaType, uri, title, caption, group } = this.state;
                const videoobj = JSON.parse(await AsyncStorage.getItem('Videos'));
                const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
                const gen = JSON.parse(await AsyncStorage.getItem('Media'));
                const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
                videoobj.push(
                    { 
                        mediaType,
                        uri,
                        title,
                        caption,
                        group,
                        isFavourite: false,
                    }
                );
                gen.push({
                    uniqueID: objec.uniqueID, 
                    mediaType,
                    uri,
                    title,
                    caption,
                    group,
                    isFavourite: false,
                });
                const findTags = mytags.find((tag) => tag === this.state.group);
                if (findTags === undefined) {
                    mytags.push(this.state.group);
                    AsyncStorage.setItem('Tags', JSON.stringify(mytags));
                }
                AsyncStorage.setItem('Videos', JSON.stringify(videoobj));
                AsyncStorage.setItem('Media', JSON.stringify(gen));
                this.setState({ thumbnail: null, videosrc: null, height: null, width: null, cameraType: 'back', videoID: null, isLaunchCam: false, title: null, caption: null, group: null, webvid: false, mediaType: null, modalVisible: false, videos: null, uri: null });
                }
        }
        
    }
    onRenderExplorer() {
        if (this.state.languages !== null) {
            if (this.state.mediaType === 'Invalid') {
                if (Platform.OS === 'ios') {
                    return (
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                            <View>
                            <CardSection style={{ borderBottomWidth: 0 }}>
                                <Image source={{ uri: `${Languages[this.state.languages]['110']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 300, width: 300 }} />
                            </CardSection>
                            </View>
                            <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onTakeVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['050']}
                                        <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onChooseVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['054']}
                                        <Image source={require('../Images/choosefromlibrary.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onAddWebVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['057']}
                                        <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                </View>
                            <CardSection style={{ borderTopWidth: 1, width: (this.state.widthc - 380), marginTop: 10 }}>
                                <Input
                                placeholder={Languages[this.state.languages]['061']}
                                label={Languages[this.state.languages]['058']}
                                value={this.state.title}
                                onChangeText={(title) => this.setState({ title })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['062']}
                                label={Languages[this.state.languages]['059']}
                                value={this.state.caption}
                                onChangeText={(caption) => this.setState({ caption })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['063']}
                                label={Languages[this.state.languages]['060']}
                                value={this.state.group}
                                onChangeText={(group) => this.setState({ group })}
                                />
                            </CardSection>
                            {this.onRenderYoutube()}
                            </View>
                        </View>
                    );
                }
                if (Platform.OS === 'android') {
                    return (
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                            <View>
                            <CardSection style={{ borderBottomWidth: 0 }}>
                                <Image source={{ uri: `${Languages[this.state.languages]['110']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 300, width: 300 }} />
                            </CardSection>
                            </View>
                            <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onTakeVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['050']}
                                        <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onAddWebVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['057']}
                                        <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                </View>
                            <CardSection style={{ borderTopWidth: 1, width: (this.state.widthc - 380), marginTop: 10 }}>
                                <Input
                                placeholder={Languages[this.state.languages]['061']}
                                label={Languages[this.state.languages]['058']}
                                value={this.state.title}
                                onChangeText={(title) => this.setState({ title })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['062']}
                                label={Languages[this.state.languages]['059']}
                                value={this.state.caption}
                                onChangeText={(caption) => this.setState({ caption })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['063']}
                                label={Languages[this.state.languages]['060']}
                                value={this.state.group}
                                onChangeText={(group) => this.setState({ group })}
                                />
                            </CardSection>
                            {this.onRenderYoutube()}
                            </View>
                        </View>
                    );
                }
            } else {
                if (Platform.OS === 'ios') {
                    if (this.state.videoID === null && this.state.uri === null) {
                        return (
                            <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                                <View>
                                <CardSection style={{ borderBottomWidth: 0 }}>
                                    <Image source={{ uri: `${Languages[this.state.languages]['065']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 300, width: 300 }} />
                                </CardSection>
                                </View>
                                <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                    <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                        <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                        <Button onPress={this.onTakeVideoPress.bind(this)}>
                                            {Languages[this.state.languages]['050']}
                                            <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                                        </Button>
                                    </CardSection>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                        <Button onPress={this.onChooseVideoPress.bind(this)}>
                                            {Languages[this.state.languages]['054']}
                                            <Image source={require('../Images/choosefromlibrary.png')} style={{ height: 40, width: 40 }} />
                                        </Button>
                                    </CardSection>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                        <Button onPress={this.onAddWebVideoPress.bind(this)}>
                                            {Languages[this.state.languages]['057']}
                                            <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                                        </Button>
                                    </CardSection>
                                    </View>
                                <CardSection style={{ borderTopWidth: 1, width: (this.state.widthc - 380), marginTop: 10 }}>
                                    <Input
                                    placeholder={Languages[this.state.languages]['061']}
                                    label={Languages[this.state.languages]['058']}
                                    value={this.state.title}
                                    onChangeText={(title) => this.setState({ title })}
                                    />
                                </CardSection>
                                <CardSection style={{ width: (this.state.widthc - 380) }}>
                                    <Input
                                    placeholder={Languages[this.state.languages]['062']}
                                    label={Languages[this.state.languages]['059']}
                                    value={this.state.caption}
                                    onChangeText={(caption) => this.setState({ caption })}
                                    />
                                </CardSection>
                                <CardSection style={{ width: (this.state.widthc - 380) }}>
                                    <Input
                                    placeholder={Languages[this.state.languages]['063']}
                                    label={Languages[this.state.languages]['060']}
                                    value={this.state.group}
                                    onChangeText={(group) => this.setState({ group })}
                                    />
                                </CardSection>
                                {this.onRenderYoutube()}
                                </View>
                            </View>
                        );
                }
                if (this.state.videoID !== null && this.state.thumbnail !== null){
                    return (
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                            <View>
                            <CardSection style={{ borderBottomWidth: 0 }}>
                                <Image source={{ uri: this.state.thumbnail }} style={{ height: 300, width: 300 }} />
                            </CardSection>
                            </View>
                            <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onTakeVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['050']}
                                        <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onChooseVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['054']}
                                        <Image source={require('../Images/choosefromlibrary.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onAddWebVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['057']}
                                        <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                </View>
                            <CardSection style={{ borderTopWidth: 1, width: (this.state.widthc - 380), marginTop: 10 }}>
                                <Input
                                placeholder={Languages[this.state.languages]['061']}
                                label={Languages[this.state.languages]['058']}
                                value={this.state.title}
                                onChangeText={(title) => this.setState({ title })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['062']}
                                label={Languages[this.state.languages]['059']}
                                value={this.state.caption}
                                onChangeText={(caption) => this.setState({ caption })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['063']}
                                label={Languages[this.state.languages]['060']}
                                value={this.state.group}
                                onChangeText={(group) => this.setState({ group })}
                                ref='username'
                                />
                            </CardSection>
                            {this.onRenderYoutube()}
                            </View>
                        </View>
                    );
                }
                if (this.state.uri !== null) {
                    return (
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                            <View>
                            <CardSection style={{ borderBottomWidth: 0 }}>
                                <Image source={{ uri: this.state.uri }} style={{ height: 300, width: 300 }} />
                            </CardSection>
                            </View>
                            <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onTakeVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['050']}
                                        <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onChooseVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['054']}
                                        <Image source={require('../Images/choosefromlibrary.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onAddWebVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['057']}
                                        <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                </View>
                            <CardSection style={{ borderTopWidth: 1, width: (this.state.widthc - 380), marginTop: 10 }}>
                                <Input
                                placeholder={Languages[this.state.languages]['061']}
                                label={Languages[this.state.languages]['058']}
                                value={this.state.title}
                                onChangeText={(title) => this.setState({ title })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['062']}
                                label={Languages[this.state.languages]['059']}
                                value={this.state.caption}
                                onChangeText={(caption) => this.setState({ caption })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['063']}
                                label={Languages[this.state.languages]['060']}
                                value={this.state.group}
                                onChangeText={(group) => this.setState({ group })}
                                ref='username'
                                />
                            </CardSection>
                            {this.onRenderYoutube()}
                            </View>
                        </View>
                    );
                }
                }
                if (Platform.OS === 'android') {
                    if (this.state.videoID === null && this.state.uri === null) {
                        return (
                            <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                                <View>
                                <CardSection style={{ borderBottomWidth: 0 }}>
                                    <Image source={{ uri: `${Languages[this.state.languages]['065']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 300, width: 300 }} />
                                </CardSection>
                                </View>
                                <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                    <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                        <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                        <Button onPress={this.onTakeVideoPress.bind(this)}>
                                            {Languages[this.state.languages]['050']}
                                            <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                                        </Button>
                                    </CardSection>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                        <Button onPress={this.onAddWebVideoPress.bind(this)}>
                                            {Languages[this.state.languages]['057']}
                                            <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                                        </Button>
                                    </CardSection>
                                    </View>
                                <CardSection style={{ borderTopWidth: 1, width: (this.state.widthc - 380), marginTop: 10 }}>
                                    <Input
                                    placeholder={Languages[this.state.languages]['061']}
                                    label={Languages[this.state.languages]['058']}
                                    value={this.state.title}
                                    onChangeText={(title) => this.setState({ title })}
                                    />
                                </CardSection>
                                <CardSection style={{ width: (this.state.widthc - 380) }}>
                                    <Input
                                    placeholder={Languages[this.state.languages]['062']}
                                    label={Languages[this.state.languages]['059']}
                                    value={this.state.caption}
                                    onChangeText={(caption) => this.setState({ caption })}
                                    />
                                </CardSection>
                                <CardSection style={{ width: (this.state.widthc - 380) }}>
                                    <Input
                                    placeholder={Languages[this.state.languages]['063']}
                                    label={Languages[this.state.languages]['060']}
                                    value={this.state.group}
                                    onChangeText={(group) => this.setState({ group })}
                                    />
                                </CardSection>
                                {this.onRenderYoutube()}
                                </View>
                            </View>
                        );
                }
                if (this.state.videoID !== null && this.state.thumbnail !== null){
                    return (
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                            <View>
                            <CardSection style={{ borderBottomWidth: 0 }}>
                                <Image source={{ uri: this.state.thumbnail }} style={{ height: 300, width: 300 }} />
                            </CardSection>
                            </View>
                            <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onTakeVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['050']}
                                        <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onAddWebVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['057']}
                                        <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                </View>
                            <CardSection style={{ borderTopWidth: 1, width: (this.state.widthc - 380), marginTop: 10 }}>
                                <Input
                                placeholder={Languages[this.state.languages]['061']}
                                label={Languages[this.state.languages]['058']}
                                value={this.state.title}
                                onChangeText={(title) => this.setState({ title })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['062']}
                                label={Languages[this.state.languages]['059']}
                                value={this.state.caption}
                                onChangeText={(caption) => this.setState({ caption })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['063']}
                                label={Languages[this.state.languages]['060']}
                                value={this.state.group}
                                onChangeText={(group) => this.setState({ group })}
                                ref='username'
                                />
                            </CardSection>
                            {this.onRenderYoutube()}
                            </View>
                        </View>
                    );
                }
                if (this.state.uri !== null) {
                    return (
                        <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                            <View>
                            <CardSection style={{ borderBottomWidth: 0 }}>
                                <Image source={{ uri: this.state.uri }} style={{ height: 300, width: 300 }} />
                            </CardSection>
                            </View>
                            <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                                    <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onTakeVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['050']}
                                        <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                                    </Button>
                                </CardSection>
                                <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                                    <Button onPress={this.onAddWebVideoPress.bind(this)}>
                                        {Languages[this.state.languages]['057']}
                                        <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                                    </Button>
                                </CardSection>
                                </View>
                            <CardSection style={{ borderTopWidth: 1, width: (this.state.widthc - 380), marginTop: 10 }}>
                                <Input
                                placeholder={Languages[this.state.languages]['061']}
                                label={Languages[this.state.languages]['058']}
                                value={this.state.title}
                                onChangeText={(title) => this.setState({ title })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['062']}
                                label={Languages[this.state.languages]['059']}
                                value={this.state.caption}
                                onChangeText={(caption) => this.setState({ caption })}
                                />
                            </CardSection>
                            <CardSection style={{ width: (this.state.widthc - 380) }}>
                                <Input
                                placeholder={Languages[this.state.languages]['063']}
                                label={Languages[this.state.languages]['060']}
                                value={this.state.group}
                                onChangeText={(group) => this.setState({ group })}
                                ref='username'
                                />
                            </CardSection>
                            {this.onRenderYoutube()}
                            </View>
                        </View>
                    );
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

    renderVideos() {
        const allvideos = this.state.videos.map((video) => 
            //For future applications, long press may prove to be more user friendly
             (
            <TouchableOpacity 
            onPress={() => {
                this.setState({ uri: video.node.image.uri, mediaType: 'Video' });/** */
                console.log(video.node.image.uri);
                this.setModalVisible(false);
                }}
                key={video.node.image.uri}
            >
                <Image style={{ height: 150, width: 150, marginLeft: 20, marginTop: 20 }} source={{ uri: video.node.image.uri }} />
            </TouchableOpacity>
            ));
            return (
                [...allvideos]
            );
    }

    onRenderYoutube() {
        
        if (this.state.webvid === true && this.state.languages !== null) {
            return (
                <View>
                    <CardSection style={{ width: (this.state.widthc - 380), marginTop: 10 }}>
                                <Input
                        placeholder="https://www.youtube.com/watch?v=KVZ-P-ZI6W4"
                        label="URL"
                        value={this.state.videosrc}
                        onChangeText={(videosrc) => this.setState({ videosrc })}
                        />
                            </CardSection>
                    <CardSection>
                        <Button onPress={this.onSaveURLPress.bind(this)}>
                            {Languages[this.state.languages]['083']}
                        </Button>
                    </CardSection>
                </View>
            );
        }
    }
    startRecording() {
    console.log('start rec');
    this.setState({ isRecording: true });
    this.camera.capture()
      .then((data) => {
        console.log('capturing...');
        console.log(data);
        this.setState({ isLaunchCam: false, uri: data.path, mediaType: 'Video', isRecording: false });
      });
  }

  stopRecording() {
    console.log('stop rec');
    this.camera.stopCapture();
  }

     onSwitchCameraPress() {
        if (this.state.cameraType === 'front') {
            this.setState({ cameraType: 'back' });
        }
        if (this.state.cameraType === 'back') {
            this.setState({ cameraType: 'front' });
        }
    }

    render() {
        if (this.state.languages !== null) {
            if (this.state.acheivement === null || this.state.acheivement === 'INCOM') {
                if (this.state.isLaunchCam === false) {
                    if (this.state.videos !== null) {
                return (
                    <View style={{ flex: 1 }}>
                        <Modal
                        animationType={"fade"}
                        transparent
                        visible={this.state.isNull}
                        onRequestClose={() => {}}
        >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: `blankfield${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 200, width: 400 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', marginLeft: 20, alignSelf: 'center', alignContent: 'center' }}>{Languages[this.state.languages]['111']}</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 30, marginTop: 10 }}>{Languages[this.state.languages]['112']}</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                this.setState({ isNull: false });
                                }}
                                >
                            {Languages[this.state.languages]['113']}
                                </Button>
                            </CardSection>
                        </View>
                        </View>
                        </Modal>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['085']}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                            <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </Header>
                    <ScrollView>
                        <View style={{ marginTop: 10, flex: 1 }}>
                            <Modal
                                animationType={'fade'}
                                transparent
                                visible={this.state.modalVisible}
                                onRequestClose={() => {}}
                            >
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: this.state.color }}>
                                        <View style={{ width: 910, backgroundColor: '#D9D9D9', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                            <TouchableWithoutFeedback onPress={() => this.setState({ videos: null })}>
                                        <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 40, width: 40, marginRight: 5 }} />
                                    </TouchableWithoutFeedback>
                                            <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['088']}</Text>
                                        </View>
                                        <View style={{ height: 590, width: 910, backgroundColor: '#EFEFEF', position: 'relative', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                            <ScrollView>
                                                <View style={{ marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    {this.renderVideos()}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </Modal>
                                {this.onRenderExplorer()}
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                <CardSection>
                                <Button onPress={this.onSaveItemPress.bind(this)}>
                                    {Languages[this.state.languages]['067']}  <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                                </Button>
                                </CardSection>
                                <CardSection>
                                <Button onPress={() => Actions.Settings()}>
                                    {Languages[this.state.languages]['069']}
                                </Button>
                                </CardSection>
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                );
            }
            if (this.state.videos === null) {
                return (
                    <View style={{ flex: 1 }}>
                        <Modal
                        animationType={"fade"}
                        transparent
                        visible={this.state.isNull}
                        onRequestClose={() => {}}
        >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: `blankfield${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 200, width: 400 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', marginLeft: 20, alignSelf: 'center', alignContent: 'center' }}>{Languages[this.state.languages]['111']}</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 30, marginTop: 10 }}>{Languages[this.state.languages]['112']}</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                this.setState({ isNull: false });
                                }}
                                >
                            {Languages[this.state.languages]['113']}
                                </Button>
                            </CardSection>
                        </View>
                        </View>
                        </Modal>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['085']}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                            <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </Header>
                    <ScrollView>
                        <View style={{ marginTop: 10, flex: 1 }}>
                            {this.onRenderExplorer()}
                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <CardSection>
                            <Button onPress={this.onSaveItemPress.bind(this)}>
                                {Languages[this.state.languages]['067']}  <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                            </Button>
                            </CardSection>
                            <CardSection>
                            <Button onPress={() => Actions.Settings()}>
                                {Languages[this.state.languages]['069']}
                            </Button>
                            </CardSection>
                        </View>
                        </View>
                    </ScrollView>
                    </View>
                );
            }
                }
            if (this.state.isLaunchCam === true) {
                if (this.state.isRecording === true) {
                    return (
                        <View style={styles.container}>
                            <Camera
                            ref={(cam) => {
                            this.camera = cam;
                            }}
                            style={styles.preview}
                            playSoundOnCapture={false}
                            aspect={Camera.constants.Aspect.fill}
                            captureMode={Camera.constants.CaptureMode.video}
                            captureAudio={true}
                            onFocusChanged={() => {}}
                            onZoomChanged={() => {}}
                            type={this.state.cameraType}
                            >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', width: this.state.widthc, height: this.state.heightc }}>
                            <Image source={{ uri: `${Languages[this.state.languages]['117']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ alignSelf: 'flex-start', height: 100, width: 200, marginRight: (this.state.widthc - 350) }} />
                                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', width: 150, height: this.state.heightc }}>
                                    <TouchableWithoutFeedback onPress={this.startRecording.bind(this)}>
                                        <Image source={require('../Images/startrecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this.stopRecording.bind(this)}>
                                        <Image source={require('../Images/stoprecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this.onSwitchCameraPress.bind(this)}>
                                        <Image source={require('../Images/switchcamera.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.setState({ isLaunchCam: null, videos: null, isRecording: false })}>
                                        <Image source={{ uri: `backbutton${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                    </TouchableWithoutFeedback>
                                </View>
                        </View>
                </Camera>
              </View>
            );
                }
            if (this.state.isRecording === false) {
                return (
                    <View style={styles.container}>
                        <Camera
                        ref={(cam) => {
                        this.camera = cam;
                        }}
                        style={styles.preview}
                        playSoundOnCapture={false}
                        aspect={Camera.constants.Aspect.fill}
                        captureMode={Camera.constants.CaptureMode.video}
                        captureAudio={true}
                        onFocusChanged={() => {}}
                        onZoomChanged={() => {}}
                        type={this.state.cameraType}
                        >
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', width: this.state.widthc, height: this.state.heightc }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', width: 150, height: this.state.heightc }}>
                                <TouchableWithoutFeedback onPress={this.startRecording.bind(this)}>
                                    <Image source={require('../Images/startrecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.stopRecording.bind(this)}>
                                    <Image source={require('../Images/stoprecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.onSwitchCameraPress.bind(this)}>
                                    <Image source={require('../Images/switchcamera.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.setState({ videos: null, isLaunchCam: false })}>
                                <Image source={{ uri: `backbutton${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                            </View>
                    </View>
            </Camera>
          </View>
        );
            }
            }
            }
            if (this.state.acheivement !== null && this.state.acheivement !== 'INCOM') {
                    if (this.state.isLaunchCam === false) {
                    if (this.state.videos !== null) {
                return (
                    <View style={{ flex: 1 }}>
                        <Modal
                        animationType={"fade"}
                        transparent
                        visible={this.state.isNull}
                        onRequestClose={() => {}}
        >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: `blankfield${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 200, width: 400 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', marginLeft: 20, alignSelf: 'center', alignContent: 'center' }}>{Languages[this.state.languages]['111']}</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 30, marginTop: 10 }}>{Languages[this.state.languages]['112']}</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                this.setState({ isNull: false });
                                }}
                                >
                            {Languages[this.state.languages]['113']}
                                </Button>
                            </CardSection>
                        </View>
                        </View>
                        </Modal>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['085']}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                            <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </Header>
                    <ScrollView>
                        <View style={{ marginTop: 10, flex: 1 }}>
                            <Modal
                                animationType={'fade'}
                                transparent
                                visible={this.state.modalVisible}
                                onRequestClose={() => {}}
                            >
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: this.state.color }}>
                                        <View style={{ width: 910, backgroundColor: '#D9D9D9', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                            <TouchableWithoutFeedback onPress={() => this.setState({ videos: null })}>
                                        <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 40, width: 40, marginRight: 5 }} />
                                    </TouchableWithoutFeedback>
                                            <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['088']}</Text>
                                        </View>
                                        <View style={{ height: 590, width: 910, backgroundColor: '#EFEFEF', position: 'relative', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                            <ScrollView>
                                                <View style={{ marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                                                    {this.renderVideos()}
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </Modal>
                                {this.onRenderExplorer()}
                                <View style={{ marginTop: 10, marginBottom: 10 }}>
                                <CardSection>
                                <Button onPress={this.onSaveItemPress.bind(this)}>
                                    {Languages[this.state.languages]['067']}  <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                                </Button>
                                </CardSection>
                                <CardSection>
                                <Button onPress={this.createNew.bind(this)}>
                                    {Languages[this.state.languages]['068']}  <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                                </Button>
                                </CardSection>
                                <CardSection>
                                <Button onPress={() => Actions.Settings()}>
                                    {Languages[this.state.languages]['069']}
                                </Button>
                                </CardSection>
                            </View>
                        </View>
                    </ScrollView>
                    </View>
                );
            }
            if (this.state.videos === null) {
                return (
                    <View style={{ flex: 1 }}>
                        <Modal
                        animationType={"fade"}
                        transparent
                        visible={this.state.isNull}
                        onRequestClose={() => {}}
        >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: `blankfield${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 200, width: 400 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', marginLeft: 20, alignSelf: 'center', alignContent: 'center' }}>{Languages[this.state.languages]['111']}</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 30, marginTop: 10 }}>{Languages[this.state.languages]['112']}</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                this.setState({ isNull: false });
                                }}
                                >
                            {Languages[this.state.languages]['113']}
                                </Button>
                            </CardSection>
                        </View>
                        </View>
                        </Modal>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['085']}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                            <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </Header>
                    <ScrollView>
                        <View style={{ marginTop: 10, flex: 1 }}>
                            {this.onRenderExplorer()}
                            <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <CardSection>
                            <Button onPress={this.onSaveItemPress.bind(this)}>
                                {Languages[this.state.languages]['067']}  <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                            </Button>
                            </CardSection>
                            <CardSection>
                            <Button onPress={this.createNew.bind(this)}>
                                {Languages[this.state.languages]['068']}  <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                            </Button>
                            </CardSection>
                            <CardSection>
                            <Button onPress={() => Actions.Settings()}>
                                {Languages[this.state.languages]['069']}
                            </Button>
                            </CardSection>
                        </View>
                        </View>
                    </ScrollView>
                    </View>
                );
            }
                }
                if (this.state.isLaunchCam === true) {
                    if (this.state.isRecording === true) {
                        return (
                            <View style={styles.container}>
                                <Camera
                                ref={(cam) => {
                                this.camera = cam;
                                }}
                                style={styles.preview}
                                playSoundOnCapture={false}
                                aspect={Camera.constants.Aspect.fill}
                                captureMode={Camera.constants.CaptureMode.video}
                                captureAudio={true}
                                onFocusChanged={() => {}}
                                onZoomChanged={() => {}}
                                type={this.state.cameraType}
                                >
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', width: this.state.widthc, height: this.state.heightc }}>
                                <Image source={{ uri: `${Languages[this.state.languages]['117']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ alignSelf: 'flex-start', height: 100, width: 200, marginRight: (this.state.widthc - 350) }} />
                                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', width: 150, height: this.state.heightc }}>
                                        <TouchableWithoutFeedback onPress={this.startRecording.bind(this)}>
                                            <Image source={require('../Images/startrecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={this.stopRecording.bind(this)}>
                                            <Image source={require('../Images/stoprecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={this.onSwitchCameraPress.bind(this)}>
                                            <Image source={require('../Images/switchcamera.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this.setState({ videos: null, isLaunchCam: false, isRecording: false })}>
                                        <Image source={{ uri: `backbutton${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                    </TouchableWithoutFeedback>
                                    </View>
                            </View>
                    </Camera>
                  </View>
                );
                    }
                if (this.state.isRecording === false) {
                    return (
                        <View style={styles.container}>
                            <Camera
                            ref={(cam) => {
                            this.camera = cam;
                            }}
                            style={styles.preview}
                            playSoundOnCapture={false}
                            captureAudio={true}
                            aspect={Camera.constants.Aspect.fill}
                            captureMode={Camera.constants.CaptureMode.video}
                            onFocusChanged={() => {}}
                            onZoomChanged={() => {}}
                            type={this.state.cameraType}
                            >
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', width: this.state.widthc, height: this.state.heightc }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', width: 150, height: this.state.heightc }}>
                                    <TouchableWithoutFeedback onPress={this.startRecording.bind(this)}>
                                        <Image source={require('../Images/startrecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this.stopRecording.bind(this)}>
                                        <Image source={require('../Images/stoprecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={this.onSwitchCameraPress.bind(this)}>
                                        <Image source={require('../Images/switchcamera.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.setState({ videos: null, isLaunchCam: false })}>
                                    <Image source={{ uri: `backbutton${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 100, width: 100, marginBottom: 25 }} />
                                </TouchableWithoutFeedback>
                                </View>
                        </View>
                </Camera>
              </View>
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
const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};

export { AddVideo };
