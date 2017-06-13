import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Camera from 'react-native-camera';

class VideoPageTest extends Component {

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
        >
          <Text style={styles.capture} onPress={this.startRecording.bind(this)}>[TAKE PHOTO]</Text>
        </Camera>
      </View>
    );
}
/*
<Text style={styles.capture} onPress={this.stopRecording.bind(this)}>[STOP CAPTURE]</Text>
stopTheCapture() {
    this.camera.stopCapture();
    console.log("Capture Done!");
}
takePicture() {
    console.log("Ive started the capture!");
    const options = {};
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }*/
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

export { VideoPageTest };
