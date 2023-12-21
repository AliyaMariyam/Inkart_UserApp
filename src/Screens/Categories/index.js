import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDimensionContext} from '../../context';
import CustomSearchBar from '../../Components/CustomSearchBar';
import firestore from '@react-native-firebase/firestore';
import colors from '../../Components/common/colors';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import { useSelector } from 'react-redux';

const Categories = () => {
  
  const categories = useSelector(state=>state.categories)
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(0);
  const route = useRoute()

  const {catIndex = 0} = route?.params ?? {}
  

  const dimensions = useDimensionContext();
  const navigation = useNavigation();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  useEffect(()=>{
    if(catIndex){
      setActive(catIndex)
    }
  },[catIndex])

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });

   
    getProducts();
  }, []);

  const handleCategoryTouch = index => {
    setActive(index);
  };


  const getProducts = async () => {
    await firestore()
      .collection('products')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
            if (doc.exists) {
              result.push(doc.data());
            }
          });
          setProducts(result);
        }
      });
  };

  const handleProduct = (item) =>{
   navigation.navigate('ProductDetails',{product:item})
  }

  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearchBar />
        <View style={{flexDirection: 'row'}}>
          {/* SideBar */}
          <View style={responsiveStyle.rowStyle}>
            <FlatList
              data={categories}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={responsiveStyle.flatList}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      responsiveStyle.imageTouch,
                      {
                        backgroundColor:
                          index === active ? colors.white : 'transparent',
                      },
                    ]}
                    onPress={() => handleCategoryTouch(index)}>
                    <Image
                      source={{uri: item.image}}
                      style={responsiveStyle.catImage}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* content */}
          <ScrollView
            //  style={{backgroundColor:'red'}}
            showsVerticalScrollIndicator={false}>
            <View>
              <ImageBackground
                style={responsiveStyle.backImage}
                source={require('../../assets/images/home1bg.jpg')}>
                {categories.forEach(category => {
                  return (
                    <>
                      <Text style={responsiveStyle.catName}>
                        {categories[active]?.name}
                      </Text>
                      <Text style={responsiveStyle.catDesc}>
                        {categories[active]?.description}
                      </Text>
                    </>
                  );
                })}
                <Text style={responsiveStyle.catName}>
                  {categories[active]?.name}
                </Text>
                <Text style={responsiveStyle.catDesc}>
                  {categories[active]?.description}
                </Text>
              </ImageBackground>

              <FlatList
                data={products}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={responsiveStyle.productStyle}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity style={responsiveStyle.productContainer}
                    onPress={()=>handleProduct(item)}>
                      <View style={responsiveStyle.imageBg}>
                        <Image
                          source={{uri: item.image}}
                          style={responsiveStyle.productImage}
                        />
                      </View>
                      <Text style={responsiveStyle.productName}>
                        {item.name}
                      </Text>
                      <Text style={responsiveStyle.productDesc}>
                        {' '}
                        ₹ {item.price}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;
