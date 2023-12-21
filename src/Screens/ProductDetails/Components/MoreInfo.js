import {useEffect,useState} from 'react'
import {View,Text} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDimensionContext } from '../../../context';
import colors from '../../../Components/common/colors';
import styles from './styles';

const MoreInfo = (props) =>{

    const dimensions = useDimensionContext();
    const responsiveStyle = styles(
      dimensions.windowWidth,
      dimensions.windowWidth,
      dimensions.isPortrait,
    );

    return(
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical:10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: dimensions.windowWidth * 0.425,
            justifyContent: 'center',
            backgroundColor: colors.lightGrey,
            padding:15,
            borderRadius:5,
          }}>
          <Text
            style={{
              color: colors.black,
              marginLeft: 10,
              fontFamily: 'Lato-Bold',
              fontSize: 18,
            }}>
            500g/₹24.00{' '}
          </Text>
          <AntDesign name="down" size={25} color={colors.grey} />
        </View>

        <View
           style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: dimensions.windowWidth * 0.425,
            justifyContent: 'center',
            backgroundColor: colors.lightGrey,
            padding:15,
            borderRadius:5,
          }}>
          <Text
            style={{
              color: colors.black,
              marginLeft: 10,
              fontFamily: 'Lato-Bold',
              fontSize: 18,
            }}>
           Delivery Time
          </Text>
          <AntDesign name="down" size={25} color={colors.grey} />
        </View>
      </View>

    )
}

export default MoreInfo