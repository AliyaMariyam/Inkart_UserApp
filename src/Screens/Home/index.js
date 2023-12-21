import React, {useEffect, useRef} from 'react';
import {ScrollView, View, Text} from 'react-native';
import CommonHeader from '../../Components/CommonHeader';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomSearchBar from '../../Components/CustomSearchBar';
import Banner from './Components/Banner';
import RecentBought from './Components/RecentBought';
import ShopByCategory from './Components/ShopByCategory';
import ProductScroll from '../../Components/ProductScroll';
import OfferProducts from '../../Components/OfferProducts';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { updateWishIds } from '../../storage/action';


const Home = () => {

  const userId = useSelector(state=>state.userId)
  const dispatch = useDispatch()
 const isFocused = useIsFocused()
  const scrollRef = useRef(null)

  useEffect(() => {
    getWishIds();
  }, [isFocused]);

  useEffect(()=>{
   if(isFocused){
    scrollRef.current?.scrollTo({ y: 0, animated: true });
   }
  },[isFocused])

  const getWishIds = async () => {
    await firestore()
      .collection('wishlist')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const result = [];
          snapshot.docs.forEach(doc => {
           result.push(doc?.data().productId)
          });
          dispatch(updateWishIds(result))
        } else {
         dispatch(updateWishIds([]))
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.main}>
      <CommonHeader />
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearchBar />
        <Banner />
        <RecentBought />
        <ShopByCategory />
        <ProductScroll />
        <OfferProducts />

        <Text style={styles.footText}>
          Didn't find what you are looking for?
        </Text>
        <View style={styles.footButton}>
          <Text style={styles.footButtonText}>Browse Category</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
