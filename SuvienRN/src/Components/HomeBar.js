import React, { Component } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import Languages from '../Languages/Languages.json';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';

class HomeBar extends Component {
    state = { greeting: null, name: null, languages: null, section: null, width: null, aorp: null, hour: null, minute: null, currentDate: null, preferences: null, sizes: null, sizes2: null, dayFilter: null, messages: null, icon: null, messageType: null, color: null, admode: 0 }
    async componentWillMount() {
        this.setState({ width: Dimensions.get('window').width, preferences: JSON.parse(await AsyncStorage.getItem('Preferences')), languages: await AsyncStorage.getItem('Language') });
        this.getInfo();
    }

    async componentDidMount() {
        this.setState({ languages: await AsyncStorage.getItem('Language') });
        this.clockUpdate();
        this.flashTitle();
    }

    flashTitle() {
        setInterval(() => {
            if (this.state.icon === true) {
                if (this.state.color === null) {
                    this.setState({ color: '#86a6e0' });
                }
                if (this.state.color === '#86a6e0') {
                    setTimeout(() => this.setState({ color: null }), 1000);
                }
            if (this.state.icon === false || this.state.icon === null) {
                this.setState({ color: null });
            }
            }
        }, 2000);
    }
    clockUpdate() {
        setInterval(() => {
            const dd = new Date();
            this.setState({ hour: this.parseHour(dd.getHours()), minute: this.addZero(dd.getMinutes()) });
            if (this.state.dayFilter !== null && this.state.dayFilter.length !== 0) {
                const finalmessage = this.state.dayFilter.filter((day) => (day.startHour <= dd.getHours() && day.startMinute <= dd.getMinutes() && day.endHour >= dd.getHours() && day.endMinute > dd.getMinutes())); 
                if ((finalmessage !== undefined && finalmessage.length !== 0) && dd.getHours() < 12) { //this works on the time and after
                    if (dd.getMinutes() === finalmessage[0].startMinute && dd.getSeconds() <= 6) {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'am', section: require('../Images/morning.png'), icon: true, messageType: finalmessage[0].messageType });
                    } else {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'am', section: require('../Images/morning.png'), icon: false, messageType: finalmessage[0].messageType });
                    }
                }
                if ((finalmessage !== undefined && finalmessage.length !== 0) && (dd.getHours() >= 12 && dd.getHours() < 17)) { //this works on time and after
                    if (dd.getMinutes() === finalmessage[0].startMinute && dd.getSeconds() <= 6) {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/afternoon.png'), icon: true, messageType: finalmessage[0].messageType });
                    } else {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/afternoon.png'), icon: false, messageType: finalmessage[0].messageType });
                    }
                } 
                if ((finalmessage !== undefined && finalmessage.length !== 0) && (dd.getHours() >= 17 && dd.getHours() < 21)) { //this works on time and after
                    if (dd.getMinutes() === finalmessage[0].startMinute && dd.getSeconds() <= 6) {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/evening.png'), icon: true, messageType: finalmessage[0].messageType });
                    } else {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/evening.png'), icon: false, messageType: finalmessage[0].messageType });
                    }
                }
                if ((finalmessage !== undefined && finalmessage.length !== 0) && (dd.getHours() >= 21)) { //this works on time and after
                    if (dd.getMinutes() === finalmessage[0].startMinute && dd.getSeconds() <= 6) {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/night.png'), icon: true, messageType: finalmessage[0].messageType });
                    } else {
                        this.setState({ greeting: finalmessage[0].message, aorp: 'pm', section: require('../Images/night.png'), icon: false, messageType: finalmessage[0].messageType });
                    }
                }
                if (finalmessage === undefined || finalmessage.length === 0) {
                    if (dd.getHours() < 12) {
                        const { languages } = this.state;
                        this.setState({ greeting: `${Languages[this.state.languages]['007']}, ${this.state.name}!`, aorp: 'am', section: require('../Images/morning.png'), messageType: null });
                    }
                    const { languages } = this.state;
                    if (dd.getHours() >= 12 && dd.getHours() < 17) {
            this.setState({ greeting: `${Languages[this.state.languages]['008']}, ${this.state.name}!`, aorp: 'pm', section: require('../Images/afternoon.png'), messageType: null });
            }
            if (dd.getHours() >= 17 && dd.getHours() < 21) {
            this.setState({ greeting: `${Languages[this.state.languages]['009']}, ${this.state.name}!`, aorp: 'pm', section: require('../Images/evening.png'), messageType: null });
            }
            if (dd.getHours() >= 21) {
            this.setState({ greeting: `${Languages[this.state.languages]['010']}, ${this.state.name}!`, aorp: 'pm', section: require('../Images/night.png'), messageType: null });
        }
                }
            }
            if (this.state.dayFilter === null || this.state.dayFilter.length === 0) {
                const { languages } = this.state;
            if (dd.getHours() < 12) {
            this.setState({ greeting: `${Languages[this.state.languages]['007']}, ${this.state.name}!`, aorp: 'am', section: require('../Images/morning.png'), icon: false });
            }
            if (dd.getHours() >= 12 && dd.getHours() < 17) {
            this.setState({ greeting: `${Languages[this.state.languages]['008']}, ${this.state.name}!`, aorp: 'pm', section: require('../Images/afternoon.png'), icon: false });
            }
            if (dd.getHours() >= 17 && dd.getHours() < 21) {
            this.setState({ greeting: `${Languages[this.state.languages]['009']}, ${this.state.name}!`, aorp: 'pm', section: require('../Images/evening.png'), icon: false });
            }
            if (dd.getHours() >= 21) {
            this.setState({ greeting: `${Languages[this.state.languages]['010']}, ${this.state.name}!`, aorp: 'pm', section: require('../Images/night.png'), icon: false });
        }
            }
            }, 1000);
    }

    parseHour(i) {
        const times = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
        return times[i];
    }
    addZero(p) {
        if (p < 10) {
            p = `0${p}`;
        }
        return p;
    }

    renderHeaderClock() {
        const { width, sizes, preferences, languages } = this.state;
        
        if (this.state.preferences[(Languages[this.state.languages]['029'])[4]] === true) {
            const finalsize = Math.trunc((width - sizes) / 2);
            if (preferences[Languages[languages]['030']] === false) {
                return (
                    <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                        if (this.state.admode < 3) {
                            const myadmin = this.state.admode + 1;
                            this.setState({ admode: myadmin });
                        } else {
                            Actions.Settings();
                        }
                        }}
                    >
                        <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                    </TouchableWithoutFeedback>
                    </View>
                );
            }
            if (preferences[Languages[languages]['030']] === true) {
                return (
                    <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <TouchableWithoutFeedback
                        onPress={() => {
                        if (this.state.admode < 3) {
                            const myadmin = this.state.admode + 1;
                            this.setState({ admode: myadmin });
                        } else {
                            Actions.Settings();
                        }
                        }}
                        >
                        <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                        </TouchableWithoutFeedback>
                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                    </View>
                );
            }
        }
        if (this.state.preferences[(Languages[this.state.languages]['029'])[4]] === false) {
            const finalsize = Math.trunc((width - sizes) / 2);
            if (preferences[Languages[languages]['030']] === false) {
                return (
                    <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }} />
                );
            }
            if (preferences[Languages[languages]['030']] === true) {
                return (
                    <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                        <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                    </View>
                );
            }
        }
        /*
        const proparray = ['Display Clock', 'Display Greeting', 'Display Date'];
        const truearray = [<View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Thin', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                </View>,
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{ greeting }</Text>,
                <Text style={{ fontSize: 25, fontFamily: 'Roboto-Thin' }}>It is { currentDate }</Text>
                </View>
                ];
        const falsearray = [<View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }} />,
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>,
                </View>
                ];
        for (let i = 0; i < 3; i++) {
            if (preferences[proparray[i]] === true) {
                authArray.push(truearray[i]);
            }
            if (preferences[proparray[i]] === false) {
                authArray.push(falsearray[i]);
            }
        }*/
    }
    renderHeaderGreeting() {
        const { greeting, currentDate, preferences, languages } = this.state;
        const dd = new Date();
        const finalmessage = this.state.dayFilter.filter((day) => (day.startHour <= dd.getHours() && day.startMinute <= dd.getMinutes() && day.endHour >= dd.getHours() && day.endMinute > dd.getMinutes()));
        const authArray = [];
        const proparray = [Languages[languages]['031'], (Languages[languages]['029'])[0]];
        const truearray = [
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', color: this.state.color }}>{ greeting }</Text>,
                <Text style={{ fontSize: 25, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['011']} { currentDate }</Text>
                ];
        const messagearray = [<View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity 
                            onPress={() => {
                            AsyncStorage.setItem('currentVideoMsg', finalmessage[0].uri);
                            //console.log(AsyncStorage.getItem('currentVideoMsg'));
                            Actions.VideoTest(); 
                            }}
                            >
                            <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin', color: this.state.color }}>{Languages[this.state.languages]['015']}</Text>
                            </TouchableOpacity>
                            </View>, <Text style={{ fontSize: 25, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['011']} { currentDate }</Text>
                            ];
        if (preferences[Languages[languages]['031']] === false && preferences[(Languages[languages]['029'])[0]] === false) {
            authArray.push(<Image source={require('../Images/placeholderphoto.png')} style={{ height: 70, width: 200 }} />);
        } else {
            if (this.state.messageType === 'VideoMsg') {
                for (let i = 0; i < 3; i++) {
                    if (preferences[proparray[i]] === true) {
                        authArray.push(messagearray[i]);
                    }
                    if (preferences[proparray[i]] === false) {
                        authArray.push(<View />);
                    }
                }   
            } else {
                for (let i = 0; i < 3; i++) {
                    if (preferences[proparray[i]] === true) {
                        authArray.push(truearray[i]);
                    }
                    if (preferences[proparray[i]] === false) {
                        authArray.push(<View />);
                    }
                }
            }
        }
        return (
            [...authArray]
        );
    }

    async getInfo() {
        const { languages } = this.state;
        const messages = JSON.parse(await AsyncStorage.getItem('Messages'));
        this.setState({ name: await AsyncStorage.getItem('name'), messages });
        const weekday = Languages[languages]['012'];
        const months = Languages[languages]['013'];
        const d = new Date();
        const numbDay = d.getDay();
        const numbDate = d.getDate();
        const numbYear = d.getFullYear();
        const currentHour = d.getHours();
        const month = d.getMonth();
        const dayFilter = messages.filter((message) => message.day.find((da) => da === weekday[numbDay]) !== undefined);
        console.log(dayFilter);
        if (dayFilter.length === 0) {
            console.log(currentHour);
            if (currentHour < 12) {
                this.setState({ greeting: `${Languages[this.state.languages]['007']}, ${this.state.name}!`, section: require('../Images/morning.png'), aorp: 'am' });
            }
            if (currentHour >= 12 && currentHour < 17) {
                this.setState({ greeting: `${Languages[this.state.languages]['008']}, ${this.state.name}!`, section: require('../Images/afternoon.png'), aorp: 'pm' });
            }
            if (currentHour >= 18 && currentHour < 21) {
                this.setState({ greeting: `${Languages[this.state.languages]['009']}, ${this.state.name}!`, section: require('../Images/evening.png'), aorp: 'pm' });
            }
            if (currentHour >= 21) {
                console.log('Immmmm herreee!');
                this.setState({ greeting: `${Languages[this.state.languages]['010']}, ${this.state.name}!`, section: require('../Images/night.png'), aorp: 'pm' });
            }
        }
        this.setState({ name: await AsyncStorage.getItem('name'), messages, dayFilter });
        if (this.state.languages === 'FRE') {
            this.setState({ currentDate: `${weekday[numbDay]}, le ${numbDate} ${months[month]} ${numbYear}` });
        }
        if (this.state.languages === 'ENG') {
            this.setState({ currentDate: `${weekday[numbDay]}, ${months[month]} ${numbDate}, ${numbYear}` });
        }
        if (this.state.languages === 'ESP') {
            this.setState({ currentDate: `${weekday[numbDay]}, ${numbDate} ${months[month]} de ${numbYear}` });
        }
    }
    render() {
        const { currentDate, greeting, width, sizes, hour, minute } = this.state;
        if (greeting !== null) {
            const last = greeting.slice(-6);
        }
        //console.log(aorp);
        //console.log(this.state.sizes);
        if (this.state.sizes !== null && hour !== null && minute !== null && currentDate !== null && (greeting !== null && greeting.slice(-6) !== ' null!') && this.state.languages !== null && this.state.preferences !== null) {
            if (this.state.preferences[(Languages[this.state.languages]['029'])[4]] === true) {
                const finalsize = Math.trunc((width - sizes) / 2);
                if (this.state.messageType === null) {
                    return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    {this.renderHeaderClock()}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    {this.renderHeaderGreeting()}
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: finalsize, flexDirection: 'row' }} />
            </View>
        ); 
                }
                if (this.state.messageType === 'Msg') {
                    return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    {this.renderHeaderClock()}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    {this.renderHeaderGreeting()}
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: finalsize, flexDirection: 'row' }} />
            </View>
        );
                }
                if (this.state.messageType === 'VideoMsg') {
                    const dd = new Date();
                    const finalmessage = this.state.dayFilter.filter((day) => (day.startHour <= dd.getHours() && day.startMinute <= dd.getMinutes() && day.endHour >= dd.getHours() && day.endMinute > dd.getMinutes()));
                    return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    {this.renderHeaderClock()}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    {this.renderHeaderGreeting()}
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: finalsize, flexDirection: 'row' }} />
            </View>
        );
                }
            }
            if (this.state.preferences[(Languages[this.state.languages]['029'])[4]] === false) {
                const finalsize = Math.trunc((width - sizes) / 2);
                if (this.state.messageType === null) {
                    return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    {this.renderHeaderClock()}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    {this.renderHeaderGreeting()}
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: finalsize, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => Actions.MainMenu()}>
                        <Image source={require('../Images/mainmenu.png')} style={{ height: 70, width: 70, marginRight: 30 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Actions.Settings()}>
                        <Image source={require('../Images/settings.png')} style={{ height: 80, width: 80, marginRight: 30 }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        ); 
                }
                if (this.state.messageType === 'Msg') {
                    return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    {this.renderHeaderClock()}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    {this.renderHeaderGreeting()}
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: finalsize, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => Actions.MainMenu()}>
                        <Image source={require('../Images/mainmenu.png')} style={{ height: 70, width: 70, marginRight: 30 }} />
                    </TouchableWithoutFeedback>
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
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                    {this.renderHeaderClock()}
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width, sizes2: event.nativeEvent.layout.height }); }}>
                    {this.renderHeaderGreeting()}
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: finalsize, flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => Actions.MainMenu()}>
                        <Image source={require('../Images/mainmenu.png')} style={{ height: 70, width: 70, marginRight: 30 }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Actions.Settings()}>
                        <Image source={require('../Images/settings.png')} style={{ height: 80, width: 80, marginRight: 30 }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
                }
            }
            }
    return (
        <View>
            <View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginTop: 60 }}>...</Text>
                </View>
            </View>
            <View style={{ opacity: 0 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width }); }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{greeting}</Text>
                    <Text style={{ fontSize: 25, fontFamily: 'Roboto-Thin' }}> { currentDate }</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableWithoutFeedback onPress={() => Actions.MainMenu()}>
                        <Image source={require('../Images/mainmenu.png')} style={{ height: 70, width: 70, marginRight: 30 }} />
                    </TouchableWithoutFeedback>
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
