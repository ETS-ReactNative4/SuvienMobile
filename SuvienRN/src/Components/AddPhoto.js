import React, { Component } from 'react';
import { View, AsyncStorage, Text, Image, Modal, ScrollView, CameraRoll, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { CardSection, Button, Input, Header } from './common';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';

class AddPhoto extends Component {
    state = { imageuri: null, caption: null, group: null, modalVisible: false, photos: null, height: null, width: null, title: null, isFavourite: false, isRecording: false, heightc: null, widthc: null, cameraType: 'back', webphoto: null, imgsrc: null } //'file:///var/mobile/Containers/Data/Application/96AF4229-C558-4743-8B14-D280B93DF4E9/Documents/images/44643C96-6A95-47A1-9B27-2EA09F2319B2.jpg'
    componentWillMount() {
        this.setState({ 
            heightc: Dimensions.get('window').height,
            widthc: Dimensions.get('window').width 
        });
    }
    async onSaveItemPress() {
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

    onSaveURLPress() {
        this.setState({ imageuri: this.state.imgsrc });
    }

    renderWeb() {
        if (this.state.webphoto === true) {
            return (
                <View>
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="https://68.media.tumblr.com/58023028ed8452496ba154aa4b0c229f/tumblr_nnorxsvxtT1tmz3boo1_500.jpg"
                        label="URL"
                        value={this.state.imgsrc}
                        onChangeText={(imgsrc) => this.setState({ imgsrc })}
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
                assetType: 'All'
            })
            .then(r => this.setState({ photos: r.edges, imageuri: { uri: r.edges[0].node.image.uri } }));
    }

    onChoosePhotoPress() {
        this.setState({modalVisible: true });
        CameraRoll.getPhotos({
                first: 10000, //Quick and dirty fix. Will update to a more friendly fix in later versions
                assetType: 'All'
            })
            .then(r => this.setState({ photos: r.edges }));
    }

    onAddWebPhotoPress() {
        this.setState({ webphoto: true });
    }

    onPhotoSelect() {
        //1496411711468
        if (this.state.imageuri === null) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={require('../Images/noimage.jpg')} style={{ height: 300, width: 300 }} />
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
        if (this.state.imageuri !== null) {
            return (
                <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: this.state.imageuri }} style={{ height: 300, width: 300 }} />
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

    render() {
        if (this.state.isRecording === false) {
            if (this.state.photos === null) {
            return (
                <View style={{ flex: 1 }}>
                <Header style={{ height: 80 }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Add Photo</Text>
                </Header>
                <ScrollView>
                    <View style={{ marginTop: 5, marginLeft: 80, marginRight: 80, flex: 1 }}>
                        <CardSection>
                            <Button onPress={this.onTakePhotoPress.bind(this)}>
                                Take Photo
                                <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                            </Button>
                        </CardSection>
                        <CardSection>
                            <Button onPress={this.onChoosePhotoPress.bind(this)}>
                                Choose from Photo Library
                                <Image source={require('../Images/choosefromlibrary.png')} style={{ height: 40, width: 40 }} />
                            </Button>
                        </CardSection>
                        <CardSection>
                            <Button onPress={this.onAddWebPhotoPress.bind(this)}>
                                Add from web using Image URL
                                <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                            </Button>
                        </CardSection>
                        {this.renderWeb()}
                        {this.onPhotoSelect()}
                    </View>
                </ScrollView>
                </View>
        );
            
    }
        if (this.state.photos !== null) {
            return (
                <View style={{ flex: 1 }}>
                    <Modal
                        animationType={'fade'}
                        transparent
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}
                    >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                <View style={{ width: 910, backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Camera Roll</Text>
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
                <Header style={{ height: 80 }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Add Photo</Text>
                </Header>
                <ScrollView>
                    <View style={{ marginTop: 5, marginLeft: 80, marginRight: 80, flex: 1 }}>
                        <CardSection>
                            <Button onPress={this.onTakePhotoPress.bind(this)}>
                                Take Photo
                                <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                            </Button>
                        </CardSection>
                        <CardSection>
                            <Button onPress={this.onChoosePhotoPress.bind(this)}>
                                Choose from Photo Library
                                <Image source={require('../Images/choosefromlibrary.png')} style={{ height: 40, width: 40 }} />
                            </Button>
                        </CardSection>
                        <CardSection>
                            <Button onPress={this.onAddWebPhotoPress.bind(this)}>
                                Add from web using Image URL
                                <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                            </Button>
                        </CardSection>
                        {this.renderWeb()}
                        {this.onPhotoSelect()}
                    </View>
                </ScrollView>
                </View>
            );
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
