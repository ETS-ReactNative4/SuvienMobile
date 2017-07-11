import React, { Component } from 'react';
import Languages from '../Languages/Languages.json';
import { Image, View, AsyncStorage, Text, Dimensions, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection, Header, CheckBox } from './common';
import Orientation from 'react-native-orientation';

class MainMenu extends Component {
    state = { pictures: null, isFirst: null, isComp: null, stage: null, preferences: null, language: null, lang: null, ask: null, img: null }
    async componentDidMount() {
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

    onMenuStart() {
        let section = [];
        if (this.state.isFirst === true) {
            section = [<View style={styles.leftContainer}>
                            <CardSection style={styles.titleContainer} />
                             <CardSection style={{ flex: 50, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0, backgroundColor: 'transparent', position: 'relative' }}>
                             <Button style={styles.buttonContainer} onPress={this.onButtonPress.bind(this)}>
                                 {Languages[this.state.language]['000']}
                             </Button>
                            </CardSection>
                            <CardSection style={{ borderBottomWidth: 0, flex: 270, backgroundColor: 'transparent', position: 'relative' }} />
                            </View>,
                            <View style={styles.rightContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 456, backgroundColor: 'transparent', flexDirection: 'column', position: 'relative' }} />
                            </View>
                            ];
        }
        if (this.state.isFirst === false) {
            if (this.state.stage === '1' || (this.state.pictures !== null && this.state.pictures.length < 8) || this.state.acheivement === 'INCOM' || this.state.preferences[Languages[this.state.language]['032']] === false) {
                section = [<View style={styles.leftContainer}>
                            <CardSection style={styles.titleContainer} />
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
                        </View>,
                        <View style={styles.rightContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 456, backgroundColor: 'transparent', flexDirection: 'column', position: 'relative' }} />
                        </View>
                        ];
            } else {
                section = [
                    <View style={styles.leftContainer}>
                            <CardSection style={styles.titleContainer} />
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
                                    <Button style={styles.buttonContainer} onPress={() => Actions.Games()}>
                                        {Languages[this.state.language]['005']}
                                    </Button>
                                </View>
                                <View style={{ flex: 100 }} />
                            </CardSection>
                            <CardSection style={{ borderBottomWidth: 0, flex: 100, backgroundColor: 'transparent', position: 'relative' }} />
                        </View>,
                        <View style={styles.rightContainer}>
                            <CardSection style={{ borderBottomWidth: 0, flex: 456, backgroundColor: 'transparent', flexDirection: 'column', position: 'relative' }} />
                        </View>
                        ];
            }
        }
        return (
            [...section]
        );
    }

    async onLanguageSelect(lang) {
        if (this.state.isFirst === false) {
            const presetarray = Languages[await AsyncStorage.getItem('Language')]['094'];
            const preferencearray = Languages[await AsyncStorage.getItem('Language')]['029'];
            const preset = await AsyncStorage.getItem('Preset');
            const preferences = this.state.preferences;
            const newpreset = (Languages[lang]['094'])[presetarray.indexOf(preset)];
            const newpreferences = {};
            for (let i = 0; i < 5; i++) {
                newpreferences[(Languages[lang]['029'])[i]] = preferences[preferencearray[i]];
            }
            const keys = ['Language', 'Preferences', 'Preset', 'Ask'];
            const values = [lang, JSON.stringify(newpreferences), newpreset, JSON.stringify(this.state.ask)];
            for (let i = 0; i < 4; i++) {
                AsyncStorage.setItem(keys[i], values[i]);
            }
            this.setState({ lang: false, language: lang, img: Languages[lang]['103'] });
        }
        if (this.state.isFirst === true) {
            AsyncStorage.setItem('Language', lang);
            const array = Languages[await AsyncStorage.getItem('Language')]['029'];
            const prefobj = {};
            for (let i = 0; i < 4; i++) {
                prefobj[array[i]] = true;
            }
            prefobj[array[4]] = false;
            const keys = ['Videos', 'Tags', 'Media', 'Pictures', 'Favourites', 'Height', 'Width', 'Audio', 'Messages', 'Acheivement', 'Cards', 'Preset', 'Preferences', 'Ask'];
            const values = [JSON.stringify([]), JSON.stringify([]), JSON.stringify([]), JSON.stringify([]), JSON.stringify([]), Dimensions.get('window').height.toString(), Dimensions.get('window').width.toString(), 
                            JSON.stringify([]), JSON.stringify([]), 'INCOM', JSON.stringify([]), (Languages[await AsyncStorage.getItem('Language')]['094'])[3], JSON.stringify(prefobj), JSON.stringify(this.state.ask)
                           ];
            for (let i = 0; i < keys.length; i++) {
                AsyncStorage.setItem(keys[i], values[i]);
            }
            this.setState({ lang: false, language: lang, img: Languages[lang]['103'] });
            }
    }

    async getFirst() {
        this.setState({ pictures: JSON.parse(await AsyncStorage.getItem('Pictures')) });
        if (JSON.parse(await AsyncStorage.getItem('Ask')) === false || JSON.parse(await AsyncStorage.getItem('Ask')) === null) {
            console.log('im here!');
            if (await AsyncStorage.getItem('name') === null && await AsyncStorage.getItem('stage') === null) {
            this.setState({ isFirst: true, lang: true });
        } 
        if (await AsyncStorage.getItem('name') !== null && await AsyncStorage.getItem('stage') !== null && await AsyncStorage.getItem('Language') !== null) {
            this.setState({ isFirst: false, stage: await AsyncStorage.getItem('stage'), isComp: await AsyncStorage.getItem('Achievement'), img: Languages[await AsyncStorage.getItem('Language')]['103'], lang: true, ask: false });
        }
        if (await AsyncStorage.getItem('name') !== null && await AsyncStorage.getItem('stage') !== null && await AsyncStorage.getItem('Language') === null) {
            this.setState({ isFirst: false, stage: await AsyncStorage.getItem('stage'), isComp: await AsyncStorage.getItem('Achievement'), lang: true, ask: false });
        }
        }
        if (JSON.parse(await AsyncStorage.getItem('Ask')) === true) {
            this.setState({ isFirst: false, stage: await AsyncStorage.getItem('stage'), isComp: await AsyncStorage.getItem('Achievement'), img: Languages[await AsyncStorage.getItem('Language')]['103'], lang: false, ask: true });
        }
    }

    renderLanguageButtons() {
        const buttons = [];
        const abreviations = ['ENG', 'FRE', 'ESP'];
        const languages = ['English', 'Français', 'Español'];
        for (let i = 0; i < 3; i++) {
            buttons.push(
                <CardSection>
                    <Button 
                    onPress={async () => {
                        this.onLanguageSelect(abreviations[i]);
                        }}
                    >
                        {languages[i]}
                    </Button>
                </CardSection>
            );
        }
        return (
            [...buttons]
        );
    }
    render() {
        console.log(this.state.img);
        if (this.state.lang === null) {
            return (
                <View />
            );
        }
        if (this.state.lang === true) {
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
                {this.renderLanguageButtons()}
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
                <View style={styles.loadingContainer}>
                    <Text style={{ marginTop: 30 }}>Loading</Text>
                </View>
            );
        } else {
            return (
                <Image resizeMode="stretch" source={{ uri: `${this.state.img}${Platform.OS === 'ios' ? '.png' : ''}` }} style={styles.canvas}>
                    <View style={styles.imageContainer}>
                        {this.onMenuStart()}
                    </View>
                </Image>
                ); 
            }
        }
    }
}

const styles = {
    titleContainer: { 
        borderBottomWidth: 0, 
        flex: 251, 
        backgroundColor: 'transparent', 
        position: 'relative' 
    },
    imageContainer: { 
        backgroundColor: 'transparent', 
        flexDirection: 'row', 
        flex: 1, 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        bottom: 0, 
        right: 0, 
        height: null, 
        width: null 
    },
    loadingContainer: {
        alignItems: 'center', 
        justifyContent: 'center' 
    },
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
