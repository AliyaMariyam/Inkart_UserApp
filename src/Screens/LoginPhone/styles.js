import { StyleSheet,Dimensions } from "react-native";
import colors from "../../Components/common/colors";

//const {width,height} = Dimensions.get('screen')

const styles =(width,height)=> StyleSheet.create({
    container:{
    flex:1
  
    },
    topBg:{
      width:width,
      height:width * 0.4,
      resizeMode:'cover'
    },
    scrollView:{
       flex:1,
       backgroundColor:colors.white_level_1,
       marginTop:-width * 0.2,
       borderTopRightRadius:width * 0.05,
       borderTopLeftRadius: width * 0.05,
       overflow:'hidden',
       padding:width * 0.03,
    },
    logo:{
        width:width * 0.4,
        height: width * 0.2,
        resizeMode:'contain'
    },
    loginAccount:{
        fontFamily:'Lato-Bold',
        fontSize:22,
        color:colors.steel
    },
    createNew:{
      fontFamily:'Lato-Regular',
      fontSize:14,
      color:colors.steel,
      textAlign:'center',
      marginVertical:width * 0.025
    },





})

export default styles