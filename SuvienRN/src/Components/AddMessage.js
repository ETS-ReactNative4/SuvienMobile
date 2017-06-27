import React, { Component } from 'react';
import { View, Text, Picker, AsyncStorage, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import { CardSection, Button, Input, Header } from './common';
import { Actions } from 'react-native-router-flux';
import CheckBox from './common/CheckBox';
import Camera from 'react-native-camera';

class AddMessage extends Component {
    state = { message: null, day: '[]', startHour: 0, startMinute: 0, endHour: 0, endMinute: 0, title: null, messages: null, messageType: null, isLaunchCam: false, heightc: null, widthc: null, uri: null, cameraType: 'back' }
    async componentWillMount() {
        this.setState({ 
            heightc: Dimensions.get('window').height,
            widthc: Dimensions.get('window').width,
            messages: JSON.parse(await AsyncStorage.getItem('Messages'))
        });
    }
    async onSaveMessagePress() {
        const { message, day, startHour, startMinute, endHour, endMinute, messageType, uri, title } = this.state;
        const messages = JSON.parse(await AsyncStorage.getItem('Messages'));
        if (messageType === 'Msg') {
            messages.push({
            day: JSON.parse(day),
            message,
            startHour,
            startMinute,
            endHour,
            endMinute,
            messageType
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
            messageType
        });
        }
       AsyncStorage.setItem('Messages', JSON.stringify(messages));
       console.log(JSON.parse(await AsyncStorage.getItem('Messages')));
       Actions.Home(); 
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
                    <CardSection style={{ flexDirection: 'column' }}>
                        <Text style={{ fontFamily: 'Roboto-Light', fontSize: 20 }}>{message.message} </Text>
                        <View>
                        <Text style={{ fontFamily: 'Roboto-Light', fontSize: 20 }}>
                            <Image source={require('../Images/calendar.png')} style={{ height: 20, width: 20, marginLeft: 10, alignSelf: 'center' }} /> {message.day.toString()} </Text>
                        <Text style={{ fontFamily: 'Roboto-Light', fontSize: 20 }}>
                            <Image source={require('../Images/clock.png')} style={{ height: 20, width: 20, marginLeft: 10, alignSelf: 'center' }} /> {message.startHour}:{this.addZero(message.startMinute)} - {message.endHour}:{this.addZero(message.endMinute)}</Text>
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
            console.log(this.state.day);
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
                <View>
                    <Text>I would like to add a...</Text>
                    <CardSection>
                        <Button onPress={() => this.setState({ messageType: 'Msg' })}>
                            Alert Message
                        </Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => this.setState({ messageType: 'VideoMsg' })}>
                            Video Message
                        </Button>
                    </CardSection>
                    <Text>Current Messages</Text>
                    <CardSection style={{ flexDirection: 'column' }}>
                        {this.renderMessageList()}
                    </CardSection>
                </View>
            );
        }
        if (this.state.messageType === 'Msg') {
            return (
            <View>
                <Header style={{ height: 80 }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Add Messages</Text>
                </Header>
                <CardSection style={{ marginLeft: 0 }}>
                    <Input
                        placeholder="It's time to check your email!"
                        label="Message"
                        value={this.state.message}
                        onChangeText={(message) => this.setState({ message })}
                        labelstyle={{ marginLeft: 40 }}
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column', height: 70 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, marginBottom: 5 }}>Day</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <CheckBox 
                    label="Sunday" 
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
                    label="Monday" 
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
                    label="Tuesday" 
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
                    label="Wednesday" 
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
                    label="Thursday" 
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
                    label="Friday" 
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
                    label="Saturday" 
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
                    <CardSection style={{ height: 70, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>Start Time</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: 300 }}
                    selectedValue={this.state.startHour}
                    onValueChange={startHour => this.setState({ startHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.startMinute}
                    onValueChange={startMinute => this.setState({ startMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection style={{ height: 70, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>End Time</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: 300 }}
                    selectedValue={this.state.endHour}
                    onValueChange={endHour => this.setState({ endHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.endMinute}
                    onValueChange={endMinute => this.setState({ endMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onSaveMessagePress.bind(this)}>
                        Save and Return
                    </Button>
                </CardSection>
            </View>
        );
        }
        if (this.state.messageType === 'VideoMsg') {
            if (this.state.uri === null) {
                return (
            <View>
                <Header style={{ height: 80 }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Add Messages</Text>
                </Header>
                <CardSection style={{ marginLeft: 0 }}>
                    <Button onPress={() => this.setState({ isLaunchCam: true })}>
                        Record Video
                    </Button>
                </CardSection>
                <CardSection style={{ flexDirection: 'column', height: 70 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, marginBottom: 5 }}>Day</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <CheckBox 
                    label="Sunday" 
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
                    label="Monday" 
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
                    label="Tuesday" 
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
                    label="Wednesday" 
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
                    label="Thursday" 
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
                    label="Friday" 
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
                    label="Saturday" 
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
                    <CardSection style={{ height: 70, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>Start Time</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: 300 }}
                    selectedValue={this.state.startHour}
                    onValueChange={startHour => this.setState({ startHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.startMinute}
                    onValueChange={startMinute => this.setState({ startMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection style={{ height: 70, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>End Time</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: 300 }}
                    selectedValue={this.state.endHour}
                    onValueChange={endHour => this.setState({ endHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.endMinute}
                    onValueChange={endMinute => this.setState({ endMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onSaveMessagePress.bind(this)}>
                        Save and Return
                    </Button>
                </CardSection>
            </View>
        );
            }
            if (this.state.uri !== null) {
                return (
            <View>
                <Header style={{ height: 80 }}>
                    <Text style={{ fontSize: 27, fontFamily: 'Roboto-Light' }}>Add Messages</Text>
                </Header>
                <CardSection style={{ marginLeft: 0 }}>
                    <Image source={{ uri: this.state.uri }} style={{ height: 300, width: 400 }} />
                </CardSection>
                <CardSection style={{ marginLeft: 0 }}>
                    <Input
                        placeholder="Medication Reminder"
                        label="Title"
                        value={this.state.title}
                        onChangeText={(title) => this.setState({ title })}
                        labelstyle={{ marginLeft: 40 }}
                    />
                </CardSection>
                <CardSection style={{ flexDirection: 'column', height: 70 }}>
                    <Text style={{ fontSize: 18, paddingLeft: 20, marginBottom: 5 }}>Day</Text>
                    <View style={{ flexDirection: 'row' }}>
                    <CheckBox 
                    label="Sunday" 
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
                    label="Monday" 
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
                    label="Tuesday" 
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
                    label="Wednesday" 
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
                    label="Thursday" 
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
                    label="Friday" 
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
                    label="Saturday" 
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
                    <CardSection style={{ height: 70, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>Start Time</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: 300 }}
                    selectedValue={this.state.startHour}
                    onValueChange={startHour => this.setState({ startHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.startMinute}
                    onValueChange={startMinute => this.setState({ startMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection style={{ height: 70, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 18, paddingLeft: 20 }}>End Time</Text>
                        <View style={{ flexDirection: 'row' }}>
                    <Picker
                    style={{ width: 300 }}
                    selectedValue={this.state.endHour}
                    onValueChange={endHour => this.setState({ endHour })}
                    >
                        {this.createPicker(hours)}
                    </Picker>
                    <Picker
                    style={{ flex: 1 }}
                    selectedValue={this.state.endMinute}
                    onValueChange={endMinute => this.setState({ endMinute })}
                    >
                        {this.createPicker(minutes)}
                    </Picker>
                    </View>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onSaveMessagePress.bind(this)}>
                        Save and Return
                    </Button>
                </CardSection>
            </View>
        );
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
                                <Image source={require('../Images/cameracapture.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={this.stopRecording.bind(this)}>
                                <Image source={require('../Images/cameracapture.png')} style={{ height: 100, width: 100, marginBottom: 25 }} />
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

export default AddMessage;
