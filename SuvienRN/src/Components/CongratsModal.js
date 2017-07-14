import React, { Component } from 'react';
import { Modal, Image, View, Text, AsyncStorage } from 'react-native';
import Languages from '../Languages/Languages.json';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class CongratsModal extends Component {
    state = { modalVisible: false, languages: null, color: null }
    async componentWillMount() {
        if ((await AsyncStorage.getItem('Acheivement')) === 'COM') {
            this.setState({ modalVisible: true, languages: await AsyncStorage.getItem('Language'), color: await AsyncStorage.getItem('BGColour') });
        }
    }
    render() {
        if (this.state.languages === null) {
            return (
                <Modal
                visible={false}
                onRequestClose={() => {}}
                animationType={"fade"}
                transparent
                >
                <View />
                </Modal>
            );
        }
        if (this.state.languages !== null) {
            return (
            <Modal
                animationType={"fade"}
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                >
                    <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../Images/trophy.png')} style={{ height: 300, width: 300 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>{Languages[this.state.languages]['082']}</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 5 }}>{Languages[this.state.languages]['016']}</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                    this.setState({ modalVisible: false });
                                    AsyncStorage.setItem('Acheivement', 'COMP');
                                    Actions.Settings();
                                }}
                                >
                                    {Languages[this.state.languages]['017']}
                                </Button>
                            </CardSection>
                        </View>
                    </View>
                </Modal>
        );
        }
    }
}

export default CongratsModal;
