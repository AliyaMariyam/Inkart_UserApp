import {StyleSheet} from 'react-native'
import colors from '../../Components/common/colors'


const styles = StyleSheet.create({
    container:{
       // flex:1,
        backgroundColor:colors.white_level_2,
    },
    main:{
     flex:1
    },
    footText:{
        fontFamily:'Lato-Bold',
        fontSize:25,
        color:colors.grey,
        padding:15,
    },
    footButton:{
      padding:10,
      backgroundColor:colors.primaryGreen  ,
      width:'40%',
      marginHorizontal:15,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:50,
      borderRadius:8,
    },
    footButtonText:{
        fontFamily:'Lato-Bold',
        fontSize:16,
        color:colors.white
    }
})


export default styles