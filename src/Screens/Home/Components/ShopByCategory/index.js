import React,{useState,useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { useDispatch,useSelector } from 'react-redux';

import styles from './styles';
import {useDimensionContext} from '../../../../context';
import colors from '../../../../Components/common/colors';
import { showCategories } from '../../../../storage/action';


const ShopByCategory = () => {

  const [categories,setCategories] = useState([])
  const dispatch = useDispatch()
  const navigation = useNavigation()


  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  useEffect(()=>{
   getCategories()
  },[])

  const getCategories = async () =>{
   await firestore().collection('categories').get().then((snapshot)=>{
    if(!snapshot.empty){
      const result = []
      snapshot.docs.forEach(doc=>{
        if(doc.exists){
          const responseData = {id:doc.id, ...doc?.data()}
          result.push(responseData)
        }
      });
      setCategories(result)
      dispatch(showCategories(result))
    }
    
   })
  }

  const handleCategories = (index) =>{
    navigation.navigate('Categories',{catIndex:index})
  }


  return (
    <View style={responsiveStyle.container}>
      <Text style={responsiveStyle.head}>Shop By Category</Text>

      <FlatList
        data={categories}
        numColumns={4}
        nestedScrollEnabled
        contentContainerStyle={responsiveStyle.flatList}
        keyExtractor={(item,index)=> String(index)}
        renderItem={({item, index}) => {
          const categoriesColor =
            index % 4 === 0
              ? colors.category1
              : index % 4 === 1
              ? colors.category2
              : index % 4 === 2
              ? colors.category3
              : index % 4 === 3
              ? colors.category4
              : colors.category1;
       //   console.log('categoriesColor : ', categoriesColor);
          return (
            <TouchableOpacity style={responsiveStyle.innerView} onPress={()=>handleCategories(index)}>
              <View
                style={[
                  responsiveStyle.imageView,
                  {backgroundColor: categoriesColor},
                ]}>
                <Image source={{uri:item.image}} style={responsiveStyle.image} />
              </View>
              <Text style={responsiveStyle.itemName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ShopByCategory;
