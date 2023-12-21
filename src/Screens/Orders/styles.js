import {StyleSheet} from 'react-native';
import colors from '../../Components/common/colors';

const styles =(width,height) => StyleSheet.create({
  container: {
    backgroundColor: colors.white_level_1,
    flex:1,
  },
  flatView:{
    backgroundColor: colors.secondaryGreen,
    borderRadius: 15,
    padding: 15,
    overflow: 'hidden',
    marginTop: 12,
    marginHorizontal:15,
  },
  innerView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  orderId:{
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: colors.black,
  },
  mapImage:{
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  bottomView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },
  bottomText:{
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.black_level_3,
  },
  greenText:{
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: colors.primaryGreen,
  },
  address:{
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: colors.grey,
  },
  paidText:{
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: colors.black,
  },
  orderedDate:{
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: colors.primaryGreen,
  },

});

export default styles;