import React, { Component } from 'react';
import { Image, View, AsyncStorage, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';
import Orientation from 'react-native-orientation';

class MainMenu extends Component {
    state = { isFirst: null }
    async componentDidMount() {
        Orientation.lockToLandscape();
        AsyncStorage.setItem('Acheivement', 'INCOM');
        AsyncStorage.multiRemove(['Pictures', 'Presets', 'temp', 'Tags', 'Videos', 'isSelected']);
        AsyncStorage.setItem('Videos', JSON.stringify([]));
        AsyncStorage.setItem('Tags', JSON.stringify([]));
        AsyncStorage.setItem('Media', JSON.stringify([]));
        AsyncStorage.setItem('Pictures', JSON.stringify([]));
        AsyncStorage.setItem('Favourites', JSON.stringify([]));
        AsyncStorage.setItem('Preset', 'None');
        /*
        AsyncStorage.multiRemove(['Pictures', 'Presets', 'temp', 'Tags', 'Videos', 'isSelected']);
        AsyncStorage.setItem('Videos', JSON.stringify([]));
        AsyncStorage.setItem('Tags', JSON.stringify([]));
        AsyncStorage.setItem('Media', JSON.stringify([]));
        AsyncStorage.setItem('Pictures', JSON.stringify([]));
        AsyncStorage.setItem('Favourites', JSON.stringify([]));
        AsyncStorage.setItem('Preset', 'None');
        /*
        AsyncStorage.multiRemove(['Pictures', 'Presets', 'temp', 'Tags', 'Videos', 'isSelected']);
        AsyncStorage.setItem('Videos', JSON.stringify([]));
        AsyncStorage.setItem('Tags', JSON.stringify([]));
        AsyncStorage.setItem('Media', JSON.stringify([]));
        AsyncStorage.setItem('Pictures', JSON.stringify([]));
        AsyncStorage.setItem('Favourites', JSON.stringify([]));
        AsyncStorage.setItem('Preset', 'None');
        */
        /*
        /*
        /*
        AsyncStorage.setItem('Videos', JSON.stringify([]));
        AsyncStorage.setItem('Tags', JSON.stringify(['General']));
        AsyncStorage.setItem('Presets', JSON.stringify(
                [{ name: 'general', content: [] }]
        ));
        AsyncStorage.setItem('Pictures', JSON.stringify([]));
        */
        //
        //console.log(AsyncStorage.getAllKeys());
        this.getFirst();
    }
    onButtonPress() {
        if (this.state.isFirst === true) {
            Actions.FirstLanding();
        }
        if (this.state.isFirst === false) {
            Actions.Home();
        }
    }

    async getFirst() {
        if (await AsyncStorage.getItem('name') === null && await AsyncStorage.getItem('stage') === null){
            this.setState({ isFirst: true });
            AsyncStorage.setItem('Videos', JSON.stringify([]));
            AsyncStorage.setItem('Tags', JSON.stringify([]));
            AsyncStorage.setItem('Media', JSON.stringify([]));
            AsyncStorage.setItem('Pictures', JSON.stringify([]));
            AsyncStorage.setItem('Favourites', JSON.stringify([]));
        } else {
        this.setState({ isFirst: false });
    }
    }

    render() {
        if (this.state.isFirst === null) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../Images/loading.gif')} style={{ height: 400, width: 400 }} />
                </View>
            );
        }
        if (this.state.isFirst === false) {
            return (
                <Image resizeMode="stretch" source={require('../Images/suviensplash.png')} style={styles.canvas}>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: null, width: null }}>
                        <View style={styles.leftContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent', position: 'relative' }} />
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        Start
                                    </Button>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 23, fontFamily: 'Roboto-Light' }}>Have questions? Visit our help page!</Text>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'row' }}>
                                <View style={{ flex: 150 }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        Help
                                    </Button>
                                </View>
                                <View style={{ flex: 100 }} />
                            </CardSection>
                            <CardSection style={{ borderBottomWidth: 0, flex: 170, backgroundColor: 'transparent', position: 'relative' }} />
                        </View>
                        <View style={styles.rightContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 456, backgroundColor: 'transparent', flexDirection: 'column', position: 'relative' }} />
                        </View>
                    </View>
                </Image>
            );
        }

        if (this.state.isFirst === true) {
        return (
                <Image resizeMode="stretch" source={require('../Images/suviensplash.png')} style={styles.canvas}>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: null, width: null }}>
                        <View style={styles.leftContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent', position: 'relative' }} />
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative' }}>
                                <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                    Get Started
                                </Button>
                            </CardSection>
                            <CardSection style={{ borderBottomWidth: 0, flex: 270, backgroundColor: 'transparent', position: 'relative' }} />
                        </View>
                        <View style={styles.rightContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 456, backgroundColor: 'transparent', flexDirection: 'column', position: 'relative' }} />
                        </View>
                    </View>
                </Image>
        );
        }
    }    
}

const styles = {
    bigContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative'
    },
    leftContainer: {
        flex: 412,
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'transparent'
    },
    rightContainer: {
        flex: 456,
        flexDirection: 'column',
        position: 'relative'
    },
    buttonContainer: {
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center'
    },
    canvas: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: null,
        width: null
},
};

export { MainMenu };
