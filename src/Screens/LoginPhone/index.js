import React, {useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import colors from '../../Components/common/colors';
import {validatePhoneNumber,validateOTP} from '../../Components/common/validation';
import { useDimensionContext } from '../../context';

const LoginPhone = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const dimensions = useDimensionContext()

  const responsiveStyle = styles(dimensions.windowWidth,dimensions.windowHeight)

  const handlePhoneSignIn = async () => {
    try {
      if (validatePhoneNumber(phoneNumber)) {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        if (confirmation) {
          Snackbar.show({
            text: 'Send OTP to your device',
            duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
            backgroundColor: colors.primaryGreen,
            textColor: colors.black,
          });
          setConfirm(confirmation);
          setShowOtp(true);
        }
      }else{
        Snackbar.show({
          text: 'Mobile number does not include any alphabets or special characters',
          duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
          backgroundColor: colors.red,
          textColor: colors.white,
        });
        // console.log('Typed number :',phoneNumber)
        // console.log('validatePhoneNumber',validatePhoneNumber())
      }
    } catch (error) {
      Snackbar.show({
        text: 'Phone number is invalid',
        duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  const handleOtpSignin = async () => {
    if (otp.trim() !== '' && validateOTP(otp)) {
      const resp = await confirm.confirm(otp.trim());
      if (resp) {
        Snackbar.show({
          text: 'Your Phone Number Is Verified Successfully',
          duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
          backgroundColor: colors.primaryGreen,
          textColor: colors.white,
        });
      }
      navigation.navigate('Home');
    }
    else{
      Snackbar.show({
        text: 'Enter correct OTP',
        duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
        backgroundColor: colors.primaryGreen,
        textColor: colors.white,
      });
    }
    
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={responsiveStyle.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={responsiveStyle.topBg}
      />
      <ScrollView
        style={responsiveStyle.scrollView}
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={responsiveStyle.logo}
        />
        <Text style={responsiveStyle.loginAccount}>Login With Phone</Text>

        <CustomTextInput
          type="phone"
          handleText={text => setPhoneNumber(text)}
          placeholder="Phone Number"
        />

        {showOtp ? (
          <CustomTextInput
            handleText={text => setOtp(text)}
            placeholder="Enter Your OTP"
          />
        ) : null}

        <CustomButton
          buttonText={showOtp ? 'Verify OTP' : 'Sign In with Phone'}
          handleButtonPress={showOtp ? handleOtpSignin : handlePhoneSignIn}
          type="primary"
        />

        <Text style={responsiveStyle.createNew} onPress={handleGoToLogin}>
          Go To Login
        </Text>
      </ScrollView>
    </View>
  );
};

export default LoginPhone;
