import React, {useState, useEffect, useCallback} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import colors from '../common/colors';
import {useDimensionContext} from '../../context';
import CommonSectionHeader from '../commonSectionHeader';
import firestore from '@react-native-firebase/firestore';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount, updateWishIds} from '../../storage/action';
import Snackbar from 'react-native-snackbar';


const ProductScroll = props => {
  const {isNavigationNeeded} = props;
  const [products, setProducts] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  const wishIds = useSelector(state => state.wishIds);

  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);
  

  const getProducts = async () => {
    await firestore()
      .collection('products')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(docs => {
            if (docs.exists) {
              const responseData = {id: docs.id, ...docs?.data()};
              result.push(responseData);
            }
          });
          setProducts(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleProduct = item => {
    if (route.name === 'ProductDetails') {
      isNavigationNeeded(true, item);
      // console.warn("Handle product worked if condition")
    } else {
      navigation.navigate('ProductDetails', {
        product: item,
      });
      // console.warn("Handle product worked else condition")
    }
  };

  const addToCart = async item => {
    // console.warn(item);
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', item.id)
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

  const addToWishlist = async item => {
    await firestore()
      .collection('wishlist')
      .where('userId', '==', userId)
      .where('productId', '==', item.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore()
            .collection('wishlist')
            .add({
              created: Date.now(),
              updated: Date.now(),
              description: item.description,
              name: item.name,
              price: item.price,
              userId: userId,
              image: item.image,
              categoryId: item.categoryId,
              productId: item.id,
            })
            .then(resp => {
              dispatch(updateWishIds([...wishIds,item.id]))
              Snackbar.show({
                text: 'Item added to wishlist',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
            });
        } else {
          Snackbar.show({
            text: 'Item is already in your wishlist',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.primaryGreen,
            textColor: colors.white,
          });
        }
      });
  };

  return (
    <View style={responsiveStyle.container}>
      <CommonSectionHeader
        head={'Newly Added'}
        content={'Pay less, Get more'}
        rightText={'See All'}
      />
      <View>
        <FlatList
          data={products}
          horizontal
          nestedScrollEnabled
          keyExtractor={(item, index) => String(index)}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleProduct(item)}
                style={{
                  height: 275,
                  width: 150,
                  padding: 15,
                  marginRight: 15,
                  marginVertical: 15,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: colors.primaryGreen,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    addToWishlist(item);
                  }}>
                  <Image
                    source={
                      wishIds.includes(item.id)
                        ? require('../../assets/images/wishred.png')
                        : require('../../assets/images/wishlist.png')
                    }
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: 'contain',
                      alignSelf: 'flex-end',
                    }}
                  />
                </TouchableOpacity>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: 75,
                    height: 75,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Lato-Bold',
                    fontSize: 20,
                    color: colors.black,
                  }}
                  numberOfLines={1}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Lato-Regular',
                    fontSize: 18,
                    color: colors.black,
                  }}
                  numberOfLines={2}>
                  {item.description}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      fontSize: 20,
                      color: colors.black,
                    }}>
                    {item.price}
                  </Text>
                  <TouchableOpacity
                    onPress={() => addToCart(item)}
                    style={{
                      padding: 5,
                      backgroundColor: colors.primaryGreen,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        fontSize: 20,
                        color: colors.white,
                      }}>
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ProductScroll;
