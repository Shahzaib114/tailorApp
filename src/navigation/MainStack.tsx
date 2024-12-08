import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import OrderDetails from '../screens/itemDetails/OrderDetails';
import RateListComponent from '../assets/components/RateListComponent';
import SearchUserInfo from '../screens/searchUser/SearchUser';
import OrderConfirmation from '../screens/OrderConfirmation/OrderConfirmation';
import SplashScreen from '../screens/splash/SplashScreen';
const Stack = createStackNavigator();


const MainStack = ({ }: Partial<{ resource: object }>) => {

  return (
    <View style={{ flex: 1 }}>
      {/* <Loader /> */}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{ headerShown: false }}>

          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SearchUserInfo"
            component={SearchUserInfo}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="RateListComponent"
            component={RateListComponent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmation}
            options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default MainStack;
