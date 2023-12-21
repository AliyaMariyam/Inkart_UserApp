import {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useDimensionContext} from '../../context';
import styles from './styles';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import CommonButton from '../../Components/CommonButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
//navigator.geolocation = require('@react-native-community/geolocation');
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../Components/common/colors';
import Snackbar from 'react-native-snackbar';
import RazorpayCheckout from 'react-native-razorpay';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {updateCartCount} from '../../storage/action';

const AddAddress = () => {
  const [newPosition, setNewPosition] = useState({
    latitude: 37.78825, // The initial latitude of the map
    longitude: -122.4324, // The initial longitude of the map
    latitudeDelta: 0.0922, // The delta for the latitude (controls zoom level)
    longitudeDelta: 0.0421, // The delta for the longitude (controls zoom level)
  });
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const route = useRoute();


  const userId = useSelector(state => state.userId);
  const email = useSelector(state=>state.email)
  const mobileNumber = useSelector(state=>state.mobileNumber)
  const firstName = useSelector(state=>state.firstName)
  const lastName = useSelector(state=>state.lastName)

  const {cartProducts, total} = route.params;
  // console.warn(total)
  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      console.log('info', info.coords);
      setNewPosition({
        latitude: info.coords?.latitude ?? 0,
        longitude: info.coords?.longitude ?? 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    });
    Snackbar.show({
      text: 'Current location is fetched',
      duration: Snackbar.LENGTH_SHORT, // or Snackbar.LENGTH_LONG
      backgroundColor: colors.primaryGreen,
      textColor: colors.white,
    });
  };

  useEffect(() => {
    getCurrentLocation();
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft type="back" />,
    });
  }, []);

  const handleCreateOrder = async paymentID => {
    const smallId = paymentID.slice(4, 12);

    await firestore()
      .collection('orders')
      .add({
        orderId: smallId,
        created: Date.now(),
        updated: Date.now(),
        orderStatus: 'Ordered',
        totalAmount: total,
        address: address,
        userId: userId,
        paymentMethod: 'online',
        cartItems: cartProducts,
        userName: firstName,
        userEmail: email,
        userPhone: mobileNumber,
        expectedDelDate: '',
      })
      .then(async resp => {
        await firestore()
          .collection('Cart')
          .where('userId', '==', userId)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref
                .delete()
                .then(() => {})
                .catch(err => {
                  console.warn(err);
                });
            });
            
            Snackbar.show({
              text: 'Your Order Is Successfully Placed',
              duration: Snackbar.LENGTH_SHORT, // or Snackbar.LENGTH_LONG
              backgroundColor: colors.primaryGreen,
              textColor: colors.white,
            });
            setTimeout(() => {
              setLoading(false);
              navigation.goBack();
              dispatch(updateCartCount(0));
            }, 2000);
            
          });
       
      });
    // setTimeout(() => {
    //   setLoading(false)
    //   navigation.goBack()
    // }, 12000);
  };

  const onButtonPress = () => {
    var options = {
      description: 'Inkart Products Purchase',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_CXo5HbmQ83IYL0', // Your api key
      amount: parseInt(total, 10) * 100, //paisa lek convert cheythu
      name: 'Inkart',
      prefill: {
        email: email,
        contact: mobileNumber,
        name: `${firstName} ${lastName}`,
      },
      theme: {color: colors.pg},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        // console.log("payment data : ",data)

        handleCreateOrder(data.razorpay_payment_id);
        setLoading(true);
      })
      .catch(error => {
        // handle failure
        Snackbar.show({
          text: 'Your Order Is Failed',
          duration: Snackbar.LENGTH_SHORT, // or Snackbar.LENGTH_LONG
          backgroundColor: colors.red,
          textColor: colors.white,
        });
        navigation.goBack();
      });
  };

  return (
    <View style={responsiveStyle.container}>
      <Modal animationType="fade" transparent={true} visible={loading}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.7)',
            justifyContent:'center',
            alignItems:'center'
          }}>
          <ActivityIndicator size={'large'} color={colors.white} />
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always">
        <GooglePlacesAutocomplete
          placeholder="Search Location"
          currentLocation={true}
          fetchDetails={true}
          currentLocationLabel="Current Location"
          query={{
            key: 'AIzaSyBxr99617iBz0j-ao6GzTTl_Kq0TuvZwg4',
            language: 'en',
          }}
          styles={{
            textInput: responsiveStyle.textInput,
            predefinedPlacesDescription: responsiveStyle.description,
          }}
          onPress={(data, details) => {
            // console.log("data : ",data)
            // console.log("details : ",details)
            const location = details?.geometry.location;
            console.log('location', location);
            const positionData = {
              latitude: location?.lat ?? 0,
              longitude: location?.lng ?? 0,
              latitudeDelta: 0.001,
              longitudeDelta: 0.001,
            };
            setNewPosition(positionData);
            setAddress(data?.description);
            // console.log("address:",address)
          }}
        />

        {newPosition && (
          <MapView
            style={responsiveStyle.mapView}
            initialRegion={newPosition}
            region={newPosition}
            showsUserLocation={true}
            followsUserLocation={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}
            scrollEnabled={true}
            provider={PROVIDER_GOOGLE}
            showsMyLocationButton={true}>
            <Marker
              title={address}
              description="This is your marker"
              coordinate={newPosition}
            />
          </MapView>
        )}

        {address && (
          <View style={{padding: 15}}>
            <Text
              style={{
                color: colors.black,
                fontFamily: 'Lato-Regular',
                fontSize: 18,
              }}>
              {address}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={responsiveStyle.TouchView}
          onPress={getCurrentLocation}>
          <View style={responsiveStyle.iconView}>
            <FontAwesome name="location-arrow" size={20} color={colors.white} />
          </View>

          <Text style={responsiveStyle.touchText}>Your Current Location</Text>
        </TouchableOpacity>

        <CommonButton
          buttonText={'Confirm Location & Proceed'}
          onButtonPress={onButtonPress}
        />
      </ScrollView>
    </View>
  );
};

export default AddAddress;
