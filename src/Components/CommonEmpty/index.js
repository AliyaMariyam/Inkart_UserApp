import {View, Text} from 'react-native';
import { useDimensionContext } from '../../context';
import styles from './style';

const CommonEmpty = props => {
    const dimensions = useDimensionContext()
    const responsiveStyle = styles(dimensions.windowWidth,dimensions.windowHeight,dimensions.isPortrait)
  return (
    <View style={responsiveStyle.container}>
      <Text style={responsiveStyle.title}>{props.title}</Text>
    </View>
  );
};

export default CommonEmpty;
