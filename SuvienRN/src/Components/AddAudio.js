import React, { Component } from 'react';
import MusicPlayerController from 'react-native-musicplayercontroller';
import { View, AsyncStorage } from 'react-native';
import { CardSection, Button } from './common';

class AddAudio extends Component {
    state = { audiopath: null }
    async onRecordAudioPress() {
    /*    MusicPlayerController.playMusic(() => {
            console.log('I playin!');
    // Successfully playing
    }, () => {
    // Failed to play
});*/
    console.log(JSON.parse(await AsyncStorage.getItem('samplemusic')));
    }

    onChooseMusicPress() {
    MusicPlayerController.presentPicker(false, (metadata) => {
        //console.log(metadata[0].uri);
        //this.setState({ audiopath: metadata[0].uri });
        console.log(metadata[1]);
        this.setState({ audiopath: metadata[1] });
    }, () => {
        console.log('Cancel');
    });
    }

    async onAddWebAudioPress() {
        //AsyncStorage.setItem('samplemusic', JSON.stringify(this.state.audiopath));
        //this.setState({ audiopath: JSON.parse(await AsyncStorage.getItem('samplemusic')) });
        //To add later: an actual link to async storage through state
        //const title = this.state.audiopath.toString();
        /*MusicPlayerController.preloadMusic(this.state.audiopath, (metadata) => {
            console.log('I found the music! Its:');
            console.log(metadata);
        }, () => {
            console.log('I didnt find it :(');
        });*/
        MusicPlayerController.preloadMusic('bplist00Ô\u0001\u0002\u0003\u0004\u0005\b?@T$topX$objectsX$versionY$archiverÑ\u0006\u0007Troot\u0001ª\t\n\u0019\u001f#$+16:U$null×\u000b\f\r\u000e\u000f\u0010\u0011\u0012\u0013\u0014\u0015\u0016\u0017\u0018V$class\\MPItemsCountWMPItems_\u0010 MPInitializedContainedMediaTypes_\u0010\u0014MPRepresentativeItem_\u0010\u0011MPMediaItemsQuery_\u0010\u0015MPContainedMediaTypes\t\u0010\u0001\u0007\b\u0002\u0000\u0010\u0000Ó\u001a\u000b\u001b\u001c\u001d\u001e^MPPersistentIDYMPLibrary\u0013\u0004xl&ë¿|\u0006\u0003Ò \u000b!"_\u0010\u0018MPLibraryDataProviderUID\u0004\u0005_\u0010$947B1C36-E5AF-4989-97E3-82F451462D64Ò%&\'*X$classesZ$classname¢()^MPMediaLibraryXNSObject^MPMediaLibraryÒ%&,0¤-./)_\u0010\u0013MPConcreteMediaItem[MPMediaItem]MPMediaEntity_\u0010\u0013MPConcreteMediaItemÒ\u000b234ZNS.objects\b¡\u0016\u0002Ò%&79¢8)WNSArrayWNSArrayÒ%&;>£<=)_\u0010\u0015MPMediaItemCollection]MPMediaEntity_\u0010\u0015MPMediaItemCollection\u0012\u0000\u0001 _\u0010\u000fNSKeyedArchiver\u0000\b\u0000\u0011\u0000\u0016\u0000\u001f\u0000(\u00002\u00005\u0000:\u0000<\u0000G\u0000M\u0000\\\u0000c\u0000p\u0000x\u0000\u0000²\u0000Æ\u0000Þ\u0000à\u0000â\u0000ä\u0000å\u0000ç\u0000é\u0000ë\u0000ò\u0001\u0001\u0001\u000b\u0001\u0014\u0001\u0016\u0001\u0018\u0001\u001d\u00018\u0001:\u0001<\u0001c\u0001h\u0001q\u0001|\u0001\u0001\u0001\u0001¦\u0001«\u0001°\u0001Æ\u0001Ò\u0001à\u0001ö\u0001û\u0002\u0006\u0002\b\u0002\n\u0002\f\u0002\u0011\u0002\u0014\u0002\u001c\u0002$\u0002)\u0002-\u0002E\u0002S\u0002k\u0002p\u0000\u0000\u0000\u0000\u0000\u0000\u0002\u0001\u0000\u0000\u0000\u0000\u0000\u0000\u0000A\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0002', (metadata) => {
            console.log('I found the music! Its:');
            console.log(metadata);
        }, () => {
            console.log('I didnt find it :(');
        });
        //AsyncStorage.setItem('samplemusic', JSON.stringify(this.state.audiopath));
    }
    
    render() {
        return (
            <View style={{ marginTop: 60 }}>
                <CardSection>
                    <Button onPress={this.onRecordAudioPress.bind(this)}>
                        Record Audio
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onChooseMusicPress.bind(this)}>
                        Choose from Music Library
                    </Button>
                </CardSection>
                <CardSection>
                    <Button onPress={this.onAddWebAudioPress.bind(this)}>
                        Add from Youtube using URL
                    </Button>
                </CardSection>
            </View>
        );
    }
}

export { AddAudio };
