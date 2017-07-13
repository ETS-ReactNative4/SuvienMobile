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
    AddAudioAnd,
    VideoTest,
    AddMessage,
    MemoryGame,
    ContentExplorer,
    AdvancedSettings,
    CaptionGame,
    Games
} from './Components';

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
            key="Games"
            component={Games}
            hideNavBar
            />
            
            <Scene
            key="CaptionGame"
            component={CaptionGame}
            hideNavBar
            />

            <Scene
            key="MemoryGame"
            component={MemoryGame}
            hideNavBar
            />

            <Scene
            key="ContentExplorer"
            component={ContentExplorer}
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
            key="Advanced"
            component={AdvancedSettings}
            hideNavBar
            //initial
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
            hideNavBar
            //initial
            /*
            title="Settings"
            titleStyle={styles.titleStyles}
            onLeft={() => {}}
            renderBackButton={() => <Image source={require('./Images/placeholderphoto.png')} style={{ marginLeft: 30, marginBottom: 10, height: 29, width: 100 }} />}
            //LeftButtonImage={require('./Images/placeholderphoto.png')}
            */
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
            hideNavBar
            //title="Welcome!"
            //titleStyle={styles.titleStyles}
            //onLeft={() => {}}
            //renderBackButton={() => <Image source={require('./Images/placeholderphoto.png')} style={{ marginLeft: 30, marginBottom: 10, height: 29, width: 100 }} />}
            //initial
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
            hideNavBar
            title="Add Video"
            titleStyle={styles.titleStyles}
            />

            <Scene
            key="AddAudio"
            component={AddAudio}
            hideNavBar
            title="Add Audio"
            titleStyle={styles.titleStyles}
            />

            <Scene
            key="AddAudioAnd"
            component={AddAudioAnd}
            hideNavBar
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
