import React, { Component } from 'react';
import { Header, Card, PictureTile } from './common';

class Home extends Component {
    render() {
        return (
            <Card>
                <Header headerText="It's a lovely day!" />
                <PictureTile />
            </Card>
        );
    }
}

export default Home;
