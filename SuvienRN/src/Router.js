import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {
    MainMenu,
    Settings,
    Home,
    AddPhoto,
    VideoPageTest,
    AddVideo,
    AddAudio,
    MainMenuFlexBox,
    YouTubeVideoScreen
} from './Components';
import MediaExplorer from './Components/MediaExplorer';
import CameraRollTest from './Components/CameraRollTest';

const RouterComponent = () => (
        <Router>
            <Scene 
            key="MainMenu"
            component={AddAudio}
            hideNavBar
            initial 
            />

            <Scene
            key="Settings"
            component={Settings}
            hideNavBar={false}
            title="Settings"
            titleStyle={styles.titleStyles}
            />

            <Scene
            key="Home"
            component={Home}
            hideNavBar
            />   

            <Scene
            key="AddPhoto"
            component={AddPhoto}
            hideNavBar={false}
            title="Add Photo"
            titleStyle={styles.titleStyles}
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
            key="VideoPageTest"
            component={VideoPageTest}
            hideNavBar
            //initial
            />
                 
        </Router>
    );

const styles = {
    titleStyles: {
        fontFamily: 'Roboto',
        fontSize: 25,
        fontWeight: '100'
    }
};

export default RouterComponent;
