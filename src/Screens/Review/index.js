import {useEffect, useState, useRef} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {useDimensionContext} from '../../context';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import CommonHeaderLeft from '../../Components/CommonHeaderLeft';
import CommonHeaderRight from '../../Components/CommonHeaderRight';
import StarRating from 'react-native-star-rating-widget';
import colors from '../../Components/common/colors';
 import ActionSheet from "react-native-actions-sheet";
import CustomTextInput from '../../Components/CustomTextInput';
import CustomButton from '../../Components/CustomButton';


const Review = () => {
  const [rating, setRating] = useState(0);
  const actionSheetRef = useRef();
  const navigation = useNavigation();
  const dimensions = useDimensionContext();
  const responsiveStyle = styles(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );

  useEffect(() => {
    navigation.setOptions({
      hederLeft: () => <CommonHeaderLeft type="back" />,
      headerRight: () => <CommonHeaderRight plus={true} handlePlusIcon={openActionSheet}/>,
      title: 'Reviews',
    });
  }, []);

  const openActionSheet = () =>{
    actionSheetRef.current.show()
  }

  return (
    <View
      style={responsiveStyle.container}
      showsVerticalScrollIndicator={false}>
      <View style={responsiveStyle.reviewBox}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Image
            source={require('../../assets/images/profile-pic.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
              borderRadius: 15,
              overflow: 'hidden',
            }}
          />
          <View>
            <Text
              style={{
                color: colors.black_level_3,
                fontFamily: 'Lato-Bold',
                fontSize: 18,
                marginLeft: 10,
              }}>
              Rentric Henvok
            </Text>
            <StarRating starSize={20} rating={rating} onChange={setRating} />
          </View>
        </View>

        <Text
          style={{
            color: colors.black_level_3,
            fontFamily: 'Lato-Regular',
            fontSize: 16,
          }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </View>

  
        <ActionSheet ref={actionSheetRef}>
          <View style={{padding:20}}>
            <Text style={{fontFamily:'Lato-Black',fontSize:22,lineHeight:50}}>Write a Review</Text>
            <StarRating starSize={40} rating={rating} onChange={setRating} />
            <CustomTextInput
            placeholder = 'Write here'
            multiline={true}
            />
            <CustomButton
             buttonText={'Submit Review'}
             type='primary'
            />
          </View>
        </ActionSheet>

    </View>
  );
};

export default Review;
