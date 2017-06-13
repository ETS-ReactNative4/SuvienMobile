import React, { Component } from 'react';
import { View } from 'react-native';
import { CardSection, Button, Input } from './';

const Tagger = (props) => {
    return (
        <View>
            <CardSection>
                <Input
                placeholder="Family vacation to Hawaii"
                label="Caption"
                value={this.state.caption}
                onChangeText={(caption) => this.setState({ caption })}
                />
            </CardSection>
            <CardSection>
                <Input
                placeholder="SummerVacation2017"
                label="Tag"
                value={this.state.group}
                onChangeText={(group) => this.setState({ group })}
                />
            </CardSection>
            <CardSection>
                <Button onPress={this.onSaveItemPress.bind(this)}>
                    Save and Continue
                </Button>
            </CardSection>
        </View>
    );
}

export { Tagger };