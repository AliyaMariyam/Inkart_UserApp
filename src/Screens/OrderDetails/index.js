import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Modal, ActivityIndicator} from 'react-native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../Components/common/colors';
import CustomButton from '../../Components/CustomButton';
import {useDimensionContext} from '../../context';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

const OrderDetails = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const {item} = route.params;
  console.log(item);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type={'back'} action={()=>navigation.navigate('Orders')}/>,
      title: 'Order Summary',
    });
  });

  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const reOrder = async () => {
    try {
      setLoading(true);
      const smallId = Math.random();
      await firestore()
        .collection('orders')
        .add({
          orderId: String(smallId).slice(4, 12).toUpperCase(),
          created: Date.now(),
          updated: Date.now(),
          orderStatus: 'Ordered',
          totalAmount: item.totalAmount,
          address: item.address,
          userId: item.userId,
          paymentMethod: 'online',
          cartItems: item.cartItems,
          userName: item.userName,
          userEmail: item.userEmail,
          userPhone: item.userPhone,
          expectedDelDate: '',
        })
        .then(async resp => {
          if (resp) {
            setTimeout(() => {
              Snackbar.show({
                text: 'Your Order Is Successfully Placed',
                duration: Snackbar.LENGTH_SHORT, // or Snackbar.LENGTH_LONG
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
              setLoading(false);
            }, 1000);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={responsiveStyle.container}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={'large'} color={colors.white} />
        </View>
      </Modal>
      <ScrollView
        style={responsiveStyle.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={responsiveStyle.contentContainerStyle}>
        <View style={responsiveStyle.greenBox}>
          <Feather name="box" size={40} color={colors.white} />

          <View style={responsiveStyle.greenTextBox}>
            <Text
              style={{
                color: colors.white,
                fontFamily: 'Lato-Regular',
                fontSize: 16,
              }}>
              OrderId : #{item?.orderId ?? 'UTYRDFG'}
            </Text>
            <Text
              style={{
                color: colors.white,
                fontFamily: 'Lato-Black',
                fontSize: 20,
              }}>
              {item?.orderStatus ?? ''}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 20}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Items:
          </Text>
          {item?.cartItems &&
            item.cartItems.map((ele, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.primaryGreen,
                      paddingHorizontal: 18,
                      paddingVertical: 15,
                      borderRadius: 10,
                      marginRight: 15,
                    }}>
                    <Text
                      style={{
                        color: colors.white,
                        fontFamily: 'Lato-Bold',
                        fontSize: 18,
                      }}>
                      {ele.quantity}
                    </Text>
                  </View>
                  <FontAwesome5
                    name="star-of-life"
                    size={16}
                    color={colors.black}
                  />

                  <View
                    style={{width: '55%', overflow: 'hidden', marginLeft: 10}}>
                    <Text
                      style={{
                        color: colors.black,
                        fontFamily: 'Lato-Regular',
                        fontSize: 18,
                      }}>
                      {ele.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.black_level_3,
                        fontFamily: 'Lato-Regular',
                        fontSize: 15,
                      }}>
                      {ele.description}
                    </Text>
                  </View>

                  <View style={{width: '20%'}}>
                    <Text
                      style={{
                        color: colors.black_level_3,
                        fontFamily: 'Lato-Regular',
                        fontSize: 15,
                      }}>
                      ₹ {ele.price}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Details
          </Text>
          <View
            style={{
              marginVertical: 15,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomColor: colors.black_level_3,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}>
            <View>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Bag Total
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Coupon Discount
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Delivery
              </Text>
            </View>

            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                ₹ 130.00
              </Text>
              <Text
                style={{
                  color: colors.red,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                Apply Coupon
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                  lineHeight: 25,
                }}>
                ₹ 25.00
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              Total Amount
            </Text>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
              }}>
              ₹{item.totalAmount}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Address :
          </Text>
          <Text
            style={{
              color: colors.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            Rick Nelon
          </Text>

          <Text
            style={{
              color: colors.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            HKL Appartments,698
          </Text>

          <Text
            style={{
              color: colors.black,
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              lineHeight: 20,
            }}>
            NK.09.US,890876
          </Text>
        </View>

        <View style={{marginVertical: 15}}>
          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Bold',
              fontSize: 20,
            }}>
            Payment Method :
          </Text>

          <View
            style={{
              marginVertical: 15,
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <FontAwesome name="cc-visa" size={30} color={colors.black} />
            <View style={{marginLeft: 15}}>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                **** **** **** 7876
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontFamily: 'Lato-Regular',
                  fontSize: 16,
                }}>
                {item?.paymentMethod ?? ''}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          padding: 15,
          backgroundColor: colors.white,
        }}>
        <CustomButton
          type="primary"
          handleButtonPress={reOrder}
          buttonText={'Reorder'}
        />
      </View>
    </View>
  );
};

export default OrderDetails;
