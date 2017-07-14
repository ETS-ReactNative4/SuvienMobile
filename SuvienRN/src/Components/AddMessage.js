import React, { Component } from 'react';
import { View, Text, Picker, AsyncStorage, Dimensions, Platform, TouchableWithoutFeedback, Image, ScrollView, Modal } from 'react-native';
import { CardSection, Button, Input, Header, CheckBox } from './common';
import Languages from '../Languages/Languages.json';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';

class AddMessage extends Component {
    state = { secheight: null, secwidth: null, message: null, color: null, day: '[]', startHour: 0, modalVisible: false, delete: null, startMinute: 0, languages: null, endHour: 0, endMinute: 0, title: null, messages: null, messageType: null, isLaunchCam: false, deletedMessage: null, heightc: null, widthc: null, uri: null, cameraType: 'back', currentMessage: null }
    async componentWillMount() {
        if (Platform.OS === 'ios') {
            this.setState({ secheight: 200, secwidth: 100 });
        }
        if (Platform.OS === 'android') {
            this.setState({ secheight: 70, secwidth: 300 });
        }
        this.setState({ 
            heightc: Dimensions.get('window').height,
            widthc: Dimensions.get('window').width,
            messages: JSON.parse(await AsyncStorage.getItem('Messages')),
            languages: await AsyncStorage.getItem('Language'),
            color: await AsyncStorage.getItem('BGColour')
        });
    }

    async onSaveMessagePress() {
        const dd = new Date();
        const messages = JSON.parse(await AsyncStorage.getItem('Messages'));
        if (this.state.currentMessage === null) {
            const { message, day, startHour, startMinute, endHour, endMinute, messageType, uri, title } = this.state;
        if (messageType === 'Msg') {
            messages.push({
            day: JSON.parse(day),
            message,
            startHour,
            startMinute,
            endHour,
            endMinute,
            messageType,
            messageID: dd.getTime()
        }); 
        }
        if (messageType === 'VideoMsg') {
            messages.push({
            day: JSON.parse(day),
            message: title,
            startHour,
            startMinute,
            endHour,
            endMinute,
            uri,
            messageType,
            messageID: dd.getTime()
        });
        }
       AsyncStorage.setItem('Messages', JSON.stringify(messages));
       console.log(JSON.parse(await AsyncStorage.getItem('Messages')));
       Actions.Home();
        } 
        if (this.state.currentMessage !== null) {
            const selected = JSON.parse(this.state.currentMessage);
            const searc = messages.findIndex((element, index, array) => {
                if (element.messageID === selected.messageID) {
                    return true;
                } else {
                    return false;
                }});
            if (selected.messageType === 'Msg') {
                const { day, message, startHour, startMinute, endHour, endMinute, messageID } = selected;
            messages[searc] = {
                day,
                message,
                startHour,
                startMinute,
                endHour,
                endMinute,
                messageType: 'Msg',
                messageID
            };
            AsyncStorage.setItem('Messages', JSON.stringify(messages));
            console.log(JSON.parse(await AsyncStorage.getItem('Messages')));
            Actions.Home();
        }
            if (selected.messageType === 'VideoMsg') {
                const { day, message, uri, startHour, startMinute, endHour, endMinute, messageID } = selected;
            messages[searc] = {
                day,
                message,
                startHour,
                startMinute,
                endHour,
                endMinute,
                uri,
                messageType: 'VideoMsg',
                messageID
            };
            AsyncStorage.setItem('Messages', JSON.stringify(messages));
            console.log(JSON.parse(await AsyncStorage.getItem('Messages')));
            Actions.Home();
            }
        }
    }

    async createNew() {
        const dd = new Date();
        const messages = JSON.parse(await AsyncStorage.getItem('Messages'));
        if (this.state.currentMessage === null) {
            const { message, day, startHour, startMinute, endHour, endMinute, messageType, uri, title } = this.state;
        if (messageType === 'Msg') {
            messages.push({
            day: JSON.parse(day),
            message,
            startHour,
            startMinute,
            endHour,
            endMinute,
            messageType,
            messageID: dd.getTime()
        }); 
        }
        if (messageType === 'VideoMsg') {
            messages.push({
            day: JSON.parse(day),
            message: title,
            startHour,
            startMinute,
            endHour,
            endMinute,
            uri,
            messageType,
            messageID: dd.getTime()
        });
        }
       AsyncStorage.setItem('Messages', JSON.stringify(messages));
       console.log(JSON.parse(await AsyncStorage.getItem('Messages')));
       this.setState({ message: null, day: '[]', startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, title: null, messages: JSON.parse(await AsyncStorage.getItem('Messages')), messageType: null, isLaunchCam: false, deletedMessage: null, uri: null, cameraType: 'back', currentMessage: null });
        } 
        if (this.state.currentMessage !== null) {
            const selected = JSON.parse(this.state.currentMessage);
            const searc = messages.findIndex((element, index, array) => {
                if (element.messageID === selected.messageID) {
                    return true;
                } else {
                    return false;
                }});
            if (selected.messageType === 'Msg') {
                const { day, message, startHour, startMinute, endHour, endMinute, messageID } = selected;
            messages[searc] = {
                day,
                message,
                startHour,
                startMinute,
                endHour,
                endMinute,
                messageType: 'Msg',
                messageID
            };
            AsyncStorage.setItem('Messages', JSON.stringify(messages));
            console.log(JSON.parse(await AsyncStorage.getItem('Messages')));
            Actions.Home();
        }
            if (selected.messageType === 'VideoMsg') {
                const { day, message, uri, startHour, startMinute, endHour, endMinute, messageID } = selected;
            messages[searc] = {
                day,
                message,
                startHour,
                startMinute,
                endHour,
                endMinute,
                uri,
                messageType: 'VideoMsg',
                messageID
            };
            AsyncStorage.setItem('Messages', JSON.stringify(messages));
            console.log(JSON.parse(await AsyncStorage.getItem('Messages')));
            Actions.Home();
            }
        }
    }
    addZero(p) {
        if (p < 10) {
            p = `0${p}`;
        }
        return p;
    }

    renderMessageList() {
        if (this.state.messages !== null) {
            const currentmessages = this.state.messages;
            const allMessages = currentmessages.map((message) => {
                return (
                    <CardSection style={{ flexDirection: 'column', borderTopWidth: 1, borderBottomWidth: 0 }}>
                        <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontFamily: 'Roboto-Light', fontSize: 25, alignSelf: 'center' }}>{message.message} </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableWithoutFeedback 
                            onPress={() => {
                            this.setState({ messageType: message.messageType, currentMessage: JSON.stringify(message) });
                            }}
                            >
                            <Image source={require('../Images/infoicon.png')} style={{ height: 40, width: 40, alignSelf: 'center', marginLeft: 20, marginRight: 10 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback 
                            onPress={() => this.setState({ modalVisible: true, delete: message })
                                }
                        >
                                <Image source={require('../Images/delete.png')} style={{ height: 40, width: 40, alignSelf: 'center' }}/>
                            </TouchableWithoutFeedback>
                        </View>
                        </View>
                        <View>
                        <Text style={{ fontFamily: 'Roboto-Light', fontSize: 20 }}>
                            <Image source={require('../Images/calendar.png')} style={{ height: 20, width: 20, marginLeft: 10, marginRight: 5, alignSelf: 'center' }} />   {message.day.toString()} </Text>
                        <Text style={{ fontFamily: 'Roboto-Light', fontSize: 20 }}>
                            <Image source={require('../Images/clock.png')} style={{ height: 20, width: 20, marginLeft: 10, marginRight: 5, alignSelf: 'center' }} />   {message.startHour}:{this.addZero(message.startMinute)} - {message.endHour}:{this.addZero(message.endMinute)}</Text>
                        </View>
                    </CardSection>
                );
        }
        );
        return (
            [...allMessages]
        );
    } else {
        return (
            <View />
        );
    }
    }

    startRecording() {
    console.log('start rec');

    this.camera.capture()
      .then((data) => {
        console.log('capturing...');
        console.log(data);
        this.setState({ isLaunchCam: false, uri: data.path });
      });
  }

  stopRecording() {
    console.log('stop rec');
    this.camera.stopCapture();
  }

     onSwitchCameraPress() {
        if (this.state.cameraType === 'front') {
            this.setState({ cameraType: 'back' });
        }
        if (this.state.cameraType === 'back') {
            this.setState({ cameraType: 'front' });
        }
     }

    createPicker(array) {
            const allElements = [];
            let i;
            for (i = 0; i < array.length; i++) {
                allElements.push(
                    <Picker.Item label={array[i]} value={i} />
                );
            }
            return (
            [...allElements]
            );
        }
        render() {
        if (this.state.languages === null) {
            return (
                <View />
            );
        }
        if (this.state.languages !== null) {
            let j;
        const hours = [];
        for (j = 0; j < 24; j++) {
            if (j < 10) {
                hours.push(`0${j}`);
            } else {
                hours.push(`${j}`);
            }
        }
        let i;
        const minutes = [];
        for (i = 0; i < 60; i++) {
            if (i < 10) {
                minutes.push(`0${i}`);
            } else {
                minutes.push(`${i}`);
            }
        }
        if (this.state.isLaunchCam === false) {
            if (this.state.messageType === null) {
            return (
                <View style={{ flex: 1 }}>
                <Modal
                animationType={"fade"}
                transparent
                visible={this.state.modalVisible}
                onRequestClose={() => {}}
>
            <View style={{ backgroundColor: this.state.color, flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ height: 600, width: 800, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 30, fontFamily: 'Roboto-Light' }}>{Languages[this.state.languages]['114']}</Text>
                    <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                        <Button 
                        onPress={() => {
                            const messagess = this.state.messages;
                            const searc = this.state.messages.findIndex((element, index, array) => {
                                if (element.messageID === this.state.delete.messageID) {
                                    return true;
                                } else {
                                    return false;
                                }});
                                messagess.splice(searc, 1);
                                this.setState({ messages: messagess, modalVisible: false, delete: null });
                                AsyncStorage.setItem('Messages', JSON.stringify(messagess));
                                }
                                }
                        >
                    {Languages[this.state.languages]['096']}
                        </Button>
                    </CardSection>
                    <CardSection style={{ borderBottomWidth: 0, marginRight: 15 }}>
                        <Button 
                        onPress={() => this.setState({ modalVisible: false, delete: null })}
                        >
                    {Languages[this.state.languages]['097']}
                        </Button>
                    </CardSection>
                </View>
                </View>
                </Modal>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['087']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <ScrollView>
                <View>
                            <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 30 }}>
                                <Text style={{ fontSize: 30, fontFamily: 'UltimaPDac-UltraLight' }}>{Languages[this.state.languages]['072']}</Text>
                            </View>
                            <CardSection>
                                <Button onPress={() => this.setState({ messageType: 'Msg' })}>
                                    {Languages[this.state.languages]['073']}
                                </Button>
                            </CardSection>
                            <CardSection>
                                <Button onPress={() => this.setState({ messageType: 'VideoMsg' })}>
                                    {Languages[this.state.languages]['074']}
                                </Button>
                            </CardSection>
                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 30 }}>
                            <Text style={{ fontSize: 30, fontFamily: 'UltimaPDac-UltraLight' }}>{Languages[this.state.languages]['075']}</Text>
                        </View>
                        
                        <CardSection style={{ flexDirection: 'column' }}>
                            {this.renderMessageList()}
                        </CardSection>
                        </View>
                        </ScrollView>
            </View>
            );
        }
        if (this.state.messageType === 'Msg') {
            if (this.state.currentMessage === null) {
                return (
            <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['087']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <CardSection style={{ marginLeft: 0 }}>
                    <Input
                        placeholder={Languages[this.state.languages]['089']}
                        label={Languages[this.state.languages]['039']}
                        value={this.state.message}
                        onChangeText={(message) => this.setState({ message })}
                        labelstyle={{ marginLeft: 40 }}
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column', height: 70 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, marginBottom: 5 }}>{Languages[this.state.languages]['090']}</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[0]}
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[1]} 
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[2]}
                    value={null}  
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[3]}
                    value={null}  
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[4]}
                    value={null}  
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[5]}
                    value={null}  
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[6]}
                    value={null}  
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    </View>
                </CardSection>
                    <CardSection style={{ height: this.state.scheight, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>{Languages[this.state.languages]['091']}</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={this.state.startHour}
                    onValueChange={startHour => this.setState({ startHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={this.state.startMinute}
                    onValueChange={startMinute => this.setState({ startMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection style={{ height: this.state.secheight, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>{Languages[this.state.languages]['092']}</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={this.state.endHour}
                    onValueChange={endHour => this.setState({ endHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={this.state.endMinute}
                    onValueChange={endMinute => this.setState({ endMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveMessagePress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            {Languages[this.state.languages]['068']}
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
            </View>
        );
            }
            if (this.state.currentMessage !== null) {
                const selected = JSON.parse(this.state.currentMessage);
                console.log('im not null!');
                    return (
            <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['087']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <CardSection style={{ marginLeft: 0 }}>
                    <Input
                        placeholder={Languages[this.state.languages]['089']}
                        label={Languages[this.state.languages]['039']}
                        value={selected.message}
                        onChangeText={(message) => {
                            selected.message = message;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                        labelstyle={{ marginLeft: 40 }}
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column', height: 70 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, marginBottom: 5 }}>{Languages[this.state.languages]['090']}</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[0]} 
                    value={selected.day}
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[1]}
                    value={selected.day} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[2]}
                    value={selected.day} 
                   onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[3]} 
                    value={selected.day}
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[4]}
                    value={selected.day}
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[5]}
                    value={selected.day} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[6]}
                    value={selected.day} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    </View>
                </CardSection>
                    <CardSection style={{ height: this.state.secheight, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>{Languages[this.state.languages]['091']}</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={selected.startHour}
                    onValueChange={startHour => {
                        selected.startHour = startHour;
                        this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={selected.startMinute}
                    onValueChange={startMinute => {
                        selected.startMinute = startMinute;
                        this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection style={{ height: this.state.secheight, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>{Languages[this.state.languages]['092']}</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={selected.endHour}
                    onValueChange={endHour => {
                        selected.endHour = endHour;
                        this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={selected.endMinute}
                    onValueChange={endMinute => {
                        selected.endMinute = endMinute;
                        this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveMessagePress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            {Languages[this.state.languages]['068']}
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
            </View>
        );
        }
        }
        if (this.state.messageType === 'VideoMsg') {
            if (this.state.currentMessage !== null) {
                const selected = JSON.parse(this.state.currentMessage);
                return (
            <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['087']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <ScrollView>
                <View style={{ flex: 1 }}>
                <CardSection style={{ marginLeft: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{ uri: selected.uri }} style={{ height: 300, width: 400 }} />
                </CardSection>
                <CardSection style={{ marginLeft: 0 }}>
                    <Input
                        placeholder={Languages[this.state.languages]['093']}
                        label={Languages[this.state.languages]['058']}
                        value={selected.message}
                        onChangeText={(message) => {
                            selected.message = message;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                        labelstyle={{ marginLeft: 40 }}
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column', height: 70 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, marginBottom: 5 }}>{Languages[this.state.languages]['090']}</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[0]}
                    value={selected.day}
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[1]}
                    value={selected.day} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[2]}
                    value={selected.day} 
                   onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[3]} 
                    value={selected.day}
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[4]} 
                    value={selected.day}
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[5]}
                    value={selected.day} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[6]}
                    value={selected.day} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = selected.day;
                            current.push(day);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = selected.day;
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            selected.day = current;
                            this.setState({ currentMessage: JSON.stringify(selected) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    </View>
                </CardSection>
                    <CardSection style={{ height: this.state.secheight, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>{Languages[this.state.languages]['091']}</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={selected.startHour}
                    onValueChange={startHour => {
                        selected.startHour = startHour;
                        this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={selected.startMinute}
                    onValueChange={startMinute => {
                        selected.startMinute = startMinute;
                        this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection style={{ height: this.state.secheight, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>{Languages[this.state.languages]['092']}</Text>
                        <View style={{ flexDirection: 'row', height: 100 }}>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={selected.endHour}
                    onValueChange={endHour => {
                        selected.endHour = endHour;
                        this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={selected.endMinute}
                    onValueChange={endMinute => {
                        selected.endMinute = endMinute;
                        this.setState({ currentMessage: JSON.stringify(selected) });
                        }}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveMessagePress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            {Languages[this.state.languages]['068']}
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
                    </View>
                    </ScrollView>
            </View>
        );
            }
            if (this.state.currentMessage === null) {
                if (this.state.uri === null) {
                return (
            <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['087']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
                <CardSection style={{ marginLeft: 0 }}>
                    <Button onPress={() => this.setState({ isLaunchCam: true })}>
                        {Languages[this.state.languages]['050']}
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => this.setState({ messageType: null })}>
                            {Languages[this.state.languages]['070']}
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                    </Button>
                </CardSection>
            </View>
        );
            }
            if (this.state.uri !== null) {
                return (
            <View>
                <Header style={{ height: 60, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../Images/placeholderphoto.png')} style={{ marginLeft: 30, height: 40, width: 120 }} />
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 27, fontFamily: 'Roboto-Thin' }}>{Languages[this.state.languages]['087']}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                    <Image source={require('../Images/homeheader.png')} style={{ height: 50, width: 50, alignSelf: 'flex-end', marginRight: 20 }} />
                    </TouchableWithoutFeedback>
                </View>
            </Header>
            <ScrollView>
                <View style={{ flex: 1 }}>
                <CardSection style={{ marginLeft: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={{ uri: this.state.uri }} style={{ height: 300, width: 400 }} />
                </CardSection>
                <CardSection style={{ marginLeft: 0 }}>
                    <Input
                        placeholder={Languages[this.state.languages]['093']}
                        label={Languages[this.state.languages]['058']}
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        labelstyle={{ marginLeft: 40 }}
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column', height: 70 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, marginBottom: 5 }}>{Languages[this.state.languages]['090']}</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[0]}
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[1]}
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[2]}
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[3]}
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[4]}
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[5]}
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    <CheckBox 
                    label={(Languages[this.state.languages]['012'])[6]}
                    value={null} 
                    onChangeItem={(day) => {
                        if ((day.substr(day.length - 1)) !== '*') {
                            const current = JSON.parse(this.state.day);
                            current.push(day);
                            this.setState({ day: JSON.stringify(current) });
                        }
                        if ((day.substr(day.length - 1)) === '*') {
                            const current = JSON.parse(this.state.day);
                            const indexi = current.indexOf((day.slice(0, -1)));
                            current.splice(indexi, 1);
                            this.setState({ day: JSON.stringify(current) });
                            //this.setState({ day: this.state.day.splice(this.state.day.indexOf(day), 1) });
                        }
                        }}
                    />
                    </View>
                </CardSection>
                    <CardSection style={{ height: this.state.secheight, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>{Languages[this.state.languages]['091']}</Text>
                        <View style={{ flexDirection: 'row', height: 100 }}>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={this.state.startHour}
                    onValueChange={startHour => this.setState({ startHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={this.state.startMinute}
                    onValueChange={startMinute => this.setState({ startMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection style={{ height: this.state.secheight, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>{Languages[this.state.languages]['092']}</Text>
                        <View style={{ flexDirection: 'row', height: 100 }}>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={this.state.endHour}
                    onValueChange={endHour => this.setState({ endHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ width: this.state.secwidth }}
                    selectedValue={this.state.endMinute}
                    onValueChange={endMinute => this.setState({ endMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10 }}>
                        <Button onPress={this.onSaveMessagePress.bind(this)}>
                            {Languages[this.state.languages]['067']}
                            <Image source={require('../Images/saveicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={this.createNew.bind(this)}>
                            {Languages[this.state.languages]['068']}
                            <Image source={require('../Images/infoicon.png')} style={{ height: 30, width: 30 }} />
                        </Button>
                        <Button onPress={() => Actions.Settings()}>
                            {Languages[this.state.languages]['069']}
                        </Button>
                    </View>
                    </View>
                    </ScrollView>
            </View>
        );
            }
        }
            }
    }
         if (this.state.isLaunchCam === true) {
        return (
                <View style={styles.container}>
                    <Camera
                    ref={(cam) => {
                    this.camera = cam;
                    }}
                    style={styles.preview}
                    playSoundOnCapture={false}
                    aspect={Camera.constants.Aspect.fill}
                    captureMode={Camera.constants.CaptureMode.video}
                    onFocusChanged={() => {}}
                    onZoomChanged={() => {}}
                    type={this.state.cameraType}
                    >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', width: this.state.widthc, height: this.state.heightc }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', width: 150, height: this.state.heightc }}>
                            <TouchableWithoutFeedback onPress={this.startRecording.bind(this)}>
                                <Image source={require('../Images/startrecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.stopRecording.bind(this)}>
                                <Image source={require('../Images/stoprecording.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.onSwitchCameraPress.bind(this)}>
                                <Image source={require('../Images/switchcamera.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => Actions.Home()}>
                                <Image source={require('../Images/home.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                        </View>
                </View>
        </Camera>
      </View>
    );
}
    }
        }
        }

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
};

export { AddMessage };
