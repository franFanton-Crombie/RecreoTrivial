import React from 'react';
import Inicio from './components/Inicio';
import Juego from './components/Question';
import Login from './components/Login/Index';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Hooks from './components/HOOKSPRUEBA/Ingredients';
import CrearCuenta from './components/Login/CreateAccount';
import PantallaPrincipal from './components/Inicio/pantallaPrincipal';

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
          <Stack.Screen name={'Hooks'} component={Hooks} />
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen name={'CrearCuenta'} component={CrearCuenta} />
          <Stack.Screen name={'PantallaPrincipal'} component={PantallaPrincipal} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
