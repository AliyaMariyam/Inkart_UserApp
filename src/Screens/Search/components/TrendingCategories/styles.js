import {StyleSheet} from 'react-native';
import colors from '../../../../Components/common/colors';

const styles = (width, height) =>
  StyleSheet.create({
    main: {
      flex: 1,
      padding:15,
    },
    title: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      color:colors.black
    },
    flatList: {
      alignItems: 'center',
      marginVertical: 10,
    },
    imageContainer: {
      padding: 15,
      borderRadius: 15,
      overflow: 'hidden',
      marginRight: 15,
    },
    image: {
      width: width * 0.15,
      height: height * 0.07,
      resizeMode: 'contain',
    },
  });

export default styles;
