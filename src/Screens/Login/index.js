import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './styles';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import colors from '../../Components/common/colors';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {validateEmail} from '../../Components/common/validation';
import {useDimensionContext} from '../../context';
import {useDispatch} from 'react-redux';
import {login} from '../../storage/action';

const Login = () => {
  const dimensions = useDimensionContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  function onAuthStateChanged(user) {
    //console.warn('onAuthStateChanged : ',user)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const handleButtonPress = () => {
    //console.warn('Pressed');
  };

  const handleSignIn = async () => {
    if (email.trim() !== '' && password.trim() !== '') {
      if (validateEmail(email.trim())) {
        await firestore()
          .collection('users')
          .where('email', '==', email.trim().toLocaleLowerCase())
          .get()
          .then(snapshot => {
            if (snapshot.empty) {
              Snackbar.show({
                text: 'No user found,Please create one Account',
                duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
                backgroundColor: colors.red,
                textColor: colors.white,
              });
            } else {
              snapshot.forEach(snapshotResponse => {
                //  const documentId = snapshotResponse.id
                const responseData = snapshotResponse.data();
                console.warn(responseData)

                if (password.trim() === responseData.password) {
                  if(responseData.active == 1 && responseData.isAdmin == false)
                    Snackbar.show({
                      text: 'Login Successfully',
                      duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
                      backgroundColor: colors.primaryGreen,
                      textColor: colors.white,
                    });

                  //  console.warn(responseData)
                  dispatch(
                    login({
                      userId: snapshotResponse.id,
                      firstName: responseData.firstName,
                      lastName: responseData.lastName,
                      email: responseData.email,
                      mobileNumber: responseData.mobilenumber,
                      profileImage: responseData.profileImage,
                    }),
                  );

                  //navigation.navigate('AppDrawer');
                } else {
                  Snackbar.show({
                    text: 'Password is wrong',
                    duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
                    backgroundColor: colors.red,
                    textColor: colors.white,
                  });
                }
              });
            }
          });
      } else {
        Snackbar.show({
          text: 'Enter a Valid Email id',
          duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
          backgroundColor: colors.red,
          textColor: colors.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Please fill the fields to continue',
        duration: Snackbar.LENGTH_LONG, // or Snackbar.LENGTH_LONG
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleGoToLoginPhone = () => {
    navigation.navigate('LoginPhone');
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
        <Text style={responsiveStyle.loginAccount}>Login Account</Text>

        <CustomTextInput
          type="email"
          handleText={text => setEmail(text)}
          placeholder="Email address"
        />

        <CustomTextInput
          type="password"
          handleText={text => setPassword(text)}
          placeholder="Password"
        />

        <CustomButton
          buttonText={'Sign In'}
          handleButtonPress={handleSignIn}
          type="primary"
        />

        <Text style={responsiveStyle.createNew} onPress={goToSignUp}>
          If you are new,Create Here
        </Text>

        <View style={responsiveStyle.dottedLineContainer}>
          <View style={responsiveStyle.overflow}>
            <View style={responsiveStyle.dashedLine} />
          </View>
          <View style={responsiveStyle.textContainer}>
            <Text style={responsiveStyle.dashedText}>or Login With</Text>
          </View>
        </View>

        <CustomButton
          buttonText={'Sign In with Phone'}
          handleButtonPress={handleGoToLoginPhone}
          icon={require('../../assets/images/phone.png')}
        />

        <CustomButton
          buttonText={'Sign In with Google'}
          handleButtonPress={handleButtonPress}
          type="secondary"
          icon={require('../../assets/images/google.png')}
        />
      </ScrollView>

      <View style={responsiveStyle.footer}>
        <Text style={responsiveStyle.footerText}>Login as a Guest</Text>
      </View>
    </View>
  );
};

export default Login;
