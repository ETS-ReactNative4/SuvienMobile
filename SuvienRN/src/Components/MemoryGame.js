import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage } from 'react-native';

class MemoryGame extends Component {
    async componentWillMount() {
        const medias = JSON.parse(await AsyncStorage.getItem('Media'));
        const numbarray = [];
            for (let k = 0; k < 8; k++) {
                numbarray.push(k);
            }
            const randarray = this.shuffle(numbarray);
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
        return (

        );
    }
}

export default MemoryGame;