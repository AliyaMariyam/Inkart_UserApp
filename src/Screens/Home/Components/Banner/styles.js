import {StyleSheet} from 'react-native';
import colors from '../../../../Components/common/colors';

const styles =(width,height)=> StyleSheet.create({
  container: {
  
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:15,
  },
  banner:{
    width:width*0.9,
    height:width*0.35,
    resizeMode:'contain',
    borderRadius:15,
    overflow:'hidden',
    margin:15
  },
  innerView:{
    padding:15,
  },
  head:{
   fontFamily:'Lato-Black',
   fontSize:20,
   color:colors.black
  },
  content:{
    fontFamily:'Lato-Regular',
    fontSize:18,
    color:colors.black
  },
  touch:{
    backgroundColor:colors.primaryGreen,
    padding:10,
    justifyContent:'center',
    alignItems:'center',
    width:width*0.3,
    marginVertical:10,
    borderRadius:15,
    marginLeft:10
  },
  touchText:{
    fontFamily:'Lato-Regular',
    fontSize:16,
    color:colors.white
  }


});

export default styles;
