import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';

class Media extends Component {
    state = { uri: null, caption: null, tag: null, height: null, width: null, scheight: null, scwidth: null }
    async componentWillMount() {
        const chosen = JSON.parse(await AsyncStorage.getItem('isSelected'));
        console.log(chosen);
        this.setState({ 
            uri: chosen.uri, 
            caption: chosen.caption, 
            tag: chosen.tag,
            height: chosen.height,
            width: chosen.width,
        });
    }

    componentDidMount() {
        this.setState({ 
            scheight: Dimensions.get('window').height,
            scwidth: Dimensions.get('window').width 
        });
    }

    render() {
        const { height, width, scheight, scwidth } = this.state;
        if (scheight !== null && width !== null) {
            if (height >= scheight) {
                const heightRatio = parseFloat(scheight) / parseFloat(height);
                let newHeight = scheight;
                let newWidth = width * heightRatio;
                if (newWidth > (scwidth - 400)) {
                    const widthRatio = parseFloat((scwidth - 400)) / parseFloat(newWidth);
                    newWidth = scwidth - 400;
                    newHeight *= widthRatio;
                }
                const paddingheight = (scheight - newHeight) / 2;
                console.log(scheight);
                console.log(newHeight);
                console.log(paddingheight);

            return (
                <Image source={require('../Images/picturebackground.png')} style={{ flex: 1, height: null, width: null }}>
                    <View style={{ backgroundColor: '#a2aebe', height: (newHeight + 100), flexDirection: 'row', marginTop: (paddingheight - 50), alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', height: scheight, backgroundColor: 'transparent', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginBottom: paddingheight, backgroundColor: 'transparent' }}>
                                <Image source={{ uri: this.state.uri }} style={{ height: newHeight, width: newWidth }} />
                                <View style={{ height: newHeight, width: 400, backgroundColor: '#a4c0e5' }}>
                                    <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book', marginTop: 10 }}>Caption:</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'ClementePDag-Book', marginBottom: 10 }}>{this.state.caption}</Text>
                                    <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book' }}>Tag:</Text>
                                    <Text style={{ fontSize: 20, fontFamily: 'ClementePDag-Book', marginBottom: 10 }}>{this.state.tag}</Text>
                                    <CardSection style={{ backgroundColor: 'transparent', marginLeft: 0, borderBottomWidth: 0 }}>
                                        <Button onPress={() => Actions.Home()}>Return to Home</Button>
                                    </CardSection>
                                </View>
                            </View>
                        </View>
                    </View>
                </Image>
            );
            }
        }  else {
            // spinner may be added here
            return (
                <Text>I'm waiting!</Text>
            );
        }
        }
    }

export default Media;
