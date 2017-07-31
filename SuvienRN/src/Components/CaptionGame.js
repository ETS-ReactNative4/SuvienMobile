import React, { Component } from 'react';
import { View, Image, AsyncStorage, Text, TouchableOpacity, Platform, TouchableWithoutFeedback, Modal } from 'react-native';
import Languages from '../Languages/Languages.json';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Header } from './common';
import Orientation from 'react-native-orientation';

class CaptionGame extends Component {
    state = { caption: null, languages: null, complete: false, height: null, width: null, tiles: null, dim: null, congrats: false, timesRun: null, wrongphotos: [], selected: null, color: null }
    async componentWillMount() {
        Orientation.lockToLandscape();
        this.createNewGame();
        this.doMath();
    }

    generateNumArray(num) {
        const numbarray = [];
        for (let i = 0; i < num; i++) {
            numbarray.push(i);
        }
        return numbarray;
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

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async createNewGame() {
        let number = this.state.timesRun;
        if (number === null || number >= 8) {
            number = 0;
        } 
        if (number !== null && number < 8) {
            number += 1;
        }
        const pictures1 = JSON.parse(await AsyncStorage.getItem('Pictures'));
        const numbarray1 = this.generateNumArray(pictures1.length);
        let randarray = this.shuffle(numbarray1);
        randarray = randarray.slice(0, 4); //4
        const indexx = this.getRandomInt(0, 3);
        const allTiles = [];
        for (let i = 0; i < 4; i++) {
            allTiles.push(pictures1[randarray[i]]);
        }
        this.setState({ tiles: [...allTiles], color: await AsyncStorage.getItem('BGColour'), width: parseInt(await AsyncStorage.getItem('Width')), wrongphotos: [], timesRun: number, height: parseInt(await AsyncStorage.getItem('Height')), congrats: false, caption: allTiles[indexx].caption, languages: await AsyncStorage.getItem('Language') });
    }

    async doMath() {
      const height = ((parseInt(await AsyncStorage.getItem('Height')) - 70) / 2);
      const width = ((parseInt(await AsyncStorage.getItem('Width')) - 400) / 2);
      if (height < width) {
          this.setState({ dim: height });
      }
      if (width <= height) {
          this.setState({ dim: width });
      }
    }
    renderTiles() {
        const newTiles = this.state.tiles.map((tile) =>{
            const findarray = this.state.wrongphotos.find((photo) => photo.imageuri === tile.imageuri);
            if (findarray !== undefined && findarray.length !== 0 && findarray !== -1) {
                return (
                    <Image style={{ height: this.state.dim, width: this.state.dim }} source={{ uri: tile.imageuri }}>
                        <Text style={{ fontSize: 40, color: '#ef4343', backgroundColor: 'transparent' }}>X</Text>
                    </Image>
            );
            } else {
                return (
                <TouchableOpacity 
                onPress={() => {
                    if (tile.caption === this.state.caption) {
                        this.setState({ congrats: true, selected: tile });
                    } else {
                        const arrays = this.state.wrongphotos;
                        arrays.push(tile);
                        this.setState({ congrats: false, wrongphotos: arrays });
                    }
                    }}
                >
                    <Image style={{ height: this.state.dim, width: this.state.dim }} source={{ uri: tile.imageuri }} />
                </TouchableOpacity>
            );
            }
        });
        return (
            [...newTiles]
        );
    }

    render() {
        console.log(this.state.timesRun);
        if (this.state.dim !== null && this.state.tiles !== null) {
            if (this.state.congrats === false) {
                return (
                <View style={{ flex: 1 }}>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['106']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.MainMenu()}>
                    <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', width: (this.state.dim * 2), flexWrap: 'wrap' }}>
                    {this.renderTiles()}
                </View>
                <View style={{ alignItems: 'center', height: (this.state.dim * 2), backgroundColor: '#e3edf9', width: (this.state.width - (this.state.dim * 2)) }}>
                <View style={{ width: ((this.state.width - (this.state.dim * 2) - 10)), backgroundColor: 'transparent', paddingTop: 30 }}>
                <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>{Languages[this.state.languages]['104']}</Text>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', marginTop: 25, alignSelf: 'center' }}>{this.state.caption}</Text>
                </View>
                </View>
                </View>
                </View>
            );
            }
            if (this.state.congrats === true) {
                if (this.state.complete === false) {
                    if (this.state.selected !== null && this.state.selected.height > this.state.selected.width) {
                        const heightRatio = parseFloat(this.state.height - 50) / parseFloat(this.state.selected.height);
                        let newHeight = this.state.height - 50;
                        let newWidth = this.state.selected.width * heightRatio;
                        return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.color }}>
                    <Modal
                animationType={"fade"}
                transparent
                visible
                onRequestClose={() => {}}
                >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Image
                    style={{ height: newHeight, backgroundColor: 'black', width: newWidth }}
                    source={{ uri: this.state.selected.imageuri }}
                    />
                    <View style={{ height: newHeight, backgroundColor: '#e3edf9', width: 400, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text 
                                        style={{
            fontSize: 30, 
            fontFamily: 'Roboto-Thin',  
            backgroundColor: '#e3edf9', //#edf5ff
            marginLeft: 5, 
            width: null,
            marginTop: 5,
            marginBottom: 5,
            alignItems: 'center'
        }}
        >{this.state.caption}</Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button 
                                        onPress={() => {
                        if (this.state.timesRun < 8) {
                            this.createNewGame();
                        } else {
                            this.setState({ complete: true });
                        }
                    }} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['105']}</Button>
                                    </CardSection>
                                    </View>
                    </View>
                </Modal>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['106']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.MainMenu()}>
                    <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <View style={{ flexDirection: 'row'}}>
                <View style={{ flexDirection: 'row', width: (this.state.dim * 2), flexWrap: 'wrap' }}>
                    {this.renderTiles()}
                </View>
                <View style={{ alignItems: 'center', height: (this.state.dim * 2), backgroundColor: '#e3edf9', width: (this.state.width - (this.state.dim * 2)) }}>
                <View style={{ width: ((this.state.width - (this.state.dim * 2) - 10)), backgroundColor: 'transparent', paddingTop: 30 }}>
                <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>{Languages[this.state.languages]['104']}</Text>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', marginTop: 25, alignSelf: 'center' }}>{this.state.caption}</Text>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', marginTop: 25, alignSelf: 'center' }}> {Languages[this.state.languages]['082']} </Text>
                <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button
                    onPress={() => {
                        if (this.state.timesRun < 8) {
                            this.createNewGame();
                        } else {
                            this.setState({ complete: true });
                        }
                    }}
                    >
                        {Languages[this.state.languages]['105']}
                    </Button>
                </CardSection>
                </View>
                </View>
                </View>
                </View>
            );
                    }
                    if (this.state.selected !== null && this.state.selected.height <= this.state.selected.width) {
                        const heightRatio = parseFloat(this.state.height - 300) / parseFloat(this.state.selected.height);
                        let newHeight = this.state.height - 300;
                        let newWidth = this.state.selected.width * heightRatio;
                        return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.color }}>
                    <Modal
                animationType={"fade"}
                transparent
                visible
                onRequestClose={() => {}}
                >
                <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                    style={{ height: newHeight, backgroundColor: 'black', width: newWidth }}
                    source={{ uri: this.state.selected.imageuri }}
                    />
                    <View style={{ height: 200, backgroundColor: '#e3edf9', width: newWidth, alignItems: 'center', justifyContent: 'center' }}>
                        <Text 
                        style={{
            fontSize: 30, 
            fontFamily: 'Roboto-Thin',  
            backgroundColor: '#e3edf9', //#edf5ff
            marginLeft: 5, 
            width: null,
            marginTop: 5,
            marginBottom: 5,
            alignItems: 'center'
        }}>{Languages[this.state.languages]['107']}</Text>
                                        <Text 
                                        style={{
            fontSize: 30, 
            fontFamily: 'Roboto-Thin',  
            backgroundColor: '#e3edf9', //#edf5ff
            marginLeft: 5, 
            width: null,
            marginTop: 5,
            marginBottom: 5,
            alignItems: 'center'
        }}
        >{this.state.caption}</Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button 
                                        onPress={() => {
                        if (this.state.timesRun < 8) {
                            this.createNewGame();
                        } else {
                            this.setState({ complete: true });
                        }
                    }} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['105']}</Button>
                                    </CardSection>
                                    </View>
                    </View>
                </Modal>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['106']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.MainMenu()}>
                    <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <View style={{ flexDirection: 'row'}}>
                <View style={{ flexDirection: 'row', width: (this.state.dim * 2), flexWrap: 'wrap' }}>
                    {this.renderTiles()}
                </View>
                <View style={{ alignItems: 'center', height: (this.state.dim * 2), backgroundColor: '#e3edf9', width: (this.state.width - (this.state.dim * 2)) }}>
                <View style={{ width: ((this.state.width - (this.state.dim * 2) - 10)), backgroundColor: 'transparent', paddingTop: 30 }}>
                <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>{Languages[this.state.languages]['104']}</Text>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', marginTop: 25, alignSelf: 'center' }}>{this.state.caption}</Text>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', marginTop: 25, alignSelf: 'center' }}> {Languages[this.state.languages]['082']} </Text>
                <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button
                    onPress={() => {
                        if (this.state.timesRun < 8) {
                            this.createNewGame();
                        } else {
                            this.setState({ complete: true });
                        }
                    }}
                    >
                        {Languages[this.state.languages]['105']}
                    </Button>
                </CardSection>
                </View>
                </View>
                </View>
                </View>
            );
                    }
                }
                if (this.state.complete === true) {
                    return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: this.state.color }}>
                    <Modal
                animationType={"fade"}
                transparent
                visible
                onRequestClose={() => {}}
                >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 400, width: 600, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../Images/trophy.png')} style={{ height: 200, width: 200 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>{Languages[this.state.languages]['082']}</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 5 }}>{Languages[this.state.languages]['095']}</Text>
                            <CardSection style={{ height: 50, width: 200, backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button 
                    onPress={() => {
                        this.setState({ timesRun: 0, complete: false, congrats: false });
                        this.createNewGame();
                        }} textsStyle={{ fontSize: 20, paddingTop: 5, backgroundColor: 'transparent' }}>
                        {Languages[this.state.languages]['096']}
                    </Button>
                    </CardSection>
                    <CardSection style={{ height: 50, width: 200, backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button 
                    onPress={() => {
                        this.setState({ congrats: false });
                        Actions.MainMenu();
                        }}
                    textsStyle={{ fontSize: 20, paddingTop: 5, backgroundColor: 'transparent' }}
                    >
                        {Languages[this.state.languages]['097']}
                    </Button>
                </CardSection>
                        </View>
                    </View>
                </Modal>
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['106']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.MainMenu()}>
                    <Image source={{ uri: `backbuttondark${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <View style={{ flexDirection: 'row'}}>
                <View style={{ flexDirection: 'row', width: (this.state.dim * 2), flexWrap: 'wrap' }}>
                    {this.renderTiles()}
                </View>
                <View style={{ alignItems: 'center', height: (this.state.dim * 2), backgroundColor: '#e3edf9', width: (this.state.width - (this.state.dim * 2)) }}>
                <View style={{ width: ((this.state.width - (this.state.dim * 2) - 10)), backgroundColor: 'transparent', paddingTop: 30 }}>
                <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>{Languages[this.state.languages]['104']}</Text>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', marginTop: 25, alignSelf: 'center' }}>{this.state.caption}</Text>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', marginTop: 25, alignSelf: 'center' }}> {Languages[this.state.languages]['082']} </Text>
                <CardSection style={{ backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button
                    onPress={() => {
                        if (this.state.timesRun < 8) {
                            this.createNewGame();
                        } else {
                            this.setState({ complete: true });
                        }
                    }}
                    >
                        {Languages[this.state.languages]['105']}
                    </Button>
                </CardSection>
                </View>
                </View>
                </View>
                </View>
            );
                }
            }
    } 
    if (this.state.dim === null || this.state.tiles === null) {
        return (
            <View />
        );
    }
    }
}

export { CaptionGame };
