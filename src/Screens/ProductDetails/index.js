import {useEffect, useRef, useState} from 'react';
import {useDimensionContext} from '../../context';
import {Image, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useRoute, useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import CommonHeaderRight from '../../Components/CommonHeaderRight';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../Components/common/colors';
import StarRating from 'react-native-star-rating-widget';
import MoreInfo from './Components/MoreInfo';
import ExtraInfo from './Components/ExtraInfo';
import ProductReview from './Components/ProductReview';
import DeliveryInfo from './Components/DeliveryInfo';
import ProductScroll from '../../Components/ProductScroll';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {updateCartCount, updateWishIds} from '../../storage/action';
import Snackbar from 'react-native-snackbar';

const ProductDetails = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(5);
  const [qnt, setQnt] = useState(1);
  const scrollRef = useRef(null);
  const route = useRoute();
  const {product} = route.params;
  const [productDetailsObject, setProductDetails] = useState({});

  const userId = useSelector(state => state.userId);
  const cartCount = useSelector(state => state.cartCount);
  const wishIds = useSelector(state => state.wishIds);

  const dispatch = useDispatch();

  useEffect(() => {
    //console.warn('selected category ', selectedCategory);
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight cart={true} share={true} />,
      title: '',
    });
  }, []);

  useEffect(() => {
    setProductDetails(product);
  }, [product]);

  const navigationNeeded = (val, item) => {
    if (val) {
      scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
      setProductDetails(item);
      // console.warn("navigationNeeded function in product details worked")
      // console.warn("item ",item)
    }
  };

  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowWidth,
    dimensions.isPortrait,
  );

  const handleQuantity = type => {
    if (type === 'plus') {
      setQnt(qnt + 1);
    } else {
      if (qnt == 1) {
        return;
      } else {
        setQnt(qnt - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    await firestore()
      .collection('Cart')
      .where('userId', '==', userId)
      .where('productId', '==', productDetailsObject.id)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          firestore().collection('Cart').add({
            created: Date.now(),
            description: productDetailsObject.description,
            name: productDetailsObject.name,
            price: productDetailsObject.price,
            quantity: qnt,
            userId: userId,
            productId: productDetailsObject.id,
            image: productDetailsObject.image,
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
              dispatch(updateWishIds([...wishIds, item.id]));
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
    <View>
      <ScrollView ref={scrollRef}>
        {/* <Ionicons name="heart-outline" size={30} color={colors.red} /> */}
        <TouchableOpacity
          style={responsiveStyle.heart}
          onPress={() => {
            addToWishlist(productDetailsObject);
          }}>
          <Image
            source={
              wishIds.includes(productDetailsObject.id)
                ? require('../../assets/images/wishred.png')
                : require('../../assets/images/wishlist.png')
            }
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              alignSelf: 'flex-end',
              marginRight: 15,
            }}
          />
        </TouchableOpacity>

        <Image
          source={{uri: productDetailsObject?.image}}
          style={responsiveStyle.proImage}
        />

        <View style={responsiveStyle.mainView}>
          <View style={responsiveStyle.padding}>
            <Text style={responsiveStyle.name}>
              {productDetailsObject?.name}
            </Text>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StarRating rating={rating} onChange={setRating} />
              <Text
                style={{
                  color: colors.grey,
                  marginLeft: 10,
                  fontFamily: 'Lato-Regular',
                  fontSize: 18,
                }}>
                (1 rating)
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={responsiveStyle.price}>
                ₹ {parseFloat(productDetailsObject?.price).toFixed(2)}
              </Text>
              <Text
                style={{
                  color: colors.primaryGreen,
                  marginLeft: 10,
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                }}>
                25% off
              </Text>
            </View>

            <MoreInfo />

            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.grey,
                paddingVertical: 10,
              }}>
              <Text style={responsiveStyle.descriptionHead}>
                Product Details
              </Text>
              <Text style={responsiveStyle.description}>
                {productDetailsObject?.description}
              </Text>
            </View>

            <ExtraInfo />
            <ProductReview product={product} />
            <DeliveryInfo />
          </View>

          <ProductScroll isNavigationNeeded={navigationNeeded} />
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 25,
          alignSelf: 'center',
          padding: 10,
          borderRadius: 8,
          backgroundColor: colors.primaryGreen,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          width: '95%',
        }}>
        <View
          style={{
            padding: 10,
            borderRadius: 8,
            backgroundColor: colors.white,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => handleQuantity('minus')}>
            <AntDesign name="minus" size={20} color={colors.primaryGreen} />
          </TouchableOpacity>

          <Text
            style={{
              color: colors.primaryGreen,
              fontFamily: 'Lato-Black',
              fontSize: 18,
              marginHorizontal: 15,
            }}>
            {qnt}
          </Text>

          <TouchableOpacity onPress={() => handleQuantity('plus')}>
            <AntDesign name="plus" size={20} color={colors.primaryGreen} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleAddToCart()}>
          <Text
            style={{
              color: colors.white,
              fontFamily: 'Lato-Black',
              fontSize: 18,
            }}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;
