//Add save and create new to photos.
//Add save and return to settings
//Return to home.
import React, { Component } from 'react';
import { View, AsyncStorage, Text, Image, Modal, ScrollView, CameraRoll, TouchableOpacity, TouchableWithoutFeedback, Platform, Dimensions } from 'react-native';
import { CardSection, Button, Input, Header } from './common';
import Languages from '../Languages/Languages.json';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import Orientation from 'react-native-orientation';

class AddPhoto extends Component {
    state = { imageuri: null, caption: null, group: null, languages: null, acheivement: null, color: null, isNull: false, modalVisible: false, photos: null, height: null, width: null, title: null, isFavourite: false, isRecording: false, heightc: null, widthc: null, cameraType: 'back', webphoto: null, imgsrc: null } //'file:///var/mobile/Containers/Data/Application/96AF4229-C558-4743-8B14-D280B93DF4E9/Documents/images/44643C96-6A95-47A1-9B27-2EA09F2319B2.jpg'
    async componentWillMount() {
        Orientation.lockToLandscape();
        console.log(await AsyncStorage.getItem('Language'));
        this.setState({ 
            heightc: Dimensions.get('window').height,
            widthc: Dimensions.get('window').width,
            acheivement: await AsyncStorage.getItem('Acheivement'),
            languages: await AsyncStorage.getItem('Language'),
            color: await AsyncStorage.getItem('BGColour')
        });
    }
    async onSaveItemPress() {
        if (this.state.title === null || this.state.caption === null || this.state.group === null || this.state.title === '' || this.state.caption === '' || this.state.group === '' || (this.state.imgsrc === null && this.state.imageuri === null)) {
            this.setState({ isNull: true });
        } else {
            const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
            const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
            const gen = JSON.parse(await AsyncStorage.getItem('Media'));
            const photos = JSON.parse(await AsyncStorage.getItem('Pictures'));
            photos.push({
                title: this.state.title,
                imageuri: this.state.imageuri, 
                caption: this.state.caption, 
                group: this.state.group,
                height: this.state.height,
                width: this.state.width,
                isFavourite: this.state.isFavourite,
                mediaType: 'Photo'
            });
            gen.push({
                uniqueID: objec.uniqueID, 
                title: this.state.title,
                imageuri: this.state.imageuri, 
                caption: this.state.caption, 
                group: this.state.group,
                height: this.state.height,
                width: this.state.width,
                isFavourite: this.state.isFavourite,
                mediaType: 'Photo'
            });
            objec.uri = this.state.imageuri;
            objec.title = this.state.title;
            objec.caption = this.state.caption;
            objec.group = this.state.group;
            objec.height = this.state.height;
            objec.width = this.state.width;
            objec.isFavourite = this.state.isFavourite;
            objec.mediaType = 'Photo';
            const findTags = mytags.find((tag) => tag === this.state.group);
            if (findTags === undefined) {
                mytags.push(this.state.group);
                AsyncStorage.setItem('Tags', JSON.stringify(mytags));
            }
            AsyncStorage.setItem('uniqueID', JSON.stringify(objec));
            AsyncStorage.setItem('Media', JSON.stringify(gen));
            AsyncStorage.setItem('Pictures', JSON.stringify(photos));
            //console.log(JSON.parse(await AsyncStorage.getItem(namefile)));
            Actions.Home();
        }
    }

    onSaveURLPress() {
        const url = this.state.imgsrc;
        if (url.substring(0, 7) !== 'http://' || url.substring(0, 8) !== 'https://') {
            Image.getSize(`https://${this.state.imgsrc}`, (width, height) => { this.setState({ height, width, imageuri: `http://${this.state.imgsrc}` }); });
        } else {
            Image.getSize(this.state.imgsrc, (width, height) => { this.setState({ height, width, imageuri: this.state.imgsrc }); });
        }
    }

    renderWeb() {
        if (this.state.webphoto === true && this.state.languages !== null) {
            return (
                <View style={{ width: (this.state.widthc - 380) }}>
                    <CardSection style={{ borderTopWidth: 0, width: (this.state.widthc - 380), backgroundColor: 'white' }}>
                        <Input
                        placeholder="https://68.media.tumblr.com/58023028ed8452496ba154aa4b0c229f/tumblr_nnorxsvxtT1tmz3boo1_500.jpg"
                        label="URL"
                        value={this.state.imgsrc}
                        onChangeText={(imgsrc) => this.setState({ imgsrc })}
                        />
                    </CardSection>
                    <CardSection style={{ width: (this.state.widthc - 500), backgroundColor: 'white', marginRight: 100 }}>
                        <Button onPress={this.onSaveURLPress.bind(this)}>
                            {Languages[this.state.languages]['083']}
                        </Button>
                    </CardSection>
                </View>
            );
        }
        else {
            return (
                <View />
            );
        }
    }
    onTakePhotoPress() {
        return (
            this.setState({ isRecording: true })
            /*
            ImagePicker.launchCamera(options, (response) => {
                const source = { uri: response.uri };
                if (source.uri === undefined) {
                    source.uri = null;
                }
                this.setState({ imageuri: source });
                console.log(this.state.imageuri);
            })*/);
    }

    onPressPhotos() {
            CameraRoll.getPhotos({
                first: 10000, //Quick and dirty fix. Will update to a more friendly fix in later versions
                assetType: 'Photos'
            })
            .then(r => this.setState({ photos: r.edges, imageuri: { uri: r.edges[0].node.image.uri } }));
    }

    onChoosePhotoPress() {
        this.setState({ modalVisible: true });
        CameraRoll.getPhotos({
                first: 10000, //Quick and dirty fix. Will update to a more friendly fix in later versions
                assetType: 'Photos'
            })
            .then(r => this.setState({ photos: r.edges }));
    }

    onAddWebPhotoPress() {
        this.setState({ webphoto: true });
    }

    inputFocused(refName) {
        setTimeout(() => {
          let scrollResponder = this.refs.scrollView.getScrollResponder();
          scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            React.findNodeHandle(this.refs[refName]),
            110, //additionalOffset
            true
          );
        }, 50);
      }

    onPhotoSelect() {
        console.log(this.state.languages);
        console.log(this.state.acheivement)
        //1496411711468
            if (this.state.languages !== null) {
                if (this.state.imageuri === null) {
            return (
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                    <View>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: `${Languages[this.state.languages]['064']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    </View>
                    <View style={{ width: (this.state.widthc - 380), backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', width: (this.state.widthc - 380), backgroundColor: 'white' }}>
                            <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                            <Button onPress={this.onTakePhotoPress.bind(this)}>
                                {Languages[this.state.languages]['049']}
                            </Button>
                        </CardSection>
                        <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                            <Button onPress={this.onChoosePhotoPress.bind(this)}>
                                {Languages[this.state.languages]['053']}
                            </Button>
                        </CardSection>
                        <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                            <Button onPress={this.onAddWebPhotoPress.bind(this)}>
                                {Languages[this.state.languages]['056']}
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
                        onFocus={this.inputFocused.bind(this, 'username')}
                        />
                    </CardSection>
                    {this.renderWeb()}
                    </View>
                </View>
            );
        }
        if (this.state.imageuri !== null) {
            return (
                <View style={{ alignItems: 'flex-start', flexDirection: 'row', width: this.state.widthc, marginTop: 10 }}>
                    <View>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: this.state.imageuri }} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    </View>
                    <View style={{ width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', width: (this.state.widthc - 450), backgroundColor: 'white' }}>
                            <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                            <Button onPress={this.onTakePhotoPress.bind(this)}>
                                {Languages[this.state.languages]['049']}
                            </Button>
                        </CardSection>
                        <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                            <Button onPress={this.onChoosePhotoPress.bind(this)}>
                                {Languages[this.state.languages]['053']}
                            </Button>
                        </CardSection>
                        <CardSection style={{ flex: 1, borderBottomWidth: 0, marginLeft: 0, marginRight: 0 }}>
                            <Button onPress={this.onAddWebPhotoPress.bind(this)}>
                                {Languages[this.state.languages]['056']}
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
                        onFocus={this.inputFocused.bind(this, 'username')}
                        />
                    </CardSection>
                    {this.renderWeb()}
                    </View>
                </View>
            );
        }
    }
            if (this.state.languages === null) {
                return (
                    <View />
                );
            }
    }
    
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({ metadata: options })
        .then((data) => {
            this.setState({ imageuri: data.path, isRecording: false, height: this.state.heightc, width: this.state.widthc });
        })
        .catch(err => console.error(err));
    }

    onSwitchCameraPress() {
        if (this.state.cameraType === 'front') {
            this.setState({ cameraType: 'back' });
        }
        if (this.state.cameraType === 'back') {
            this.setState({ cameraType: 'front' });
        }
    }

    renderPhotos() {
        const allphotos = this.state.photos.map((photo) => 
            //For future applications, long press may prove to be more user friendly
             (
            <TouchableOpacity 
            onPress={() => {
                this.setState({ imageuri: photo.node.image.uri, height: photo.node.image.height, width: photo.node.image.width });/** */
                this.setModalVisible(false);
                }}
                key={photo.node.image.uri}
            >
                <Image style={{ height: 150, width: 150, marginLeft: 20, marginTop: 20 }} source={{ uri: photo.node.image.uri }} />
            </TouchableOpacity>
            ));
            return (
                [...allphotos]
            );
    }

    async createNew() {
        if (this.state.title === null || this.state.caption === null || this.state.group === null || this.state.title === '' || this.state.caption === '' || this.state.group === '' || (this.state.imgsrc === null && this.state.imageuri === null)) {
            this.setState({ isNull: true });
        } else {
            const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
        const objec = JSON.parse(await AsyncStorage.getItem('uniqueID'));
        const gen = JSON.parse(await AsyncStorage.getItem('Media'));
        const photos = JSON.parse(await AsyncStorage.getItem('Pictures'));
        photos.push({
            title: this.state.title,
            imageuri: this.state.imageuri, 
            caption: this.state.caption, 
            group: this.state.group,
            height: this.state.height,
            width: this.state.width,
            isFavourite: this.state.isFavourite,
            mediaType: 'Photo'
        });
        gen.push({
            uniqueID: objec.uniqueID, 
            title: this.state.title,
            imageuri: this.state.imageuri, 
            caption: this.state.caption, 
            group: this.state.group,
            height: this.state.height,
            width: this.state.width,
            isFavourite: this.state.isFavourite,
            mediaType: 'Photo'
        });
        objec.uri = this.state.imageuri;
        objec.title = this.state.title;
        objec.caption = this.state.caption;
        objec.group = this.state.group;
        objec.height = this.state.height;
        objec.width = this.state.width;
        objec.isFavourite = this.state.isFavourite;
        objec.mediaType = 'Photo';
        const findTags = mytags.find((tag) => tag === this.state.group);
        if (findTags === undefined) {
            mytags.push(this.state.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        AsyncStorage.setItem('uniqueID', JSON.stringify(objec));
        AsyncStorage.setItem('Media', JSON.stringify(gen));
        AsyncStorage.setItem('Pictures', JSON.stringify(photos));
        this.setState({ imageuri: null, caption: null, group: null, modalVisible: false, photos: null, height: null, width: null, title: null, isFavourite: false, isRecording: false, cameraType: 'back', webphoto: null, imgsrc: null });
        }
    }

    render() {
        if (this.state.languages !== null) {
            if (this.state.isRecording === false) {
            if (this.state.acheivement === null || this.state.acheivement === 'INCOM') {
                if (this.state.photos === null) {
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
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', flexWrap: 'wrap', marginLeft: 20, alignSelf: 'center', alignContent: 'center' }}>{Languages[this.state.languages]['111']}</Text>
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
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['084']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/mainmenu.png')} style={{ height: Platform.OS === 'ios' ? 40 : 50, width: Platform.OS === 'ios' ? 40 : 50, alignSelf: 'flex-end', marginRight: 20, marginBottom: Platform.OS === 'ios' ? 5 : 10 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <ScrollView ref="scrollView">
                    <View style={{ marginLeft: 0, marginRight: 0, flex: 1 }}>
                    {this.onPhotoSelect()}
                        <View>
                        <CardSection>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            {Languages[this.state.languages]['067']} <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30, marginTop: 10 }} />
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
        if (this.state.photos !== null) {
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
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', flexWrap: 'wrap', marginLeft: 20, alignSelf: 'center', alignContent: 'center' }}>{Languages[this.state.languages]['111']}</Text>
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
                    <Modal
                        animationType={'fade'}
                        transparent
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}
                    >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: this.state.color }}>
                                <View style={{ width: 910, backgroundColor: '#D9D9D9', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <TouchableWithoutFeedback onPress={() => this.setState({ photos: null })}>
                                        <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 40, width: 40, marginRight: 70 }} />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['088']}</Text>
                                </View>
                                <View style={{ height: 590, width: 910, backgroundColor: '#EFEFEF', position: 'relative', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                    <ScrollView>
                                        <View style={{ marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {this.renderPhotos()}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['084']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/mainmenu.png')} style={{ height: Platform.OS === 'ios' ? 40 : 50, width: Platform.OS === 'ios' ? 40 : 50, alignSelf: 'flex-end', marginRight: 20, marginBottom: Platform.OS === 'ios' ? 5 : 10 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <ScrollView>
                    <View style={{ marginTop: 5, marginLeft: 0, marginRight: 0, flex: 1 }}>
                    {this.onPhotoSelect()}
                    <View>
                    <CardSection>
                    <Button onPress={this.onSaveItemPress.bind(this)}>
                        {Languages[this.state.languages]['067']}  <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30, marginTop: 10 }} />
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
            if (this.state.acheivement !== null && this.state.acheivement !== 'INCOM') {
                if (this.state.photos === null) {
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
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', flexWrap: 'wrap', marginLeft: 20, alignSelf: 'center', alignContent: 'center' }}>{Languages[this.state.languages]['111']}</Text>
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
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['084']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/mainmenu.png')} style={{ height: Platform.OS === 'ios' ? 40 : 50, width: Platform.OS === 'ios' ? 40 : 50, alignSelf: 'flex-end', marginRight: 20, marginBottom: Platform.OS === 'ios' ? 5 : 10 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <ScrollView ref="scrollView">
                    <View style={{ marginLeft: 0, marginRight: 0, flex: 1 }}>
                    {this.onPhotoSelect()}
                        <View>
                        <CardSection>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            {Languages[this.state.languages]['067']}  <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30, marginTop: 10 }} />
                        </Button>
                        </CardSection>
                        <CardSection>
                        <Button onPress={this.createNew.bind(this)}>
                            {Languages[this.state.languages]['068']}  <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30, marginTop: 10 }} />
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
        if (this.state.photos !== null) {
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
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light', flexWrap: 'wrap', marginLeft: 20, alignSelf: 'center', alignContent: 'center' }}>{Languages[this.state.languages]['111']}</Text>
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
                    <Modal
                        animationType={'fade'}
                        transparent
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}
                    >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: this.state.color }}>
                                <View style={{ width: 910, backgroundColor: '#D9D9D9', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <TouchableWithoutFeedback onPress={() => this.setState({ photos: null })}>
                                        <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 40, width: 40, marginRight: 5 }} />
                                    </TouchableWithoutFeedback>
                                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['088']}</Text>
                                </View>
                                <View style={{ height: 590, width: 910, backgroundColor: '#EFEFEF', position: 'relative', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                    <ScrollView>
                                        <View style={{ marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {this.renderPhotos()}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['084']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/mainmenu.png')} style={{ height: Platform.OS === 'ios' ? 40 : 50, width: Platform.OS === 'ios' ? 40 : 50, alignSelf: 'flex-end', marginRight: 20, marginBottom: Platform.OS === 'ios' ? 5 : 10 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <ScrollView>
                    <View style={{ marginTop: 5, marginLeft: 0, marginRight: 0, flex: 1 }}>
                    {this.onPhotoSelect()}
                    <View>
                    <CardSection>
                    <Button onPress={this.onSaveItemPress.bind(this)}>
                        {Languages[this.state.languages]['067']}  <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30, marginTop: 10 }} />
                    </Button>
                    </CardSection>
                    <CardSection>
                    <Button onPress={this.createNew.bind(this)}>
                        {Languages[this.state.languages]['068']}  <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30, marginTop: 10 }} />
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
        }
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
                    captureMode={Camera.constants.CaptureMode.still}
                    onFocusChanged={() => {}}
                    onZoomChanged={() => {}}
                    type={this.state.cameraType}
                    >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', width: this.state.widthc, height: this.state.heightc }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', width: 150, height: this.state.heightc }}>
                            <TouchableWithoutFeedback onPress={this.takePicture.bind(this)}>
                                <Image source={require('../Images/cameracapture.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.onSwitchCameraPress.bind(this)}>
                                <Image source={require('../Images/switchcamera.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.setState({ isRecording: false, imageuri: null })}>
                            <Image source={{ uri: `backbutton${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 100, width: 100, marginBottom: 25 }} />
                        </TouchableWithoutFeedback>
                        </View>
                </View>
        </Camera>
      </View>
    );
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
    flexDirection: 'column',
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

export { AddPhoto };
