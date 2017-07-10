import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Header, Input } from './common';

class ContentExplorer extends Component {
    state = { mediaType: null, media: null, mediaArray: null, selectedItem: null }
    async componentWillMount() {
        this.setState({ mediaArray: JSON.parse(await AsyncStorage.getItem('Media')) });
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
            this.setState({ mediaArray: media, media: content, selectedItem: null });
        }
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
            this.setState({ mediaArray: media, media: content, selectedItem: null });
        }
            }
        }
    }
    
    renderExplorer() {
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
                    <CardSection>
                        <Button onPress={this.onSaveItemPress.bind(this)}>
                            Save and Continue
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 40 }} />
                        </Button>
                    </CardSection>,
                    <CardSection>
                        <Button onPress={() => Actions.Home()}>
                            Return to Home
                        </Button>
                    </CardSection>]
        return (
            [...explorerArray]
        );
    }

    renderPhotos() {
        if (this.state.mediaType === 'Pictures') {
            const allphotos = this.state.media.map((photo) => 
            //For future applications, long press may prove to be more user friendly
             (
            <TouchableOpacity 
            onPress={() => {
                this.setState({ selectedItem: photo });/** */
                }}
                key={photo.imageuri}
            >
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
            </TouchableOpacity>
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
                    <TouchableOpacity 
            onPress={() => {
                this.setState({ selectedItem: photo });/** */
                }}
                key={photo.uri}
            >
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
            </TouchableOpacity>
                );
            }
            if (photo.mediaType === 'Youtube') {
                return (
                    <TouchableOpacity 
            onPress={() => {
                this.setState({ selectedItem: photo });/** */
                }}
                key={photo.imageuri}
            >
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
            </TouchableOpacity>
                );
            }
            });
            return (
                [...allphotos]
            );
        }
        if (this.state.mediaType === 'Audio') {
            return (
                <View />
            );
        }
    }

    render() {
        if (this.state.mediaType === null) {
            return (
                <View>
                    <Header>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Edit Content</Text>
                    </Header>
                    <Text style={{ fontSize: 30, alignSelf: 'center', fontFamily: 'UltimaPDac-UltraLight' }}>I would like to edit/delete a...</Text>
                    <CardSection>
                        <Button onPress={async () => this.setState({ mediaType: 'Pictures', media: JSON.parse(await AsyncStorage.getItem('Pictures')) })}>
                            Photo
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={async () => this.setState({ mediaType: 'Videos', media: JSON.parse(await AsyncStorage.getItem('Videos')) })}>
                            Video
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={async () => this.setState({ mediaType: 'Audio', media: JSON.parse(await AsyncStorage.getItem('Audio')) })}>
                            AudioClip
                        </Button>
                    </CardSection>
                </View>
            );
        }
        if (this.state.mediaType !== null) {
            if (this.state.selectedItem === null) {
                return (
                    <View style={{ flex: 1 }}>
                    <Header>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Edit Content</Text>
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
                        <Header>
                            <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Edit Content</Text>
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
                        <Header>
                            <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Edit Content</Text>
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
                        <Header>
                            <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Edit Content</Text>
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
            }
        }
    }
}

export { ContentExplorer };
