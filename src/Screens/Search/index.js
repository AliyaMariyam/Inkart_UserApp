import React ,{useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import styles from './styles';
import CustomSearchBar from '../../Components/CustomSearchBar';
import OfferProducts from '../../Components/OfferProducts';
import TrendingCategories from './components/TrendingCategories';
import { useNavigation } from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';

const Search = () => {

  const navigation = useNavigation()

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:()=><CommonHeaderLeft/>
    })
  },[])

  return (
    <View style={styles.main}>

      <ScrollView
        style={styles.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearchBar />
        <TrendingCategories />
        <OfferProducts />
      </ScrollView>
      
    </View>
  );
};

export default Search;
