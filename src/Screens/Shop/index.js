import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useDimensionContext} from '../../context';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import CommonHeaderRight from '../../Components/CommonHeaderRight';
import CustomSearchBar from '../../Components/CustomSearchBar';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import CommonEmpty from '../../Components/CommonEmpty';

const Shop = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {type} = route.params;
  const dimensions = useDimensionContext();
  const [selectedCategory, setSelectedCategory] = useState(type);
  const [products, setProducts] = useState([]);

  const categories = useSelector(state => state.categories);
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
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
              const responseData = {id:docs.id,...docs?.data()}
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

  useEffect(() => {
   // console.warn('type ', type);
    if (type === 'all') {
      setSelectedCategory('Shop');
    }
  }, [type]);

  useEffect(() => {
    //console.warn('selected category ', selectedCategory);
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight cart={true} />,
      title: selectedCategory,
    });
  }, [selectedCategory]);

  const handleCategories = async item => {
    // console.warn(item.id);
    setSelectedCategory(item.name);
    await firestore()
      .collection('products')
      .where('categoryId', '==', item.id)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(docs => {
            if (docs.exists) {
              console.log('doc : ', docs);
              const responseData = {id:docs.id,...docs?.data()}
              result.push(responseData);
            }
          });
          setProducts(result.length > 0 ? result : []);
        } else {
          setProducts([]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleRenderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => handleCategories(item)}
        style={responsiveStyle.catItemView}>
        <Text style={responsiveStyle.catItem}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const handleProduct = item =>{
    navigation.navigate('ProductDetails',{product:item})
  }

  const handleProductsRender = ({item, index}) => {
    return (
      <TouchableOpacity style={responsiveStyle.flatListView}
      onPress={()=>handleProduct(item)}>
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
              <Text style={responsiveStyle.qunText1}>-</Text>
              <Text style={responsiveStyle.qunText2}>0</Text>
              <Text style={responsiveStyle.qunText1}>+</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const emptyComponent = () =>{
  return <CommonEmpty title={'No Products Available'}/>
  }

  return (
    <View>
      <View>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={handleRenderItem}
          style={responsiveStyle.categories}
          contentContainerStyle={responsiveStyle.contentStyle}
        />
      </View>
      <View style={responsiveStyle.commonPadding}>
        <CustomSearchBar filter={true} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={products}
          renderItem={handleProductsRender}
          ListEmptyComponent={emptyComponent}
        />
      </View>
    </View>
  );
};

export default Shop;
