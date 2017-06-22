import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, AsyncStorage, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

class HomeBar extends Component {
    state = { greeting: null, name: null, section: null, width: null, aorp: null, hour: null, minute: null, currentDate: null, sizes: null, sizes2: null }
    componentWillMount() {
        this.setState({ width: Dimensions.get('window').width });
        this.getInfo();
    }

    componentDidMount() {
        this.clockUpdate();
    }

    clockUpdate() {
        setInterval(() => {
            const dd = new Date();
            this.setState({ hour: this.parseHour(dd.getHours()), minute: this.addZero(dd.getMinutes()) });
            if (dd.getHours() < 12) {
            this.setState({ greeting: 'It\'s a lovely morning,', aorp: 'am', section: require('../Images/morning.png') });
            }
            if (dd.getHours() >= 12 && dd.getHours() < 17) {
            this.setState({ greeting: 'It\'s a lovely afternoon,', aorp: 'pm', section: require('../Images/afternoon.png') });
            }
            if (dd.getHours() >= 17 && dd.getHours() < 21) {
            this.setState({ greeting: 'It\'s a lovely evening,', aorp: 'pm', section: require('../Images/evening.png') });
            }
            if (dd.getHours() >= 22) {
            this.setState({ greeting: 'It\'s a lovely night,', aorp: 'pm', section: require('../Images/night.png') });
        }
            }, 1000);
    }

    parseHour(i) {
        const times = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '8', '9', '10', '11'];
        return times[i];
    }
    addZero(p) {
        if (p < 10) {
            p = `0${p}`;
        }
        return p;
    }

    async getInfo() {
        this.setState({ name: await AsyncStorage.getItem('name') });
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date();
        const numbDay = d.getDay();
        const numbDate = d.getDate();
        const numbYear = d.getFullYear();
        const currentHour = d.getHours();
        const month = d.getMonth();
        if (currentHour < 12) {
            this.setState({ greeting: 'It\'s a lovely morning,', section: require('../Images/morning.png') });
        }
        if (currentHour >= 12 && currentHour < 17) {
            this.setState({ greeting: 'It\'s a lovely afternoon,', section: require('../Images/afternoon.png') });
        }
        if (currentHour >= 18 && currentHour < 21) {
            this.setState({ greeting: 'It\'s a lovely evening,', section: require('../Images/evening.png') });
        }
        if (currentHour >= 22) {
            this.setState({ greeting: 'It\'s a lovely night,', section: require('../Images/night.png') });
        }
        this.setState({ currentDate: `${weekday[numbDay]}, ${months[month]} ${numbDate}, ${numbYear}` });
    }
    render() {
        const { currentDate, greeting, name, width, sizes, hour, minute } = this.state;
        //console.log(aorp);
        //console.log(this.state.sizes);
        if (this.state.sizes !== null && hour !== null && minute !== null) {
            const finalsize = Math.trunc((width - sizes) / 2);
        return (
            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{greeting} { name }!</Text>
                    <Text style={{ fontSize: 25, fontFamily: 'Roboto-Thin' }}>It is { currentDate }</Text>
                </View>
                <View style={{ alignItems: 'flex-end', width: finalsize }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Settings()}>
                        <Image source={require('../Images/settings.png')} style={{ height: 80, width: 80, marginRight: 30 }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
    return (
        <View>
            <View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Loading</Text>
                </View>
            </View>
            <View style={{ opacity: 0 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width }); }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{greeting} { name }!</Text>
                    <Text style={{ fontSize: 25, fontFamily: 'Roboto-Thin' }}>It is { currentDate }</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Settings()}>
                        <Image source={require('../Images/settings.png')} style={{ height: 80, width: 80 }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            </View>
        </View>
    );
    }
}

export default HomeBar;
