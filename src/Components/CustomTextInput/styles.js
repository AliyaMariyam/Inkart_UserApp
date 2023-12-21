import React from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import colors from '../common/colors';

const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.secondaryGreen,
    padding: width * 0.009,
    borderRadius: 8,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: colors.grey,
  },
  textInput: {
    flex:1,
    color: colors.black_level_3,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    width:width*0.5
   // flexGrow: 1, 
  },
  icon: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain',
  },
  checkText:{
    fontFamily: 'Lato-Regular',
    color: colors.primaryGreen,
    fontSize: 15,
  }
});

export default styles;
