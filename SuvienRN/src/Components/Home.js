import React, { Component } from 'react';
import { View, AsyncStorage, Text, Dimensions, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';
import { Header, PictureTile, Button, CardSection } from './common';
import { Actions } from 'react-native-router-flux';
import HomeBar from './HomeBar';

class Home extends Component {
    state = { dim: null, media: null, preset: null, tags: null, width: null, acheivement: null }
    async componentWillMount() {
        this.setState({ width: Dimensions.get('window').width });
        //console.log('Im in componentwillmount!');
        this.getData();
    }

    componentDidMount() {
        //console.log('Im in componentdidmount!');
        this.doMath();
    }

    doMath() {
        const ourWidth = this.state.width;
        const pictureDim = Math.trunc(((ourWidth - 55) / 4));
        this.setState({ dim: pictureDim });
    }

    shuffle(array) {
        let currentIndex = array.length, 
        temporaryValue, 
        randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

        // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
  }

  return array;
}

    async getData() {
        const ourdata = JSON.parse(await AsyncStorage.getItem('Media'));
        this.setState({ preset: await AsyncStorage.getItem('Preset'), tags: JSON.parse(await AsyncStorage.getItem('Tags')), acheivement: await AsyncStorage.getItem('Acheivement') });
        if (ourdata.length > 0) {
            this.setState({ media: ourdata });
        }
        if (ourdata.length === 0) {
            this.setState({ media: [] });
        }
    }

    renderTiles() {
        if (this.state.media !== null) {
            if (this.state.preset === 'Date') {
            const newMedia = this.state.media.reverse();
            let j;
            for (j = 0; j < newMedia.length; j++) {
                newMedia[j].uniqueID = j;
            }
            const allTiles = [];
            let i;
            for (i = 0; i < newMedia.length; i++) {
                let isFound = newMedia.find((medi) => medi.uniqueID === i);
                if (isFound === undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={null} unique={i} key={`${i}p`} />
                );  
                }
                if (isFound !== undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} />
                );
                }
            }
            return (
                [...allTiles]
            );
        }
        if (this.state.tags.find((tag) => this.state.preset === tag) !== undefined) {
            const newMedia = this.state.media.reverse();
            const filterTags = newMedia.filter((imagep) => imagep.group === this.state.preset);
            let j;
            for (j = 0; j < filterTags.length; j++) {
                filterTags[j].uniqueID = j;
            }
            const allTiles = [];
            let i;
            for (i = 0; i < filterTags.length; i++) {
                let isFound = filterTags.find((medi) => medi.uniqueID === i);
                if (isFound === undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={null} unique={i} key={`${i}p`} />
                );  
                }
                if (isFound !== undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} />
                );
                }
            }
            return (
                [...allTiles]
            );
        }
        if (this.state.preset === 'Favourites') {
            const newMedia = this.state.media.reverse();
            const filterTags = newMedia.filter((imagep) => imagep.isFavourite === true);
            let j;
            for (j = 0; j < filterTags.length; j++) {
                filterTags[j].uniqueID = j;
            }
            const allTiles = [];
            let i;
            for (i = 0; i < filterTags.length; i++) {
                let isFound = filterTags.find((medi) => medi.uniqueID === i);
                if (isFound === undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={null} unique={i} key={`${i}p`} />
                );  
                }
                if (isFound !== undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} />
                );
                }
            }
            return (
                [...allTiles]
            );
        }

        if (this.state.preset === 'Random') {
            const newMedia = this.state.media;
            const numbarray = [];
            let k;
            for (k = 0; k < newMedia.length; k++) {
                numbarray.push(k);
            }
            const randarray = this.shuffle(numbarray);
            let j;
            for (j = 0; j < newMedia.length; j++) {
                newMedia[j].uniqueID = randarray[j];
            }
            const allTiles = [];
            let i;
            for (i = 0; i < newMedia.length; i++) {
                let isFound = newMedia.find((medi) => medi.uniqueID === i);
                if (isFound === undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={null} unique={i} key={`${i}p`} />
                );  
                }
                if (isFound !== undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} />
                );
                }
            }
            return (
                [...allTiles]
            );
        }
        
        }

        if (this.state.preset === 'None') {
            //console.logconsole.log('Im in preset!');
            if (this.state.media !== null) {
                //console.log('Im in media not null')
                const allTiles = [];
                let i;
                for (i = 0; i < 8; i++) {
                    let isFound = this.state.media.find((medi) => medi.uniqueID === i);
                    if (isFound === undefined) {
                        allTiles.push(
                        <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={null} unique={i} key={`${i}p`} />
                    );  
                    }
                    if (isFound !== undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} />
                    );
                    }
                }
                //console.log(allTiles);
                return (
                    [...allTiles]
                );
            }
            if (this.state.media === null) {
                const allTiles = [];
                let i;
                for (i = 0; i < 8; i++) {
                    allTiles.push(
                        <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={null} unique={i} key={`${i}p`} />
                    );
                }
                return (
                    [...allTiles]
                );
            }
        }
        if (this.state.media === null) {
            return (
                <View />
            );
        }
    }
    
    parseHour(i) {
        const times = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '8', '9', '10', '11'];
        return times[i];
    }
    addZero(p) {
        if (p < 10) {
            p = `0${p}`;
        }
        return p;
    }
    render() {
        console.log(this.state.acheivement);
        //console.log('Im rendering!');
        //console.log(this.state.minute);;
        //console.log(aorp);
        //console.log(this.state.sizes);
        if ((this.state.media !== null || this.state.media === []) && this.state.acheivement !== null) {
            let setModal;
            if (this.state.acheivement === 'INCOM' && this.state.media.length === 8) {
                setModal = true;
            }
            else {
                setModal = false;
            }
        return (
            <View style={{ flex: 1 }}>
                <Modal
                animationType={"slide"}
                transparent
                visible={setModal}
                onRequestClose={() => {}}
                >
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../Images/trophy.png')} style={{ height: 300, width: 300 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>Congrats!</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 5 }}>You've uploaded your first 8 images! You can now chose different filters for the main screen.</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                    setModal = false;
                                    AsyncStorage.setItem('Acheivement', 'COM');
                                    Actions.Settings();
                                }}
                                >
                                    Go to settings
                                </Button>
                            </CardSection>
                        </View>
                    </View>
                </Modal>
                <Header>
                    <HomeBar />
                </Header>
                <ScrollView>
                    <View style={{ marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap', flex: 1, paddingTop: 10 }}>
                        {this.renderTiles()}
                    </View>
                </ScrollView>
            </View>
        );
    }
        if (this.state.media === null && this.state.media !== []) {
            return (
                <Text>Loading</Text>
            );
        }
    } 
    }

export { Home };
