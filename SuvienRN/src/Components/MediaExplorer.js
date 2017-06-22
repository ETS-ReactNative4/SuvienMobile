import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, AsyncStorage, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class MediaExplorer extends Component {
    //content://media/external/images/media/379
    //content://media/external/images/media/378
    //content://media/external/images/media/1214
    state = { isFiltered: false, imageuri: null, tags: null, images: null, filter: null, filteredImages: null, media: null, height: null, width: null }
    componentWillMount() {
        //console.log('Im in compwillmount');
        this.fetchData();
    }

    componentDidMount() {
        this.setState({ 
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width 
        });
    }
    componentDidUpdate() {
        //console.log('Im in component will update!');
        if (this.state.isFiltered === false && this.state.filter !== null) {
                this.filterContent();
        }
    }
    filterContent() {
        //console.log('Im in filtercontent!')
        //console.log(this.state.filter);
        if (this.state.filter === 'All') {
            this.setState({ filteredImages: this.state.media, isFiltered: true });
        }
        if (this.state.filter === 'Favourites') {
            const filterTags = this.state.images.filter((imagep) => imagep.isFavourite === true);
            this.setState({ filteredImages: [...filterTags], isFiltered: true });
        } else {
            const filterTags = this.state.images.filter((imagep) => imagep.group === this.state.filter);
            this.setState({ filteredImages: [...filterTags], isFiltered: true });
        }
    }
    async fetchData() {
        //console.log('Im in fetch data');
        //console.log(AsyncStorage.getAllKeys());
        this.setState({ tags: JSON.parse(await AsyncStorage.getItem('Tags')), images: JSON.parse(await AsyncStorage.getItem('Pictures')), media: JSON.parse(await AsyncStorage.getItem('Media')) });
        //console.log(this.state.tags);
        //console.log(this.state.images);
        /*
        const library = JSON.parse(await AsyncStorage.getItem('Pictures'));
        library.push({ uri: { uri: 'content://media/external/images/media/1062' }, caption: 'Random Test Paper', tag: 'Tests' });
        AsyncStorage.setItem('Pictures', JSON.stringify(library));
        this.setState({ imageuri: library[0].uri });
        console.log(await AsyncStorage.getItem('Pictures'));
        /*
        AsyncStorage.setItem('Pictures', JSON.stringify([{ uri: { uri: 'content://media/external/images/media/1062' }, caption: 'Random Test Paper', tag: 'Tests' }]));
        AsyncStorage.setItem('Tags', JSON.stringify(['Tests']));
        console.log(await AsyncStorage.getItem('Pictures'));
        console.log(await AsyncStorage.getItem('Tags'));
        */
    }

    renderSideLeft() {
        if (this.state.tags === null || this.state.tags === []) {
            //console.log('Im null!');
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../Images/loading.gif')} style={{ height: 400, width: 400 }} />
                </View>
            );
        }
        if (this.state.tags !== null) {
            /*const filterTags = this.state.images.filter((imagep) => {
                return imagep.tag === 'Tests';
            });
            console.log(filterTags);
            */
            return (
                <View>
                    {this.renderList()}
                </View>
            );
        }
    }
    renderList() {
        const tagged = this.state.tags;
        const allTags = tagged.map((tag) => (
            <TouchableOpacity onPress={() => this.setState({ filter: tag })}>
                <CardSection style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginRight: 15, backgroundColor: 'white' }}>
                    <Image source={require('../Images/tag.png')} style={{ height: 40, width: 40 }} />
                    <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', alignSelf: 'flex-end' }}>
                        {tag}
                    </Text>
                </CardSection>
            </TouchableOpacity>
            ));
            //console.log('Ive set the filter to:');
            //console.log(this.state.filter);
        return (
            [<TouchableOpacity onPress={() => this.setState({ filter: 'All' })}>
                <CardSection style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginRight: 15, backgroundColor: 'white' }}>
                    <Image source={require('../Images/tag.png')} style={{ height: 40, width: 40 }} />
                    <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', alignSelf: 'flex-end' }}>
                        All
                    </Text>
                </CardSection>
            </TouchableOpacity>,
            <TouchableOpacity onPress={() => this.setState({ filter: 'Favourites' })}>
                <CardSection style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginRight: 15, backgroundColor: 'white' }}>
                    <Image source={require('../Images/tag.png')} style={{ height: 40, width: 40 }} />
                    <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', alignSelf: 'flex-end' }}>
                        Favourites
                    </Text>
                </CardSection>
            </TouchableOpacity>,
             ...allTags]
        );
    }

    renderFilterList() {  
        //console.log('Im in renderfilterlist');
        const allPhotos = this.state.filteredImages.map((imageu) => (
                <TouchableOpacity onPress={() => this.setState({ imageuri: imageu.uri })}>
                    <Image source={{ uri: imageu.imageuri }} style={{ height: 150, width: 150 }} />
                </TouchableOpacity>
            ));
        //console.log(this.state.imageuri);
        return (
            [...allPhotos]
        );
    }
    render() {
        if (this.state.isFiltered === false) {
        return (
            <View style={{ flexDirection: 'row', paddingTop: 15, backgroundColor: '#f9f7f7', height: this.state.height, width: this.state.width }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>Search Using a Tag</Text>
                        <Image source={require('../Images/search.png')} style={{ height: 40, width: 40 }} />
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 20, marginLeft: 5 }}>
                        {this.renderSideLeft()}
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light', marginTop: 10, marginBottom: 10 }}> Upload a new...</Text>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                        <Button onPress={() => Actions.AddPhoto()} style={{ height: 300, width: 600 }}>
                            Photo
                            <Image source={require('../Images/photoimagebig.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                        <Button onPress={() => Actions.AddAudio()} style={{ height: 300, width: 600 }}>
                            Audio
                            <Image source={require('../Images/audioicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
                    <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                        <Button onPress={() => Actions.AddVideo()} style={{ height: 300, width: 600 }}>
                            Video
                            <Image source={require('../Images/videoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                    </CardSection>
                </View>
            </View>
        );
    }
        if (this.state.isFiltered === true) {
            //console.log('Im filtered!');
            return (
                <View>
                    <Text style={{ fontSize: 27 }}>Showing Results for {this.state.filter}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {this.renderFilterList()}
                    </View>
                </View>
            );
        }
        /*
        if (this.state.tags !== null) {
            console.log('Im not null!');
            console.log(this.state.tags);
            return (
                <View>
                    {this.renderList()}
                </View>
            );
        }
        /*
        if (this.state.imageuri !== null) {
            console.log('we got data!');
                return (
                    <View>
                        <Image source={this.state.imageuri} style={{ height: 300, width: 300 }} />
                        <Text>Where is it</Text>
                    </View>
                );
            }
        }*/
    }
}

export default MediaExplorer;
