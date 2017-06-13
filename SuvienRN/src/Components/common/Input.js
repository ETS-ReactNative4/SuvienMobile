import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    marginRight: 100,
    marginLeft: 5,
    fontSize: 20,
    fontFamily: 'Roboto',
    paddingTop: 3,
    flex: 6
  },
  labelStyle: {
    fontSize: 23, //20 on android
    marginLeft: 100,
    flex: 1,
    fontFamily: 'ClementePDag-Book',
    marginBottom: 7
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
