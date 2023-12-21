import {StyleSheet} from 'react-native';
import colors from '../../../Components/common/colors';

const styles = (width, height, isPortrait) =>
  StyleSheet.create({
    descriptionHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: colors.black,
    },
    description: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.grey,
    },
    deliveryHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 20,
      color: colors.black,
      marginBottom: 10,
    },
    commonText: {
      fontFamily: 'Lato-Regular',
      fontSize: 15,
      color: colors.shadow,
      marginBottom: 10,
      lineHeight:16,
    },
  });

export default styles;
