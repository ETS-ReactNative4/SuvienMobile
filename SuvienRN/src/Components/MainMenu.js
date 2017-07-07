import React, { Component } from 'react';
import Languages from '../Languages/Languages.json';
import { Image, View, AsyncStorage, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Header, CheckBox } from './common';
import Orientation from 'react-native-orientation';

class MainMenu extends Component {
    state = { isFirst: null, isComp: null, stage: null, preferences: null, language: null, lang: null, ask: null }
    async componentDidMount() {
        /*
        */
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
        if (JSON.parse(await AsyncStorage.getItem('Ask')) === false || JSON.parse(await AsyncStorage.getItem('Ask')) === null) {
            if (await AsyncStorage.getItem('name') === null && await AsyncStorage.getItem('stage') === null && await AsyncStorage.getItem('Language') !== null) {
            const array = Languages[await AsyncStorage.getItem('Language')]['029'];
            const prefobj = {};
            prefobj[array[0]] = true;
            prefobj[array[1]] = true;
            prefobj[array[2]] = true;
            prefobj[array[3]] = true;
            prefobj[array[4]] = false;
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
            AsyncStorage.setItem('Preset', (Languages[await AsyncStorage.getItem('Language')]['094'])[3]);
            AsyncStorage.setItem('Preferences', JSON.stringify(prefobj));
            this.setState({ isFirst: true, lang: true });
        } 
        if (await AsyncStorage.getItem('name') !== null && await AsyncStorage.getItem('stage') !== null && await AsyncStorage.getItem('Language') !== null) {
            this.setState({ isFirst: false, stage: await AsyncStorage.getItem('stage'), isComp: await AsyncStorage.getItem('Achievement'), lang: true, ask: false });
        }
        }
        if (JSON.parse(await AsyncStorage.getItem('Ask')) === true) {
            this.setState({ isFirst: false, stage: await AsyncStorage.getItem('stage'), isComp: await AsyncStorage.getItem('Achievement'), lang: false, ask: true });
        }
    }

    render() {
        if (this.state.lang === null) {
            return (
                <View />
            );
        }
        if (this.state.lang === true) {
            console.log(this.state.ask);
            return (
                <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Language</Text>
                </View>
                <View style={{ flex: 1 }} />
            </Header>
            <View style={{ marginLeft: 80, marginRight: 80, marginTop: 15, flexWrap: 'wrap' }}>
                <View style={{ marginLeft: 30, marginRight: 30, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', marginBottom: 50, marginTop: 50 }}>
                        Select your language:
                    </Text>
                </View>
                <CardSection>
                    <Button 
                    onPress={async () => {
                        if (this.state.isFirst === false) {
                            const presetarray = Languages[await AsyncStorage.getItem('Language')]['094'];
                            const preferencearray = Languages[await AsyncStorage.getItem('Language')]['029'];
                            const preset = await AsyncStorage.getItem('Preset');
                            const preferences = this.state.preferences;
                            const newpreset = (Languages.ENG['094'])[presetarray.indexOf(preset)];
                            let newpreferences = {};
                            for (let i = 0; i < 5; i++) {
                                newpreferences[(Languages.ENG['029'])[i]] = preferences[preferencearray[i]];
                             }
                            AsyncStorage.setItem('Language', 'ENG');
                            AsyncStorage.setItem('Preferences', JSON.stringify(newpreferences));
                            AsyncStorage.setItem('Preset', newpreset);
                            AsyncStorage.setItem('Ask', JSON.stringify(this.state.ask));
                            this.setState({ lang: false, language: 'ENG' });
                        }
                        if (this.state.isFirst === true) {
                            const array = Languages[await AsyncStorage.getItem('Language')]['029'];
                            const prefobj = {};
                            prefobj[array[0]] = true;
                            prefobj[array[1]] = true;
                            prefobj[array[2]] = true;
                            prefobj[array[3]] = true;
                            prefobj[array[4]] = false;
                            AsyncStorage.setItem('Language', 'ENG');
                            AsyncStorage.setItem('Preferences', JSON.stringify(prefobj));
                            AsyncStorage.setItem('Ask', JSON.stringify(this.state.ask));
                            this.setState({ lang: false, language: 'ENG' });
                        }
                        }}
                    >
                        English
                    </Button>
                </CardSection>
                <CardSection>
                    <Button 
                    onPress={async () => {
                        if (this.state.isFirst === false) {
                            const presetarray = Languages[await AsyncStorage.getItem('Language')]['094'];
                            const preferencearray = Languages[await AsyncStorage.getItem('Language')]['029'];
                            const preset = await AsyncStorage.getItem('Preset');
                            const preferences = this.state.preferences;
                            const newpreset = (Languages.FRE['094'])[presetarray.indexOf(preset)];
                            let newpreferences = {};
                            for (let i = 0; i < 5; i++) {
                                newpreferences[(Languages.FRE['029'])[i]] = preferences[preferencearray[i]];
                             }
                             AsyncStorage.setItem('Language', 'FRE');
                            AsyncStorage.setItem('Preferences', JSON.stringify(newpreferences));
                            AsyncStorage.setItem('Preset', newpreset);
                            AsyncStorage.setItem('Ask', JSON.stringify(this.state.ask));
                            this.setState({ lang: false, language: 'FRE' });
                        }
                        if (this.state.isFirst === true) {
                            const array = Languages[await AsyncStorage.getItem('Language')]['029'];
                            const prefobj = {};
                            prefobj[array[0]] = true;
                            prefobj[array[1]] = true;
                            prefobj[array[2]] = true;
                            prefobj[array[3]] = true;
                            prefobj[array[4]] = false;
                            AsyncStorage.setItem('Language', 'FRE');
                            AsyncStorage.setItem('Preferences', JSON.stringify(prefobj));
                            AsyncStorage.setItem('Ask', JSON.stringify(this.state.ask));
                            this.setState({ lang: false, language: 'FRE' });
                        }
                        }}
                    >
                        Français
                    </Button>
                </CardSection>
                <CardSection>
                    <Button 
                    onPress={async () => {
                        if (this.state.isFirst === false) {
                            const presetarray = Languages[await AsyncStorage.getItem('Language')]['094'];
                            const preferencearray = Languages[await AsyncStorage.getItem('Language')]['029'];
                            const preset = await AsyncStorage.getItem('Preset');
                            const preferences = this.state.preferences;
                            const newpreset = (Languages.ESP['094'])[presetarray.indexOf(preset)];
                            let newpreferences = {};
                            for (let i = 0; i < 5; i++) {
                                newpreferences[(Languages.ESP['029'])[i]] = preferences[preferencearray[i]];
                             }
                             AsyncStorage.setItem('Language', 'ESP');
                            AsyncStorage.setItem('Preferences', JSON.stringify(newpreferences));
                            AsyncStorage.setItem('Preset', newpreset);
                            AsyncStorage.setItem('Ask', JSON.stringify(this.state.ask));
                            this.setState({ lang: false, language: 'ESP' });
                        }
                        if (this.state.isFirst === true) {
                            const array = Languages[await AsyncStorage.getItem('Language')]['029'];
                            const prefobj = {};
                            prefobj[array[0]] = true;
                            prefobj[array[1]] = true;
                            prefobj[array[2]] = true;
                            prefobj[array[3]] = true;
                            prefobj[array[4]] = false;
                            AsyncStorage.setItem('Language', 'ESP');
                            AsyncStorage.setItem('Preferences', JSON.stringify(prefobj));
                            AsyncStorage.setItem('Ask', JSON.stringify(this.state.ask));
                            this.setState({ lang: false, language: 'ESP' });
                        }
                        }}
                    >
                        Español
                    </Button>
                </CardSection>
                <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <CheckBox
                    label="Do not ask me again/Ne me demandez plus"
                    checkType="Ask"
                    value={this.state.ask}
                    onChangeItem={(ask) => this.setState({ ask })}
                    />
                </View>
            </View>
            </View>
            );
        }
        if (this.state.lang === false) {
            if (this.state.isFirst === null || this.state.language === null) {
            return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../Images/loading.gif')} style={{ height: 400, width: 400 }} />
                </View>
            );
        }
        if (this.state.isFirst === false) {
            if (this.state.stage === '1' || this.state.acheivement === 'INCOM' || this.state.preferences[Languages[this.state.language]['032']] === false) {
                return (
                <Image resizeMode="stretch" source={require('../Images/suviensplash.png')} style={styles.canvas}>
                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', flex: 1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: null, width: null }}>
                        <View style={styles.leftContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 251, backgroundColor: 'transparent', position: 'relative' }} />
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        {Languages[this.state.language]['001']}
                                    </Button>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 23, fontFamily: 'Roboto-Light' }}>{Languages[this.state.language]['002']}</Text>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'row' }}>
                                <View style={{ flex: 150 }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        {Languages[this.state.language]['003']}
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
                                        {Languages[this.state.language]['001']}
                                    </Button>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 23, fontFamily: 'Roboto-Light' }}>{Languages[this.state.language]['002']}</Text>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'row' }}>
                                <View style={{ flex: 150 }}>
                                    <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                        {Languages[this.state.language]['003']}
                                    </Button>
                                </View>
                                <View style={{ flex: 100 }} />
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'column' }}>
                                <Text style={{ fontSize: 23, fontFamily: 'Roboto-Light' }}>{Languages[this.state.language]['004']}</Text>
                            </CardSection>
                            <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative', flexDirection: 'row' }}>
                                <View style={{ flex: 150 }}>
                                    <Button style={styles.buttonContainer} onPress={() => Actions.MemoryGame()}>
                                        {Languages[this.state.language]['005']}
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
                                    {Languages[this.state.language]['000']}
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
