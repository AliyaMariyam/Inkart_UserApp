import {Text, View} from 'react-native';
import colors from '../../../Components/common/colors';
import CustomTextInput from '../../../Components/CustomTextInput';
import { useDimensionContext } from '../../../context';
import styles from './styles';

const DeliveryInfo = () => {

    const dimensions = useDimensionContext();
    const responsiveStyle = styles(
      dimensions.windowWidth,
      dimensions.windowWidth,
      dimensions.isPortrait,
    );

    
  return (
    <View>

      <Text
        style={responsiveStyle.deliveryHead}>
        Check Delivery
      </Text>
      <Text style={responsiveStyle.commonText}>Enter pincode to check delivery date/pickup option</Text>

      <CustomTextInput 
      type={'default'}
      check={true}
      handleText={()=>console.log('Hello')}
      placeholder={'Pin Code'}
      />
       
      <Text style={responsiveStyle.commonText}>Free Delivery on orders above 200.00</Text>
      <Text style={responsiveStyle.commonText}>Cash on delivery available</Text>
      <Text style={responsiveStyle.commonText}>Easy 21 days return and exchange.</Text>

    </View>
  );
};

export default DeliveryInfo;
