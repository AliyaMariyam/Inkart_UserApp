import {StyleSheet} from 'react-native'
import colors from '../../Components/common/colors'

const styles = (width,height) => StyleSheet.create({

container:{
    flex:1,
},
textInput:{
  fontFamily:'Lato-Regular',
  borderRadius:8,
  fontSize:16,
  borderWidth:1,
  width:width*0.95,
  height:50,
  margin:10,
  alignSelf:'center',
  borderColor:colors.primaryGreen,
  backgroundColor:colors.secondaryGreen
},
description:{
    fontSize:16,
    fontFamily:'Lato-Regular'
},
mapView:{
height:width * 0.4,
width:width,
justifyContent:'center',
alignItems:'center',

},
TouchView:{
    padding:15,
    marginVertical:20,
    flexDirection:'row',
    alignItems:'center'
},
touchText:{
    fontSize:18,
    fontFamily:'Lato-Bold',
    color:colors.black
},
iconView:{
    borderRadius:8,
    padding:10,
    marginRight:10,
    backgroundColor:colors.primaryGreen
}
})

export default styles