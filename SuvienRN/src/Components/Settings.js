import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, Input } from './common';
import RadioForm from 'react-native-simple-radio-button';

class Settings extends Component {
    render() {
        return (
            <View style={{ marginTop: 60 }}>
                <Text style={{ fontSize: 30, alignSelf: 'center' }}>Edit Information</Text>
                <CardSection>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    />
                </CardSection>

                <CardSection>
                    <RadioForm
                        radio_props={radioProps}
                        initial={0}
                        buttonColor={'#4A86E8'}
                        onPress={((value) => { console.log(value); })}
                    />
                </CardSection>
            </View>
        );
    }
}

const radioProps = [
  { label: 'Early', value: 0 },
  { label: 'Late', value: 1 }
];

export default Settings;
