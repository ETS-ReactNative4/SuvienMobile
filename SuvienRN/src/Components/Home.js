//Get everything on one page
//Dimension fix: need to input the dimensions in async
import React, { Component } from 'react';
import { View, AsyncStorage, Text, Dimensions, ScrollView, Modal, Platform, Image } from 'react-native';
import Orientation from 'react-native-orientation';
import Languages from '../Languages/Languages.json';
import { Header, PictureTile, Button, CardSection } from './common';
import { Actions } from 'react-native-router-flux';
import HomeBar from './HomeBar';
import CongratsModal from './CongratsModal';
import { Media } from './';

class Home extends Component {
    state = { dim: null, media: null, preset: null, tags: null, width: null, acheivement: null, medias: null, languages: null, color: null }
    async componentWillMount() {
        this.setState({ width: parseInt(await AsyncStorage.getItem('Width')), languages: await AsyncStorage.getItem('Language'), color: await AsyncStorage.getItem('BGColour') });
        console.log(await AsyncStorage.getItem('Preferences'));
        this.doMath();
        Orientation.lockToLandscape();
        //console.log('Im in componentwillmount!');
        this.getData();
    }

    doMath() {
        const ourWidth = this.state.width;
        //console.log(ourWidth);
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
        if (ourdata.length === 8 && await AsyncStorage.getItem('Acheivement') === 'INCOM') {
            AsyncStorage.setItem('Acheivement', 'COM');
        }
        if (ourdata.length > 0) {
            this.setState({ media: ourdata });
        }
        if (ourdata.length === 0) {
            this.setState({ media: [] });
        }
    }

    renderTiles() {
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
        if (this.state.languages !== null) {
             if (this.state.media !== null) {
            if (this.state.preset === (Languages[this.state.languages]['094'])[0]) {
            let newMedia = this.state.media.reverse();
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
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} onChangePress={(obj) => {
                        this.setState({ medias: obj });
                        }} />
                );
                }
            }
            newMedia = newMedia.reverse();
            return (
                [...allTiles]
            );
        }
        if (this.state.tags.find((tag) => this.state.preset === tag) !== undefined) {
            let newMedia = this.state.media.reverse();
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
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} onChangePress={(obj) => {
                        this.setState({ medias: obj });
                        }} />
                );
                }
            }
            newMedia = newMedia.reverse();
            return (
                [...allTiles]
            );
        }
        if (this.state.preset === (Languages[this.state.languages]['094'])[1]) {
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
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} onChangePress={(obj) => {
                        this.setState({ medias: obj })
                        }} />
                );
                }
            }
            return (
                [...allTiles]
            );
        }

        if (this.state.preset === (Languages[this.state.languages]['094'])[2]) {
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
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} onChangePress={(obj) => {
                        this.setState({ medias: obj });
                        }} 
                        />
                );
                }
            }
            return (
                [...allTiles]
            );
        }

        if (this.state.preset === (Languages[this.state.languages]['094'])[3]) {
            //console.logconsole.log('Im in preset!');
            if (this.state.media !== null) {
                //console.log('Im in media not null')
                const allTiles = [];
                let i;
                for (i = 0; i < 8; i++) {
                    let isFound = this.state.media.find((medi) => medi.uniqueID === i);
                    if (isFound === undefined || isFound === []) {
                        allTiles.push(
                        <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={null} unique={i} key={`${i}p`} />
                    );  
                    }
                    if (isFound !== undefined) {
                    allTiles.push(
                    <PictureTile style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim, marginBottom: 5 }} data={isFound} unique={i} key={`${i}p`} onChangePress={(obj) => {
                        this.setState({ medias: obj });
                        }} 
                    />
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
             }
        if (this.state.media === null) {
            return (
                <View />
            );
        }
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
        //console.log(this.state.acheivement);
        //console.log('Im rendering!');
        //console.log(this.state.minute);;
        //console.log(aorp);
        //console.log(this.state.sizes);
        if ((this.state.media !== null || this.state.media === []) && this.state.acheivement !== null && this.state.acheivement ) {
            if (this.state.medias === null) {
                 return (
            <View style={{ flex: 1 }}>
                <Modal
                animationType={"fade"}
                transparent
                visible={false}
                onRequestClose={() => {}}
                >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <View />
                </View>
                </Modal>
                <CongratsModal />
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
        if (this.state.medias !== null) {
            console.log(this.state.medias);
             return (
            <View style={{ flex: 1 }}>
                <Modal
                animationType={"fade"}
                transparent
                visible
                onRequestClose={() => {}}
                >
                <View style={{ flex: 1, backgroundColor: this.state.color, alignItems: 'center', justifyContent: 'center' }}>
                    <Media
                    obj={this.state.medias}
                    onInvisible={async (flag) => {
                        if (flag === true) {
                            this.setState({ medias: null, media: JSON.parse(await AsyncStorage.getItem('Media')) });
                        }
                    }}
                    />
                </View>
                </Modal>
                <CongratsModal />
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
    }
        if (this.state.media === null && this.state.media !== []) {
            return (
                <View style={{ flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{ uri: `loadingflag${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ width: 250, height: 100 }} />
                </View>
            );
        }
    } 
    }

export { Home };
