import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import MainMenu from './Components/MainMenu';
import Settings from './Components/Settings';

const RouterComponent = () => (
        <Router>
            <Scene 
            key="MainMenu"
            component={MainMenu}
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
