import React, { Component } from 'react';
import { Text, View, AsyncStorage, Image } from 'react-native';
import { CardSection, Input, Button } from './common';
import RadioForm from 'react-native-simple-radio-button';
import { Actions } from 'react-native-router-flux';

class Settings extends Component {
    state = { name: '', stage: null, isFirst: false };
    async componentWillMount() {
        if (await AsyncStorage.getItem('name') !== null) {
            this.setState({ 
                name: await AsyncStorage.getItem('name'), 
                stage: await AsyncStorage.getItem('stage') 
            });
        }
        if (await AsyncStorage.getItem('name') === null) {
            this.setState({
                isFirst: true
            });
        }
    }
    async onButtonPress() {
        try {
            await AsyncStorage.setItem('name', this.state.name);
            await AsyncStorage.setItem('stage', this.state.stage);
            } catch (error) {
            console.log(error);
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
        if (this.state.stage === null && this.state.isFirst === false) {
            //Spinner may be added here
            return (
                <Text>I'm Waiting!</Text>
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
        Actions.AddAudio();
    }

    render() {
        if (this.state.isFirst === false) {
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
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{ marginTop: 30, fontSize: 30, alignSelf: 'center', marginBottom: 30, fontFamily: 'ClementePDae-Light' }}>Upload a new...</Text>
                    <Image source={require('../Images/multimedia.jpg')} style={{ marginLeft: 5, height: 30, width: 90 }} />
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
            </View>
        );
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
        fontFamily: 'ClementePDag-Book'
    }
};
export { Settings };
