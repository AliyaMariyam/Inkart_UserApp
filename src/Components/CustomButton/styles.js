import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import colors from '../common/colors';

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  button:{
    padding:width * 0.04,
    borderRadius:8,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:width * 0.019,
    flexDirection:'row'
  },
  icon:
  {
    width:width * 0.025,
    height:width * 0.025,
    marginRight:width*0.025
  },

});

export default styles;