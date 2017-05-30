import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection, Input } from './common';


class Settings extends Component {
    render() {
        return (
            <View style={{ marginTop: 60 }}>
                <CardSection>
                    <Text style={{ fontSize: 30, alignSelf: 'center' }}>Edit Information</Text>
                    <Input
                    placeholder="Lance McClain"
                    label="Name"
                    />
                </CardSection>
            </View>
        );
    }
}

export default Settings;
