import React from 'react';
import {View, TouchableOpacity, Image, Text, Share} from 'react-native';
import {useDimensionContext} from '../../context';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../common/colors';
import { useSelector } from 'react-redux';


const CommonHeaderRight = props => {
  const navigation = useNavigation();
  const dimension = useDimensionContext();
  const responsiveStyle = styles(dimension.windowWidth, dimension.windowHeight);
  const cartCount = useSelector(state=>state.cartCount)

  const handleClick = async (type) => {
    if(type === 'cart'){
      navigation.navigate('Cart');
    }else if(type === 'share'){
        const result = await Share.share({
          message:
            'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } 
    }
  

  return (
    <View style={responsiveStyle.flexStyle}>
      {props.share ? (
        <TouchableOpacity style={responsiveStyle.padding} onPress={()=>handleClick('share')}>
          <EvilIcons name="share-google" size={45} color={colors.black} />
        </TouchableOpacity>
      ) : null}

      {props.plus ? (
        <TouchableOpacity style={responsiveStyle.padding} onPress={props.handlePlusIcon}>
          <FontAwesome name="plus-square-o" size={38} color={colors.black} />
        </TouchableOpacity>
      ) : null}

      {props.cart ? (
        <TouchableOpacity style={responsiveStyle.padding} onPress={()=>handleClick('cart')}>
          <Image
            style={responsiveStyle.image}
            source={require('../../assets/images/cart.png')}
          />
          <View style={responsiveStyle.cartCount}>
            <Text style={responsiveStyle.count}>{cartCount}</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};


export default CommonHeaderRight;
