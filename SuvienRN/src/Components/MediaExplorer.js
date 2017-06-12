import React, { Component } from 'react';
import { View, Image, TouchableOpacity, ScrollView, Text, AsyncStorage } from 'react-native';
import { CardSection } from './common';

class MediaExplorer extends Component {
    //content://media/external/images/media/379
    //content://media/external/images/media/378
    //content://media/external/images/media/1214
    state = { hasData: false, imageuri: null, tags: null, images: null}
    componentWillMount() {
        this.fetchData();
    }
    async fetchData() {
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
    renderList() {
        const tagged = this.state.tags;
        const allTags = tagged.map((tag) => (
                <CardSection>
                    <Text>
                        {tag}
                    </Text>
                </CardSection>
            ));
        return (
            [...allTags]
        );
    }
    render() {
        if (this.state.tags === null) {
            console.log('Im null!');
            return (
                <Text>
                    I'm not ready!
                </Text>
            );
        }
        if (this.state.tags !== null) {
            const filterTags = this.state.images.filter((imagep) => {
                return imagep.tag === 'Tests';
            });
            console.log(filterTags);
            return (
                <Text>
                    Im Done!
                </Text>
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
