import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../../Components/common/colors';
import {useNavigation} from '@react-navigation/native';
import {useDimensionContext} from '../../../../context';
import styles from './styles';

const OrderTotal = (props) => {
  const dimensions = useDimensionContext();
  const navigation = useNavigation();
  const {total,charges} = props

  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  return (
    <View>
      <View style={responsiveStyle.container}>
        <View>
          <Text style={responsiveStyle.head}>Order Details</Text>
          <Text style={responsiveStyle.content}>Bag Total</Text>
          <Text style={responsiveStyle.content}>Bag Savings</Text>
          <Text style={responsiveStyle.content}>Coupon Discount</Text>
          <Text style={responsiveStyle.endContent}>Delivery</Text>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <Text style={responsiveStyle.headEnd}>---</Text>
          <Text style={responsiveStyle.content}>₹{parseFloat(total).toFixed(2)}</Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              lineHeight: 30,
              color: colors.primaryGreen,
            }}>
            0.00
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              lineHeight: 30,
              color: colors.red,
            }}>
            Apply Coupon
          </Text>
          <Text
            style={{
              fontFamily: 'Lato-Regular',
              fontSize: 18,
              lineHeight: 30,
              color: colors.black,
              marginBottom: 15,
            }}>
            ₹{parseFloat(charges).toFixed(2)}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={responsiveStyle.total}>Order Details</Text>
        <Text style={responsiveStyle.total}>₹{parseFloat(total + charges).toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default OrderTotal;
