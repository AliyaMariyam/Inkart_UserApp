import React from 'react'
import {View,Text,Image,TouchableOpacity} from 'react-native'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import { useDimensionContext } from '../../context'


const CommonHeader = () =>{

    const navigation = useNavigation()

      const dimensions = useDimensionContext()

      const responsiveStyle = styles(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait)

    return(
       <View style={responsiveStyle.container}>
        <TouchableOpacity
        onPress={()=>navigation.toggleDrawer()}
        >
        <Image
        source={require('../../assets/images/drawer.png')}
        style={responsiveStyle.sideicon}
        />
        </TouchableOpacity>
        

        <Image
        source={require('../../assets/images/logo.jpeg')}
        style={responsiveStyle.logo}
        />

       </View>
    )
}


export default CommonHeader