import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, ScrollView, CameraRoll, Modal, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Languages from '../Languages/Languages.json';
import { CardSection, Button, Input, Header } from './common';
import Camera from 'react-native-camera';

class AddVideo extends Component {
    state = { thumbnail: null, videosrc: null, height: null, width: null, acheivement: null, languages: null, heightc: null, widthc: null, cameraType: 'back', videoID: null, isLaunchCam: false, title: null, caption: null, group: null, webvid: false, mediaType: null, modalVisible: false, videos: null, uri: null }
    async componentWillMount() {
        this.setState({ 
            heightc: Dimensions.get('window').height,
            widthc: Dimensions.get('window').width,
            acheivement: await AsyncStorage.getItem('Acheivement'),
            languages: await AsyncStorage.getItem('Language')
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

    onSaveURLPress() {
        const firstsplit = this.state.videosrc.split('=');
        const secondsplit = firstsplit[1].split('&');
        this.setState({ videoID: secondsplit[0], thumbnail: `https://img.youtube.com/vi/${secondsplit[0]}/hqdefault.jpg`, mediaType: 'Youtube' });
    }

    async createNew() {
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
    onRenderExplorer() {
        if (this.state.languages !== null) {
            if (this.state.acheivement !== null && this.state.acheivement !== 'INCOM') {
            if (this.state.videoID === null && this.state.uri === null) {
            return (
                <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: `${Languages[this.state.languages]['065']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['061']}
                        label={Languages[this.state.languages]['058']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['062']}
                        label={Languages[this.state.languages]['059']}
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder={Languages[this.state.languages]['063']}
                        label={Languages[this.state.languages]['060']}
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            {Languages[this.state.languages]['068']}
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
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
                        placeholder={Languages[this.state.languages]['061']}
                        label={Languages[this.state.languages]['058']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['062']}
                        label={Languages[this.state.languages]['059']}
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder={Languages[this.state.languages]['063']}
                        label={Languages[this.state.languages]['060']}
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            {Languages[this.state.languages]['068']}
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
                </View>
                </ScrollView>
            );
        }
        if (this.state.uri !== null) {
            return (
                <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: this.state.uri }} style={{ height: 360, width: 480 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['061']}
                        label={Languages[this.state.languages]['058']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['062']}
                        label={Languages[this.state.languages]['059']}
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder={Languages[this.state.languages]['063']}
                        label={Languages[this.state.languages]['060']}
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            {Languages[this.state.languages]['068']}
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
                </View>
                </ScrollView>
            );
        }
    }
        if (this.state.acheivement === null || this.state.acheivement === 'INCOM') {
            if (this.state.videoID === null && this.state.uri === null) {
            return (
                <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: `${Languages[this.state.languages]['065']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['061']}
                        label={Languages[this.state.languages]['058']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['062']}
                        label={Languages[this.state.languages]['059']}
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder={Languages[this.state.languages]['063']}
                        label={Languages[this.state.languages]['060']}
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
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
                        placeholder={Languages[this.state.languages]['061']}
                        label={Languages[this.state.languages]['058']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['062']}
                        label={Languages[this.state.languages]['059']}
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder={Languages[this.state.languages]['063']}
                        label={Languages[this.state.languages]['060']}
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
                </View>
                </ScrollView>
            );
        }
        if (this.state.uri !== null) {
            return (
                <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: this.state.uri }} style={{ height: 360, width: 480 }} />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['061']}
                        label={Languages[this.state.languages]['058']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        />
                    </CardSection>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder={Languages[this.state.languages]['062']}
                        label={Languages[this.state.languages]['059']}
                        value={this.state.caption}
                        onChangeText={(caption) => this.setState({ caption })}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        placeholder={Languages[this.state.languages]['063']}
                        label={Languages[this.state.languages]['060']}
                        value={this.state.group}
                        onChangeText={(group) => this.setState({ group })}
                        />
                    </CardSection>
                    <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
                </View>
                </ScrollView>
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
                            {Languages[this.state.languages]['083']}
                        </Button>
                    </CardSection>
                </View>
            );
        }
    }
    startRecording() {
    console.log('start rec');

    this.camera.capture()
      .then((data) => {
        console.log('capturing...');
        console.log(data);
        this.setState({ isLaunchCam: false, uri: data.path, mediaType: 'Video' });
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
            if (Platform.OS === 'ios') {
            if (this.state.isLaunchCam === false) {
            if (this.state.videos !== null) {
        return (
            <View style={{ flex: 1 }}>
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
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ width: 910, backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
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
                    <CardSection>
                        <Button onPress={this.onTakeVideoPress.bind(this)}>
                            {Languages[this.state.languages]['050']}
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onChooseVideoPress.bind(this)}>
                            {Languages[this.state.languages]['054']}
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onAddWebVideoPress.bind(this)}>
                            {Languages[this.state.languages]['057']}
                        </Button>
                    </CardSection>
                    {this.onRenderYoutube()}
                    {this.onRenderExplorer()}
                </View>
            </ScrollView>
            </View>
        );
    }
    if (this.state.videos === null) {
        return (
            <View style={{ flex: 1 }}>
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
                    <CardSection>
                        <Button onPress={this.onTakeVideoPress.bind(this)}>
                            {Languages[this.state.languages]['050']}
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onChooseVideoPress.bind(this)}>
                            {Languages[this.state.languages]['054']}
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onAddWebVideoPress.bind(this)}>
                            {Languages[this.state.languages]['057']}
                        </Button>
                    </CardSection>
                    {this.onRenderYoutube()}
                    {this.onRenderExplorer()}
                </View>
            </ScrollView>
            </View>
        );
    }
        }
    if (this.state.isLaunchCam === true) {
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
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                                <Image source={require('../Images/home.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                        </View>
                </View>
        </Camera>
      </View>
    );
    }
        }
    if (Platform.OS === 'android') {
        if (this.state.isLaunchCam === false) {
            if (this.state.videos !== null) {
        return (
            <View style={{ flex: 1 }}>
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
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ width: 910, backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
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
                    <CardSection>
                        <Button onPress={this.onTakeVideoPress.bind(this)}>
                            {Languages[this.state.languages]['050']}
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onAddWebVideoPress.bind(this)}>
                            {Languages[this.state.languages]['057']}
                        </Button>
                    </CardSection>
                    {this.onRenderYoutube()}
                    {this.onRenderExplorer()}
                </View>
            </ScrollView>
            </View>
        );
    }
    if (this.state.videos === null) {
        return (
            <View style={{ flex: 1 }}>
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
                    <CardSection>
                        <Button onPress={this.onTakeVideoPress.bind(this)}>
                            {Languages[this.state.languages]['050']}
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={this.onAddWebVideoPress.bind(this)}>
                            {Languages[this.state.languages]['057']}
                        </Button>
                    </CardSection>
                    {this.onRenderYoutube()}
                    {this.onRenderExplorer()}
                </View>
            </ScrollView>
            </View>
        );
    }
        }
    if (this.state.isLaunchCam === true) {
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
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                                <Image source={require('../Images/home.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                        </View>
                </View>
        </Camera>
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
