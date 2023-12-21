import React,{useState,useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {useDimensionContext} from '../../../../context';
import colors from '../../../../Components/common/colors';
import firestore from '@react-native-firebase/firestore';

const Banner = () => {

  const [bannerItems,setBannerItems] = useState([])
  const dimensions = useDimensionContext();

  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  useEffect(()=>{
   getBanner()
  },[])

  const getBanner = async () =>{
    await firestore().collection('banner').get().then((snapshot)=>{
      if(!snapshot.empty){
        const result = []
        snapshot.docs.forEach(doc=>{
          if(doc.exists){
         //   console.log("doc : ",doc.data().image)
            result.push(doc.data())
          }
        })
        setBannerItems(result)
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <View>
      <FlatList
        data={bannerItems}
        horizontal
        nestedScrollEnabled
        keyExtractor={(item,index)=>String(index)}
        showsHorizontalScrollIndicator={false}
        renderItem={(item, index) => {
          return (
            <ImageBackground source={{uri:item.item.image}} style={responsiveStyle.banner}>
              <View style={responsiveStyle.innerView}>
                <Text style={responsiveStyle.head}>{item.item.head}</Text>
                <Text style={responsiveStyle.content}>{item.item.description}</Text>
              </View>
              <TouchableOpacity style={responsiveStyle.touch}>
                <Text style={responsiveStyle.touchText}>Shop Now</Text>
              </TouchableOpacity>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default Banner;
