import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View, AsyncStorage, Dimensions, Platform, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';
import Languages from '../Languages/Languages.json';
import { Actions } from 'react-native-router-flux';

class TagSelect extends Component {
    state = { tags: null, height: null, width: null, languages: null }
    async componentWillMount() {
        //console.log('Im in compwillmount');
        this.setState({ languages: await AsyncStorage.getItem('Language') });
        this.ridUselessTags(JSON.parse(await AsyncStorage.getItem('Tags')));
    }

    //add number of items
    async ridUselessTags(tags) {
        const media = JSON.parse(await AsyncStorage.getItem('Media'));
        const uselesstags = [];
        for (let i = 0; i < tags.length; i++) {
            const filter = media.filter((medi) => medi.group === tags[i]);
            if (filter.length === 0 || filter === undefined || tags[i] === null || tags[i] === undefined || tags[i] === '') {
                uselesstags.push(tags[i]);
            }
        }
        if (uselesstags.length > 0) {
            for (let j = 0; j < uselesstags.length; j++) {
            tags.splice(tags.indexOf(uselesstags[j]), 1);
        }
        }
        AsyncStorage.setItem('Tags', JSON.stringify(tags));
        this.setState({ tags });
    }
    componentDidMount() {
        this.setState({ 
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width 
        });
    }

renderList() {
    if (this.state.tags !== null) {
        const tagged = this.state.tags;
        const allTags = tagged.map((tag) => (
            <TouchableOpacity 
            onPress={() => {
                AsyncStorage.setItem('Preset', tag);
                Actions.Home();
                }}
            >
                <CardSection style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginRight: 15, backgroundColor: 'white', width: (this.state.width - 70) }}>
                    <Image source={require('../Images/tag.png')} style={{ height: 40, width: 40 }} />
                    <Text style={{ fontSize: 20, fontFamily: 'Roboto-Light', alignSelf: 'flex-end' }}>
                        {tag}
                    </Text>
                </CardSection>
            </TouchableOpacity>
        ));
        return (
            [...allTags]
        );
    }
    else {
        return (
            <View />
        );
    }
    }
    render() {
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
        if (this.state.languages !== null) {
            return (
            <View style={{ flexDirection: 'row', paddingTop: 15, backgroundColor: '#f9f7f7', height: this.state.height, width: this.state.width }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableWithoutFeedback onPress={() => Actions.Settings()}>
                        <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 50, width: 50, marginRight: 10, marginLeft: 10 }} />
                        </TouchableWithoutFeedback>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light', marginLeft: 10, marginTop: 10, marginBottom: 10 }}>{Languages[this.state.languages]['048']}</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 20, marginLeft: 5, width: (this.state.width - 70) }}>
                        {this.renderList()}
                    </View>
                </View>
            </View>
        );
        }
}
}

export { TagSelect };
