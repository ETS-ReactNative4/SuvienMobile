import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import MainMenu from './Components/MainMenu';
import Settings from './Components/Settings';

const RouterComponent = () => {
    return (
        <Router>
            <Scene 
            key="MainMenu"
            component={MainMenu}
            hideNavBar={true}
            initial 
            />

            <Scene
            key="Settings"
            component={Settings}
            hideNavBar={false}
            />
        </Router>
    );
};

export default RouterComponent;
