import { StyleSheet } from "react-native";
import colors from "../../Components/common/colors";


const styles =(width,height,isPortrait)=> StyleSheet.create({

container:{
padding:15
},

reviewBox:{
    padding:15,
    backgroundColor:colors.lightGrey,
    borderRadius:14,
    marginVertical:10
},

})

export default styles