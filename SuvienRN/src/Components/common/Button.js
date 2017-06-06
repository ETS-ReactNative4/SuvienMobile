import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#4A86E8',
    fontSize: 27, //27 for android
    fontWeight: '100',
    fontFamily: 'Roboto',
    paddingTop: 10, //Issues with padding for ios. Is 10 for android
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
