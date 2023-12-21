import {StyleSheet} from 'react-native';
import colors from '../common/colors';

const styles =(width,height)=> StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:15,
  },
  newContainer:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical:15,
  },
  search:{
    borderWidth:1,
    borderColor:colors.primaryGreen,
    backgroundColor:colors.secondaryGreen,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10,
    paddingVertical:3,
    paddingHorizontal:8,
    width:width*0.95,
    alignSelf:'center'
  },
  newStyle:{
    borderWidth:1,
    borderColor:colors.primaryGreen,
    backgroundColor:colors.secondaryGreen,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10,
    paddingVertical:3,
    paddingHorizontal:8,
    width:width*0.8,
    alignSelf:'center'
  },
  searchIcon:{
    width:25,
    height:25,
    resizeMode:'contain'
  },
  voiceIcon:{
    width:25,
    height:25,
    resizeMode:'contain'
  },
  textInput:{
    flex:1,
    fontFamily:'Lato-Regular',
    fontSize:18,
    marginLeft:15,
    color:colors.primaryGreen
  },
  innerView:{
    flexDirection:'row',
    alignItems:'center'
  },
  filter:{
    fontFamily:'Lato-Regular',
    fontSize:18,
   // marginLeft:5,
    color:colors.primaryGreen
  }
});

export default styles;
