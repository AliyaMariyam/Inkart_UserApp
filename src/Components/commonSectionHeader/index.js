import {View, Text} from 'react-native';
import { useDimensionContext } from '../../context';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';



const CommonSectionHeader = props => {

    const dimensions = useDimensionContext()
    const responsiveStyle = styles(dimensions.windowWidth,dimensions.windowHeight)
    const navigation = useNavigation()

    const handleNavigate = () =>{
      navigation.navigate('Shop',{type:'all'})
    }

  return (
    <View style={responsiveStyle.headView}>
      <View>
        <Text style={responsiveStyle.newlyAddText}>{props.head}</Text>
        <Text style={responsiveStyle.payLessText}>{props.content}</Text>
      </View>
      <Text style={responsiveStyle.seeAllText} onPress={handleNavigate}>{props.rightText}</Text>
    </View>
  );
};


export default CommonSectionHeader
