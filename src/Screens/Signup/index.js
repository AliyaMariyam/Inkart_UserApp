import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  validateEmail,
  validatePhoneNumber,
} from '../../Components/common/validation';
import Snackbar from 'react-native-snackbar';
import colors from '../../Components/common/colors';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: '846857905406-7e3l0jhhbjn7df2o2qqjp2lu9hba0t30.apps.googleusercontent.com',
    });
  })

  const handleButtonPress = () => {
   // console.warn('Pressed');
  };

  const handleGoogleSignin = async () => {
     try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog:true
      })
     } catch (error) {
      console.warn(error)
     }
  };

  const handleGoToLogin = () => {
    navigation.navigate('Login');
  };

  //async await means -> aa function vendi wait cheyyanam
  const handleSignup = async () => {
    // Trim all input values
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPhoneNumber = phoneNumber.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
  
    if (
      !trimmedUsername ||
      !trimmedEmail ||
      !trimmedPhoneNumber ||
      !trimmedPassword ||
      !trimmedConfirmPassword
    ) {
      setError('Please fill all the fields');
      return;
    }
  
    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const userSnapshot = await firestore()
        .collection('users')
        .where('username', '==', trimmedUsername)
        .where('email', '==', trimmedEmail)
        .get();
  
      if (!userSnapshot.empty) {
        setError(
          'Username and email already exist. Please use a different email or go to Login.'
        );
        return;
      }
  
      if (!validateEmail(trimmedEmail)) {
        setError('Email is not valid');
        return;
      }
  
      if (!validatePhoneNumber(trimmedPhoneNumber)) {
        setError('Mobile Number is not valid');
        return;
      }
  
      const userData = {
        username: trimmedUsername,
        email: trimmedEmail,
        mobilenumber: trimmedPhoneNumber,
        password: trimmedPassword,
        created: String(new Date()),
        update: String(new Date()),
        active:1,
      };
  
      await firestore().collection('users').add(userData);
      Snackbar.show({
        text: 'New Account is created',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.primaryGreen,
        textColor: colors.white,
      });
      navigation.navigate('Home');
      setError(null);
    } catch (error) {
      console.error('Error', error);
      setError('An error occurred during registration');
    }
  };
  

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={styles.topBg}
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={styles.logo}
        />
        <Text style={styles.loginAccount}>Sign Up Account</Text>

        {error != null ? (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <CustomTextInput
          handleText={text => setUsername(text)}
          placeholder="Username"
        />

        <CustomTextInput
          type="email"
          handleText={text => setEmail(text)}
          placeholder="Email address"
        />

        <CustomTextInput
          type="phone"
          handleText={text => setPhoneNumber(text)}
          placeholder="Phone Number"
        />

        <CustomTextInput
          type="password"
          handleText={text => setPassword(text)}
          placeholder="Password"
        />

        <CustomTextInput
          type="password"
          handleText={text => setConfirmPassword(text)}
          placeholder="Confirm Password"
        />

        <CustomButton
          buttonText={'Sign Up'}
          handleButtonPress={handleSignup}
          type="primary"
        />

        <View style={styles.dottedLineContainer}>
          <View style={styles.overflow}>
            <View style={styles.dashedLine} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.dashedText}>or Sign up With</Text>
          </View>
        </View>

        <CustomButton
          buttonText={'Sign Up with Google'}
          handleButtonPress={handleGoogleSignin}
          type="secondary"
          icon={require('../../assets/images/google.png')}
        />

        <Text style={styles.createNew} onPress={handleGoToLogin}>
          Go To Login
        </Text>
      </ScrollView>
    </View>
  );
};

export default SignUp;
