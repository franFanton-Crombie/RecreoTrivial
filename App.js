import React from 'react';
import Inicio from './components/Inicio';
import Juego from './components/Question';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: true
      }}>
        <Stack.Screen name={'Inicio'} component={Inicio} />
        <Stack.Screen name={'Juego'} component={Juego} />
      </Stack.Navigator>
    </NavigationContainer>
    
    
  );
};

export default App;
