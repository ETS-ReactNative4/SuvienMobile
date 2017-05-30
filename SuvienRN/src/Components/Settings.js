import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { CardSection, Input, Button } from './common';
import RadioForm from 'react-native-simple-radio-button';

class Settings extends Component {
    state = { name: '', stage: null };
    async componentWillMount() {
        console.log('method started!');
        if (await AsyncStorage.getItem('name') !== null) {
            console.log('Im in the if!');
            const namec = await AsyncStorage.getItem('name');
            const stagec = await AsyncStorage.getItem('stage');
            console.log('Ive got the stuff!');
            this.setState({ name: namec, stage: stagec });
            console.log('time to leave again!');
            console.log(this.state.stage);
        }
    }
    async onButtonPress() {
        try {
            await AsyncStorage.setItem('name', this.state.name);
            await AsyncStorage.setItem('stage', this.state.stage);
            console.log(await AsyncStorage.getItem('name'));
            console.log(await AsyncStorage.getItem('stage'));
            } catch (error) {
            console.log(error);
        }
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
        if (this.state.stage === null) {
            return (
                <Text>I'm Waiting!</Text>
            );
        }
    }
    render() {
        const stages = parseInt(this.state.stage);
        console.log(stages);
        return (
            <View style={{ marginTop: 60 }}>
                <Text style={{ fontSize: 30, alignSelf: 'center' }}>Edit Information</Text>
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

const radioProps = [
  { label: 'Early', value: 0 },
  { label: 'Late', value: 1 }
];

const styles = {
    radioTextStyle: {
        fontSize: 20,
        marginLeft: 100,
        flex: 1,
        alignSelf: 'center'
    }
};
export default Settings;
