import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import {useDimensionContext} from '../../context';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';
import ImagePicker from 'react-native-image-crop-picker';
import {
  validateEmail,
  validatePhoneNumber,
} from '../../Components/common/validation';
import Snackbar from 'react-native-snackbar';
import colors from '../../Components/common/colors';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {updateProfile} from '../../storage/action';
import {updateProfileImage} from './controller';

const Account = () => {

    const userId = useSelector(state => state.userId);
    const email = useSelector(state=>state.email)
    const mobileNumber = useSelector(state=>state.mobileNumber)
    const firstName = useSelector(state=>state.firstName)
    const lastName = useSelector(state=>state.lastName)
    const profileImage = useSelector(state=>state.profileImage)

  const dispatch = useDispatch();

  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const [fName, setFirstName] = useState(firstName);
  const [lName, setLastName] = useState(lastName);
  const [phone, setPhone] = useState(mobileNumber);
  const [emailId, setEmail] = useState(email);
  const [modal, setModal] = useState(false);
  const [modalChoose, setModalChoose] = useState(false);
  const [userImage, setUserImage] = useState('');

  // console.log('modalChoose : ', modalChoose);

  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CommonHeaderLeft />,
    });
  });

  const handleOpenImage = () => {
    setModal(!modal);
  };

  const handleEditImage = () => {
    setModalChoose(true);
  };

  const handlePicFromGallery = () => {
    setModalChoose(false);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        //  console.log(image);
        setUserImage(image.path ?? '');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlePicFromCamera = () => {
    setModalChoose(false);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        //  console.log(image);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUpdateProfile = async () => {
    if (validatePhoneNumber(phone.trim())) {
      if (validateEmail(email.trim())) {
        if (firstName !== '' && lastName !== '') {
          let newUrl = '';
          if (userImage !== '') {
            newUrl = await updateProfileImage(userImage);
          }
          await firestore()
            .collection('users')
            .doc(userId)
            .update({
              firstName: fName,
              lastName: lName,
              email: emailId,
              mobilenumber: phone,
              profileImage: newUrl,
            })
            .then(() => {
              dispatch(
                updateProfile({
                  firstName: fName,
                  lastName: lName,
                  email: emailId,
                  mobileNumber: phone,
                  profileImage: newUrl,
                }),
              );
              Snackbar.show({
                text: 'Updated Successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
              });
            });
        } else {
          Snackbar.show({
            text: 'Fill up all fields to continue',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        }
      } else {
        Snackbar.show({
          text: 'Given Email address is not Valid',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: colors.red,
          textColor: colors.white,
        });
      }
    } else {
      Snackbar.show({
        text: 'Given phone number is not Valid',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  return (
    <View style={responsiveStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={responsiveStyle.head}>
          {firstName} {lastName}
        </Text>

        <View style={responsiveStyle.userImage}>
          <TouchableOpacity onPress={handleOpenImage}>
            <Image
              source={
                userImage === ''
                  ? profileImage === ''
                    ? require('../../assets/images/profile-pic.png')
                    : {uri: profileImage}
                  : {uri: userImage}
              }
              style={responsiveStyle.image}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={responsiveStyle.editTouch}
            onPress={handleEditImage}>
            <Image
              source={require('../../assets/images/edit-green.png')}
              style={responsiveStyle.edit}
            />
          </TouchableOpacity>
        </View>

        <CustomTextInput
          handleText={text => setFirstName(text)}
          placeholder="First Name"
          value={fName}
        />

        <CustomTextInput
          handleText={text => setLastName(text)}
          placeholder="Last Name"
          value={lName}
        />

        <CustomTextInput
          type="email"
          handleText={text => setEmail(text)}
          placeholder="Email Address"
          value={emailId}
        />

        <CustomTextInput
          type="phone"
          handleText={text => setPhone(text)}
          placeholder="Mobile Number"
          value={phone}
        />

        <CustomButton
          type="primary"
          handleButtonPress={handleUpdateProfile}
          buttonText={'Update Profile'}
        />

        {/* Modal for Making image bigger while touching it */}
        <Modal
          transparent
          onRequestClose={() => setModal(false)}
          visible={modal}>
          <View style={responsiveStyle.modalBackground}>
            <TouchableOpacity
              onPress={() => setModal(false)}
              style={responsiveStyle.closeButton}>
              <Image
                source={require('../../assets/images/close.png')}
                style={responsiveStyle.closeImage}
              />
            </TouchableOpacity>
            <Image
              source={
                profileImage === ''
                  ? require('../../assets/images/profile-pic.png')
                  : {uri: profileImage}
              }
              style={responsiveStyle.bigImage}
            />
          </View>
        </Modal>
        {/* Modal for Making image bigger while touching it */}

        {/* Modal for choosing image from camera or gallery */}
        <Modal
          transparent
          onRequestClose={() => setModalChoose(false)}
          visible={modalChoose}>
          <View style={responsiveStyle.modalBackground}>
            <View style={responsiveStyle.selectBox}>
              <TouchableOpacity
                onPress={() => setModalChoose(false)}
                style={responsiveStyle.closeChooseButton}>
                <Image
                  source={require('../../assets/images/close.png')}
                  style={responsiveStyle.closeImage}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlePicFromGallery}
                style={responsiveStyle.touch}>
                <Text style={responsiveStyle.pickText}>Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlePicFromCamera}
                style={responsiveStyle.touch}>
                <Text style={responsiveStyle.pickText}>Camera</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal for choosing image from camera or gallery */}
      </ScrollView>
    </View>
  );
};

export default Account;
