import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, AsyncStorage } from 'react-native';
import { CardSection, Button } from './common';

class MediaExplorer extends Component {
    //content://media/external/images/media/379
    //content://media/external/images/media/378
    //content://media/external/images/media/1214
    state = { isFiltered: false, imageuri: null, tags: null, images: null, filter: null, filteredImages: null }
    componentWillMount() {
        //console.log('Im in compwillmount');
        this.fetchData();
    }

    componentDidUpdate() {
        //console.log('Im in component will update!');
        if (this.state.isFiltered === false && this.state.filter !== null){
                this.filterContent();
        }
    }
    filterContent() {
        //console.log('Im in filtercontent!')
        const filterTags = this.state.images.filter((imagep) => {
                return imagep.tag === this.state.filter;
            });
            this.setState({ filteredImages: filterTags, isFiltered: true });
            //console.log(this.state.filteredImages);
    }
    async fetchData() {
        //console.log('Im in fetch data');
        this.setState({ tags: JSON.parse(await AsyncStorage.getItem('Tags')), images: JSON.parse(await AsyncStorage.getItem('Pictures')) });
        console.log(this.state.tags);
        console.log(JSON.parse(await AsyncStorage.getItem('Pictures')));
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
        if (this.state.tags === null) {
            //console.log('Im null!');
            return (
                <Text>
                    I'm not ready!
                </Text>
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
                <CardSection>
                    <Text>
                        {tag}
                    </Text>
                </CardSection>
            </TouchableOpacity>
            ));
            //console.log('Ive set the filter to:');
            //console.log(this.state.filter);
        return (
            [...allTags]
        );
    }

    renderFilterList() {  
        //console.log('Im in renderfilterlist');
        const allPhotos = this.state.filteredImages.map((imageu) => {
            return (
                <TouchableOpacity onPress={() => this.setState({ imageuri: imageu.uri })}>
                    <Image source={imageu.uri} style={{ height: 150, width: 150 }} />
                </TouchableOpacity>
            );
        });
        console.log(this.state.imageuri);
        return (
            [...allPhotos]
        );
    }
    render() {
        //console.log('Im in render!')
        if (this.state.isFiltered === false) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 27 }}>Choose a filter</Text>
                    {this.renderSideLeft()}
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 27 }}> Upload a new...</Text>
                    <CardSection>
                        <Button style={{ height: 300, width: 600 }}>Photo</Button>
                    </CardSection>
                    <CardSection>
                        <Button style={{ height: 300, width: 600 }}>Audio</Button>
                    </CardSection>
                    <CardSection>
                        <Button style={{ height: 300, width: 600 }}>Video</Button>
                    </CardSection>
                </View>
            </View>
        );
    }
        if (this.state.isFiltered === true) {
            //console.log('Im filtered!');
            return (
                <View>
                    {this.renderFilterList()}
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
