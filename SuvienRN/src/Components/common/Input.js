import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, inputstyle, labelstyle, maxLength }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  if (maxLength !== undefined) {
    return (
      <View style={containerStyle}>
        <Text style={[labelStyle, labelstyle]}>{label}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={[inputStyle, inputstyle]}
          value={value}
          onChangeText={onChangeText}
          maxLength={maxLength}
        />
      </View>
    );
  } else {
    return (
      <View style={containerStyle}>
        <Text style={[labelStyle, labelstyle]}>{label}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={[inputStyle, inputstyle]}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    );
  }
};

const styles = {
  inputStyle: {
    color: '#000',
    marginRight: 100,
    marginLeft: 5,
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    paddingTop: 3,
    flex: 6
  },
  labelStyle: {
    fontSize: 23, //23 on android
    marginLeft: 100,
    flex: 2,
    fontFamily: 'Roboto-Light',
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
