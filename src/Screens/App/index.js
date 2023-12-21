import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login';
import SignUp from '../Signup';
import LoginPhone from '../LoginPhone';
import Home from '../Home';
import {DimensionContextProvider} from '../../context';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Categories from '../Categories';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Cart from '../Cart';
import CustomDrawer from '../../Components/CustomDrawer';
import CustomFooter from '../../Components/CustomFooter';
import Search from '../Search';
import Offers from '../Offers';
import Orders from '../Orders';
import Wishlist from '../Wishlist';
import Account from '../Account';
import styles from './style';
import {Provider} from 'react-redux';
import {store} from '../../storage/store';
import {useSelector} from 'react-redux';
import SplashScreen from '../SplashScreen';
import Shop from '../Shop';
import ProductDetails from '../ProductDetails';
import Review from '../Review';
import AddAddress from '../Add Address';
import OrderDetails from '../OrderDetails';

const AppStack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="AppFooter"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: styles.title,
        headerStyle: {
          height: 60,
        },
        
      }}>
      <Drawer.Screen
        name="AppFooter"
        component={AppFooter}
        options={{headerShown: false}}
      />
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Orders" component={Orders} />
      <Drawer.Screen name="OrderDetails" component={OrderDetails} />
      <Drawer.Screen name="Wishlist" component={Wishlist} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="Shop" component={Shop} />
      <Drawer.Screen name="ProductDetails" component={ProductDetails} />
      <Drawer.Screen name="Review" component={Review} />
      <Drawer.Screen name="AddAddress" component={AddAddress} />
    </Drawer.Navigator>
  );
};

const Footer = createBottomTabNavigator();

const AppFooter = props => {
  return (
    <Footer.Navigator
      tabBar={props => <CustomFooter {...props} />}
      screenOptions={{
        headerTitleAlign: 'left',
        headerTitleStyle: styles.title,
        headerStyle: {
          height: 60,
        },
      }}>
      <Footer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Footer.Screen name="Categories" component={Categories} />
      <Footer.Screen name="Search" component={Search} />
      <Footer.Screen name="Offers" component={Offers} />
      <Footer.Screen name="Cart" component={Cart} />
    </Footer.Navigator>
  );
};

const AppNavigation = () => {
  const [loading, setLoading] = useState(true);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isLoggedIn]);

  return (
    <DimensionContextProvider>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{headerShown: false}}>
          {loading ? (
            <AppStack.Screen name="SplashScreen" component={SplashScreen} />
          ) : (
            <>
              {isLoggedIn ? (
                <AppStack.Screen name="AppDrawer" component={AppDrawer} />
              ) : (
                <>
                  <AppStack.Screen name="Login" component={Login} />
                  <AppStack.Screen name="SignUp" component={SignUp} />
                  <AppStack.Screen name="LoginPhone" component={LoginPhone} />
                </>
              )}
            </>
          )}
        </AppStack.Navigator>
      </NavigationContainer>
    </DimensionContextProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
