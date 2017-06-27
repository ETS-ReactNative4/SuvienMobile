import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';

class HomeBar extends Component {
    state = { greeting: null, name: null, section: null, width: null, aorp: null, hour: null, minute: null, currentDate: null, sizes: null, sizes2: null, dayFilter: null, messages: null, icon: false, messageType: null }
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
            if (this.state.dayFilter !== null) {
                const finalmessage = this.state.dayFilter.filter((day) => (day.startHour <= dd.getHours() && day.startMinute <= dd.getMinutes() && day.endHour >= dd.getHours() && day.endMinute > dd.getMinutes())); 
                //console.log(finalmessage.length);
                if ((finalmessage !== undefined && finalmessage.length !== 0) && dd.getHours() < 12) {
                    if (dd.getMinutes() === finalmessage[0].startMinute) {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'am', section: require('../Images/morning.png'), icon: true, messageType: finalmessage[0].messageType });
                    } else {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'am', section: require('../Images/morning.png'), icon: false, messageType: finalmessage[0].messageType });
                    }
                }
                if ((finalmessage !== undefined && finalmessage.length !== 0) && (dd.getHours() >= 12 && dd.getHours() < 17)) {
                    if (dd.getMinutes() === finalmessage[0].startMinute) {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/afternoon.png'), icon: true, messageType: finalmessage[0].messageType });
                    } else {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/afternoon.png'), icon: false, messageType: finalmessage[0].messageType });
                    }
                } 
                if (finalmessage !== undefined && (dd.getHours() >= 17 && dd.getHours() < 21)) {
                    if (dd.getMinutes() === finalmessage[0].startMinute) {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/evening.png'), icon: true, messageType: finalmessage[0].messageType });
                    } else {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/evening.png'), icon: false, messageType: finalmessage[0].messageType });
                    }
                }
                if (finalmessage !== undefined && (dd.getHours() >= 22)) {
                    if (dd.getMinutes() === finalmessage[0].startMinute) {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/night.png'), icon: true, messageType: finalmessage[0].messageType });
                    } else {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/night.png'), icon: false, messageType: finalmessage[0].messageType });
                    }
                }
                if (finalmessage === undefined || finalmessage.length === 0) {
                    if (dd.getHours() < 12) {
                        this.setState({ greeting: `It's a lovely morning, ${this.state.name}!`, aorp: 'am', section: require('../Images/morning.png'), icon: false });
                        }
                    if (dd.getHours() >= 12 && dd.getHours() < 17) {
            this.setState({ greeting: `It's a lovely afternoon, ${this.state.name}!`, aorp: 'pm', section: require('../Images/afternoon.png'), icon: false });
            }
            if (dd.getHours() >= 17 && dd.getHours() < 21) {
            this.setState({ greeting: `It's a lovely evening, ${this.state.name}!`, aorp: 'pm', section: require('../Images/evening.png'), icon: false });
            }
            if (dd.getHours() >= 22) {
            this.setState({ greeting: `It's a lovely night, ${this.state.name}!`, aorp: 'pm', section: require('../Images/night.png'), icon: false });
        }
                }
            }
            if (this.state.dayFilter === null) {
            if (dd.getHours() < 12) {
            this.setState({ greeting: `It's a lovely morning, ${this.state.name}!`, aorp: 'am', section: require('../Images/morning.png'), icon: false });
            }
            if (dd.getHours() >= 12 && dd.getHours() < 17) {
            this.setState({ greeting: `It's a lovely afternoon, ${this.state.name}!`, aorp: 'pm', section: require('../Images/afternoon.png'), icon: false });
            }
            if (dd.getHours() >= 17 && dd.getHours() < 21) {
            this.setState({ greeting: `It's a lovely evening, ${this.state.name}!`, aorp: 'pm', section: require('../Images/evening.png'), icon: false });
            }
            if (dd.getHours() >= 22) {
            this.setState({ greeting: `It's a lovely night, ${this.state.name}!`, aorp: 'pm', section: require('../Images/night.png'), icon: false });
        }
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
        const messages = JSON.parse(await AsyncStorage.getItem('Messages'));
        console.log(messages);
        this.setState({ name: await AsyncStorage.getItem('name'), messages });
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date();
        const numbDay = d.getDay();
        const numbDate = d.getDate();
        const numbYear = d.getFullYear();
        const currentHour = d.getHours();
        const month = d.getMonth();
        const dayFilter = messages.filter((message) => message.day.find((da) => da === weekday[numbDay]) !== undefined);
        this.setState({ name: await AsyncStorage.getItem('name'), messages, dayFilter });
        if (currentHour < 12) {
            this.setState({ greeting: `It's a lovely morning, ${this.state.name}!`, section: require('../Images/morning.png'), icon: false });
        }
        if (currentHour >= 12 && currentHour < 17) {
            this.setState({ greeting: `It's a lovely afternoon, ${this.state.name}!`, section: require('../Images/afternoon.png'), icon: false });
        }
        if (currentHour >= 18 && currentHour < 21) {
            this.setState({ greeting: `It's a lovely evening, ${this.state.name}!`, section: require('../Images/evening.png'), icon: false });
        }
        if (currentHour >= 22) {
            this.setState({ greeting: `It's a lovely night, ${this.state.name}!`, section: require('../Images/night.png'), icon: false });
        }
        this.setState({ currentDate: `${weekday[numbDay]}, ${months[month]} ${numbDate}, ${numbYear}` });
    }
    render() {
        const { currentDate, greeting, width, sizes, hour, minute } = this.state;
        //console.log(aorp);
        //console.log(this.state.sizes);
        if (this.state.sizes !== null && hour !== null && minute !== null) {
            if (this.state.icon === false) {
                const finalsize = Math.trunc((width - sizes) / 2);
                if (this.state.messageType === 'Msg' || this.state.messageType === null) {
                    return (
            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{greeting}</Text>
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
                if (this.state.messageType === 'VideoMsg') {
                    const dd = new Date();
                    const finalmessage = this.state.dayFilter.filter((day) => (day.startHour <= dd.getHours() && day.startMinute <= dd.getMinutes() && day.endHour >= dd.getHours() && day.endMinute > dd.getMinutes()));
                    return (
            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>There is a new video message. </Text>
                        <TouchableOpacity 
                        onPress={() => {
                        AsyncStorage.setItem('currentVideoMsg', finalmessage[0].uri);
                        console.log(AsyncStorage.getItem('currentVideoMsg'));
                        Actions.VideoTest(); 
                        }}
                        >
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Click me to watch!</Text>
                        </TouchableOpacity>
                    </View>
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
        
            }
            if (this.state.icon === true && this.state.messageType === 'Msg') {
                const finalsize = Math.trunc((width - sizes) / 2);
        return (
            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{greeting}
                        <Image source={require('../Images/messagealert.png')} style={{ marginLeft: 10, height: 40, width: 40 }} />
                    </Text>
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
            if (this.state.icon === true && this.state.messageType === 'VideoMsg') {
                const finalsize = Math.trunc((width - sizes) / 2);
               const dd = new Date();
                    const finalmessage = this.state.dayFilter.filter((day) => (day.startHour <= dd.getHours() && day.startMinute <= dd.getMinutes() && day.endHour >= dd.getHours() && day.endMinute > dd.getMinutes()));
                    return (
            <View style={{ flexDirection: 'row', paddingTop: 15 }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>There is a new video message. </Text>
                        <TouchableOpacity 
                        onPress={() => {
                        AsyncStorage.setItem('currentVideoMsg', finalmessage[0].uri);
                        console.log(AsyncStorage.getItem('currentVideoMsg'));
                        Actions.VideoTest(); 
                        }}
                        >
                        <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>Click me to watch!</Text>
                        </TouchableOpacity>
                        <Image source={require('../Images/messagealert.png')} style={{ marginLeft: 10, height: 40, width: 40 }} />
                    </View>
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
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{greeting}</Text>
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
