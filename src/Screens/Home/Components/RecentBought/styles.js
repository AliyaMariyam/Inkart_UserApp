import {StyleSheet} from 'react-native';
import colors from '../../../../Components/common/colors';

const styles = (width, height) =>
  StyleSheet.create({
    container:{
        backgroundColor:colors.secondaryGreen,
        borderRadius:15,
        marginHorizontal:15,
        padding:15,
    },
    contentView: {
      backgroundColor: colors.white,
      padding: 15,
      marginRight: 15,
      borderRadius: 15,
    },
    image: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    headerText: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
      marginBottom: 10,
      color:colors.black
    },
  });

export default styles;
