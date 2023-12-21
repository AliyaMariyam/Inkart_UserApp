import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity,Image} from 'react-native';
import styles from './styles';
import colors from '../common/colors';

const CustomButton = props => {
  const {buttonText, handleButtonPress, type,icon} = props;

  return (
    <TouchableOpacity
      onPress={handleButtonPress}
      style={[
        styles.button,
        {
          backgroundColor:
            type === 'primary' ? colors.primaryGreen : colors.secondaryGreen,
        },
      ]}>
        {type !== 'primary' ? <Image source={icon} style={styles.icon}/> : null}
      <Text
        style={{
          color: type === 'primary' ? colors.white : colors.black_level_3,
          fontFamily:
            type === 'primary' ? 'Lato-Bold' : 'Lato-Regular',
          fontSize: type === 'primary' ? 20 : 14,
        }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
