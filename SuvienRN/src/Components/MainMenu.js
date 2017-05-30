import React, { Component } from 'react';
import { Image } from 'react-native';
import { Button, CardSection } from './common';

class MainMenu extends Component {
    render() {
        return (
            <Image 
            source={require('./Images/suviensplash.png')}
            style={styles.imageStyle}
            >
                <CardSection>
                    <Button>
                     Get Started
                    </Button>
                </CardSection>
            </Image>
        );
    }
}

const styles = {
    imageStyle: {
        flex: 1,
        height: null,
        width: null
    }
};

export default MainMenu;
