import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

class CheckBox extends Component {
    state = { checked: false, image: require('./unchecked.png') }
    componentWillMount() {
        if (this.props.value !== null) {
            console.log(this.props.value);
            const det = this.props.value.find((val) => val === this.props.label);
            if (det !== undefined) {
                this.setState({ checked: true, image: require('./checked.png') });
            }
        }
    }

    checkBox() {
        if (this.state.checked === false) {
            this.setState({ checked: true, image: require('./checked.png') });
            this.props.onChangeItem(this.props.label);
        }
        if (this.state.checked === true) {
            this.setState({ checked: false, image: require('./unchecked.png')});
            this.props.onChangeItem(`${this.props.label}*`);
        }
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <TouchableOpacity onPress={this.checkBox.bind(this)}>
                    <Image source={this.state.image} style={{ height: 30, width: 30 }} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 10, fontSize: 20, fontFamily: 'Roboto-Light' }}>{this.props.label}</Text>
            </View>
    );
    }
    
}

export default CheckBox;
