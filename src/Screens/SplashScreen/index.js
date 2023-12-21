import React from'react'
import { View,Image } from 'react-native'
import colors from '../../Components/common/colors'


const SplashScreen = () =>{
    return(
        <View style={{flex:1,justifyContent:'center',backgroundColor:colors.white,alignItems:'center'}}>
          <Image source={require('../../assets/images/logo.jpeg')}
          style={{width:200,height:200,resizeMode:'contain'}}/>
        </View>
    )
}

export default SplashScreen