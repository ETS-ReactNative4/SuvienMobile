import React, { Component } from 'react';
import { View, Text, AsyncStorage, Image, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Button, CheckBox, Header } from './common';
import { Actions } from 'react-native-router-flux';

class AdvancedSettings extends Component {
    state = { preferences: null }
    async componentWillMount() {
        this.setState({ preferences: JSON.parse(await AsyncStorage.getItem('Preferences')) });
    }

    async onSavePrefPress() {
        AsyncStorage.setItem('Preferences', JSON.stringify(this.state.preferences));
        Actions.Settings();
    }
    render() {
        if (this.state.preferences !== null) {
             return (
            <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Advanced Settings</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
            <View>
            <CheckBox
            checkType="Preferences"
            label="Display Date"
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
            label="Messages Enabled"
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
            label="Display Clock"
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
            label="Display Greeting"
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
            label="Memory Game Enabled"
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
            label="Admin-User Mode Enabled"
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
            <CardSection>
                <Button onPress={this.onSavePrefPress.bind(this)}>
                    Save and Return
                </Button>
            </CardSection>
            <CardSection>
                <Button onPress={() => Actions.Settings()}>
                    Return Without Saving
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

export default AdvancedSettings;
