import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { View } from 'react-native';
import { CardSection, Button } from './common';

class AddPhoto extends Component {
    state = { imageuri: null }
    onTakePhotoPress() {
        return (
            ImagePicker.launchCamera(options, (response) => {
                let source = { uri: response.uri };
                if (source.uri === undefined) {
                    source.uri = null;
                }
                this.setState({ imageuri: source });
                console.log(this.state.imageuri);
            }));
    }

    onChoosePhotoPress() {
        return (
            ImagePicker.launchImageLibrary(options, (response) => {
                let source = { uri: response.uri };
                if (source.uri === undefined) {
                    source.uri = null;
                }
                this.setState({ imageuri: source });
                console.log(this.state.imageuri);
            }
            )
        );
    }

    onAddWebPhotoPress() {

    }

    render() {
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

export default AddPhoto;
