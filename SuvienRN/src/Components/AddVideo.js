import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection, Button } from './common';

class AddVideo extends Component {
    state = { videouri: null }
    onTakeVideoPress() {
        Actions.VideoPageTest();
    }

   onChooseVideoPress() {
        return (
            /*
            ImagePicker.launchImageLibrary(options, (response) => {
                let source = { uri: response.uri };
                if (source.uri === undefined) {
                    source.uri = null;
                }
                this.setState({ videouri: source });
                console.log(this.state.videouri);
            }
            )*/
            console.log('Wait!')
        );
    }

    onAddWebVideoPress() {

    }

    render() {
        return (
            <View style={{ marginTop: 60 }}>
                <CardSection>
                    <Button onPress={this.onTakeVideoPress.bind(this)}>
                        Record Video
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onChooseVideoPress.bind(this)}>
                        Choose from Video Library
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onAddWebVideoPress.bind(this)}>
                        Add from web using Youtube
                    </Button>
                </CardSection>
            </View>
        );
    }
}


export default AddVideo;