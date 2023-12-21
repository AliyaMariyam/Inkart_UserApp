import {useEffect,useState} from 'react'
import {View,Text, Image, TouchableOpacity} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDimensionContext } from '../../../context';
import colors from '../../../Components/common/colors';
import styles from './styles';
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native';

const ProductReview = (props) =>{
  const {product} = props
  const navigation = useNavigation()
  const [rating, setRating] = useState(0);
    const dimensions = useDimensionContext();
    const responsiveStyle = styles(
      dimensions.windowWidth,
      dimensions.windowWidth,
      dimensions.isPortrait,
    );

    const handleRedirect = () =>{
        navigation.navigate('Review',{product:product})
    }

    return(
        <View style={{marginVertical:20}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:5}}>
                <Text style={{color:colors.black_level_3,fontFamily:'Lato-Regular',fontSize:15}}>Product Review (1)</Text>
                <TouchableOpacity onPress={handleRedirect}>
                <Text style={{color:colors.primaryGreen,fontFamily:'Lato-Bold',fontSize:16}}>See All</Text>
                </TouchableOpacity>
               
            </View>

            <View style={{padding:15,backgroundColor:colors.lightGrey,borderRadius:14,marginVertical:10}}>
              
              <View style={{flexDirection:'row',alignItems:'center',marginBottom:10}}>
                 <Image source={require('../../../assets/images/profile-pic.png')} style={{width:30,height:30,resizeMode:'contain',borderRadius:15,overflow:'hidden'}}/>
                 <View>
                 <Text style={{color:colors.black_level_3,fontFamily:'Lato-Bold',fontSize:18,marginLeft:10}}>Rentric Henvok</Text>
                 <StarRating starSize={20} rating={rating} onChange={()=>{}} />
                 </View>
                
              </View>

               <Text style={{color:colors.black_level_3,fontFamily:'Lato-Regular',fontSize:16}}>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
               Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
               when an unknown printer took a galley of type and scrambled it to make a type specimen book.
               </Text>
            </View>
      </View>
    )
}

export default ProductReview