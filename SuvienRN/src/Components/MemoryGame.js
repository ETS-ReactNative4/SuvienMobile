import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity, Dimensions, Modal, Platform, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Languages from '../Languages/Languages.json';
import { CardSection, Button, Header, GameTile } from './common';
import Orientation from 'react-native-orientation';

class MemoryGame extends Component {
    state = { tiles: null, card1: null, overrideKey: null, card2: null, languages: null, cards: null, showCaption: false, width: null, height: null, seconds: 0, minutes: 0, color: null, complete: false }
    componentWillMount() {
        Orientation.lockToLandscape();
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
        this.setState({ tiles: [...allTilesShuffle], color: await AsyncStorage.getItem('BGColour'), width: parseInt(await AsyncStorage.getItem('Width')), height: parseInt(await AsyncStorage.getItem('Height')), showCaption: false, card1: null, card2: null, overrideKey: null, cards: null, languages: await AsyncStorage.getItem('Language') });
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
        console.log(this.state.cards);
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
        if (this.state.languages !== null) {
            if (this.state.width === null) {
            return (
                <Image source={{ uri: `${Languages[this.state.languages]['119']}${Platform.OS === 'ios' ? '.png' : ''}` }} style={{ width: 500, height: 200 }} />
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
                    <Header style={{ height: 60, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['099']}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </Header>
                    </View>
                <View style={{ flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center', height: (this.state.height - 70) }}>
                    {this.renderTiles()}
                </View>
                <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: (this.state.width - 40), marginBottom: 30 }}>
                    <CardSection style={{ height: 70 }}>
                    <Button onPress={() => Actions.MainMenu()}>
                        {Languages[this.state.languages]['070']}
                    </Button>
                    </CardSection>
                    </View>
                </View>
            );
            }
            if (this.state.showCaption === true) {
                if (this.state.complete === true) {
                    return (
                        <View style={{ flex: 1, flexDirection: 'column' }}>
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
                                this.setState({ card1: null, card2: null, cards: null, showCaption: false, complete: false });
                                this.createNewGame();
                                }} 
                                textsStyle={{ fontSize: 20, paddingTop: 5, backgroundColor: 'transparent' }}>
                                {Languages[this.state.languages]['096']}
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
                                {Languages[this.state.languages]['097']}
                            </Button>
                        </CardSection>
                                </View>
                            </View>
                        </Modal>
                            <View style={{ flex: 1 }}>
                            <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['099']}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </Header>
                            </View>
                        <View style={{ flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center', height: (this.state.height - 70) }}>
                            {this.renderTiles()}
                        </View>
                        <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: (this.state.width - 40), marginBottom: 30 }}>
                    <CardSection style={{ height: 70 }}>
                    <Button onPress={() => Actions.MainMenu()}>
                        {Languages[this.state.languages]['070']}
                    </Button>
                    </CardSection>
                    </View>
                        </View>
                    );
                } else {
                    if (this.state.cards.length === 8) {
                        if (this.state.card1.height <= this.state.card1.width) {
                            const heightRatio = parseFloat(this.state.height - 300) / parseFloat(this.state.card1.height);
                             let newHeight = this.state.height - 300;
                             let newWidth = this.state.card1.width * heightRatio;
                              return (
                     <View style={{ flex: 1, flexDirection: 'column' }}>
                         <Modal
                     animationType={"fade"}
                     transparent
                     visible
                     onRequestClose={() => {}}
                     >
                     <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                         <Image
                         style={{ height: newHeight, backgroundColor: 'black', width: newWidth }}
                         source={{ uri: this.state.card1.imageuri }}
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
             }}
             >{this.state.card1.caption}</Text>
                                         <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                             <Button onPress={() => this.setState({ card1: null, card2: null, complete: true })} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['098']}</Button>
                                         </CardSection>
                                         </View>
                         </View>
                     </Modal>
                         <View style={{ flex: 1 }}>
                         <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['099']}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </Header>
                         </View>
                     <View style={{ flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center', height: (this.state.height - 70) }}>
                         {this.renderTiles()}
                     </View>
                     <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: (this.state.width - 40), marginBottom: 30 }}>
                    <CardSection style={{ height: 70 }}>
                    <Button onPress={() => Actions.MainMenu()}>
                        {Languages[this.state.languages]['070']}
                    </Button>
                    </CardSection>
                    </View>
                     </View>
                 );
                        }
                     if (this.state.card1.height > this.state.card1.width) {
                         const heightRatio = parseFloat(this.state.height - 50) / parseFloat(this.state.card1.height);
                     let newHeight = this.state.height - 50;
                     let newWidth = this.state.card1.width * heightRatio;
                     return (
                     <View style={{ flex: 1, flexDirection: 'column' }}>
                         <Modal
                     animationType={"fade"}
                     transparent
                     visible
                     onRequestClose={() => {}}
                     >
                         <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                         <Image
                         style={{ height: newHeight, backgroundColor: 'black', width: newWidth }}
                         source={{ uri: this.state.card1.imageuri }}
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
             >{this.state.card1.caption}</Text>
                                         <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                             <Button onPress={() => this.setState({ card1: null, card2: null, complete: true })} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['098']}</Button>
                                         </CardSection>
                                         </View>
                         </View>
                     </Modal>
                         <View style={{ flex: 1 }}>
                         <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['099']}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </Header>
                         </View>
                     <View style={{ flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center', height: (this.state.height - 70) }}>
                         {this.renderTiles()}
                     </View>
                     <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: (this.state.width - 40), marginBottom: 30 }}>
                    <CardSection style={{ height: 70 }}>
                    <Button onPress={() => Actions.MainMenu()}>
                       {Languages[this.state.languages]['070']}
                    </Button>
                    </CardSection>                    
                    </View>
                     </View>
                 );
                     }
                    }
                    if (this.state.cards.length !== 8) {
                        if (this.state.card1.height <= this.state.card1.width) {
                            const heightRatio = parseFloat(this.state.height - 300) / parseFloat(this.state.card1.height);
                             let newHeight = this.state.height - 300;
                             let newWidth = this.state.card1.width * heightRatio;
                              return (
                     <View style={{ flex: 1, flexDirection: 'column' }}>
                         <Modal
                     animationType={"fade"}
                     transparent
                     visible
                     onRequestClose={() => {}}
                     >
                     <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                         <Image
                         style={{ height: newHeight, backgroundColor: 'black', width: newWidth }}
                         source={{ uri: this.state.card1.imageuri }}
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
             }}
             >{this.state.card1.caption}</Text>
                                         <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                             <Button onPress={() => this.setState({ card1: null, card2: null, showCaption: false })} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['098']}</Button>
                                         </CardSection>
                                         </View>
                         </View>
                     </Modal>
                         <View style={{ flex: 1 }}>
                         <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['099']}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </Header>
                         </View>
                     <View style={{ flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center', height: (this.state.height - 70) }}>
                         {this.renderTiles()}
                     </View>
                     <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: (this.state.width - 40), marginBottom: 30 }}>
                    <CardSection style={{ height: 70 }}>
                    <Button onPress={() => Actions.MainMenu()}>
                        {Languages[this.state.languages]['070']}
                    </Button>
                    </CardSection>
                    </View>
                     </View>
                 );
                        }
                     if (this.state.card1.height > this.state.card1.width) {
                         const heightRatio = parseFloat(this.state.height - 50) / parseFloat(this.state.card1.height);
                     let newHeight = this.state.height - 50;
                     let newWidth = this.state.card1.width * heightRatio;
                     return (
                     <View style={{ flex: 1, flexDirection: 'column' }}>
                         <Modal
                     animationType={"fade"}
                     transparent
                     visible
                     onRequestClose={() => {}}
                     >
                         <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                         <Image
                         style={{ height: newHeight, backgroundColor: 'black', width: newWidth }}
                         source={{ uri: this.state.card1.imageuri }}
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
             >{this.state.card1.caption}</Text>
                                         <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                             <Button onPress={() => this.setState({ card1: null, card2: null, showCaption: false })} style={{ backgroundColor: '#b7d6ff' }} textsStyle={{ color: 'white' }}>{Languages[this.state.languages]['098']}</Button>
                                         </CardSection>
                                         </View>
                         </View>
                     </Modal>
                         <View style={{ flex: 1 }}>
                         <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['099']}</Text>
                </View>
                <View style={{ flex: 1 }} />
            </Header>
                         </View>
                     <View style={{ flexWrap: 'wrap', alignSelf: 'center', justifyContent: 'center', height: (this.state.height - 70) }}>
                         {this.renderTiles()}
                     </View>
                     <View style={{ alignSelf: 'center', flex: 1, alignItems: 'center', justifyContent: 'center', width: (this.state.width - 40), marginBottom: 30 }}>
                    <CardSection style={{ height: 70 }}>
                    <Button onPress={() => Actions.MainMenu()}>
                        {Languages[this.state.languages]['070']}
                    </Button>
                    </CardSection>
                    </View>
                     </View>
                 );
                     }
                    }
                }
            }
        }
        }
        }
    }
}

export { MemoryGame };
