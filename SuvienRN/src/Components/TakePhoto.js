import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Camera from 'react-native-camera';

class TakePhoto extends Component {
state = { cameraType: 'front' }
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
        </Camera>
        <View style={{ flexDirection: 'row', backgroundColor: 'black' }}>
            <Image source={require('../Images/cameracapture.png')} style={{ height: 100, width: 100 }}onPress={this.takePicture.bind(this)} />
            <Image source={require('../Images/switchcamera.png')} style={{ height: 100, width: 100 }}onPress={this.takePicture.bind(this)} />
        </View>
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
