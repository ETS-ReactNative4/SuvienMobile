import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Camera from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import { Button, CardSection } from './common';

class TakePhoto extends Component {
state = { cameraType: 'front', width: 200, height: 200 }
componentWillMount() {
  this.setState({ 
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width 
        });
}

onSwitchCameraPress() {
  if (this.state.cameraType === 'front') {
    this.setState({ cameraType: 'back' });
  }
  if (this.state.cameraType === 'back') {
    this.setState({ cameraType: 'front' });
  }
}
startRecording() {
    console.log('start rec');

    this.camera.capture()
      .then((data) => {
        console.log('capturing...');
        console.log(data);
      });
  }

  stopRecording() {
    console.log('stop rec');
    this.camera.stopCapture();
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          captureMode={Camera.constants.CaptureMode.still}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          type={this.state.cameraType}
        >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent', width: this.state.width, height: this.state.height }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.8)', width: 150, height: this.state.height }}>
            <Image source={require('../Images/cameracapture.png')} style={{ height: 100, width: 100, marginBottom: 25 }}onPress={this.takePicture.bind(this)} />
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

takePicture() {
    console.log('Ive started the capture!');
    const options = {};
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
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

export default TakePhoto;
