import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import colors from '../common/colors';
import {DimensionContext, useDimensionContext} from '../../context';
import {useDispatch,useSelector} from 'react-redux'
import { signout } from '../../storage/action';


const CustomDrawer = () => {
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
 const dispatch = useDispatch()

 const firstName = useSelector(state=>state.firstName)
 const lastName = useSelector(state=>state.lastName)
 const email = useSelector(state=>state.email)
 const profileImage = useSelector(state=>state.profileImage)

  const Contents = [
    {
      itemId:0,
      itemName:'Home',
      navigateTo:'Home',
      icon:require('../../assets/images/home.png')
    },
    {
      itemId:1,
      itemName:'Shop By Category',
      navigateTo:'Categories',
      icon:require('../../assets/images/drawer.png')
    },
    {
      itemId:2,
      itemName:'Orders',
      navigateTo:'Orders',
      icon:require('../../assets/images/orders.png')
    },
    {
      itemId:3,
      itemName:'Your Wishlist',
      navigateTo:'Wishlist',
      icon:require('../../assets/images/wishlist.png')
    },
    {
      itemId:4,
      itemName:'Your Account',
      navigateTo:'Account',
      icon:require('../../assets/images/user.png')
    },
  ]
  

  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
  );

  const handleSignout = () =>{
    dispatch(signout())
  }

  return (
    <View style={responsiveStyle.mainContainer}>
      {/*profile*/}
      <TouchableOpacity style={responsiveStyle.profileView} onPress={()=>navigation.navigate('Account')}>
        <View style={responsiveStyle.profileInnerView}>
        <Image
              source={
                  profileImage === ''
                    ? require('../../assets/images/profile-pic.png')
                    : {uri: profileImage}
              }
              style={responsiveStyle.image}
            />
        </View>

        <View style={responsiveStyle.profileViewInnerRightView}>
          <Text style={responsiveStyle.profileNameText}>{firstName} {lastName}</Text>
          <Text style={responsiveStyle.profileMailText}>{email}</Text>
        </View>
      </TouchableOpacity>

      {/*drawer contents*/}
      <View style={{marginVertical: 15}}>
        {Contents.map((item,index)=>{
          return(
            <TouchableOpacity 
            key={item.itemId}
            style={responsiveStyle.drawerContentView}
            onPress={()=>navigation.navigate(item.navigateTo)}
            >
            <View style={{flexDirection: 'row'}}>
              <Image
                source={item.icon}
                style={responsiveStyle.icon}
              />
              <Text style={responsiveStyle.drawerText}>{item.itemName}</Text>
            </View>
            <Image
              source={require('../../assets/images/arrow-right.png')}
              style={responsiveStyle.secondIcon}
            />
          </TouchableOpacity>
          )
        })}
               
      </View>

      {/*Logout*/}
      <TouchableOpacity onPress={handleSignout}>
        <View
          style={responsiveStyle.logoutView}>
          <Image
            source={require('../../assets/images/arrow-right.png')}
            style={[responsiveStyle.secondIcon,responsiveStyle.arrow]}
          />
          <Text style={responsiveStyle.signOutText}>Sign out</Text>
        </View>
      </TouchableOpacity>

      {/*contact support*/}
      <View style={responsiveStyle.supportView}>
        <Text style={responsiveStyle.supportHead}>Contact Support</Text>
        <Text style={responsiveStyle.supportContent}>
          If you have any problem with the app,feel free to contact our 24 hours support system
        </Text>

        <View
          style={responsiveStyle.supportTouch}>
          <Text style={responsiveStyle.supportText}>Contact</Text>
        </View>

      </View>

    

    </View>
  );
};

export default CustomDrawer;
