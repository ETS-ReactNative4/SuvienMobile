import React, { Component } from 'react';
import { View, AsyncStorage, Text, Dimensions, Image, ScrollView } from 'react-native';
import { Header, Card, PictureTile } from './common';

class Home extends Component {
    state = { currentDate: null, greeting: null, name: null, width: null, dim: null }
    componentWillMount() {
        this.setState({ width: Dimensions.get('window').width });
        this.getInfo();
    }

    componentDidMount() {
        this.renderTiles();
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
            this.setState({ greeting: 'It\'s a lovely morning,' });
        }
        if (currentHour >= 12 && currentHour < 17) {
            this.setState({ greeting: 'It\'s a lovely afternoon,' });
        }
        if (currentHour >= 18 && currentHour < 21) {
            this.setState({ greeting: 'It\'s a lovely evening,' });
        }
        if (currentHour >= 22) {
            this.setState({ greeting: 'It\'s a lovely night,' });
        }
        this.setState({ currentDate: `${weekday[numbDay]}, ${months[month]} ${numbDate}, ${numbYear}` });
    }
    renderTiles() {
        const ourWidth = this.state.width;
        const pictureDim = Math.trunc(((ourWidth - 55) / 4));
        this.setState({ dim: pictureDim });
    }
    render() {
        const { currentDate, greeting, name } = this.state;
        return (
            <View>
                <Header>
                    <Text style={{ fontSize: 27, fontFamily: 'ClementePDag-Book' }}>{greeting} { name }!</Text>
                    <Text style={{ fontSize: 25, fontFamily: 'ClementePDag-Book' }}>It is { currentDate }</Text>
                </Header>
                <ScrollView>
                    <View style={{ marginLeft: 15, flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                        <Image source={require('../Images/nocontent.jpg')} style={{ marginLeft: 5, height: this.state.dim, width: this.state.dim }} />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export { Home };
