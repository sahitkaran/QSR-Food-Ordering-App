import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screens/LoginScreen';
import SignUpScreen from './Screens/SignupScreen';
import Welcome from './Screens/Welcome';
import DineInScreen from './Screens/DineInScreen';
import TakeawayScreen from './Screens/TakeawayScreen';
import CartScreen from './Screens/CartScreen';
import Confirmation from './Screens/Confirmation';

import AuthContextProvider, { AuthContext } from './Components/AuthContext';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} options={{ animation: 'slide_from_bottom', headerShown: false }} />
      <Stack.Screen name="DineInScreen" component={DineInScreen}  />
      <Stack.Screen name="TakeawayScreen" component={TakeawayScreen}  />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="Confirmation" component={Confirmation} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function PreAuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

function Navigation() {
    const ctx = useContext(AuthContext);

    return <NavigationContainer>
        {ctx.isAuth ? <AuthStack /> : <PreAuthStack />}
        </NavigationContainer>
}

export default function App() {
  const ctx = useContext(AuthContext);
  return (
    <AuthContextProvider>
    <Navigation/>
    </AuthContextProvider>
  );
}
