import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, TouchableWithoutFeedback, Platform } from 'react-native';
import Languages from '../Languages/Languages.json';
import { CardSection, Button, CheckBox, Header } from './common';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';

class AdvancedSettings extends Component {
    state = { preferences: null, languages: null, selected: null, ask: null }
    async componentWillMount() {
        Orientation.lockToLandscape();
        const transarray = ['ENG', 'FRE', 'ESP'];
        this.setState({ ask: JSON.parse(await AsyncStorage.getItem('Ask')), preferences: JSON.parse(await AsyncStorage.getItem('Preferences')), languages: await AsyncStorage.getItem('Language'), selected: transarray.indexOf(await AsyncStorage.getItem('Language')) });
    }

    async onSavePrefPress() {
        this.onSaveLangPress();
        AsyncStorage.setItem('Preferences', JSON.stringify(this.state.preferences));
        AsyncStorage.setItem('Ask', JSON.stringify(this.state.ask));
        Actions.Settings();
    }

    async onSaveLangPress() {
        const transarray = ['ENG', 'FRE', 'ESP'];
        const dayarray = Languages[this.state.languages]['012'];
        const messagearray = JSON.parse(await AsyncStorage.getItem('Messages'));
        const newmessagearray = messagearray.map((message) => {
            const newDay = message.day.map((days) => {
                return (Languages[transarray[this.state.selected]]['012'])[dayarray.indexOf(days)];
            });
            if (message.messageType === 'Msg') {
                return (
                    {
                        day: newDay,
                        message: message.message,
                        startHour: message.startHour,
                        startMinute: message.startMinute,
                        endHour: message.endHour,
                        endMinute: message.endMinute,
                        messageType: 'Msg',
                        messageID: message.messageID
                    }
                );
            }
            if (message.messageType === 'VideoMsg') {
                return (
                    {
                        day: newDay,
                        message: message.message,
                        startHour: message.startHour,
                        startMinute: message.startMinute,
                        endHour: message.endHour,
                        endMinute: message.endMinute,
                        uri: message.uri,
                        messageType: 'VideoMsg',
                        messageID: message.messageID
                    }
                );
            }
        });
        const presetarray = Languages[this.state.languages]['094'];
        const preferencearray = Languages[this.state.languages]['029'];
        const preset = await AsyncStorage.getItem('Preset');
        if (presetarray.find((pres) => pres === preset) !== undefined) {
         AsyncStorage.setItem('Preset', newpreset);   
        }
        const preferences = this.state.preferences;
        const newpreset = (Languages[transarray[this.state.selected]]['094'])[presetarray.indexOf(preset)];
        let newpreferences = {};
        console.log(preferences);
        for (let i = 0; i < 5; i++) {
            newpreferences[(Languages[transarray[this.state.selected]]['029'])[i]] = preferences[preferencearray[i]];
        }
        AsyncStorage.setItem('Messages', JSON.stringify(newmessagearray));
        AsyncStorage.setItem('Language', transarray[this.state.selected]);
        AsyncStorage.setItem('Preferences', JSON.stringify(newpreferences));
    }

    renderRadioButton() {
        const transarray = ['ENG', 'FRE', 'ESP'];
        const radioProps = [
        { label: 'English', value: 0 },
        { label: 'Français', value: 1 },
        { label: 'Español', value: 2 }
        ];
        if (this.state.languages !== null) {
            return (
            <View style={{ height: 120, width: null }}>
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
                    <Image source={require('../Images/mainmenu.png')} style={{ height: Platform.OS === 'ios' ? 40 : 50, width: Platform.OS === 'ios' ? 40 : 50, alignSelf: 'flex-end', marginRight: 20, marginBottom: Platform.OS === 'ios' ? 5 : 10 }} />
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
            <View>
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
            <Text style={{ marginLeft: 50, fontSize: 17, fontFamily: 'Roboto-Light' }}>{Languages[this.state.languages]['116']}</Text>
            </View>
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
        fontFamily: 'Roboto-Thin'
    }
};

export { AdvancedSettings };
