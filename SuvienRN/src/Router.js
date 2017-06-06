import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import {
    MainMenu,
    Settings,
    Home,
    AddPhoto,
    VideoPageTest,
    AddVideo,
    AddAudio.
    MainMenuFlexBox
    YouTubeVideoScreen
} from './Components';

const RouterComponent = () => (
        <Router>
            <Scene 
            key="MainMenu"
            component={YouTubeVideoScreen}
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
