import React, { Component } from 'react';
import { Text, View, AsyncStorage, Image, ScrollView, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Input, Button, Header } from './common';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';

class Settings extends Component {
    state = { name: '', stage: null, isFirst: false, acheivement: null, preset: null, mediaType: null, media: null, mediaArray: null, selectedItem: null, width: null };
    async componentWillMount() {
        if (await AsyncStorage.getItem('name') !== null) {
            this.setState({ 
                name: await AsyncStorage.getItem('name'), 
                stage: await AsyncStorage.getItem('stage'),
                acheivement: await AsyncStorage.getItem('Acheivement'),
                preset: await AsyncStorage.getItem('Preset'),
                mediaArray: JSON.parse(await AsyncStorage.getItem('Media')),
                width: parseInt(await AsyncStorage.getItem('Width'))
            });
        }
        if (await AsyncStorage.getItem('name') === null) {
            this.setState({
                isFirst: true
            });
        }
    }
    onDelete(selected) {
        if (selected.mediaType === 'Photo') {
             const media = this.state.mediaArray;
        const content = this.state.media;
        const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.imageuri === selected.imageuri) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
        }});
        const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.imageuri === selected.imageuri) {
                    return true;
                } else {
                    return false;
        }});
        media.splice(searchMedia, 1);
        content.splice(searchContent, 1);
        AsyncStorage.setItem('Pictures', JSON.stringify(content));
        AsyncStorage.setItem('Media', JSON.stringify(media));
        this.setState({ mediaArray: media, media: content, selectedItem: null });
    }
        if (selected.mediaType === 'Video') {
            const media = this.state.mediaArray;
        const content = this.state.media;
        const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.uri === selected.uri) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
        }});
        const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.uri === selected.uri) {
                    return true;
                } else {
                    return false;
        }});
        media.splice(searchMedia, 1);
        content.splice(searchContent, 1);
        AsyncStorage.setItem('Videos', JSON.stringify(content));
        AsyncStorage.setItem('Media', JSON.stringify(media));
        this.setState({ mediaArray: media, media: content, selectedItem: null });
        }
        if (selected.mediaType === 'Youtube') {
            const media = this.state.mediaArray;
        const content = this.state.media;
        const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.imageuri === selected.imageuri) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
        }});
        const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.imageuri === selected.imageuri) {
                    return true;
                } else {
                    return false;
        }});
        media.splice(searchMedia, 1);
        content.splice(searchContent, 1);
        AsyncStorage.setItem('Videos', JSON.stringify(content));
        AsyncStorage.setItem('Media', JSON.stringify(media));
        this.setState({ mediaArray: media, media: content, selectedItem: null });
    }
        if (selected.mediaType === 'Music') {
        const media = this.state.mediaArray;
        const content = this.state.media;
        const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.title === selected.title && element.artist === selected.artist && element.album === selected.album) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
        }});
        const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.title === selected.title && element.artist === selected.artist && element.album === selected.album) {
                    return true;
                } else {
                    return false;
        }});
        media.splice(searchMedia, 1);
        content.splice(searchContent, 1);
        AsyncStorage.setItem('Audio', JSON.stringify(content));
        AsyncStorage.setItem('Media', JSON.stringify(media));
        this.setState({ mediaArray: media, media: content, selectedItem: null });
        }
        if (selected.mediaType === 'MusicAnd') {
            const media = this.state.mediaArray;
        const content = this.state.media;
        const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.uri === selected.uri) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
        }});
        const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.uri === selected.uri) {
                    return true;
                } else {
                    return false;
        }});
        media.splice(searchMedia, 1);
        content.splice(searchContent, 1);
        AsyncStorage.setItem('Audio', JSON.stringify(content));
        AsyncStorage.setItem('Media', JSON.stringify(media));
        this.setState({ mediaArray: media, media: content, selectedItem: null });
        }
    }

    async onSaveItemPress() {
        const selected = this.state.selectedItem;
        const mytags = JSON.parse(await AsyncStorage.getItem('Tags'));
        if (this.state.mediaType === 'Pictures') {
            const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.imageuri === selected.imageuri) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
                }});
            const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.imageuri === selected.imageuri) {
                    return true;
                } else {
                    return false;
                }});
            const { imageuri, caption, title, group, mediaType, height, width, isFavourite } = selected;
            const media = this.state.mediaArray;
            const content = this.state.media;
            media[searchMedia] = {
                imageuri,
                caption,
                title,
                group,
                mediaType,
                height,
                width,
                isFavourite
            };
            content[searchContent] = {
                imageuri,
                caption,
                title,
                group,
                mediaType,
                height,
                width,
                isFavourite
            };
            AsyncStorage.setItem('Pictures', JSON.stringify(content));
            AsyncStorage.setItem('Media', JSON.stringify(media));
            const findTags = mytags.find((tag) => tag === selected.group);
            if (findTags === undefined) {
            mytags.push(selected.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
            this.setState({ mediaArray: media, media: content, selectedItem: null });
        }
        this.setState({ mediaArray: media, media: content, selectedItem: null });
    }
        if (this.state.mediaType === 'Videos') {
            if (selected.mediaType === 'Youtube') {
                const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.imageuri === selected.imageuri) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
                }});
            const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.imageuri === selected.imageuri) {
                    return true;
                } else {
                    return false;
                }});
            const { imageuri, videouri, caption, title, group, mediaType, isFavourite } = selected;
            const media = this.state.mediaArray;
            const content = this.state.media;
            media[searchMedia] = {
                imageuri,
                videouri,
                caption,
                title,
                group,
                mediaType,
                isFavourite
            };
            content[searchContent] = {
                imageuri,
                videouri,
                caption,
                title,
                group,
                mediaType,
                isFavourite
            };
            AsyncStorage.setItem('Videos', JSON.stringify(content));
            AsyncStorage.setItem('Media', JSON.stringify(media));
            const findTags = mytags.find((tag) => tag === selected.group);
            if (findTags === undefined) {
            mytags.push(selected.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        this.setState({ mediaArray: media, media: content, selectedItem: null });
            }
            if (selected.mediaType === 'Video') {
                const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.uri === selected.uri) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
                }});
            const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.uri === selected.uri) {
                    return true;
                } else {
                    return false;
                }});
            const { uri, caption, title, group, mediaType, isFavourite } = selected;
            const media = this.state.mediaArray;
            const content = this.state.media;
            media[searchMedia] = {
                uri,
                caption,
                title,
                group,
                mediaType,
                isFavourite
            };
            content[searchContent] = {
                uri,
                caption,
                title,
                group,
                mediaType,
                isFavourite
            };
            AsyncStorage.setItem('Videos', JSON.stringify(content));
            AsyncStorage.setItem('Media', JSON.stringify(media));
            const findTags = mytags.find((tag) => tag === selected.group);
            if (findTags === undefined) {
            mytags.push(selected.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        this.setState({ mediaArray: media, media: content, selectedItem: null });
            }
        }
        if (this.state.mediaType === 'Audio') {
            if (selected.mediaType === 'Music') {
                const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.title === selected.title && element.album === selected.album && element.artist === selected.artist) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
                }});
            const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.title === selected.title && element.album === selected.album && element.artist === selected.artist) {
                    return true;
                } else {
                    return false;
                }});
            const { caption, title, group, mediaType, isFavourite, artist, album } = selected;
            const media = this.state.mediaArray;
            const content = this.state.media;
            media[searchMedia] = {
                caption,
                title,
                album,
                artist,
                group,
                mediaType,
                isFavourite
            };
            content[searchContent] = {
                caption,
                album,
                artist,
                title,
                group,
                mediaType,
                isFavourite
            };
            AsyncStorage.setItem('Audio', JSON.stringify(content));
            AsyncStorage.setItem('Media', JSON.stringify(media));
            const findTags = mytags.find((tag) => tag === selected.group);
            if (findTags === undefined) {
            mytags.push(selected.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        this.setState({ mediaArray: media, media: content, selectedItem: null });
            }
            if (selected.mediaType === 'MusicAnd') {
                const searchContent = this.state.media.findIndex((element, index, array) => {
                if (element.uri === selected.uri) { //If we set something to change photos, we need to make a unique ID
                    return true;
                } else {
                    return false;
                }});
            const searchMedia = this.state.mediaArray.findIndex((element, index, array) => {
                if (element.uri === selected.uri) {
                    return true;
                } else {
                    return false;
                }});
            const { uri, caption, title, group, mediaType, isFavourite, album, artist } = selected;
            const media = this.state.mediaArray;
            const content = this.state.media;
            media[searchMedia] = {
                uri,
                album,
                artist,
                caption,
                title,
                group,
                mediaType,
                isFavourite
            };
            content[searchContent] = {
                uri,
                album,
                artist,
                caption,
                title,
                group,
                mediaType,
                isFavourite
            };
            AsyncStorage.setItem('Audio', JSON.stringify(content));
            AsyncStorage.setItem('Media', JSON.stringify(media));
            const findTags = mytags.find((tag) => tag === selected.group);
            if (findTags === undefined) {
            mytags.push(selected.group);
            AsyncStorage.setItem('Tags', JSON.stringify(mytags));
        }
        this.setState({ mediaArray: media, media: content, selectedItem: null });
            }
        }
    }
    
    renderExplorer() {
        if (this.state.mediaType === 'Pictures' || this.state.mediaTypex === 'Videos') {
            const explorerArray = [<CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="At the Beach"
                        label="Title"
                        value={this.state.selectedItem.title}
                        onChangeText={(title) => {
                            const selectedItem = this.state.selectedItem;
                            selectedItem.title = title;
                            this.setState({ selectedItem });
                            }
                            }
                        />
                    </CardSection>,
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="Family vacation to Hawaii"
                        label="Caption"
                        value={this.state.selectedItem.caption}
                        onChangeText={(caption) => {
                            const selectedItem = this.state.selectedItem;
                            selectedItem.caption = caption;
                            this.setState({ selectedItem });
                            }
                            }
                        />
                    </CardSection>,
                    <CardSection>
                        <Input
                        placeholder="SummerVacation2017"
                        label="Tag"
                        value={this.state.selectedItem.group}
                        onChangeText={(group) => {
                            const selectedItem = this.state.selectedItem;
                            selectedItem.group = group;
                            this.setState({ selectedItem });
                            }
                            }
                        />
                    </CardSection>,
                    <CardSection style={{ flexDirection: 'row' }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            Save and Continue
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => this.setState({ selectedItem: null })}>
                            Go Back
                        </Button>
                        <Button onPress={() => this.setState({ selectedItem: null, mediaType: null })}>
                            Return to Settings
                        </Button>
                    </CardSection>];
                    return (
            [...explorerArray]
        );
    }
        if (this.state.selectedItem.mediaType === 'Music' || this.state.selectedItem.mediaType === 'MusicAnd') {
            const explorerArray = [<CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Title</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.selectedItem.title}</Text>
                        </View>
                    </CardSection>,
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Album</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.selectedItem.album}</Text>
                        </View>
                    </CardSection>,
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <View style={{ height: 40, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 23, marginLeft: 100, flex: 1, fontFamily: 'Roboto-Light', marginBottom: 7 }}>Artist</Text>
                            <Text style={{ color: '#000', marginRight: 100, marginLeft: 5, fontSize: 20, fontFamily: 'Roboto-Light', paddingTop: 3, flex: 6 }}>{this.state.selectedItem.artist}</Text>
                        </View>
                    </CardSection>,
                    <CardSection style={{ borderTopWidth: 1 }}>
                        <Input
                        placeholder="Family vacation to Hawaii"
                        label="Caption"
                        value={this.state.selectedItem.caption}
                        onChangeText={(caption) => {
                            const selectedItem = this.state.selectedItem;
                            selectedItem.caption = caption;
                            this.setState({ selectedItem });
                            }
                            }
                        />
                    </CardSection>,
                    <CardSection>
                        <Input
                        placeholder="SummerVacation2017"
                        label="Tag"
                        value={this.state.selectedItem.group}
                        onChangeText={(group) => {
                            const selectedItem = this.state.selectedItem;
                            selectedItem.group = group;
                            this.setState({ selectedItem });
                            }
                            }
                        />
                    </CardSection>,
                    <CardSection style={{ flexDirection: 'row' }}>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            Save and Continue
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => this.setState({ selectedItem: null })}>
                            Go Back
                        </Button>
                        <Button onPress={() => this.setState({ selectedItem: null, mediaType: null })}>
                            Return to Settings
                        </Button>
                    </CardSection>];
                    return (
            [...explorerArray]
        );
        }
    }

    renderPhotos() {
        if (this.state.mediaType === 'Pictures') {
            const allphotos = this.state.media.map((photo) => 
            //For future applications, long press may prove to be more user friendly
             (
                <Image style={{ height: 300, width: 300, marginLeft: 20, marginTop: 20 }} source={{ uri: photo.imageuri }}>
                    <View style={{ backgroundColor: 'transparent', height: 200 }} />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto-Light', fontSize: 20 }}>{photo.title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ selectedItem: photo })}>
                                <Image source={require('../Images/infoicon.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginRight: 10 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback 
                            onPress={() => {
                                this.onDelete(photo);
                                }}
                            >
                                <Image source={require('../Images/delete.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginLeft: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Image>
            ));
            return (
                [...allphotos]
            );
        }
        if (this.state.mediaType === 'Videos') {
            const allphotos = this.state.media.map((photo) => {
            //For future applications, long press may prove to be more user friendly
            if (photo.mediaType === 'Video') {
                return (
                <Image style={{ height: 300, width: 300, marginLeft: 20, marginTop: 20 }} source={{ uri: photo.uri }}>
                    <View style={{ backgroundColor: 'transparent', height: 200 }} />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto-Light', fontSize: 20 }}>{photo.title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ selectedItem: photo })}>
                                <Image source={require('../Images/infoicon.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginRight: 10 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback 
                            onPress={() => {
                                this.onDelete(photo);
                                }}
                            >
                                <Image source={require('../Images/delete.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginLeft: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Image>
                );
            }
            if (photo.mediaType === 'Youtube') {
                return (
                <Image style={{ height: 300, width: 300, marginLeft: 20, marginTop: 20 }} source={{ uri: photo.imageuri }}>
                    <View style={{ backgroundColor: 'transparent', height: 200 }} />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto-Light', fontSize: 20 }}>{photo.title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ selectedItem: photo })}>
                                <Image source={require('../Images/infoicon.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginRight: 10 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback 
                            onPress={() => {
                                this.onDelete(photo);
                                }}
                            >
                                <Image source={require('../Images/delete.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginLeft: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Image>
                );
            }
            });
            return (
                [...allphotos]
            );
        }
        if (this.state.mediaType === 'Audio') {
            const allphotos = this.state.media.map((photo) => {
                return (
                <Image style={{ height: 300, width: 300, marginLeft: 20, marginTop: 20 }} source={require('../Images/musicalbumart.png')}>
                    <View style={{ backgroundColor: 'transparent', height: 200 }} />
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', height: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto-Light', fontSize: 20 }}>{photo.title}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ selectedItem: photo })}>
                                <Image source={require('../Images/infoicon.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginRight: 10 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback 
                            onPress={() => {
                                this.onDelete(photo);
                                }}
                            >
                                <Image source={require('../Images/delete.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginLeft: 20 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Image>
                );
            });
            return (
                [...allphotos]
            );
        }
    }
    async onButtonPress() {
        if (this.state.stage === null) {
            try {
                await AsyncStorage.setItem('name', this.state.name);
                await AsyncStorage.setItem('stage', '0');
                } catch (error) {
                console.log(error);
        }
    }
        if (this.state.stage !== null) {
            try {
                await AsyncStorage.setItem('name', this.state.name);
                await AsyncStorage.setItem('stage', this.state.stage);
                } catch (error) {
                console.log(error);
        }
        }
        
        //Actions.Home();
        Actions.Home();
}
    renderRadioButton() {
        if (this.state.stage !== null) {
            return (
            <CardSection>
                <Text style={styles.radioTextStyle}>Stage</Text>
                <RadioForm
                        radio_props={radioProps}
                        initial={parseInt(this.state.stage)}
                        style={{ flex: 6 }}
                        buttonColor={'#4A86E8'}
                        onPress={(stage) => this.setState({ stage: stage.toString() })} 
                />
            </CardSection>
            );
        }
        if (this.state.stage === null && this.state.isFirst) {
            return (
                <CardSection>
                <Text style={styles.radioTextStyle}>Stage</Text>
                <RadioForm
                        radio_props={radioProps}
                        initial={0}
                        style={{ flex: 6 }}
                        buttonColor={'#4A86E8'}
                        onPress={(stage) => this.setState({ stage: stage.toString() })} 
                />
            </CardSection>
            );
        }
    }

    onPhotoButtonPress() {
        Actions.AddPhoto();
    }

    onVideoButtonPress() {
        Actions.AddVideo();
    }

    onAudioButtonPress() { 
         if (Platform.OS === 'ios') {
            Actions.AddAudio();
        }
        if (Platform.OS === 'android') {
            Actions.AddAudioAnd();
        }
    }

    render() {
        console.log(this.state.selectedItem);
        if (this.state.isFirst === false) {
            if (this.state.acheivement === 'COMP') {
                if (this.state.mediaType === null) {
            return (
            <View>
            <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Settings</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <ScrollView>
            <View style={{ marginTop: 10, marginLeft: 80, marginRight: 80, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 30, alignSelf: 'center', fontFamily: 'UltimaPDac-UltraLight' }}>Edit Information</Text>
                    <Image source={require('../Images/infoicon.png')} style={{ marginLeft: 10, height: 30, width: 30 }} />
                </View>
                <CardSection>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    />
                </CardSection>

                {this.renderRadioButton()}

                <CardSection style={{ flexDirection: 'row' }}>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Information
                    </Button>
                    <Button onPress={() => Actions.Advanced()}>
                        Advanced Settings
                    </Button>
                </CardSection>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginTop: 20, fontSize: 30, alignSelf: 'center', marginBottom: 20, fontFamily: 'UltimaPDac-UltraLight', fontWeight: '300' }}>Upload a new...</Text>
                    <Image source={require('../Images/multimedia.png')} style={{ marginLeft: 5, height: 30, width: 90 }} />
                </View>
                <View style={{ flexDirection: 'row', width: null }}>
                    <Button onPress={this.onPhotoButtonPress.bind(this)}>Photo</Button>
                    <Button onPress={this.onVideoButtonPress.bind(this)}>Video</Button>
                    <Button onPress={this.onAudioButtonPress.bind(this)}>Audio</Button>
                    <Button onPress={() => Actions.AddMessage()}>Message</Button>
                </View>
                <Text style={{ marginTop: 30, fontSize: 30, alignSelf: 'center', fontFamily: 'UltimaPDac-UltraLight', fontWeight: '300', marginBottom: 20 }}>Edit Existing...</Text>
                <View style={{ flexDirection: 'row', width: null }}>
                    <Button onPress={async () => this.setState({ mediaType: 'Pictures', media: JSON.parse(await AsyncStorage.getItem('Pictures')) })}>Photo</Button>
                    <Button onPress={async () => this.setState({ mediaType: 'Videos', media: JSON.parse(await AsyncStorage.getItem('Videos')) })}>Video</Button>
                    <Button onPress={async () => this.setState({ mediaType: 'Audio', media: JSON.parse(await AsyncStorage.getItem('Audio')) })}>Audio</Button>
                </View>
                <Text style={{ marginTop: 20, fontSize: 30, alignSelf: 'center', fontFamily: 'UltimaPDac-UltraLight', fontWeight: '300' }}>Sort by...</Text>
                <Text style={{ marginTop: 10, fontSize: 23, alignSelf: 'center', marginBottom: 20, fontFamily: 'UltimaPDac-UltraLight' }}> Currently Sorting By: {this.state.preset} </Text>
                <View style={{ flexDirection: 'row', marginBottom: 30 }}>
                    <Button 
                    onPress={() => {
                        AsyncStorage.setItem('Preset', 'Date');
                        Actions.Home();
                        }}
                    >Date
                    </Button>
                    <Button 
                    onPress={() => {
                        Actions.TagSelect();
                        }}
                    >Tag
                    </Button>
                    <Button 
                    onPress={() => {
                        AsyncStorage.setItem('Preset', 'Favourites');
                        Actions.Home();
                        }}
                    >Favourites
                    </Button>
                    <Button 
                    onPress={() => {
                        AsyncStorage.setItem('Preset', 'Random');
                        Actions.Home();
                        }}
                    >Random
                    </Button>
                </View>
            </View>
            </ScrollView>
            </View>
        );
        }
        if (this.state.mediaType !== null) {
            if (this.state.selectedItem === null) {
                return (
                    <View style={{ flex: 1 }}>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Edit Content</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ mediaType: null })}>
                    <Image source={require('../Images/settings.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                    <ScrollView>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {this.renderPhotos()}
                        </View>
                    </ScrollView>
                    </View>
                );
            }
            if (this.state.selectedItem !== null) {
                if (this.state.mediaType === 'Pictures') {
                    return (
                        <View>
                        <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Edit Content</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                        <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: this.state.selectedItem.imageuri }} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    {this.renderExplorer()}
                </View>
                </View>
            );
                }
                if (this.state.mediaType === 'Videos') {
                    if (this.state.selectedItem.mediaType === 'Youtube') {
                        return (
                        <View>
                        <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Edit Content</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                        <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: this.state.selectedItem.imageuri }} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    {this.renderExplorer()}
                </View>
                </View>
            );
                    }
                    if (this.state.selectedItem.mediaType === 'Video') {
                        return (
                        <View>
                        <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Edit Content</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                        <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={{ uri: this.state.selectedItem.uri }} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    {this.renderExplorer()}
                </View>
                </View>
            );
                    }
                }
                if (this.state.selectedItem.mediaType === 'Music' || this.state.selectedItem.mediaType === 'MusicAnd') {
                    return (
                        <View>
                        <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Edit Content</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                        <View style={{ alignItems: 'center' }}>
                    <CardSection style={{ borderBottomWidth: 0 }}>
                        <Image source={require('../Images/musicalbumart.png')} style={{ height: 300, width: 300 }} />
                    </CardSection>
                    {this.renderExplorer()}
                </View>
                </View>
            );
                }
            }
        }
            } 
        if (this.state.acheivement === 'INCOM') {
            return (
                <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Edit Content</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <ScrollView>
            <View style={{ marginTop: 10, marginLeft: 80, marginRight: 80, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 30, alignSelf: 'center', fontFamily: 'UltimaPDac-UltraLight' }}>Edit Information</Text>
                    <Image source={require('../Images/infoicon.png')} style={{ marginLeft: 10, height: 30, width: 30 }} />
                </View>
                <CardSection>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    />
                </CardSection>

                {this.renderRadioButton()}

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save and Continue
                    </Button>
                </CardSection>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginTop: 30, fontSize: 30, alignSelf: 'center', marginBottom: 30, fontFamily: 'UltimaPDac-UltraLight', fontWeight: '300' }}>Upload a new...</Text>
                    <Image source={require('../Images/multimedia.png')} style={{ marginLeft: 5, height: 30, width: 90 }} />
                </View>
                <CardSection>
                    <Button onPress={this.onPhotoButtonPress.bind(this)}>Photo</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onVideoButtonPress.bind(this)}>Video</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onAudioButtonPress.bind(this)}>Audio</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => Actions.AddMessage()}>Message</Button>
                </CardSection>
                </View>
                </ScrollView>
                </View>
                );
            }
            if (this.state.acheivement === null) {
                return (
                    <View />
                );
            }
       }
    if (this.state.isFirst === true) {
        return (
            <View>
            <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Edit Content</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <View style={{ marginTop: 10, marginLeft: 80, marginRight: 80, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 30, alignSelf: 'center', fontFamily: 'ClementePDae-Light' }}>Edit Information</Text>
                    <Image source={require('../Images/infoicon.png')} style={{ marginLeft: 10, height: 30, width: 30 }} />
                </View>
                <CardSection>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    />
                </CardSection>

                {this.renderRadioButton()}

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save and Continue
                    </Button>
                </CardSection>
            </View>
            </View>
        );
    }
    }
}

const radioProps = [
  { label: 'Early', value: 0 },
  { label: 'Late', value: 1 }
];

const styles = {
    radioTextStyle: {
        fontSize: 23,
        marginLeft: 100,
        flex: 1,
        alignSelf: 'center',
        fontFamily: 'Roboto-Light'
    }
};
export { Settings };
