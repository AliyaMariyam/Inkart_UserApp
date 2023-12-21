import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {useDimensionContext} from '../../context';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';

const CommonHeaderLeft = props => {
  const navigation = useNavigation();
  const dimension = useDimensionContext();
  const responsiveStyle = styles(dimension.windowWidth, dimension.windowHeight);

  const handleClick = () => {
    if (props.type === 'back') {
      if (props.action) {
        props.action();
      } else {
        navigation.goBack();
      }
    } else {
      navigation.toggleDrawer();
    }
  };

  return (
    <TouchableOpacity style={responsiveStyle.padding} onPress={handleClick}>
      <Image
        source={
          props.type === 'back'
            ? require('../../assets/images/left-arrow.png')
            : require('../../assets/images/drawer.png')
        }
        style={responsiveStyle.image}
      />
    </TouchableOpacity>
  );
};

export default CommonHeaderLeft;
