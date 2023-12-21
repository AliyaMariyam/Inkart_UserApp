import React, {useState} from 'react';
import {TextInput, View, Image, TouchableOpacity, Text} from 'react-native';
import styles from './styles';
import colors from '../common/colors';
import {useDimensionContext} from '../../context';

const CustomTextInput = props => {
  const dimensions = useDimensionContext();
  const [show, setShow] = useState(false);

  const {
    type,
    handleText,
    placeholder,
    value,
    check = false,
    multiline = false,
  } = props;

  const keyBoardType =
    type === 'email'
      ? 'email-address'
      : type === 'password'
      ? 'default'
      : type === 'phone'
      ? 'phone-pad'
      : 'default';

  const icon =
    type === 'email'
      ? require('../../assets/images/email.png')
      : type === 'password'
      ? show
        ? require('../../assets/images/view.png')
        : require('../../assets/images/hide.png')
      : null;

  const secureTextEntry = type === 'password' ? (show ? false : true) : false;

  const handlePassword = () => {
    setShow(!show);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.textInput,
          {
            height:
              Platform.OS === 'ios'
                ? multiline
                  ? dimensions.windowHeight * 0.12
                  : dimensions.windowHeight * 0.04
                : multiline
                ? dimensions.windowHeight * 0.1
                : dimensions.windowHeight * 0.06,
          },
        ]}
        placeholder={placeholder}
        keyboardType={keyBoardType}
        secureTextEntry={secureTextEntry}
        selectionColor={colors.primaryGreen}
        placeholderTextColor={colors.grey}
        onChangeText={handleText}
        value={value}
        multiline={multiline}

      />
      {check ? <Text style={styles.checkText}>Check</Text> : null}

      {!icon ? null : (
        <TouchableOpacity
          onPress={handlePassword}
          disabled={type !== 'password' ? true : false}>
          <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomTextInput;
