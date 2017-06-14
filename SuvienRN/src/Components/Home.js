import React, { Component } from 'react';
import { View, AsyncStorage, Text, Dimensions, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Header, Card, PictureTile } from './common';

class Home extends Component {
    state = { currentDate: null, greeting: null, name: null, width: null, dim: null, sizes: null, hour: null, minute: null, aorp: null, section: null, temp: null }
    async componentWillMount() {
        this.setState({ width: Dimensions.get('window').width });
        this.getInfo();
    }

    componentDidMount() {
        this.clockUpdate();
        this.doMath();
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
            if (dd.getHours() >= 18 && dd.getHours() < 21) {
            this.setState({ greeting: 'It\'s a lovely evening,', section: require('../Images/evening.png') });
            }
            if (dd.getHours() >= 22) {
            this.setState({ greeting: 'It\'s a lovely night,', section: require('../Images/night.png') });
            }
            }, 1000);
    }

    doMath() {
        const ourWidth = this.state.width;
        const pictureDim = Math.trunc(((ourWidth - 55) / 4));
        this.setState({ dim: pictureDim });
    }

    async getData() {
        this.setState({ temp: await AsyncStorage.getItem('temp') });
    }
    renderTiles() {
        this.getData();
        const allTiles = [];
        let i;
        for (i = 0; i < 8; i++) {
            allTiles.push(
                <PictureTile onPress={() => Actions.MediaExplorer()} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} data={this.state.temp} unique={i} />
            );
        }
        return (
            [...allTiles]
        );
        }

    render() {
        const { currentDate, greeting, name, width, sizes } = this.state;
        if (this.state.sizes !== null) {
            const finalsize = Math.trunc((width - sizes) / 2);
            //console.log(finalsize);
            return (
            <View>
                <Header>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: finalsize, alignItems: 'center', justifyContent: 'flex-start', marginLeft: 60, flexDirection: 'row' }}>
                            <Image source={this.state.section} style={{ height: 80, width: 80 }} />
                            <Text style={{ fontSize: 30, fontFamily: 'ClementePDag-Book', marginLeft: 10 }}>{this.state.hour}:{this.state.minute} {this.state.aorp}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: finalsize }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width });}}>
                            <Text style={{ fontSize: 27, fontFamily: 'ClementePDag-Book' }}>{greeting} { name }!</Text>
                            <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book' }}>It is { currentDate }</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', flex: finalsize }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Settings()}>
                                <Image source={require('../Images/settings.png')} style={{ height: 80, width: 80 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Header>
                <ScrollView>
                    <View style={{ marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.renderTiles()}
                    </View>
                </ScrollView>
            </View>
        );
    } 
        return (
            <View>
                <Header>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => { this.setState({ sizes: event.nativeEvent.layout.width });}}>
                            <Text style={{ fontSize: 27, fontFamily: 'ClementePDag-Book' }}>{greeting} { name }!</Text>
                            <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book' }}>It is { currentDate }</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableWithoutFeedback onPress={() => Actions.Settings()}>
                                <Image source={require('../Images/settings.png')} style={{ height: 80, width: 80 }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </Header>
                <ScrollView>
                    <View style={{ marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {this.renderTiles()}
                    </View>
                </ScrollView>
            </View>
        );
    
    }
}

export { Home };
