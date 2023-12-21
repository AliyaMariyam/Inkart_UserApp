import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDimensionContext} from '../../context';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../Components/common/colors';
import { updateCartCount } from '../../storage/action';

const Wishlist = () => {
  const navigation = useNavigation();
  const dimension = useDimensionContext();
  const dispatch = useDispatch()
 
  const [wishlistProduct, setWishlistProducts] = useState([]);

  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  

  //console.warn("Product Id : ",productId)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity>
            <View style={responsiveStyle.cartCount}>
              <Text style={responsiveStyle.count}>{cartCount}</Text>
            </View>
            <Image
              source={require('../../assets/images/cart.png')}
              style={responsiveStyle.cartIcon}
            />
          </TouchableOpacity>
        );
      },

      headerLeft: () => <CommonHeaderLeft />,
    });
  });

  const responsiveStyle = styles(
    dimension.windowWidth,
    dimension.windowHeight,
    dimension.isPortrait,
  );

  useFocusEffect(
    useCallback(() => {
      getWishlistItems();
    }, []),
  );

  useEffect(() => {
    getWishlistItems();
  }, []);

  const getWishlistItems = async () => {
    await firestore()
      .collection('wishlist')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              const responseData = {id: doc.id, ...doc.data()};
              result.push(responseData);
              // console.log("responseData : ",result)
            }
          });
          setWishlistProducts(result);
          // console.log("wishlist : ",wishlistProduct)
        } else {
          setWishlistProducts([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateArray = productInfo => {
    const result = wishlistProduct.filter(x => {
      return x.id !== productInfo.id;
    });
    setWishlistProducts(result);
  };

  const removeItem = async item => {
    //remove from cart
    await firestore()
      .collection('wishlist')
      .doc(item.id)
      .delete()
      .then(() => {
        updateArray(item);
        console.log('removed', wishlistProduct);
      });
  };
  const navigateToShop = () =>{
    navigation.navigate('Shop',{type:'all'})
  }

  const addToCart =async item => {
    await firestore()
    .collection('Cart')
    .where('userId', '==', userId)
    .where('productId', '==', item.productId)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        firestore().collection('Cart').add({
          created: Date.now(),
          description: item.description,
          name: item.name,
          price: item.price,
          quantity: 1,
          userId: userId,
          productId: item.id,
          image: item.image,
        });
        dispatch(updateCartCount(cartCount + 1));
      } else {
        firestore()
          .collection('Cart')
          .doc(snapshot?.docs[0].id)
          .update({
            quantity: parseInt(snapshot?.docs[0].data().quantity + 1),
          });
      }
    });
  };

  return (
    <View style={responsiveStyle.container}>
      <FlatList
        data={wishlistProduct}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: colors.primaryGreen,
                }}>
                Your Wishlist is Empty
              </Text>
              <TouchableOpacity style={{padding:15}} onPress={navigateToShop}>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                    color: colors.black,
                  }}>
                  Go To Shop
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        renderItem={({item, index}) => {
             
          return (
            <View style={responsiveStyle.productView}>
              <Image
                source={{uri: item.image}}
                style={responsiveStyle.productImage}
              />

              <View style={responsiveStyle.secondView}>
                <Text style={responsiveStyle.title} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={responsiveStyle.desc} numberOfLines={2}>
                  {item.description}
                </Text>

                <View style={responsiveStyle.bottomView}>
                  <Text style={responsiveStyle.price}>₹ {item.price}</Text>

                  <TouchableOpacity
                    style={responsiveStyle.cartView}
                    onPress={() => addToCart(item)}>
                    <Text style={responsiveStyle.cartText}>Add To Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={responsiveStyle.removeView}
                onPress={() => removeItem(item)}>
                <Image
                  source={require('../../assets/images/delete-white.png')}
                  style={responsiveStyle.remove}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Wishlist;
