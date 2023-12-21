import {StyleSheet} from 'react-native';
import colors from '../../Components/common/colors';

const styles = (width, height, isPortrait) =>
  StyleSheet.create({
    proImage: {
      width: width,
      height: width * 0.6,
      resizeMode: 'contain',
      marginVertical:25
    },
    heart: {
        position:'absolute',
        right:0,
        marginTop:10,
    },
    mainView:{
    backgroundColor:colors.white,
    //padding:width*0.04,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    shadowColor:'#000',
    shadowOffset:{width:2,height:2},
    shadowOpacity:0.2,
    shadowRadius:5,
    elevation:15,  //shadow props in ios is different 
    paddingBottom:80
    },
    name:{
        fontFamily:'Lato-Black',
        fontSize:25,
        marginBottom:10,
        color:colors.black
    },
    price:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        marginVertical:10,
        color:colors.black
    },
    descriptionHead:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        color:colors.black
    },
    description:{
        fontFamily:'Lato-Regular',
        fontSize:18,
        color:colors.grey
    },
    padding:{
      padding:width*0.05,
    }
  });

export default styles;
