import {StyleSheet} from 'react-native';
import colors from '../common/colors';

const styles =(width,height,isPortrait)=> StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:isPortrait? width * 0.175 : width *0.1,
    backgroundColor: colors.white_level_1,
    paddingHorizontal:width * 0.03 //is equal to padding 15
  },
  sideicon: {
    resizeMode: 'contain',
    height: width * 0.1,
    width:  width * 0.1,
  },
  logo: {
    resizeMode: 'contain',
    height: width * 0.15,
    width: width * 0.4,
  },
});

export default styles;
