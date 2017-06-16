import React from 'react';
import { Image } from 'react-native';
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
import FirstLanding from './Components/FirstLanding';
import CameraRollTest from './Components/CameraRollTest';
import TimerTest from './Components/TimerTest';
import TakePhoto from './Components/TakePhoto';

const RouterComponent = () => (
        <Router>
            <Scene 
            key="MainMenu"
            component={MainMenu}
            hideNavBar
            initial 
            />

            <Scene 
            key="MediaExplorer"
            component={MediaExplorer}
            hideNavBar
            //initial 
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
            hideNavBar={false}
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
            key="VideoPageTest"
            component={VideoPageTest}
            hideNavBar
            //initial
            />
                 
        </Router>
    );

const styles = {
    titleStyles: {
        fontFamily: 'ClementePDag-Book',
        fontSize: 27,
        fontWeight: '100',
    }
};

export default RouterComponent;
