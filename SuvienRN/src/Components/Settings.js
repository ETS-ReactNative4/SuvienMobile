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
                    <Text style={styles.radioTextStyle}>Stage</Text>
                    <RadioForm
                        radio_props={radioProps}
                        initial={0}
                        style={{ flex: 6 }}
                        buttonColor={'#4A86E8'}
                        onPress={((label) => { console.log(label); })}
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

const styles = {
    radioTextStyle: {
        fontSize: 20,
        marginLeft: 100,
        flex: 1,
        alignSelf: 'center'
    }
};
export default Settings;
