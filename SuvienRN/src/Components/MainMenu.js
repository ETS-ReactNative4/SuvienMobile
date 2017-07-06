import React, { Component } from 'react';
import Languages from '../Languages/Languages.json';
import { Image, View, AsyncStorage, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';
import Orientation from 'react-native-orientation';

class MainMenu extends Component {
    state = { isFirst: null, isComp: null, stage: null, preferences: null, language: null }
    async componentDidMount() {
        AsyncStorage.setItem('Height', Dimensions.get('window').height.toString());
        AsyncStorage.setItem('Width', Dimensions.get('window').width.toString());
        AsyncStorage.setItem('Language', 'FRE');
        Orientation.lockToLandscape();
         if (await AsyncStorage.getItem('name') !== null && await AsyncStorage.getItem('stage') !== null) {
             this.setState({ isComp: await AsyncStorage.getItem('Acheivement'), language: await AsyncStorage.getItem('Language'), preferences: JSON.parse(await AsyncStorage.getItem('Preferences')), stage: await AsyncStorage.getItem('Stage'), media: JSON.parse(await AsyncStorage.getItem('Pictures')), acheivement: await AsyncStorage.getItem('Acheivement') });
         }
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
        if (await AsyncStorage.getItem('name') === null && await AsyncStorage.getItem('stage') === null) {
            this.setState({ isFirst: true });
            AsyncStorage.setItem('Videos', JSON.stringify([]));
            AsyncStorage.setItem('Tags', JSON.stringify([]));
            AsyncStorage.setItem('Media', JSON.stringify([]));
            AsyncStorage.setItem('Pictures', JSON.stringify([]));
            AsyncStorage.setItem('Favourites', JSON.stringify([]));
            AsyncStorage.setItem('Height', Dimensions.get('window').height.toString());
            AsyncStorage.setItem('Width', Dimensions.get('window').width.toString());
            AsyncStorage.setItem('Audio', JSON.stringify([]));
            AsyncStorage.setItem('Messages', JSON.stringify([]));
            AsyncStorage.setItem('Acheivement', 'INCOM');
            AsyncStorage.setItem('Cards', JSON.stringify([]));
            AsyncStorage.setItem('Preset', 'None');
            AsyncStorage.setItem('Preferences', JSON.stringify({
            'Display Date': true,
            'Messages Enabled': true,
            'Display Clock': true,
            'Display Greeting': true,
            'Memory Game Enabled': true,
            'Admin-User Mode Enabled': false
        }));
        } else {
        this.setState({ isFirst: false, stage: await AsyncStorage.getItem('stage'), isComp: await AsyncStorage.getItem('Achievement') });
    }
    }

    render() {
        const { language } = this.state;
        console.log(this.state.acheivement);
        if (this.state.isFirst === null || language === null) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../Images/loading.gif')} style={{ height: 400, width: 400 }} />
                </View>
            );
        }
        if (this.state.isFirst === false) {
            if (this.state.stage === '1' || this.state.acheivement === 'INCOM' || this.state.preferences['Memory Game Enabled'] === false) {
                return (
                <Image resizeMode="stretch" source={require('../Images/suviensplash.png')} style={styles.canvas}>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: null, width: null }}>
                        <View style={styles.leftContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent', position: 'relative' }} />
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        {Languages[language]['001']}
                                    </Button>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 23, fontFamily: 'Roboto-Light' }}>{Languages[language]['002']}</Text>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'row' }}>
                                <View style={{ flex: 150 }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        {Languages[language]['003']}
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
        } else {
            return (
                <Image resizeMode="stretch" source={require('../Images/suviensplash.png')} style={styles.canvas}>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: null, width: null }}>
                        <View style={styles.leftContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent', position: 'relative' }} />
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        {Languages[language]['001']}
                                    </Button>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 23, fontFamily: 'Roboto-Light' }}>{Languages[language]['002']}</Text>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'row' }}>
                                <View style={{ flex: 150 }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        {Languages[language]['003']}
                                    </Button>
                                </View>
                                <View style={{ flex: 100 }} />
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 23, fontFamily: 'Roboto-Light' }}>{Languages[language]['004']}</Text>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'row' }}>
                                <View style={{ flex: 150 }}>
                                    <Button style={styles.buttonContainer} onPress={() => Actions.MemoryGame()}>
                                        {Languages[language]['005']}
                                    </Button>
                                </View>
                                <View style={{ flex: 100 }} />
                            </CardSection>
                            <CardSection style={{ borderBottomWidth: 0, flex: 100, backgroundColor: 'transparent', position: 'relative' }} />
                        </View>
                        <View style={styles.rightContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 456, backgroundColor: 'transparent', flexDirection: 'column', position: 'relative' }} />
                        </View>
                    </View>
                </Image>
            );
        }
        }

        if (this.state.isFirst === true) {
        return (
                <Image resizeMode="stretch" source={require('../Images/suviensplash.png')} style={styles.canvas}>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: null, width: null }}>
                        <View style={styles.leftContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent', position: 'relative' }} />
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative' }}>
                                <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                    {Languages[language]['000']}
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
