import React, { Component } from 'react';
import { View, AsyncStorage, Text, Image, Modal, ScrollView, CameraRoll, TouchableOpacity } from 'react-native';
import { CardSection, Button, Input } from './common';
import { Actions } from 'react-native-router-flux';

class AddPhoto extends Component {
    state = { imageuri: null, caption: null, group: null, modalVisible: true, photos: null, height: null, width: null, title: null, isFavourite: false } //'file:///var/mobile/Containers/Data/Application/96AF4229-C558-4743-8B14-D280B93DF4E9/Documents/images/44643C96-6A95-47A1-9B27-2EA09F2319B2.jpg'

    async onSaveItemPress() {
        const namefile = Date.now().toString();
        const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
        const objec = JSON.parse(await AsyncStorage.getItem('temp'));
        const gen = JSON.parse(await AsyncStorage.getItem('Presets'));
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
        gen[0].content.push({
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
        AsyncStorage.setItem('temp', JSON.stringify(objec));
        AsyncStorage.setItem('Presets', JSON.stringify(gen));
        AsyncStorage.setItem('Pictures', JSON.stringify(photos));
        console.log(JSON.parse(await AsyncStorage.getItem('temp')));
        console.log(JSON.parse(await AsyncStorage.getItem('Presets')));
        console.log(JSON.parse(await AsyncStorage.getItem('Tags')));
        console.log(JSON.parse(await AsyncStorage.getItem('Pictures')));
        //console.log(JSON.parse(await AsyncStorage.getItem(namefile)));
        Actions.Home();
    }

    onTakePhotoPress() {
        return (
            console.log('Wee!')
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
            console.log(this.state.photos);
    }

    onChoosePhotoPress() {
        CameraRoll.getPhotos({
                first: 10000, //Quick and dirty fix. Will update to a more friendly fix in later versions
                assetType: 'All'
            })
            .then(r => this.setState({ photos: r.edges }));
    }

    onAddWebPhotoPress() {
        
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
            console.log('I have an image uri! Its:');
            console.log(this.state.imageuri);
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

    renderPhotos() {
        console.log(this.state.photos);
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
        console.log('Im rendering!');
        if (this.state.photos === null || this.state.modalVisible === false) {
            return (
                <ScrollView>
                    <View style={{ marginTop: 60, marginLeft: 80, marginRight: 80 }}>
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
                            <Button onPress={this.onPressPhotos.bind(this)}>
                                Add from web using Image URL
                                <Image source={require('../Images/webicon.png')} style={{ height: 40, width: 40 }} />
                            </Button>
                        </CardSection>
                        {this.onPhotoSelect()}
                    </View>
                </ScrollView>
        );
    }
        if (this.state.photos !== null && this.state.modalVisible === true) {
            return (
                <View>
                    <Modal
                        animationType={'fade'}
                        transparent
                        visible={this.state.modalVisible}
                        onRequestClose={() => console.log('Modal has been closed')}
                    >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <View style={{ width: 910, backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 27 }}>Select Photo</Text>
                                </View>
                                <View style={{ height: 590, width: 910, backgroundColor: '#EFEFEF', position: 'relative', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                                    <ScrollView>
                                        <View style={{ marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                                            {this.renderPhotos()}
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </View>
        );
    }
    }
}

export { AddPhoto };
