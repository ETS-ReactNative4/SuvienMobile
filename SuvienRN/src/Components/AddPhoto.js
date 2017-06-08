import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { View, AsyncStorage, Text, Image } from 'react-native';
import { CardSection, Button, Input } from './common';

class AddPhoto extends Component {
    state = { imageuri: null, caption: null, group: null } //'file:///var/mobile/Containers/Data/Application/96AF4229-C558-4743-8B14-D280B93DF4E9/Documents/images/44643C96-6A95-47A1-9B27-2EA09F2319B2.jpg'

    async onSaveItemPress() {
        const namefile = Date.now().toString();
        AsyncStorage.setItem(namefile, JSON.stringify({ 
            imageuri: this.state.imageuri, 
            caption: this.state.caption, 
            group: this.state.group 
        }));
        console.log(namefile);
        console.log(JSON.parse(await AsyncStorage.getItem(namefile)));
    }

    onTakePhotoPress() {
        return (
            ImagePicker.launchCamera(options, (response) => {
                const source = { uri: response.uri };
                if (source.uri === undefined) {
                    source.uri = null;
                }
                this.setState({ imageuri: source });
                console.log(this.state.imageuri);
            }));
    }

    onChoosePhotoPress() {
        return (
            //ImagePicker.launchImageLibrary(options, (response) => {
                /*
                const source = { uri: response.uri };
                if (source.uri === undefined) {
                    source.uri = null;*/
                //this.setState({ imageuri: source });
                console.log('Im in the onchoosephotopress!')
            //}
        );
    }

    onAddWebPhotoPress() {
        
    }

    /*onPhotoSelect() {
        //1496411711468
        if (this.state.imageuri === null) {
            return (
                <View>
                    <CardSection>
                        <Text>No Image Selected</Text>
                    </CardSection>
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
        if (this.state.imageuri !== null) {
            console.log('I have an image uri! Its:');
            console.log(this.state.imageuri);
            return (
                <View>
                    <CardSection>
                        <Text>No Image Selected</Text>
                    </CardSection>
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
    }*/

    render() {
        console.log('Im rendering!');
        return (
            <View style={{ marginTop: 60 }}>
                <CardSection>
                    <Button onPress={this.onTakePhotoPress.bind(this)}>
                        Take Photo
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onChoosePhotoPress.bind(this)}>
                        Choose from Photo Library
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onAddWebPhotoPress.bind(this)}>
                        Add from web using Image URL
                    </Button>
                </CardSection>
                <View>
                    <CardSection>
                        <Text>No Image Selected</Text>
                    </CardSection>
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
            </View>
        );
    }
}

const options = {
            title: 'Select Avatar',
            customButtons: [
                { name: 'fb', title: 'Choose Photo from Facebook' },
                ],
                storageOptions: {
                    skipBackup: true,
                    path: 'images'
                }
};

export { AddPhoto };
