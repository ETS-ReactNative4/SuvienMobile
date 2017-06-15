import React, { Component } from 'react';
import { Text } from 'react-native';

class TimerTest extends Component {
    componentDidMount() {
        setInterval(() => console.log('Weeeeee!'), 1000);
    }

    render() {
        return (
            <Text>Idk</Text>
        );
    }
}

export default TimerTest;
