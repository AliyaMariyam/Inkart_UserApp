import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {useDimensionContext} from '../../context';
import CommonSectionHeader from '../commonSectionHeader';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartCount } from '../../storage/action';

const OfferProducts = () => {
  const [products, setProducts] = useState([]);
  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

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
  return (
    <View style={responsiveStyle.container}>
      <CommonSectionHeader
        head={'Say Hello to Offers'}
        content={'Best price ever for all the time'}
        rightText={'See All'}
      />
      <View>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          keyExtractor={(item, index) => String(index)}
          // renderItem={({item,index}) => {<RenderItem item={item} index={index}/>}}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
};

const RenderItem = ({item, index}) => {
//  console.warn(item);
  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

   const userId = useSelector(state=>state.userId)
  const [qun, setQun] = useState(0);
  const dispatch = useDispatch()

  const navigation = useNavigation();

  const handleProduct = item => {
    navigation.navigate('ProductDetails', {product: item});
  };

  const addToCart = async () =>{
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
          dispatch(updateCartCount(cartCount + 1))
        } else {
          firestore()
            .collection('Cart')
            .doc(snapshot?.docs[0].id)
            .update({
              quantity: parseInt(snapshot?.docs[0].data().quantity + 1),
            });
        }
      });
  }

  return (
    <TouchableOpacity
      style={responsiveStyle.flatListView}
      onPress={() => handleProduct(item)}>
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
              <Text style={responsiveStyle.offText}>10%</Text>
            </View>
          </View>
          <View style={responsiveStyle.qunView}>
            <TouchableOpacity
              onPress={() => {
                setQun(qun <= 0 ? qun : qun - 1);
              }}>
              <Text style={responsiveStyle.qunText1}>-</Text>
            </TouchableOpacity>
            <Text style={responsiveStyle.qunText2}>{qun}</Text>
            <TouchableOpacity 
            onPress={() =>{ 
              setQun(qun + 1);
              addToCart()
            }}
            >
              <Text style={responsiveStyle.qunText1}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OfferProducts;
