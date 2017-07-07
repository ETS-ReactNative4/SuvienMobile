import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, TouchableWithoutFeedback } from 'react-native';
import Languages from '../Languages/Languages.json';
import { CardSection, Button, CheckBox, Header } from './common';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';

class AdvancedSettings extends Component {
    state = { preferences: null, languages: null, selected: null, ask: null }
    async componentWillMount() {
        const transarray = ['ENG', 'FRE'];
        this.setState({ ask: JSON.parse(await AsyncStorage.getItem('Ask')), preferences: JSON.parse(await AsyncStorage.getItem('Preferences')), languages: await AsyncStorage.getItem('Language'), selected: transarray.indexOf(await AsyncStorage.getItem('Language')) });
    }

    async onSavePrefPress() {
        this.onSaveLangPress();
        AsyncStorage.setItem('Preferences', JSON.stringify(this.state.preferences));
        AsyncStorage.setItem('Ask', JSON.stringify(this.state.ask));
        AsyncStorage.setItem('Language', 'FRE');
        Actions.Settings();
    }

    async onSaveLangPress() {
        const transarray = ['ENG', 'FRE'];
        const presetarray = Languages[this.state.languages]['094'];
        const preferencearray = Languages[this.state.languages]['029'];
        const preset = await AsyncStorage.getItem('Preset');
        const preferences = this.state.preferences;
        const newpreset = (Languages[transarray[this.state.selected]]['094'])[presetarray.indexOf(preset)];
        let newpreferences = {};
        console.log(preferences);
        for (let i = 0; i < 5; i++) {
            newpreferences[(Languages[transarray[this.state.selected]]['029'])[i]] = preferences[preferencearray[i]];
        }
        AsyncStorage.setItem('Language', transarray[this.state.selected]);
        AsyncStorage.setItem('Preferences', JSON.stringify(newpreferences));
        AsyncStorage.setItem('Preset', newpreset);
    }

    renderRadioButton() {
        const transarray = ['ENG', 'FRE'];
        const radioProps = [
        { label: 'English', value: 0 },
        { label: 'Français', value: 1 }
        ];
        if (this.state.languages !== null) {
            return (
            <View style={{ height: 90, width: null }}>
                <RadioForm
                        radio_props={radioProps}
                        initial={transarray.indexOf(this.state.languages)}
                        buttonColor={'#4A86E8'}
                        onPress={(selected) => this.setState({ selected })} 
                />
            </View>
            );
        }
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
    }

    render() {
        if (this.state.preferences !== null && this.state.languages !== null) {
             return (
            <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['028']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 27, fontFamily: 'UltimaPDac-UltraLight', marginBottom: 10 }}>{Languages[this.state.languages]['100']}</Text>
            <View>
            <CheckBox
            checkType="Preferences"
            label={(Languages[this.state.languages]['029'])[0]}
            value={this.state.preferences}
            onChangeItem={(checked) => {
                if ((checked.substr(checked.length - 1)) !== '*') {
                    const pref = this.state.preferences;
                    pref[checked] = true;
                    this.setState({ preferences: pref });
                }
                if ((checked.substr(checked.length - 1)) === '*') {
                    const pref = this.state.preferences;
                    pref[checked.substr(0, (checked.length - 1))] = false;
                    this.setState({ preferences: pref });
                }
                }}
            />
            <CheckBox
            checkType="Preferences"
            label={Languages[this.state.languages]['030']}
            value={this.state.preferences}
            onChangeItem={(checked) => {
                if ((checked.substr(checked.length - 1)) !== '*') {
                    const pref = this.state.preferences;
                    pref[checked] = true;
                    this.setState({ preferences: pref });
                }
                if ((checked.substr(checked.length - 1)) === '*') {
                    const pref = this.state.preferences;
                    pref[checked.substr(0, (checked.length - 1))] = false;
                    this.setState({ preferences: pref });
                }
                }}
            />
            <CheckBox
            checkType="Preferences"
            label={Languages[this.state.languages]['031']}
            value={this.state.preferences}
            onChangeItem={(checked) => {
                if ((checked.substr(checked.length - 1)) !== '*') {
                    const pref = this.state.preferences;
                    pref[checked] = true;
                    this.setState({ preferences: pref });
                }
                if ((checked.substr(checked.length - 1)) === '*') {
                    const pref = this.state.preferences;
                    pref[checked.substr(0, (checked.length - 1))] = false;
                    this.setState({ preferences: pref });
                }
                }}
            />
            <CheckBox
            checkType="Preferences"
            label={Languages[this.state.languages]['032']}
            value={this.state.preferences}
            onChangeItem={(checked) => {
                if ((checked.substr(checked.length - 1)) !== '*') {
                    const pref = this.state.preferences;
                    pref[checked] = true;
                    this.setState({ preferences: pref });
                }
                if ((checked.substr(checked.length - 1)) === '*') {
                    const pref = this.state.preferences;
                    pref[checked.substr(0, (checked.length - 1))] = false;
                    this.setState({ preferences: pref });
                }
                }}
            />
            <CheckBox
            checkType="Preferences"
            label={Languages[this.state.languages]['033']}
            value={this.state.preferences}
            onChangeItem={(checked) => {
                if ((checked.substr(checked.length - 1)) !== '*') {
                    const pref = this.state.preferences;
                    pref[checked] = true;
                    this.setState({ preferences: pref });
                }
                if ((checked.substr(checked.length - 1)) === '*') {
                    const pref = this.state.preferences;
                    pref[checked.substr(0, (checked.length - 1))] = false;
                    this.setState({ preferences: pref });
                }
                }}
            />
            </View>
            </View>
            <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 27, fontFamily: 'UltimaPDac-UltraLight', marginTop: 10, marginBottom: 10 }}>{Languages[this.state.languages]['101']}</Text>
            {this.renderRadioButton()}
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <CheckBox
                    label={Languages[this.state.languages]['102']}
                    checkType="Ask"
                    value={this.state.ask}
                    onChangeItem={(ask) => this.setState({ ask })}
                />
                </View>
            <CardSection>
                <Button onPress={this.onSavePrefPress.bind(this)}>
                   {Languages[this.state.languages]['067']}
                </Button>
            </CardSection>
            <CardSection>
                <Button onPress={() => Actions.Settings()}>
                    {Languages[this.state.languages]['035']}
                </Button>
            </CardSection>
            </View>
        );
    }
    if (this.state.preferences === null) {
        return (
            <View />
        );
    }
    }
}

const styles = {
    radioTextStyle: {
        fontSize: 23,
        marginLeft: 100,
        flex: 1,
        alignSelf: 'center',
        fontFamily: 'Roboto-Light'
    }
};

export default AdvancedSettings;
