import React, { Component } from 'react';
import { CameraRoll, View, Text, Image, Modal, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Button } from './common';

class CameraRollTest extends Component {
    state = { photos: null, imageuri: { uri: null }, modalVisible: true };

    onPressPhotos() {
            CameraRoll.getPhotos({
                first: 10000, //Quick and dirty fix. Will update to a more friendly fix in later versions
                assetType: 'All'
            })
            .then(r => this.setState({ photos: r.edges, imageuri: { uri: r.edges[0].node.image.uri } }));
            console.log(this.state.photos);
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    renderPhotos() {
        const allphotos = this.state.photos.map((photo) => {
            //For future applications, long press may prove to be more user friendly
            return (
            <TouchableOpacity onPress={() => console.log(photo.node.image.uri)} key={photo.node.image.uri}>
                <Image style={{ height: 150, width: 150, marginLeft: 20, marginTop: 20 }} source={{ uri: photo.node.image.uri }} />
            </TouchableOpacity>
            );
        });
            return (
                [...allphotos]
            );
    }
    render() {
        if (this.state.photos === null) {
            return (
                <Button onPress={this.onPressPhotos.bind(this)}>
                    Press me!
                </Button>
            );
        }
        if (this.state.photos !== null) {
            console.log(this.state.photos);
            //The sizing can work for 5 images across
            return (
                <View>
                    <Modal
                    animationType={'fade'}
                    transparent
                    visible={this.state.modalVisible}
                    onRequestClose={() => console.log('Modal has been closed')}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <View style={{ width: 910, backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 27 }}>Select Photo</Text>
                            </View>
                            <View style={{ height: 590, width: 910, backgroundColor: '#EFEFEF', position: 'relative', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>
                                <ScrollView>
                                    <View style={{ marginLeft: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                                        {this.renderPhotos()}
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        }
    }
}

export default CameraRollTest;
