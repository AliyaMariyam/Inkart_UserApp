import { StyleSheet } from "react-native";
import colors from "../common/colors";

const styles =(width,height) =>StyleSheet.create({
padding:{
    paddingRight:15,
   // paddingBottom:10
},
flexStyle:{
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center'
},
image:{
    width: 30, 
    height: 30, 
    resizeMode: 'contain'
},
cartCount:{
    position:'absolute',
    right:7,
    top:-6,
    backgroundColor:colors.red,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:14,
    overflow:'hidden',
    paddingHorizontal:6,
    paddingVertical:2,
    zIndex:9
  },
  count:{
    color:colors.white,
    fontFamily:'Lato-Bold',
    fontSize:16,
    textAlign:'center'
  },
 
})

export default styles