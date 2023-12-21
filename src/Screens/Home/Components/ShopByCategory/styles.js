import { StyleSheet } from "react-native";
import colors from "../../../../Components/common/colors";

const styles = (width,height) => StyleSheet.create({
    container:{
     margin:15
    },
    head:{
        fontFamily:'Lato-Bold',
        fontSize:20,
        textAlign:'center',
        color:colors.black
    },
    flatList:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:15,
    },
    innerView:{
        marginRight:15,
        marginBottom:15,
        justifyContent:'center',
        alignItems:'center',
    },
    itemName:{
        fontFamily:'Lato-Regular',
        fontSize:16,
        color:colors.black
    },
    image:{
        width:45,
        height:45,
        resizeMode:'contain'
    },
    imageView:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        padding:15,
        marginBottom:10,
       
    }

})

export default styles