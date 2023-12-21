import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from './styles';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import {useDimensionContext} from '../../context';
import colors from '../../Components/common/colors';
import OrderTotal from './Components/OrderTotal';
import CommonButton from '../../Components/CommonButton';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount} from '../../storage/action';
import Snackbar from 'react-native-snackbar';

const Cart = () => {
  const dimensions = useDimensionContext();
  const navigation = useNavigation();
  const [cartProducts, setCartProducts] = useState([]);
  
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state=>state.cartCount)
  const email = useSelector(state=>state.email)
  const mobileNumber = useSelector(state=>state.mobileNumber)

  const [qun, setQun] = useState(0);
  const dispatch = useDispatch();
  const [total,setTotal] = useState(0)
  const [charges,setCharges] = useState()
  const isFocused = useIsFocused()

  useEffect(()=>{
    if(isFocused){
      getCartProducts();
    }
  },[isFocused])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  }, []);

  useEffect(() => {
    getCartProducts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getCartProducts();
    }, [getCartProducts]),
  );

  useEffect(()=>{
    if(cartProducts.length > 0){
      setCharges(50)
    }else{
      setCharges(0)
    }
  },[cartProducts])

  const getCartProducts = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          let totalAmount = 0
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const amount = parseFloat(doc?.data().price) * parseInt(doc?.data().quantity)
              totalAmount = totalAmount + amount
              const responseData = {id: doc.id, ...doc.data()};
              result.push(responseData);
              // const amount = parseFloat(doc?.data().price) * parseInt(doc?.data().quantity)
              // totalAmount = totalAmount + amount
            }
          });
          setTotal(totalAmount)
          setCartProducts(result);
        }else{
          setCartProducts([])
          setTotal(0)
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const updateArray = productInfo => {
    const result = cartProducts.filter(x => {
      return x.id !== productInfo.id;
    });
    setTotal(total - parseFloat(productInfo.price))
    setCartProducts(result);
    dispatch(updateCartCount(cartCount - 1));
  };

  const handleTotal =( type,productInfo)=>{
    if(type === 'add'){
      setTotal(total + parseFloat(productInfo.price))
    }else{
      setTotal(total - parseFloat(productInfo.price))
    }
  }

  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const onButtonPress = () =>{
    if(cartProducts.length > 0){
     if(email === '' || mobileNumber == ''){
      Snackbar.show({
        text: 'You have to complete your profile to continue',
        duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
        backgroundColor: colors.red,
        textColor: colors.white,
      });
      navigation.navigate('Account')
     }else{
      navigation.navigate('AddAddress',{cartProducts:cartProducts,total:total})
     }
    }else{
      Snackbar.show({
        text: 'Your Cart is Empty',
        duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  }

  return (
    <View style={responsiveStyle.container}>
      <FlatList
        data={cartProducts}
        extraData={cartProducts}
        renderItem={({item, index}) => (
          <RenderItem item={item} index={index} updateArray={updateArray}  handleTotal={handleTotal}/>
        )}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                padding: 30,
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Black',
                  color: colors.black,
                  fontSize: 25,
                }}>
                Cart is empty
              </Text>
              <TouchableOpacity>
                <Text>Go to shop</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListFooterComponent={() => {
          return (
            <>
              <View style={responsiveStyle.renderView}>
                {/* start design */}
                <View style={responsiveStyle.offCircleView}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>

                <View
                  style={{
                    width: '64%',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                    padding: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: colors.primaryGreen,
                        fontSize: 50,
                      }}>
                      50
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 16,
                        }}>
                        %
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 16,
                        }}>
                        OFF
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          fontFamily: 'Lato-Bold',
                          color: colors.black,
                          fontSize: 18,
                        }}>
                        On your first order
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.black_level_3,
                          fontSize: 12,
                        }}>
                        Order above 2500 rupees
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                  }}>
                  <View style={responsiveStyle.circleCenter}></View>
                  <View
                    style={[
                      responsiveStyle.circleCenter,
                      {marginBottom: -25 / 2},
                    ]}></View>
                </View>

                <View
                  style={{
                    width: '25%',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                    paddingRight: 15,
                    paddingVertical: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      color: colors.black_level_3,
                      fontSize: 14,
                    }}>
                    Use Code
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      justifyContent: 'center',
                      borderRadius: 15,
                      backgroundColor: colors.primaryGreen,
                      overflow: 'hidden',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.white,
                        textAlign: 'center',
                      }}>
                      YF567
                    </Text>
                  </View>
                </View>

                {/* end Design */}
                <View style={{marginLeft: -25 / 2}}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>
              </View>

              <OrderTotal total={total} charges={charges}/>
              <CommonButton buttonText="Proceed to Checkout" onButtonPress={onButtonPress}/>
            </>
          );
        }}
      />
    </View>
  );
};

const RenderItem = ({item, index, updateArray,handleTotal}) => {
  const userId = useSelector(state => state.userId);
  const [qun, setQun] = useState(item.quantity);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  useEffect(() => {
    setQun(item.quantity);
  }, [item]);

  const addToCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.productId)
      .get()
      .then(snapshot => {
        firestore()
          .collection('Cart')
          .doc(snapshot?.docs[0].id)
          .update({
            quantity: parseInt(snapshot?.docs[0].data().quantity + 1),
          });
          handleTotal('add',item)
      });
  };

  const removeItem = async () => {
    if (qun <= 1) {
      //remove from cart
      await firestore()
        .collection('Cart')
        .doc(item.id)
        .delete()
        .then(() => {
          updateArray(item);
        });
    } else {
      //update quantity
      setQun(qun - 1);
      firestore()
        .collection('Cart')
        .doc(item.id)
        .update({
          quantity: parseInt(item.quantity, 10) - 1,
        });
        handleTotal('minus',item)
    }
  };

  const redirectToProductDetails = () => {
    navigation.navigate('ProductDetails', {product: item});
  };

  return (
    <TouchableOpacity
      style={responsiveStyle.flatListView}
      onPress={redirectToProductDetails}>
      <Image source={{uri: item.image}} style={responsiveStyle.image} />
      <View style={responsiveStyle.nameContentView}>
        <Text style={responsiveStyle.nameText} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={responsiveStyle.contentText} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={responsiveStyle.priceView}>
          <View style={responsiveStyle.priceView2}>
            <Text style={responsiveStyle.priceText}>₹ {item.price}</Text>
            <View style={responsiveStyle.offView}>
              <Text style={responsiveStyle.offText}>50%</Text>
            </View>
          </View>
          <View style={responsiveStyle.qunView}>
            <TouchableOpacity onPress={removeItem}>
              <Text style={responsiveStyle.qunText1}>-</Text>
            </TouchableOpacity>
            <Text style={responsiveStyle.qunText2}>{qun}</Text>
            <TouchableOpacity
              onPress={() => {
                setQun(qun + 1);
                addToCart();
              }}>
              <Text style={responsiveStyle.qunText1}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Cart;
