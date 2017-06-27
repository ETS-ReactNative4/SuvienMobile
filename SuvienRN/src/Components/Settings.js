import React, { Component } from 'react';
import { Text, View, AsyncStorage, Image, ScrollView, Platform } from 'react-native';
import { CardSection, Input, Button } from './common';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';

class Settings extends Component {
    state = { name: '', stage: null, isFirst: false, acheivement: null, preset: null };
    async componentWillMount() {
        if (await AsyncStorage.getItem('name') !== null) {
            this.setState({ 
                name: await AsyncStorage.getItem('name'), 
                stage: await AsyncStorage.getItem('stage'),
                acheivement: await AsyncStorage.getItem('Acheivement'),
                preset: await AsyncStorage.getItem('Preset')
            });
        }
        if (await AsyncStorage.getItem('name') === null) {
            this.setState({
                isFirst: true
            });
        }
    }
    async onButtonPress() {
        if (this.state.stage === null) {
            try {
                await AsyncStorage.setItem('name', this.state.name);
                await AsyncStorage.setItem('stage', '0');
                } catch (error) {
                console.log(error);
        }
    }
        if (this.state.stage !== null) {
            try {
                await AsyncStorage.setItem('name', this.state.name);
                await AsyncStorage.setItem('stage', this.state.stage);
                } catch (error) {
                console.log(error);
        }
        }
        
        //Actions.Home();
        Actions.Home();
}
    renderRadioButton() {
        if (this.state.stage !== null) {
            return (
            <CardSection>
                <Text style={styles.radioTextStyle}>Stage</Text>
                <RadioForm
                        radio_props={radioProps}
                        initial={parseInt(this.state.stage)}
                        style={{ flex: 6 }}
                        buttonColor={'#4A86E8'}
                        onPress={(stage) => this.setState({ stage: stage.toString() })} 
                />
            </CardSection>
            );
        }
        if (this.state.stage === null && this.state.isFirst) {
            return (
                <CardSection>
                <Text style={styles.radioTextStyle}>Stage</Text>
                <RadioForm
                        radio_props={radioProps}
                        initial={0}
                        style={{ flex: 6 }}
                        buttonColor={'#4A86E8'}
                        onPress={(stage) => this.setState({ stage: stage.toString() })} 
                />
            </CardSection>
            );
        }
    }

    onPhotoButtonPress() {
        Actions.AddPhoto();
    }

    onVideoButtonPress() {
        Actions.AddVideo();
    }

    onAudioButtonPress() { 
         if (Platform.OS === 'ios') {
            Actions.AddAudio();
        }
        if (Platform.OS === 'android') {
            Actions.AddAudioAnd();
        }
    }

    render() {
        if (this.state.isFirst === false) {
            if (this.state.acheivement === 'COMP') {
            return (
            <ScrollView>
            <View style={{ marginTop: 80, marginLeft: 80, marginRight: 80, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 30, alignSelf: 'center', fontFamily: 'UltimaPDac-UltraLight' }}>Edit Information</Text>
                    <Image source={require('../Images/infoicon.jpg')} style={{ marginLeft: 10, height: 30, width: 30 }} />
                </View>
                <CardSection>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    />
                </CardSection>

                {this.renderRadioButton()}

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save and Continue
                    </Button>
                </CardSection>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{ marginTop: 30, fontSize: 30, alignSelf: 'center', marginBottom: 30, fontFamily: 'UltimaPDac-UltraLight', fontWeight: '300' }}>Upload a new...</Text>
                    <Image source={require('../Images/multimedia.png')} style={{ marginLeft: 5, height: 30, width: 90 }} />
                </View>
                <CardSection>
                    <Button onPress={this.onPhotoButtonPress.bind(this)}>Photo</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onVideoButtonPress.bind(this)}>Video</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onAudioButtonPress.bind(this)}>Audio</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => Actions.AddMessage()}>Message</Button>
                </CardSection>
                <Text style={{ marginTop: 30, fontSize: 30, alignSelf: 'center', fontFamily: 'UltimaPDac-UltraLight', fontWeight: '300' }}>Preferences</Text>
                <Text style={{ marginTop: 10, fontSize: 23, alignSelf: 'center', marginBottom: 30, fontFamily: 'UltimaPDac-UltraLight' }}> Currently Loaded Preference: {this.state.preset} </Text>
                <CardSection>
                    <Button 
                    onPress={() => {
                        AsyncStorage.setItem('Preset', 'Date');
                        Actions.Home();
                        }}
                    >Sort by Date
                    </Button>
                </CardSection>
                <CardSection>
                    <Button 
                    onPress={() => {
                        Actions.TagSelect();
                        }}
                    >Sort by Tag
                    </Button>
                </CardSection>
                <CardSection>
                    <Button 
                    onPress={() => {
                        AsyncStorage.setItem('Preset', 'Favourites');
                        Actions.Home();
                        }}
                    >Sort by Favourites
                    </Button>
                </CardSection>
                <CardSection>
                    <Button 
                    onPress={() => {
                        AsyncStorage.setItem('Preset', 'Random');
                        Actions.Home();
                        }}
                    >Random
                    </Button>
                </CardSection>
            </View>
            </ScrollView>
        );
            } 
        if (this.state.acheivement === 'INCOM') {
            return (
            <ScrollView>
            <View style={{ marginTop: 80, marginLeft: 80, marginRight: 80, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 30, alignSelf: 'center', fontFamily: 'UltimaPDac-UltraLight' }}>Edit Information</Text>
                    <Image source={require('../Images/infoicon.jpg')} style={{ marginLeft: 10, height: 30, width: 30 }} />
                </View>
                <CardSection>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    />
                </CardSection>

                {this.renderRadioButton()}

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save and Continue
                    </Button>
                </CardSection>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginTop: 30, fontSize: 30, alignSelf: 'center', marginBottom: 30, fontFamily: 'UltimaPDac-UltraLight', fontWeight: '300' }}>Upload a new...</Text>
                    <Image source={require('../Images/multimedia.png')} style={{ marginLeft: 5, height: 30, width: 90 }} />
                </View>
                <CardSection>
                    <Button onPress={this.onPhotoButtonPress.bind(this)}>Photo</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onVideoButtonPress.bind(this)}>Video</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onAudioButtonPress.bind(this)}>Audio</Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => Actions.AddMessage()}>Message</Button>
                </CardSection>
                </View>
                </ScrollView>
                );
            }
            if (this.state.acheivement === null) {
                return (
                    <View />
                );
            }
       }
    if (this.state.isFirst === true) {
        return (
            <View style={{ marginTop: 80, marginLeft: 80, marginRight: 80, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 30, alignSelf: 'center', fontFamily: 'ClementePDae-Light' }}>Edit Information</Text>
                    <Image source={require('../Images/infoicon.jpg')} style={{ marginLeft: 10, height: 30, width: 30 }} />
                </View>
                <CardSection>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({ name })}
                    />
                </CardSection>

                {this.renderRadioButton()}

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save and Continue
                    </Button>
                </CardSection>
            </View>
        );
    }
    }
}

const radioProps = [
  { label: 'Early', value: 0 },
  { label: 'Late', value: 1 }
];

const styles = {
    radioTextStyle: {
        fontSize: 23,
        marginLeft: 100,
        flex: 1,
        alignSelf: 'center',
        fontFamily: 'Roboto-Light'
    }
};
export { Settings };
