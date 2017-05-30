import React, { Component } from 'react';
import { Image } from 'react-native';
import Button from './Components/common/Button';
import CardSection from './Components/common/CardSection';

class App extends Component {
    render() {
        return (
            //When using images, don't wrap with a view
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

export default App;
