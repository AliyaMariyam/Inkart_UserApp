import React, {useEffect, useState} from 'react';
import {View, Text, FlatList,Image} from 'react-native';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
import {useDimensionContext} from '../../../../context';
import colors from '../../../../Components/common/colors';
import { useSelector } from 'react-redux';

const TrendingCategories = () => {
 
  const categories = useSelector(state=>state.categories)
  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );



  return (
    <View style={responsiveStyle.main}>
      <Text style={responsiveStyle.title}>Trending Category</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={responsiveStyle.flatList}
        keyExtractor={({item, index}) => String(index)}
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
              : category1;

          return (
            <View style={[responsiveStyle.imageContainer, {backgroundColor:categoriesColor}]}>
              <Image source={{uri: item.image}} style={responsiveStyle.image} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default TrendingCategories;
