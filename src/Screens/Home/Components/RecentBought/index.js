import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { useDimensionContext } from '../../../../context';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const RecentBought = () => {
    const dimensions = useDimensionContext()
    const responsiveStyle = styles(dimensions.windowWidth,dimensions.windowHeight)
  // const recentItems = [
  //   {
  //     id: 0,
  //     image: require('../../../../assets/images/apple.png'),
  //   },
  //   {
  //     id: 1,
  //     image: require('../../../../assets/images/strawberry.png'),
  //   },
  //   {
  //     id: 2,
  //     image: require('../../../../assets/images/lemon.png'),
  //   },
  //   {
  //     id: 3,
  //     image: require('../../../../assets/images/bananas.png'),
  //   },
  //   {
  //     id: 4,
  //     image: require('../../../../assets/images/grapes.png'),
  //   },
  // ];

  const [recentItems, setRecentItems] = useState([]);
  const navigation = useNavigation();

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
              console.log('doc : ', docs);
              result.push(docs.data());
            }
          });
          setRecentItems(result);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleProduct = (item) =>{
   navigation.navigate('ProductDetails',{product:item})
  }

  return (
    <View style={responsiveStyle.container}>
      <Text style={responsiveStyle.headerText}>Buy from Recently RecentBought</Text>
      <FlatList
        data={recentItems}
        horizontal
        nestedScrollEnabled
        keyExtractor={(item,index)=> String(index)}
        showsHorizontalScrollIndicator={false }
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity style={responsiveStyle.contentView} onPress={()=>handleProduct(item)}>
              <Image source={{uri:item.image}} style={responsiveStyle.image}/>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RecentBought;
