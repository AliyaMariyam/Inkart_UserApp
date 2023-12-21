import {StyleSheet} from 'react-native';
import colors from '../../Components/common/colors';

const styles = (width, height) =>
  StyleSheet.create({
    container: {flex: 1},
    scrollView: {padding: width * 0.045},
    contentContainerStyle: {paddingBottom: height * 0.15},
    greenBox: {
      backgroundColor: colors.primaryGreen,
      borderRadius: width * 0.045,
      padding: 20,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: width * 0.045,
    },
    greenTextBox: {
        marginLeft: width * 0.045
    },
  });

export default styles;
