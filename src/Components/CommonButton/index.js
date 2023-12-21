import {Text,TouchableOpacity } from 'react-native'
import { useDimensionContext } from '../../context'
import styles from './styles'

const CommonButton = (props) =>{
    const dimensions = useDimensionContext()
    const responsiveStyle = styles(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait)
    return(
        <TouchableOpacity style={responsiveStyle.container} onPress={props.onButtonPress}>
          <Text style={responsiveStyle.text}>{props.buttonText}</Text>
        </TouchableOpacity>
    )
}

export default CommonButton