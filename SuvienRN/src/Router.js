import React from 'react';
import { Image } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import {
    MainMenu,
    Settings,
    Home,
    AddPhoto,
    VideoPageTest,
    AddAudio,
    AddVideo,
    Media,
    MediaExplorer,
    FirstLanding,
    TagSelect,
    AddAudioAnd
} from './Components';
import VideoTest from './Components/VideoTest';
import AddMessage from './Components/AddMessage';
import MemoryGame from './Components/MemoryGame';

const RouterComponent = () => (
        <Router
        duration={0}
        >
            <Scene 
            key="MainMenu"
            component={MainMenu}
            hideNavBar
            initial 
            />

            <Scene
            key="MemoryGame"
            component={MemoryGame}
            hideNavBar
            />

            <Scene
            key="AddMessage"
            component={AddMessage}
            hideNavBar
            />

            <Scene
            key="VideoTest"
            component={VideoTest}
            hideNavBar
            />

            <Scene
            key="TagSelect"
            component={TagSelect}
            hideNavBar
            />

            <Scene 
            key="MediaExplorer"
            component={MediaExplorer}
            hideNavBar
            //initial 
            />

            <Scene
            key="Media"
            component={Media}
            hideNavBar
            />

            <Scene
            key="Settings"
            component={Settings}
            hideNavBar={false}
            title="Settings"
            titleStyle={styles.titleStyles}
            onLeft={() => {}}
            renderBackButton={() => <Image source={require('./Images/placeholderphoto.png')} style={{ marginLeft: 30, marginBottom: 10, height: 29, width: 100 }} />}
            //LeftButtonImage={require('./Images/placeholderphoto.png')}
            />

            <Scene
            key="Home"
            component={Home}
            hideNavBar
            //initial
            />   

            <Scene
            key="FirstLanding"
            component={FirstLanding}
            hideNavBar={false}
            title="Welcome!"
            titleStyle={styles.titleStyles}
            onLeft={() => {}}
            renderBackButton={() => <Image source={require('./Images/placeholderphoto.png')} style={{ marginLeft: 30, marginBottom: 10, height: 29, width: 100 }} />}
            />

            <Scene
            key="AddPhoto"
            component={AddPhoto}
            hideNavBar
            title="Add Photo"
            titleStyle={styles.titleStyles}
            onLeft={() => {}}
            renderBackButton={() => <Image source={require('./Images/placeholderphoto.png')} style={{ marginLeft: 30, marginBottom: 10, height: 29, width: 100 }} />}
            //initial
            />

            <Scene
            key="AddVideo"
            component={AddVideo}
            hideNavBar={false}
            title="Add Video"
            titleStyle={styles.titleStyles}
            />

            <Scene
            key="AddAudio"
            component={AddAudio}
            hideNavBar={false}
            title="Add Audio"
            titleStyle={styles.titleStyles}
            />

            <Scene
            key="AddAudioAnd"
            component={AddAudioAnd}
            hideNavBar={false}
            title="Add Audio"
            titleStyle={styles.titleStyles}
            />
            
            <Scene
            key="VideoPageTest"
            component={VideoPageTest}
            hideNavBar
            //initial
            />
                 
        </Router>
    );

const styles = {
    titleStyles: {
        fontFamily: 'Roboto-Thin',
        fontSize: 27,
        fontWeight: '100',
        justifyContent: 'center'
    }
};

export default RouterComponent;
