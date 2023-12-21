import {StyleSheet} from 'react-native';
import colors from '../common/colors';

const styles = (width,height) => StyleSheet.create({
  mainContainer: {
    marginVertical: 5, 
    padding: 15, 
    overflow: 'hidden'
  },
  profileView:{
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  profileInnerView:{
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
    backgroundColor: colors.white_level_3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileViewInnerRightView:{
    marginLeft: 15, 
    width: '65%'
  },
  profileNameText:{
    fontFamily: 'Lato-Bold', 
    fontSize: 20,
    color:colors.black
  },
  profileMailText:{
    fontFamily: 'Lato-Regular', 
    fontSize: 16,
    color:colors.black
  },
  drawerContentView:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingBottom:10
  },
  icon:{
    width:22,
    height:22,
    marginRight:10,
  },
  drawerText:{
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    paddingBottom: 15,
    color:colors.black,
  },
  secondIcon:{
    width:22,
    height:22,
    marginRight:10,
    backgroundColor:colors.secondaryGreen,
    borderRadius:22/2
  },
  logoutView:{
    borderColor: colors.black_level_3,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.secondaryGreen,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection:'row'
  },
  logoutText:{
    fontFamily: 'Lato-Regular', 
    fontSize: 20,
    color:colors.black
  },
  supportView:{
    borderRadius:20,
    backgroundColor:colors.secondaryGreen,
    padding:15,
    marginVertical:15,
  },
  supportTouch:{
    borderRadius:20,
    backgroundColor:colors.primaryGreen,
    padding:10,
    marginVertical:15,
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  supportText:{
    fontFamily:'Lato-Regular',
    fontSize:18,
    color:colors.white
  },
  supportHead:{
    fontFamily:'Lato-Bold',
    fontSize:20,
    color:colors.black,
    lineHeight:25,
    marginBottom:4
  },
  supportContent:{
    fontFamily:'Lato-Regular',
    fontSize:15,
    lineHeight:19,
    color:colors.black,
  },
  arrow:{
    backgroundColor:colors.secondaryGreen,
    overflow:'hidden',
    borderRadius:15,
  },
  image:{
    width: width * 0.2,
    height: width * 0.2,
    borderRadius:width*0.1,
  },
  signOutText:{
    fontFamily: 'Lato-Regular', 
    fontSize: 20,
    color:colors.black
  },







});

export default styles;