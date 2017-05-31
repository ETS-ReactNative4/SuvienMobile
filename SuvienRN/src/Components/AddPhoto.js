import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';

class AddPhoto extends Component {
    render() {
        
        return (
            ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);
            }));
    }
}

export default AddPhoto;
