import { StyleSheet } from "react-native";
import colors from "../common/colors";


const styles = (width,height) =>StyleSheet.create({
    headView:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      newlyAddText:{
        fontFamily: 'Lato-Bold',
        fontSize: 22,
        color: colors.black,
      },
      payLessText:{
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.black,
      },
      seeAllText:{
        fontFamily: 'Lato-Regular',
        fontSize: 18,
        color: colors.black,
      }
})

export default styles