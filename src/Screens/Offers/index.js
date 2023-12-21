import React,{useCallback, useEffect, useState} from 'react';
import {View, ScrollView, Text, FlatList} from 'react-native';
import styles from './styles.';
import CustomSearchBar from '../../Components/CustomSearchBar';
import colors from '../../Components/common/colors';
import {useDimensionContext} from '../../context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import fireStore from '@react-native-firebase/firestore'
import Snackbar from 'react-native-snackbar';

const Offers = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const navigation = useNavigation()

  const [offers, setOffers] = useState('');

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:()=><CommonHeaderLeft/>
    })
  },[])

  useFocusEffect(
    useCallback(() => {
      getOffers();
    }),
  );


  const getOffers = async () => {
    await fireStore()
      .collection('offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Offers Found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            console.log(document);
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOffers(objArray);
        }
      });
  };


  return (
    <View style={responsiveStyle.main}>
      <ScrollView
        style={responsiveStyle.container}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <CustomSearchBar />

        <FlatList
          data={offers}
          extraData={offers}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={responsiveStyle.contentStyle}
          keyExtractor={(item, index) => String(index)}
          renderItem={({item, index}) => {
            return (
              <View style={responsiveStyle.renderView}>
                {/* start design */}
                <View style={responsiveStyle.offCircleView}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>

                <View
                  style={{
                    width: '64%',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                    padding: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: colors.primaryGreen,
                        fontSize: 50,
                      }}>
                      {item.offer}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 16,
                        }}>
                        %
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 16,
                        }}>
                        OFF
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          fontFamily: 'Lato-Bold',
                          color: colors.black,
                          fontSize: 18,
                        }}>
                        {item.head}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.black_level_3,
                          fontSize: 12,
                        }}>
                        {item.subHead}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                  }}>
                  <View style={responsiveStyle.circleCenter}></View>
                  <View style={[responsiveStyle.circleCenter,{marginBottom:-25/2}]}></View>
                </View>

                <View
                  style={{
                    width: '25%',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                    paddingRight: 15,
                    paddingVertical: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      color: colors.black_level_3,
                      fontSize: 14,
                    }}>
                    Use Code
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      justifyContent: 'center',
                      borderRadius: 15,
                      backgroundColor: colors.primaryGreen,
                      overflow: 'hidden',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.white,
                        textAlign: 'center',
                      }}>
                      {item.offerCode}
                    </Text>
                  </View>
                </View>

                {/* end Design */}
                <View style={{marginLeft: -25 / 2}}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Offers;
