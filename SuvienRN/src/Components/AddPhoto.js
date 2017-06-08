import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import { View, Text, Image } from 'react-native';
import { CardSection, Button, Input } from './common';
import Orientation from 'react-native-orientation';

class AddPhoto extends Component {
    state = { imageuri: null, caption: null, group: null }
    componentWillMount() {
        Orientation.lockToLandscape();
    }
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
<<<<<<< HEAD
        /*
        MusicPlayerController.presentPicker(false, (metadata) => {
            console.log(metadata[0].title);
            }, () => {
            console.log('Cancel');
        });*/
=======

>>>>>>> parent of 93198bb... Added present picker option
    }

    onSaveItemPress() {
        return (
            console.log('wee!')
        );
    }
 
     onPhotoSelect() {
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
             return (
                 <View>
                     <CardSection>
                         <Image 
                         source={this.state.imageuri} 
                         style={{ 
                             height: 400, 
                             width: 400,
                             alignItems: 'center'
                         }} 
                         />
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
                 {this.onPhotoSelect()}
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
