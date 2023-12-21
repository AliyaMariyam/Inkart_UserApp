import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDimensionContext} from '../../context';
import CustomSearchBar from '../../Components/CustomSearchBar';
import colors from '../../Components/common/colors';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import Snackbar from 'react-native-snackbar';

const Orders = () => {
  
  const [ordersArray, setOrdersArray] = useState([]);
  const navigation = useNavigation();
  const dimension = useDimensionContext();
  const responsiveStyle = styles(dimension.windowWidth, dimension.windowHeight);
  const userId = useSelector(state => state.userId);
  const isFocused = useIsFocused()

  useEffect(()=>{
    if(isFocused){
      getOrders()
    }
  },[isFocused])

  useEffect(() => {
    getOrders();
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  });

  const getOrders = async () => {
    await firestore()
      .collection('orders')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setOrdersArray([]);
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            if (document.exists) {
              const result = {id: document.id, ...document?.data()};
              objArray.push(result);
            }
          });
          setOrdersArray(objArray);
        }
      });
  };

  const handleSearch = async text => {
    try {
      const snapshot = await firestore()
        .collection('orders')
        .where('userId', '==', userId)
        .orderBy('orders')
        .startAt(String(text))
        .endAt(String(text) + '\uf8ff')
        .get();
  
      if (snapshot.empty) {
        setOrdersArray([]);
      } else {
        let objArray = [];
        snapshot.docs.forEach(document => {
          if (document.exists) {
            const result = { id: document.id, ...document.data() };
            objArray.push(result);
          }
          setOrdersArray(objArray);
        });
       
        //console.warn("ordersArray : ", ordersArray); 
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  

  const navigateToDetails = (item) =>{
    navigation.navigate('OrderDetails',{item : item})
  }

  return (
    <View style={responsiveStyle.container}>
      <CustomSearchBar
        filter={true}
        placeholder={'Search using order Id'}
        mike={false}
        onChangeText={handleSearch}
      />
      <FlatList
        data={ordersArray}
       // extraData={ordersArray}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                padding: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: colors.primaryGreen,
                }}>
                Your Orders is Empty
              </Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
        renderItem={({item}) => {
         // console.warn("item : ",item.cartItems.length)
          return (
            <TouchableOpacity style={responsiveStyle.flatView} onPress={()=>navigateToDetails(item)}>
              <View style={responsiveStyle.innerView}>
                <View>
                  <Text style={responsiveStyle.orderId}>
                    ID: {item.orderId}
                  </Text>
                  <Text style={responsiveStyle.orderedDate}>
                    Ordered on : {item.created}
                  </Text>
                  <Text style={responsiveStyle.address}>{item.address1}</Text>
                  <Text style={responsiveStyle.address}>{item.address2}</Text>

                  <Text style={responsiveStyle.paidText}>
                    Paid:
                    <Text style={responsiveStyle.greenText}>
                      {item.totalAmount}
                    </Text>
                     Items :
                    <Text style={responsiveStyle.greenText}>
                      {item.cartItems?.length}
                    </Text>
                  </Text>
                </View>

                <Image
                  source={require('../../assets/images/map.webp')}
                  style={responsiveStyle.mapImage}
                />
              </View>

              <View style={responsiveStyle.bottomView}>
                <Text style={responsiveStyle.bottomText}>Order Shipped</Text>
                <Text style={responsiveStyle.bottomText}>
                  Rate & Review Products
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
};

export default Orders;
