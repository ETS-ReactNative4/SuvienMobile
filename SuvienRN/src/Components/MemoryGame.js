import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button, Header, GameTile } from './common';

class MemoryGame extends Component {
    state = { tiles: null, card1: null, overrideKey: null, card2: null, cards: null, showCaption: false, width: null, seconds: 0, minutes: 0 }
    componentWillMount() {
        this.createNewGame();
    }

    async createNewGame() {
        const pictures1 = JSON.parse(await AsyncStorage.getItem('Pictures'));
        const pictures2 = JSON.parse(await AsyncStorage.getItem('Pictures'));
        const numbarray1 = this.generateNumArray(pictures1.length);
        let randarray = this.shuffle(numbarray1);
        randarray = randarray.slice(0, 4); //4
        const allTiles1 = this.pushDuplicates(pictures1, randarray, '+');
        const allTiles2 = this.pushDuplicates(pictures2, randarray, '-');
        const allTiles = [...allTiles1, ...allTiles2];
        const newNumbArray = this.generateNumArray(8);
        const newRandArray = this.shuffle(newNumbArray);
        const allTilesShuffle = this.shuffleTiles(allTiles, newRandArray);
        this.setState({ tiles: [...allTilesShuffle], width: Dimensions.get('window').width, showCaption: false, card1: null, card2: null, overrideKey: null, cards: null });
        AsyncStorage.setItem('Cards', JSON.stringify([]));  
    }

    generateNumArray(num) {
        const numbarray = [];
        for (let i = 0; i < num; i++) {
            numbarray.push(i);
        }
        return numbarray;
    }

    renderTiles() {
        const pictureTiles = this.state.tiles.map((allTile) => {
            return (
                <GameTile 
                onPress={(isTurned) => {
                    if (isTurned === true) {
                        if (this.state.card1 === null) {
                            this.setState({ card1: allTile });
                        }
                        if (this.state.card1 !== null) {
                            this.setState({ card2: allTile });
                        }
                        if (this.state.card1 !== null && this.state.card2 !== null) {
                            this.setState({ card1: allTile, card2: null, showCaption: false });
                        }
                    }
                    }
                    } uri={allTile.imageuri}
                    card1={this.state.card1}
                    card2={this.state.card2}
                    trueKey={allTile.id}
                    key={allTile.id}
                    cards={this.state.cards}
                    onFlip={async () => {
                        if (this.state.card1.imageuri === this.state.card2.imageuri && this.state.card1 !== null && this.state.card2 !== null) {
                            const cards = JSON.parse(await AsyncStorage.getItem('Cards'));
                            cards.push(this.state.card1.id);
                            cards.push(this.state.card2.id);
                            AsyncStorage.setItem('Cards', JSON.stringify(cards));
                            this.setState({ cards, showCaption: true });
                            }
                        if (this.state.card2.imageuri !== this.state.card1.imageuri && this.state.card1 !== null && this.state.card2 !== null) {
                            setTimeout(() => {
                                this.setState({ card1: null, card2: null });
                            }, 1000);
                        }
                    }}
                />
            );
        });
    return ( 
        [...pictureTiles]
    );
    }
    pushDuplicates(desarray, randomarray, symbol) {
        const allTiles = [];
        for (let i = 0; i < 4; i++) {
            const first = desarray[randomarray[i]];
            first.id = `${symbol}${i}`;
            allTiles.push(first);
        }
        return allTiles;
    }

    shuffleTiles(tileArray, randomArray) {
        const allTilesShuffle = [];
        for (let y = 0; y < 8; y++) {
                allTilesShuffle[y] = tileArray[randomArray[y]];
            }
        return allTilesShuffle;
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

    render() {
        console.log(this.state);
        if (this.state.width === null) {
            return (
                <Text>Loading</Text>
            );
        }
        if (this.state.width !== null) {
            if (this.state.tiles === null) {
            return (
            <View />
        );
    }
        if (this.state.tiles !== null) {
            if (this.state.showCaption === false) {
                return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1 }}>
                    <Header style={{ height: 60 }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Memory Game</Text>
                    </Header>
                    </View>
                <View style={{ flex: 10, flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center' }}>
                    {this.renderTiles()}
                </View>
                <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: (this.state.width - 40), marginBottom: 30 }}>
                </View>
                </View>
            );
            }
            if (this.state.showCaption === true) {
                if (this.state.cards.length === 8) {
                   return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Modal
                animationType={"fade"}
                transparent
                visible
                onRequestClose={() => {}}
                >
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 400, width: 600, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../Images/trophy.png')} style={{ height: 200, width: 200 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>Congrats!</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 5 }}>You've completed the game. Would you like to play again?</Text>
                            <CardSection style={{ height: 50, width: 200, backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button onPress={this.createNewGame.bind(this)} textsStyle={{ fontSize: 20, paddingTop: 5, backgroundColor: 'transparent' }}>
                        Yes
                    </Button>
                    </CardSection>
                    <CardSection style={{ height: 50, width: 200, backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button 
                    onPress={() => {
                        this.setState({ showCaption: false });
                        Actions.MainMenu();
                        }}
                    textsStyle={{ fontSize: 20, paddingTop: 5, backgroundColor: 'transparent' }}
                    >
                        No
                    </Button>
                </CardSection>
                        </View>
                    </View>
                </Modal>
                    <View style={{ flex: 1 }}>
                    <Header style={{ height: 60 }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Memory Game</Text>
                    </Header>
                    </View>
                <View style={{ flex: 10, flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center' }}>
                    {this.renderTiles()}
                </View>
                </View>
            );
                }
                if (this.state.cards.length !== 8) {
                    return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Modal
                animationType={"fade"}
                transparent
                visible
                onRequestClose={() => {}}
                >
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 400, width: 600, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../Images/trophy.png')} style={{ height: 200, width: 200 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>Congrats!</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 5 }}>You've completed the game. Would you like to play again?</Text>
                            <CardSection style={{ height: 50, width: 200, backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button onPress={this.createNewGame.bind(this)} textsStyle={{ fontSize: 20, paddingTop: 5, backgroundColor: 'transparent' }}>
                        Yes
                    </Button>
                    </CardSection>
                    <CardSection style={{ height: 50, width: 200, backgroundColor: 'transparent', borderBottomWidth: 0 }}>
                    <Button 
                    onPress={() => {
                        this.setState({ showCaption: false });
                        Actions.MainMenu();
                        }}
                    textsStyle={{ fontSize: 20, paddingTop: 5, backgroundColor: 'transparent' }}
                    >
                        No
                    </Button>
                </CardSection>
                        </View>
                    </View>
                </Modal>
                    <View style={{ flex: 1 }}>
                    <Header style={{ height: 60 }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Memory Game</Text>
                    </Header>
                    </View>
                <View style={{ flex: 10, flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center' }}>
                    {this.renderTiles()}
                </View>
                <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: (this.state.width - 40), marginBottom: 30, backgroundColor: 'grey' }}>
                <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin' }}>{this.state.card1.caption}</Text>
                </View>
                </View>
            );
                }
            }
        }
        }
    }
}

export { MemoryGame };
