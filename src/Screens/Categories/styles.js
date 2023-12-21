import {StyleSheet} from 'react-native';
import colors from '../../Components/common/colors';

const styles =(width,height) => StyleSheet.create({
  container: {
    backgroundColor: colors.white_level_1,
  },
  main:{
    flex:1
  },
  catImage:{
    width:width*0.2,
    height:width*0.2,
    resizeMode:'contain',
    margin:10,
  },
  flatList:{
    padding:10,
    backgroundColor:colors.secondaryGreen,
    width:width*0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  imageTouch:{
    borderBottomColor:colors.black_level_3,
    borderBottomWidth:0.8,
  },
  rowStyle:{
    flexDirection:'row',
    justifyContent:'space-between',
   // backgroundColor:'yellow'
  },
  backImage:{
    width:width*0.65,
    height:height*0.165,
    resizeMode:'contain',
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:15,
    overflow:'hidden',
    padding:15
  },
  catName:{
   fontFamily:'Lato-Black',
   fontSize:22,
   color:colors.black
  },
  catDesc:{
    fontFamily:'Lato-Regular',
    fontSize:18,
    color:colors.black
  },
  productImage:{
    width:width*0.15,
    height:width*0.15,
    resizeMode:'contain',
    alignSelf:'center'
  },
  productContainer:{
    padding:5,
    justifyContent:'center',
    alignItems:'center',
  },
  productStyle:{
    justifyContent:'center',
    padding:10,
  },
  imageBg:{
   backgroundColor:colors.secondaryGreen,
   padding:10,
   justifyContent:'center',
   borderRadius:15,
   marginBottom:5
  },
  productName:{
    fontFamily:'Lato-Bold',
    fontSize:18,
    color:colors.black
   },
   productDesc:{
     fontFamily:'Lato-Regular',
     fontSize:14,
     color:colors.black
   },

});

export default styles;