import React, { Component } from 'react';
import { Modal, Image, View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class CongratsModal extends Component {
    state = { modalVisible: false }
    async componentWillMount() {
        if ((await AsyncStorage.getItem('Acheivement')) === 'COM') {
            this.setState({ modalVisible: true });
        }
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
                >
                    <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../Images/trophy.png')} style={{ height: 300, width: 300 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>Congrats!</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 20, fontFamily: 'Roboto-Thin', marginBottom: 5 }}>You've uploaded your first 8 images! You can now chose different filters for the main screen.</Text>
                            <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                                <Button 
                                onPress={() => {
                                    this.setState({ modalVisible: false });
                                    AsyncStorage.setItem('Acheivement', 'COMP');
                                    Actions.Settings();
                                }}
                                >
                                    Go to settings
                                </Button>
                            </CardSection>
                        </View>
                    </View>
                </Modal>
        );
    }
}

export default CongratsModal;
